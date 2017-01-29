This error occurs when you provided the `--output` flag to the Crossbow docs command but the 
file you want to create already exists.

If you want to overwrite an existing file, use the `--file` command.

**Create a NEW file**

```bash
cb docs --output my-new-file.md 
```

**Overwrite an EXISTING file**

```bash
cb docs --file docs.md 
```