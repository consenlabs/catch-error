## Quick start

- 1. create a new `.npmrc` in the project root directory

for yarn:

```bash
registry=https://registry.yarnpkg.com/

@consenlabs:registry=https://npm.pkg.github.com
always-auth=true
```

for npm :

```bash
registry=https://registry.npmjs.org/

@consenlabs:registry=https://npm.pkg.github.com
always-auth=true
```

## Usage

before start, you may need to install these dep:

```
npm i @babel/plugin-proposal-class-properties -D
npm i @babel/plugin-proposal-decorators -D
```

you may always write too much `try...catch` dirty code,now, `@catchError` is an elegant way to replace now.

```js
try {
  doSomething()
} catch (err) {
  console.error(error)
}
```

For example:

```js
import { catchError, TOAST_TYPE } from '@consenLabs/catch-error'

const handleError = (error) => {
  alert(error)
}
class Example {
  @catchError({
    toast: {
      message: 'some thing error',
      type: TOAST_TYPE.WARNING,
    },
    handler: handleError,
  })
  getSomeThing() {
    throw Error
  }
}
```
