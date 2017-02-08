---
videos:
  1: 
    - id: kjRPXGLfsQc
      title: Crossbow - Calling external files from the CLI 
  2: 
    - id: QfNjP5TV_U4
      title: Crossbow - Tasks in external files (crossbow.yaml) 
    - id: 1Q5uW6X6O6w
      title: Crossbow - Tasks in external files (cbfile.js)
    - id: dLNRHG68AdY
      title: Crossbow - Tasks in external files (crossbow.js) 
  3: 
    - id: 5Yxv7mxffso
      title: Crossbow - inline function (cbfile.js) 
    - id: 6U4I_6313T0
      title: Crossbow - inline function (crossbow.js) 
  4: 
    - id: u9iuLVEoiy8
      title: Crossbow - multiple inline functions (cbfile.js) 
    - id: js0GykNgCyA
      title: Crossbow - multiple inline functions (crossbow.js) 
---

You're starting to get a taste of Crossbow can do for you. It was designed from the ground
up to solve complicated task composition problems, whilst also being easier to use and provide 
better error reports that any other tools out there.

Part of the strong composition story is the ability to combine tasks in ways you never thought
possible before. Want to run a shell script, followed by an inline gulp-plugin, followed by a
 plain Javascript function located in a file somewhere? No problem! Crossbow ultimately thinks
 of every supported task type as simply another function call.
 
### External files.

The amount of times I've been using other task systems and thought 'geez, I wish I could just write a 
small JS function to handle this next bit for me'... No problem with Crossbow! 

Let's say you had a super-amazing function like this in a file called `my-task.js`
  

`my-task.js`

```js
module.exports = function myTask() {
    console.log('it works!');
}
```

There are 2 ways to execute this function with Crossbow. You can run it directly
from the CLI...

```bash
cb my-task.js
```

{{inc src="video-list.hbs" videos=page.videos.[1]}}

... or you can reference it anywhere in one of your input files

{{inc 
    src="three.hbs"
    name="external-tasks"
    yml="snippets/external-tasks/crossbow.yml"
    cbfile="snippets/external-tasks/cbfile.js"
    js="snippets/external-tasks/crossbow.js"
}}

{{inc src="video-list.hbs" videos=page.videos.[2]}}

Crossbow will grab the returned `function` from your file and 
 queue it up just like any other task. Now you can organise
 your code & tasks without needed any additional 3rd party tools, yay!
 
 
### Inline Functions

If your input file is Javascript, such as a `cbfile.js` or `crossbow.js`, 
then you can just place your functions directly into task definitions. 
 
 
```js
cb.task('clean', [
    '@sh rm -rf ./js/dist',
    '@sh rm -rf ./css/dist',
    function myInlineFunction() {
      console.log('I will execute 3rd'); 
    }
]);
```
{{inc src="video-list.hbs" videos=page.videos.[3]}}

In that example, **3** separate tasks are defined.

The first 2 are regular shell commands - when both of these complete (without error),
 the function `myInlineFunction` will be called.
 
 This is not to be mistaken for a regular callback that is often
 used to signal completion - rather, when you provide a function inline 
 like this, you're actually creating a brand new task, one that Crossbow will
 treat exactly the same as any other type of task.
 
 Why does this matter? Because when once you know that, you'll realise
 that you can actually provide multiple functions and even place them 
 anywhere in the task definition. Either way they'll run in the exact 
 order that you intended.
 
 Here's a concrete example - imagine you wanted to do something both **before**
 and then **after** a bunch of other tasks. This becomes trivial with Crossbow (note this is
 especially nice with the use of arrow functions!)
 
 ```js
 cb.task('clean', [
    () => console.log('Tasks started!'),
    '@sh rm -rf ./js/dist',
    '@sh rm -rf ./css/dist',
    () => console.log('Tasks completed!'),
 ]);
 ```
 
{{inc src="video-list.hbs" videos=page.videos.[4]}}
 
---
 
Getting excited yet? Next up we'll see how to [Pass options to tasks](/docs/pass-options-to-tasks) 
 
 
 