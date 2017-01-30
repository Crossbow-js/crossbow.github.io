This error occurs when you run `cb init`, but the current directory already 
 contains a file with the same name as Crossbow wanted to use.
  
You have 2 solutions - either manually create the new input (Crossbow does support multiple input
files) or create a different type with the --type flag

So, if you already have a `crossbow.yaml` file in the current directory, running the following 
command would produce this error!

```bash
cb init
```