import chalk from "chalk";
import escapeHtml from 'escape-html';
import fs from "fs";
import glob from "glob";
import grayMatter from 'gray-matter';
import gulp from 'gulp';
import Handlebars from "handlebars";
import loadLanguages from 'prismjs/components/index.js';
import path from "path";
import prism from 'prismjs';
import markdownIt from "markdown-it";
import markdownItExternalLinks from 'markdown-it-external-links';
import readingTime from 'reading-time';

import {createDirectory, markdownDir, templateDir, templateRenderDir} from "./paths.js";

/*
 * We read the Handlebar template files into the template dictionary.
 */
const templates = {};
function readAllTemplates(callback) {
    const files = fs.readdirSync(templateDir);
    files.forEach((file) => {
        const name = path.basename(file, ".html.hbs");
        const data = fs.readFileSync(path.resolve(templateDir, file));
        templates[name] = data.toString();
    });
    callback();
}

/*
 * We need to render code blocks with syntax highlighting and proper formatting.
 *
 * These functions are adapted from Vuepress's way of rendering markdown code blocks:
 * https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/markdown/lib/highlight.js
 */
function wrap(code, lang) {
    if (lang === 'text') {
        code = escapeHtml(code);
    }
    return `<pre class="language-${lang}"><code>${code}</code></pre>`
}

function highlight(str, lang) {
    if (!lang) {
        return wrap(str, 'text');
    }
    if (!prism.languages[lang]) {
        try {
            loadLanguages([lang]);
        } catch (e) {
            console.log(chalk.yellow(`Syntax highlighting for language ${lang} is not supported.`));
        }
    }
    if (prism.languages[lang]) {
        const code = prism.highlight(str, prism.languages[lang], lang);
        return wrap(code, lang);
    }
    return wrap(str, 'text');
}

/*
 * Now, we want to iterate through all the markdown files and read their properties.
 */
const markdown = [];
function readAllMarkdownFiles(callback) {
    const files = glob.sync(path.join(markdownDir, "**/*.md"));
    files.forEach((file) => {
        const data = fs.readFileSync(file);
        const result = grayMatter(data.toString());
        const md = markdownIt({
            html: true,
            highlight: highlight
        });
        md.use(markdownItExternalLinks, {
            externalClassName: null,
            internalDomains: ['akaritakai.net'],
            externalTarget: '_blank',
            externalRel: 'noopener noreferrer'
        });
        result['render'] = md.render(result.content);
        markdown.push(result);
    });
    callback();
}

/*
 * Now we want to actually render the templates.
 */
function renderAllTemplates(callback) {
    // Register handlebar partials
    for (const name in templates) {
        Handlebars.registerPartial(name, templates[name]);
    }

    // All the blog posts in descending order
    let posts = markdown.filter((post) => post.data.blog);
    posts.sort((a, b) => {
        return new Date(b.data.date) - new Date(a.data.date);
    });
    posts = posts.map((post) => {
        return {
            title: post.data.title,
            date: post.data.date.toISOString().split('T')[0],
            path: post.data.path
        }
    });

    markdown.forEach((md) => {
        // The content of the template will be the markdown content.
        Handlebars.registerPartial('content', md.render);

        // Now we generate the HTML
        const html = Handlebars.compile(templates['index'])({
            title: md.data.title,
            description: md.data.description,
            blog: md.data.blog,
            readingTime: readingTime(md.content).text,
            date: md.data.date ? md.data.date.toISOString().split('T')[0] : null,
            path: md.data.path,
            posts: posts,
            blogIndex: md.data.path === '/blog/',
            thumbnail: md.data.thumbnail || 'https://akaritakai.net/assets/img/avatar-vacation-large.webp',
            ogType: md.data.blog ? 'article' : 'website',
            tags: md.data.tags
        });

        // Let's figure out the file path from the frontmatter
        fs.mkdirSync(templateRenderDir + md.data.path, { recursive: true });
        fs.writeFileSync(templateRenderDir + md.data.path + 'index.html', html);
    });
    callback();
}

export default gulp.series(
    gulp.parallel(
        createDirectory(templateRenderDir),
        readAllTemplates,
        readAllMarkdownFiles),
    renderAllTemplates
);
