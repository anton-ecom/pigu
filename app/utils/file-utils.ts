import { Content } from "@radix-ui/react-dialog";
import fs from "node:fs/promises";
import path from "node:path";
import { ALLOWED_FOLDERS, ALLOWED_EXTENSION } from "~/config/config";

const readdir = fs.readdir;
const stat = fs.stat;
const readFile = fs.readFile;

interface MarkdownFile {
  name: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  path: string;
  fullPath: string;
  fullName: string;
  date: number;
  metadata: Record<string, string>;
}

export async function readFileIfExistsSafe(fileName: string): Promise<string> {
  // Normalize and clean path
  const normalized = path.normalize(fileName).replace(/^(\.\.(\/|\\|$))+/, "");

  // Split and validate folder
  const [folder, ...rest] = normalized.split(path.sep);

  if (!ALLOWED_FOLDERS.includes(folder)) {
    throw new Error(`Access denied: folder '${folder}' is not allowed.`);
  }

  // Check extension
  if (!normalized.endsWith(ALLOWED_EXTENSION)) {
    throw new Error(`Access denied: only '.md' files are supported.`);
  }

  // Absolute path safely
  const filePath = path.resolve("data", normalized);

  try {
    await fs.access(filePath);
    return await fs.readFile(filePath, "utf-8");
  } catch {
    throw new Error(`File not found: ${fileName}`);
  }
}

/**
 * Gets all markdown files in a directory recursively
 */
export async function getFolders(
  dirPath: string,
  baseFilename: string | "README.md",
): Promise<
  { path: string; name: string; description: string; private?: boolean }[]
> {
  try {
    const basePath = "data";
    // First normalize the path and resolve it
    const normalized = path.normalize(dirPath).replace(/^(\.\.(\/|\\|$))+/, "");
    const absolutePath = path.resolve(basePath, normalized);

    console.log("normalized", normalized);
    console.log("absolutePath", absolutePath);

    // Check if directory exists

    try {
      const stats = await stat(absolutePath);

      if (!stats.isDirectory()) {
        console.warn(`Path is not a directory: ${dirPath}`);
        return [];
      }
    } catch {
      console.warn(`Directory does not exist: ${dirPath}`);
      return [];
    }

    // Read all files in the directory
    const entries = await readdir(absolutePath, { withFileTypes: true });

    const folders: {
      path: string;
      name: string;
      description: string;
      private?: boolean;
    }[] = [];

    // Process each entry
    await Promise.all(
      entries.map(async (entry) => {
        const absoluteEntryPath = path.join(absolutePath, entry.name);

        const relativeEntryPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          const entryFile = path.join(absoluteEntryPath, baseFilename);

          try {
            const content = await readFile(entryFile, "utf8");
            const { metadata } = parseFrontmatter(content || "");

            if (metadata.private === "true") {
              console.warn(`Private folder ${entry.name} skipped`);
            } else {
              folders.push({
                path: relativeEntryPath,
                name: entry.name,
                description: metadata.description || "",
                private: !!metadata.private || false,
              });
            }
          } catch (_error: unknown) {
            //console.log(`Error reading file ${entryFile}:`, error);
            folders.push({
              path: relativeEntryPath,
              name: entry.name,
              description: "",
              private: false,
            });
          }
        }
      }),
    );

    return folders;
  } catch (error) {
    console.warn(`Error reading folder ${dirPath}:`, error);
    return [];
  }
}

/**
 * Gets all markdown files in a directory recursively
 */
export async function getAllMarkdownFiles(
  dirPath: string,
  basePath: string | "data",
): Promise<MarkdownFile[]> {
  try {
    // First normalize the path and resolve it
    const normalized = path.normalize(dirPath).replace(/^(\.\.(\/|\\|$))+/, "");
    const absolutePath = path.resolve(basePath, normalized);

    // Check if directory exists

    try {
      const stats = await stat(absolutePath);

      if (!stats.isDirectory()) {
        console.warn(`Path is not a directory: ${dirPath}`);
        return [];
      }
    } catch {
      console.warn(`Directory does not exist: ${dirPath}`);
      return [];
    }

    // Read all files in the directory
    const entries = await readdir(absolutePath, { withFileTypes: true });

    // Process each entry
    const results = await Promise.all(
      entries.map(async (entry) => {
        const absoluteEntryPath = path.join(absolutePath, entry.name);

        // Create a relative path for recursive calls
        const relativeEntryPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          // Recursively scan subdirectories with the RELATIVE path
          // While keeping the same basePath
          const nestedFiles = await getAllMarkdownFiles(
            relativeEntryPath,
            basePath,
          );
          return nestedFiles;
        }

        if (
          entry.isFile() &&
          path.extname(entry.name).toLowerCase() === ".md"
        ) {
          // Process markdown files
          try {
            // For reading files, use original path resolving
            const content = await readFile(absoluteEntryPath, "utf8");
            const { metadata } = parseFrontmatter(content);

            let tags: string[] = [];
            if (metadata.tags) {
              // Handle the format [tag1, tag2, tag3]
              const tagsString = metadata.tags.trim();
              if (tagsString.startsWith("[") && tagsString.endsWith("]")) {
                tags = tagsString
                  .substring(1, tagsString.length - 1) // Remove brackets
                  .split(",") // Split by commas
                  .map((tag: string) => tag.trim()); // Trim whitespace
              }
            }

            //const imageUrl = (await parseImage(metadata.image)) || null;

            const filesWithStats = {
              name: entry.name,
              image: metadata.image,
              title: metadata.title || path.basename(entry.name, ".md"),
              description: metadata.description || "",
              tags: tags,
              author: metadata.author || "",
              path: `${dirPath}/${path.basename(entry.name, ".md")}`,
              fullPath: absoluteEntryPath,
              fullName: entry.name,
              date: metadata.data || "",
              metadata,
            };

            return filesWithStats;
          } catch (error) {
            console.warn(`Error reading file ${absoluteEntryPath}:`, error);
            return null;
          }
        }

        // Skip non-markdown files
        return null;
      }),
    );

    // Flatten and filter the results
    return results.flat().filter((item): item is MarkdownFile => item !== null);
  } catch (error) {
    console.error(`Error reading markdown files from ${dirPath}:`, error);
    return [];
  }
}

export async function parseImage(image: string): Promise<string | null> {
  try {
    const imageDir = path.resolve("public/images");
    const imagePath = path.join(imageDir, image);
    const stats = await fs.stat(imagePath);
    if (stats.isFile()) {
      return `/images/${image}`;
    }
    return null;
  } catch (error) {
    console.error(`Error checking image file: ${image}`, error);
    return null;
  }
}

export async function isDir(
  dirPath: string,
  basePath: string | "data",
): Promise<boolean> {
  try {
    // Normalize and sanitize the path
    const normalized = path.normalize(dirPath).replace(/^(\.\.(\/|\\|$))+/, "");
    const absolutePath = path.resolve(basePath, normalized);

    try {
      const stats = await fs.stat(absolutePath);
      return stats.isDirectory();
    } catch {
      console.warn(`Directory does not exist: ${dirPath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error checking if directory exists: ${dirPath}`, error);
    return false;
  }
}

/**
 * Gets all markdown files in a directory
 * @param dirPath Path to the directory to scan
 * @returns Array of file names (without .md extension) sorted by creation date (newest first)
 */

export async function getMarkdownFiles(
  dirPath: string,
): Promise<MarkdownFile[]> {
  try {
    const normalized = path.normalize(dirPath).replace(/^(\.\.(\/|\\|$))+/, "");
    const filePath = path.resolve("data", normalized);

    // Check if directory exists
    try {
      const stats = await stat(filePath);
      if (!stats.isDirectory()) {
        console.warn(`Path is not a directory: ${dirPath}`);
        return [];
      }
    } catch (_error: unknown) {
      console.warn(`Directory does not exist: ${dirPath}`);
      return [];
    }

    // Read all files in the directory
    //const files = await readdir(filePath);
    const entries = await readdir(filePath, { withFileTypes: true });

    // Filter for .md files only
    const markdownFiles = entries.filter((file) => {
      return path.extname(file.name).toLowerCase() === ".md";
    });

    // Get file stats for each markdown file
    const filesWithStats = await Promise.all(
      markdownFiles.map(async (entry) => {
        const fullPath = path.join(filePath, entry.name);
        const fileStats = await stat(fullPath);
        const content = await readFile(fullPath, "utf8");
        const { metadata } = parseFrontmatter(content || "");
        //const imageUrl = (await parseImage(metadata.image)) || null;

        let tags: string[] = [];
        if (metadata.tags) {
          // Handle the format [tag1, tag2, tag3]
          const tagsString = metadata.tags.trim();
          if (tagsString.startsWith("[") && tagsString.endsWith("]")) {
            tags = tagsString
              .substring(1, tagsString.length - 1) // Remove brackets
              .split(",") // Split by commas
              .map((tag: string) => tag.trim()); // Trim whitespace
          }
        }

        return {
          name: entry.name,
          image: metadata.image,
          title: metadata.title || path.basename(entry.name, ".md"),
          description: metadata.description || "",
          tags: tags,
          author: metadata.author || "",
          path: `${dirPath}/${path.basename(entry.name, ".md")}`,
          fullPath: fullPath, // Store absolute path for internal use
          fullName: entry.name,
          date: metadata.date
            ? new Date(metadata.date).getTime()
            : new Date(fileStats.birthtime).getTime(),
          metadata,
        };
      }),
    );

    return filesWithStats.sort((a, b) => b.date - a.date);
  } catch (error) {
    console.error(`Error reading markdown files from ${dirPath}:`, error);
    return [];
  }
}

/**
 * Gets all files in a directory with their metadata
 * @param dirPath Path to the directory to scan
 * @returns Array of file information objects
 */
export async function getFilesWithMetadata(
  dirPath: string,
): Promise<MarkdownFile[]> {
  try {
    const markdownFiles = await getMarkdownFiles(dirPath);

    // Read and parse each file for its metadata
    const filesWithMetadata = await Promise.all(
      markdownFiles.map(async (file) => {
        const content = await readFileIfExistsSafe(file.path);

        if (!content) {
          return {
            ...file,
            metadata: {},
          };
        }

        // Parse frontmatter (you can use your existing parseFrontmatter function)
        // Assuming it's imported or defined elsewhere
        const { metadata } = parseFrontmatter(content);

        return {
          ...file,
          metadata,
        };
      }),
    );

    return filesWithMetadata;
  } catch (error) {
    console.error(`Error getting files with metadata from ${dirPath}:`, error);
    return [];
  }
}

/**
 * Parse frontmatter from markdown content
 */
export function parseFrontmatter(markdown: string) {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return { metadata: {}, body: markdown };

  const frontmatterLines = frontmatterMatch[1].split("\n");
  const metadata: Record<string, string> = {};

  for (const line of frontmatterLines) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length > 0) {
      metadata[key.trim()] = rest.join(":").trim();
    }
  }

  const body = markdown.replace(frontmatterMatch[0], "").trim();
  return { metadata, body };
}
