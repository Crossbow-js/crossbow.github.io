If you've seen any of the 'getting started' pages already, you'll be used to seeing tasks such as `@npm webpack`.
When Crossbow encounters a `string` beginning with a `@` character it will not parse anything after the first space 
& instead it will pass along the remainder of the string to whichever 'adaptor' it belongs to.
 
So when you see something like the this: 

```yaml
tasks:
  js: '@npm webpack --config webpack-prod.config.js'
```

- 1) Crossbow is chopping off the first part upto the space, not including the `@` - so it sees `npm`
- 2) Then it verifies that this is a valid adaptor, in this case the `npm` adaptor is built in, so it's fine.
- 3) It creates a new Task that will eventually spawn a child process and 
    passes along the command exactly as given. `webpack --config webpack-prod.config.js`
- 4) Each adaptor has slightly different behaviour as listed below.

## @sh

This will spawn a child process and execute the command until it completes, very handy for just adding
regular shell commands into a Crossbow pipeline. Globally defined environment variables will work here, see 
 [Environment Variables](/docs/environment-variables/) for details.

```js
tasks:
  clean: '@sh rm -rf ./dist'
```

`@sh` is often used for abstracting away the multiple commands often needed on project into a single file that can be
shared and controlled under git.

```yaml
env: 
  PROD_FILE: docker-compose.prod.yml 
  
tasks:
  (docker):
    up-dev: '@sh docker-compose up -d'
    up-prod: '@sh docker-compose -f $PROD_FILE up -d'
```

Using yaml you can also do some cool tricks with multi-line stuff, see [crossbow.yaml](/docs/examples/yaml/splitting-scripts-onto-multiple-lines-for-readability)
for details.

---

## @npm

The `@npm` adaptor operates almost identically to `@sh` - the main difference is that
your local `node_modules/.bin` directory will be added to the front of your `PATH`. 
This is how Crossbow can execute your locally installed modules.

This means that you can install tools like Webpack and compose it with any other tasks you 
have defined or run it multiple times in parallel etc... the possibilities really are endless.

## @bg
  
This adaptor, `@bg` inherits from `@npm` above, but adds 1 special feature. It will
signal task completion, but will not exit the child process. This means
it's perfect for starting a long-running process in the background, especially 
useful for starting servers when watching files etc.

```yaml
watch:
  default:
    before: 
      - '@bg browser-sync start --server app'
    '**/*.php': 
      - '@npm browser-sync reload'
```

So in that example, if you now run `cb watch` - it will start a Browsersync server
in the background, and then immediately begin watching `php` files for changes.

**Note:** `@bg` is also capable of executing commands from locally installed node_modules
 as it builds on top of the `@npm` adaptor
 
## @cb

The `@cb` adaptor is used for Crossbow control flow. Currently it supports 2 methods - `exit` and `delay`

### @cb exit

You can call `@cb exit` at any point in a task definition and it will instruct all running tasks to complete
their teardown - this can be useful when you have a process running in the background, and need to stop it after
an amount of time, or when some other tasks finish.

```yaml
tasks:
  (protractor):
    start: '@bg webdriver-manager start'
    run:   '@npm protractor --conf test/config.js'
    test: 
      - protractor:start
      - protractor:run
      - '@cb exit'
```

So with this example, if we ran 'cb protractor:test' - it would first start up the selenium webdriver instance
that always has to be running in the background via `protractor:start`. Then it would execute the tests via 
`protractor:run` and finally because we want the server to shut down, we use `@cb exit` to accomplish that.

### @cb delay &lt;ms&gt;

If for example you needed to introduce a 1 second delay between two tasks, you can use `@cb delay 1000`. Using the example
above, it's quite possible that the server would not quite be ready before the tests started to run. Now it's far from 
ideal to introduce timeouts in this fashion, but it can get you out of sticky situations, so just use it when needed.

```yaml
tasks:
  (protractor):
    start: '@bg webdriver-manager start'
    run:   '@npm protractor --conf test/config.js'
    test: 
      - protractor:start
      - '@cb delay 1000' 
      - protractor:run
      - '@cb exit'
```



