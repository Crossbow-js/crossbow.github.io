This error occurs when you provide the `-i` flag to specify 1 or more inputs, but 
the file could not be found.

So, if you wanted to list all of your available tasks in `my-conf.yml`, you would run 
the following command
 
```bash
cb tasks -i my-conf.yml
```

But, if you provide a path to an input file that does not exist, you'll get this error!

```bash
# error because cute-kittens.yml does not exist 
# in the current directory
cb tasks -i cute-kittens.yml
```