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
 
**Example:** Let's say you wanted to create a task called 'build-js' - this task will first
 run `webpack` from your local `node_modules` directory followed by a `gulp` plugin that's located 
 in a separate file. In Crossbow this is straight forward. We use the `@npm` adaptor for the webpack bit 
 (this will ensure the locally installed version runs) and then for the task in the separate file, just
  pass the relative path. It would look something like:
   
- yaml
```yml
tasks:
  build-js:
    - '@npm webpack'
    - 'tasks/some-file.js'
```

- js
```js
modules.exports = {
    tasks: {
        'build-js': ['@npm webpack', 'tasks/some-file.js']
    }
}
```

- cbfile
```js
cb.task('build-js', ['@npm webpack', 'tasks/some-file.js']);
```

## Sequential by default. 

Tasks in Crossbow run exactly how you would expect them to. You don't need special syntax or additional plugins
 to ensure that the order you provided is respected - that's how it works by default! This means that when you 
 provide an array of tasks like in the examples above, each task will not begin until the one before it completes
  successfully. This eliminates all race-conditions and makes your tasks easier to reason about.
  
Of course, we provide ways to run tasks in parallel - but this is opt-in and considered something for power-users 
(after all, it assumes a certain amount of programming knowledge) 
   
## Parallel tasks.

To run tasks in parallel, you can either be explicit in the task definition, or you 
