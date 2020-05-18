# Welcome to fc-hash-router 👋
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

> The godliest of routers!

### ✨ [Demo](https://fc-hash-router.surge.sh)

## Install

```sh
yarn add fc-hash-router -D
```

## Usage

```js
import { HashRouter } from "fc-hash-router";

HashRouter.route(`products/:firstVar/:someVar/bobby/#num/random`, (data) => {
  	console.info(data);
});

// Or cooler
HashRouter.route(`products/:firstVar/:someVar/bobby/#num/random`, ({firstVar,someVar,num}) => {
  	console.info({firstVar,someVar,num});
});
```

## Author

👤 **Angel Grablev**

-   Website: https://freedcamp.com
-   Github: [@agrublev](https://github.com/agrublev)

## Show your support

Give a ⭐️ if this project helped you!

---

Made by Freedcamp with ❤️
