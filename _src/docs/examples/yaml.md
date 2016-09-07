# crossbow.yaml

Many workflows & tasks can be defined with YAML data only - which is 
great for those already familiar with the format.

Provide a top-level `tasks` property, and it's keys become the task names.
  
By default, Crossbow will look for a `crossbow.yaml` file in the current
directory. If you've placed it elsewhere, you can provide the --cbfile flag

```sh
$ crossbow build-all --cbfile 'conf/myfile.yaml'
```

## Running 1 task

Input

```yml
# crossbow.yaml
tasks:
  webpack: '@npm webpack'
```

Command

```sh
$ crossbow webpack
```

## Running 2 tasks in sequence

Input
```yml
# crossbow.yaml
tasks:
  clean: '@npm rimraf ./dist' 
  webpack: '@npm webpack'
```

Command

```sh
$ crossbow clean webpack
```

... or via an alias 

Input
```yml
# crossbow.yaml
tasks:
  clean: '@npm rimraf ./dist' 
  webpack: '@npm webpack'
  build:
    - clean
    - webpack
```

Command

```sh
$ crossbow build
```

## Running 2 tasks in sequence, where 2nd is 2 tasks in parallel

Input
```yml
# crossbow.yaml
tasks:
  clean: '@npm rimraf ./dist' 
  webpack: '@npm webpack'
  sass: '@npm node-sass'
  build:
    - clean
    - ['webpack', 'sass']
```

Command

```sh
$ crossbow build
```

## Defining Parallel groups separately

Sometimes you'll want to be explicit about parallel groups

Input
```yml
# crossbow.yaml
tasks:
  clean: '@npm rimraf ./dist' 
  webpack: '@npm webpack'
  sass: '@npm node-sass'
  build:
    tasks: ['webpack', 'sass']
    runMode: 'parallel'
  build-all:
    - clean
    - build
```

Command

```sh
$ crossbow build
```

## Tasks in separate files

This is an extremely important part of running Crossbow from a YAML file
 as it allow you to define functions & use modules without having to 
 write any Javascript.
 
So if you had some sort of function in a JS files, you can call that via

Input

```yml
tasks: 
    my-task: 'tasks-dir/my-task.js'
```

Command
```sh 
$ crossbow my-task 
```

This also works with flags, so if the task defined in `my-task.js` required
a flag such as `--production` - you can pass that directly in the YAML

```yml
tasks: 
    my-task: 'tasks-dir/my-task.js --production'
```

Command
```sh 
$ crossbow my-task 
```

## Guaranteed sequential execution

You can take advantage of this feature by mixing functions defined
in external files with shell/npm scripts

```sh
tasks: 
  build:
    - 'tasks/mytask1.js'
    - 'tasks/mytask2.js'
    - 'tasks/my-shell-script.sh'
    - '@npm webpack'
```

And as usual, if you wanted some tasks to run in parallel, use nested arrays!
Here the first two tasks will *begin* together, but only when both are complete
will the following tasks begin.

```sh
tasks: 
  build:
    - ['tasks/mytask1.js', 'tasks/mytask2.js']
    - 'tasks/my-shell-script.sh'
    - '@npm webpack'
```

## Inline options.

```yml
tasks:
  sass:
    tasks: 'crossbow-sass', # use an npm-installed 'task'
    options:                # Provide options for it
      input: 'scss/core.scss'
      output: 'public/css'
```
