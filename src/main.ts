import { Plugin, PluginSettingTab, App, MarkdownView, Notice } from 'obsidian';
import { PrintSettingTab } from './settings';
import { PrintPluginSettings, DEFAULT_SETTINGS } from './types';
import { openPrintModal } from './printModal';
import { join } from 'path';

export default class PrintPlugin extends Plugin {
    settings: PrintPluginSettings;

    async onload() {

        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        
        this.addCommand({
            id: 'print-note',
            name: 'Print Current Note',
            callback: () => this.printNote(),
        });

        this.addSettingTab(new PrintSettingTab(this.app, this));

        this.addRibbonIcon('printer', 'Print Note', (evt: MouseEvent) => {
            this.printNote();
        });
    }

    async printNote() {
        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);

        if (!activeView) {
            new Notice('No active note to print.');
            return;
        }

        if (activeView.getMode() !== 'preview') {
            new Notice('Please open the reading view first.');
            return;
        }

        const content = activeView.contentEl.querySelector('.markdown-reading-view');
        if (!content) {
            new Notice('Failed to retrieve note content.');
            return;
        }

        const printContent = content.cloneNode(true) as HTMLElement;
        const titleElement = printContent.querySelector('.inline-title');

        if (!this.settings.printTitle && titleElement) {
            titleElement.remove();
        }

        /**
         * Generating the full path to styles.css and the optional print.css snippet.
         */
        const vaultPath = (this.app.vault.adapter as any).getBasePath();
        
        const pluginPath = this.manifest.dir ?? '';
        const cssPath = join(pluginPath, 'styles.css');
        const pluginStylePath = join(vaultPath, cssPath);

        const snippetsPath = join(vaultPath, '.obsidian', 'snippets');
        const userStylePath = join(snippetsPath, 'print.css');

        await openPrintModal(printContent.innerHTML, this.settings, pluginStylePath, userStylePath);
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}