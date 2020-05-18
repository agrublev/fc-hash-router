const Routie = function (w, isModule) {

	let routes = [];
	let map = {};
	const reference = "routie";
	const oldReference = w[reference];

	const Route = function (path, name) {
		this.name = name;
		this.path = path;
		this.keys = [];
		this.fns = [];
		this.params = {};
		this.regex = pathToRegexp(this.path, this.keys, false, false);

	};

	Route.prototype.addHandler = function (fn) {
		this.fns.push(fn);
	};

	Route.prototype.removeHandler = function (fn) {
		let i = 0;
		const c = this.fns.length;
		for (; i < c; i++) {
			const f = this.fns[i];
			if (fn == f) {
				this.fns.splice(i, 1);
				return;
			}
		}
	};

	Route.prototype.run = function (params) {
		let i = 0;
		const c = this.fns.length;
		for (; i < c; i++) {
			this.fns[i].apply(this, params);
		}
	};

	Route.prototype.match = function (path, params) {
		const m = this.regex.exec(path);

		if (!m) return false;


		let i = 1;
		const len = m.length;
		for (; i < len; ++i) {
			const key = this.keys[i - 1];

			const val = ('string' == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];

			if (key) {
				this.params[key.name] = val;
			}
			params.push(val);
		}

		return true;
	};

	Route.prototype.toURL = function (params) {
		let path = this.path;
		for (let param in params) {
			path = path.replace('/:' + param, '/' + params[param]);
		}
		path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
		if (path.indexOf(':') != -1) {
			throw new Error('missing parameters for url: ' + path);
		}
		return path;
	};

	var pathToRegexp = function (path, keys, sensitive, strict) {
		if (path instanceof RegExp) return path;
		if (path instanceof Array) path = '(' + path.join('|') + ')';
		path = path
		.concat(strict ? '' : '/?')
		.replace(/\/\(/g, '(?:/')
		.replace(/\+/g, '__plus__')
		.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (_, slash, format, key, capture, optional) {
			keys.push({name: key, optional: !!optional});
			slash = slash || '';
			return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
		})
		.replace(/([\/.])/g, '\\$1')
		.replace(/__plus__/g, '(.+)')
		.replace(/\*/g, '(.*)');
		return new RegExp('^' + path + '$', sensitive ? '' : 'i');
	};

	const addHandler = function (path, fn) {
		const s = path.split(' ');
		const name = (s.length == 2) ? s[0] : null;
		path = (s.length == 2) ? s[1] : s[0];

		if (!map[path]) {
			map[path] = new Route(path, name);
			routes.push(map[path]);
		}
		map[path].addHandler(fn);
	};

	const routie = function (path, fn) {
		if (typeof fn == 'function') {
			addHandler(path, fn);
			routie.reload();
		} else if (typeof path == 'object') {
			for (let p in path) {
				addHandler(p, path[p]);
			}
			routie.reload();
		} else if (typeof fn === 'undefined') {
			routie.navigate(path);
		}
	};

	routie.lookup = function (name, obj) {
		let i = 0;
		const c = routes.length;
		for (; i < c; i++) {
			const route = routes[i];
			if (route.name == name) {
				return route.toURL(obj);
			}
		}
	};

	routie.remove = function (path, fn) {
		const route = map[path];
		if (!route)
			return;
		route.removeHandler(fn);
	};

	routie.removeAll = function () {
		map = {};
		routes = [];
	};

	routie.navigate = function (path, options) {
		options = options || {};
		const silent = options.silent || false;

		if (silent) {
			removeListener();
		}
		setTimeout(function () {
			window.location.hash = path;

			if (silent) {
				setTimeout(function () {
					addListener();
				}, 1);
			}

		}, 1);
	};

	routie.noConflict = function () {
		w[reference] = oldReference;
		return routie;
	};

	const getHash = function () {
		return window.location.hash.substring(1);
	};

	const checkRoute = function (hash, route) {
		const params = [];
		if (route.match(hash, params)) {
			route.run(params);
			return true;
		}
		return false;
	};

	const hashChanged = routie.reload = function () {
		const hash = getHash();
		let i = 0;
		const c = routes.length;
		for (; i < c; i++) {
			const route = routes[i];
			if (checkRoute(hash, route)) {
				return;
			}
		}
	};

	var addListener = function () {
		if (w.addEventListener) {
			w.addEventListener('hashchange', hashChanged, false);
		} else {
			w.attachEvent('onhashchange', hashChanged);
		}
	};

	var removeListener = function () {
		if (w.removeEventListener) {
			w.removeEventListener('hashchange', hashChanged);
		} else {
			w.detachEvent('onhashchange', hashChanged);
		}
	};
	addListener();

	if (isModule) {
		return routie;
	} else {
		w[reference] = routie;
	}

};

if (typeof module == 'undefined') {
	Routie(window);
} else {
	module.exports = Routie(window, true);
}