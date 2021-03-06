Sub Tasks allow you to re-use a single task, but to call it with a separate
set of options each time. 

Using the previous example of compiling SCSS files into CSS, it's likely that 
you'll want to execute this task with different 
options based on whether or not you're in development or production mode. You'll want to 
minify your production CSS code, but being a slow process, it would be nice if this could
be skipped in development...

The same goes for versioning your files (adding hashes to filename) - this probably something 
you only want to happen in the 'production' build.

Both are examples of where we want to re-use a single task, but run it with slightly different options each time.
In Crossbow this is solved by Sub Tasks. 

{{inc 
    src="three.hbs"
    name="sub-tasks"
    yml="snippets/sub-tasks/crossbow.yml"
    cbfile="snippets/sub-tasks/cbfile.js"
    js="snippets/sub-tasks/crossbow.js"
}}

So in this example, under options you have 2 keys `dev` & `prod`. Because of this, you can 
now run the `css` task and specify which of those 2 objects you want to have available as options.
  
So if you run: 

```bash
cb css:dev
```

The task `css` task will be executed with `{input: './app/scss', output: './app/css'}` as the `options` parameter.
To make it clearer, let's see how it would translate to function calls (using the options from the previous example)

```js
// running the command: `cb css:dev`   
// translates into:
myNpmModule({
    input: './app/scss', 
    output: './app/css'
});

// whilst `cb css:prod`
// would translates into:
myNpmModule({
    input: './app/scss', 
    output: './app/css', 
    minify: true, 
    production: true
});
```

**NOTE:**
If you provide multiple sets of options, but then execute your task without the options key, the task
will still run, but it will receive the full options object, for example, given the options above,
if you just run... 

```bash
cb css
``` 
... that would result in the following - which may or may not be something you expect, so use with caution!

```js
myNpmModule({
    dev: {
        input: './app/scss', 
        output: './app/css'
    },
    prod: {
        input: './app/scss', 
        output: './app/css', 
        minify: true, 
        production: true
    }
});
```

## Calling multiple Sub Tasks

So we've seen that you can call a task, followed by a `:` and a key name (eg: `css:dev`) to select options
 for a single task run, but how can do this when we want to execute multiple tasks in sequence?
 
The first approach, which is completely valid, is to just queue them up as normal on the command line...
 
```sh
cb css:dev css:prod
```

...but given how common an operation this is, Crossbow provides a shorthand for doing the same thing. 

```sh
cb css:dev:prod

# which is exactly the same as calling
cb css:dev css:prod
``` 

The result is the same, but you just have less to type! It's not limited to 2 tasks however, so feel free to 
chain as many of these together as you like!

## Calling all Sub Tasks

Crossbow also supports using a `*` wildcard when calling tasks. When it sees `<taskname>:*`, it will translate it
into 1 call for each key of the options. So sticking with the examples above, to run the `css` task first 
with the options from `dev` and then with the options from `prod`, you can run:

```bash
cb css:*
```

---



We've seen so much already and for most users you may already have enough information now to understand
what Crossbow can do for you and why you should switch to it.

We're far from done though, next we'll get into some of the more 
advanced features, starting with [Running Tasks in Parallel](/docs/running-tasks-in-parallel)
 