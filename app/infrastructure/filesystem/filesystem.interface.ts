/**
 * File system abstraction interface
 */
export interface FileSystem {
  /**
   * Check if a file exists
   * @param path Path to check
   */
  exists(path: string): Promise<boolean>;

  /**
   * Read a file as text
   * @param path File path
   */
  readFile(path: string): Promise<string>;

  /**
   * Write text to a file
   * @param path File path
   * @param data Data to write
   */
  writeFile(path: string, data: string): Promise<void>;

  /**
   * Delete a file
   * @param path File path
   */
  deleteFile(path: string): Promise<void>;

  /**
   * Ensure a directory exists
   * @param path Directory path
   */
  ensureDir(path: string): Promise<void>;

  /**
   * Set file permissions
   * @param path File path
   * @param mode Permission mode (octal)
   */
  chmod(path: string, mode: number): Promise<void>;
}
