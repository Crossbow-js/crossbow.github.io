The `bin` option allows you to register one or more directories that will be appended to your PATH 
when executing scripts. This can be used to remove the need to prefix scripts with the adaptor name
 such as `@sh` or `@npm`

The following example shows the composition of 3 separate tools that were **installed locally** with NPM, but 
 without using the `bin` option. Note they are all strings prefixed with `@npm` 
 
```yaml
tasks:
  build:
    - '@npm eslint app/js**/* --fix'
    - '@npm webpack'
    - '@npm node-sass app/scss/styles.scss'
```

Behind the scenes, Crossbow will create a child process for each script, and because `@npm` was prefixed to each one, 
the path `node_modules/.bin` will automatically be added to your PATH so that these locally installed
tools can work.

### Adding the `bin` option

If you have mostly NPM scripts like this, you can omit the `@npm` part of each task and instead provide the
`node_modules/.bin` manually.

**With the `bin` option**

```yaml
tasks:
  build:
    - eslint app/js**/* --fix
    - webpack
    - node-sass app/scss/styles.scss
    
config:
  bin: node_modules/.bin
```

### Adding multiple `bin` directories

Most package managers that allow scripts to be run locally operate in this manner, so if you had a PHP project for example,
where you run some NPM scripts & some Composer scripts, you could just provide multiple `bin` directories to allow
scripts from both.

```yaml
tasks:
  build:
    - phpunit # <-- locally installed PHPUnit
    - eslint app/js**/* --fix
    - webpack
    - node-sass app/scss/styles.scss
    
config:
  bin: 
    - node_modules/.bin # <-- NPM scripts
    - vendor/bin # <-- Composer scripts
```