import * as fs from "fs/promises";
import * as path from "path";
import { FileSystem } from "./filesystem.interface";

/**
 * Node.js implementation of FileSystem interface
 */
export class NodeFileSystem implements FileSystem {
  async exists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }

  async readFile(path: string): Promise<string> {
    return fs.readFile(path, "utf-8");
  }

  async writeFile(path: string, data: string): Promise<void> {
    return fs.writeFile(path, data, "utf-8");
  }

  async deleteFile(path: string): Promise<void> {
    return fs.unlink(path);
  }

  async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error: any) {
      if (error.code !== "EEXIST") {
        throw error;
      }
    }
  }

  async chmod(path: string, mode: number): Promise<void> {
    return fs.chmod(path, mode);
  }
}
