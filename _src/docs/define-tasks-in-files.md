## Define tasks in files

Of course, it would be rather tedious if you had to remember these long command
chains for every task you wanted to run. 

To solve this problem you can place either
a `crossbow.yml`, `crossbow.js` or `cbfile.js` in the root of your project and define the tasks there.

{{inc 
    src="three.hbs"
    name="define-tasks"
    yml="snippets/define-tasks-in-files/crossbow.yml"
    cbfile="snippets/define-tasks-in-files/cbfile.js"
    js="snippets/define-tasks-in-files/crossbow.js"
}}

Now, with this in place, you can simply run
 
```bash
cb build
```

---

We're just getting warmed up here! Next we'll see 
how to [use task aliases](/docs/use-task-aliases)