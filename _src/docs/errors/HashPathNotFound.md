This error occurs when you've provided a path to the task property [`ifChanged`](/docs/tasks/task-properties/#ifchanged) 
but a matching file or directory could not be found.

For example, if you wanted to run Webpack only when the `src` has content changes, you would 
likely do:

```yaml
tasks:
  js: 
    tasks: '@npm webpack'
    ifChanged 
      - src
      - webpack.config.js
```

but if you provide a typo, or a directory that does not exist, you'll get this error!