## Command: Init `$ crossbow init [...options]`

Although Crossbow can run without any configuration files, it's
recommended that you use one - especially if you are working on a team!

Use the `init` command to generate
one automatically in your current directory.

## Options
{{#data src="node_modules/crossbow/opts/command.init.opts.json" as="json"}}
<table>
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

```bash
$ crossbow init
```

This will create a `crossbow.yaml` file in your local directory. Don't
like `yaml`? No worries! Just use the `--type` flag to create either of
the following

```bash
crossbow init               # -> crossbow.yaml
crossbow init --type js     # -> crossbow.js
crossbow init --type json   # -> crossbow.json
crossbow init --type cbfile # -> cbfile.js
```