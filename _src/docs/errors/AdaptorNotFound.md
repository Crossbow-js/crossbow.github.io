This error occurs when you've tried to use an [Adaptor Task](/docs/tasks/adaptor-tasks/)
that does not exist. Usually it's a typo!

This example would be valid, because `@npm` is a valid adaptor name

```yaml
tasks:
  js: '@npm webpack'
```

This example would be **NOT** be valid, because `@kittens` is not a valid adaptor name.

```yaml
tasks:
  js: '@kittens webpack'
```

The current supported adaptors are:

- `@sh`
- `@npm`
- `@bg`
- `@cb`