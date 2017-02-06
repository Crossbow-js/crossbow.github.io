This error occurs when you use the `bin` option, but the path you provided is not a directory. The `bin` option
 only works with directories, so if you make a typo or a path that is a **file** rather than a directory, you'll get this issue.
 
 **GOOD**
 
 The following works, because after an `npm install`, you'll have a directory named `node_modules/.bin`.
 
 ```yaml
 config: 
   bin:
     - node_modules/.bin
 tasks:
   lint: eslint src/** --fix
 ```
 
 **BAD**
 
 The following will *not* work, as the `bin` option has a value that points to a file.
 
 ```yaml
  config: 
    bin:
      - node_modules/.bin/eslint # <-- This is a file
  tasks:
    lint: eslint src/** --fix
  ```
