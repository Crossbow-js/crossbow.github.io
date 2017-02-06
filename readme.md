<!--crossbow-docs-start-->
## Crossbow tasks

The following tasks have been defined by this project's Crossbow configuration.
Run any of them in the following way
 
```shell
$ crossbow run <taskname>
```
|Task name|Description|
|---|---|
|<pre>`release`</pre>|Create a production release of CSS/JS/HTML assets|
|<pre>`html-min`</pre>|**Alias for:**<br>- `@npm html-minifier --input-dir  $HTML_TARGET --output-dir $HTML_TARGET --collapse-whitespace`|
|<pre>`ts`</pre>|Compile Typescript files|
|<pre>`letsencrypt`</pre>|**Alias for:**<br>- `@sh ssh $DO_AUTH docker run -it --rm -p 443:443 --name certbot -v /etc/letsencrypt:/etc/letsencrypt -v /var/log/letsencrypt:/var/log/letsencrypt quay.io/letsencrypt/letsencrypt:v0.9.1 certonly --standalone -d crossbow.io -d www.crossbow.io`|
|<pre>`uglify`</pre>|Uglify TS output, create sourcemap + manifest.json|
|<pre>`sass`</pre>|use the 'crossbow-sass' module to compile SCSS files into css|
|<pre>`templates`</pre>|**Alias for:**<br>- `@sh rm -rf public-hml/**`<br>- `tasks/templates.js`|
|<pre>`build:css`</pre>|**Alias for:**<br>- `clean:css`<br>- `crossbow-sass`<br>- `crossbow-sass --production --rev --manifest`|
|<pre>`build:js`</pre>|**Alias for:**<br>- `clean:js`<br>- `ts`<br>- `uglify`|
|<pre>`docker:up-dev`</pre>|**Alias for:**<br>- `@sh docker run -d -v `pwd`/certs:/etc/letsencrypt      -p 80:80 -p 443:443 $IMAGE`|
|<pre>`docker:up-prod`</pre>|**Alias for:**<br>- `@sh docker run -d -v /etc/letsencrypt:/etc/letsencrypt -p 80:80 -p 443:443 $IMAGE`|
|<pre>`docker:push`</pre>|**Alias for:**<br>- `@sh docker push $IMAGE`|
|<pre>`docker:build`</pre>|**Alias for:**<br>- `@sh docker build -t $IMAGE .`|
|<pre>`docker:release`</pre>|Create a production release of CSS/JS/HTML assets|
|<pre>`docker:prod`</pre>|**Alias for:**<br>- `build:*`<br>- `docs:*`<br>- `templates`<br>- `docker:build`<br>- `docker:up-prod`|
|<pre>`docker:dev`</pre>|**Alias for:**<br>- `build:*`<br>- `docs:*`<br>- `templates`<br>- `docker:build`<br>- `docker:up-dev`|
|<pre>`server:pull`</pre>|**Alias for:**<br>- `@sh ssh $DO_AUTH docker pull $IMAGE`|
|<pre>`server:stop`</pre>|**Alias for:**<br>- `@sh ssh $DO_AUTH docker stop $CONTAINER`|
|<pre>`server:up`</pre>|**Alias for:**<br>- `@sh ssh $DO_AUTH docker run --name $CONTAINER -v /etc/letsencrypt:/etc/letsencrypt -p 80:80 -p 443:443 $IMAGE -d`|
|<pre>`server:certs`</pre>|**Alias for:**<br>- `@sh scp -r $DO_AUTH:/etc/letsencrypt/live ./certs`|
|<pre>`clean:docker-images`</pre>|**Alias for:**<br>- `@sh docker rmi $(docker images -f "dangling=true" -q)`|
|<pre>`clean:css`</pre>|**Alias for:**<br>- `@sh rm -rf public/css/*.{css,map,json`|
|<pre>`clean:js`</pre>|**Alias for:**<br>- `@sh rm -rf public/js/*.{js,map,json`|
|<pre>`bs:reload`</pre>|**Alias for:**<br>- `@npm browser-sync reload`|
|<pre>`bs:inject`</pre>|**Alias for:**<br>- `@npm browser-sync reload --files core.css`|
|<pre>`bs:serve`</pre>|**Alias for:**<br>- `@bg browser-sync start --server public --ss public-html --reloadDebounce 500`|
|<pre>`docs:create-errors`</pre>|Use the Crossbow error files to create documentation pages|
<!--crossbow-docs-end-->