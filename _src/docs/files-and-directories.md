# File and Directories

Crossbow will look in your current directory for any of
the following files to use as your input.

```
cbfile.js
crossbow.yaml
crossbow.js
crossbow.json
```

Note: Crossbow does not *require* you to use an input file,
but it's the recommended approach for standardising tasks
across teams.

## cbfile.js

Use this method if you prefer to write your task definitions
in the style of Gulp.

```js
const cb = require('crossbow');

cb.task('some-task', function () {
    // task code
});
```

Now, to invoke `some-task`, you would run the following command

```sh
crossbow some-task
```


### Running tasks in series

Composing tasks is much simpler than in Gulp, whilst also being more powerful.

**NO** special syntax is needed to ensure sequential execution of your tasks, just provide
an array, and they will execute in that exact order, each waiting for the previous to complete.

```js
const cb = require('crossbow');

// Guaranteed running order task-1 -> task-2
cb.task('some-task', ['task-1', 'task-2']);
```

This works with all task types, so you could, for example compose an NPM script + anonymous function.

```js
cb.task('some-task', [
    '@npm webpack --config webpack-prod.js',
    function mySecondTask() {
       // This will run until the previous is complete
       console.log('Webpack completed!');
    }
]);
```

### Running tasks in parallel

Crossbow improves upon both Gulp and NPM by making parallel execution a first-class citizen, whilst
being incredibly simple to use. Either use `runMode` or a nested array to define tasks that execute
at the same time.


```js
// Object literal as a task using `runMode: parallel`
cb.task('race', {
    tasks: ['@npm webpack', 'my-other-task'],
    runMode: 'parallel'
});

// Using a nested array, 'clean' must complete
// before the other two tasks begin together
cb.task('race', ['clean', ['@npm webpack', 'my-other-task']]);

// Combine the two methods
cb.task('race', ['clean', 'race']);
```

You can build up some very cool task chains in this way to maximise performance.

```js
// For comparison with Gulp 4.x:
// 3 tasks in sequence
// second task consists of 2 others in parallel
// 3rd must not start unless all from 1 & 2 complete

// with crossbow:
cb.task('race', [
    'clean',
    ['webpack', 'my-other-task'],
    'deploy'
]);

// with gulp
gulp.task('race', gulp.series(
    'clean',
    gulp.parallel('webpack', 'my-other-task'),
    'deploy'
));

```

## crossbow.yaml

Crossbow loves yaml. Provide a top-level `tasks` property,
and it's keys become the task names.

This defines 3 tasks, `clean`, `webpack` & `build`. Where the
first 2 are NPM scripts & the third is a composition of of those.
Remember though, every runs in sequence by default, so in the following,
you can guarantee that `clean` will have completed before `webpack` starts.


```yml
# crossbow.yaml
tasks:
  clean:   '@npm rimraf ./app'
  webpack: '@npm webpack'
  build:
    - clean
    - webpack
```

### Parallel

To min-n-match series + parallel tasks, you can provide the `runMode`
property as seen before

```yml
# crossbow.yaml
tasks:
  clean:
    runMode: 'parallel'
    tasks:
      - '@npm rimraf ./dist/css'
      - '@npm rimraf ./dist/js'
  webpack: '@npm webpack'
  build:
    tasks:
       - clean
       - webpack
```

Alternatively, you can provide nested arrays

```yml
tasks:
  webpack: '@npm webpack'
  build:
    runMode: 'parallel'
    tasks:
       - ['@npm rimraf ./dist/css', '@npm rimraf ./dist/js']
       - webpack

```

## crossbow.js
We also support providing a JS input file, you just need to use `module.exports`
to export your input.

```js
// crossbow.js
module.exports = {
  tasks: {
    clean: '@npm rimraf ./app'
    webpack: '@npm webpack',
    build: ['clean', 'webpack']
  }
}
```

It gets crazy cool when you use this technique, as it allows you to build your
input dynamically using string interpolation, variables etc.

### Parallel

As always, you can provide an object for each task which allows you to specify
`runMode` & `tasks` properties.

```js
// crossbow.js
 module.exports = {
   tasks: {
     clean: {
       description: 'Clean 2 directories in parallel',
       runMode: 'parallel',
       tasks: [
         '@npm rimraf ./app',
         '@npm rimraf ./css',
       ]
     },
     webpack: '@npm webpack',
     build: ['clean', 'webpack']
   }
 }
```

Or, again you can use inline nested arrays to specific parallel tasks.
```js
// crossbow.js
// -> rimraf ./app -> webpack
// -> rimraf ./css
module.exports = {
  tasks: {
    webpack: '@npm webpack',
    build: [
      ['@npm rimraf ./app', '@npm rimraf ./css'],
      'webpack'
    ]
  }
}
```

### Inline functions

Another benefit to using a JS input file, is that you can provide inline functions
too. So if you wanted to do something after a webpack build for example, you
could provide a function directly in your tasks definition.

```js
// crossbow.js
module.exports = {
  tasks: {
    webpack: '@npm webpack',
    after: function () {
      // This is so cool!
      console.log('Webpack completed');
    },
    build: ['webpack', 'after']
  }
}
```