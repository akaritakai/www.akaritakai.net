import chalk from "chalk";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";
import fs from "fs";
import glob from 'glob';
import gulp from 'gulp';
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";

import {createDirectory, emptyJsPath, faviconDir, removePath, templateCompileDir, templateRenderDir} from "./paths.js";
import renderTemplates from "./renderTemplates.js";

function compileTemplates(callback) {
    const files = glob.sync(path.join(templateRenderDir, "**/index.html"));
    const promises = [];
    files.forEach((inputFile) => {
        const relativeFile = path.relative(templateRenderDir, inputFile);
        const outputFile = path.join(templateCompileDir, relativeFile);
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        const config = {
            mode: 'production',
            entry: emptyJsPath,
            output: {
                path: path.dirname(outputFile),
                filename: 'index.js'
            },
            optimization: {
                minimize: true
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: inputFile,
                    filename: 'index.html',
                    inject: false,
                    minify: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        html5: true,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        sortAttributes: true,
                        sortClassName: true,
                        useShortDoctype: true
                    }
                }),
                new FaviconsWebpackPlugin({
                    logo: path.join(faviconDir, 'favicon.png'),
                    prefix: '',
                    favicons: {
                        appName: null,
                        appShortName: null,
                        appDescription: null,
                        developerName: null,
                        developerURL: null,
                        lang: "en-US",
                        logging: false,
                        pixel_art: false,
                        icons: {
                            android: false,
                            appleIcon: false,
                            appleStartup: false,
                            coast: false,
                            favicons: true,
                            firefox: false,
                            windows: false,
                            yandex: false
                        }
                    }
                })
            ]
        };
        promises.push(new Promise((resolve, reject) => {
            webpack(config, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    process.stdout.write(stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }));
                    if (stats.hasErrors()) {
                        reject(new Error('Template compilation build failed with errors.'));
                    } else {
                        fs.rmSync(path.join(path.dirname(outputFile), 'index.js'));
                        resolve();
                    }
                }
            });
        }));
        Promise.all(promises)
            .then(() =>{
                callback();
            })
            .catch((err) => {
                console.error(chalk.red(err));
                callback(err);
            });
    });
}

export default gulp.series(
    gulp.parallel(
        createDirectory(templateCompileDir),
        renderTemplates),
    compileTemplates
);