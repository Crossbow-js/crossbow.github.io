This error occurs when you invoke a Crossbow command that require task information,
 but you havn't defined any tasks.
 
For example, if you run the following command in a directory that does not contain any
Crossbow input files, and also does not contain any JS files in the `./tasks` directory, then
you'll see this error.

```bash
# This will produce an error when inputs are absent
cb tasks
```