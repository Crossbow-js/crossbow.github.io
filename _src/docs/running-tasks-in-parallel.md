It's extremely important to understand that all tasks in Crossbow will 
run in series by default. So anywhere that you see a list of tasks in a Crossbow
input file, or when listing tasks on the command line, you can guarantee that
not only the exact order of execution will be preserved, but also that failures in any 
task will prevent any future tasks from running.

Crossbow implements this design because 
running task `A` to completion before starting task `B` and so on is exactly how we as humans think 
about tasks in the real world.

Whilst this makes for a nicer and more deterministic workflow in Crossbow, there may be situations in 
 which you want groups of tasks to begin at the same time in order to speed up builds.
 
## Running in Parallel via a flag

Let's say for example you use the popular bundler Webpack and want to produce 2 separate builds
using a different configuration file for each. 

Technically this is a queue queue of **2** tasks, but because the second task does not depend on the 
result of the first task in any way, that makes this a perfect candidate for running in parallel.

This can be achieved with a simple flag `-p`.

```bash
cb '@npm webpack' '@npm webpack --config webpack.prod.js' -p
```

This also works when using aliases from input files so if you had the following...

{{inc 
    src="three.hbs"
    name="running-tasks-in-parallel"
    yml="snippets/running-tasks-in-parallel/crossbow.yml"
    cbfile="snippets/running-tasks-in-parallel/cbfile.js"
    js="snippets/running-tasks-in-parallel/crossbow.js"
}}

... then the command would be:


```bash
cb webpack-dev webpack-prod -p
```

## Running in Parallel via options

Providing the `-p` flag on the command line is a useful trick, but really
you want to be able to define a group of parallel tasks in the input files so that the setup 
can be shared across your team, or simply to remove the need to remember the flags when running tasks.

So this is where we come back around to the power of aliases!

{{inc 
    src="three.hbs"
    name="running-tasks-in-parallel-from-files"
    yml="snippets/running-tasks-in-parallel-02/crossbow.yml"
    cbfile="snippets/running-tasks-in-parallel-02/cbfile.js"
    js="snippets/running-tasks-in-parallel-02/crossbow.js"
}}

Here you can see we've created a new alias called `build-js` - it has 2 tasks to run
and we also provide `runMode: parallel` to instruct Crossbow to execute both tasks
at the same time.

## With great power...

Crossbow can combine groups of tasks to run in parallel with others that need to run in series. This is
quite a tricky problem to deal with, but has real benefits for the user. Let's look at a real-life 
example to demonstrate why you would ever need this. 

In Google's Web Starter Kit, they have a default task that is responsible for running a total 
of **8** other tasks. They clean a directory first, generate some style, run a bunch more tasks 
in parallel and then follow it all up with the generation of a service worker. 

It's using gulp, and it looks like this:

```js
gulp.task('default', ['clean'], cb =>
  runSequence(
    'styles',
    ['lint', 'html', 'scripts', 'images', 'copy'],
    'generate-service-worker',
    cb
  )
);
```

Notice the amount of hacks and work-arounds needed here. `clean` has to be defined separately to guarantee
it finishes first, then the rest of the tasks are all wrapped in a plugin to ensure sequential execution. The 
parts inside the array are the tasks that are allowed to run in parallel.

Crossbow does not suffer from this noise and confusion, the exact same result can be achieved with the following:

{{inc 
    src="three.hbs"
    name="running-tasks-in-parallel-04"
    yml="snippets/running-tasks-in-parallel-04/crossbow.yml"
    cbfile="snippets/running-tasks-in-parallel-04/cbfile.js"
    js="snippets/running-tasks-in-parallel-04/crossbow.js"
}}

Notice we're not having to force any tasks to be in order, because that's just what they do by default!

## Parallel tasks + aliases

The final example will just highlight some of the power composition features that crossbow
gives you out of the box. Using that same, real-life example from Google's project, we can 
clean up the tasks inside the array and instead make it explicit.


{{inc 
    src="three.hbs"
    name="running-tasks-in-parallel-05"
    yml="snippets/running-tasks-in-parallel-05/crossbow.yml"
    cbfile="snippets/running-tasks-in-parallel-05/cbfile.js"
    js="snippets/running-tasks-in-parallel-05/crossbow.js"
}}

This will behave exactly as it did before, but the benefit is that now instead of having an array of tasks inline, 
you can actually give that a name and be explicit about your intent.

---

Hungry for more? Next we're going cover a convenience feature called [Task Groups](/docs/task-groups) 