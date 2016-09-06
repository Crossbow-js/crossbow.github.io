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

Composing tasks is much simpler than in Gulp, whilst also being more powerful.

### Running tasks in series

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

