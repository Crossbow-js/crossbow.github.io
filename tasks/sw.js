const vfs = require('vinyl-fs');

function createServiceWorker () {
    const swPrecache = require('sw-precache');
    const rootDir = 'public';

    return swPrecache.write('public/sw.js', {
        // Used to avoid cache conflicts when serving on localhost.
        cacheId: 'crossbow.io' || 'web-starter-kit',
        // sw-toolbox.js needs to be listed first. It sets up methods used in runtime-caching.js.
        importScripts: [
            'js/sw/sw-toolbox.js',
            'js/sw/runtime-caching.js'
        ],
        staticFileGlobs: [
            // Add/remove glob patterns to match your directory setup.
            `${rootDir}/js/*.js`,
            `${rootDir}/js/dist/*.js`,
            `${rootDir}/favicon.ico`
        ],
        dynamicUrlToDependencies: {
            "/":                  ["public-html/index.html"],
            "/docs":              ["public-html/docs/index.html"],
            "/docs/cli-options":    ["public-html/docs/cli-options/index.html"],

            "/docs/commands/docs": ["public-html/docs/commands/docs/index.html"],
            "/docs/commands/init": ["public-html/docs/commands/init/index.html"],
            "/docs/commands/run": ["public-html/docs/commands/run/index.html"],
            "/docs/commands/tasks": ["public-html/docs/commands/tasks/index.html"],
            "/docs/commands/watch": ["public-html/docs/commands/watch/index.html"],

            "/docs/define-tasks-in-files":["public-html/docs/define-tasks-in-files/index.html"],
            "/docs/environment-variables":["public-html/docs/environment-variables/index.html"],


            "/docs/examples/gulp":  ["public-html/docs/examples/gulp/index.html"],
            "/docs/examples/module-exports": ["public-html/docs/examples/module-exports/index.html"],
            "/docs/examples/yaml": ["public-html/docs/examples/yaml/index.html"],

            "/docs/file-watching": ["public-html/docs/file-watching/index.html"],
            "/docs/files-and-directories": ["public-html/docs/files-and-directories/index.html"],
            "/docs/installation": ["public-html/docs/installation/index.html"],
            "/docs/options": ["public-html/docs/options/index.html"],
            "/docs/other-ways-of-defining-tasks": ["public-html/docs/other-ways-of-defining-tasks/index.html"],
            "/docs/pass-options-to-tasks": ["public-html/docs/pass-options-to-tasks/index.html"],
            "/docs/run-your-first-task": ["public-html/docs/run-your-first-task/index.html"],
            "/docs/running-tasks-in-parallel": ["public-html/docs/running-tasks-in-parallel/index.html"],
            "/docs/sub-tasks": ["public-html/docs/sub-tasks/index.html"],
            "/docs/task-groups": ["public-html/docs/task-groups/index.html"],
            "/docs/tasks/types" :["public-html/docs/tasks/types/index.html"],
            "/docs/tasks/how-to-write-tasks" :["public-html/docs/tasks/how-to-write-tasks/index.html"],
            "/docs/tasks/adaptor-tasks" :["public-html/docs/tasks/adaptor-tasks/index.html"],
            "/docs/tasks/task-properties" :["public-html/docs/tasks/task-properties/index.html"],
            "/docs/tasks/how-it-works" :["public-html/docs/tasks/how-it-works/index.html"],
            "/docs/use-task-aliases" :["public-html/docs/use-task-aliases/index.html"]
        },
        // Translates a static file path to the relative URL that it's served from.
        // This is '/' rather than path.sep because the paths returned from
        // glob always use '/'.
        stripPrefix: rootDir + '/'
    });
}


module.exports = createServiceWorker;