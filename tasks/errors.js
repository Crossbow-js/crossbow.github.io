const path = require('path');
const fs   = require('fs');

module.exports = function () {

    const docsDir        = path.resolve('_src', 'docs', 'errors');
    const docsErrorIndex = path.join(docsDir, 'index.md');
    const existingFiles  = fs.readdirSync(docsDir);


    const existingMarkdownFiles = existingFiles
        .map(x => x.split('.'))
        .filter(x => x[1] === 'md')
        .map(x => x[0]);

    const errorDir = path.resolve('node_modules', 'crossbow', 'dist', 'reporters');
    const files    = fs.readdirSync(errorDir);

    const listOfErrorNames = files
        .map(x => x.split('.'))
        .filter(parts => parts[parts.length-1] === 'js') // only JS (removes TS dupe)
        .filter(parts => parts[0] === 'error') // only files prefixed with 'error'
        .map(x => x[1]); // grab the name from error.ErrorType.js

    listOfErrorNames.filter(name => existingMarkdownFiles.indexOf(name) === -1) // only care about none-existing
        .map(name => `${name}.md`) // use original name + .md for new filename eg: ErrorType.md
        .forEach(function (filename) { // now write it to disk with empty content
            fs.writeFileSync(path.join(docsDir, filename), '');
        });

    const markdownListOfLinksToErrors = listOfErrorNames
        .map(x => `[${x}](/docs/errors/${x})`)
        .map(x => `- ${x}`)
        .join('\n');

    const header = `---
title: Crossbow Errors
---
`;

    fs.writeFileSync(docsErrorIndex, header + markdownListOfLinksToErrors);
};