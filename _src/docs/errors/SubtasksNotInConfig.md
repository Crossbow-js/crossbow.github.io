This error occurs if you attempt to run a task + sub-task, but the the sub-task is 
not possible as there are no option keys that match.


For example, if all you had was the following:

```yml
tasks:
  sass:
    tasks: 'my-sass-task.js'     
```

... and then you tried to run a sub-task, such as 

```bash
# This will error as neither dev or prod are defined as option keys
cb sass:dev sass:prod
```