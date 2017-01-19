# Run your first task

Did you know you can run tasks & watchers without any configuration at all?
This works for Javascript files, shell scripts, NPM scripts and more!

**Example:**

Let's run  `webpack` that's been locally installed on a project (like
you would with NPM scripts)

```bash
cb '@npm webpack'
```

Notice the `'` single quotes around the task. This is important
as this allows you to chain multiple tasks together. For example,
let's say we want to clean the directory into which Webpack places
the built assets (to stop them building up over time). We can do
that easily by executing another script before the Webpack one.

```bash
cb '@sh rm -rf ./dist' '@npm webpack'
```

Here we've defined 2 tasks (by wrapping in quotes) to be executed sequentially.
Crossbow also supports running tasks in parallel and other advanced features
that you can read about when you're comfortable with the basics.

---

Now you're ready to [Define tasks in files](/docs/define-tasks-in-files)
