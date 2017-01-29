This error occurs when you try to compose tasks in a way that would cause an 
infinite loop. Crossbow will try its best to prevent you from locking up your machine. 

It's not bullet-proof, yet, but it works in 99% of cases :)

```yml
tasks:
  build: 
    - css
    - js
    - build # <-- infinite loop!
```