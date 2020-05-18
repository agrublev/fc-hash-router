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

### Then use normal anchor like this

```html
<a href="#/products/12/22/bobby/123/random">TEST</a>
```

### OR With Javascript

```js
HashRouter.navigate(`/products/12/22/bobby/123/random`);
```

### To unregister a route

```js
HashRouter.routeOff(`new/#userId`);
```

THAT EASY!

## Author

👤 **Angel Grablev**

-   Website: https://freedcamp.com
-   Github: [@agrublev](https://github.com/agrublev)

## Show your support

Give a ⭐️ if this project helped you!

---

Made by Freedcamp with ❤️
