import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default [
    // CommonJS
    {
        preserveModules: true,
        input: './src/index.ts',
        output: [
            {
                dir: './dist',
                format: 'cjs'
            }
        ],
        external: [
            ...Object.keys(pkg.dependencies || {})
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            typescript({
                typescript: require('typescript')
            }),
            postcss({
                sourceMap: true,
                extract: true,
                modules: true,
                minimize: true
            }),
            // terser() // minifies generated bundles
        ]
    }
];