import { App, PluginManifest, Notice, MarkdownView } from 'obsidian';
import { PrintPluginSettings } from 'src/types';

import { PrintManager } from './printManager';
import { getRenderedContent } from './capturePreview';
import { generatePrintStyles } from './generatePrintStyles';

/**
 * Advanced print mode: ensures accurate rendering of complex elements (Mermaid diagrams, 
 * callouts, dynamic content) by capturing the fully rendered preview
 */
export async function advancedPrint(
    app: App,
    manifest: PluginManifest,
    settings: PrintPluginSettings
) {
    try {
        const view = app.workspace.getActiveViewOfType(MarkdownView);
        if (!view) {
            new Notice('No active markdown view');
            return;
        }

        // Switch to light theme
        const wasInDarkMode = document.body.classList.contains('theme-dark');
        if (wasInDarkMode) {
            document.body.classList.replace('theme-dark', 'theme-light');
        }

        try {
            const filePath = view.file?.path || "Untitled";
            
            // Get the HTML content from the rendered preview
            const renderedHtml = await getRenderedContent(app, settings);
            if (!renderedHtml) {
                throw new Error('Failed to capture preview content');
            }
    
            // Generate styles
            const globalCss = await generatePrintStyles(app, manifest, settings);
    
            // Print
            const printer = new PrintManager();
            await printer.browserPrint(printer.createPrintableHtml(renderedHtml, globalCss, true, filePath));

        } finally {
            // Restore theme
            if (wasInDarkMode) {
                document.body.classList.replace('theme-light', 'theme-dark');
            }
        }

    } catch (error) {
        console.error('Advanced print error:', error);
        new Notice('Failed to print content');
    }
}