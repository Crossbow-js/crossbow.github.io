This error occurs when you're using a `yaml` file as input, but there's
a syntax error in it.

Crossbow will provide line/column numbers in the CLI output showing where the error
originates from, and you can use this information along with the [`js-yaml`](http://nodeca.github.io/js-yaml/) 
docs to help fix your issue.