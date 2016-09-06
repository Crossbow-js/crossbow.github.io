**Run tasks before watchers begin**

This will start the `default` watcher, but only following
completion of `task1` & `task2`

```sh
$ crossbow watch default --before '<task1>' '<task2>'
```

To run the watchers, even if the before tasks fail, use `--no-fail`

```sh
$ crossbow watch default --before '<task1>' --no-fail
```