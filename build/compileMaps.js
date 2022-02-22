import fs from "fs";
import glob from "glob";
import grayMatter from 'gray-matter';
import gulp from 'gulp';
import path from "path";
import RSS from 'rss';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

import {createDirectory, mapsCompileDir, markdownDir} from "./paths.js";

/*
 * Now, we want to iterate through all the markdown files and read their paths.
 */
const markdown = [];
function readAllMarkdownFiles(callback) {
    const files = glob.sync(path.join(markdownDir, "**/*.md"));
    files.forEach((file) => {
        const data = fs.readFileSync(file);
        const result = grayMatter(data.toString());
        markdown.push(result);
    });
    callback();
}

const now = new Date();

/*
 * We want to generate the sitemap
 */
function generateSitemap(callback) {
    const links = [];
    markdown.forEach((file) => {
        const date = file.data.date || now.toISOString();
        const link = {
            url: file.data.path,
            changefreq: 'daily',
            lastmod: date
        };
        links.push(link);
    });
    const stream = new SitemapStream({
        hostname: 'https://akaritakai.net/',
        xmlns: {
            news: false,
            xhtml: false,
            image: false,
            video: false
        }
    });
    streamToPromise(Readable.from(links).pipe(stream))
        .then((result) => {
            fs.writeFileSync(path.join(mapsCompileDir, 'sitemap.xml'), result);
            callback();
        })
        .catch((err) => {
            callback(err);
        });
}

/*
 * We want to generate the RSS feed
 */
function generateRss(callback) {
    // Format a date like 'May 20, 2012 04:00:00 GMT' for 'now'
    const feed = new RSS({
        title: "Justin's Blog",
        description: "Blog posts by Justin",
        feed_url: 'https://akaritakai.net/rss.xml',
        site_url: 'https://akaritakai.net/blog/',
        pubDate: now,
        language: 'en-US',
        ttl: 1440,
    });
    markdown.forEach((file) => {
        if (file.data.blog) {
            feed.item({
                title: file.data.title,
                description: file.data.description,
                url: `https://akaritakai.net${file.data.path}`,
                categories: file.data.tags,
                date: file.data.date,
            });
        }
    });
    fs.writeFileSync(path.join(mapsCompileDir, 'rss.xml'), feed.xml());
    callback();
}

export default gulp.series(
    gulp.parallel(createDirectory(mapsCompileDir), readAllMarkdownFiles),
    gulp.parallel(generateSitemap, generateRss)
);
