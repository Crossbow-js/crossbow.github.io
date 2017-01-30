This error occurs when you're using the `--fromJson` flag to provide input based
on some inline JSON, but the JSON could not be parsed because it was invalid.
 
So, the following would be **valid** as the JSON would parse correctly:

```bash
cb js --fromJson '{"tasks":{"js": "@npm webpack"}}'
```

Whilst the following would be **invalid** as parsing the JSON would throw an error.

```bash
cb js --fromJson '{"tasks":{"js": "@npm webpack}}'
```

**Note: it's missing a `"` just after `webpack`