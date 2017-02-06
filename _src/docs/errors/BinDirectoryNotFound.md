This error occurs when you use the `bin` option, but the path you provided does not exist. 

For example - if you had the following input, but the `node_modules/.bin` directory does not exist yet
  (because you havn't ran `npm install` yet), you would get this error.

```yaml
config: 
  bin:
    - node_modules/.bin
tasks:
  lint: eslint src/** --fix
```

So here the task , `eslint src/** --fix` would only work if you had installed `eslint` locally.

