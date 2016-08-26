## Tasks

The goal of Crossbow is to unify the use & configuration of the following:

- plain functions
- gulp-style streaming tasks
- tasks splits into separate files
- shell scripts
- NPM scripts.

There is **no need** for a new ecosystems of `crossbow-<plugin-name>` plugins
as it's possible (and recommended) for you to use the existing gulp plugin
ecosystem right along side a shell script or NPM script.

## How it works

Crossbow is an advanced task orchestration system - it thinks of a plain function
 call in the exact same way as something more complicated, like spawning a child
  process.

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