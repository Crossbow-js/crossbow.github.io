This error occurs when you try to use the `task:*` syntax, but you don't have any sub-tasks to run.

You need to ensure that whenever you `task:*` syntax, you are either referring to a task group + 
 one of it's children, or a task that has options.
 
 
So if you had the following input:

```yml
tasks:
  sass: my-sass-task.js     
  js: '@npm webpack'     
```

... the only way you could execute the commands would be 


```bash
cb sass
cb js
```

Trying to run either `cb sass:*` or `cb js:*` would cause this error.