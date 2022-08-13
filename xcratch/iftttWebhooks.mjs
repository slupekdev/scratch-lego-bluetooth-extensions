var global$1 = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};

// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;

if (typeof global$1.setTimeout === 'function') {
  cachedSetTimeout = setTimeout;
}

if (typeof global$1.clearTimeout === 'function') {
  cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

function nextTick(fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
} // v8 likes predictible objects

function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

var title = 'browser';
var platform = 'browser';
var browser$1 = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues

var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error('process.binding is not supported');
}
function cwd() {
  return '/';
}
function chdir(dir) {
  throw new Error('process.chdir is not supported');
}
function umask() {
  return 0;
} // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var performance = global$1.performance || {};

var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
}; // generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime


function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);

  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];

    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }

  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}
var process = {
  nextTick: nextTick,
  title: title,
  browser: browser$1,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var react = {exports: {}};

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */


var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

var emptyObject_1 = emptyObject;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */


var emptyFunction$2 = function emptyFunction() {};

emptyFunction$2.thatReturns = makeEmptyFunction;
emptyFunction$2.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction$2.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction$2.thatReturnsNull = makeEmptyFunction(null);

emptyFunction$2.thatReturnsThis = function () {
  return this;
};

emptyFunction$2.thatReturnsArgument = function (arg) {
  return arg;
};

var emptyFunction_1 = emptyFunction$2;

var m$1 = objectAssign,
    n$1 = emptyObject_1,
    p$1 = emptyFunction_1,
    q$1 = "function" === typeof Symbol && Symbol["for"],
    r$1 = q$1 ? Symbol["for"]("react.element") : 60103,
    t$1 = q$1 ? Symbol["for"]("react.call") : 60104,
    u = q$1 ? Symbol["for"]("react.return") : 60105,
    v$1 = q$1 ? Symbol["for"]("react.portal") : 60106,
    w$1 = q$1 ? Symbol["for"]("react.fragment") : 60107,
    x$1 = "function" === typeof Symbol && Symbol.iterator;

function y$1(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }

  b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");
  b.name = "Invariant Violation";
  b.framesToPop = 1;
  throw b;
}

var z$1 = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
};

function A(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

A.prototype.isReactComponent = {};

A.prototype.setState = function (a, b) {
  "object" !== _typeof$1(a) && "function" !== typeof a && null != a ? y$1("85") : void 0;
  this.updater.enqueueSetState(this, a, b, "setState");
};

A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function B(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

function C() {}

C.prototype = A.prototype;
var D = B.prototype = new C();
D.constructor = B;
m$1(D, A.prototype);
D.isPureReactComponent = !0;

function E(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = n$1;
  this.updater = e || z$1;
}

var F = E.prototype = new C();
F.constructor = E;
m$1(F, A.prototype);
F.unstable_isAsyncReactComponent = !0;

F.render = function () {
  return this.props.children;
};

var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;
  if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }
  var f = arguments.length - 2;
  if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }

    d.children = h;
  }
  if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }
  return {
    $$typeof: r$1,
    type: a,
    key: g,
    ref: k,
    props: d,
    _owner: G.current
  };
}

function K(a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === r$1;
}

function escape$1(a) {
  var b = {
    "\x3d": "\x3d0",
    ":": "\x3d2"
  };
  return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var L = /\/+/g,
    M = [];

function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();
    d.result = a;
    d.keyPrefix = b;
    d.func = e;
    d.context = c;
    d.count = 0;
    return d;
  }

  return {
    result: a,
    keyPrefix: b,
    func: e,
    context: c,
    count: 0
  };
}

function O(a) {
  a.result = null;
  a.keyPrefix = null;
  a.func = null;
  a.context = null;
  a.count = 0;
  10 > M.length && M.push(a);
}

function P(a, b, e, c) {
  var d = _typeof$1(a);

  if ("undefined" === d || "boolean" === d) a = null;
  var g = !1;
  if (null === a) g = !0;else switch (d) {
    case "string":
    case "number":
      g = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case r$1:
        case t$1:
        case u:
        case v$1:
          g = !0;
      }

  }
  if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;
  g = 0;
  b = "" === b ? "." : b + ":";
  if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];
    var f = b + Q(d, k);
    g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x$1 && a[x$1] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y$1("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));
  return g;
}

function Q(a, b) {
  return "object" === _typeof$1(a) && null !== a && null != a.key ? escape$1(a.key) : b.toString(36);
}

function R(a, b) {
  a.func.call(a.context, b, a.count++);
}

function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;
  a = a.func.call(a.context, b, a.count++);
  Array.isArray(a) ? T(a, c, e, p$1.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = {
    $$typeof: r$1,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  }), c.push(a));
}

function T(a, b, e, c, d) {
  var g = "";
  null != e && (g = ("" + e).replace(L, "$\x26/") + "/");
  b = N(b, g, c, d);
  null == a || P(a, "", S, b);
  O(b);
}

var U = {
  Children: {
    map: function map(a, b, e) {
      if (null == a) return a;
      var c = [];
      T(a, c, null, b, e);
      return c;
    },
    forEach: function forEach(a, b, e) {
      if (null == a) return a;
      b = N(null, null, b, e);
      null == a || P(a, "", R, b);
      O(b);
    },
    count: function count(a) {
      return null == a ? 0 : P(a, "", p$1.thatReturnsNull, null);
    },
    toArray: function toArray(a) {
      var b = [];
      T(a, b, null, p$1.thatReturnsArgument);
      return b;
    },
    only: function only(a) {
      K(a) ? void 0 : y$1("143");
      return a;
    }
  },
  Component: A,
  PureComponent: B,
  unstable_AsyncComponent: E,
  Fragment: w$1,
  createElement: J,
  cloneElement: function cloneElement(a, b, e) {
    var c = m$1({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;

    if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);
      void 0 !== b.key && (d = "" + b.key);
      if (a.type && a.type.defaultProps) var f = a.type.defaultProps;

      for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }

    var h = arguments.length - 2;
    if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);

      for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }

      c.children = f;
    }
    return {
      $$typeof: r$1,
      type: a.type,
      key: d,
      ref: g,
      props: c,
      _owner: k
    };
  },
  createFactory: function createFactory(a) {
    var b = J.bind(null, a);
    b.type = a;
    return b;
  },
  isValidElement: K,
  version: "16.2.0",
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: G,
    assign: m$1
  }
},
    V = Object.freeze({
  default: U
}),
    W = V && U || V;
var react_production_min = W["default"] ? W["default"] : W;

var react_development = {exports: {}};

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant$1(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
}

var invariant_1 = invariant$1;

var emptyFunction$1 = emptyFunction_1;
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction$1;

if (process.env.NODE_ENV !== 'production') {
  var printWarning$2 = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning$2.apply(undefined, [format].concat(args));
    }
  };
}

var warning_1 = warning;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

var printWarning$1 = function printWarning() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof$1(typeSpecs[typeSpecName]) + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + _typeof$1(error) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes$1.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

if (process.env.NODE_ENV !== "production") {
  (function () {

    var _assign = objectAssign;
    var emptyObject = emptyObject_1;
    var invariant = invariant_1;
    var warning = warning_1;
    var emptyFunction = emptyFunction_1;
    var checkPropTypes = checkPropTypes_1; // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.2.0'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }
    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */


    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });

        if (typeof console !== 'undefined') {
          console.warn(message);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }

        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }
    var lowPriorityWarning$1 = lowPriorityWarning;
    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;

        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }

        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }
    /**
     * This is the abstract API for an update queue.
     */


    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };
    /**
     * Base class helpers for the updating state of a component.
     */

    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};
    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */

    Component.prototype.setState = function (partialState, callback) {
      !(_typeof$1(partialState) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */


    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };
    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */


    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };

      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };

      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }
    /**
     * Base class helpers for the updating state of a component.
     */

    function PureComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    function ComponentDummy() {}

    ComponentDummy.prototype = Component.prototype;
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

    _assign(pureComponentPrototype, Component.prototype);

    pureComponentPrototype.isPureReactComponent = true;

    function AsyncComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
      // renderer.

      this.updater = updater || ReactNoopUpdateQueue;
    }

    var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = AsyncComponent; // Avoid an extra prototype jump for these methods.

    _assign(asyncComponentPrototype, Component.prototype);

    asyncComponentPrototype.unstable_isAsyncReactComponent = true;

    asyncComponentPrototype.render = function () {
      return this.props.children;
    };
    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */


    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */


    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */


    function createElement(type, config, children) {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }

            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */


    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    }
    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */


    function cloneElement(element, config, children) {
      var propName; // Original props are copied

      var props = _assign({}, element.props); // Reserved names are extracted


      var key = element.key;
      var ref = element.ref; // Self is preserved since the owner is preserved.

      var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.

      var source = element._source; // Owner will be preserved, unless ref is overridden

      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }

        if (hasValidKey(config)) {
          key = '' + config.key;
        } // Remaining properties override existing props


        var defaultProps;

        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }

        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      } // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.


      var childrenLength = arguments.length - 2;

      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);

        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }

        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */


    function isValidElement(object) {
      return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};
    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;

        if (impl) {
          return impl();
        }

        return null;
      };
    }
    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */

    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });
      return '$' + escapedString;
    }
    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */


    var didWarnAboutMaps = false;
    var userProvidedKeyEscapeRegex = /\/+/g;

    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];

    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;

      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }
    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = _typeof$1(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;

          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_CALL_TYPE:
              case REACT_RETURN_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }

        }
      }

      if (invokeCallback) {
        callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.

      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);

        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
              didWarnAboutMaps = true;
            }
          }
          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;

          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }
    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */


    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */


    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if (_typeof$1(component) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      } // Implicit key determined by the index in the set


      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;
      func.call(context, child, bookKeeping.count++);
    }
    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */


    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }

      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;
      var mappedChild = func.call(context, child, bookKeeping.count++);

      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }

        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';

      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }

      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }
    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */


    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }

      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }
    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */


    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }
    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */


    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }
    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */


    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'string') {
        return type;
      }

      if (typeof type === 'function') {
        return type.displayName || type.name;
      }

      return null;
    }
    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */


    {
      var currentlyValidatingElement = null;
      var propTypesMisspellWarningShown = false;

      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      var getStackAddendum = function getStackAddendum() {
        var stack = '';

        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }

        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };

      var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }

      return info;
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      if (_typeof$1(node) !== 'object') {
        return;
      }

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      var componentClass = element.type;

      if (typeof componentClass !== 'function') {
        return;
      }

      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;

      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }

      if (typeof componentClass.getDefaultProps === 'function') {
        warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!VALID_FRAGMENT_PROPS.has(key)) {
            warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = typeof type === 'string' || typeof type === 'function' || _typeof$1(type) === 'symbol' || typeof type === 'number'; // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || _typeof$1(type) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';
        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : _typeof$1(type), info);
      }

      var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if (_typeof$1(type) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type); // Legacy hook TODO: Warn if this is accessed

      validatedFactory.type = type;
      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);

      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }

      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },
      Component: Component,
      PureComponent: PureComponent,
      unstable_AsyncComponent: AsyncComponent,
      Fragment: REACT_FRAGMENT_TYPE,
      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,
      version: ReactVersion,
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };
    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }
    var React$2 = Object.freeze({
      default: React
    });
    var React$3 = React$2 && React || React$2; // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.

    var react = React$3['default'] ? React$3['default'] : React$3;
    react_development.exports = react;
  })();
}

if (process.env.NODE_ENV === 'production') {
  react.exports = react_production_min;
} else {
  react.exports = react_development.exports;
}

var React = react.exports;

var allLocaleData = {};

var intlMessageformat = {exports: {}};

var main$1 = {};

var core$1 = {};

var utils = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

utils.extend = extend;
var hop$1 = Object.prototype.hasOwnProperty;

function extend(obj) {
  var sources = Array.prototype.slice.call(arguments, 1),
      i,
      len,
      source,
      key;

  for (i = 0, len = sources.length; i < len; i += 1) {
    source = sources[i];

    if (!source) {
      continue;
    }

    for (key in source) {
      if (hop$1.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }

  return obj;
}

utils.hop = hop$1;

var es5$1 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

var src$utils$$ = utils; // Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp$1 = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty$1 = realDefineProp$1 ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};

var objCreate$1 = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (src$utils$$.hop.call(props, k)) {
      defineProperty$1(obj, k, props[k]);
    }
  }

  return obj;
};

es5$1.defineProperty = defineProperty$1, es5$1.objCreate = objCreate$1;

var compiler = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

(function (exports) {

  exports["default"] = Compiler;

  function Compiler(locales, formats, pluralFn) {
    this.locales = locales;
    this.formats = formats;
    this.pluralFn = pluralFn;
  }

  Compiler.prototype.compile = function (ast) {
    this.pluralStack = [];
    this.currentPlural = null;
    this.pluralNumberFormat = null;
    return this.compileMessage(ast);
  };

  Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern = [];
    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
      element = elements[i];

      switch (element.type) {
        case 'messageTextElement':
          pattern.push(this.compileMessageText(element));
          break;

        case 'argumentElement':
          pattern.push(this.compileArgument(element));
          break;

        default:
          throw new Error('Message element does not have a valid type');
      }
    }

    return pattern;
  };

  Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
      // Create a cache a NumberFormat instance that can be reused for any
      // PluralOffsetString instance in this message.
      if (!this.pluralNumberFormat) {
        this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
      }

      return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
    } // Unescape the escaped '#'s in the message text.


    return element.value.replace(/\\#/g, '#');
  };

  Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
      return new StringFormat(element.id);
    }

    var formats = this.formats,
        locales = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
      case 'numberFormat':
        options = formats.number[format.style];
        return {
          id: element.id,
          format: new Intl.NumberFormat(locales, options).format
        };

      case 'dateFormat':
        options = formats.date[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'timeFormat':
        options = formats.time[format.style];
        return {
          id: element.id,
          format: new Intl.DateTimeFormat(locales, options).format
        };

      case 'pluralFormat':
        options = this.compileOptions(element);
        return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);

      case 'selectFormat':
        options = this.compileOptions(element);
        return new SelectFormat(element.id, options);

      default:
        throw new Error('Message element does not have a valid format type');
    }
  };

  Compiler.prototype.compileOptions = function (element) {
    var format = element.format,
        options = format.options,
        optionsHash = {}; // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.

    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;
    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
      option = options[i]; // Compile the sub-pattern and save it under the options's selector.

      optionsHash[option.selector] = this.compileMessage(option.value);
    } // Pop the plural stack to put back the original current plural value.


    this.currentPlural = this.pluralStack.pop();
    return optionsHash;
  }; // -- Compiler Helper Classes --------------------------------------------------


  function StringFormat(id) {
    this.id = id;
  }

  StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
      return '';
    }

    return typeof value === 'string' ? value : String(value);
  };

  function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id = id;
    this.useOrdinal = useOrdinal;
    this.offset = offset;
    this.options = options;
    this.pluralFn = pluralFn;
  }

  PluralFormat.prototype.getOption = function (value) {
    var options = this.options;
    var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
    return option || options.other;
  };

  function PluralOffsetString(id, offset, numberFormat, string) {
    this.id = id;
    this.offset = offset;
    this.numberFormat = numberFormat;
    this.string = string;
  }

  PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);
    return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
  };

  function SelectFormat(id, options) {
    this.id = id;
    this.options = options;
  }

  SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
  };
})(compiler);

var intlMessageformatParser = {exports: {}};

var parser = {};

(function (exports) {

  exports["default"] = function () {
    /*
     * Generated by PEG.js 0.9.0.
     *
     * http://pegjs.org/
     */

    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }

      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }

    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";

      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }

    peg$subclass(peg$SyntaxError, Error);

    function peg$parse(input) {
      var options = arguments.length > 1 ? arguments[1] : {},
          peg$FAILED = {},
          peg$startRuleFunctions = {
        start: peg$parsestart
      },
          peg$startRuleFunction = peg$parsestart,
          peg$c0 = function peg$c0(elements) {
        return {
          type: 'messageFormatPattern',
          elements: elements,
          location: location()
        };
      },
          peg$c1 = function peg$c1(text) {
        var string = '',
            i,
            j,
            outerLen,
            inner,
            innerLen;

        for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
          inner = text[i];

          for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
            string += inner[j];
          }
        }

        return string;
      },
          peg$c2 = function peg$c2(messageText) {
        return {
          type: 'messageTextElement',
          value: messageText,
          location: location()
        };
      },
          peg$c3 = /^[^ \t\n\r,.+={}#]/,
          peg$c4 = {
        type: "class",
        value: "[^ \\t\\n\\r,.+={}#]",
        description: "[^ \\t\\n\\r,.+={}#]"
      },
          peg$c5 = "{",
          peg$c6 = {
        type: "literal",
        value: "{",
        description: "\"{\""
      },
          peg$c7 = ",",
          peg$c8 = {
        type: "literal",
        value: ",",
        description: "\",\""
      },
          peg$c9 = "}",
          peg$c10 = {
        type: "literal",
        value: "}",
        description: "\"}\""
      },
          peg$c11 = function peg$c11(id, format) {
        return {
          type: 'argumentElement',
          id: id,
          format: format && format[2],
          location: location()
        };
      },
          peg$c12 = "number",
          peg$c13 = {
        type: "literal",
        value: "number",
        description: "\"number\""
      },
          peg$c14 = "date",
          peg$c15 = {
        type: "literal",
        value: "date",
        description: "\"date\""
      },
          peg$c16 = "time",
          peg$c17 = {
        type: "literal",
        value: "time",
        description: "\"time\""
      },
          peg$c18 = function peg$c18(type, style) {
        return {
          type: type + 'Format',
          style: style && style[2],
          location: location()
        };
      },
          peg$c19 = "plural",
          peg$c20 = {
        type: "literal",
        value: "plural",
        description: "\"plural\""
      },
          peg$c21 = function peg$c21(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: false,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c22 = "selectordinal",
          peg$c23 = {
        type: "literal",
        value: "selectordinal",
        description: "\"selectordinal\""
      },
          peg$c24 = function peg$c24(pluralStyle) {
        return {
          type: pluralStyle.type,
          ordinal: true,
          offset: pluralStyle.offset || 0,
          options: pluralStyle.options,
          location: location()
        };
      },
          peg$c25 = "select",
          peg$c26 = {
        type: "literal",
        value: "select",
        description: "\"select\""
      },
          peg$c27 = function peg$c27(options) {
        return {
          type: 'selectFormat',
          options: options,
          location: location()
        };
      },
          peg$c28 = "=",
          peg$c29 = {
        type: "literal",
        value: "=",
        description: "\"=\""
      },
          peg$c30 = function peg$c30(selector, pattern) {
        return {
          type: 'optionalFormatPattern',
          selector: selector,
          value: pattern,
          location: location()
        };
      },
          peg$c31 = "offset:",
          peg$c32 = {
        type: "literal",
        value: "offset:",
        description: "\"offset:\""
      },
          peg$c33 = function peg$c33(number) {
        return number;
      },
          peg$c34 = function peg$c34(offset, options) {
        return {
          type: 'pluralFormat',
          offset: offset,
          options: options,
          location: location()
        };
      },
          peg$c35 = {
        type: "other",
        description: "whitespace"
      },
          peg$c36 = /^[ \t\n\r]/,
          peg$c37 = {
        type: "class",
        value: "[ \\t\\n\\r]",
        description: "[ \\t\\n\\r]"
      },
          peg$c38 = {
        type: "other",
        description: "optionalWhitespace"
      },
          peg$c39 = /^[0-9]/,
          peg$c40 = {
        type: "class",
        value: "[0-9]",
        description: "[0-9]"
      },
          peg$c41 = /^[0-9a-f]/i,
          peg$c42 = {
        type: "class",
        value: "[0-9a-f]i",
        description: "[0-9a-f]i"
      },
          peg$c43 = "0",
          peg$c44 = {
        type: "literal",
        value: "0",
        description: "\"0\""
      },
          peg$c45 = /^[1-9]/,
          peg$c46 = {
        type: "class",
        value: "[1-9]",
        description: "[1-9]"
      },
          peg$c47 = function peg$c47(digits) {
        return parseInt(digits, 10);
      },
          peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
          peg$c49 = {
        type: "class",
        value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
        description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
      },
          peg$c50 = "\\\\",
          peg$c51 = {
        type: "literal",
        value: "\\\\",
        description: "\"\\\\\\\\\""
      },
          peg$c52 = function peg$c52() {
        return '\\';
      },
          peg$c53 = "\\#",
          peg$c54 = {
        type: "literal",
        value: "\\#",
        description: "\"\\\\#\""
      },
          peg$c55 = function peg$c55() {
        return '\\#';
      },
          peg$c56 = "\\{",
          peg$c57 = {
        type: "literal",
        value: "\\{",
        description: "\"\\\\{\""
      },
          peg$c58 = function peg$c58() {
        return "{";
      },
          peg$c59 = "\\}",
          peg$c60 = {
        type: "literal",
        value: "\\}",
        description: "\"\\\\}\""
      },
          peg$c61 = function peg$c61() {
        return "}";
      },
          peg$c62 = "\\u",
          peg$c63 = {
        type: "literal",
        value: "\\u",
        description: "\"\\\\u\""
      },
          peg$c64 = function peg$c64(digits) {
        return String.fromCharCode(parseInt(digits, 16));
      },
          peg$c65 = function peg$c65(chars) {
        return chars.join('');
      },
          peg$currPos = 0,
          peg$savedPos = 0,
          peg$posDetailsCache = [{
        line: 1,
        column: 1,
        seenCR: false
      }],
          peg$maxFailPos = 0,
          peg$maxFailExpected = [],
          peg$silentFails = 0,
          peg$result;

      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }

        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }

      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }

      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
            p,
            ch;

        if (details) {
          return details;
        } else {
          p = pos - 1;

          while (!peg$posDetailsCache[p]) {
            p--;
          }

          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column,
            seenCR: details.seenCR
          };

          while (p < pos) {
            ch = input.charAt(p);

            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }

              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }

            p++;
          }

          peg$posDetailsCache[pos] = details;
          return details;
        }
      }

      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
            endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }

      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }

        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }

        peg$maxFailExpected.push(expected);
      }

      function peg$buildException(message, expected, found, location) {
        function cleanupExpected(expected) {
          var i = 1;
          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });

          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }

        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
              return '\\x0' + hex(ch);
            }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
              return '\\x' + hex(ch);
            }).replace(/[\u0100-\u0FFF]/g, function (ch) {
              return "\\u0" + hex(ch);
            }).replace(/[\u1000-\uFFFF]/g, function (ch) {
              return "\\u" + hex(ch);
            });
          }

          var expectedDescs = new Array(expected.length),
              expectedDesc,
              foundDesc,
              i;

          for (i = 0; i < expected.length; i++) {
            expectedDescs[i] = expected[i].description;
          }

          expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
          foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }

        if (expected !== null) {
          cleanupExpected(expected);
        }

        return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
      }

      function peg$parsestart() {
        var s0;
        s0 = peg$parsemessageFormatPattern();
        return s0;
      }

      function peg$parsemessageFormatPattern() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsemessageFormatElement();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsemessageFormatElement();
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsemessageFormatElement() {
        var s0;
        s0 = peg$parsemessageTextElement();

        if (s0 === peg$FAILED) {
          s0 = peg$parseargumentElement();
        }

        return s0;
      }

      function peg$parsemessageText() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parse_();

        if (s3 !== peg$FAILED) {
          s4 = peg$parsechars();

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              s4 = peg$parsechars();

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s3 = [s3, s4, s5];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1);
        }

        s0 = s1;

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsews();

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parsemessageTextElement() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsemessageText();

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c2(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parseargument() {
        var s0, s1, s2;
        s0 = peg$parsenumber();

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = [];

          if (peg$c3.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c4);
            }
          }

          if (s2 !== peg$FAILED) {
            while (s2 !== peg$FAILED) {
              s1.push(s2);

              if (peg$c3.test(input.charAt(peg$currPos))) {
                s2 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s2 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c4);
                }
              }
            }
          } else {
            s1 = peg$FAILED;
          }

          if (s1 !== peg$FAILED) {
            s0 = input.substring(s0, peg$currPos);
          } else {
            s0 = s1;
          }
        }

        return s0;
      }

      function peg$parseargumentElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parseargument();

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;

                if (input.charCodeAt(peg$currPos) === 44) {
                  s6 = peg$c7;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c8);
                  }
                }

                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();

                  if (s7 !== peg$FAILED) {
                    s8 = peg$parseelementFormat();

                    if (s8 !== peg$FAILED) {
                      s6 = [s6, s7, s8];
                      s5 = s6;
                    } else {
                      peg$currPos = s5;
                      s5 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }

                if (s5 === peg$FAILED) {
                  s5 = null;
                }

                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();

                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s7 = peg$c9;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }

                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c11(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseelementFormat() {
        var s0;
        s0 = peg$parsesimpleFormat();

        if (s0 === peg$FAILED) {
          s0 = peg$parsepluralFormat();

          if (s0 === peg$FAILED) {
            s0 = peg$parseselectOrdinalFormat();

            if (s0 === peg$FAILED) {
              s0 = peg$parseselectFormat();
            }
          }
        }

        return s0;
      }

      function peg$parsesimpleFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c12) {
          s1 = peg$c12;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }

        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c14) {
            s1 = peg$c14;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c15);
            }
          }

          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c16) {
              s1 = peg$c16;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;

            if (input.charCodeAt(peg$currPos) === 44) {
              s4 = peg$c7;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsechars();

                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }

            if (s3 === peg$FAILED) {
              s3 = null;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c18(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c19) {
          s1 = peg$c19;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c21(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectOrdinalFormat() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 13) === peg$c22) {
          s1 = peg$c22;
          peg$currPos += 13;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = peg$parsepluralStyle();

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c24(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselectFormat() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 6) === peg$c25) {
          s1 = peg$c25;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c26);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }

            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();

              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseoptionalFormatPattern();

                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parseoptionalFormatPattern();
                  }
                } else {
                  s5 = peg$FAILED;
                }

                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c27(s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseselector() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c28;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }

        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();

          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        if (s0 === peg$FAILED) {
          s0 = peg$parsechars();
        }

        return s0;
      }

      function peg$parseoptionalFormatPattern() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        s1 = peg$parse_();

        if (s1 !== peg$FAILED) {
          s2 = peg$parseselector();

          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();

            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c5;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c6);
                }
              }

              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();

                if (s5 !== peg$FAILED) {
                  s6 = peg$parsemessageFormatPattern();

                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();

                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 125) {
                        s8 = peg$c9;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;

                        if (peg$silentFails === 0) {
                          peg$fail(peg$c10);
                        }
                      }

                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c30(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parseoffset() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 7) === peg$c31) {
          s1 = peg$c31;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c32);
          }
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c33(s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsepluralStyle() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$parseoffset();

        if (s1 === peg$FAILED) {
          s1 = null;
        }

        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();

          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseoptionalFormatPattern();

            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseoptionalFormatPattern();
              }
            } else {
              s3 = peg$FAILED;
            }

            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c34(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }

        return s0;
      }

      function peg$parsews() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];

        if (peg$c36.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }

        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);

            if (peg$c36.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c37);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }

        return s0;
      }

      function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsews();

        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsews();
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }

        peg$silentFails--;

        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }

        return s0;
      }

      function peg$parsedigit() {
        var s0;

        if (peg$c39.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }

        return s0;
      }

      function peg$parsehexDigit() {
        var s0;

        if (peg$c41.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }

        return s0;
      }

      function peg$parsenumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;

        if (input.charCodeAt(peg$currPos) === 48) {
          s1 = peg$c43;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }

        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$currPos;

          if (peg$c45.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsedigit();

            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsedigit();
            }

            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }

          if (s2 !== peg$FAILED) {
            s1 = input.substring(s1, peg$currPos);
          } else {
            s1 = s2;
          }
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c47(s1);
        }

        s0 = s1;
        return s0;
      }

      function peg$parsechar() {
        var s0, s1, s2, s3, s4, s5, s6, s7;

        if (peg$c48.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c49);
          }
        }

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.substr(peg$currPos, 2) === peg$c50) {
            s1 = peg$c50;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c51);
            }
          }

          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c52();
          }

          s0 = s1;

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.substr(peg$currPos, 2) === peg$c53) {
              s1 = peg$c53;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c54);
              }
            }

            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c55();
            }

            s0 = s1;

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.substr(peg$currPos, 2) === peg$c56) {
                s1 = peg$c56;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }

              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c58();
              }

              s0 = s1;

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;

                if (input.substr(peg$currPos, 2) === peg$c59) {
                  s1 = peg$c59;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c60);
                  }
                }

                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c61();
                }

                s0 = s1;

                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;

                  if (input.substr(peg$currPos, 2) === peg$c62) {
                    s1 = peg$c62;
                    peg$currPos += 2;
                  } else {
                    s1 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c63);
                    }
                  }

                  if (s1 !== peg$FAILED) {
                    s2 = peg$currPos;
                    s3 = peg$currPos;
                    s4 = peg$parsehexDigit();

                    if (s4 !== peg$FAILED) {
                      s5 = peg$parsehexDigit();

                      if (s5 !== peg$FAILED) {
                        s6 = peg$parsehexDigit();

                        if (s6 !== peg$FAILED) {
                          s7 = peg$parsehexDigit();

                          if (s7 !== peg$FAILED) {
                            s4 = [s4, s5, s6, s7];
                            s3 = s4;
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }

                    if (s3 !== peg$FAILED) {
                      s2 = input.substring(s2, peg$currPos);
                    } else {
                      s2 = s3;
                    }

                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c64(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                }
              }
            }
          }
        }

        return s0;
      }

      function peg$parsechars() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsechar();

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsechar();
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c65(s1);
        }

        s0 = s1;
        return s0;
      }

      peg$result = peg$startRuleFunction();

      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({
            type: "end",
            description: "end of input"
          });
        }

        throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
      }
    }

    return {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }();
})(parser);

(function (module, exports) {

  exports = module.exports = parser['default'];
  exports['default'] = exports;
})(intlMessageformatParser, intlMessageformatParser.exports);

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

(function (exports) {

  var src$utils$$ = utils,
      src$es5$$ = es5$1,
      src$compiler$$ = compiler,
      intl$messageformat$parser$$ = intlMessageformatParser.exports;
  exports["default"] = MessageFormat; // -- MessageFormat --------------------------------------------------------

  function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
      throw new TypeError('A message must be provided as a String or AST.');
    } // Creates a new object with the specified `formats` merged with the default
    // formats.


    formats = this._mergeFormats(MessageFormat.formats, formats); // Defined first because it's used to build the format pattern.

    src$es5$$.defineProperty(this, '_locale', {
      value: this._resolveLocale(locales)
    }); // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.

    var pluralFn = this._findPluralRuleFunction(this._locale);

    var pattern = this._compilePattern(ast, locales, formats, pluralFn); // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.


    var messageFormat = this;

    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
        } else {
          throw e;
        }
      }
    };
  } // Default format options used as the prototype of the `formats` provided to the
  // constructor. These are used when constructing the internal Intl.NumberFormat
  // and Intl.DateTimeFormat instances.


  src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,
    value: {
      number: {
        'currency': {
          style: 'currency'
        },
        'percent': {
          style: 'percent'
        }
      },
      date: {
        'short': {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit'
        },
        'medium': {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        },
        'long': {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        },
        'full': {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }
      },
      time: {
        'short': {
          hour: 'numeric',
          minute: 'numeric'
        },
        'medium': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        },
        'long': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        },
        'full': {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        }
      }
    }
  }); // Define internal private properties for dealing with locale data.

  src$es5$$.defineProperty(MessageFormat, '__localeData__', {
    value: src$es5$$.objCreate(null)
  });
  src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {
    value: function value(data) {
      if (!(data && data.locale)) {
        throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
      }

      MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
    }
  }); // Defines `__parse()` static method as an exposed private.

  src$es5$$.defineProperty(MessageFormat, '__parse', {
    value: intl$messageformat$parser$$["default"].parse
  }); // Define public `defaultLocale` property which defaults to English, but can be
  // set by the developer.

  src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable: true,
    value: undefined
  });

  MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
      locale: this._locale
    };
  };

  MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
  };

  MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.

    while (data) {
      if (data.pluralRuleFunction) {
        return data.pluralRuleFunction;
      }

      data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
  };

  MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i,
        len,
        part,
        id,
        value,
        err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
      part = pattern[i]; // Exist early for string parts.

      if (typeof part === 'string') {
        result += part;
        continue;
      }

      id = part.id; // Enforce that all required values are provided by the caller.

      if (!(values && src$utils$$.hop.call(values, id))) {
        err = new Error('A value must be provided for: ' + id);
        err.variableId = id;
        throw err;
      }

      value = values[id]; // Recursively format plural and select parts' option — which can be a
      // nested pattern structure. The choosing of the option to use is
      // abstracted-by and delegated-to the part helper object.

      if (part.options) {
        result += this._format(part.getOption(value), values);
      } else {
        result += part.format(value);
      }
    }

    return result;
  };

  MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type,
        mergedType;

    for (type in defaults) {
      if (!src$utils$$.hop.call(defaults, type)) {
        continue;
      }

      mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

      if (formats && src$utils$$.hop.call(formats, type)) {
        src$utils$$.extend(mergedType, formats[type]);
      }
    }

    return mergedFormats;
  };

  MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
      locales = [locales];
    } // Create a copy of the array so we can push on the default locale.


    locales = (locales || []).concat(MessageFormat.defaultLocale);
    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.

    for (i = 0, len = locales.length; i < len; i += 1) {
      localeParts = locales[i].toLowerCase().split('-');

      while (localeParts.length) {
        data = localeData[localeParts.join('-')];

        if (data) {
          // Return the normalized locale string; e.g., we return "en-US",
          // instead of "en-us".
          return data.locale;
        }

        localeParts.pop();
      }
    }

    var defaultLocale = locales.pop();
    throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
  };
})(core$1);

var en$1 = {};

(function (exports) {

  exports["default"] = {
    "locale": "en",
    "pluralRuleFunction": function pluralRuleFunction(n, ord) {
      var s = String(n).split("."),
          v0 = !s[1],
          t0 = Number(s[0]) == n,
          n10 = t0 && s[0].slice(-1),
          n100 = t0 && s[0].slice(-2);
      if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
      return n == 1 && v0 ? "one" : "other";
    }
  };
})(en$1);

/* jslint esnext: true */

(function (exports) {

  var src$core$$ = core$1,
      src$en$$ = en$1;

  src$core$$["default"].__addLocaleData(src$en$$["default"]);

  src$core$$["default"].defaultLocale = 'en';
  exports["default"] = src$core$$["default"];
})(main$1);

/* jshint node:true */

(function (module, exports) {

  var IntlMessageFormat = main$1['default']; // Add all locale data to `IntlMessageFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlMessageFormat;
  exports['default'] = exports;
})(intlMessageformat, intlMessageformat.exports);

var IntlMessageFormat = intlMessageformat.exports;

var intlRelativeformat = {exports: {}};

var main = {};

var core = {};

var diff = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(diff, "__esModule", {
  value: true
});
/* jslint esnext: true */

var round = Math.round;

function daysToYears(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  return days * 400 / 146097;
} // Thanks to date-fns
// https://github.com/date-fns/date-fns
// MIT © Sasha Koss


var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;

function startOfDay(dirtyDate) {
  var date = new Date(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE; // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

function default_1(from, to) {
  // Convert to ms timestamps.
  from = +from;
  to = +to;
  var millisecond = round(to - from),
      second = round(millisecond / 1000),
      minute = round(second / 60),
      hour = round(minute / 60); // We expect a more precision in rounding when dealing with
  // days as it feels wrong when something happended 13 hours ago and
  // is regarded as "yesterday" even if the time was this morning.

  var day = differenceInCalendarDays(to, from);
  var week = round(day / 7);
  var rawYears = daysToYears(day),
      month = round(rawYears * 12),
      year = round(rawYears);
  return {
    millisecond: millisecond,
    second: second,
    'second-short': second,
    minute: minute,
    'minute-short': minute,
    hour: hour,
    'hour-short': hour,
    day: day,
    'day-short': day,
    week: week,
    'week-short': week,
    month: month,
    'month-short': month,
    year: year,
    'year-short': year
  };
}

diff.default = default_1;

var es5 = {};

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(es5, "__esModule", {
  value: true
});
/* jslint esnext: true */
// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var realDefineProp = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();
var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};
es5.defineProperty = defineProperty;

var objCreate = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (hop.call(props, k)) {
      defineProperty(obj, k, props[k]);
    }
  }

  return obj;
};

es5.objCreate = objCreate;

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
  /*jshint validthis:true */
  var arr = this;

  if (!arr.length) {
    return -1;
  }

  for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
    if (arr[i] === search) {
      return i;
    }
  }

  return -1;
};

es5.arrIndexOf = arrIndexOf;

var isArray = Array.isArray || function (obj) {
  return toString.call(obj) === '[object Array]';
};

es5.isArray = isArray;

var dateNow = Date.now || function () {
  return new Date().getTime();
};

es5.dateNow = dateNow;

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/


Object.defineProperty(core, "__esModule", {
  value: true
});
/* jslint esnext: true */

var intl_messageformat_1 = intlMessageformat.exports;
var diff_1 = diff;
var es5_1 = es5;

core.default = RelativeFormat; // -----------------------------------------------------------------------------


var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
var STYLES = ['best fit', 'numeric']; // -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
  options = options || {}; // Make a copy of `locales` if it's an array, so that it doesn't change
  // since it's used lazily.

  if (es5_1.isArray(locales)) {
    locales = locales.concat();
  }

  es5_1.defineProperty(this, '_locale', {
    value: this._resolveLocale(locales)
  });
  es5_1.defineProperty(this, '_options', {
    value: {
      style: this._resolveStyle(options.style),
      units: this._isValidUnits(options.units) && options.units
    }
  });
  es5_1.defineProperty(this, '_locales', {
    value: locales
  });
  es5_1.defineProperty(this, '_fields', {
    value: this._findFields(this._locale)
  });
  es5_1.defineProperty(this, '_messages', {
    value: es5_1.objCreate(null)
  }); // "Bind" `format()` method to `this` so it can be passed by reference like
  // the other `Intl` APIs.

  var relativeFormat = this;

  this.format = function format(date, options) {
    return relativeFormat._format(date, options);
  };
} // Define internal private properties for dealing with locale data.


es5_1.defineProperty(RelativeFormat, '__localeData__', {
  value: es5_1.objCreate(null)
});
es5_1.defineProperty(RelativeFormat, '__addLocaleData', {
  value: function value() {
    for (var i = 0; i < arguments.length; i++) {
      var datum = arguments[i];

      if (!(datum && datum.locale)) {
        throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
      }

      RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum; // Add data to IntlMessageFormat.

      intl_messageformat_1.default.__addLocaleData(datum);
    }
  }
}); // Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.

es5_1.defineProperty(RelativeFormat, 'defaultLocale', {
  enumerable: true,
  writable: true,
  value: undefined
}); // Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.

es5_1.defineProperty(RelativeFormat, 'thresholds', {
  enumerable: true,
  value: {
    second: 45,
    'second-short': 45,
    minute: 45,
    'minute-short': 45,
    hour: 22,
    'hour-short': 22,
    day: 26,
    'day-short': 26,
    month: 11,
    'month-short': 11 // months to year

  }
});

RelativeFormat.prototype.resolvedOptions = function () {
  return {
    locale: this._locale,
    style: this._options.style,
    units: this._options.units
  };
};

RelativeFormat.prototype._compileMessage = function (units) {
  // `this._locales` is the original set of locales the user specified to the
  // constructor, while `this._locale` is the resolved root locale.
  var locales = this._locales;
  this._locale;
  var field = this._fields[units];
  var relativeTime = field.relativeTime;
  var future = '';
  var past = '';
  var i;

  for (i in relativeTime.future) {
    if (relativeTime.future.hasOwnProperty(i)) {
      future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
    }
  }

  for (i in relativeTime.past) {
    if (relativeTime.past.hasOwnProperty(i)) {
      past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
    }
  }

  var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}'; // Create the synthetic IntlMessageFormat instance using the original
  // locales value specified by the user when constructing the the parent
  // IntlRelativeFormat instance.

  return new intl_messageformat_1.default(message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
  var messages = this._messages; // Create a new synthetic message based on the locale data from CLDR.

  if (!messages[units]) {
    messages[units] = this._compileMessage(units);
  }

  return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
  var field = this._fields[units];

  if (field.relative) {
    return field.relative[diff];
  }
};

RelativeFormat.prototype._findFields = function (locale) {
  var localeData = RelativeFormat.__localeData__;
  var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
  // hierarchy until we find `fields` to return.

  while (data) {
    if (data.fields) {
      return data.fields;
    }

    data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
  }

  throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
};

RelativeFormat.prototype._format = function (date, options) {
  var now = options && options.now !== undefined ? options.now : es5_1.dateNow();

  if (date === undefined) {
    date = now;
  } // Determine if the `date` and optional `now` values are valid, and throw a
  // similar error to what `Intl.DateTimeFormat#format()` would throw.


  if (!isFinite(now)) {
    throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  if (!isFinite(date)) {
    throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  var diffReport = diff_1.default(now, date);

  var units = this._options.units || this._selectUnits(diffReport);

  var diffInUnits = diffReport[units];

  if (this._options.style !== 'numeric') {
    var relativeUnits = this._getRelativeUnits(diffInUnits, units);

    if (relativeUnits) {
      return relativeUnits;
    }
  }

  return this._getMessage(units).format({
    '0': Math.abs(diffInUnits),
    when: diffInUnits < 0 ? 'past' : 'future'
  });
};

RelativeFormat.prototype._isValidUnits = function (units) {
  if (!units || es5_1.arrIndexOf.call(FIELDS, units) >= 0) {
    return true;
  }

  if (typeof units === 'string') {
    var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);

    if (suggestion && es5_1.arrIndexOf.call(FIELDS, suggestion) >= 0) {
      throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
    }
  }

  throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
};

RelativeFormat.prototype._resolveLocale = function (locales) {
  if (typeof locales === 'string') {
    locales = [locales];
  } // Create a copy of the array so we can push on the default locale.


  locales = (locales || []).concat(RelativeFormat.defaultLocale);
  var localeData = RelativeFormat.__localeData__;
  var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
  // which that has been registered. When data does not exist for a locale, we
  // traverse its ancestors to find something that's been registered within
  // its hierarchy of locales. Since we lack the proper `parentLocale` data
  // here, we must take a naive approach to traversal.

  for (i = 0, len = locales.length; i < len; i += 1) {
    localeParts = locales[i].toLowerCase().split('-');

    while (localeParts.length) {
      data = localeData[localeParts.join('-')];

      if (data) {
        // Return the normalized locale string; e.g., we return "en-US",
        // instead of "en-us".
        return data.locale;
      }

      localeParts.pop();
    }
  }

  var defaultLocale = locales.pop();
  throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
};

RelativeFormat.prototype._resolveStyle = function (style) {
  // Default to "best fit" style.
  if (!style) {
    return STYLES[0];
  }

  if (es5_1.arrIndexOf.call(STYLES, style) >= 0) {
    return style;
  }

  throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
  var i, l, units;
  var fields = FIELDS.filter(function (field) {
    return field.indexOf('-short') < 1;
  });

  for (i = 0, l = fields.length; i < l; i += 1) {
    units = fields[i];

    if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
      break;
    }
  }

  return units;
};

var en = {};

Object.defineProperty(en, "__esModule", {
  value: true
});
/* @generated */

en.default = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split('.'),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
    return n == 1 && v0 ? 'one' : 'other';
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "week": {
      "displayName": "week",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this week",
        "1": "next week",
        "-1": "last week"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} week",
          "other": "in {0} weeks"
        },
        "past": {
          "one": "{0} week ago",
          "other": "{0} weeks ago"
        }
      }
    },
    "week-short": {
      "displayName": "wk.",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this wk.",
        "1": "next wk.",
        "-1": "last wk."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} wk.",
          "other": "in {0} wk."
        },
        "past": {
          "one": "{0} wk. ago",
          "other": "{0} wk. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};

/* jslint esnext: true */


Object.defineProperty(main, "__esModule", {
  value: true
});
var core_1 = core;
var en_1 = en;

core_1.default.__addLocaleData(en_1.default);

core_1.default.defaultLocale = 'en';

main.default = core_1.default;

/* jshint node:true */

(function (module, exports) {

  var IntlRelativeFormat = main['default']; // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
  // bundling for the browser with Browserify/Webpack.
  // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
  // locale data registered, and with English set as the default locale. Define
  // the `default` prop for use with other compiled ES6 Modules.

  exports = module.exports = IntlRelativeFormat;
  exports['default'] = exports;
})(intlRelativeformat, intlRelativeformat.exports);

var IntlRelativeFormat = intlRelativeformat.exports;

var propTypes = {exports: {}};

var reactIs = {exports: {}};

var reactIs_production_min = {};

Object.defineProperty(reactIs_production_min, "__esModule", {
  value: !0
});
var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f$1 = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.fundamental") : 60117,
    w = b ? Symbol.for("react.responder") : 60118,
    x = b ? Symbol.for("react.scope") : 60119;

function y(a) {
  if ("object" === _typeof$1(a) && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f$1:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case h:
                return a;

              default:
                return u;
            }

        }

      case t:
      case r:
      case d:
        return u;
    }
  }
}

function z(a) {
  return y(a) === m;
}

reactIs_production_min.typeOf = y;
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f$1;
reactIs_production_min.Suspense = p;

reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f$1 || a === p || a === q || "object" === _typeof$1(a) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === v || a.$$typeof === w || a.$$typeof === x);
};

reactIs_production_min.isAsyncMode = function (a) {
  return z(a) || y(a) === l;
};

reactIs_production_min.isConcurrentMode = z;

reactIs_production_min.isContextConsumer = function (a) {
  return y(a) === k;
};

reactIs_production_min.isContextProvider = function (a) {
  return y(a) === h;
};

reactIs_production_min.isElement = function (a) {
  return "object" === _typeof$1(a) && null !== a && a.$$typeof === c;
};

reactIs_production_min.isForwardRef = function (a) {
  return y(a) === n;
};

reactIs_production_min.isFragment = function (a) {
  return y(a) === e;
};

reactIs_production_min.isLazy = function (a) {
  return y(a) === t;
};

reactIs_production_min.isMemo = function (a) {
  return y(a) === r;
};

reactIs_production_min.isPortal = function (a) {
  return y(a) === d;
};

reactIs_production_min.isProfiler = function (a) {
  return y(a) === g;
};

reactIs_production_min.isStrictMode = function (a) {
  return y(a) === f$1;
};

reactIs_production_min.isSuspense = function (a) {
  return y(a) === p;
};

var reactIs_development = {};

(function (exports) {

  if (process.env.NODE_ENV !== "production") {
    (function () {

      Object.defineProperty(exports, '__esModule', {
        value: true
      }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

      function isValidElementType(type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || _typeof$1(type) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
      }
      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */


      var lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack() {};

      {
        var printWarning = function printWarning(format) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarningWithoutStack = function lowPriorityWarningWithoutStack(condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(void 0, [format].concat(args));
          }
        };
      }
      var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

      function typeOf(object) {
        if (_typeof$1(object) === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_LAZY_TYPE:
            case REACT_MEMO_TYPE:
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }

      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }

      function isElement(object) {
        return _typeof$1(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }

      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }

      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }

      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }

      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }

      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }

      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }

      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }

      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.typeOf = typeOf;
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isValidElementType = isValidElementType;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
    })();
  }
})(reactIs_development);

if (process.env.NODE_ENV === 'production') {
  reactIs.exports = reactIs_production_min;
} else {
  reactIs.exports = reactIs_development;
}

var ReactIs$2 = reactIs.exports;
var assign = objectAssign;
var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
var checkPropTypes = checkPropTypes_1;
var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function printWarning() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function printWarning(text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!ReactIs$2.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (_typeof$1(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = _typeof$1(propValue);

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function factoryWithThrowingShims() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

if (process.env.NODE_ENV !== 'production') {
  var ReactIs$1 = reactIs.exports; // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod

  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs$1.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var PropTypes = propTypes.exports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var ReactIs = reactIs.exports;
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */


var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

var browser = invariant;

function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && _typeof$1(input) === 'object' ? orderedProps(input) : input;
  }));
}

function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;

    return _a = {}, _a[k] = obj[k], _a;
  });
}

var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }

  return function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];

    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();

      if (cacheId) {
        cache[cacheId] = format;
      }
    }

    return format;
  };
};

var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      IntlMessageFormat.__addLocaleData(localeData);

      IntlRelativeFormat.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(IntlMessageFormat.__localeData__[normalizedLocale] && IntlRelativeFormat.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && _typeof$1(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof$1(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof$1(obj);
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof$1(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof$1(call) === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var bool = PropTypes.bool;
var number = PropTypes.number;
var string = PropTypes.string;
var func = PropTypes.func;
var object = PropTypes.object;
var oneOf = PropTypes.oneOf;
var shape = PropTypes.shape;
var any = PropTypes.any;
var oneOfType = PropTypes.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};
/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  browser(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

function createError(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}

function defaultErrorHandler(error) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error);
  }
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// This is a "hack" until a proper `intl-pluralformat` package is created.


function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return IntlMessageFormat.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return IntlMessageFormat.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = IntlRelativeFormat.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}

function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];

  if (format) {
    return format;
  }

  onError(createError('No ' + type + ' format named: ' + name));
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting date.', e));
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting time.', e));
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1); // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.

  var oldThresholds = _extends({}, IntlRelativeFormat.thresholds);

  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting number.', e));
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting plural.', e));
  }

  return 'other';
}

function formatMessage$2(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage; // Produce a better error if the user calls `intl.formatMessage(element)`

  if (process.env.NODE_ENV !== 'production') {
    browser(! /*#__PURE__*/react.exports.isValidElement(config), '[React Intl] Don\'t pass React elements to ' + 'formatMessage(), pass `.props`.');
  } // `id` is a required field of a Message Descriptor.


  browser(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0; // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.

  if (!hasValues && process.env.NODE_ENV === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting the default message for: "' + id + '"', e));
    }
  }

  if (!formattedMessage) {
    onError(createError('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}; // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.

  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});
  return formatMessage$2(config, state, messageDescriptor, escapedValues);
}

var format = Object.freeze({
  formatDate: formatDate,
  formatTime: formatTime,
  formatRelative: formatRelative,
  formatNumber: formatNumber,
  formatPlural: formatPlural,
  formatMessage: formatMessage$2,
  formatHTMLMessage: formatHTMLMessage
});
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes); // These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.

var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};

var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    browser(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl; // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;

    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    } // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.


    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: memoizeFormatConstructor(Intl.DateTimeFormat),
      getNumberFormat: memoizeFormatConstructor(Intl.NumberFormat),
      getMessageFormat: memoizeFormatConstructor(IntlMessageFormat),
      getRelativeFormat: memoizeFormatConstructor(IntlRelativeFormat),
      getPluralFormat: memoizeFormatConstructor(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl; // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext); // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.

      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats,
            onError = _config.onError;
        onError(createError('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'))); // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.

        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig(); // Bind intl factories and current config to the format functions.

      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react.exports.Children.only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react.exports.Component);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
process.env.NODE_ENV !== "production" ? IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: PropTypes.element.isRequired,
  initialNow: PropTypes.any
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(react.exports.Component);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(react.exports.Component);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24; // The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout

var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  } // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.


  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;

    case 'minute':
      return MINUTE;

    case 'hour':
      return HOUR;

    case 'day':
      return DAY;

    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now(); // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.

    _this.state = {
      now: now
    };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this; // Cancel and pending update because we're scheduling a new update.


      clearTimeout(this._timer);
      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;
      var time = new Date(value).getTime(); // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.

      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay); // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.

      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value; // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.

      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(react.exports.Component);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
process.env.NODE_ENV !== "production" ? FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  updateInterval: PropTypes.number,
  initialNow: PropTypes.any,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(react.exports.Component);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
process.env.NODE_ENV !== "production" ? FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: PropTypes.any.isRequired,
  format: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return /*#__PURE__*/React.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(react.exports.Component);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
process.env.NODE_ENV !== "production" ? FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: PropTypes.any.isRequired,
  other: PropTypes.node.isRequired,
  zero: PropTypes.node,
  one: PropTypes.node,
  two: PropTypes.node,
  few: PropTypes.node,
  many: PropTypes.node,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback.');
  }

  return formatMessage$2({}, {
    getMessageFormat: memoizeFormatConstructor(IntlMessageFormat)
  }, descriptor, values);
};

var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }

    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
          _ref$formatMessage = _ref.formatMessage,
          formatMessage$$1 = _ref$formatMessage === undefined ? defaultFormatMessage : _ref$formatMessage,
          _ref$textComponent = _ref.textComponent,
          Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;

      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;

      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }(); // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.


        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {}; // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.

        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if ( /*#__PURE__*/react.exports.isValidElement(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;

      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      } // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.


      return react.exports.createElement.apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react.exports.Component);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      } // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.


      var html = {
        __html: formattedHTMLMessage
      };
      return /*#__PURE__*/React.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(react.exports.Component);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
process.env.NODE_ENV !== "production" ? FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: PropTypes.object,
  tagName: PropTypes.string,
  children: PropTypes.func
}) : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(allLocaleData);

var img$1 = "data:image/png;base64,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";

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QEGCSEK8c2RjwAAAvdJREFUeNrtm91qE0EYhp/ZRgr+HXkPngpdegU58AY89VgQav2pNqnHFRFExcS0xQMR78GD4AVI9wK8jsYYk2zGg86UYUkPdsxudna/F0pKIMzy8H77zje7H4hEIpFIJBKJRCKRSNQsqbw/0G0AIvNXqFINmz/OP0vSPO8PWp4L3QfeAlcBXRMjTYBbeSHmBqiGoNt8A24CrwzExsqrDNWQGdAD9oFRTVjo0gDqNqghKTAwEKfiwJxl7DhxADwDZgLQ34k9YAcYC8D8gYIasgA+Ax3gTAD6l/NH4GWTnLiyzbDjxE/A06bcE1cGMOPEYwNxIgD9ndgz6TwSgH5OXAAnwAHwWwD6wZyaYOnUtZwLBeiU8wDYrWOwFO1AC9ENlrEA9Lgnmma9b3rn2my2W2UtZECmus3AfPUG2BQH5gdpO5Y94I8A9AsWDRwBTwj8KGwdDrQQpyZY9kLebEfrWNQJFtuxdEOF2Frn4plgWQDvgQ1xoF+w9IFHoe0To6pciAmWY+B5SOlcGYBOx2IfVI20APQKFvuMpaNU9cu5VbULugiWuxzNp2itog8qiqKyXoDQaRo2wIty/s7sy+69/p3Dr6ho4zWoa2WsnWznQ6KqXiLbv/SVdMQDNIfA9QKXmgA3kljlejcmqjrAn7fVDE2f85PtyqVz5QFmgqVyBxCtEOglsQJIt071ifnqXVWuPRQHsnWqSWI1NR3L46r0zsEATGJlIdqjsEocQAQD0CllkljZ3rnLmh9UBQXwkmDZWWewBAswiRVJrOxbYS+AvwLQL1jcZyxnAvD/guWAks8TgwaYCRa7xdk390cB6AHTBsvDsoKlVgBNObvBMhaAfuU8d8p5JAD9nFjKHEstAWY6lkLnWGoJcIkTC5tjqTVAZ59Y2BxLrQEuKeeVz7HUHuCSLc5K51gaAzDjxJXNsTQG4BInrmSOpXEAHSdm51iUAMwP086xdH3LudEAnXK2cywLRPkh2k/7v0gkEolEIpFIJBKJRKLL9Q/X+iaJwNEwvgAAAABJRU5ErkJggg==";

var entry = {
  name: 'IFTTT Webhooks',
  extensionId: 'iftttWebhooks',
  collaborator: 'SlupekDev',
  iconURL: img$1,
  insetIconURL: img,
  description: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Using the IFTTT webhooks in Scratch3.",
    description: "Using the IFTTT webhooks in Scratch3.",
    id: "gui.extension.iftttWebhooks.description"
  }),
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: true
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/**
 * Block argument types
 * @enum {string}
 */
var ArgumentType$1 = {
  /**
   * Numeric value with angle picker
   */
  ANGLE: 'angle',

  /**
   * Boolean value with hexagonal placeholder
   */
  BOOLEAN: 'Boolean',

  /**
   * Numeric value with color picker
   */
  COLOR: 'color',

  /**
   * Numeric value with text field
   */
  NUMBER: 'number',

  /**
   * String value with text field
   */
  STRING: 'string',

  /**
   * String value with matrix field
   */
  MATRIX: 'matrix',

  /**
   * MIDI note number with note picker (piano) field
   */
  NOTE: 'note',

  /**
   * Inline image on block (as part of the label)
   */
  IMAGE: 'image'
};
var argumentType = ArgumentType$1;

/**
 * Types of block
 * @enum {string}
 */
var BlockType$1 = {
  /**
   * Boolean reporter with hexagonal shape
   */
  BOOLEAN: 'Boolean',

  /**
   * A button (not an actual block) for some special action, like making a variable
   */
  BUTTON: 'button',

  /**
   * Command block
   */
  COMMAND: 'command',

  /**
   * Specialized command block which may or may not run a child branch
   * The thread continues with the next block whether or not a child branch ran.
   */
  CONDITIONAL: 'conditional',

  /**
   * Specialized hat block with no implementation function
   * This stack only runs if the corresponding event is emitted by other code.
   */
  EVENT: 'event',

  /**
   * Hat block which conditionally starts a block stack
   */
  HAT: 'hat',

  /**
   * Specialized command block which may or may not run a child branch
   * If a child branch runs, the thread evaluates the loop block again.
   */
  LOOP: 'loop',

  /**
   * General reporter with numeric or string value
   */
  REPORTER: 'reporter'
};
var blockType = BlockType$1;

var Color$1 = /*#__PURE__*/function () {
  function Color() {
    _classCallCheck(this, Color);
  }

  _createClass(Color, null, [{
    key: "RGB_BLACK",
    get:
    /**
     * @typedef {object} RGBObject - An object representing a color in RGB format.
     * @property {number} r - the red component, in the range [0, 255].
     * @property {number} g - the green component, in the range [0, 255].
     * @property {number} b - the blue component, in the range [0, 255].
     */

    /**
     * @typedef {object} HSVObject - An object representing a color in HSV format.
     * @property {number} h - hue, in the range [0-359).
     * @property {number} s - saturation, in the range [0,1].
     * @property {number} v - value, in the range [0,1].
     */

    /** @type {RGBObject} */
    function get() {
      return {
        r: 0,
        g: 0,
        b: 0
      };
    }
    /** @type {RGBObject} */

  }, {
    key: "RGB_WHITE",
    get: function get() {
      return {
        r: 255,
        g: 255,
        b: 255
      };
    }
    /**
     * Convert a Scratch decimal color to a hex string, #RRGGBB.
     * @param {number} decimal RGB color as a decimal.
     * @return {string} RGB color as #RRGGBB hex string.
     */

  }, {
    key: "decimalToHex",
    value: function decimalToHex(decimal) {
      if (decimal < 0) {
        decimal += 0xFFFFFF + 1;
      }

      var hex = Number(decimal).toString(16);
      hex = "#".concat('000000'.substr(0, 6 - hex.length)).concat(hex);
      return hex;
    }
    /**
     * Convert a Scratch decimal color to an RGB color object.
     * @param {number} decimal RGB color as decimal.
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */

  }, {
    key: "decimalToRgb",
    value: function decimalToRgb(decimal) {
      var a = decimal >> 24 & 0xFF;
      var r = decimal >> 16 & 0xFF;
      var g = decimal >> 8 & 0xFF;
      var b = decimal & 0xFF;
      return {
        r: r,
        g: g,
        b: b,
        a: a > 0 ? a : 255
      };
    }
    /**
     * Convert a hex color (e.g., F00, #03F, #0033FF) to an RGB color object.
     * CC-BY-SA Tim Down:
     * https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {!string} hex Hex representation of the color.
     * @return {RGBObject} null on failure, or rgb: {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */

  }, {
    key: "hexToRgb",
    value: function hexToRgb(hex) {
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    /**
     * Convert an RGB color object to a hex color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!string} Hex representation of the color.
     */

  }, {
    key: "rgbToHex",
    value: function rgbToHex(rgb) {
      return Color.decimalToHex(Color.rgbToDecimal(rgb));
    }
    /**
     * Convert an RGB color object to a Scratch decimal color.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {!number} Number representing the color.
     */

  }, {
    key: "rgbToDecimal",
    value: function rgbToDecimal(rgb) {
      return (rgb.r << 16) + (rgb.g << 8) + rgb.b;
    }
    /**
    * Convert a hex color (e.g., F00, #03F, #0033FF) to a decimal color number.
    * @param {!string} hex Hex representation of the color.
    * @return {!number} Number representing the color.
    */

  }, {
    key: "hexToDecimal",
    value: function hexToDecimal(hex) {
      return Color.rgbToDecimal(Color.hexToRgb(hex));
    }
    /**
     * Convert an HSV color to RGB format.
     * @param {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     * @return {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     */

  }, {
    key: "hsvToRgb",
    value: function hsvToRgb(hsv) {
      var h = hsv.h % 360;
      if (h < 0) h += 360;
      var s = Math.max(0, Math.min(hsv.s, 1));
      var v = Math.max(0, Math.min(hsv.v, 1));
      var i = Math.floor(h / 60);
      var f = h / 60 - i;
      var p = v * (1 - s);
      var q = v * (1 - s * f);
      var t = v * (1 - s * (1 - f));
      var r;
      var g;
      var b;

      switch (i) {
        default:
        case 0:
          r = v;
          g = t;
          b = p;
          break;

        case 1:
          r = q;
          g = v;
          b = p;
          break;

        case 2:
          r = p;
          g = v;
          b = t;
          break;

        case 3:
          r = p;
          g = q;
          b = v;
          break;

        case 4:
          r = t;
          g = p;
          b = v;
          break;

        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }

      return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
      };
    }
    /**
     * Convert an RGB color to HSV format.
     * @param {RGBObject} rgb - {r: red [0,255], g: green [0,255], b: blue [0,255]}.
     * @return {HSVObject} hsv - {h: hue [0,360), s: saturation [0,1], v: value [0,1]}
     */

  }, {
    key: "rgbToHsv",
    value: function rgbToHsv(rgb) {
      var r = rgb.r / 255;
      var g = rgb.g / 255;
      var b = rgb.b / 255;
      var x = Math.min(Math.min(r, g), b);
      var v = Math.max(Math.max(r, g), b); // For grays, hue will be arbitrarily reported as zero. Otherwise, calculate

      var h = 0;
      var s = 0;

      if (x !== v) {
        var f = r === x ? g - b : g === x ? b - r : r - g;
        var i = r === x ? 3 : g === x ? 5 : 1;
        h = (i - f / (v - x)) * 60 % 360;
        s = (v - x) / v;
      }

      return {
        h: h,
        s: s,
        v: v
      };
    }
    /**
     * Linear interpolation between rgb0 and rgb1.
     * @param {RGBObject} rgb0 - the color corresponding to fraction1 <= 0.
     * @param {RGBObject} rgb1 - the color corresponding to fraction1 >= 1.
     * @param {number} fraction1 - the interpolation parameter. If this is 0.5, for example, mix the two colors equally.
     * @return {RGBObject} the interpolated color.
     */

  }, {
    key: "mixRgb",
    value: function mixRgb(rgb0, rgb1, fraction1) {
      if (fraction1 <= 0) return rgb0;
      if (fraction1 >= 1) return rgb1;
      var fraction0 = 1 - fraction1;
      return {
        r: fraction0 * rgb0.r + fraction1 * rgb1.r,
        g: fraction0 * rgb0.g + fraction1 * rgb1.g,
        b: fraction0 * rgb0.b + fraction1 * rgb1.b
      };
    }
  }]);

  return Color;
}();

var color = Color$1;

var Color = color;
/**
 * @fileoverview
 * Utilities for casting and comparing Scratch data-types.
 * Scratch behaves slightly differently from JavaScript in many respects,
 * and these differences should be encapsulated below.
 * For example, in Scratch, add(1, join("hello", world")) -> 1.
 * This is because "hello world" is cast to 0.
 * In JavaScript, 1 + Number("hello" + "world") would give you NaN.
 * Use when coercing a value before computation.
 */

var Cast$1 = /*#__PURE__*/function () {
  function Cast() {
    _classCallCheck(this, Cast);
  }

  _createClass(Cast, null, [{
    key: "toNumber",
    value:
    /**
     * Scratch cast to number.
     * Treats NaN as 0.
     * In Scratch 2.0, this is captured by `interp.numArg.`
     * @param {*} value Value to cast to number.
     * @return {number} The Scratch-casted number value.
     */
    function toNumber(value) {
      // If value is already a number we don't need to coerce it with
      // Number().
      if (typeof value === 'number') {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        if (Number.isNaN(value)) {
          return 0;
        }

        return value;
      }

      var n = Number(value);

      if (Number.isNaN(n)) {
        // Scratch treats NaN as 0, when needed as a number.
        // E.g., 0 + NaN -> 0.
        return 0;
      }

      return n;
    }
    /**
     * Scratch cast to boolean.
     * In Scratch 2.0, this is captured by `interp.boolArg.`
     * Treats some string values differently from JavaScript.
     * @param {*} value Value to cast to boolean.
     * @return {boolean} The Scratch-casted boolean value.
     */

  }, {
    key: "toBoolean",
    value: function toBoolean(value) {
      // Already a boolean?
      if (typeof value === 'boolean') {
        return value;
      }

      if (typeof value === 'string') {
        // These specific strings are treated as false in Scratch.
        if (value === '' || value === '0' || value.toLowerCase() === 'false') {
          return false;
        } // All other strings treated as true.


        return true;
      } // Coerce other values and numbers.


      return Boolean(value);
    }
    /**
     * Scratch cast to string.
     * @param {*} value Value to cast to string.
     * @return {string} The Scratch-casted string value.
     */

  }, {
    key: "toString",
    value: function toString(value) {
      return String(value);
    }
    /**
     * Cast any Scratch argument to an RGB color array to be used for the renderer.
     * @param {*} value Value to convert to RGB color array.
     * @return {Array.<number>} [r,g,b], values between 0-255.
     */

  }, {
    key: "toRgbColorList",
    value: function toRgbColorList(value) {
      var color = Cast.toRgbColorObject(value);
      return [color.r, color.g, color.b];
    }
    /**
     * Cast any Scratch argument to an RGB color object to be used for the renderer.
     * @param {*} value Value to convert to RGB color object.
     * @return {RGBOject} [r,g,b], values between 0-255.
     */

  }, {
    key: "toRgbColorObject",
    value: function toRgbColorObject(value) {
      var color;

      if (typeof value === 'string' && value.substring(0, 1) === '#') {
        color = Color.hexToRgb(value); // If the color wasn't *actually* a hex color, cast to black

        if (!color) color = {
          r: 0,
          g: 0,
          b: 0,
          a: 255
        };
      } else {
        color = Color.decimalToRgb(Cast.toNumber(value));
      }

      return color;
    }
    /**
     * Determine if a Scratch argument is a white space string (or null / empty).
     * @param {*} val value to check.
     * @return {boolean} True if the argument is all white spaces or null / empty.
     */

  }, {
    key: "isWhiteSpace",
    value: function isWhiteSpace(val) {
      return val === null || typeof val === 'string' && val.trim().length === 0;
    }
    /**
     * Compare two values, using Scratch cast, case-insensitive string compare, etc.
     * In Scratch 2.0, this is captured by `interp.compare.`
     * @param {*} v1 First value to compare.
     * @param {*} v2 Second value to compare.
     * @returns {number} Negative number if v1 < v2; 0 if equal; positive otherwise.
     */

  }, {
    key: "compare",
    value: function compare(v1, v2) {
      var n1 = Number(v1);
      var n2 = Number(v2);

      if (n1 === 0 && Cast.isWhiteSpace(v1)) {
        n1 = NaN;
      } else if (n2 === 0 && Cast.isWhiteSpace(v2)) {
        n2 = NaN;
      }

      if (isNaN(n1) || isNaN(n2)) {
        // At least one argument can't be converted to a number.
        // Scratch compares strings as case insensitive.
        var s1 = String(v1).toLowerCase();
        var s2 = String(v2).toLowerCase();

        if (s1 < s2) {
          return -1;
        } else if (s1 > s2) {
          return 1;
        }

        return 0;
      } // Handle the special case of Infinity


      if (n1 === Infinity && n2 === Infinity || n1 === -Infinity && n2 === -Infinity) {
        return 0;
      } // Compare as numbers.


      return n1 - n2;
    }
    /**
     * Determine if a Scratch argument number represents a round integer.
     * @param {*} val Value to check.
     * @return {boolean} True if number looks like an integer.
     */

  }, {
    key: "isInt",
    value: function isInt(val) {
      // Values that are already numbers.
      if (typeof val === 'number') {
        if (isNaN(val)) {
          // NaN is considered an integer.
          return true;
        } // True if it's "round" (e.g., 2.0 and 2).


        return val === parseInt(val, 10);
      } else if (typeof val === 'boolean') {
        // `True` and `false` always represent integer after Scratch cast.
        return true;
      } else if (typeof val === 'string') {
        // If it contains a decimal point, don't consider it an int.
        return val.indexOf('.') < 0;
      }

      return false;
    }
  }, {
    key: "LIST_INVALID",
    get: function get() {
      return 'INVALID';
    }
  }, {
    key: "LIST_ALL",
    get: function get() {
      return 'ALL';
    }
    /**
     * Compute a 1-based index into a list, based on a Scratch argument.
     * Two special cases may be returned:
     * LIST_ALL: if the block is referring to all of the items in the list.
     * LIST_INVALID: if the index was invalid in any way.
     * @param {*} index Scratch arg, including 1-based numbers or special cases.
     * @param {number} length Length of the list.
     * @param {boolean} acceptAll Whether it should accept "all" or not.
     * @return {(number|string)} 1-based index for list, LIST_ALL, or LIST_INVALID.
     */

  }, {
    key: "toListIndex",
    value: function toListIndex(index, length, acceptAll) {
      if (typeof index !== 'number') {
        if (index === 'all') {
          return acceptAll ? Cast.LIST_ALL : Cast.LIST_INVALID;
        }

        if (index === 'last') {
          if (length > 0) {
            return length;
          }

          return Cast.LIST_INVALID;
        } else if (index === 'random' || index === 'any') {
          if (length > 0) {
            return 1 + Math.floor(Math.random() * length);
          }

          return Cast.LIST_INVALID;
        }
      }

      index = Math.floor(Cast.toNumber(index));

      if (index < 1 || index > length) {
        return Cast.LIST_INVALID;
      }

      return index;
    }
  }]);

  return Cast;
}();

var cast = Cast$1;

var formatMessage$1 = {exports: {}};

var formatMessageParse = {exports: {}};

(function (module, exports) {
  /*::
  export type AST = Element[]
  export type Element = string | Placeholder
  export type Placeholder = Plural | Styled | Typed | Simple
  export type Plural = [ string, 'plural' | 'selectordinal', number, SubMessages ]
  export type Styled = [ string, string, string | SubMessages ]
  export type Typed = [ string, string ]
  export type Simple = [ string ]
  export type SubMessages = { [string]: AST }
  export type Token = [ TokenType, string ]
  export type TokenType = 'text' | 'space' | 'id' | 'type' | 'style' | 'offset' | 'number' | 'selector' | 'syntax'
  type Context = {|
    pattern: string,
    index: number,
    tagsType: ?string,
    tokens: ?Token[]
  |}
  */

  var ARG_OPN = '{';
  var ARG_CLS = '}';
  var ARG_SEP = ',';
  var NUM_ARG = '#';
  var TAG_OPN = '<';
  var TAG_CLS = '>';
  var TAG_END = '</';
  var TAG_SELF_CLS = '/>';
  var ESC = '\'';
  var OFFSET = 'offset:';
  var simpleTypes = ['number', 'date', 'time', 'ordinal', 'duration', 'spellout'];
  var submTypes = ['plural', 'select', 'selectordinal'];
  /**
   * parse
   *
   * Turns this:
   *  `You have { numBananas, plural,
   *       =0 {no bananas}
   *      one {a banana}
   *    other {# bananas}
   *  } for sale`
   *
   * into this:
   *  [ "You have ", [ "numBananas", "plural", 0, {
   *       "=0": [ "no bananas" ],
   *      "one": [ "a banana" ],
   *    "other": [ [ '#' ], " bananas" ]
   *  } ], " for sale." ]
   *
   * tokens:
   *  [
   *    [ "text", "You have " ],
   *    [ "syntax", "{" ],
   *    [ "space", " " ],
   *    [ "id", "numBananas" ],
   *    [ "syntax", ", " ],
   *    [ "space", " " ],
   *    [ "type", "plural" ],
   *    [ "syntax", "," ],
   *    [ "space", "\n     " ],
   *    [ "selector", "=0" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "no bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n    " ],
   *    [ "selector", "one" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "text", "a banana" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n  " ],
   *    [ "selector", "other" ],
   *    [ "space", " " ],
   *    [ "syntax", "{" ],
   *    [ "syntax", "#" ],
   *    [ "text", " bananas" ],
   *    [ "syntax", "}" ],
   *    [ "space", "\n" ],
   *    [ "syntax", "}" ],
   *    [ "text", " for sale." ]
   *  ]
   **/

  exports = module.exports = function parse(pattern
  /*: string */
  , options
  /*:: ?: { tagsType?: string, tokens?: Token[] } */
  )
  /*: AST */
  {
    return parseAST({
      pattern: String(pattern),
      index: 0,
      tagsType: options && options.tagsType || null,
      tokens: options && options.tokens || null
    }, '');
  };

  function parseAST(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: AST */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var elements
    /*: AST */
    = [];
    var start = current.index;
    var text = parseText(current, parentType);
    if (text) elements.push(text);
    if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);

    while (current.index < length) {
      if (pattern[current.index] === ARG_CLS) {
        if (!parentType) throw expected(current);
        break;
      }

      if (parentType && current.tagsType && pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) break;
      elements.push(parsePlaceholder(current));
      start = current.index;
      text = parseText(current, parentType);
      if (text) elements.push(text);
      if (text && current.tokens) current.tokens.push(['text', pattern.slice(start, current.index)]);
    }

    return elements;
  }

  function parseText(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: string */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var isHashSpecial = parentType === 'plural' || parentType === 'selectordinal';
    var isAngleSpecial = !!current.tagsType;
    var isArgStyle = parentType === '{style}';
    var text = '';

    while (current.index < length) {
      var char = pattern[current.index];

      if (char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle && isWhitespace(char.charCodeAt(0))) {
        break;
      } else if (char === ESC) {
        char = pattern[++current.index];

        if (char === ESC) {
          // double is always 1 '
          text += char;
          ++current.index;
        } else if ( // only when necessary
        char === ARG_OPN || char === ARG_CLS || isHashSpecial && char === NUM_ARG || isAngleSpecial && char === TAG_OPN || isArgStyle) {
          text += char;

          while (++current.index < length) {
            char = pattern[current.index];

            if (char === ESC && pattern[current.index + 1] === ESC) {
              // double is always 1 '
              text += ESC;
              ++current.index;
            } else if (char === ESC) {
              // end of quoted
              ++current.index;
              break;
            } else {
              text += char;
            }
          }
        } else {
          // lone ' is just a '
          text += ESC; // already incremented
        }
      } else {
        text += char;
        ++current.index;
      }
    }

    return text;
  }

  function isWhitespace(code
  /*: number */
  )
  /*: boolean */
  {
    return code >= 0x09 && code <= 0x0D || code === 0x20 || code === 0x85 || code === 0xA0 || code === 0x180E || code >= 0x2000 && code <= 0x200D || code === 0x2028 || code === 0x2029 || code === 0x202F || code === 0x205F || code === 0x2060 || code === 0x3000 || code === 0xFEFF;
  }

  function skipWhitespace(current
  /*: Context */
  )
  /*: void */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var start = current.index;

    while (current.index < length && isWhitespace(pattern.charCodeAt(current.index))) {
      ++current.index;
    }

    if (start < current.index && current.tokens) {
      current.tokens.push(['space', current.pattern.slice(start, current.index)]);
    }
  }

  function parsePlaceholder(current
  /*: Context */
  )
  /*: Placeholder */
  {
    var pattern = current.pattern;

    if (pattern[current.index] === NUM_ARG) {
      if (current.tokens) current.tokens.push(['syntax', NUM_ARG]);
      ++current.index; // move passed #

      return [NUM_ARG];
    }

    var tag = parseTag(current);
    if (tag) return tag;
    /* istanbul ignore if should be unreachable if parseAST and parseText are right */

    if (pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN);
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {

    skipWhitespace(current);
    var id = parseId(current);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);
    var char = pattern[current.index];

    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
      ++current.index; // move passed }

      return [id];
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,

    skipWhitespace(current);
    var type = parseId(current);
    if (!type) throw expected(current, 'placeholder type');
    if (current.tokens) current.tokens.push(['type', type]);
    skipWhitespace(current);
    char = pattern[current.index];

    if (char === ARG_CLS) {
      // end placeholder
      if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);

      if (type === 'plural' || type === 'selectordinal' || type === 'select') {
        throw expected(current, type + ' sub-messages');
      }

      ++current.index; // move passed }

      return [id, type];
    }

    if (char !== ARG_SEP) throw expected(current, ARG_SEP + ' or ' + ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_SEP]);
    ++current.index; // move passed ,

    skipWhitespace(current);
    var arg;

    if (type === 'plural' || type === 'selectordinal') {
      var offset = parsePluralOffset(current);
      skipWhitespace(current);
      arg = [id, type, offset, parseSubMessages(current, type)];
    } else if (type === 'select') {
      arg = [id, type, parseSubMessages(current, type)];
    } else if (simpleTypes.indexOf(type) >= 0) {
      arg = [id, type, parseSimpleFormat(current)];
    } else {
      // custom placeholder type
      var index = current.index;
      var format
      /*: string | SubMessages */
      = parseSimpleFormat(current);
      skipWhitespace(current);

      if (pattern[current.index] === ARG_OPN) {
        current.index = index; // rewind, since should have been submessages

        format = parseSubMessages(current, type);
      }

      arg = [id, type, format];
    }

    skipWhitespace(current);
    if (pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS);
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }

    return arg;
  }

  function parseTag(current
  /*: Context */
  )
  /*: ?Placeholder */
  {
    var tagsType = current.tagsType;
    if (!tagsType || current.pattern[current.index] !== TAG_OPN) return;

    if (current.pattern.slice(current.index, current.index + TAG_END.length) === TAG_END) {
      throw expected(current, null, 'closing tag without matching opening tag');
    }

    if (current.tokens) current.tokens.push(['syntax', TAG_OPN]);
    ++current.index; // move passed <

    var id = parseId(current, true);
    if (!id) throw expected(current, 'placeholder id');
    if (current.tokens) current.tokens.push(['id', id]);
    skipWhitespace(current);

    if (current.pattern.slice(current.index, current.index + TAG_SELF_CLS.length) === TAG_SELF_CLS) {
      if (current.tokens) current.tokens.push(['syntax', TAG_SELF_CLS]);
      current.index += TAG_SELF_CLS.length;
      return [id, tagsType];
    }

    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    var children = parseAST(current, tagsType);
    var end = current.index;
    if (current.pattern.slice(current.index, current.index + TAG_END.length) !== TAG_END) throw expected(current, TAG_END + id + TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_END]);
    current.index += TAG_END.length;
    var closeId = parseId(current, true);
    if (closeId && current.tokens) current.tokens.push(['id', closeId]);

    if (id !== closeId) {
      current.index = end; // rewind for better error message

      throw expected(current, TAG_END + id + TAG_CLS, TAG_END + closeId + TAG_CLS);
    }

    skipWhitespace(current);
    if (current.pattern[current.index] !== TAG_CLS) throw expected(current, TAG_CLS);
    if (current.tokens) current.tokens.push(['syntax', TAG_CLS]);
    ++current.index; // move passed >

    return [id, tagsType, {
      children: children
    }];
  }

  function parseId(current
  /*: Context */
  , isTag
  /*:: ?: boolean */
  )
  /*: string */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var id = '';

    while (current.index < length) {
      var char = pattern[current.index];
      if (char === ARG_OPN || char === ARG_CLS || char === ARG_SEP || char === NUM_ARG || char === ESC || isWhitespace(char.charCodeAt(0)) || isTag && (char === TAG_OPN || char === TAG_CLS || char === '/')) break;
      id += char;
      ++current.index;
    }

    return id;
  }

  function parseSimpleFormat(current
  /*: Context */
  )
  /*: string */
  {
    var start = current.index;
    var style = parseText(current, '{style}');
    if (!style) throw expected(current, 'placeholder style name');
    if (current.tokens) current.tokens.push(['style', current.pattern.slice(start, current.index)]);
    return style;
  }

  function parsePluralOffset(current
  /*: Context */
  )
  /*: number */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var offset = 0;

    if (pattern.slice(current.index, current.index + OFFSET.length) === OFFSET) {
      if (current.tokens) current.tokens.push(['offset', 'offset'], ['syntax', ':']);
      current.index += OFFSET.length; // move passed offset:

      skipWhitespace(current);
      var start = current.index;

      while (current.index < length && isDigit(pattern.charCodeAt(current.index))) {
        ++current.index;
      }

      if (start === current.index) throw expected(current, 'offset number');
      if (current.tokens) current.tokens.push(['number', pattern.slice(start, current.index)]);
      offset = +pattern.slice(start, current.index);
    }

    return offset;
  }

  function isDigit(code
  /*: number */
  )
  /*: boolean */
  {
    return code >= 0x30 && code <= 0x39;
  }

  function parseSubMessages(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: SubMessages */
  {
    var pattern = current.pattern;
    var length = pattern.length;
    var options
    /*: SubMessages */
    = {};

    while (current.index < length && pattern[current.index] !== ARG_CLS) {
      var selector = parseId(current);
      if (!selector) throw expected(current, 'sub-message selector');
      if (current.tokens) current.tokens.push(['selector', selector]);
      skipWhitespace(current);
      options[selector] = parseSubMessage(current, parentType);
      skipWhitespace(current);
    }

    if (!options.other && submTypes.indexOf(parentType) >= 0) {
      throw expected(current, null, null, '"other" sub-message must be specified in ' + parentType);
    }

    return options;
  }

  function parseSubMessage(current
  /*: Context */
  , parentType
  /*: string */
  )
  /*: AST */
  {
    if (current.pattern[current.index] !== ARG_OPN) throw expected(current, ARG_OPN + ' to start sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_OPN]);
    ++current.index; // move passed {

    var message = parseAST(current, parentType);
    if (current.pattern[current.index] !== ARG_CLS) throw expected(current, ARG_CLS + ' to end sub-message');
    if (current.tokens) current.tokens.push(['syntax', ARG_CLS]);
    ++current.index; // move passed }

    return message;
  }

  function expected(current
  /*: Context */
  , expected
  /*:: ?: ?string */
  , found
  /*:: ?: ?string */
  , message
  /*:: ?: string */
  ) {
    var pattern = current.pattern;
    var lines = pattern.slice(0, current.index).split(/\r?\n/);
    var offset = current.index;
    var line = lines.length;
    var column = lines.slice(-1)[0].length;
    found = found || (current.index >= pattern.length ? 'end of message pattern' : parseId(current) || pattern[current.index]);
    if (!message) message = errorMessage(expected, found);
    message += ' in ' + pattern.replace(/\r?\n/g, '\n');
    return new SyntaxError(message, expected, found, offset, line, column);
  }

  function errorMessage(expected
  /*: ?string */
  , found
  /* string */
  ) {
    if (!expected) return 'Unexpected ' + found + ' found';
    return 'Expected ' + expected + ' but found ' + found;
  }
  /**
   * SyntaxError
   *  Holds information about bad syntax found in a message pattern
   **/


  function SyntaxError(message
  /*: string */
  , expected
  /*: ?string */
  , found
  /*: ?string */
  , offset
  /*: number */
  , line
  /*: number */
  , column
  /*: number */
  ) {
    Error.call(this, message);
    this.name = 'SyntaxError';
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;
  }

  SyntaxError.prototype = Object.create(Error.prototype);
  exports.SyntaxError = SyntaxError;
})(formatMessageParse, formatMessageParse.exports);

var formatMessageInterpret = {exports: {}};

var LONG = 'long';
var SHORT = 'short';
var NARROW = 'narrow';
var NUMERIC = 'numeric';
var TWODIGIT = '2-digit';
/**
 * formatting information
 **/

var formatMessageFormats = {
  number: {
    decimal: {
      style: 'decimal'
    },
    integer: {
      style: 'decimal',
      maximumFractionDigits: 0
    },
    currency: {
      style: 'currency',
      currency: 'USD'
    },
    percent: {
      style: 'percent'
    },
    default: {
      style: 'decimal'
    }
  },
  date: {
    short: {
      month: NUMERIC,
      day: NUMERIC,
      year: TWODIGIT
    },
    medium: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    },
    long: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC
    },
    full: {
      month: LONG,
      day: NUMERIC,
      year: NUMERIC,
      weekday: LONG
    },
    default: {
      month: SHORT,
      day: NUMERIC,
      year: NUMERIC
    }
  },
  time: {
    short: {
      hour: NUMERIC,
      minute: NUMERIC
    },
    medium: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    },
    long: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    full: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC,
      timeZoneName: SHORT
    },
    default: {
      hour: NUMERIC,
      minute: NUMERIC,
      second: NUMERIC
    }
  },
  duration: {
    default: {
      hours: {
        minimumIntegerDigits: 1,
        maximumFractionDigits: 0
      },
      minutes: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 0
      },
      seconds: {
        minimumIntegerDigits: 2,
        maximumFractionDigits: 3
      }
    }
  },
  parseNumberPattern: function parseNumberPattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};
    var currency = pattern.match(/\b[A-Z]{3}\b/i);
    var syms = pattern.replace(/[^¤]/g, '').length;
    if (!syms && currency) syms = 1;

    if (syms) {
      options.style = 'currency';
      options.currencyDisplay = syms === 1 ? 'symbol' : syms === 2 ? 'code' : 'name';
      options.currency = currency ? currency[0].toUpperCase() : 'USD';
    } else if (pattern.indexOf('%') >= 0) {
      options.style = 'percent';
    }

    if (!/[@#0]/.test(pattern)) return options.style ? options : undefined;
    options.useGrouping = pattern.indexOf(',') >= 0;

    if (/E\+?[@#0]+/i.test(pattern) || pattern.indexOf('@') >= 0) {
      var size = pattern.replace(/E\+?[@#0]+|[^@#0]/gi, '');
      options.minimumSignificantDigits = Math.min(Math.max(size.replace(/[^@0]/g, '').length, 1), 21);
      options.maximumSignificantDigits = Math.min(Math.max(size.length, 1), 21);
    } else {
      var parts = pattern.replace(/[^#0.]/g, '').split('.');
      var integer = parts[0];
      var n = integer.length - 1;

      while (integer[n] === '0') {
        --n;
      }

      options.minimumIntegerDigits = Math.min(Math.max(integer.length - 1 - n, 1), 21);
      var fraction = parts[1] || '';
      n = 0;

      while (fraction[n] === '0') {
        ++n;
      }

      options.minimumFractionDigits = Math.min(Math.max(n, 0), 20);

      while (fraction[n] === '#') {
        ++n;
      }

      options.maximumFractionDigits = Math.min(Math.max(n, 0), 20);
    }

    return options;
  },
  parseDatePattern: function parseDatePattern(pattern
  /*: ?string */
  ) {
    if (!pattern) return;
    var options = {};

    for (var i = 0; i < pattern.length;) {
      var current = pattern[i];
      var n = 1;

      while (pattern[++i] === current) {
        ++n;
      }

      switch (current) {
        case 'G':
          options.era = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;

        case 'y':
        case 'Y':
          options.year = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'M':
        case 'L':
          n = Math.min(Math.max(n - 1, 0), 4);
          options.month = [NUMERIC, TWODIGIT, SHORT, LONG, NARROW][n];
          break;

        case 'E':
        case 'e':
        case 'c':
          options.weekday = n === 5 ? NARROW : n === 4 ? LONG : SHORT;
          break;

        case 'd':
        case 'D':
          options.day = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'h':
        case 'K':
          options.hour12 = true;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'H':
        case 'k':
          options.hour12 = false;
          options.hour = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'm':
          options.minute = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 's':
        case 'S':
          options.second = n === 2 ? TWODIGIT : NUMERIC;
          break;

        case 'z':
        case 'Z':
        case 'v':
        case 'V':
          options.timeZoneName = n === 1 ? SHORT : LONG;
          break;
      }
    }

    return Object.keys(options).length ? options : undefined;
  }
};

// "lookup" algorithm http://tools.ietf.org/html/rfc4647#section-3.4
// assumes normalized language tags, and matches in a case sensitive manner

var lookupClosestLocale = function lookupClosestLocale(locale
/*: string | string[] | void */
, available
/*: { [string]: any } */
)
/*: ?string */
{
  if (typeof locale === 'string' && available[locale]) return locale;
  var locales = [].concat(locale || []);

  for (var l = 0, ll = locales.length; l < ll; ++l) {
    var current = locales[l].split('-');

    while (current.length) {
      var candidate = current.join('-');
      if (available[candidate]) return candidate;
      current.pop();
    }
  }
};

/*:: export type Rule = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other' */


var zero = 'zero',
    one = 'one',
    two = 'two',
    few = 'few',
    many = 'many',
    other = 'other';
var f = [function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 0 <= n && n <= 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : 3 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 99 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : 2 <= n % 10 && n % 10 <= 4 && (n % 100 < 12 || 14 < n % 100) ? few : n % 10 === 0 || 5 <= n % 10 && n % 10 <= 9 || 11 <= n % 100 && n % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 && n % 100 !== 71 && n % 100 !== 91 ? one : n % 10 === 2 && n % 100 !== 12 && n % 100 !== 72 && n % 100 !== 92 ? two : (3 <= n % 10 && n % 10 <= 4 || n % 10 === 9) && (n % 100 < 10 || 19 < n % 100) && (n % 100 < 70 || 79 < n % 100) && (n % 100 < 90 || 99 < n % 100) ? few : n !== 0 && n % 1000000 === 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) || 2 <= f % 10 && f % 10 <= 4 && (f % 100 < 12 || 14 < f % 100) ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : 2 <= i && i <= 4 && v === 0 ? few : v !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : n === 2 ? two : n === 3 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  var n = +s;
  return n === 1 || t !== 0 && (i === 0 || i === 1) ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 100 === 1 || f % 100 === 1 ? one : v === 0 && i % 100 === 2 || f % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || 3 <= f % 100 && f % 100 <= 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i === 0 || i === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && (i === 1 || i === 2 || i === 3) || v === 0 && i % 10 !== 4 && i % 10 !== 6 && i % 10 !== 9 || v !== 0 && f % 10 !== 4 && f % 10 !== 6 && f % 10 !== 9 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : 3 <= n && n <= 6 ? few : 7 <= n && n <= 10 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : 3 <= n && n <= 10 || 13 <= n && n <= 19 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 ? one : v === 0 && i % 10 === 2 ? two : v === 0 && (i % 100 === 0 || i % 100 === 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80) ? few : v !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : i === 2 && v === 0 ? two : v === 0 && (n < 0 || 10 < n) && n % 10 === 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var t = +('' + s).replace(/^[^.]*.?|0+$/g, '');
  return t === 0 && i % 10 === 1 && i % 100 !== 11 || t !== 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 ? two : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 ? zero : n === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return n === 0 ? zero : (i === 0 || i === 1) && n !== 0 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 1 && (n % 100 < 11 || 19 < n % 100) ? one : 2 <= n % 10 && n % 10 <= 9 && (n % 100 < 11 || 19 < n % 100) ? few : f !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n % 10 === 0 || 11 <= n % 100 && n % 100 <= 19 || v === 2 && 11 <= f % 100 && f % 100 <= 19 ? zero : n % 10 === 1 && n % 100 !== 11 || v === 2 && f % 10 === 1 && f % 100 !== 11 || v !== 2 && f % 10 === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var f = +(s + '.').split('.')[1];
  return v === 0 && i % 10 === 1 && i % 100 !== 11 || f % 10 === 1 && f % 100 !== 11 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  var n = +s;
  return i === 1 && v === 0 ? one : v !== 0 || n === 0 || n !== 1 && 1 <= n % 100 && n % 100 <= 19 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 0 || 2 <= n % 100 && n % 100 <= 10 ? few : 11 <= n % 100 && n % 100 <= 19 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return i === 1 && v === 0 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i !== 1 && 0 <= i % 10 && i % 10 <= 1 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 12 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return 0 <= i && i <= 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 10 === 1 && i % 100 !== 11 ? one : v === 0 && 2 <= i % 10 && i % 10 <= 4 && (i % 100 < 12 || 14 < i % 100) ? few : v === 0 && i % 10 === 0 || v === 0 && 5 <= i % 10 && i % 10 <= 9 || v === 0 && 11 <= i % 100 && i % 100 <= 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var n = +s;
  return i === 0 || n === 1 ? one : 2 <= n && n <= 10 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var f = +(s + '.').split('.')[1];
  var n = +s;
  return n === 0 || n === 1 || i === 0 && f === 1 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  var v = (s + '.').split('.')[1].length;
  return v === 0 && i % 100 === 1 ? one : v === 0 && i % 100 === 2 ? two : v === 0 && 3 <= i % 100 && i % 100 <= 4 || v !== 0 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 0 <= n && n <= 1 || 11 <= n && n <= 99 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 || n === 7 || n === 8 || n === 9 || n === 10 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 || i % 10 === 2 || i % 10 === 5 || i % 10 === 7 || i % 10 === 8 || i % 100 === 20 || i % 100 === 50 || i % 100 === 70 || i % 100 === 80 ? one : i % 10 === 3 || i % 10 === 4 || i % 1000 === 100 || i % 1000 === 200 || i % 1000 === 300 || i % 1000 === 400 || i % 1000 === 500 || i % 1000 === 600 || i % 1000 === 700 || i % 1000 === 800 || i % 1000 === 900 ? few : i === 0 || i % 10 === 6 || i % 100 === 40 || i % 100 === 60 || i % 100 === 90 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return (n % 10 === 2 || n % 10 === 3) && n % 100 !== 12 && n % 100 !== 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 3 ? one : n === 2 ? two : n === 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 0 || n === 7 || n === 8 || n === 9 ? zero : n === 1 ? one : n === 2 ? two : n === 3 || n === 4 ? few : n === 5 || n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 1 && n % 100 !== 11 ? one : n % 10 === 2 && n % 100 !== 12 ? two : n % 10 === 3 && n % 100 !== 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 11 ? one : n === 2 || n === 12 ? two : n === 3 || n === 13 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 11 || n === 8 || n === 80 || n === 800 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i === 1 ? one : i === 0 || 2 <= i % 100 && i % 100 <= 20 || i % 100 === 40 || i % 100 === 60 || i % 100 === 80 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n % 10 === 0 && n !== 0 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var i = Math.floor(Math.abs(+s));
  return i % 10 === 1 && i % 100 !== 11 ? one : i % 10 === 2 && i % 100 !== 12 ? two : (i % 10 === 7 || i % 10 === 8) && i % 100 !== 17 && i % 100 !== 18 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n === 2 || n === 3 ? two : n === 4 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return 1 <= n && n <= 4 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 || n === 5 || 7 <= n && n <= 9 ? one : n === 2 || n === 3 ? two : n === 4 ? few : n === 6 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n === 1 ? one : n % 10 === 4 && n % 100 !== 14 ? many : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return (n % 10 === 1 || n % 10 === 2) && n % 100 !== 11 && n % 100 !== 12 ? one : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 6 || n % 10 === 9 || n === 10 ? few : other;
}, function (s
/*: string | number */
)
/*: Rule */
{
  var n = +s;
  return n % 10 === 3 && n % 100 !== 13 ? few : other;
}];
var plurals = {
  af: {
    cardinal: f[0]
  },
  ak: {
    cardinal: f[1]
  },
  am: {
    cardinal: f[2]
  },
  ar: {
    cardinal: f[3]
  },
  ars: {
    cardinal: f[3]
  },
  as: {
    cardinal: f[2],
    ordinal: f[34]
  },
  asa: {
    cardinal: f[0]
  },
  ast: {
    cardinal: f[4]
  },
  az: {
    cardinal: f[0],
    ordinal: f[35]
  },
  be: {
    cardinal: f[5],
    ordinal: f[36]
  },
  bem: {
    cardinal: f[0]
  },
  bez: {
    cardinal: f[0]
  },
  bg: {
    cardinal: f[0]
  },
  bh: {
    cardinal: f[1]
  },
  bn: {
    cardinal: f[2],
    ordinal: f[34]
  },
  br: {
    cardinal: f[6]
  },
  brx: {
    cardinal: f[0]
  },
  bs: {
    cardinal: f[7]
  },
  ca: {
    cardinal: f[4],
    ordinal: f[37]
  },
  ce: {
    cardinal: f[0]
  },
  cgg: {
    cardinal: f[0]
  },
  chr: {
    cardinal: f[0]
  },
  ckb: {
    cardinal: f[0]
  },
  cs: {
    cardinal: f[8]
  },
  cy: {
    cardinal: f[9],
    ordinal: f[38]
  },
  da: {
    cardinal: f[10]
  },
  de: {
    cardinal: f[4]
  },
  dsb: {
    cardinal: f[11]
  },
  dv: {
    cardinal: f[0]
  },
  ee: {
    cardinal: f[0]
  },
  el: {
    cardinal: f[0]
  },
  en: {
    cardinal: f[4],
    ordinal: f[39]
  },
  eo: {
    cardinal: f[0]
  },
  es: {
    cardinal: f[0]
  },
  et: {
    cardinal: f[4]
  },
  eu: {
    cardinal: f[0]
  },
  fa: {
    cardinal: f[2]
  },
  ff: {
    cardinal: f[12]
  },
  fi: {
    cardinal: f[4]
  },
  fil: {
    cardinal: f[13],
    ordinal: f[0]
  },
  fo: {
    cardinal: f[0]
  },
  fr: {
    cardinal: f[12],
    ordinal: f[0]
  },
  fur: {
    cardinal: f[0]
  },
  fy: {
    cardinal: f[4]
  },
  ga: {
    cardinal: f[14],
    ordinal: f[0]
  },
  gd: {
    cardinal: f[15],
    ordinal: f[40]
  },
  gl: {
    cardinal: f[4]
  },
  gsw: {
    cardinal: f[0]
  },
  gu: {
    cardinal: f[2],
    ordinal: f[41]
  },
  guw: {
    cardinal: f[1]
  },
  gv: {
    cardinal: f[16]
  },
  ha: {
    cardinal: f[0]
  },
  haw: {
    cardinal: f[0]
  },
  he: {
    cardinal: f[17]
  },
  hi: {
    cardinal: f[2],
    ordinal: f[41]
  },
  hr: {
    cardinal: f[7]
  },
  hsb: {
    cardinal: f[11]
  },
  hu: {
    cardinal: f[0],
    ordinal: f[42]
  },
  hy: {
    cardinal: f[12],
    ordinal: f[0]
  },
  ia: {
    cardinal: f[4]
  },
  io: {
    cardinal: f[4]
  },
  is: {
    cardinal: f[18]
  },
  it: {
    cardinal: f[4],
    ordinal: f[43]
  },
  iu: {
    cardinal: f[19]
  },
  iw: {
    cardinal: f[17]
  },
  jgo: {
    cardinal: f[0]
  },
  ji: {
    cardinal: f[4]
  },
  jmc: {
    cardinal: f[0]
  },
  ka: {
    cardinal: f[0],
    ordinal: f[44]
  },
  kab: {
    cardinal: f[12]
  },
  kaj: {
    cardinal: f[0]
  },
  kcg: {
    cardinal: f[0]
  },
  kk: {
    cardinal: f[0],
    ordinal: f[45]
  },
  kkj: {
    cardinal: f[0]
  },
  kl: {
    cardinal: f[0]
  },
  kn: {
    cardinal: f[2]
  },
  ks: {
    cardinal: f[0]
  },
  ksb: {
    cardinal: f[0]
  },
  ksh: {
    cardinal: f[20]
  },
  ku: {
    cardinal: f[0]
  },
  kw: {
    cardinal: f[19]
  },
  ky: {
    cardinal: f[0]
  },
  lag: {
    cardinal: f[21]
  },
  lb: {
    cardinal: f[0]
  },
  lg: {
    cardinal: f[0]
  },
  ln: {
    cardinal: f[1]
  },
  lt: {
    cardinal: f[22]
  },
  lv: {
    cardinal: f[23]
  },
  mas: {
    cardinal: f[0]
  },
  mg: {
    cardinal: f[1]
  },
  mgo: {
    cardinal: f[0]
  },
  mk: {
    cardinal: f[24],
    ordinal: f[46]
  },
  ml: {
    cardinal: f[0]
  },
  mn: {
    cardinal: f[0]
  },
  mo: {
    cardinal: f[25],
    ordinal: f[0]
  },
  mr: {
    cardinal: f[2],
    ordinal: f[47]
  },
  mt: {
    cardinal: f[26]
  },
  nah: {
    cardinal: f[0]
  },
  naq: {
    cardinal: f[19]
  },
  nb: {
    cardinal: f[0]
  },
  nd: {
    cardinal: f[0]
  },
  ne: {
    cardinal: f[0],
    ordinal: f[48]
  },
  nl: {
    cardinal: f[4]
  },
  nn: {
    cardinal: f[0]
  },
  nnh: {
    cardinal: f[0]
  },
  no: {
    cardinal: f[0]
  },
  nr: {
    cardinal: f[0]
  },
  nso: {
    cardinal: f[1]
  },
  ny: {
    cardinal: f[0]
  },
  nyn: {
    cardinal: f[0]
  },
  om: {
    cardinal: f[0]
  },
  or: {
    cardinal: f[0],
    ordinal: f[49]
  },
  os: {
    cardinal: f[0]
  },
  pa: {
    cardinal: f[1]
  },
  pap: {
    cardinal: f[0]
  },
  pl: {
    cardinal: f[27]
  },
  prg: {
    cardinal: f[23]
  },
  ps: {
    cardinal: f[0]
  },
  pt: {
    cardinal: f[28]
  },
  'pt-PT': {
    cardinal: f[4]
  },
  rm: {
    cardinal: f[0]
  },
  ro: {
    cardinal: f[25],
    ordinal: f[0]
  },
  rof: {
    cardinal: f[0]
  },
  ru: {
    cardinal: f[29]
  },
  rwk: {
    cardinal: f[0]
  },
  saq: {
    cardinal: f[0]
  },
  sc: {
    cardinal: f[4],
    ordinal: f[43]
  },
  scn: {
    cardinal: f[4],
    ordinal: f[43]
  },
  sd: {
    cardinal: f[0]
  },
  sdh: {
    cardinal: f[0]
  },
  se: {
    cardinal: f[19]
  },
  seh: {
    cardinal: f[0]
  },
  sh: {
    cardinal: f[7]
  },
  shi: {
    cardinal: f[30]
  },
  si: {
    cardinal: f[31]
  },
  sk: {
    cardinal: f[8]
  },
  sl: {
    cardinal: f[32]
  },
  sma: {
    cardinal: f[19]
  },
  smi: {
    cardinal: f[19]
  },
  smj: {
    cardinal: f[19]
  },
  smn: {
    cardinal: f[19]
  },
  sms: {
    cardinal: f[19]
  },
  sn: {
    cardinal: f[0]
  },
  so: {
    cardinal: f[0]
  },
  sq: {
    cardinal: f[0],
    ordinal: f[50]
  },
  sr: {
    cardinal: f[7]
  },
  ss: {
    cardinal: f[0]
  },
  ssy: {
    cardinal: f[0]
  },
  st: {
    cardinal: f[0]
  },
  sv: {
    cardinal: f[4],
    ordinal: f[51]
  },
  sw: {
    cardinal: f[4]
  },
  syr: {
    cardinal: f[0]
  },
  ta: {
    cardinal: f[0]
  },
  te: {
    cardinal: f[0]
  },
  teo: {
    cardinal: f[0]
  },
  ti: {
    cardinal: f[1]
  },
  tig: {
    cardinal: f[0]
  },
  tk: {
    cardinal: f[0],
    ordinal: f[52]
  },
  tl: {
    cardinal: f[13],
    ordinal: f[0]
  },
  tn: {
    cardinal: f[0]
  },
  tr: {
    cardinal: f[0]
  },
  ts: {
    cardinal: f[0]
  },
  tzm: {
    cardinal: f[33]
  },
  ug: {
    cardinal: f[0]
  },
  uk: {
    cardinal: f[29],
    ordinal: f[53]
  },
  ur: {
    cardinal: f[4]
  },
  uz: {
    cardinal: f[0]
  },
  ve: {
    cardinal: f[0]
  },
  vo: {
    cardinal: f[0]
  },
  vun: {
    cardinal: f[0]
  },
  wa: {
    cardinal: f[1]
  },
  wae: {
    cardinal: f[0]
  },
  xh: {
    cardinal: f[0]
  },
  xog: {
    cardinal: f[0]
  },
  yi: {
    cardinal: f[4]
  },
  zu: {
    cardinal: f[2]
  },
  lo: {
    ordinal: f[0]
  },
  ms: {
    ordinal: f[0]
  },
  vi: {
    ordinal: f[0]
  }
};

(function (module, exports) {

  var formats = formatMessageFormats;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var plurals$1 = plurals;
  /*::
  import type {
    AST,
    SubMessages
  } from '../format-message-parse'
  type Locale = string
  type Locales = Locale | Locale[]
  type Placeholder = any[] // https://github.com/facebook/flow/issues/4050
  export type Type = (Placeholder, Locales) => (any, ?Object) => any
  export type Types = { [string]: Type }
  */

  exports = module.exports = function interpret(ast
  /*: AST */
  , locale
  /*:: ?: Locales */
  , types
  /*:: ?: Types */
  )
  /*: (args?: Object) => string */
  {
    return interpretAST(ast, null, locale || 'en', types || {}, true);
  };

  exports.toParts = function toParts(ast
  /*: AST */
  , locale
  /*:: ?: Locales */
  , types
  /*:: ?: Types */
  )
  /*: (args?: Object) => any[] */
  {
    return interpretAST(ast, null, locale || 'en', types || {}, false);
  };

  function interpretAST(elements
  /*: any[] */
  , parent
  /*: ?Placeholder */
  , locale
  /*: Locales */
  , types
  /*: Types */
  , join
  /*: boolean */
  )
  /*: Function */
  {
    var parts = elements.map(function (element) {
      return interpretElement(element, parent, locale, types, join);
    });

    if (!join) {
      return function format(args) {
        return parts.reduce(function (parts, part) {
          return parts.concat(part(args));
        }, []);
      };
    }

    if (parts.length === 1) return parts[0];
    return function format(args) {
      var message = '';

      for (var e = 0; e < parts.length; ++e) {
        message += parts[e](args);
      }

      return message;
    };
  }

  function interpretElement(element
  /*: Placeholder */
  , parent
  /*: ?Placeholder */
  , locale
  /*: Locales */
  , types
  /*: Types */
  , join
  /*: boolean */
  )
  /*: Function */
  {
    if (typeof element === 'string') {
      var value
      /*: string */
      = element;
      return function format() {
        return value;
      };
    }

    var id = element[0];
    var type = element[1];

    if (parent && element[0] === '#') {
      id = parent[0];
      var offset = parent[2];
      var formatter = (types.number || defaults.number)([id, 'number'], locale);
      return function format(args) {
        return formatter(getArg(id, args) - offset, args);
      };
    } // pre-process children


    var children;

    if (type === 'plural' || type === 'selectordinal') {
      children = {};
      Object.keys(element[3]).forEach(function (key) {
        children[key] = interpretAST(element[3][key], element, locale, types, join);
      });
      element = [element[0], element[1], element[2], children];
    } else if (element[2] && _typeof$1(element[2]) === 'object') {
      children = {};
      Object.keys(element[2]).forEach(function (key) {
        children[key] = interpretAST(element[2][key], element, locale, types, join);
      });
      element = [element[0], element[1], children];
    }

    var getFrmt = type && (types[type] || defaults[type]);

    if (getFrmt) {
      var frmt = getFrmt(element, locale);
      return function format(args) {
        return frmt(getArg(id, args), args);
      };
    }

    return join ? function format(args) {
      return String(getArg(id, args));
    } : function format(args) {
      return getArg(id, args);
    };
  }

  function getArg(id
  /*: string */
  , args
  /*: ?Object */
  )
  /*: any */
  {
    if (args && id in args) return args[id];
    var parts = id.split('.');
    var a = args;

    for (var i = 0, ii = parts.length; a && i < ii; ++i) {
      a = a[parts[i]];
    }

    return a;
  }

  function interpretNumber(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var style = element[2];
    var options = formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
    return new Intl.NumberFormat(locales, options).format;
  }

  function interpretDuration(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var style = element[2];
    var options = formats.duration[style] || formats.duration.default;
    var fs = new Intl.NumberFormat(locales, options.seconds).format;
    var fm = new Intl.NumberFormat(locales, options.minutes).format;
    var fh = new Intl.NumberFormat(locales, options.hours).format;
    var sep = /^fi$|^fi-|^da/.test(String(locales)) ? '.' : ':';
    return function (s, args) {
      s = +s;
      if (!isFinite(s)) return fs(s);
      var h = ~~(s / 60 / 60); // ~~ acts much like Math.trunc

      var m = ~~(s / 60 % 60);
      var dur = (h ? fh(Math.abs(h)) + sep : '') + fm(Math.abs(m)) + sep + fs(Math.abs(s % 60));
      return s < 0 ? fh(-1).replace(fh(1), dur) : dur;
    };
  }

  function interpretDateTime(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var type = element[1];
    var style = element[2];
    var options = formats[type][style] || formats.parseDatePattern(style) || formats[type].default;
    return new Intl.DateTimeFormat(locales, options).format;
  }

  function interpretPlural(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var type = element[1];
    var pluralType = type === 'selectordinal' ? 'ordinal' : 'cardinal';
    var offset = element[2];
    var children = element[3];
    var pluralRules;

    if (Intl.PluralRules && Intl.PluralRules.supportedLocalesOf(locales).length > 0) {
      pluralRules = new Intl.PluralRules(locales, {
        type: pluralType
      });
    } else {
      var locale = lookupClosestLocale$1(locales, plurals$1);
      var select = locale && plurals$1[locale][pluralType] || returnOther;
      pluralRules = {
        select: select
      };
    }

    return function (value, args) {
      var clause = children['=' + +value] || children[pluralRules.select(value - offset)] || children.other;
      return clause(args);
    };
  }

  function
    /*:: n:number */
  returnOther() {
    return 'other';
  }

  function interpretSelect(element
  /*: Placeholder */
  , locales
  /*: Locales */
  ) {
    var children = element[2];
    return function (value, args) {
      var clause = children[value] || children.other;
      return clause(args);
    };
  }

  var defaults
  /*: Types */
  = {
    number: interpretNumber,
    ordinal: interpretNumber,
    // TODO: support rbnf
    spellout: interpretNumber,
    // TODO: support rbnf
    duration: interpretDuration,
    date: interpretDateTime,
    time: interpretDateTime,
    plural: interpretPlural,
    selectordinal: interpretPlural,
    select: interpretSelect
  };
  exports.types = defaults;
})(formatMessageInterpret, formatMessageInterpret.exports);

(function (module, exports) {

  var parse = formatMessageParse.exports;
  var interpret = formatMessageInterpret.exports;
  var plurals$1 = plurals;
  var lookupClosestLocale$1 = lookupClosestLocale;
  var origFormats = formatMessageFormats;
  /*::
  import type { Types } from 'format-message-interpret'
  type Locale = string
  type Locales = Locale | Locale[]
  type Message = string | {|
    id?: string,
    default: string,
    description?: string
  |}
  type Translations = { [string]: ?{ [string]: string | Translation } }
  type Translation = {
    message: string,
    format?: (args?: Object) => string,
    toParts?: (args?: Object) => any[],
  }
  type Replacement = ?string | (string, string, locales?: Locales) => ?string
  type GenerateId = (string) => string
  type MissingTranslation = 'ignore' | 'warning' | 'error'
  type FormatObject = { [string]: * }
  type Options = {
    locale?: Locales,
    translations?: ?Translations,
    generateId?: GenerateId,
    missingReplacement?: Replacement,
    missingTranslation?: MissingTranslation,
    formats?: {
      number?: FormatObject,
      date?: FormatObject,
      time?: FormatObject
    },
    types?: Types
  }
  type Setup = {|
    locale: Locales,
    translations: Translations,
    generateId: GenerateId,
    missingReplacement: Replacement,
    missingTranslation: MissingTranslation,
    formats: {
      number: FormatObject,
      date: FormatObject,
      time: FormatObject
    },
    types: Types
  |}
  type FormatMessage = {
    (msg: Message, args?: Object, locales?: Locales): string,
    rich (msg: Message, args?: Object, locales?: Locales): any[],
    setup (opt?: Options): Setup,
    number (value: number, style?: string, locales?: Locales): string,
    date (value: number | Date, style?: string, locales?: Locales): string,
    time (value: number | Date, style?: string, locales?: Locales): string,
    select (value: any, options: Object): any,
    custom (placeholder: any[], locales: Locales, value: any, args: Object): any,
    plural (value: number, offset: any, options: any, locale: any): any,
    selectordinal (value: number, offset: any, options: any, locale: any): any,
    namespace (): FormatMessage
  }
  */

  function assign
  /*:: <T: Object> */
  (target
  /*: T */
  , source
  /*: Object */
  ) {
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
    return target;
  }

  function namespace()
  /*: FormatMessage */
  {
    var formats = assign({}, origFormats);
    var currentLocales
    /*: Locales */
    = 'en';
    var translations
    /*: Translations */
    = {};

    var generateId
    /*: GenerateId */
    = function generateId(pattern) {
      return pattern;
    };

    var missingReplacement
    /*: Replacement */
    = null;
    var missingTranslation
    /*: MissingTranslation */
    = 'warning';
    var types
    /*: Types */
    = {};

    function formatMessage(msg
    /*: Message */
    , args
    /*:: ?: Object */
    , locales
    /*:: ?: Locales */
    ) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.format || (translated.format = interpret(parse(translated.message), locales || currentLocales, types));
      return format(args);
    }

    formatMessage.rich = function rich(msg
    /*: Message */
    , args
    /*:: ?: Object */
    , locales
    /*:: ?: Locales */
    ) {
      var pattern = typeof msg === 'string' ? msg : msg.default;
      var id = _typeof$1(msg) === 'object' && msg.id || generateId(pattern);
      var translated = translate(pattern, id, locales || currentLocales);
      var format = translated.toParts || (translated.toParts = interpret.toParts(parse(translated.message, {
        tagsType: tagsType
      }), locales || currentLocales, types));
      return format(args);
    };

    var tagsType = '<>';

    function richType(node
    /*: any[] */
    , locales
    /*: Locales */
    ) {
      var style = node[2];
      return function (fn, args) {
        var props = _typeof$1(style) === 'object' ? mapObject(style, args) : style;
        return typeof fn === 'function' ? fn(props) : fn;
      };
    }

    types[tagsType] = richType;

    function mapObject(object
    /* { [string]: (args?: Object) => any } */
    , args
    /*: ?Object */
    ) {
      return Object.keys(object).reduce(function (mapped, key) {
        mapped[key] = object[key](args);
        return mapped;
      }, {});
    }

    function translate(pattern
    /*: string */
    , id
    /*: string */
    , locales
    /*: Locales */
    )
    /*: Translation */
    {
      var locale = lookupClosestLocale$1(locales, translations) || 'en';
      var messages = translations[locale] || (translations[locale] = {});
      var translated = messages[id];

      if (typeof translated === 'string') {
        translated = messages[id] = {
          message: translated
        };
      }

      if (!translated) {
        var message = 'Translation for "' + id + '" in "' + locale + '" is missing';

        if (missingTranslation === 'warning') {
          /* istanbul ignore else */
          if (typeof console !== 'undefined') console.warn(message);
        } else if (missingTranslation !== 'ignore') {
          // 'error'
          throw new Error(message);
        }

        var replacement = typeof missingReplacement === 'function' ? missingReplacement(pattern, id, locale) || pattern : missingReplacement || pattern;
        translated = messages[id] = {
          message: replacement
        };
      }

      return translated;
    }

    formatMessage.setup = function setup(opt
    /*:: ?: Options */
    ) {
      opt = opt || {};
      if (opt.locale) currentLocales = opt.locale;
      if ('translations' in opt) translations = opt.translations || {};
      if (opt.generateId) generateId = opt.generateId;
      if ('missingReplacement' in opt) missingReplacement = opt.missingReplacement;
      if (opt.missingTranslation) missingTranslation = opt.missingTranslation;

      if (opt.formats) {
        if (opt.formats.number) assign(formats.number, opt.formats.number);
        if (opt.formats.date) assign(formats.date, opt.formats.date);
        if (opt.formats.time) assign(formats.time, opt.formats.time);
      }

      if (opt.types) {
        types = opt.types;
        types[tagsType] = richType;
      }

      return {
        locale: currentLocales,
        translations: translations,
        generateId: generateId,
        missingReplacement: missingReplacement,
        missingTranslation: missingTranslation,
        formats: formats,
        types: types
      };
    };

    formatMessage.number = function (value
    /*: number */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.number[style] || formats.parseNumberPattern(style) || formats.number.default;
      return new Intl.NumberFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.date = function (value
    /*:: ?: number | Date */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.date[style] || formats.parseDatePattern(style) || formats.date.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.time = function (value
    /*:: ?: number | Date */
    , style
    /*:: ?: string */
    , locales
    /*:: ?: Locales */
    ) {
      var options = style && formats.time[style] || formats.parseDatePattern(style) || formats.time.default;
      return new Intl.DateTimeFormat(locales || currentLocales, options).format(value);
    };

    formatMessage.select = function (value
    /*: any */
    , options
    /*: Object */
    ) {
      return options[value] || options.other;
    };

    formatMessage.custom = function (placeholder
    /*: any[] */
    , locales
    /*: Locales */
    , value
    /*: any */
    , args
    /*: Object */
    ) {
      if (!(placeholder[1] in types)) return value;
      return types[placeholder[1]](placeholder, locales)(value, args);
    };

    formatMessage.plural = plural.bind(null, 'cardinal');
    formatMessage.selectordinal = plural.bind(null, 'ordinal');

    function plural(pluralType
    /*: 'cardinal' | 'ordinal' */
    , value
    /*: number */
    , offset
    /*: any */
    , options
    /*: any */
    , locale
    /*: any */
    ) {
      if (_typeof$1(offset) === 'object' && _typeof$1(options) !== 'object') {
        // offset is optional
        locale = options;
        options = offset;
        offset = 0;
      }

      var closest = lookupClosestLocale$1(locale || currentLocales, plurals$1);
      var plural = closest && plurals$1[closest][pluralType] || returnOther;
      return options['=' + +value] || options[plural(value - offset)] || options.other;
    }

    function
      /*:: n:number */
    returnOther() {
      return 'other';
    }

    formatMessage.namespace = namespace;
    return formatMessage;
  }

  module.exports = namespace();
})(formatMessage$1);

var ArgumentType = argumentType;
var BlockType = blockType;
var Cast = cast;
var formatMessage = formatMessage$1.exports;
/**
 * Icon svg to be displayed in the blocks category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len

var menuIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QEGCSkSKniD0QAAAT1JREFUWMPtlj1OxDAQRp9HFNxguQGizoqGNgUVR0FiUyMuwG7uQkWRAiHRoOwBuAE00CJRDAW7QgQcEiexDfInRS7sGT3NXwaSkpL+toztQnNmwCnw2tnbDphrJ4Yb4Nbi0mJV8aQ5z8Clh0Bd2AClJYKYiiVQeABU24W0RHALuQIWoWpQWovjE7IMBSm/VnBgSOnUZgEhpfMsCAQpfR43IIvoAEN0t7gY+Uy3uBr6SrcMMW6kuyBWab45T8zZ5rfV9ztv2T9GWIkq0GMwV1oePSpvL6z6+rg/MNMBwseadfig3O2ZMqvVAMvgNfgtCvuGrFbWczNaTcrY9bief4FcRAfYgBw8J2Wqzm5AFtEB/pDuIjrAMSAnBxwK6QVwSHd7A3Ttbq+ALpDeAS0jaDfKLSirdXvOSEpK+qd6B+rNkHpCz2WwAAAAAElFTkSuQmCC';
/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len

var blockIconURI = ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5QEGCSwjBtF3rgAABOBJREFUeNrtnD1IY1kUx3/mw0CITiM7ziKD2AyCaK1iRNidnel0xFqELQVhUQluI0jqFUFQwWIbUVFsFBsLp4ggNuroKCq4yrJ+IDPoiJoPc7fwJTu+JC8v5mXNS+4PTpGQ897Nn3vvued+gUQiMTEFWVCGQsWcQA1QDbwGXirfAdwAZ8AxsAlsKN8FFMs7AV8B7cB7oAz4AXCl+Ixr4Bz4G1gE/gROcrm2lwO/AtuAyJBtK+8ozyXh3gBrwF0GhVPbnfLON2YWrkFpWuKZbVEpi2l4AcxngXBqm1fKltX8BnzNQvEi9lUpY9ZRDExlsXBqm1LKnBW8BL6YSLyIfVHK/qy8BcImFC9iYeU/PAsfTCyc2j5I8Uwk4tscFC9iKTfngicEjJMsmYTIBELJ08/0OlhSHKrs5LB4kQq1k6khzlQON91440TDMwyRZ2ZYxvIiy9OzTKZ9huTOC3koXsQWjJiSEnluaU2FLUoBWUxnJllIQzx1ZntNChe1tacsAN1J4R6tsZSnkon8DDiQRHAAP6XisC1rXdwlU12TCa+Af2Sli8uPqBbv4zXhdqlTQtr19IHvpU4JidHGpvpcyMNelYR0dnZSUlIS/RwMBvF6vTgcDnp7e7FarUlLsbu7y/T0NB6Ph8LCQl0lX11dZWlpie7ubhyO5PHNYrGwvLyMz+ejv78fv9+f1MdutzM6Osrx8XGin5QpGiXc0OQCvml1pjs7O+J7bm9vBSCKiopEIBAQepibmxN2u11cX18LvQwNDQmn0ykuLy91+3i9XlFcXCxSob6+XiuQfEO1CUrdhJ2kvksqn3Dx35a7uALWSI2SUqMlYPX/UYJIP2mz2XT7WCyWJ/ukNKdfkHTFoloriLw2Uqi1tTX6+vqw2+3RwlksFk5PTwmFQjQ3N2Oz2RBC0NPTQ2NjY9T3/v6erq4ujo6OADg8PMTv99Pa2orNZiMcDuPxeGhoeDzb1NHRwcXFBQUFBezt7XFzc0NLSwuhUIjb21vGxsaoqKh45NPU1ITL5cJqtbK9vZ3sb2lqNJlsRJ5KEFlZWRF1dXXC7XYLt9stKisrEz53YmLikW8wGBRVVVWaZZmcnIwJAmVlZZo+6+vrMT4pZiSTWjXQaWQNrK2txefzRT/PzMzQ1tZm9j7QqWcyISOEQqGciyhqAW9kkE3KjZaAZ5l8s96sI8s50+oDj41809bWFoODg9Ghx8HBQS4IeKwl4KaRbzo6OmJ8fDzXmvCmVhPeMPJNOgalZmQjWRC5lnEiIdfqIKJuwgEejk8lnFAYHh6Omc4CCAQCDAwMRNO0SCagl9nZWfb393kY10I4HOb8/FzTZ2Zmht3d3Ucp4tXVlabPyMgIpaWlTxXwHB1n8z4i1z8S2cdk40BIYyU+D4jRRi4qpYauRaUT4LPUKobPxDlOmygX/kPqlZ4m5citHWlt7fgL+CQrXZRPiiYpIbe3pbm9LRK25QbLNJBbfA047T6fx+LNG9GBymMOGlh1COgHgsAveRZ5fweWjXygPOqVJsWY82j/U64C0H3YUB53fUxGj7uiPPhdDvd778jwymQEeeRfivi84kWQ154YgLx4x6Ahjrz6yQDk5WMG5c7ZeMp9ARNcf6eeCpMXMBqAvALUIMrJwUto5TXIJhXwe0x9EbdEIjE1/wIm53WPlpoHFgAAAABJRU5ErkJggg==';
/**
 * The url of the ifttt server.
 * @type {string}
 */

var iftttServerURL = 'https://maker.ifttt.com/';
/**
 * Class for the ifttt.com webhooks block in Scratch 3.0.
 * @constructor
 */

var Scratch3IFTTTWebhooks = /*#__PURE__*/function () {
  function Scratch3IFTTTWebhooks(runtime) {
    _classCallCheck(this, Scratch3IFTTTWebhooks);

    this.runtime = runtime;
    this.key = '';
  }

  _createClass(Scratch3IFTTTWebhooks, [{
    key: "getInfo",
    value: function getInfo() {
      this._setupTranslations();

      return {
        id: 'iftttWebhooks',
        name: formatMessage({
          id: 'iftttWebhooks.categoryName',
          default: 'IFTTT Webhooks',
          description: 'Name of extension that adds IFTTT Webhook blocks'
        }),
        menuIconURI: menuIconURI,
        blockIconURI: blockIconURI,
        blocks: [{
          opcode: 'setIftttKey',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'iftttWebhooks.setIftttKey',
            default: 'IFTTT key:[KEY]'
          }),
          arguments: {
            KEY: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.Key',
                default: 'Key'
              })
            }
          }
        }, {
          opcode: 'getIfttt',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'iftttwebhooks.getIfttt',
            default: 'Trigger [EVENT]',
            description: 'Trigger [EVENT]'
          }),
          arguments: {
            EVENT: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultEvent',
                default: 'eventName',
                description: 'eventName: the default event name'
              })
            }
          }
        }, {
          opcode: 'getIfttt1',
          text: formatMessage({
            blockType: BlockType.COMMAND,
            id: 'iftttwebhooks.getIfttt1',
            default: 'Trigger [EVENT] with [VALUE1]',
            description: 'Trigger [EVENT] with [VALUE1]'
          }),
          arguments: {
            EVENT: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultEvent',
                default: 'eventName',
                description: 'eventName: the default event name'
              })
            },
            VALUE1: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultValue1',
                default: 'value1',
                description: 'the default value1'
              })
            }
          }
        }, {
          opcode: 'getIfttt2',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'iftttwebhooks.getIfttt2',
            default: 'Trigger [EVENT] with [VALUE1] and [VALUE2]',
            description: 'Trigger [EVENT] with [VALUE1] and [VALUE2]'
          }),
          arguments: {
            EVENT: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultEvent',
                default: 'eventName',
                description: 'eventName: the default event name'
              })
            },
            VALUE1: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultValue1',
                default: 'value1',
                description: 'the default value1'
              })
            },
            VALUE2: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultValue2',
                default: 'value2',
                description: 'the default value2'
              })
            }
          }
        }, {
          opcode: 'getIfttt3',
          blockType: BlockType.COMMAND,
          text: formatMessage({
            id: 'iftttwebhooks.getIfttt3',
            default: 'Trigger [EVENT] with [VALUE1], [VALUE2] and [VALUE3]',
            description: 'Trigger [EVENT] with [VALUE1], [VALUE2] and [VALUE3]'
          }),
          arguments: {
            EVENT: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultEvent',
                default: 'eventName',
                description: 'eventName: the default event name'
              })
            },
            VALUE1: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultValue1',
                default: 'value1',
                description: 'the default value1'
              })
            },
            VALUE2: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultValue2',
                default: 'value2',
                description: 'the default value2'
              })
            },
            VALUE3: {
              type: ArgumentType.STRING,
              defaultValue: formatMessage({
                id: 'iftttwebhooks.defaultValue3',
                default: 'value3',
                description: 'the default value3'
              })
            }
          }
        }],
        menus: {}
      };
    }
  }, {
    key: "getIfttt",
    value: function getIfttt(args) {
      var json = {};

      if (args.VALUE1) {
        json.VALUE1 = Cast.toString(args.VALUE1);
      }

      if (args.VALUE2) {
        json.VALUE2 = Cast.toString(args.VALUE2);
      }

      if (args.VALUE3) {
        json.VALUE3 = Cast.toString(args.VALUE3);
      }

      var urlBase = iftttServerURL + 'trigger/' + Cast.toString(args.EVENT) + '/with/key/' + Cast.toString(this.key);
      return fetch(urlBase, {
        method: 'POST',
        body: JSON.stringify(json),
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(function (_) {
        return 'Ok';
      }).catch(function (_) {
        return 'Fail';
      });
    }
  }, {
    key: "getIfttt1",
    value: function getIfttt1(args) {
      return this.getIfttt(args);
    }
  }, {
    key: "getIfttt2",
    value: function getIfttt2(args) {
      return this.getIfttt(args);
    }
  }, {
    key: "getIfttt3",
    value: function getIfttt3(args) {
      return this.getIfttt(args);
    }
  }, {
    key: "setIftttKey",
    value: function setIftttKey(args) {
      this.key = Cast.toString(args.KEY);
    }
  }, {
    key: "_setupTranslations",
    value: function _setupTranslations() {
      var localeSetup = formatMessage.setup();
      var translations = {
        'pl': _defineProperty({
          'iftttWebhooks.setIftttKey': 'Ustaw klucz IFTTT:[KEY]',
          'iftttwebhooks.Key': 'klucz',
          'iftttwebhooks.getIfttt': 'Wyślij zdarzenie [EVENT]',
          'iftttwebhooks.defaultEvent': 'zdarzenie',
          'iftttwebhooks.getIfttt1': 'Wyślij zdarzenie [EVENT] z parametrem [VALUE1]',
          'iftttwebhooks.getIfttt2': 'Wyślij zdarzenie [EVENT] z parametrami [VALUE1] i [VALUE2]',
          'iftttwebhooks.getIfttt3': 'Wyślij zdarzenie [EVENT] z parametrem [VALUE1], [VALUE2] i [VALUE3]',
          'iftttwebhooks.defaultValue1': 'wartość 1',
          'iftttwebhooks.defaultValue2': 'wartość 2',
          'iftttwebhooks.defaultValue3': 'wartość 3',
          'iftttWebhooks.categoryName': 'IFTTT Webhooks'
        }, "iftttWebhooks.categoryName", 'IFTTT Webhooks')
      };

      for (var locale in translations) {
        if (!localeSetup.translations[locale]) {
          localeSetup.translations[locale] = {};
        }

        Object.assign(localeSetup.translations[locale], translations[locale]);
      }
    }
  }]);

  return Scratch3IFTTTWebhooks;
}();

var blockClass = Scratch3IFTTTWebhooks;

export { blockClass, entry };
