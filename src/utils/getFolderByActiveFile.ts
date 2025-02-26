import { App, TFolder } from 'obsidian';

/**
 * Gets the parent folder of the currently active file
 * 
 * @param app The Obsidian App instance
 * @returns The parent folder of the active file, or null if not found
 */
export async function getFolderByActiveFile(app: App): Promise<TFolder|null> {
    const activeFile = app.workspace.getActiveFile();

    if (activeFile) {
        const parentFolder = activeFile.parent;

        if (parentFolder instanceof TFolder) {
            return parentFolder;
        }
    }

    return null;
}