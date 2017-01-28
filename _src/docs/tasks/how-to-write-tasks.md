In Crossbow, tasks are just functions, nothing more. 

```js
module.exports = function simpleTask() {
    console.log('This is a valid task!');
}
```

Tasks are synchronous by default however, which means you'll have to 
have let Crossbow know if you need to do something in an asynchronous manner. You can accomplish this in one of **2** 
ways
  
## 1. return a `Promise`, `Observable` or `Stream` from the task.

**Return a Promise**

This example will ensure any future tasks will not execute for the 5 seconds this takes for the promise to resolve

```js
module.exports = function promiseTask() {
    const longRunningTasks = new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve('Done!');
        }, 5000);
    });
    
    return longRunningTasks; // <!-- return the Promise
}
```

**Return an Observable**

If you're using RxJS or other Observable library, you can return an Observable and Crossbow will handle the subscription.

```js
const Rx = require('rx');

module.exports = function observableTask() {
    return Rx.Observable.just('All done!').delay(5000);
}
```

**Return a Stream**

Anyone familiar with Gulp will feel right at home with Crossbow. It's a recommended practice with Gulp to return 
a stream to signal completion - with Crossbow we have the exact same solution.

```js
const Rx = require('rx');
const vfs = require('vinyl-fs');

module.exports = function streamTask() {
    return vfs.src('./app/scss/main.scss')
        .pipe(sass())
        .pipe(vfs.dest('./dist/css'));
}
```

## Using the `done` callback

It's not always convenient to directly return a type of value that can inform Crossbow about task completion, so for this 
reason we provide a `done` callback as the 3rd argument to every task.

```js
module.exports = function simpleTask(opts, ctx, done) {
    setTimeout(function() {
        done();
    }, 5000);
}
```

**Caution!** Crossbow will look at the function signature of each task. If it sees that you've provided all three arguments
in your function, it will assume that *you* definitely want to signal when the task is complete. This is not a perfect 
 solution by any means, and I'm open to suggestions on how to improve this, but either way just be wary that the 
 following task will NEVER complete because the 3rd argument is provided, but is never called!
 
 ```js
 module.exports = function never(opts, ctx, done) {
     // This task will never complete
 }
 ```
 
 Basically, if you use 3 args, always call `done()`
 
## Handling errors in tasks.

Crossbow will handle errors that are either thrown within your task, or ones that occurs in the lifecycle of whatever
type you return. So if you return a Promise, Observable or Stream, you get error handling for free!

Even with this automatic error handling, there may be other situations in which you want a task to fail, but you
 want to do so in a way that Crossbow understands.
 
 In this example, we still return a `stream` so that normal error handling can occur on the file based operations, 
 but we add `sass().on('error', e => done(e))` so that we can forward errors from the middle of the 'pipe line' where the
 `sass` plugin may error.

```js
const sass = require('gulp-sass');
const vfs = require('vinyl-fs');

module.exports = function processSass(opts, ctx, done) {
    return vfs.src('./app/scss/main.scss')
        .pipe(sass().on('error', e => done(e)))
        .pipe(vfs.dest('./dist/css'));
}
```

## Task Context

You may have noticed `ctx` in the function signature in the examples above - I use as short hand for `context`, 
but basically it's an object that contains run-time specific information.

- `cli` - this contains the parsed command that started Crossbow - you can see input, flags etc.
- `input` - this is what Crossbow is using to resolve tasks/watchers etc. It's usually just your parsed input file, or a merged
    version if you provided multiple.
- `type` - either `watcher` or `command` - with this knowledge you can decide to run your code differently based on whether
   in watch mode or regular command.
- `config` - This is the configuration Crossbow is using.
    
