import path from "path";
import {fileURLToPath} from "url";
import fs from "fs";
import chalk from "chalk";

// Common paths
const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Empty JS file to appease webpack
export const emptyJsPath = path.resolve(__dirname, 'build', 'empty.js');

// Directory input paths
export const templateDir = path.resolve(__dirname, 'templates');
export const styleDir = path.resolve(__dirname, 'styles');
export const scriptDir = path.resolve(__dirname, 'scripts');
export const markdownDir = path.resolve(__dirname, 'markdown');
export const assetsDir = path.resolve(__dirname, 'assets');

// Directory output paths
export const outputDir = path.resolve(__dirname, 'output');
export const scriptCompileDir = path.resolve(outputDir, 'compiled-scripts');
export const styleCompileDir = path.resolve(outputDir, 'compiled-styles');
export const templateRenderDir = path.resolve(outputDir, 'rendered-templates');
export const templateCompileDir = path.resolve(outputDir, 'compiled-templates');
export const distDir = path.resolve(outputDir, 'dist');
export const mapsCompileDir = path.resolve(outputDir, 'compiled-maps');

export const createDirectory = function (dir) {
    return function (callback) {
        fs.mkdir(dir, err => {
            if (err) {
                console.log(chalk.red(err));
                return callback(err);
            }
            callback();
        })
    }
}

export const removePath = function (dir) {
    return function (callback) {
        fs.rm(dir, { force: true, recursive: true }, err => {
            if (err) {
                console.log(chalk.red(err));
                return callback(err);
            }
            callback();
        })
    }
}

export const recursiveCopy = function(from, to) {
    return function (callback) {
        fs.cp(from, to, { recursive: true }, err => {
            if (err) {
                console.log(chalk.red(err));
                return callback(err);
            }
            callback();
        })
    }
}