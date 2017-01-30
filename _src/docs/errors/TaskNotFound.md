This error would occur when you're trying to run something that Crossbow cannot resolve. Crossbow 
will try to resolve tasks in the following order.

- task aliases
- file names
- file names in `./tasks` directory (which can be configured)
- module names installed via npm

If all of these fail, you'll see this error. Mostly it's a typo, but at any point
you can run `cb tasks` to see a list of how Crossbow thinks it can resolve your tasks.
