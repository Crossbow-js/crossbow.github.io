This error occurs when you try to run a named watcher, but that name does not exist. 

So, if you had the following input...

```yaml
watch:
  php:
    'app/views/**/*.php': ['@npm browser-sync reload']
  scss:
    'public/scss': ['@npm node-sass ./public/scss/styles.scss']
```

... this creates 2 Crossbow watchers, named `php` and `scss`, then on the command line 
you can run 1 or more of them.


```bash
cb watch php scss
```

If you tried that command with a name that does not exist, you'd get this error.

```bash
# This would error as kittenz is not one of your watchers
cb watch kittenz
```
