import type { BundledLanguage, BundledTheme, ThemedToken } from 'shiki'
import { FontStyle, codeToTokensBase, getSingletonHighlighter } from 'shiki'

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
export const renderToCanvas = async (canvas: HTMLCanvasElement, codeThemeOptions: CodeThemeOptions, canvasOptions?: CanvasOptions) => {
    const { code, lang, theme } = codeThemeOptions
    // init canvas
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas.getBoundingClientRect()
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio

    const { x = 0, y = 0, w = width, h = height, fontFamily = 'monospace', fontSize = 13, lineHight = fontSize * 1.5, letterSpacing = 0 } = canvasOptions || {}

    if (!ctx) {
        return
    }
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    ctx.textBaseline = 'top'
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.letterSpacing = `${letterSpacing}px`

    const lines = await codeToTokensBase(code, {
        lang,
        theme,
    })
    const _theme = await getSingletonHighlighter()
    const bg = _theme.getTheme(theme).bg

    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, h);

    for (const i in lines) {
        renderLine(ctx, lines[i], { x, y: y + parseInt(i) * lineHight })
    }
}


const fontStyleMap = {
    [FontStyle.Bold]: 'bold',
    [FontStyle.Italic]: 'italic',
    [FontStyle.Underline]: 'underline',
}


const renderLine = (ctx: CanvasRenderingContext2D, line: ThemedToken[], pos: { x: number, y: number }) => {
    let offsetWidth = 0;
    for (let token of line) {
        const { content, color, fontStyle } = token
        fontStyle && fontStyleMap[fontStyle] && (ctx.font = `italic ${ctx.font}`)

        if (color) {
            ctx.fillStyle = color
            ctx.fillText(content, pos.x + offsetWidth, pos.y)
            const textMetrics = ctx.measureText(content);
            offsetWidth += Math.max((textMetrics.actualBoundingBoxRight + textMetrics.actualBoundingBoxLeft), textMetrics.width)
        }
    }
}
