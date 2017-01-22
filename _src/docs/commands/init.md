---
title: Crossbow CLI - init
---

`$ crossbow init [...options]`

Although Crossbow can run without any configuration files, it's
recommended that you use one - especially if you are working on a team!

Use the `init` command to generate
one automatically in your current directory.

## Options
{{inc src="opts-table.hbs" json="node_modules/crossbow/opts/command.init.opts.json" }}

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

--- 
Remember that the [global options](/docs/cli-options) apply to this command also.