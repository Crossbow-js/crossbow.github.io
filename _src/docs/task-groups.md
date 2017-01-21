Task groups are a convenience feature used to help you organise similar tasks
under a Parent.

For example, instead of having a separate alias for both `build-js` and `build-css`, 
you could instead create a parent called `build` and have `js` and `css` as sub 
tasks.

{{inc 
    src="three.hbs"
    name="task-groups-01"
    yml="snippets/task-groups-01/crossbow.yml"
    cbfile="snippets/task-groups-01/cbfile.js"
    js="snippets/task-groups-01/crossbow.js"
}}

With this, if you now wanted to run just the `css` tasks, you'd run...

```bash
cb build:css
```

... and the same would apply for the `js` sub-tasks

```bash
cb build:js
```

Task groups work just like Sub Tasks, in that you can keep adding colon
separated names, and it will cause Crossbow to execute all of the tasks 
 related to each one.
 
```bash
cb build:js:css
``` 

Wildcards also work here, so you can create huge groups of tasks and run them all
in the following way:

```bash
cb build:*
```

> Pro Tip: you can apply the `-p` flag here to instruct all sub-tasks to
 run in parallel!
 
---
 
We've seen a lot now relating to defining and running tasks, and we'll soon move on to learning about 
file-watching, before that though, there's 1 more feature that can help you
create really good task definitions, that feature is the way in which Crossbow handles 
[Environment Variables](/docs/environment-variables).