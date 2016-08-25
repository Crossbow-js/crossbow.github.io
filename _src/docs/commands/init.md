## Command: Init `$ crossbow init [...options]`

Although Crossbow can run without any configuration files, it's
recommended that you use one. Use the `init` command to generate
one automatically in your current directory.

```bash
$ crossbow init
```

This will create a `crossbow.yaml` file in your local directory. Don't
like `yaml`? No worries! Just use the `--type` flag to create either of
the following

```
$ crossbow init               -> crossbow.yaml
$ crossbow init --type js     -> crossbow.js
$ crossbow init --type json   -> crossbow.json
$ crossbow init --type cbfile -> cbfile.js
```