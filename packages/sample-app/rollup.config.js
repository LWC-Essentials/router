import lwc from '@lwc/rollup-plugin';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
//import visualizer from 'rollup-plugin-visualizer';

import path from 'path';

const outputDir = path.resolve(__dirname, `./src/dist`);
const input = path.resolve(__dirname, './src/index.js');
const output = path.join(outputDir, 'app.js');
const env = process.env.NODE_ENV || 'development';

const lwcPlugin = lwc({
    rootDir: './src/modules'
});

export default {
    input,
    output: {
        format: 'iife',
        file: path.join(outputDir, 'app.js')
    },
    plugins: [
        {
            resolveId(id) {
                if (id === 'lwc') {
                    return require('lwc').getModulePath('engine');
                } else if (id === '@lwc/wire-service') {
                    return require('lwc').getModulePath('wire-service');
                } else if (id === '@lwc/synthetic-shadow') {
                    return require('lwc').getModulePath('synthetic-shadow');
                }
            }
        },
        resolve({
            mainFields: ['module', 'main'],
            browser: true
        }),
        lwcPlugin,
        replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
        commonjs()
    ]
};
