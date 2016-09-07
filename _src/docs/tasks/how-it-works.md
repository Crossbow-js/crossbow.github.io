## Tasks

The goal of Crossbow is to unify the use & configuration of the following:

- plain functions
- gulp-style streaming tasks
- tasks splits into separate files
- shell scripts
- NPM scripts.

## What's different

There is **no need** for a new ecosystems of `crossbow-<plugin-name>` plugins
as it's possible (and recommended) for you to use the existing gulp plugin
ecosystem right along side any number of shell script, plain functions or even NPM scripts.

We enable this by having a **powerful task resolution system**, **an extremely reliable 
execution technique**, by offering **best-in-game error handling** and finally by offering features
that are simply **not possible in other tools**.
  

## How it works

Crossbow is an advanced task orchestration system - it thinks of a plain function 
call in the exact same way as something more complicated, like spawning a child
process. By unifying maybe types of tasks in this way, we're able to offer a composition model
far superior to anything you've used in the past.

## Plain Functions

There are situation when you want to provide a function as a task. This can be done inline if you're
using the `cbfile` or `js` format. Let's say you have a `sass` task for compiling CSS, something like:

```js
function () {
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
}
```

To use this within Crossbow, you can put that task into a separate file, let's say you name it `sass.js`
 and place in a `tasks` directory.


```js
// tasks/sass.js

const gulp = require('gulp');
const sass = require('gulp-sass');

module.exports = function () {
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
}
```

Now, without any configuration you could run...

```
$ crossbow sass
```

... and your task will be executed

If you are using a config file, you can either inline the function directly, or just provide a path
to the file:

yaml
```yaml
tasks:
  sass:
    - 'tasks/sass.js'
```

js
```js
modules.exports = {
    tasks: {
        'sass': ['tasks/sass.js']
    }
}
```

cbfile

```js
cb.task('sass', ['tasks/sass.js'])

// or, place the function inline

cb.task('sass', function () {
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
})
```

**Composition** - remember that when using Crossbow, you can mix & match how you
define tasks. So for example if you had a very large task separated into a file
called `tasks/massive.js` - you could still compose task pipelines such as the following

```js
cb.task('sass', [
   'tasks/massive.js', // Some huge task that must complete
   function () {       // Some function that will execute after
       return gulp.src('scss/main.scss')
           .pipe(sass())
           .pipe(gulp.dest('css'))
   }
]);
```

You can even specify Task Group Options for mix & matched tasks and have them all
run in parallel

```js
cb.task('sass', {
    tasks: [
       'tasks/massive.js',
       'tasks/sass.js',
    ],
    runMode: 'parallel'
});
```

## gulp-style streaming tasks

If you are currently using Gulp and would prefer to use a more developer friendly Task runner, you can
for the most part just find/replace `gulp.task` -> `cb.task`.

**Gulp task example**

```js
const gulp = require('gulp');
const easysvg = require('easy-svg');

gulp.task('icons', function svgIcons () {
    return gulp.src('public/img/svg/*.svg')
        .pipe(easysvg.stream())
        .pipe(gulp.dest('public/svg'));
});
```

Converting this to Crossbow couldn't be simpler.

```js
const vfs = require('vinyl-fs');
const crossbow = require('crossbow');
const easysvg = require('easy-svg');

crossbow.task('icons', function svgIcons () {
    return vfs.src('public/img/svg/*.svg')
        .pipe(easysvg.stream())
        .pipe(vfs.dest('public/svg'));
});
```

Note how we need to bring in `vinyl-fs` here as a separate dependency
as Crossbow does not include any file-handling libraries. This is deliberate
as I designed it to be the best generic task runner available and the
streaming-files, gulp-style workflow is just 1 use case.

** Where Crossbow differs from Gulp **

First, because Gulp was designed to be simple, with a tiny API, it makes
some things related to task-running either awkward to manage, or just
impossible.

- easier composition
    - If you wanted to run 2 tasks in sequence, but the second task
    was actually a group of tasks you wanted to run in parallel - you
    can model this much easier than in Gulp. Eg:

    ```js
    // Define a plain function as a task
    cb.task('my-fun', function () {
        // Some task
    });

    // Now define 2 tasks to run in parallel
    cb.task('my-parallel-tasks', {
        runMode: 'parallel',
        tasks: ['tasks/file1.js', '@npm webpack']
    });

    // Finally compose them together.
    // Note how there's no need to addition syntax or method calls
    cb.task('build', ['my-fun', 'my-parallel-tasks']);
    ```
    There's even a short hand for running a sub-set of tasks in parallel, just
    used a nested array.

    ```js
    // Define a plain function as a task
    cb.task('my-fun', function () {
        // Some task
    });

    // Here, my-fun MUST complete before the following two tasks
    // are executed in parallel
    cb.task('build', ['my-fun', ['tasks/file1.js', '@npm webpack']]);
    ```

