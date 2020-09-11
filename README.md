## Quick start

- 1. create a new `.npmrc` in the project root directory

for yarn:

```bash
registry=https://registry.yarnpkg.com/

@consenLabs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=13cce20c0b25c08e24d3df94b1c95a1e448e2233
always-auth=true
```

for npm :

```bash
registry=https://registry.npmjs.org/

@consenLabs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=13cce20c0b25c08e24d3df94b1c95a1e448e2233
always-auth=true
```

## Usage

before start, you may need to install these dep:

```
npm i @babel/plugin-proposal-class-properties -D
npm i @babel/plugin-proposal-decorators -D
```

example:

```js
import { catchError, TOAST_TYPE } from '@consenLabs/catch-error'

const handleError = (error) => {
  alert(error)
}
class Example {
  @catchError({
    toast: {
      message: 'some thing error',
    },
    handler: handleError,
  })
  getSomeThing() {
    throw Error
  }
}
```
