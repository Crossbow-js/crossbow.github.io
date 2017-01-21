Due to the flexible nature of Crossbow, it's very likely that you'll begin using it to orchestrate all
kinds of tasks. Be it front-end related build stuff, random shell scripts, locally installed NPM modules and more.

One thing I learned early on in development, is that when defining multiple scripts, it's extremely handy to 
be able to set global `ENVIRONMENT` `VARIABLES` (referred to as env vars from here on in) that are accessible to 
all of the sub-processes that Crossbow will create.

We can use an example from this very website - I have a set of Docker commands that all use the same `image` name also
a few commands that all need a filepath passing as part of the command. With Crossbow, you can provide a top-level
`env` key and any key-value pairs you place here will be available within all of your scripts

{{inc 
    src="three.hbs"
    name="env-vars-01"
    yml="snippets/env-vars-01/crossbow.yml"
    cbfile="snippets/env-vars-01/cbfile.js"
    js="snippets/env-vars-01/crossbow.js"
}}


Notice how I use both `$IMAGE` and `$PROD_FILE` here - this is so cool, because now should any of these values need
 to change during the life of a project, we'll only need to change this in 1 place.
 
Note: this is the preferred solution to providing env-vars. Remember, if you have to give them on the command line
then all of a sudden you need to document your workflow for your future self and for team mates. The whole point of 
Crossbow is to normalise the task running setup each project requires.

## Per-task env vars

If you provide both global env vars as seen above, along with task-specific ones, the ones given at the task level 
will take precedence.

{{inc 
    src="three.hbs"
    name="env-vars-02"
    yml="snippets/env-vars-02/crossbow.yml"
    cbfile="snippets/env-vars-02/cbfile.js"
    js="snippets/env-vars-02/crossbow.js"
}}

In that case, if you run `docker:build` now the value of `$IMAGE` will be `oops`, rather that the globally defined one 

## Crossbow env vars

As a convenience Crossbow will add the following env vars so that they are available to all your scripts
 
- `CB_CONFIG_<name>` - one for each configuration value, where `name` will be the Crossbow config key, eg: `CB_CONFIG_PROGRESS=true`
- `CB_OPTIONS_<name>` - one for each options value, where `name` will be the key you provided in your options key, 
    eg: `CB_OPTIONS_DOCKER_IP`
- `CB_CLI_COMMAND` - this will the Crossbow command name used, eg: `CB_CLI_COMMAND=watch`
- `CB_CLI_TRAILING` - this contain anything found after `--` if provided.

## CB_CLI_TRAILING

This one deserves a special mention, as it can allow some really nice abstractions. We'll use Docker again as an example, 
but this technique will work with any scripts. Let's say you wanted to run the command `composer install` inside a 
container:  

```yml
$ docker-compose exec app composer install 
```

To bring this idea into Crossbow, you can define your task in this way: 

```yml
tasks:
    exec: '@sh docker-compose exec app $CB_CLI_TRAILING'
```

Then you can populate `$CB_CLI_TRAILING` automatically by using the CLI terminator `--`.

```yml
cb exec -- composer install
```

The benefit to doing this with Crossbow, rather than creating aliases directly on your development machine, is that these
 live with the project and can therefor be shared between team members.

--- 

As promised, we're ready now to move onto learning about [File Watching](/docs/file-watching)