This error occurs when you provide an `@` at the end of a task name, but forget to provide a value 
after it.

For example, if you had 2 tasks lists under an alias, such as: 

```
tasks:
  js: 
    - '@npm webpack'
    - '@npm webpack --config webpack.prod.js'
```

and then you wanted to run them in parallel, you could call the `js` alias in the following way:
 
```bash
cb js@p
```

You can also provide this flag in the task name, such as:

```
tasks:
  js@p: 
    - '@npm webpack'
    - '@npm webpack --config webpack.prod.js'
```

... either way, if for some reason you don't give the `p`, you'll get this error.