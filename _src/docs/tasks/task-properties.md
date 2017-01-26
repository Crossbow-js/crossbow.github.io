If you provide an object as a task, you have the opportunity to use a handful of special 
extra properties - some of which you will already seen if you've read any of the getting started pages.

## options

As seen in [Pass options to tasks](/docs/pass-options-to-tasks/), you can provide any options that you 
want your tasks to receive. 

```yaml
tasks:
  js:
    tasks: 'my-function.js'
    options: 
      input: 'my-input.js'
      output: 'my-output.js'
```

So if you were to now run `cb js` - the function located in `my-function.js` would receive 
`{input: 'my-input.js', output: 'my-output.js'}` as it's first argument.

---

## description

If you provide a description for your task/group of tasks, that description will be used when listing
your tasks & within the auto-docs feature. Think about yourself returning to this project in 6 months
time, or working on it with others in your team - having a short, human-readable description will
be something you'll be thankful for.


{{inc 
    src="three.hbs"
    name="task-properties-desc"
    yml="snippets/task-properties/desc-crossbow.yml"
    cbfile="snippets/task-properties/desc-cbfile.js"
    js="snippets/task-properties/desc-crossbow.js"
}}

---

## ifChanged

Crossbow can keep track of files/directories and will skip certain tasks if there hasn't been a 
change in content between runs.

Everything will always run the very time (whilst it generates the hashes needed to compare), 
but on subsequent runs you can save a considerable amount of time by limiting which tasks should run.

Here's an example, we're using the `node-sass` package to compile the file `src/style.scss` - but we don't
want anything to run unless something has changed within the `src` directory. To solve this we just add
the property `ifChanged` and provide an array of file/directory paths.

{{inc 
    src="three.hbs"
    name="task-properties-if"
    yml="snippets/task-properties/if-crossbow.yml"
    cbfile="snippets/task-properties/if-cbfile.js"
    js="snippets/task-properties/if-crossbow.js"
}}

This feature works in any valid Crossbow task definition, so you could skip an entire pipeline of tasks by monitoring 
multiple files/directories if needed.

```yaml
tasks:
  build: 
    tasks:
      - clean
      - styles
      - [lint, html, scripts, images, copy]
      - generate-service-worker
    ifChanged:
      - src
      - package.json
      - webpack.config.js
```

**Notes:** 

- You can provide multiple files/directories to the `ifChanged` property.
- Crossbow will create a `.crossbow` directory within this project, be sure to add that to your ignored files in git etc.
- You can always override this feature with the `-f` flag.

```bash
cb build -f
```

---

## env

As seen in [Environment Variables](/docs/environment-variables) - `key:value` pairs can be provided on a per-task
basis and will override any other global ones where the name matches.

{{inc 
    src="three.hbs"
    name="task-properties-env"
    yml="snippets/task-properties/env-crossbow.yml"
    cbfile="snippets/task-properties/env-cbfile.js"
    js="snippets/task-properties/env-crossbow.js"
}}
 
---

## runMode

As seen in [Running Tasks In Parallel](/docs/running-tasks-in-parallel), you can instruct Crossbow to run a sub-set
of tasks in parallel. In this example, we can run both `js` & `css` tasks as they do not depend on each other.

```yaml
tasks:
  release:
    tasks:
      - build-assets
      - '@sh jekyl build'
  
  build-assets:
    tasks: 
      - js
      - css
    runMode: parallel
    
  css: '@npm node-sass src/style.scss dest/style.css'
  js:  '@npm tsc ./app/ts/scripts.ts --outFile ./app/js/scripts.js'
```

Notice how we get to define the scripts for the `css` and `js` tasks, but then use the aliases to describe how they run 
in certain situations. This is the beauty of a truly compositional system. 