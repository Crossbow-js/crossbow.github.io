This error occurs when you're using the `init` command with the `type` flag
and you provided an unsupported type.

The following types are supported

- `cbfile`
- `yaml`
- `js`
- `json`

and to use one, you would run the following (where `cbfile` could be any value from above)

```bash
cb init --type cbfile
```

Any other value provided would cause this error, such as

```bash
# error, as kittens is not a valid type
cb init --type kittens
```