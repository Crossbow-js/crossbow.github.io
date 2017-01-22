---
title: Crossbow CLI - run
---

`$ crossbow run [...tasks] [...options]`

## Options

<table>
{{#data src="node_modules/crossbow/opts/command.run.opts.json" as="json"}}
{{#each json}}
    <tr>
    <td><strong>{{@key}}{{#each this.alias}}, -{{this}}{{/each}}</strong></td>
    <td>
        {{this.desc}}
    </td>
    </tr>
{{/each}}
{{/data}}
{{#data src="node_modules/crossbow/opts/run-common.json" as="json"}}
{{#each json}}
    <tr>
    <td><strong>{{@key}}{{#each this.alias}}, -{{this}}{{/each}}</strong></td>
    <td>
        {{this.desc}}
    </td>
    </tr>
{{/each}}
{{/data}}
</table>

## Examples

Run 1 task 

```bash
$ crossbow run task1
```

--- 
Run multiple tasks in sequence 

```bash
$ crossbow run task1 task2 task3
```

--- 
Run multiple tasks in parallel 

```bash
$ crossbow run task1 task2 task3 -p
```

--- 
Run multiple tasks in parallel with progress reports 

```bash
$ crossbow run task1 task2 task3 -p -P
```

--- 
Run a task, with no output other than the child_process of the task

```bash
$ crossbow run task1 -q
```

--- 

Run an alias that contains 3 tasks, but skip the final task (to avoid an upload for example)

**Input**

```yaml
tasks: 
  build:
    - clean
    - build-js
    - s3-upload
    
```

**Command**
```bash
$ crossbow run build --skip s3-upload
```

---

Run 3 tasks in sequence, but don't allow any errors to stop other tasks from running.
So if `task1` or `task2` exit with an error, `task3` will still run, which it wouldn't normally.

**Command**
```bash
$ crossbow run task1 task2 task3 --no-fail
```

---

Perform a **dry run** of a task to help visualise what occurs. Very useful when you want to verify
 an alias is setup correctly - especially when you have mixtures of series/parallel tasks.

**Input**

```yaml
tasks: 
  build:
    - clean
    - build-js
    - s3-upload
    
```

**Command**
```bash
$ crossbow run build --dryRun
```