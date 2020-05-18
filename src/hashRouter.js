import Router from "./router.js";

/**
 * Hash Router service
 */
class HashRouterService {
    constructor() {
        Router.config({ mode: "hash" });
        return this;
    }

    /**
     * All registered routes
     * @type {{}}
     */
    routes = {};

    /**
     * Emits an event
     * @param url - the hash url you want to navigate like
     * @example HashRouter.navigate(`/products/12/22/bobby/123/random`);
     */
    navigate = (url) => {
        Router.navigate(url);
    };

    /**
     * Register route
     * @param url with majic variables like :NameOfVariable for a string OR #nameOfNumberVariable for number
     * @param handler to be called back with route data
     */
    route = (url, handler) => {
        let self = this;
        const segments = url.split("/");
        let routeRegex = ``;
        this.routes[url] = {
            routeUrl: url,
            handler,
            segmentHandlers: {},
            numberOfSegments: segments.length
        };
        let currentSegVar = 1;
        segments.forEach((seg, ind) => {
            if (seg.startsWith("#")) {
                this.routes[url].segmentHandlers[seg.replace("#", "")] = {
                    type: "number",
                    segNum: currentSegVar
                };
                currentSegVar++;
                routeRegex += `([0-9]+)/`;
            } else if (seg.startsWith(":")) {
                this.routes[url].segmentHandlers[seg.replace(":", "")] = {
                    type: "string",
                    segNum: currentSegVar
                };
                currentSegVar++;
                routeRegex += `(.*)/`;
            } else {
                routeRegex += `${seg}/`;
            }
        });
        routeRegex = routeRegex.slice(0, -1);

        const regRoute = new RegExp(`${routeRegex}`);
        self.routes[url].routeRegex = regRoute;

        Router.add(regRoute, url, function (...info) {
            let routeName = info[0];
            const routeMatched = self.routes[routeName];

            const resp = {};
            let handlers = routeMatched.segmentHandlers;
            for (let i in info) {
                Object.keys(handlers).forEach((name) => {
                    if (parseInt(handlers[name].segNum) === parseInt(i)) {
                        resp[name] = handlers[name].type === "number" ? parseInt(info[i]) : info[i];
                    }
                });
            }
            handler(resp);
        }).listen();
    };

    /**
     * Unregister a route
     * @param url you passed when creating the route
     */
    routeOff = (url) => {
        let self = this;
        let routeReg = "";

        Object.keys(self.routes).forEach((r) => {
            if (self.routes[r].routeUrl === url) {
                routeReg = self.routes[r].routeRegex;
                delete self.routes[r];
            }
        });
        Router.remove(routeReg);
    };
}

export const HashRouter = new HashRouterService();
