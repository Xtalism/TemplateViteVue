import { promises as fs } from 'fs'
import path from 'path'

/**
 * Deletes all files and directories within a given directory, excluding a specified item.
 *
 * @param {string} directoryPath - The path of the directory where files and directories will be deleted.
 * @param {string} exclusionItem - The name of the file or directory to be excluded from deletion.
 *
 * @returns {Promise<void>} A Promise that resolves when all deletions have completed. If an error occurs, it will be logged to the console.
 */
export const deleteFilesWithExclusion = async (
  directoryPath,
  exclusionItem
) => {
  try {
    const directoryContents = await fs.readdir(directoryPath)
    console.log(`All directories and files listed: ${directoryContents}`)

    for (const item of directoryContents) {
      const itemPath = path.join(directoryPath, item)
      const itemStats = await fs.stat(itemPath)

      if (itemStats.isDirectory()) {
        console.log(`Deleting directory: ${itemPath}`)
        fs.rm(itemPath, { recursive: true })

        continue
      }

      if (item != exclusionItem) {
        console.log(`Deleting file: ${itemPath}`)
        fs.rm(itemPath)
      }
    }
  } catch (error) {
    console.error(`Error deleting files in directory ${directoryPath}:`, error)
  }
}
