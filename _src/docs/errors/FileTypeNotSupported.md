This error occurs when you try to provide a path to file as a **task**, but Crossbow 
does not currently support that file type. 

For example, if you had the following `my-task.js` file: 

```js
// my-task.js
module.exports = function () {
    console.log('Hello from my-task.js');
}
```

Then you could run it with the following command

```bash
cb my-task.js
```

But, if you tried that command with a file type that Crossbow does not support, such as...

```bash
cb package.json
```

... then you would receive this error.
