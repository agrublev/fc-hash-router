import Router from "./router.js";
// Router.navigate();

// adding routes
// Router.add(/about/, function () {
// 	console.log("about");
// })
// .add(/products\/(.*)\/edit\/(.*)/, function () {
// 	const [productId, itemId] = arguments;
// 	console.log("pro2ducts", productId, itemId);
// 	$("#routeJson").html(`${JSON.stringify({productId, itemId}, null, 4)}`)
// })

// .check("/products/12/edit/22")
// .listen();

/**
 * Hub Listener/Emitter Service
 */
class HubService {
    constructor() {
        Router.config({ mode: "hash" });
        // Router.add(function () {
        // }).listen();
        Router.navigate();

        return this;
    }

    /**
     * All registered routes
     * @type {{}}
     */
    routes = {};

    /**
     * Emits an event
     * @param event - name of event
     * @param data - data pass
     */
    navigate = (url) => {
        Router.navigate(url);
    };

    /**
     * Register listener
     * @param event
     * @param handler
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
     * Unregister
     * @param event
     * @param handler
     */
    routeOff = (url) => {
        let self = this;
        let routeReg;
        console.info("Console --- ", self.routes);

        Object.keys(self.routes).forEach((r) => {
            if (self.routes[r].routeUrl === url) {
                routeReg = self.routes[r].routeRegex;
                delete self.routes[r];
            }
        });
        console.info("Console --- ", self.routes);
        Router.remove(routeReg);
    };
}

export const Hub = new HubService();
