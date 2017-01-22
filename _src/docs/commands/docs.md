---
title: Crossbow CLI - docs
---

`$ crossbow docs [...options]`

Crossbow can automatically create documenation based on your input files.
Simply run the following command in a directory that has an input file.

If your project has a `readme.md`, the documentation **will be added to the 
end of it**.

For manual placement, you can insert the following comment anywhere in your file,
 and your documentation will be placed there instead.
 

```md
# My project readme

<!--crossbow-docs-start--><!--crossbow-docs-end-->

Some other info, after where you want docs inserting
```

## Easy to keep up-to-date

We all know that project docs can go out of date really quickly, but with 
Crossbow if you add new tasks, or delete/modify something - just run the 
command again and the docs will be **updated automatically!**

## Options

{{inc src="opts-table.hbs" json="node_modules/crossbow/opts/command.docs.opts.json" }}

## Examples

Create a new file for auto-documentation

```sh
$ crossbow docs --output 'myfile.md'
```
---

Use an existing file

```sh
$ crossbow docs --file 'my-readme.md'
```
