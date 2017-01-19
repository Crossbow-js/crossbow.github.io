## Other ways to define tasks.

You're starting to get a taste of Crossbow can do for you. It was designed from the ground
up to solve complicated task composition problems, whilst also being easier to use and provide 
better error reports that any other tools out there.

Part of the strong composition story is the ability to combine tasks in ways you never thought
possible before. Want to run a shell script, followed by an inline gulp-plugin, followed by a
 plain Javascript file located in a file somewhere? No problem! Crossbow ultimately thinks
 of every supported task type as simply another function call.
 
### External files.

The amount of times I've been using other build systems and thought 'geez, I wish I could just write a 
small JS function to handle this next bit for me'... No problem with Crossbow! 
Let's say you had a super-amazing function like this in a file called `my-task.js`
  

`my-task.js`

```js
module.exports = function myTask() {
    console.log('it works!');
}
```

Now you have 2 ways to execute this function with Crossbow. You can run it directly
from the CLI

```bash
cb my-task.js
```

Or you can reference it anywhere in one of your input files

{{inc 
    src="three.hbs"
    name="external-tasks"
    yml="snippets/external-tasks/crossbow.yml"
    cbfile="snippets/external-tasks/cbfile.js"
    js="snippets/external-tasks/crossbow.js"
}}

Crossbow will grab the returned `function` from your file and 
 queue it up just like any other task. Now you can organise
 your code & tasks without needed any additional 3rd party tools, yay!
 
 
### Inline Functions

If your input file is Javascript, such as a `cbfile.js` or `crossbow.js`, 
 then you can just place function directly into task definitions. 
 
 
```js
cb.task('clean', [
    '@sh rm -rf ./js/dist',
    '@sh rm -rf ./css/dist',
    function myInlineFunction() {
      console.log('I will execute 3rd'); 
    }
]);
```

In that example, 3 tasks are defined, the first 2 are shell commands
 and when both are complete, the function provided will be called.
 This is not to be mistaken for a regular 'callback' signalling completion.
 To prove this, you can provide multiple functions and even place them 
 anywhere in the task definition. The order will always be preserved.
 
 Another example of this, would be a situation in which you wanted
 to do something before **and** after a bunch of tasks... (note the arrow
 functions make this super clean)
 
 ```js
 cb.task('clean', [
    () => console.log('Tasks started!'),
    '@sh rm -rf ./js/dist',
    '@sh rm -rf ./css/dist',
    () => console.log('Tasks completed!'),
 ]);
 ```
 
 
 