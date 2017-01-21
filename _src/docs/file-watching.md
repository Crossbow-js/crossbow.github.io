A modern, advanced task running system would not be complete without modern, advanced file-watching
to back it up.

In your input files, you can define which files/directories to watch & then 
trigger a task to be run when they change 

{{inc 
    src="three.hbs"
    name="file-watching-01"
    yml="snippets/file-watching-01/crossbow.yml"
    cbfile="snippets/file-watching-01/cbfile.js"
    js="snippets/file-watching-01/crossbow.js"
}}

In that example, any time a file within the `./app/scss` directory changes, the `css` task
will run.

You're not limited to a single pattern or task to run however,
both `patterns` & `tasks` accept arrays & their can be multiple watchers too.
 
{{inc 
    src="three.hbs"
    name="file-watching-02"
    yml="snippets/file-watching-02/crossbow.yml"
    cbfile="snippets/file-watching-02/cbfile.js"
    js="snippets/file-watching-02/crossbow.js"
}}


## Short hand watchers

The format above, whilst explicit, can get a little verbose, so there's also a short-hand style you can 
use instead if you prefer. You can skip the `watchers` key altogether and provide as many `<pattern[]>:<task[]>`
items as you need.
 
{{inc 
    src="three.hbs"
    name="file-watching-03"
    yml="snippets/file-watching-03/crossbow.yml"
    js="snippets/file-watching-03/crossbow.js"
}}

## Starting watchers

Whether you use the long or short version for defining watchers, if they are all under the `default` key, you can start 
them all via the following the command:

```bash
cb watch
```

If you've defined multiple watchers with different names, such as ...

{{inc 
    src="three.hbs"
    name="file-watching-04"
    yml="snippets/file-watching-04/crossbow.yml"
    js="snippets/file-watching-04/crossbow.js"
}}

... then you can start only the ones you actually want by providing a name, or multiple names.

```bash
cb watch css php
```