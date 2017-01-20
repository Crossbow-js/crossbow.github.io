There are always situations in which you'll want to re-use a task. Perhaps you've crafted a nice
 pipeline of transformations to take `.scss` files and compile them into CSS. It could be a multi-step process
 such as 
 
```js
cb.task('sass', function () {
    return vfs.src('./app/scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', done))
        .pipe(post([plugin1, plugin2]))
        .pipe(vfs.dest('./dest/'));
})
```