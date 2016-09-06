**Start in Interactive mode**

```sh
$ crossbow run -i
```

**Show progress reports for every task**

```sh
$ crossbow run '<task name>' -P
```

**Only show child process output**

```sh
$ crossbow run 'build-all' -q
```

**Allow failures**
```sh
$ crossbow run 'build-all' --no-fail
```

**Force tasks to run (even if files haven't changed)**
```sh
$ crossbow run 'build-all' -f
```

**Skip some tasks (even if they are children)**

Here `build-js` is one child of `build-all`

```sh
$ crossbow run 'build-all' --skip build-js
```

**Perform a dry run with progress**

Useful for checking that series/parallel tasks will execute as desired.
No tasks will actually be executed using this method, it's for visualisation only.

```sh
$ crossbow run 'build-all' '@npm webpack' --dryRun -P
```
