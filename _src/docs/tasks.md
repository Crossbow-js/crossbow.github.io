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

yaml
```js
tasks:
  build-js:
    - '@npm webpack'
    - tasks/some-file.js
```
js
```js
modules.exports = {
    tasks: {
        'build-js': ['@npm webpack', 'tasks/some-file.js']
    }
}
```
cbfile
```
```
