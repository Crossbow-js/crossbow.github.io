This error occurs when you're using a Javascript or JSON file as your input, 
but there was some problem when reading it.

Crossbow uses NodeJS's `require()` to import the files you use as input, which means
the script will be executed and could error like any other program.

This is probably not a Crossbow error, but more likely an issue with your code.

**Example** - The following input would cause this error as it has a syntax error - the 
`webpack` string is missing the closing quote.
 
```js
// This will error as the string is un-closed
module.exports = {
    tasks: {
        js: ['webpack]        
    }
}
```