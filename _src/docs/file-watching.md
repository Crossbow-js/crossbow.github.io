A modern, advanced task running system would not be complete without modern, advanced file-watching
to back it up.

In your input files, you can define which files/directories to watch & then 
trigger a task to be run when they change 

{{inc 
    src="three.hbs"
    name="file-watching-01"
    yml="snippets/file-watching-01/crossbow.yml"
    cbfile="snippets/file-watching-01/cbfile.js"
    js="snippets/file-watching-01/crossbow.js"
}}

In that example, any time a file within the `./app/scss` directory changes, the `css` task
will run.

You're not limited to a single pattern or task to run however,
both `patterns` & `tasks` accept arrays & their can be multiple watchers too.
 
{{inc 
    src="three.hbs"
    name="file-watching-02"
    yml="snippets/file-watching-02/crossbow.yml"
    cbfile="snippets/file-watching-02/cbfile.js"
    js="snippets/file-watching-02/crossbow.js"
}}


## Short hand watchers

The format above, whilst explicit, can get a little verbose, so there's also a short-hand style you can 
use instead if you prefer. You can skip the `watchers` key altogether and provide as many `<pattern[]>:<task[]>`
items as you need.
 
{{inc 
    src="three.hbs"
    name="file-watching-03"
    yml="snippets/file-watching-03/crossbow.yml"
    js="snippets/file-watching-03/crossbow.js"
}}

## Starting watchers

Whether you use the long or short version for defining watchers, if they are all under the `default` key, you can start 
them all via the following the command:

```bash
cb watch
```

If you've defined multiple watchers with different names, such as ...

{{inc 
    src="three.hbs"
    name="file-watching-04"
    yml="snippets/file-watching-04/crossbow.yml"
    js="snippets/file-watching-04/crossbow.js"
}}

... then you can start only the ones you actually want by providing a name, or multiple names.

```bash
cb watch css php
```

## Global Options

Options for file watchers are split into 2 sections. There are [Crossbow-specific options](/docs/options/watch) and then
there are options that will be passed whole-sale through to the file-watching library 
[chokidar](https://github.com/paulmillr/chokidar) - either way, they can be applied to all watchers at once, by supplying the
options at the top level, or per watcher by nesting them within each one.
 
For example, if you wanted to apply a global 'debounce' option to all watchers, you'd place an 'options' key at the 
same level at the watcher names. (notice how in the `cbfile.js` version this is not possible currently)


{{inc 
    src="three.hbs"
    name="file-watching-05"
    yml="snippets/file-watching-05/crossbow.yml"
    cbfile="snippets/file-watching-05/cbfile.js"
    js="snippets/file-watching-05/crossbow.js"
}}

## Watcher specific options

When you want some options to only affect an individual watcher, just nest the 'options' key. 

{{inc 
    src="three.hbs"
    name="file-watching-06"
    yml="snippets/file-watching-06/crossbow.yml"
    js="snippets/file-watching-06/crossbow.js"
}}

## Running tasks before watchers begin

This is an extremely handy feature as it allows you to perform a run of tasks before any watchers
begin. An example being where you want to watch some template files and re-compile them when they change.
But, before any of that, you need an initial compile step so that you have something to see in the 
browser. 

To solve this, any watcher can have a `before` key which can be any valid Crossbow task definition.

{{inc 
    src="three.hbs"
    name="file-watching-07"
    yml="snippets/file-watching-07/crossbow.yml"
    cbfile="snippets/file-watching-07/cbfile.js"
    js="snippets/file-watching-07/crossbow.js"
}}

If you have multiple watchers, that all have `before' tasks defined, Crossbow will collate them into a single 
run and ensure they all complete successfully before any watchers begin.

## Watcher micro syntax

There's one more way to define watchers in Crossbow, which was born out of the desire to have an on-demand 
watcher system that required no config and was perfect for tinkering.

```bash
cb watch './app/scss -> my-task'
```

As seen above, you prove a string where the left hand side of ` -> ` is the colon separated list of patterns to 
watch, and the right hand side is the task to run. This means that example above translates directly into the following

```yml
watch: 
  default: 
    './app/scss': my-task 
```

This works for any valid way fo defining tasks for Crossbow, so even if you didn't have any configuration files, you 
could still use this feature to do something like compile Webpack on file save, which would allow you to tinker
with configuration to see what output you get

```bash
cb watch 'webpack.config.js -> @npm webpack'
```

With this, every time you change the `webpack.config.js` file, Crossbow will invoke Webpack from your node_modules
directory. Neat! 

For something like Webpack, which could take anywhere from a few seconds up to a minute to compile, you'll want to use the 
`--block` flag to stop subsequent runs from overlapping   

```bash
cb watch 'webpack.config.js -> @npm webpack' --block
```

--- 

At this point you've seen the core features of Crossbow and some realistic examples of how you'd use it. I now 
encourage you to check out the other sections of the docs to learn more about options, input files, commands and more.
