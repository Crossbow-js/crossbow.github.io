This error occurs when you try to run the `watchers` command (which would list your watchers) 
 but you havn't defined any in your input.
 
For example, the following would **not** cause an error because watchers *are* defined
 
```yaml
watch:
  default:
    '*.json': ['my-task.js']
  sass:
    './app/scss': ['@npm node-sass ./app/style.scss ./app/css']
```

Whereas this input **would** cause an error, as there are no watchers defined!

```yaml
tasks:
  sass: ['@npm node-sass ./app/style.scss ./app/css']
```