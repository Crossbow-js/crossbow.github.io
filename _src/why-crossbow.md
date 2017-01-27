## Contextual error handling

Error handling in Crossbow was not simply an afterthought, it was in fact was the exact opposite - I designed the 
entire system *around* the graceful collection and presentation of errors!

This may not be the sexiest topic in tech to focus on, and you may not even understand why you'd want this yet,
but after using a system such as Crossbow, with the way it can describe wth unbelievable detail not only the origin
of the error, but also how that error affected any sibling/child tasks, you're not going to be switching back to 
NPM scripts any time soon!

## Dedicated Task Runner

Because the sole focus of Crossbow is facilitating advanced task composition, we can implement features that may fall
 into the 'out of scope' category for many other tools, especially those who mix task running and file processing 
 for example. Features such as `ifChanged` which uses content checks to determine if tasks should run, recursive
  task resolution which allows you design your pipeline in a way that suits your project, interactive task completion
   which removed the need to remember every task name, task validation and much much more.
   
## Re-use your exiting tools  

Crossbow can execute shell scripts, it can import your functions from files,
it can consume Gulp plugins, it can run NPM scripts and more... it's a high-level orchestration tool that does not 
require  it's own plugin eco-system - there are already so many good tools out there, Crossbow can just helps to 
string them together whilst providing a better Developer Experience through excellent error handling and reporting.

## Roadmap

- Execute commands over a network (eg: a Chrome extension that lists your project's tasks)
- Allow tasks to specify there their expected input values in a way the Crossbow can present it to the user.
  - this will allow Crossbow to validate how your calling the task to prevent many failures
 