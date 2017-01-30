This error occurs when you try to run a sub-task, but Crossbow cannot find that subtask.

**Example with Options**

With the following input, there is 1 Parent Group `build`, with 2 sub-tasks (`js` & `css`). 

```yml
tasks:
  (build):
    js: '@npm webpack'
    css: '@npm node-sass ./app/style.scss ./app/css'
```

With this, you can run either of the sub-tasks via: 

```bash
cb build:js
cb build:css
```

But if you provide a typo, you'll get this error.

```bash
# this will error as sub-task is not found
cb build:kittenz
```

**Example with Options**

The same thing applies as above for tasks with options, taking the following example, you can 
run the `sass` task with either the `dev` or `prod` set of options by providing the key

```yml
tasks:
  sass:
    tasks: 'my-sass-task.js'
    options:
      dev: 
        input: './app/styles.css'
      prod: 
        input: './app/styles.css'
        production: true
        version: true
```

```bash
# run a task with different options
cb sass:dev
cb sass:prod
```

```bash
# this will also error as options key is not found!
cb sass:kittenz
```
