# Obsidian Print Plugin

Enhanced printing capabilities for Obsidian notes.

## Features

### Browser-Based Printing
- **Superior Print Experience**: Printing is handled through your web browser, offering significantly more options than Obsidian's built-in Electron-based printing
- **Full Browser Print Features**: Access to all standard browser printing capabilities
- **Print Preview**: Preview your document before printing
- **Easy Access**: Reopen the print dialog anytime using Ctrl+P in the browser window

### Print Modes
- **Two printing modes** available when printing the active note:
  - **Standard mode**: Quick and efficient printing
  - **Advanced mode**: Enhanced rendering for complex elements like Mermaid diagrams and callouts (slightly slower)

### Print Options Modal
![Print Modal](assets/print-modal.png)

The print modal provides quick access to common settings:
- **Print Title**: Toggle the note title visibility in the output
- **Show Metadata**: Toggle frontmatter metadata visibility
- **Page Breaks at HR**: Convert horizontal rules (---) to page breaks
- Choose between Standard or Advanced printing mode

### Additional Features
- Print single notes or entire folders
- Print selection only
- Customizable fonts and colors
- Import theme colors automatically
- Custom CSS support via snippets
- Combine folder notes or separate with page breaks
- Ribbon icon and context menu integration

## Usage

### Quick Start
1. Click the printer icon in the ribbon or use the command palette
2. Choose your print options in the modal
3. Select your printing mode (Standard/Advanced)

### Print Commands
- `Print note (standard)`: Quick printing of the current note
- `Print note (advanced)`: Enhanced rendering for complex elements
- `Print selection`: Print only the selected text
- `Print folder`: Print all notes in the current folder

### Hotkeys
If you print often, you can add a shortcut to the print action. Go to **Settings** > **Hotkeys**, search for 'print' and bind your preferred shortcut.

## Settings
- **Print title**: Include the note title
- **Font size**: Adjust sizes for text and all heading levels
- **Theme colors**: Import or customize colors for headings
- **Print mode**: Choose default mode and modal behavior
- **Combine folder notes**: Remove page breaks between folder notes
- **Show metadata**: Include frontmatter metadata
- **Page breaks at HR**: Convert horizontal rules to page breaks
- **Custom CSS**: Add your own print styles

## Customize CSS
Create a `print.css` snippet file to customize the print output. Use `.obsidian-print` as prefix for your selectors.

Example:
```css
.obsidian-print {
    /* Your custom styles */
}
```