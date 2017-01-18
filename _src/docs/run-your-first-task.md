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

## Define tasks in files
Of course, it would be rather tedious if you had to remember these long command
chains for every task you wanted to run. To solve this problem you can place
a `crossbow.yml` in the root of your project and define the tasks there.

```yml
tasks:
  build:
    - '@sh rm -rf ./dist'
    - '@npm webpack'
```

## Use task alias's
Crossbow will always try to resolve alias's *first* which allows
you to re-use the same task over and over again whilst also making
for cleaner composition.

```yml
tasks:
  build:
    - clean
    - webpack

  clean: '@sh rm -rf ./dist'
  webpack: '@npm webpack'
```

## Getting fancy with alias's
An area in which Crossbow leap-frogs the competition is with its strong composition features. It will
 recursively resolve tasks & alias's allowing things such at the following:

```yml
tasks:
  build:
    - clean
    - webpack

  clean:
    - '@sh rm -rf ./js/dist'
    - '@sh rm -rf ./css/dist'
  webpack: '@npm webpack'
```
With this example, if we then ran `cb build` on the command line, both of the scripts
defined under the `clean` task would have to successfully complete before the `webpack`
task begins.