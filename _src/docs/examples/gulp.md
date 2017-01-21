---
title: cbfile.js (Gulp style)
---

Crossbow loves Gulp! We just have slightly different goals which
means Crossbow can do everything Gulp can + a whole bunch more.

Here are some basic comparisons to show how you'd migrate from Gulp
 to Crossbow when you're ready for a better UX.

## Run 1 task (gulp)

```js
// gulp
const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('./scss/core.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
});
```

## Run 1 task (Crossbow)
Note how we need to bring in the `vinyl-fs` (which gulp uses) as Crossbow does 
not include any file-handling systems by design
```js
// cbfile.js
const vfs  = require('vinyl-fs');
const cb   = require('crossbow');
const sass = require('gulp-sass');

cb.task('sass', function() {
    return vfs.src('./scss/core.scss')
        .pipe(sass())
        .pipe(vfs.dest('css'))
});
```

## Run 2 tasks in sequence
Note how in the Crossbow example, there's no need for extra function calls or special syntax because
tasks are always sequentially by default.
```js
// gulp
gulp.task('build', gulp.series(['task1', 'task2']));

// crossbow 
cb.task('build', ['task1', 'task2']);
```

## Run 2 tasks in sequence, where 2nd is 2 tasks in parallel
Again notice how in the Crossbow example, things just work as you expect them to.
```js
// gulp
gulp.task('build', gulp.series(
    'task1',
    gulp.parallel('task2', 'task3')
));

// crossbow
cb.task('build', [
    'task1',
    ['task2', 'task3']
]);

```

## Run Inline functions as tasks

```js
// x not possible in gulp

// crossbow
cb.task('js', [
    function task1() {
        console.log('task 1');
    },
    function task2() {
        console.log('task 2');
    }
]);
```

## Combine regular functions with NPM scripts

```js
// x not possible in gulp

// crossbow
cb.task('js', ['@npm webpack']);

// combine with inline functions
cb.task('js', [
    '@npm webpack',
    function afterWebpack() {
        console.log('webpack completed');
    }
]);
```

## Environment vars
```js
// x no support in gulp

// crossbow
cb.env({
    MY_CONFIG: 'webpack-dev.config.js'
});

cb.task('webpack', '@npm webpack --config $MY_CONFIG');
```

## Running tasks with different inputs

This allows you to define your tasks once and re-use them with different
options. Better still you can use query, flag or task options. So if you
look at the following task, if you want to be able to call it with
`options.production = true` sometimes, and then `options.production = undefined`
 at other times, you can do this in multiple ways.

** Task **

```js
cb.task('sass', function (options) {
    // options available to all tasks
    console.log(options.production);
});
```

Now, on the command line, you run either of the following to set
`production=true`

```sh
# query
$ crossbow sass?production=true
# flags
$ crossbow 'sass --production'
```

But, it gets better. This style of providing options to tasks
can be done when composing tasks.

```js
// call sass task with no options
cb.task('build-dev', ['sass']);

// call sass task with production flag/query
cb.task('build-prod', ['sass?production']);
cb.task('build-prod', ['sass --production']);
```

## Task descriptions
Task descriptions are great self-documentation and will be included in
task lists & also when using the auto-docs feature

```js
// x no support in gulp

// crossbow
cb.task('build', {
    tasks: ['build-js', 'build-css'],
    description: 'Produce production-ready assets'
})
```

## Tasks in separate files
If you would prefer to split your tasks into separate files, Crossbow
supports this out of the box. Simple export a function to be called
and Crossbow will treat it as though it was living in your main file.
This means you should return a stream as you would normally in a gulpfile
if your task is going to run asynchronously.

Note: Options / flags / queries still work as expected

**`tasks/my-task.js`**

```js
const vfs = require('vinyl-fs');
const sass = require('gulp-sass');

module.exports = function sass() {
    return vfs.src('./scss/core.scss')
        .pipe(sass())
        .pipe(vfs.dest('css'));
}
```

**cbfile.js**

```js
cb.task('sass', 'tasks/my-task.js');
```

As always, you can mix and match tasks in external files with inline
functions, npm scripts or anything else Crossbow supports

```js
cb.task('build', [
    'tasks/my-task.js', // external file
    '@sh ls css',       // shell script
    function () {       // inline function
        console.log('2 tasks completed');
    }
]);
```

Be creative!

```js
cb.task('build', [

    // external + npm script in parallel
    ['tasks/my-task.js', '@npm webpack'],

    // inline function called following prev 2 tasks
    function () {
        console.log('2 tasks completed');
    }
]);
```

## Inline options

Crossbow supports the concept of publishing 'tasks' to NPM.
the idea is that what you'd normally place within a gulp task,
you could instead publish that function as an NPM module. The problem
here is that how do you use it with your own file paths/variables?

This is where Crossbow excels, because each task can be called with options
this type of idea (publishing tasks) is now possible.

Let's look at an example. There's a module published on NPM
 called `crossbow-sass`. It looks something like:

```js
var sourcemaps = require('gulp-sourcemaps');
var post       = require('gulp-postcss');
var cssnano    = require('cssnano');
var pre        = require('autoprefixer');
var sass       = require('gulp-sass');
var imp        = require('postcss-import');
var vfs        = require('vinyl-fs');
var rename     = require('gulp-rename');

module.exports = function processSass (options, ctx, done) {
    var productionPlugins = [imp, pre, cssnano];
    var devPlugins = [imp, pre];

    return vfs.src(options.input)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', done))
        .pipe(post(options.production ? productionPlugins : devPlugins))
        .pipe(rename(function (path) {
            if (options.production) {
                if (path.extname === '.css') {
                    return path.basename += '.min';
                }
            }
            return path;
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(vfs.dest(options.output || process.cwd));
};
```

As you can see, it looks very similar to what you'd typically see in a gulp file. But there is 
one **major** difference - the `options` that are passed in. In this case there's `input`, `output` 
and `production`. 

This means across many projects this task setup can be re-used and the only thing that 
changes between each are the options, which you can define in the following way

```js
cb.task('sass', {
    tasks: 'crossbow-sass', // use an npm-installed 'task'
    options: {
        input: 'scss/core.scss',
        output: 'public/css'
    }
});
```

One final thing, how do we call this sometimes with `options.production = true`? Just as we
saw before with either a query or flag. This is especially useful for doing multiple builds.

```js
// utilise an npm-installed 'task' by passing options
cb.task('sass', {
    tasks: 'crossbow-sass',
    options: {
        input: 'scss/core.scss',
        output: 'public/css'
    }
});

// Even pass additional flags to re-use the same task 
cb.task('build-css', [
    'sass',
    'sass --production'
]);
```
