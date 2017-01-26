
## Input files.

Crossbow will look in your current directory for any of
the following input files to use as your input.

```
cbfile.js
crossbow.yaml
crossbow.js
```

Note: Crossbow does not *require* you to use an input file,
but it's the recommended approach for standardising tasks
across teams.

## CWD (current working directory)

By default, this will be the directory in which you invoked
a crossbow command. The will be used as the base-point for **ALL** other 
 file & task resolution so it's important that you either: 
 
 1. Always run commands from the root of your project (so that 
 simple relative paths work as expected)
 
 0r 
 
 2. provide the `--cwd` flag at run time.

## Task resolution.

If a task that you're trying to run does not match an alias name, 
Crossbow will try to load files from a `tasks` directory (relative to your
cwd) or from your local `node_modules` directory.

### Tasks directory
For example if you had a file called `my-task.js` within the `tasks`  
directory. You could run that task with the following command

```sh
$ crossbow my-task
```

### node_modules for installed tasks
The same applies for your `node_modules` directory. For example, if you 
 installed the `crossbow-sass` task, you can run that with the following 
 command.
 
```sh
$ crossbow 'crossbow-sass --input scss/core.scss'
``` 

Note that we passed a string there encapsulating the `--input` flag - this
is to ensure only the `crossbow-sass` task gets that flag as it's 
a require field on that task.
