There are always situations in which you'll want to re-use a task. Perhaps you've crafted a nice
 pipeline of transformations to take `.scss` files and compile them into CSS. It could be a multi-step process
 such as:
 
```js
module.exports = function compileSass() {
    return vfs.src('./app/scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', console.error))
        .pipe(postCSS([plugin1, plugin2]))
        .pipe(vfs.dest('./dest/'));
}
```

Now, what if you wanted to re-use this pipeline of plugins? If you work on multiple
projects at once, you are probably used to copy/pasting these function into new gulp
files each time you begin. 

Or how about a situation where, on the same project, you wish you could provide one
or more of the the values used in the function? Like the `./app/scss` string for example - this 
would allow you to specify a different entry file each time it runs. 

Or maybe you have different plugins that run for a production build versus a development build - 
 for this, it would be super handy to re-use 90% of the code and pass a `--production`
flag right...?

Both of these problems (and many more) are solved if you have a task system that 
accepts options. Back in the day Grunt had a good solution for this and Crossbow uses a 
similar system, whilst expanding & improving on it.

## Passing options via flags

Using the example from above, let's say you wanted to publish that workflow to NPM
to re-use across your projects. To do that, you're going to need to pass in at least the 
`input` path & possibly the output path too. 

To do this from the command line, you can use the 'wrap it in quotes' trick from earlier
and use flags

```bash
cb 'my-task.js --input ./app/scss'
```

Crossbow will chop this command into pieces, so it sees:

- `my-task.js` as the task name
- `--input` as a flag name
- `./app/scss` as the value passed to `--input`

The flag name and value will only be associated with the current task and
Crossbow will execute the function in `my-task.js` as normal, but it will 
pass an object containing the values you set as the first parameter.
 
It would be equivalent to you calling the function in the following way: 

```js
compileSass({input: './app/scss'});
```

So that now in the actual task, you can use theses values from the first argument: 

```js
/**
 * Crossbow provides the `options` here based on your flags 
 */
module.exports = function compileSass(options) {
    return vfs.src(options.input) // <-- options.input
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', console.error))
        .pipe(postCSS([plugin1, plugin2]))
        .pipe(vfs.dest(options.output)); // <-- options.output
}
```

## Passing options via flags in input files

As mentioned before, although you *can* do everything from the CLI
with Crossbow, most of the time you'll want to define how tasks are called
via the input files - especially so that your other team members don't 
have to remember about which flags to use and where.

So let's imagine you have a module published to NPM called `my-npm-module` and it
has the CSS tasks from above. You would install it as normal, and then from your input 
file you can simply refer to the NPM package name and pass along the flags as required. Let's
see how to execute the task 3 times, each with a different `input` value:
    
{{inc 
    src="three.hbs"
    name="passing-options-in-input"
    yml="snippets/pass-options-to-tasks-01/crossbow.yml"
    cbfile="snippets/pass-options-to-tasks-01/cbfile.js"
    js="snippets/pass-options-to-tasks-01/crossbow.js"
}}


## Passing options inline
Having the ability to pass flags/queries to tasks at run time is an 
amazing feature, but there's another way of defining options for tasks
that may be preferable to you - especially if you have more than a handful 
of flags or if you need to provide more complex data like Arrays or Objects.

{{inc 
    src="three.hbs"
    name="passing-options-inline"
    yml="snippets/pass-options-to-tasks-02/crossbow.yml"
    cbfile="snippets/pass-options-to-tasks-02/cbfile.js"
    js="snippets/pass-options-to-tasks-02/crossbow.js"
}}

So in that example, the task **alias** is named `css`. When that task is run it will actually 
cause the function exported from `my-npm-module` to be executed with the input key set on the options.

## Auto options

Another way to define options for a task, is to use the top-level `options`
key in your input file. Then, each time a task is run, the options object will be checked for 
a matching name, and the values from it passed into the task. 

This means the following the following snippet would be all you'd need.

{{inc 
    src="three.hbs"
    name="passing-options-inline"
    yml="snippets/pass-options-to-tasks-03/crossbow.yml"
    cbfile="snippets/pass-options-to-tasks-03/cbfile.js"
    js="snippets/pass-options-to-tasks-03/crossbow.js"
}}

With that, you'd just run the following the following command... 
 
```bash
cb my-npm-module
```

... and your task will receive the options just as before. The benefit here is that you can keep 
 the defined options (which can build up over time) away from your task definition to allow
 cleaner composition.
 
---

Having the options defined inline can be a great way to define your tasks - it's often a lot
easier/cleaner that providing flag or queries, but it does leave us with a big
problem - every time we run that task from now on it's going to receive the same options object!

What we really want is the ability to provide multiple 'sets' of options per task, and then decide
which to use at run time. We have a solution for this, they're called [Sub Tasks](/docs/sub-tasks)