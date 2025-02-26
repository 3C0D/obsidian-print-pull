import { Plugin, Notice, TFile, TFolder, MarkdownView } from 'obsidian';
import { PrintPluginSettings, DEFAULT_SETTINGS } from './types';
import { getFolderByActiveFile } from './utils/getFolderByActiveFile';
import { printContent } from './utils/normalPrint';
import { advancedPrint } from './utils/advancedPrint';
import { PrintModeModal } from './modals/PrintModeModal';
import { contentToHTML, generateHTML } from './utils/generatePreviewContent';
import { initializeThemeColors, initializeFontSizes, PrintSettingTab } from './settings';

// TODO: Get MathJax to work

export default class PrintPlugin extends Plugin {
    settings: PrintPluginSettings;

    async onload() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

        // Initialize header colors and font sizes if not done before
        if (!this.settings.hasInitializedColors) {
            await initializeThemeColors(this.app, this);
        }
        // Initialize header colors and font sizes if not done before
        if (!this.settings.hasInitializedSizes) {
            await initializeFontSizes(this);
        }

        this.addCommand({
            id: 'advanced-print',
            name: 'Current note (advanced)',
            callback: async () => {
                await advancedPrint(this.app, this.manifest, this.settings);
            }
        });

        this.addCommand({
            id: 'standard-print',
            name: 'Current note (standard)',
            callback: async () => await this.standardPrint(),
        });

        this.addCommand({
            id: 'print-selection',
            name: 'Selection',
            callback: async () => await this.printSelection(),
        });

        this.addCommand({
            id: 'print-folder-notes',
            name: 'All notes in current folder',
            callback: async () => await this.printFolder(),
        });

        this.addSettingTab(new PrintSettingTab(this.app, this));

        this.addRibbonIcon('printer', 'Print note', async () => {
            await this.handlePrint();
        });

        this.registerEvent(
            this.app.workspace.on('file-menu', (menu, file) => {
                if (file instanceof TFile) {
                    menu.addItem((item) => {
                        item
                            .setTitle('Print note')
                            .setIcon('printer')
                            .onClick(async () => await this.standardPrint(file));
                    });
                } else {
                    menu.addItem((item) => {
                        item
                            .setTitle('Print all notes in folder')
                            .setIcon('printer')
                            .onClick(async () => await this.printFolder(file as TFolder));
                    });
                }
            })
        );

        this.registerEvent(
            this.app.workspace.on('editor-menu', (menu) => {
                menu.addItem((item) => {
                    item
                        .setTitle('Print note')
                        .setIcon('printer')
                        .onClick(async () => await this.handlePrint());
                });
                menu.addItem((item) => {
                    item
                        .setTitle('Print selection')
                        .setIcon('printer')
                        .onClick(async () => await this.printSelection());
                });
            })
        );
    }

    /**
     * Prints the current note or a specified file
     * @param file Optional file to print, defaults to active file
     */
    async standardPrint(file?: TFile) {
        const content = await contentToHTML(this.app, this.settings, file, false);
        if (!content) {
            return;
        }

        await printContent(content, this.app, this.manifest, this.settings);
    }

    /**
     * Prints the currently selected text
     */
    async printSelection() {
        const content = await contentToHTML(this.app, this.settings, undefined, true);
        if (!content) {
            return;
        }

        await printContent(content, this.app, this.manifest, this.settings);
    }

    /**
     * Handles the print logic (standard/advanced) with modal option
     */
    private async handlePrint() {
        if (this.settings.useModal) {
            new PrintModeModal(
                this.app,
                this.settings,
                async (useAdvanced) => {
                    if (useAdvanced === null) return; // Cancel was clicked
                    if (useAdvanced) {
                        await advancedPrint(this.app, this.manifest, this.settings);
                    } else {
                        await this.standardPrint();
                    }
                },
                async () => await this.saveSettings()
            ).open();
        } else {
            await this.standardPrint();
        }
    }

    /**
     * Prints all markdown files in the current folder or specified folder
     * @param folder Optional folder to print, defaults to active file's folder
     */
    async printFolder(folder?: TFolder) {
        if (!folder) {
            await this.saveActiveFile()
        }

        const activeFolder = folder || await getFolderByActiveFile(this.app);

        if (!activeFolder) {
            new Notice('Could not resolve folder.');
            return;
        }

        const files = activeFolder.children.filter((file) => file instanceof TFile && file.extension === 'md') as TFile[];

        if (files.length === 0) {
            new Notice('No markdown files found in the folder.');
            return;
        }

        const folderContent = createDiv();

        for (const file of files) {
            const content = await generateHTML(this.app, this.settings, file, false);

            if (!content) {
                continue;
            }

            if (!this.settings.combineFolderNotes) {
                content.addClass('obsidian-print-page-break');
            }

            folderContent.append(content);
        }

        await printContent(folderContent, this.app, this.manifest, this.settings);
    }

    /**
     * Save the active file before printing, so we can retrieve the most recent content.
     */
    async saveActiveFile(): Promise<TFile | null> {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

        if (activeView) {
            await activeView.save();
        }

        return this.app.workspace.getActiveFile();
    }

    async showPrintModal() {
        const modal = new PrintModeModal(
            this.app,
            this.settings,
            async (useAdvanced) => {
                if (useAdvanced !== null) {
                    if (useAdvanced) {
                        await advancedPrint(this.app, this.manifest, this.settings);
                    } else {
                        await this.standardPrint();
                    }
                }
            },
            async () => await this.saveSettings()
        );
        modal.open();
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
