import typescript from '@rollup/plugin-typescript';

export default {
    input: 'index.ts',
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs'
        }, {
            file: 'dist/index.mjs',
            format: 'es'
        }
    ],
    plugins: [
        typescript()
    ]
};