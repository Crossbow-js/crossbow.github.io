---
title: Crossbow CLI - tasks
---

`$ crossbow tasks [...tasks?] [...options]`

Use this command to list the tasks defined in this project.

## Examples

List *all* tasks

```bash
crossbow tasks
```

---

List *all* tasks in verbose mode (show's the entire tree rather than top-level tasks only)

```bash
crossbow tasks -v
```

---

List the entire task tree for the top-level task `build`

**Input**

```yml
tasks: 
  build:
    - clean
    - build-js
    - s3-upload
  css:
    - clean-css
    - build-css
```

**Command**

```bash
crossbow tasks build -v
```

---

Show only the sub tasks of the task group `docker`

**Input**

```yaml
tasks:
  (docker):
    up: '@sh docker-compose up'
    up-prod: '@sh docker-compose up'
  build:
    - clean
    - build-js
    - s3-upload
```

**Command**

```bash
crossbow tasks docker
```