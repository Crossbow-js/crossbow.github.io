## `config` examples

Run task-1 with config file

```sh
$ crossbow run task-1 -c 'my-config.js'
```

Run task-1 with 2 configs
Note: Config is merged right-to left in any amount of files. This is useful for s

```sh
$ crossbow run task-1 -c 'dev.js' 'production-overrides.js'
```
