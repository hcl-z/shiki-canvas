# Code Highlighting Canvas Renderer
![](https://raw.githubusercontent.com/hcl-z/shiki-canvas/main/screenshots/canvas.png)

This module provides functionality to render syntax-highlighted code onto an HTML canvas element. It uses the shiki library to tokenize code and applies themes for syntax highlighting.

# Features
Syntax highlighting for a variety of programming languages.
Customizable themes for highlighting.
Rendering of highlighted code onto a canvas element.

# Installation
To use this code highlighting feature, ensure you have shiki installed in your project:
```
npm install shiki-canvas
```

# Usage
Import the renderToCanvas function and associated types from the module:
```js
import { renderToCanvas, BundledLanguage, BundledTheme } from 'shiki-canvas';

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

const codeThemeOptions = {
    code: 'const hello = "world";',
    lang: 'typescript' as BundledLanguage,
    theme: 'nord' as BundledTheme
};

const canvasOptions = {
    x: 10,
    y: 10,
    w: 400,
    h: 400,
    fontFamily: 'Fira Code',
    fontSize: 16,
    lineHight: 24,
    letterSpacing: 1
};

renderToCanvas(canvas, codeThemeOptions, canvasOptions);
```
# API

`renderToCanvas(canvas, codeThemeOptions, canvasOptions?)`

Renders the provided code onto the canvas with syntax highlighting.

## Parameters
```js
/**
 * Options for configuring a code theme.
 *
 * @property {string} code - The code to highlight.
 * @property {BundledLanguage} lang - The language of the code.
 * @property {BundledTheme} theme - The theme to apply to the code.
 */
interface CodeThemeOptions {
    code: string;
    lang: BundledLanguage;
    theme: BundledTheme;
}

/**
 * Options for configuring a canvas.
 * @property {number} [x] - The x-coordinate of the top-left corner of the canvas. Default is 0.
 * @property {number} [y] - The y-coordinate of the top-left corner of the canvas. Default is 0.
 * @property {number} [w] - The width of the canvas. Default is 800.
 * @property {number} [h] - The height of the canvas. Default is 800.
 * @property {string} [fontFamily='monospace'] - The font family to use for the canvas.
 * @property {number} [fontSize=13] - The font size to use for the canvas.
 * @property {number} [lineHight=13*1.5] - The line height to use for the canvas.
 * @property {number} [letterSpacing] - The letter spacing to use for the canvas.
 * 
 */
interface CanvasOptions {
    x?: number
    y?: number
    w?: number
    h?: number
    fontFamily?: string
    fontSize?: number
    lineHight?: number
    letterSpacing?: number
}
```

