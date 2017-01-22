---
title: Crossbow CLI - watch
---

`$ crossbow watch [...watchers] [...options]`

{{inc src="opts-table.hbs" json="node_modules/crossbow/opts/command.watch.opts.json" }}

## Examples 

Running a 'default' watcher

```yaml
watch:
  default:
    'src/**/*.md': [markdown] 
    
tasks:
  markdown:
    tasks: 'process-markdown.js'
    options: 'src/**/*.md' 
```

**Command**
```bash
$ crossbow watch
```

---

Running a named watcher

**Input**
 
```yaml
watch:
  blog:
    'src/**/*.md': [markdown] 
    
tasks:
  markdown:
    tasks: 'process-markdown.js'
    options: 'src/**/*.md' 
```

**Command**
```bash
$ crossbow watch blog
```

---

Running tasks before watchers begin

**Command**
```bash
$ crossbow watch blog --before '@sh rm -rf ./dist/blog'
```

---

Ensuring watchers cannot trigger overlapping tasks

**Command**
```bash
$ crossbow watch blog --block
```

---

Throttle the rate in which to respond to file-changes (time given in ms) 

**Command**
```bash
$ crossbow watch blog --throttle 1000
```

---

Ignore changes until 500ms of event silence occurs - this is extremely useful for guarding against multiple file-events
  triggering a task multiple times (eg: when copy/pasting large numbers of files, or doing a `git checkout`)

**Command**
```bash
$ crossbow watch blog --debounce 1000
```

--- 
Remember that the [global options](/docs/cli-options) apply to this command also.