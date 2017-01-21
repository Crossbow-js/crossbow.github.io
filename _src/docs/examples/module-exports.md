---
title: crossbow.js
---

We also support providing a JS input file, you just need to use `module.exports`
to export your input.

```js
// crossbow.js
module.exports = {
  tasks: {
    clean: '@npm rimraf ./app',
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

Or, again you can use inline nested arrays to specify parallel tasks.
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
