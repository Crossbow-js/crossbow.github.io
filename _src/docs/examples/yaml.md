---
title: crossbow.yaml 
---

Many workflows & tasks can be defined with YAML data only - which is 
great for those already familiar with the format.

Provide a top-level `tasks` property, and it's keys become the task names.
  
By default, Crossbow will look for a `crossbow.yaml` file in the current
directory. If you've placed it elsewhere, you can always provide the -i flag

```sh
$ crossbow build-all -i 'conf/myfile.yaml'
```

## Examples:

Running a single task

**Input**

```yml
# crossbow.yaml
tasks:
  webpack: '@npm webpack'
```

**Command**

```sh
$ crossbow webpack
```

---

Running 2 tasks in sequence

**Input**
```yml
# crossbow.yaml
tasks:
  clean: '@npm rimraf ./dist' 
  webpack: '@npm webpack'
```

**Command**

```sh
$ crossbow clean webpack
```

... or via an alias 

**Input**
```yml
# crossbow.yaml
tasks:
  clean: '@npm rimraf ./dist' 
  webpack: '@npm webpack'
  build:
    - clean
    - webpack
```

**Command**

```sh
$ crossbow build
```

---

Running 2 tasks in sequence, where the second is 2 other task in parallel

**Input**
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

**Command**

```sh
$ crossbow build
```

---

Defining Parallel groups separately, as sometimes you'll want to be 
explicit about parallel groups

**Input**
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

**Command**

```sh
$ crossbow build
```

---

## Tasks in separate files

This is an extremely important part of running Crossbow from a YAML file
 as it allow you to define functions & use modules without having to 
 write any Javascript.
 
So if you had some sort of function in a JS file, you can call that via

**Input**

```yml
tasks: 
    my-task: tasks/my-task.js
```

**Command**
```sh 
$ crossbow my-task 
```

This also works with flags, so if the task defined in `my-task.js` required
a flag such as `--production` - you can pass that directly in the YAML

```yml
tasks: 
    my-task: tasks/my-task.js --production
```

**Command**
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

## Splitting scripts onto multiple lines for readability

The yaml format is extremely flexible & you can use this to your advantage - here's an example where 
we want to run the Typescript compiler with a few flags - it can be very convenient to split the 
command onto multiple lines:

```yaml
env: 
  IN_TS_FILE:  public/ts/app.ts
  OUT_JS_FILE: dist/app.js
  
tasks:
  ts:
    description: Compile Typescript files
    tasks: >
      @npm tsc $IN_TS_FILE
      --outFile $OUT_JS_PATH
      --allowJs
      --sourceMap
```

In this example, the yaml parser will replace any newlines that follow the greater-than symbol `>` with regular 
whitespace so that when Crossbow gets around to executing this command, it will actually look like the following:

```bash
@npm tsc $IN_TS_FILE --outFile $OUT_JS_PATH --allowJs --sourceMap
```

I'm sure you can think of some creative uses for this one!

## Multi-line scripts

For the most part, I would recommend that you split your scripts into individual Crossbow tasks 
(like the one above) to ensure you get the very best error-handling & reporting possible. That being 
 said, there's another yaml feature you can use to your advantage, the pipe `|`.
  
```
env: 
  $IN_TS_FILE: ./app/ts/scripts.ts
tasks:
  js: |
    @npm export OUT_JS_PATH="dist/js/app.js"
    echo "Compiling Typescript to $OUT_JS_PATH"
    tsc $IN_TS_FILE --outFile $OUT_JS_PATH --allowJs --sourceMap
```

When you provide the `|` character like this, the yaml parser will preserve newlines. The result
is that when Crossbow gets to this, it passes this new-line separated string exactly as it is. 
It's **exactly the equivalent** to having that command following in a separate `.sh` file, such as: 
  
  
```bash
# script.sh
export IN_TS_FILE: ./app/ts/scripts.ts
export OUT_JS_PATH="dist/js/app.js"

echo "Compiling Typescript to $OUT_JS_PATH"
tsc $IN_TS_FILE --outFile $OUT_JS_PATH --allowJs --sourceMap
```

This one is down to personal choice. Sometime you may want these scripts in separate files (which you
can still execute with Crossbow), but more often than not, it's nice to have all of your
projects scripts in a single file like this.