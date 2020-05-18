<a name="HashRouterService"></a>

## HashRouterService
Hash Router service

**Kind**: global class  

* [HashRouterService](#HashRouterService)
    * [.routes](#HashRouterService+routes) : <code>Object</code>
    * [.navigate](#HashRouterService+navigate)
    * [.goBack](#HashRouterService+goBack)
    * [.route](#HashRouterService+route)
    * [.routeOff](#HashRouterService+routeOff)

<a name="HashRouterService+routes"></a>

### hashRouterService.routes : <code>Object</code>
All registered routes

**Kind**: instance property of [<code>HashRouterService</code>](#HashRouterService)  
<a name="HashRouterService+navigate"></a>

### hashRouterService.navigate
Emits an event

**Kind**: instance property of [<code>HashRouterService</code>](#HashRouterService)  

| Param | Description |
| --- | --- |
| url | the hash url you want to navigate like |

**Example**  
```js
HashRouter.navigate(`/products/12/22/bobby/123/random`);
```
<a name="HashRouterService+goBack"></a>

### hashRouterService.goBack
Go back in time

**Kind**: instance property of [<code>HashRouterService</code>](#HashRouterService)  
<a name="HashRouterService+route"></a>

### hashRouterService.route
Register route

**Kind**: instance property of [<code>HashRouterService</code>](#HashRouterService)  

| Param | Description |
| --- | --- |
| url | with majic variables like :NameOfVariable for a string OR #nameOfNumberVariable for number |
| handler | to be called back with route data |

<a name="HashRouterService+routeOff"></a>

### hashRouterService.routeOff
Unregister a route

**Kind**: instance property of [<code>HashRouterService</code>](#HashRouterService)  

| Param | Description |
| --- | --- |
| url | you passed when creating the route |
