node-og

A mini logging module.

`yarn add node-og`

# **Usage**

> Setup

###### **`test-og.js`**

```javascript
const og = require('node-og')({
  logPath: 'path/to/og/to',
  logFile: 'og_file.txt'
})

og.enable(process.stdout)

console.info('Hi, logs!')

og.disable(process.stdout)

console.info('Bye, logs!')
```

> Output
###### **`og_file.txt`**

```
Hi, logs!
```
