var $jtWlF$swchelpers = require("@swc/helpers");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "HashRouter", function () { return $0195d6fb121e4577$export$7221d69dcfc8e36b; });


var $1c6312a031d4fa7a$var$Router = {
    routes: [],
    root: "/",
    config: function config(options) {
        this.root = options && options.root ? "/" + this.clearSlashes(options.root) + "/" : "/";
        return this;
    },
    getFragment: function getFragment() {
        var fragment = "";
        var match = window.location.href.match(/#(.*)$/);
        fragment = match ? match[1] : "";
        return this.clearSlashes(fragment);
    },
    clearSlashes: function clearSlashes(path) {
        return path.toString().replace(/\/$/, "").replace(/^\//, "");
    },
    add: function add(re, orig, handler) {
        if (typeof re == "function") {
            handler = re;
            re = "";
        }
        this.routes.push({
            re: re,
            original: orig,
            handler: handler
        });
        return this;
    },
    remove: function remove(param) {
        var i = 0, r;
        for(; this.routes.length, r = this.routes[i]; i++)if (r.handler === param || r.re.toString() === param.toString()) {
            this.routes.splice(i, 1);
            return this;
        }
        return this;
    },
    flush: function flush() {
        this.routes = [];
        this.root = "/";
        return this;
    },
    check: function check(f) {
        var fragment = f || this.getFragment();
        for(var i = 0; i < this.routes.length; i++){
            var match = fragment.match(this.routes[i].re);
            if (match && fragment.split("/").length === this.routes[i].re.toString().slice(1, -1).split("/").length) {
                match.shift();
                var segs = [];
                for(var i1 in match)segs.push(match[i1]);
                this.routes[i].handler.apply({
                }, [
                    this.routes[i].original
                ].concat($jtWlF$swchelpers.toConsumableArray(match)));
                return this;
            }
        }
        return this;
    },
    listen: function listen() {
        var self = this;
        var current = self.getFragment();
        var fn = function fn() {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function navigate(path) {
        path = path ? path : "";
        window.location.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
        if (path === "" || path === "/") history.replaceState(null, null, " ");
        return this;
    }
};
var $1c6312a031d4fa7a$export$2e2bcd8739ae039 = $1c6312a031d4fa7a$var$Router;


var $0195d6fb121e4577$var$HashRouterService = function $0195d6fb121e4577$var$HashRouterService() {
    "use strict";
    var _this = this;
    $jtWlF$swchelpers.classCallCheck(this, $0195d6fb121e4577$var$HashRouterService);
    $jtWlF$swchelpers.defineProperty(this, /**
   * All registered routes
   * @type {{}}
   */ "routes", {
    });
    $jtWlF$swchelpers.defineProperty(this, /**
   * Emits an event
   * @param url - the hash url you want to navigate like
   * @example HashRouter.navigate(`/products/12/22/bobby/123/random`);
   */ "navigate", function(url) {
        $1c6312a031d4fa7a$export$2e2bcd8739ae039.navigate(url);
    });
    $jtWlF$swchelpers.defineProperty(this, /**
   * Go back in time
   */ "goBack", function() {
        window.history.back();
    });
    $jtWlF$swchelpers.defineProperty(this, /**
   * Register route
   * @param url with majic variables like :NameOfVariable for a string OR #nameOfNumberVariable for number
   * @param handler to be called back with route data
   */ "route", function(url, handler) {
        var _this1 = _this;
        var self = _this;
        var segments = url.split("/");
        var routeRegex = "";
        _this.routes[url] = {
            routeUrl: url,
            handler: handler,
            segmentHandlers: {
            },
            numberOfSegments: segments.length
        };
        var currentSegVar = 1;
        segments.forEach(function(seg, ind) {
            if (seg.startsWith("#")) {
                _this1.routes[url].segmentHandlers[seg.replace("#", "")] = {
                    type: "number",
                    segNum: currentSegVar
                };
                currentSegVar++;
                routeRegex += "([0-9]+)/";
            } else if (seg.startsWith(":")) {
                _this1.routes[url].segmentHandlers[seg.replace(":", "")] = {
                    type: "string",
                    segNum: currentSegVar
                };
                currentSegVar++;
                routeRegex += "(.*)/";
            } else routeRegex += "".concat(seg, "/");
        });
        routeRegex = routeRegex.slice(0, -1);
        var regRoute = new RegExp("".concat(routeRegex));
        self.routes[url].routeRegex = regRoute;
        $1c6312a031d4fa7a$export$2e2bcd8739ae039.add(regRoute, url, function() {
            var _loop = function(i) {
                Object.keys(handlers).forEach(function(name) {
                    if (parseInt(handlers[name].segNum) === parseInt(i)) resp[name] = handlers[name].type === "number" ? parseInt(info[i]) : info[i];
                });
            };
            for(var _len = arguments.length, info = new Array(_len), _key = 0; _key < _len; _key++){
                info[_key] = arguments[_key];
            }
            var routeName = info[0];
            var routeMatched = self.routes[routeName];
            var resp = {
            };
            var handlers = routeMatched.segmentHandlers;
            for(var i in info)_loop(i);
            handler(resp);
        }).listen();
        $1c6312a031d4fa7a$export$2e2bcd8739ae039.check();
    });
    $jtWlF$swchelpers.defineProperty(this, /**
   * Unregister a route
   * @param url you passed when creating the route
   */ "routeOff", function(url) {
        var self = _this;
        var routeReg = "";
        Object.keys(self.routes).forEach(function(r) {
            if (self.routes[r].routeUrl === url) {
                routeReg = self.routes[r].routeRegex;
                delete self.routes[r];
            }
        });
        $1c6312a031d4fa7a$export$2e2bcd8739ae039.remove(routeReg);
    });
    $1c6312a031d4fa7a$export$2e2bcd8739ae039.config({
        mode: "hash"
    });
    return this;
};
var $0195d6fb121e4577$export$7221d69dcfc8e36b = new $0195d6fb121e4577$var$HashRouterService();


