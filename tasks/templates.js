var vfs = require('vinyl-fs');
var crossbow = require('crossbow-sites');

module.exports = function (opts) {
    return vfs.src(opts.input)
        .pipe(crossbow.stream({
            config: opts.config,
            data: opts.data
        }))
        .pipe(vfs.dest(opts.output));
};
