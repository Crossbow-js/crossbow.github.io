---
videos: 
 - id: e_ZCPhVkZTg
   title: Run NPM script from CLI
 - id: T_eEYZaAL4s
   title: Run multiple scripts in sequence
---
Did you know you can run tasks & watchers without any configuration at all?
This works for Javascript files, shell scripts, NPM scripts and more!

**Example:**

Let's run  `webpack` that's been locally installed on a project (like
you would with NPM scripts)

```bash
cb '@npm webpack'
```

Notice the `'` single quotes around the task. This is only needed
when you have a task definition that contains spaces 
as it allows you to chain multiple tasks together. For example,
let's say we want to clean the directory into which Webpack places
the built assets (to stop them building up over time). We can do
that easily by executing another script before the Webpack one.

```bash
cb '@sh rm -rf ./dist' '@npm webpack'
```

Here we've defined 2 tasks to be executed sequentially. The second with *not* run 
unless the first completes without error. This is an important feature of Crossbow as 
you can guarantee that certain tasks will be skipped if any that come before it fail.


{{inc src="video-list.hbs" videos=page.videos}}

---

It important to know you can run tasks directly on the CLI like this, 
but in reality you're going to want to [Define tasks in files](/docs/define-tasks-in-files)
