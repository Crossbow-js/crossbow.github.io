<!--crossbow-docs-start-->
## Crossbow tasks

The following tasks have been defined by this project's Crossbow configuration.
Run any of them in the following way
 
```shell
$ crossbow run <taskname>
```
|Task name|Description|
|---|---|
|<pre>`serve`</pre>|Build all HTML + assets and start Browsersync|
|<pre>`build-all`</pre>|**Alias for:**<br>- `html`<br>- `icons`<br>- `sass`|
|<pre>`html`</pre>|**Alias for:**<br>- `tasks/templates`|
|<pre>`icons`</pre>|undefined|
|<pre>`sass`</pre>|Compile sass -> css|
|<pre>`commit`</pre>|**Alias for:**<br>- `build-all`<br>- `@sh git add .`<br>- `@sh git commit -m "$CB_CLI_TRAILING"`<br>- `@sh git push origin master`|
|<pre>`deploy`</pre>|**Alias for:**<br>- `build-all`<br>- `rsync`<br>- `docker-restart`<br>- `@sh open $LIVE_URL`|
|<pre>`rsync`</pre>|Copy files from local to remote server|
|<pre>`ssh`</pre>|**Alias for:**<br>- `@sh ssh $AUTH`|
|<pre>`docker-start`</pre>|**Alias for:**<br>- `@sh ssh $AUTH "docker run -d --name crossbow -p 80:80 -v $(pwd)/crossbow:/usr/share/nginx/html -v $(pwd)/crossbow/nginx.conf:/etc/nginx/conf.d/default.conf donbeave/nginx-pagespeed:1.8.0-1"`|
|<pre>`docker-restart`</pre>|**Alias for:**<br>- `@sh ssh $AUTH "docker exec crossbow rm -rf /var/ngx_pagespeed_cache"`<br>- `@sh ssh $AUTH "docker restart crossbow"`|
|<pre>`open`</pre>|**Alias for:**<br>- `@sh open $LIVE_URL`|
<!--crossbow-docs-end-->