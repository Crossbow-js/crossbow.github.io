If you've seen any of the 'getting started' pages already, you'll be used to seeing tasks such as `@npm webpack`
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

- @npm
- @bg
- @bgnpm
- @cb