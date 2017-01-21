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


