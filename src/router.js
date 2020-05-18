const Router = {
    routes: [],
    mode: null,
    root: "/",
    config: function (options) {
        this.mode =
            options && options.mode && options.mode == "history" && !!history.pushState
                ? "history"
                : "hash";
        this.root = options && options.root ? "/" + this.clearSlashes(options.root) + "/" : "/";
        return this;
    },
    getFragment: function () {
        let fragment = "";
        if (this.mode === "history") {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\\?(.*)$/, "");
            fragment = this.root != "/" ? fragment.replace(this.root, "") : fragment;
        } else {
            const match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : "";
        }
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
        this.mode = null;
        this.root = "/";
        return this;
    },
    check: function (f) {
        const fragment = f || this.getFragment();
        for (let i = 0; i < this.routes.length; i++) {
            const match = fragment.match(this.routes[i].re);
            if (match) {
                match.shift();
                const segs = [];
                for (let i in match) {
                    segs.push(match[i]);
                }

                this.routes[i].handler.apply({}, [this.routes[i].original, ...match]);
                return this;
            }
        }
        return this;
    },
    listen: function () {
        const self = this;
        let current = self.getFragment();
        const fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        };
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function (path) {
        path = path ? path : "";
        if (this.mode === "history") {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, "") + "#" + path;
        }
        return this;
    }
};

export default Router;
