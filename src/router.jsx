/**
 * Router is a simple JavaScript hash-based routing function.
 * It provides route adding, removing, navigating and flushing routes.
 */
const Router = {
    /**
     * An array to hold the routes.
     * Each route is an object with the properties 're', 'original' and 'handler'.
     */
    routes: [],

    /**
     * The base url of the router. By default, it's set to "/".
     */
    root: "/",
    config: function (options) {
        this.root = options && options.root ? "/" + this.clearSlashes(options.root) + "/" : "/";
        return this;
    },
    getFragment: function () {
        let fragment = "";
        const match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : "";
        return this.clearSlashes(fragment);
    },
    clearSlashes: function (path) {
        return path.toString().replace(/\/$/, "").replace(/^\//, "");
    },
    add: function (re, orig, handler) {
        if (typeof re == "function") {
            handler = re;
            re = "";
        }
        this.routes.push({ re: re, original: orig, handler: handler });
        return this;
    },
    remove: function (param) {
        let i = 0,
            r;
        for (; i < this.routes.length, (r = this.routes[i]); i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    flush: function () {
        this.routes = [];
        this.root = "/";
        return this;
    },
    navigate: function (path) {
        path = path ? path : "";
        window.location.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
        if (path === "" || path === "/") {
            history.replaceState(null, null, " ");
        }
        return this;
    }
};

export default Router;
