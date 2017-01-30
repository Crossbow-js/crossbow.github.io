This error occurs if you end a task name with a `:` and do not provide anything after it.

So with the following input, you could run one of the following 

- `cb sass:dev`
- `cb sass:prod`
- `cb sass:*`

```yaml
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

But if you end the task name with a `:` and forget the sub-task name, you'll get this error

```bash
# This will error because there's nothing after the colon   
cb build:
```