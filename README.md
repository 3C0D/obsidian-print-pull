# Obsidian Print

The **Obsidian Print** plugin adds a print functionality to your Obsidian workspace. You can activate the print action from the Command Palette or via the printer ribbon icon.

![Export-1725021591298](https://github.com/user-attachments/assets/9ab00cc7-1fd4-4841-9a3f-92ea366417d8)

> [!IMPORTANT]  
>  Printing is supported only when you are in the reading view. To switch to reading mode, use the icon in the top right corner, run "Toggle Reading Mode" via the Command Palette or use the shortcut (Cmd/Ctrl + E).

## Features

- **Command Palette Action**: Activate the print action via the Command Palette.
- **Printer Ribbon Icon**: Activate the print function quickly with the printer icon.
- **Direct Print**: Skip the print modal and send your document directly to the default printer.
- **Debug Mode**: Open the print window with your notes content to troubleshoot and adjust styling issues.

You can also add a shortcut to the print action for even quicker access.

## Getting Started

The plugin is submitted to enter the community plugin store. As the backlog is quite long though, the quickest way to install this plugin is to do it manually. Go to the [latest release](https://github.com/marijnbent/obsidian-print/releases/latest) and download the source code. To add this plugin to Obsidian, [watch this video](https://www.youtube.com/watch?v=ffGfVBLDI_0).

## Settings

- **Font Size**: Adjust the font sizes through the settings panel.
- **Direct Print**: Enable to bypass the print dialog and print directly to the default printer.
- **Debug Mode**: Use this to preview and fix styling issues by viewing your notes content in the print window.

![image](https://github.com/user-attachments/assets/438f07ea-de26-49f2-8673-1c51014ee4db)

## Roadmap

Here are some upcoming features I would like to implement:

- **Automatically switch to reading mode**: A feature to automatically switch to reading mode before printing. This is currently prototypes, but does not work for new notes. Assistance from the community is welcome!
- **Display Images**

If you would like to contribute, please get in touch or make a pull request!

## Customize CSS

In the settings, you can adjust the font size for all headings and text, and optionally hide the title.

To further customize the appearance of your printed notes, you can create a `print.css` snippet. The printed document's body contains the `.obsidian-print` class. Be sure to prefix your print-specific CSS with this class so that it only applies to printed content. You can view the default styles [in this file](/styles.css).

If you have trouble with the styling, enable Debug Mode to preview how your notes will look when printed and make any necessary adjustments.