This error occurs when you provided the `--file` flag to the Crossbow docs command - but the
value provided after did not match an existing file.

For example, if you had a file called `docs.md` and you wanted Crossbow to use that file, 
you would run 

```bash
cb docs --file docs.md
```

But, if that file does not already exist, you'll get this error.

The cause is usually: 

- 1: You made a typo,
 
 or
 
- 2: you actually wanted to create a new file, in which case you should've used the `--output` flag instead :)