This error occurs if you end a task name with a `:` when referencing a group
and do not provide anything after it.

So with the following input, you could run one of the following 

- `cb build:dev`
- `cb build:prod`
- `cb build:*`

```yaml
tasks:
  (build):
    js: '@npm webpack'
    css: '@npm node-sass ./app/style.scss ./app/css'
```

But if you end the task name with a `:` and forget the sub-task name, you'll get this error

```bash
# This will error because there's nothing after the colon
cb build:
```