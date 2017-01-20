## Use task aliases
Crossbow will always try to resolve aliases *first* which allows
you to re-use the same task over and over again whilst also making
for cleaner composition.

{{inc 
    src="three.hbs"
    name="task-aliases"
    yml="snippets/use-task-aliases/crossbow.yml"
    cbfile="snippets/use-task-aliases/cbfile.js"
    js="snippets/use-task-aliases/crossbow.js"
}}

## Getting fancy with aliases
An area in which Crossbow leap-frogs the competition is with its strong composition features. It will
 recursively resolve tasks & aliases allowing things such at the following:

{{inc 
    src="three.hbs"
    name="task-aliases-fancy"
    yml="snippets/use-task-aliases-fancy/crossbow.yml"
    cbfile="snippets/use-task-aliases-fancy/cbfile.js"
    js="snippets/use-task-aliases-fancy/crossbow.js"
}}

With this example, if we then ran `cb build` on the command line, both of the scripts
defined under the `clean` task would have to successfully complete before the `webpack`
task begins.

--- 

Next up, let's see how we can move beyond simple scripts and onto [other ways of defining tasks](/docs/other-ways-of-defining-tasks)
