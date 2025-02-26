import { Modal, App, Setting } from 'obsidian';
import { PrintPluginSettings } from 'src/types';

export class PrintModeModal extends Modal {
    constructor(
        app: App,
        private settings: PrintPluginSettings,
        private onSubmit: (useAdvanced: boolean | null) => void,
        private saveSettings: () => Promise<void>
    ) {
        super(app);
    }

    onOpen() {
        const { contentEl } = this;
        
        // Set modal size
        this.modalEl.style.width = '400px';
        this.modalEl.style.height = '200px';
        
        contentEl.empty();
        contentEl.createEl('h2', { text: 'Print Options' });

        // Create options container
        const optionsContainer = contentEl.createDiv();
        optionsContainer.style.display = 'flex';
        optionsContainer.style.justifyContent = 'center';
        optionsContainer.style.gap = '20px';
        optionsContainer.style.marginBottom = '20px';

        // Print title checkbox
        const titleLabel = optionsContainer.createEl('label');
        const titleCheck = titleLabel.createEl('input', { type: 'checkbox' });
        titleCheck.checked = this.settings.printTitle;
        titleLabel.appendText(' Print Title');
        titleCheck.addEventListener('change', async () => {
            this.settings.printTitle = titleCheck.checked;
            await this.saveSettings();
        });

        // Metadata checkbox
        const metadataLabel = optionsContainer.createEl('label');
        const metadataCheck = metadataLabel.createEl('input', { type: 'checkbox' });
        metadataCheck.checked = this.settings.showMetadata;
        metadataLabel.appendText(' Show Metadata');
        metadataCheck.addEventListener('change', async () => {
            this.settings.showMetadata = metadataCheck.checked;
            await this.saveSettings();
        });

        // Page breaks checkbox
        const breaksLabel = optionsContainer.createEl('label');
        const breaksCheck = breaksLabel.createEl('input', { type: 'checkbox' });
        breaksCheck.checked = this.settings.hrPageBreaks;
        breaksLabel.appendText(' Page Breaks at HR');
        breaksCheck.addEventListener('change', async () => {
            this.settings.hrPageBreaks = breaksCheck.checked;
            await this.saveSettings();
        });

        // Create button container
        const buttonContainer = contentEl.createDiv();
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '20px';

        // Normal Print button
        const normalBtn = buttonContainer.createEl('button');
        normalBtn.setText('Normal Print');
        normalBtn.addEventListener('click', () => {
            this.close();
            this.onSubmit(false);
        });

        // Advanced Print button
        const advancedBtn = buttonContainer.createEl('button');
        advancedBtn.setText('Advanced Print');
        advancedBtn.addEventListener('click', () => {
            this.close();
            this.onSubmit(true);
        });

        // Cancel button
        const cancelBtn = buttonContainer.createEl('button');
        cancelBtn.setText('Cancel');
        cancelBtn.addEventListener('click', () => {
            this.close();
            this.onSubmit(null);
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}