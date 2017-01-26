### The following options/flags apply to all Crossbow commands

{{#data src="node_modules/crossbow/opts/global-common.json" as="json"}}
<table class=opts>
{{#each json}}
    <tr>
    <td class=opts__key><strong>{{@key}}{{#each this.alias}}, -{{this}}{{/each}}</strong></td>
    <td class=opts__value>
        {{this.desc}}
    </td>
    </tr>
{{/each}}
{{/data}}

{{#data src="node_modules/crossbow/opts/common.json" as="json"}}
{{#each json}}
    <tr>
        <td class=opts__key><strong>{{@key}}{{#each this.alias}}, -{{this}}{{/each}}</strong></td>
        <td class=opts__value>
            {{this.desc}}
        </td>
    </tr>
{{/each}}
{{/data}}
</table>

---

**Specifying input files**

Run `task-1` with input file

```sh
$ crossbow run task-1 -i 'my-input.js'
```

Run `task-1` with 2 inputs
Note: Config is merged right-to left in any amount of files. This is useful for overriding
defaults.

```sh
$ crossbow run task-1 -i 'dev.js' 'production-overrides.js'
```

**Load tasks from `./conf` directory**

```sh
$ crossbow run task-1 --tasksDir './conf'
```

**Use a custom reporter**

```sh
$ crossbow run task-1 -r 'my-reporter.js'
```
