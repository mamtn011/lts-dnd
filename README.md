# User Guide for Browser Instruction List Tool

### Open [https://mobin-lts-dnd.vercel.app](https://mobin-lts-dnd.vercel.app) with your browser to see the application.

## Overview

This tool allows you to create and manage a list of browser instructions. You can add, clone, delete, and reorder instructions list. The list item can be of different types, such as fill, delay, click, and wait. The tool also supports undo and redo operations, and the list can be saved and loaded from local storage.

## Features

- **Add Item**: Add new item to the list.
- **Clone Item**: Duplicate existing item.
- **Delete Item**: Remove item from the list.
- **Reorder Item**: Drag and drop item to reorder them.
- **Edit Item**: Change the type and details of each item.
- **Undo/Redo**: Undo or redo changes to the item list.
- **JSON View**: View and edit the item as JSON.
- **Local Storage**: Save and load the list from local storage.

## Instructions

### Adding Item

- Click the "+" button to add a new item.
- A new item will be added with a default type (`wait`) in last of the list.

### Cloning Item

- Click the "Clone" button to duplicate an existing item.
- The cloned item will be added directly below the original item.

### Deleting Item

- Click the "x" button to delete item.

### Reordering Item

- Click and hold the horizontal bars to drag an item .
- Drag the item to the any position you want and release it to drop.

### Editing Item

- **Type**: Select the type of item from the dropdown (`wait`, `fill`, `delay`, `click`).
- **Selector**: Enter the selector for the `fill` or `click` or `wait` item.
- **Text**: Enter the text to be filled for `fill` item.
- **Delay**: Enter the delay in milliseconds for `delay` or `fill` item.

### Undo and Redo

- Click the "Undo" button to return the previous change.
- Click the "Redo" button for redo.
- The buttons will be disabled if history of changes are not available.

### Viewing and Editing JSON

- The JSON view displays the current list of items.
- You can edit the JSON directly. Ensure the JSON format is correct.
- Changes in the JSON view will change in the list item automatically.
- Invalid JSON in the JSON view will alert an error message.

### Saving to Local Storage

- The list is automatically saved to local storage when it changes.
- The saved list will be loaded from local storage when you reload the application.
