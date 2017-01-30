This error occurs when you provide an object literal as a task, but you have not provided
the minimal supported keys/values. With objects, you need to satisfy **one** of the following

- have a `tasks` key, which could be any valid Crossbow definitions
- have an `input` key, like `input: '@npm node-sass ./app/scss ./app/css'`
- have both `adaptor` along with `command`


**Valid**

Using the `tasks` key

```yaml
tasks:
  js:
    tasks: '@npm node-sass ./app/scss ./app/css'
```
---

**Valid**

Using `input` key

```yaml
tasks:
  js:
    input: '@npm node-sass ./app/scss ./app/css'
```

**Valid**

Using `adaptor` + `command` key

```yaml
tasks:
  js:
    adaptor: '@npm'
    command: 'node-sass ./app/scss ./app/css'
```