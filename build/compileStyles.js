import chalk from "chalk";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import gulp from 'gulp';
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";

import {createDirectory, removePath, styleCompileDir, styleDir} from "./paths.js";

function compileStyles(callback) {
    const config = {
        mode: 'production',
        entry: {
            style: path.resolve(styleDir, 'index.scss')
        },
        output: {
            path: styleCompileDir,
            filename: 'style.js'
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin()
            ]
        },
        module: {
            rules: [
                {
                    test: /\.scss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css'
            })
        ]
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
            return callback(new Error('Style build failed with errors.'));
        }
        callback();
    });
}

export default gulp.series(
    createDirectory(styleCompileDir),
    compileStyles,
    removePath(path.resolve(styleCompileDir, 'style.js'))
);