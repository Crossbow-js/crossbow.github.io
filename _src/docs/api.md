## Functions

If you've used gulp, you'll feel right at home with a `cbfile.js`

```js
cb.task('task', function () {
    // your task code
});
```

You can also compose task names with functions by using an array instead. ProTip: name
your functions and you'll the name in the CLI output :)

```js
cb.task('task', ['some-other-task', function myFn() {
    // your task code
}]);
`{``