import chalk from "chalk";
import gulp from 'gulp';
import path from "path";
import TerserJsPlugin from "terser-webpack-plugin";
import webpack from "webpack";

import {createDirectory, scriptCompileDir, scriptDir} from "./paths.js";

function compileScripts(callback) {
    const config = {
        mode: 'production',
        entry: path.resolve(scriptDir, 'index.js'),
        output: {
            path: scriptCompileDir,
            filename: 'site.js'
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserJsPlugin({
                    terserOptions: {
                        compress: true,
                        format: {
                            comments: false
                        },
                        mangle: true,
                    },
                    extractComments: false
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        compact: true
                    }
                }
            ]
        }
    };
    webpack(config, (err, stats) => {
        if (err) {
            console.log(chalk.red(err));
            return callback(err);
        }
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));
        if (stats.hasErrors()) {
            return callback(new Error('Script build failed with errors.'));
        }
        callback();
    });
}

export default gulp.series(
    createDirectory(scriptCompileDir),
    compileScripts
);