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
    M$1 = [];

function N(a, b, e, c) {
  if (M$1.length) {
    var d = M$1.pop();
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
  10 > M$1.length && M$1.push(a);
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

var img$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAF0CAYAAAD/4EcMAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACWKADAAQAAAABAAABdAAAAAAtOTIzAABAAElEQVR4AexdB5wbxdV/6tL1avvcey+AjTEGY0w1vQdIoQRCCCQQEkgIhC+ElhAghSRAIPQaem8BAjbNGGMw7r2fffb1O92pf+/prLvd1a60q11JK+m938/W7uzMm5n/vJt9++bNGwsQ3RmJRH/z9D8L9mtSNYDLHt/BrW0Ae7ri06UptR6AoWXS1L77Vh/A+pa+e+HVqHKACrcwBcAbAFjVJE7ju9xCgOUqt8YrV1rLcpUrI5Vb7WS5yvx4WTNfZeZrJO1xr4ISNbgUFS9b8jZVo4KViEjBkqMaLCdVrihfo0J75HhwmjkRYLky57jkeqtYrnJ9BM3ZfparzI9LQShYBGtjtzy4VlTrh6NlirR7JXIiSsUOpac96R1okZISgTuwWJrac9+ioJDJ5+ZUsyLAcmXWkcntdrFc5fb4mbX1LFeZHZmCUbACYYAWBSWrxAmQyEJVis8TES2wdgfjc/QrAnDIWMc6URnzY3uYch8BlqvcH0Mz9oDlyoyjkvttYrnK7BgWjIJFsLb6lcElS5MSGMkUrC5Ursj8KiQ7msQGKFiv2th6JYQq569ZrnJ+CE3ZAZYrUw5LzjeK5SpzQ6ikU2SuBRmsqT2BgkWWplq0OMlRMgWLHNalRL5XNgV0SSFjyh8EWK7yZyzN1BOWKzONRv60heUqc2OpoAJkrgGZrMkXwqU5/KdEZHGySZyxyAHeKbPMJ+QhpzAlWnKUyy/kx9e5hQDLVW6NV660luUqV0Yqt9rJcpW58SooBYtg7UhgxbIjGtWScAplSfyviKdUYSrGcBBumZAQlJf8tUjAmfILAZar/BpPs/SG5cosI5Ff7WC5ysx4FpyClUy5oaU9IZUk2T1IeclxUEiJrFchVLCk/lrCsnydmwiwXOXmuJm91SxXZh+h3Gwfy1Vmxq3gFKxku/c8qFCRBSpGHsF1LE36K1WwKiVWMGH+MGtXQjjy5prlKm+G0lQdYbky1XDkTWNYrjIzlAWnYPlUOJjHnN3JHUtpqS82PLTkR1apGLnRX4uWGpUov2PmK/U6/9NZrvJ/jLPRQ5arbKCe/3WyXGVmjBOoAplpQKZrCQqUIaW6yQJFyhU5t1skTu/SMlLrVbIdh9LyfJ8fCLBc5cc4mq0XLFdmG5H8aA/LVWbGUcUCWGYaYqZaKLo7KUpJdKtok4MS/6tkPltygUfN1HduS/oQYLlKH7aFzJnlqpBHP319Z7nSj23BWbDUQlbuSr48SLyEy4N0T1HhExEJLQUhZSpMBFiuCnPc091rlqt0I1yY/Fmu9I07K1gK+JWjoqTGwV2oK1EMrWQxs6g6tmIpgF4AySxXBTDIWegiy1UWQC+AKlmu9A1ywS0RSgOJKsHnQmTI2qSFKCipGiJHeGnsLDXlOI95EWC5Mu/Y5HLLWK5yefTM23aWq8yMTcFZsNRYmGLQq7E0CZ3g1SpY7AgfQzh/flmu8mcszdQTliszjUb+tIXlKjNjWXAKllolKBX41fJmBSsVdM1dRu3Yp9ILtbxZrlJB19xl1I59Kr1Qy5vlKhV0zV1G7din0gu1vAtBrgpOwXKmscdqBYtia7Gjeyp/uuYtw3Jl3rHJ5ZaxXOXy6Jm37SxXmRmbHi+jOzn8ZWbg5loYAUaAEWAEGAFGoBAQSKM9pxDg4z4yAowAI8AIMAKMACMQjwArWPGYcAojwAgwAowAI8AIMAK6EGAFSxd8XJgRYAQYAUaAEWAEGIF4BFjBiseEUxgBRoARYAQYAUaAEdCFACtYuuDjwowAI8AIMAKMACPACMQjwApWPCacwggwAowAI8AIMAKMgC4EWMHSBR8XZgQYAUaAEWAEGAFGIB4BVrDiMeEURoARYAQYAUaAEWAEdCHACpYu+LgwI8AIMAKMACPACDAC8QiwghWPCacwAowAI8AIMAKMACOgCwFWsHTBx4UZAUaAEWAEGAFGgBGIR4AVrHhMOIURYAQYAUaAEWAEGAFdCLCCpQs+LswIMAKMACPACDACjEA8AqxgxWPCKYwAI8AIMAKMACPACOhCgBUsXfBxYUaAEWAEGAFGgBFgBOIRYAUrHhNOYQQYAUaAEWAEGAFGQBcCrGDpgo8LMwKMACPACDACjAAjEI8AK1jxmHAKI8AIMAKMACPACDACuhBgBUsXfFyYEWAEGAFGgBFgBBiBeARYwYrHhFMYAUaAEWAEGAFGgBHQhYBdV2kuzAgwAowAI2AYAkOdW2CEawPU2Hbjv0aocuA/axMUWb0QsDggEHKAP2KHALigLVwBW3zDYb1/NKztHg9d4SLD2sGMGAFGQD8CrGDpx5A5MAKMACOgGYHpRYvhpPKXYHbxxzDWvRqq7I1ghbBmPrECQVS8tviHw7vtx8O9e66Ajb5RsUf8ywgwAllAwBKt885IJAt1c5WMACPACBQMAjYIwnk1D8H5VQ/BFPdScFn9ae17Z7gY3mw9Ga7bcSfUBwemtS5mzggwAvEIsIIVjwmnMAKMACNgCAKl9jb4Ze0f4bTy53Hpbz1YLZn/lqUaV3dPgt/X3wqvt55iSL+YCSPACCRHgBWs5BhxDkaAEWAENCFwbNmbcEPdDTANLVWWLChVSo3dhMuGF259Er7sPEgpC6czAoyAQQiwgmUQkMyGEWAEChsBslbdNOA38J2qJ6Hc2mpqMBZ3zoIzN70GjcEaU7eTG8cI5DICHKYhl0eP284IMAJZR6Dc2gJPDz8ddkyuhB/V3GN65YoAO7D4c1g3cSB8v+rhrOPHDWAE8hUBtmDl68hyvxgBRiCtCJDF6p7BF8Ep5S+ibxXu/iNnp54ZNa31Gs38k87D4MQN/4VA2Gk0a+bHCBQ0AqxgFfTwc+cZAUZALQL9rTvhSM/rMNP1MRxZ/CZUYZyqCOpVYdKt9vmuO1BHKStXy9E8+RpDNTB7zVLY4R9snkZxSxiBHEeAFawcH0BuPiPACKQHgVnOBXBuyb9gpvNj6GfbCXYMs5CI3B6A4pJEOcz9zBdxwUnr34NPOw81d0O5dYxAjiDAClaODBQ3kxFgBNKPQK11F/y+8go4wvkGeDB6uirCWbQEFSuXW1VuU2cKY6jTsze9Am+1nmjqdnLjGIFcQMBQJ/dyNI+XOnKh29zGXEKA5SqXRit32iqUq0nOr+DlfrNgcV0dnOB+Tr1yhd0tLcsP5YpGjiLJ/2fEKXBi+Su5M5Ama6lQrkzWNG5OhhEwxIJVhAfuDC4FPCcLYFNbhnvA1eUtAixXeTu0We2YUK7KuhfDHRU/hHGO5ZrbZCHLFSpXzjz0DQ9HLHDmxjfw2J3jNONSqAWEcsXvwUKVAnG/dSlYDrR/DULTeDX6HnSje8LqJoDQPmdPcTV8l4sI0PhWugAauzM7rixXuSgt6ttsBrmqDK+Dqy3fgQmOr9U3XJCTlKtSdGZ35LHFns42nL3ma1iJUeDNQsXWDjjI/j70D68Ht68RbKEuaHEOhE/DJ8Ie+wSer8wyUHnUDj3zVcoKVhl+tY3ACcaOL+EwKlWrGlHJQgsWU34hQArWUPxK39UJsAddUlI/ilYdLixX6nDK9VzZkqsyaxv8wvod2N/6jq6ICrRTkHYM5jt5Q8UwYdXmjAckHenaACeVvQyHlnyI1sVlsGvNdli2Mgzerr4dm1Lsi4oAKsosYKkcBC+W/RneDp/F85UUJL5PCYFU5yvNChYVGFAMMFCwW2ZjC0CzL6V2c6EcQICslDTmfloCxgDVHQHjG81yZTymZueYabk6w3ornGP9PdhAnwDTsqALPzwKhbb4hsOkVZvS2t3R7nVwQdUDcFTZ2zDGtRZclp4XylqsduEXAC0aXU/IwjhksA3+U/MgvG0/3/C283xlOKSmZ5jKfEVyAnBnLIpL4j7aMTdZrcoEk0sTflHwenNi3HL9KQnJmEpcEtn3xV7fAVCPFi00XBpCLFeGwJhzTDIlV5M9y+EG63yohh26MSrCDw0PWkoKjV5oORvO3/yMod0+pvQt+HHt32F28cdQamsX8e5G/eqtjwA2bhEla76hJVzPxJnwC+cinq80o8cFhAikMl9RGVUKlssGMBZfsk78jVEQ14tW7AUIGvWmjTHmX9MhQErQhOq+8e9EIwBZs3w6l4VZrkw31BltULrl6jLnz+A4yz9xOVD/JEVhGEpwM0+h0gVbn4Lnm87V1f0jSv8LV/f7A8wq+QScFr8sr3b8gHv2De1WK1lm+xLLp82EX3sW8XyVCCR+lhQBrfOVKgXLiX5W46r6Xq6xVtALtgkdoJkKAwHafjwalewYkYK9thmgK3H8xVj2uF+WqzhICjIhHXJ1WM0muMNxKFTBTkMwteNO6fIKZNUzYxrCM9eY+CJOGPntbmgNExDqifypbh74ayCLVbLYYgGcSx5/EV1O8N1iJNH4bZr/AjzZeDrPV0YCW4C8tMxXqDolJvKgl1quqEQrmnBZuUqMXb49bcUPThr3GNEGB5IN2p6slViutCKWv/mNlquf1j4I9zvGGKZcxcIxFLJyRdLnQovTm2OOUCWIFnQv/0X/P8HqSUNh2YTReF7jC0mVK2L8yZfGK1fEtxp1wlsHXMjzFYHBpAsBLfNVQgUr9hJ0SV6gtGtwq0anQ1094sKmQWA7ukoIPfZiSlaJhu3qLFemGU7TNMQouXq8/6lwpf1idGTXuXYtQIaOv7EJXCMEjwrucppnKVxQ/W/Ffg91bsFApadC41Q33FT3axjs2KaYV/qA5pXla6SpxtxPHIPHGFna4KzSe6JKFs9XxuBaqFzUzleKChZZwkej1u+WKFcEKG3Z96d7v36hjpzJ+02hOHZLThCxoRSRE7xHRlak3WG5kiLC94SAXrkqhg5Y2H80HGx9xVBAyUk6G0fgkLLhk3dRMrR/qTC7a/BP46xR80rfh8/HT4WVE4fDCRgF3mnVvlPTi+4m6ehzOe76nDqhp6cXFOMuUp6vUhl2LiNAQO18pahg0ZbEIhmrBPndNEhesIJ6+bIAEKBdhBS1X0hW1JxGUVy0JD4qLFdC1PhaiECqcjXEvgm+GDQE6qwbhOwMuc704c0r1wE8+TLA3x4G+MejAPc/DfD+J6iACpbmDemYDiYUQuHJ4WdEOXyv6lFYO3EwvDbqKJjs/lYHV/xAw93p9jRYCo+c3ce3wtYAh7lfAp6vdA0VF0YE1MxXPa9DSZgGCvZIFgk52oZLgw0YmoGpsBEYgFvVB8nsqGrDF8H6FvkQDixXhS0zanqvVa5mOj+Gp2qPAIfO2FZybaNYVxTzKhMUxg/X9z4G+FZhicyDOxjPxFNr+tVkojXq6mgKVkGVvUldZpW53ngfTwTZqDKzimwH7Qdw6IHijDtDI+Dchp5KeL4SY8N32hBINl/FWbDIAjFcYVKhQJN7WbnSNgImzR038BrbScfnCH2xYsUpRpowCG0sneUqhkR+/2ZSrma5PoRnag9Pi3JFo+TOYLyrJWj8UVKuqC1d+Pf2Giof6VhCI/6pkNHKFbVhzkxckt0Xby+VNgnLTB0fr1zR84G2TTDZgWZBJJ6vojAU7H/pnq/i+A+nIyAUzLQUXBI/tJjyAIFyVIRI+7b12DA19yiAgtCisGwht0zIcqUZ4pwskCm5OsT1Pjxdc5ShzuxCwGlbP/3LBJHy9PnS5DVRNPPFy5Lny+UcZWgVP20+hgSScU9R2y8rvtUOOwjg6DnKJX5Udn3vQ56veqEouIt0z1ciBYviO1CFckQ+N40pWK9otwad48NkLgToaCMKGjsZlxz6o6KVip5FZxNKKYSK105UxIXEciVEI7+vMyFXBzs/gCeqjwGrgTsFpaPixgPsM0W79+CmIZU+4Xojm2eqT3rqGdQf4LzT0QVhgHYubnzXfO9UgAOnJi47yflpNAPPV4lxyven6Z6vehUsesGSA7IS0dIgbmxRTcX49TemooenkqVDNTPOmBYEtmHIBQoSOhi/GsdXqdsFKGxIO74UuiVBRsnKSdatGLFcxZAonN90ytVw+zp4omY+OikLhCwN0GbyIOcW/DtUS50pfOSq5W2mfLTz75yTAM44HnezD8NVFZUWrW7ceUlxy5IR+ewd6Xk6euQXz1fJ0Mrv5+mcr3qN4JXoROlJIMRqfa9iL9T++w4HXtWoTTHL76E0V+9IYaaDuiehFYt2jE5AJYsUJArDoVaZJuV5wD4pImVLusOU5cpcY56J1qRLrkqtbfBG7QzcqarS3JNiZ2lpkJaZMkVads6V48dQIdHwQegTjP9CuILSgO8SWialJVVSoshXqxo3Y63eAPDlsn2ooPC99A7AKUejZT7JhoD57ofgDu+5Ijh5vhLBURA36ZqvCLzoq5GUooGoEClRCwq0mrhXblxyosOgY+EdNuDLm88pVELVHOk0Pltw0hqF1kaatMhBvRiVLToGKUSSl4Q6KFbPPtnZ2SFWzFiukoCXx4+Nlivy/ny332QoQSUr3eTMsEvDkDr1PTLTLkL1rdafkwK91vXr+Sfl1tgsTqGzDCnUxcghAFMw/hX9ylm1xjqWiD4keb4S41hId0bPV7FXZ1TBqkF/A2m0diG4aqxX5GczEl/SFF+EiKwgXsnyUc8T/t9sCJAVivzrqvf5nZAfHh2BQ+EWhOZzuXbToc9EtMNUuhTMctWDTaH+b6RcPVh9Cu7+2pYRKDPl3B7rDC2HTR6XPIo5tWvW/rFS/BtDgCxaUqIdzhu29vwjayRhXIHWv2L0NyVrWJD+BZuheGALdO47W5HnKymKhXVv5HwVQy5qCB+QwHpFzu1tSSIKV+ALmSwgMeXKh4oVBeFiyh0EKPS/MHgoWSHJL8uFX46JiDR/WhrcLVlWJD2b5SoRcoXxzAi5OtXzJBzpfj1jgNlQ9jNNRx0CUFutXCspCZSnBBUEJjEC2+vF99I7ijHWjB+Lm1A/p6N4Vq0HWLep5/4Y//3R7DxfSVErzHsj5quY9YoQjNqbpj8uF9GoB+D1aH6lww3liBzZx+FLWGh+pSWjNRKTrVxZTjMfAiQMk3CSl1ozyUq1tkk5RAdp6VKX4xH4xViVYCcWy5X5xj9dLdIjV5XWBlhUNzhtsa6kfbagMFclUHSk+Y28D+CHyqKl6E/0bY+VJca7Ej9ej5srvzwWy1Oov83oyvDwc+iaIHyrIRhk7QsinskoMO5IuKXsPeD5KhlShfNcz3wlfQ9GlwiVoCOhbVdQrih2CC0JCpUr4kNLg0y5iQDNURRigfzohEQ+WZS2ASczOZIKFcXWImdRJWK5UkImP9P1yNXztXMyplwR+pleHhSOuANnY4o6PnM/XG7Hv7V2DINShj6RtfgRyySPwMeLxcrVQAzxQMuoIwbjXNbQs0RIzvFN+NHfTlZ2gSLmRLeWsuCmaCxAnq/k8S3EVD3zlRAveg8mVLBoaVD68owxGIYWCoqjJCQvWjqUrF3CfHxtXgSa0Z+BNjxIrVgVqDDVojzsUbFNvArzShVvYY9ZroRoFMZ1KnL1/aJ/wUj72owClMndg0odoyCb5MyOPt1MCRBYtgot65v6MhShxfxMDOtAiioRKVv0T0i0XEj+V5SH5qiXWg6Aqt08Xwkx4mtcUjboPRj1wVICtBWdn+WInAHphSulVAKRSnnwfXYRIO1daVMDxctK5pNFrY85yyv1hOVKCZn8TdcqVzYIwm8rfpFxQGiJkMn8COxApeiDz8TtnIPWv5hyJX7Sd0cKNCmwsQ9At6Wb56s+ePhqHwJa5ys54Og9mHA66UCLlJSogFJIB+kuMmlZvs8NBOicQTmiTQx0TiX+KJITBYSWFBMRy1UidPL3mRa5+lPFxeCxyBwVkGZ4Yht10lwNs9eBwFZ0an/hTbGf2pgRPTsxtbJ1W308X2kFrUDya5mvpJDE3oOKChatVUujdBOTfriLRe6sQnKEVhMrS9oQvjcfAtFzBhWUrBIK7oeauRKV4vNExHKVCJ38fqZWrurs2+H04seyAgZbsLICu+pKafffi2/hjmeBAzsFGz32MNUsRBntVrJVKBPPV8rY5PsTtfOVHA6x96CigkVHqEhFjxzblbbetyksJ8pVzmnmRyCRLx1ZMJUEJyZYSj1kuVJCpjDS1cjVbWWXonxJZ5/M4JPIOpuZFnAtcgiQ79T/cEnw1ffElqtS3ARw5nHoupDkw06OJ6V1RXCnVgLi+SoBOAXwSM18JQdD7D2o6ORODutSIt8rm8KblQSRKX8QUNo9Sj0kC2YtWjJ3y6zgxARLCQmWKyVkCiM9mVwNKuqGuZ63swcGa1jZw16hZtoF+O4CnG/2ijNU4c7mM1C5KsEPvlTJa0HzVwLi+SoBOAXwKNl8lew9qKhgySlMiZaG5PIXAP5520Uf7rSh6OzSnaKxDpMlk5zhhcfpkAO8Uv5YOTk5YbmKoZP/v8nk6trya8AGKHhMBY8ARWj/+EuAZasRColBk44XOukoPD9XZrOVFuBaIgMTZuf5KiE8ef8w2XyV7D2oWsGioKJuhdy0Tk0NYcovBChorFKwUDtaMqtxcmtAJStGZSrM9NIJi+Uqhl7h/CaSq6MtD2UXCMmLPLuNKczaO9Ey/tUKgG9W4nsF5yAh0ZmEh04HmDEVUw2wNq70HyRkH3fN81UcJAWXkGi+SvYeVFCZ4s+gS2RlICsGz0v5J3fJlGZaMhYqWCVJdg8SQtKzDVmu8k9ukvVISa7mWh8DVxZ2DgrbSx+LTNlBgBQrslitXIfxF9HnSkoUcPX4IwBqEq/qSYslvP/aNzfhc56vEsJTEA+V5qtY5xO9B1UrWIki3YZ5UophnVe/yXaFelChIgtU5z7/O4+iNPXBIp2wWK76sCmUKyW5Otbyr6xDwFNZ9obgRXS9I38rKVHE9emTeyK0GxkI1hsuAR+gM2kC4vkqATgF8khpvop1P9F7UPaVSF9xQt8aN5plyRSmRPzVp4RMbqfTod3JiJz8Ott6rPVKS8gxHixXMSQK+1dJrkZZ0HyRZYrIWE6y3KSCqb4Z5xEhuV0AB6BiRf9S3SUo5Ce9/tqf2HrF85UUscK8V5qvhGgovQdlFSyp1p5sZ5iwIr7OHwSCKj7nyQK1BSdGcm6PRUdWQoDlSgmZwkqXk6sDLG/hmYMSh5sswCK3NJWFZhRklbPRt2rBoh7H9RlTAKZN7Im6ni4wHuy8KSFrnq8SwlMwD+XmK2nnld6DsgpWUPIVl8y3Ri7wqLQBfJ+fCFDka1LA1fibslzlpwwY0avjLXcbwUY3D1awdEOYMgNSqvZDpcqOH2vppuZQFaz3H5CwGp6vEsLDDwUIKL0HZRf+hMuDxIOidyciYk5BSJkKE4FyNOUnWx4kZFiuClM+1PR6jPULNdnSnifMu6HTjnGiCjKhXFH9jzRfmagZ0Wc8XyWFiDMIEJB7D8oqWEJdyYY3yWIbUR1sxRIgXWCX5aiAq3FwZ7kqMMHQ0N0SaNaQO31Z2YKVPmzNwrkjUgYPtv1f0ubwfJUUIs4gQEDuPSirYAnKAAWPVEPkCM+UXwiQcq2GXLjQrCYGlpAXy5UQjcK6lsrVSPgSl5hVOPxlACZybOZNOxkAOotV/Lv9DzxfZRH/XKtaOl8ptV/uPSirYAmdldW+CNkRXgn23E1XY7mM9U6NBZPlKoZWYf9K5Wqm7XVTAcLLhKYaDkMbsyc8GF7qvEzVigvPV4ZCn7PMpPNVoo5I34OyCpaQAStYQjQK61rt2KeCilrerLingq65y0jHfhx8YqoGhySbfEzVOG5MygiEI1a4svHDlMpLZVaJCc9XSsjkbrrasZfroWEKFjk5s6O7HMS5m+ZMKh2p902t0LJcpY6xWUtK5arOst5UTQ3KHHRvqgZyY1JC4N/tt8KO4KiUyvJ8lRJseVFIOl9p6VSPl82d7HWgBTTOywgwAsYhsLSuFqqse41jqJMTRQ4vLdfJhIubCoGvvDPgsLWLTdUmbkz+I5BGG0X+g8c9ZAQYAf0IuKBbPxMDOQQ5VIOBaGaf1Y7AYJi39rPsN4RbUHAIsIJVcEPOHWYEzIWAw5L9CO5CRMjJnc9XFSKSu9ctoQqYsWYFhEA2pnbudoxbnhMIsIKVE8PEjWQE8hcBu0XFoZcZ7n6I/bAyjLjx1XWH3XDwmm+gPVhmPHPmyAioQIDVehUgcRZGoJARoBhVpbZ2qLA2Q6WjCcqtrWCFMFoFbNF//rATmoLVsDdUC20h7S8z4mU2omVCh9kaxe1RjUBbuAxmrV4G2/xDVZfhjIyA0QiwgmU0osyPEchhBEa51sNBxZ/CONdqGONeA2Nca2C0ax2oXcbzh12wMzAI1vnHwdpu+jcevuqaAcu7pkIgkjsqS5BWLT05PJAF3PSd/kFw4Orl0BquKGAUuOtmQIB3EZphFLgNjECWEBjq2ALHlL0Fh5Z+BIcWL4ABjp1paYkv4oal3umwsONweK/tWPjCO6tX4do8yKLqsPC0NEyBqRWdJyqrFR5ysmkRWNE9GWavXso+V6YdocJqGCtYhTXe3FtGAPrbd8NpFc/BWZVPo7WKdldl/piajnApvN12ArzUfBb8reQM0ylYJCYVlQA2tvHnzF/MU03nwSVbH82Z9nJD8x8BVrDyf4y5h4xAFIGjyt6Bn9X8BeaVvgdWi3liETTuMecAFZcCuN3mbBu3qg+B7ogLzt/4LLzRfnJfIl8xAiZAgL/PTDAI3ARGIF0IOCwBOLPiGbiy/50w2b0sXdXkJd8A+mGxgmXuoV3tmwBHr/0YmkNV5m4ot64gEWAFqyCHnTud7wjQzrwLqx+AXw+4BQY6tpu7u2RHz/wqZVJM+MicpBBlLQPtYL1j93VwS/1NWWsDV8wIJEOAFaxkCPFzRiDHEDis5EP406Cfw2TPNznWcnM1N4zRI4IYosvOs6SpBmZx5yw4c9Nr0BisMVW7uDGMgBQBnjqkiPA9I5CjCAxzboZbB10Dp5Y/n1M9sKIFy6yR02mZkBUsc4gTRWX/0dbH4a3WE83RIG4FI5AEAVawkgDEjxmBXEDgkpp74LaBV4Pb2pULzRW3sWerjTjNJHd+H4bDKjJJYwq0Gf6wAx5qvBSu3nF3gSLA3c5VBFjBytWR43YzAohAP3sD3DPkIphf/nrO4hG1YJm09bRESNY1aiNTZhEIRuzwVNMP4Mod90EATwtgYgRyDQFWsHJtxLi9jMA+BI4pfQvuG3YhKlm7cxoTi8lPRA2gFcvF4RoyJmNhPIjpxZbvwE+2PghdYTYfZgx4rshwBFjBMhxSZsgIpBcB2iF4y6BfwRW1d6W3ogxxt9kAzHy2sg/9sFjBSr8wkMXq1ZbT4Gfb7udjbtIPN9eQAQRYwcoAyFwFI2AUAsXWTnh42Hfh+PJXjWKZdT4OPKKw28SuY2TBiuAyoYWXCdMiKx2hEnh47yXw2/rb+YibtCDMTLOFACtY2UKe62UENCIwwFEPL4w8EaZ5vtJY0tzZ7TlwBrSfrFguc+OYa63bFayDP+66Af699ye51nRuLyOgCgFWsFTBxJkYgewiMAWjsL8w6oTkQUOtLnAMuQpsNSeBxTkg2uiIfycEG16C4LY/Z7cTCrXTwcpkHDJhrNHeFlO4BlaweuFI+SIcscDXXdPhhh23w0edR6TMhwsyArmAQI/R+04ygDMxAoyAGRE4tHgBPD/qRCixtidsnmPU7eAYehVYrPImoUiwA/zrfwXBHfcm5JONh02NqGBhYE+zEu0irOS4likPDy0D/qf5u/DbXXdAe7AsZT5ckBHIJQRYwcql0eK2FhwCM4s/h9dGHQ3F1o6EfXft9w7Yqo5GP6GeP+lEmYON74Dv6/mJsmT8WVsrOrqjlcjMVF7JQUe1jA99ta/BswJvrb8RXsJdgUyMQKEhwEuEhTbi3N+cQWBa0VJ4aeRxSZUr9/SPwVZxiOp+2auPhcjER8C/8gLVZdKR0Vp9AthKpqADeRA8uz+FwPZP01GNYTw5qrs6KJvw4OUXW86Gm/GcQD7ORh1mnCs/EWAFKz/HlXuV4wjUOXaicnU8lNtaEvbEWjUfrOWzE+aRe2gfcB4Edz4K4Zb/yT1OX5pzCLinPgvW0umipUzXGICSzq3QtvIP0LHhfqzffOuFFHSUSR4BHwYCXdA5D27aeQss7Zohn4lTGYECQ4CXCAtswLm75kfAZfXBO6PnwoyiRUkb65mzC6zO/knzyWUItX0F3Yunyz1KS5pj2HXgGHUTLmNi4KsE5G/+BhoXXQiBlqUJcmX+ETnjV1Znvl6z1hiK2ODb7mlw754r4Mmm883aTG4XI5A1BNiClTXouWJGQB6Bvw66TJVyBcWTwOLoJ89ERaq1dH+w1f0QIu1LIdyxHEukL9ynHXc2OkbdospHzFk5Dfod/hbsevcgCHm3qOhJZrKE0ahG/0jRKlSiYKDLuvbD0AqXwmNNFxUqDNxvRkAVAqxgqYKJMzECmUHg3Mon4AfVD6mqzNH/XFUKixIzcoh3T3ww+jgS3UhMGkQ3RILtEAk0QsS/CyLd2yDStRFCnStRCfsWoGsd5te26dhSPA2cY+7S1Fabuz/UHvYa7H5vNrYnsYO/Uv/SkR4MATgLTMHyRxzwjXc6/Kvxcnim6fvpgJV5MgJ5iQArWHk5rNypXERgkGM73Dn4Z6qbbnEPUZ03Wcae3Ye4dGcrBgv+AxfF0JoUVyyqiEVQywh3oeLTiorYXoj46lER24pJ6yHcuQrC7V8D+Hf0lnVNelSTchUr6KyYAqVjr0C/rNtiSVn/DdFOR/koGFlvm5EN2BPoF/Wpun/vZfBJx2FGsmZejEDBIMAKVsEMNXfUzAhY0Cp039ALkzq1C/uQDctOVBGz4LRhLQWLvRTAPRigdD9hs6LXPYoYLjmGvBjboDzuudqEklGXmkrB0ma7U9vL7OfzRZywsmsyvNxyFtzfdBnHqsr+kHAL8gABVrDyYBC5C7mPwA+r74d5pe9p6ki4fbGm/HKZI6FuVJac+MiSkpVJjiel9ShiyDfKWylX8nR78RCwl4yBYActTWafkkcZy34b1bSgM1wMa7vHwQftx6CD+gWw1jdOTTHOwwgwAhoQYAVLA1iclRFIBwI19r1wY911mlmH6p+EyIQHUZlJzSkogtYl74e4HEhk9YC1ZBpY0HHeWjQOLJ4RYHUNwuN2+qEjfQUuHZag1uQ0VAnrqTj5//aSEaZRsHLRwZ12+zWFqmF190R4u/VEeKL5fI5PlVzsOAcjoBsBVrB0Q8gMGAF9CPy+7jdQaW9KgUkA41h9ArbKOSmUBQjueamvHPpUhds+B8B/6GGlTPZqXB2cBtbiiWApGgtW93CwuAaiElaDS4a4FGgrQkXMYawihvzMQjbzNEUWkq5wEez0D4IVvinwaccceL31FNjsHyGblxMZAUYgvQhwHKz04svcGYGECEwvWgwfjT0I86To3WOvhaJDN6NjOio2Goj8t7wL0ZE93KmhlIasrqFRRcyBTvv26qM1FIzPGmhfB52bHoHOzY+jS9e2+AwZTKmuzWBlKqu6bucd8F7bcbCyO35TgkoWnI0RYATSgEBqawtpaEihsSxH95RSk38NF9qYZKO/twz8FVabonJFDQ7uge4l8/C4mYR2J1HXIniqcvdX89KnXFFtPtxVuPc18K2+DNumo3/IylE6Biqm3goDT9oC/ea9D8XDz0NrGS5ZZpgc5KpmQuoMlaZdueL5yoQDnwdNyne5YgUrw0JahIuyY/HQ2Co3QDtusmIqXARml3wMc0o+1A1AuP0LDJWwSxWfSKAZo7cfhKEUvlSVX3em7vUYvzSV5c/4mqNxu/ofAdWzHoVBp+6C6oMeA1f/IzFjZqaxoszrdPEgyKTMK9O2OUKGhWISz1eK0PADHQgUilxlZmbSMRBGF3Vgj/t50FUkw9uBqN7hZQAT8KgNut7abnTPmF82EUhFrq7tf7MhTbb1OyfqByVkJrQa0XXYvxv82+4B74LazClX+xrkW5OaFYvaTdY2ObLai6F4xA+g/7z3YODJW6B86m1gL5sgl9WQNBd+ENkxTJgZaW7xB6hiyuOUant5vkoVudwol8p8ZUTPCk2uCtIHq9IFMBSVnV3ofrIHw/QYOzXFi2EZLi2MQP9fOypWYVwtWdUI0K1+RSeeIaeYEgEtcjWj6Av4MOp7pb8rnjkNGA2hzzmox7+qH/pA4aG7VhcqVEtxKRGFLovkmvYm2GuOU90CUq4CW/4EgR33gQWXUW1l08FVPTNpeV/jYvTXehS8W59BpdKYPttxKb8cN1Kameas/RKWYrR1I4jnKyNQND8PLfOVEb0pRLnq+SY75sYbjQAwV3iQckPKzkA0+VejNcuLS3X+NGhZpL0OxF3ww1C5su6zmG1qBejgpcFcERVN7dQiV3cPvhRGu9dq4i+X2T74cnD0P0v0yL/hetxduACXDbdihPWNqNV3iZ5n4ya0+0mwlh+C4R9GJt1hSMpVcMf9EFj3c1QMWwCa34COTf+G1nWoNAVawV48HBVK/KOSIXvRIPAMPB5Kx10Fzsr9IRLyQbATMdDgoxZjS3+yRfj3W1IaSzHv74quqbDEm1wBTdQDnq8SoZN/z7TMV3p6X8hy1fPavxNntAIj6vgY9IUq3ee4Wo/HndWjRcsoIOxYAVmtytBaFqMmfM9taovd8W8+IqBGrqYVLYVPxh5gSPeL5raiwzeaY/dRBP2dvAtwHdqkZKu7CFwTHlBUssL+BvCt+gk6yL8Y14NgEKNINNPfqAVc/Q6POrsXDTkTrI7EzlEhX2PUokWWLX/T4ji+cglW/PQsRVjtORLIhoKF/njrw3JdUZXG85UqmPIuk5r5Sk+nC12uCF+AAlSwqNs0+OQT5dznW9GJliWyMPl0Lt+5kB85ssf4Ul1BtJCt2Iu/RmlwxJTJlAgkk6unRpwBJ5fHKxBaO+MY8TtwjrxRVKx75YUQqn9ElGamG2vVceDZ/83eJkX9w1oWQti7Hq1W9yb3D8O/o078EOrGAPREFJ7CM/h0KBlxPjq8H4GKG5qmE1CgbTUuIT7WE/Kha7soJxV14QeXB61WuRZQdGX3ZJi5+ltRf9Te8HylFqn8zJdsvkq11yxXOD9FwStQBYv6TttER6MyFCNShNbiV3IXfi2nQk6cpMdViZUr4kOKW9O+l0IqfLlMbiGgJFcj7cth0fip2Bm9mrYFig7vEMW/Cvt2QtfHg0wNlHPi4+Co+35vG8O4+7Hr47ree7UXYfw79aKi5fchkvugtHkGoVXrB1HLlqM8scM7Oc+TNcu38xU8l/o+cNiao24Daus3W74wRms/a9Or4LZ0Q4mtHYqsXugKe6AzVAJt4TLY4BsDW/zDo9Y/Ydt5vhKiUbjXSvMVvwf1yUTBK1gE32h0YC0XLOWRkrUOlSyvRiWLdkiMQ2XNJVlWaMWXwHp0JWEqLATk5OpSz4/hB1X36wbCMfZv4BxyRS8fsgR1LzsVl9Ze7U1Te7GmewJs8o3CCO42mOxZBsOcm9QW1ZzPM3sjnsozordccA/Gylp2cu99KhekbAXQ+hxTtujeVXs0FI26BNz95yddQiTsIl0bILD9Xghu+xs2QacJO5VOZKCMF88fXNa1H7zY8h14vvkcaA734/kqA7jnShVy8xW/B/WNHitYiJ8bl/Qm4lKhpQeNKKIhnKRJKVLrkE7KFS0LuiXKFe0apKXBdDjR6xt6Lp1uBKRy5bZ0wkv966DI0q6vatwZWDS3DSyCg5TD3g3Q9dloTXxfajkLbt99AyzvmiIqNxwVrNMqnoMzKp+F/TxLRM/03hQdEcC/s74/ku4V50No12N62SqXxzMWHSNuAHvd+XiUYp2i71eMQSQShHDrIvBvugXCTW/HkvPuNwR2eK7jcni840boiOAX5j7i+SqGROH9SucrQoDfg/rkgBWsffgNQj/ZAeh7ISSabFY3JV8uJBDH47JgkUxk9p37nOeFfPm6cBAQytUJngfhVxUX6+68dJktar1aMhcVg4WqeJMl4+Itj8OrraclzT/CtRFOK38OTq98TreyRbsIPTM+7q2T2u39ELfxhtHEmwlyjwTn6D/g0T3Hq4oET+EugntfB9qVCbQbMw+pNVwDd7fdDe91nRvtHc9XeTjIGroknK9ixfg9GENC+y8rWPswQwMUTK7BIKD7HN5jUPpwmZCUrETO6YNROesvUc6oPC01LkfrVWifj0iMJ/8WDgJCubqvZhZMcCzS13k8ULnosEa0xPQJaqj9W+j+Yqoqvk3Bajh149vwlXeGqvzCTCOdG+A0VLROR+vWNM9Xwkeqrp3j/gWOwZf05g3790LXwtre+0xeWKvmgxMtW9bymSKLmlwbokuI6N8WrH8UAptvMUXYC7l26kl7u+sCuKPlH/BlQ3HOzVfF1k44uuxtOLb0TRjk3AY1tr1Q6WiC3YEBsK57HKzqnhhdFuVDr5NLiHC+Eubm96AQDfXXrGAJsBqA5+UOkol507bPh0pOT6LgaRTuQY62tQE0ZD8EkVzTOC2DCJBcHVS5Dp6sHau7VtfUV8Fee1IvH3r5dy2aBpHO5DvIfBE3nLD+ffi8c3Zv+VQvhji3wvFlr8EJ5a/gcT8fgcPiT8rKM2s1WIvH9eYLNv4XfF8f03ufnQsb2IdeBY5Bl6qM0RWGcMe3ENh6Fy5tPp6dJqep1jW+yXDqhjdgm39ommowlu0k93K4vu53cEzpW+C2Jp5oIxjr/r32Y+Gvu6+BjzrmGduQPOPG70HjBjSvFCzSvtFolDKRH9UUtGIJfbFizCjq+46O2F3PL21vJd8tqdWLnvrRT5Z8r/S0R1wb32ULASPk6k/Db4Uflf1WXxecg6Do0K0on9SiHgq1fIqHPR8Su034e9GWJ+E/zd9NmCeVh2W2Nji0+COYW/pB9N9kNyl78Z8jRfN8Ir8x35qfQnD7P1OpMj1l7LXgHHUL2PufiTFcKhHnnulRqbIILm2Gmj6AwMYbMLyENl81a+UxYB/0I7AWjcYJxwkRPMoo1Pgm4vH3zC2ZynSsITgAztz4WkoWThl2aUmqxB2f1w/4HVxScw8GcNa6IcECf224Bm7ceSsE0Q8tH8mI+Yrfg8ZIRl4pWBT6n2Jv7MGPmVSX5UZicNBKPHdMSnvxSJ0t7eJU6a4L4dMtaL3am/ijSpidr02MgBFy9dXEaTDWuUxXL90HfAi2yrm9PCjUgPeTERi4bWtvmtLF440/hJ9se1DpsaHptw26Gq6ovUvE01I8BYpm9fU/6n+1AE2/wVZRPrPcWEtngmPUTYj34agUCrYYyzSQ+kIHWgcanoXAhhuwT40yuXqSrLVngHv8v1CnqpbNQ0pbYOONeEzQH2WfZyKxM1wCZ6GStaDj8ExUp6mO+WVvwL+GXgDVdvx61UGfdRwKJ298NxrKQgcbUxY1Yr7i96AxQ9v3KWwMv6xyacalPAruSb5U/XFZJvH3p3xT6WxCKdFOip1owRISxQ0RhnYQPgvgR1VjCspVCTrJ0x8Hk7kQ0CtXY11rdCtX4BkL1orDRMCEmv6rSrnaHhgGt+y9W1Q2XTe0XHNF7Z/j2NsHXihOI8XKpMoVNTTc/gUuX84H7//cEN3piH5uSgdPk6WLFCbn4J+gf9we8By8FuxDrkIu4hnIMfZucE95TlG5onpJmSNHfM/BG+LK0/NMULG1A14ceTwcWfpuwuoyOV/Z0d5088Br4fmRJ+lWrqhTB5d8DH8f8uOE/cvVh3rnK+o3vweNGf28UrAIkm1oZaLgaINLe3b2eTRagdsxnk63JP4VHaETEKz10bRJuy2UiCxX8QskSrkBirGNY3CnNPFsydCGKuXW8BM5BPTI1YnlL8ux1JTmnvyUaMkqgmfr+ZZ/TxWPO5r/CTu7ZHZhqCqtPhOFd3hoOLUpXvptlUeJGJEfU64QhZGgTQTeD8vAv/l23PS4E5Wt+D5Sf0jZshaNAdfYP0PREX5wT18ItBzoGHY9Ovj/VDSGifpvLRoJ7hmfJsqS1mfk0/TsyFPgsJIP4+rJ9HxV59gJb445Aq7qdzu2RR73uEaqSDin8nG4uPo+FTlzL4ue+Yp6y+9BY8Y87xQs+vPb2NKzg4/CJkyoAqjDd4v4WzIxeEIlh5StBolVi5YQPTIhGWJc1S4NUptoB+J4XC2g+FkbsN3GTR+x1vCvEQjokasjyxJbApK1j5arrKUHiLIFG15IuBQVy7yw62R4tP6EtMsVRRB/avgZUIH+MXJESoeQgo1vCG9z4zrciUuA10aj5Xs/HQuB3c/hGdISx0xBTyjel63iUPAc8A4uN96sWrmKsbCVzwLHmL/GbjP+68IxfXbkybB/0ZJo3dmYr44s/S98Nm4/mF28MC39v3bAzeiJJfmiTktNmWWqZ76KtZTfgzEkUv/NOwWLoKCQCuQDRUR+qgNRiRlVAWBTqWV1+HvK0v8UF0ao9BCLgQmMAS14HI6aoKIU1I1iZ8XCO5BylSgURF+L+CpbCKQiV3RkycFFn+hqsmvSY6KXcyQcAP/KHyblSTunrt9+W0bk6q9DLoOpeIi1LLmH4+F+fWvfZP0J1j8imzVnErvXg3/5d9CqVQpdX58IoZbP0Kql/KJO5jCv1G8HLjvizKX0OO3pJdZ2eHnkfJhStDqj85UVtwf9FncIvjxqPtTY96StnwPQOnZKxYtp459NxqnMV8L28ntQiEZq13mpYBEUpH0L/aDIX4oirdNOwWREhz4T0U5AoRZPaTWe+KNwKD1GaqxX5L9Fh0zHApPSDkWtx/LE6uPfzCKgVa7m4BKL05r6ui8tL1mKxoo6Gdz5MDoJSZwCRTl6bl5p+wF81TlJ5omxST+suR++X4VtUiDHwItFCiKEsO24ay5fKIzWuO4ls8H7gRt8636FB1dvVFxC1NpnitZvG6BuKVgrb7X5yaH8lVHHwHD3tmiRdM9XAxz18Nroo+Ha/jfhygP6ZuCOTmvlEdGlVsBo/EbTDxLIrtF1ZZqf1vlK2D5+DwrRSO1ahbqRGmMzlNqO/ljkcB4jUmjIakQ7DRMRaf60NLgb3wNS65U02ruQD9XVJrB+CZ/FritQ0SNrmnWfNY0CuNUrrzLEivGviRDQIldyPixauuKa+IBIOYmEusG/5rKkLIIRJ1y/7fdJ8+nNML1oMdw58IqEbGzVx4qehztXie7z5yYEwa134JFFo8CLB1gHdjwAkQCapnWSvfY0nRz0F+9n2wZ3VR0NnvDetM5XJ6G/4hfjpsDcsk/AMe4e3DTQEg2s6zng/ehSa9GhO6KHnDvG/kN/p/ZxGO1aaxgvMzLSMl8J28/vQSEaqV3ntYJFAkIO6kKiXYbkUE4xrBIRaf5Sa1QpWp6ovBJRGaFCJs1HyhVtfxWG16GlTIH/vLQI35sQAS1yNb3oi5R7YOt3DlhcQ0TlA9v+gveCrwbR076bR5ouhS2BYX0JabiqQcvGk8PPTGqhsxaPF9UeyuMz/no7ihY6/+pLwLfm8t6kVC8sLuOtNqm0Zah9DdxWdSK4kgT1TIU3LaX/Y8gl8PSI06CqpBTjvdVHd2VaHOWiD4zojk1bMR50fjmex9kK1prTU6lOVKbOuVN0n283WuYrad/5PShFRNt9XitYBAUpSWQlEpILHcpH43Jhos6TVUmq+FTLxMcS8m1FBUuJaOeNVLmiNW7arcGUewiokSvyI4k5CKfSQ+e4u0UvFzobL7DhuqSsguCAP+36VdJ8ejJY8FPioWHfg8EY0T0hOfvjH1qf0yL5XwV2PpKwSD49TOQEr7afkYByXC21PIzKd4BnETwy7FycO6WzY+o1HIIO7J+O3R8uqH4Ajy6aC0UHrwGLAyfoJGSxl4F76nPRMkmyJnzcEEQZzXNSM1/JQcDvQTlU1Kcl0jHUczFxTrIoSWNYUXOLcblwBFqTlEg6fZCDvFwA0lh52rXdrrA8SNaykWg1E1quqBz5MjDlJgJq5GqCeyVQTKFk5Bh2XTTuUdE8P27tD+O/EH6dt4PVWSsq6t+kbsnv5ZZzYWdgkKis0TdX9rsTjkgSJ4nqdNRdJFISIYy7QPL04GQ5jMNti3T7Y4Xbv5ZjnbU0Oh7pjsFX6q6/yt4E9wy9GN4ZMxdGu3uW6dz7vYqxwHCpQCXRqQbuA97BpQWxpVdl8Wi2jb5RWrLnZF4185Vcx/g9KIeK+rS8V7AIimac06VWLEqvQItULTqtq6EqzCtVkITlyPdKKoyx58PK4pcWvWi5alVQyGLl+NfcCCSTq8meZYk74B4Z9S9xjr4VYyeNxBeLI6qM0EvDYhcHWotgpPDg1jsT89v39M7dV6vKl2omssrdWHe9quK2muNE+cLedaL7vL8hZ/4Q+gHoIMfgH+NS2Ek6OBhf9Mc1/4Cf97sjJcZk/TwXY1B9NX48nFf1IPKg1z8q42P/hnKPk6VGouCs7qkYtiRF+qTjsBRL5laxZPOVmt7we1ANSn15CkLBoj9fqT9VDAIKSJrM6Z3yVidRxJSWB2nXISlyUhLucJQ+4/vcQCCZXI1xr1fsCO2KKjp4FS6FVCnmET6IhEkbT+I4iDkWdh4Ly7umCIsael1s7YwuEdkt+IWggqx4RI6QQs3vCW8L4jpQ/6iufloc1ahAvALumWjJQqXcLHTLwF/DWRXPqG4OLSueWfkf+HzcNHhg2Hlx4RfowO1UyVo2Q7QUrYXPCy1na8mes3mTzVf8HjR+aAtCwSLYGtGKJUe0m284fjQlenU5ESVaUkxEHTLvGwJXKWYWOQ8y5T4CieRqSvEG+Q6iT5J7v7c1LYVYXQNwKeQDeX6C1L80pNd6ddfgn8Eol0orlBW/XiQWiWAB+V/FhiWw9hcQ1hmWgpy7baXToGj2OnBOfg6VCdwxk3WKwIPDvh89dDlRUzzoFP/9qkfQYjUBlfNzYJInPoq/tWKepr8HaX2ET9xxTNJMMvdfd02HNd3jZZ7kZ1Ki+Yrfg8aPObpeFwbRUTcUBFTOmlSCS/5koVKyctHuwURE/lfS43Uof78iNHvL7Dqk+CJqgpEmqpOfmQOBRHI11CmvYLmmPBtdDtTaA2vFXHyJXALBnffLFt0YnAjvth4l+8yIxDMqnk0Y70pah33g+SL/K7LCRTrjX67Scvl3H4KuRfujcrQRLDYZc7ZMh6NH8WCUeIsdlVQB0fKxo/+ZYK89CQ+FvhkPhb5V8DTzl1ZLCP48+HI4r/oheGTvxbCse7/oAcrl1lagJfLZJQuBDmguQstnIrKVH5zosapn1tLpqvIJM92+67fC27y/TjRf8XvQ+OEvGAWLoCOfJzkFi56RpampS96PKpmCRWcfkvlVSOTYrhQzq42tV0Kocv5aSa4qrHvi++YcBLbq4+LTVaTQV7pj5O8UFazHmy9XwSW1LEMdW+BujYfj2mpPEVUW6dooui+oG389hJreR8XohKTdjoSD4Ft5AYR2P4njfSueY3h1nHWn51DoW8A+9ArwrTgfwlkOfbGfZwn8dciSpH1TzCDxOVTMl+iBTey3mCgrPfum6wB4rfXUZNny7rnSfEUd5fegscNdMEuEBJvSLj96RpamWrQ4yVEyBYsc1qVEvlc2BXRJIWPKHwSU5KrYgpFuJeTA+D2kKKVKFopkbUXhkpA3UgrPNP1AkmrMrQ2tFLQUVG5r0cTQVrq/KH+o+SPRfUHd2MvBVjM/YZcjIS8EG14F72djosoVZQ5svB68H1VBcM/rsrsRrc5+uNz8JrgP/Ar9s4Yn5G/mh5HurbqbF/Ft08DDAtftULdpRAPTnMiqNF9R4/k9aOwQFpQFyxfqOf5GKVgoWZxomTAkMEeR459S/thQyClMiZzi5fLHePFv7iGgJFdF1vjdY9ZSdMbVQaScWcvnQLj5XRGXt7vOhz1+8XKSKIOOm1/3vwUOLvlYGwfyEbKLHfiDux7TxiOPcrvGP4iKdZ+/AC0Bdi8+ECeXAWDBcByR1R0UQQAAQABJREFUjuUQbv9Svsd4LJJv2Ul4ttZE8Ex9Ho9OGi9S0kkmbGW0BLkBgrufBf+K85CPzFefPPfsptqrwTXhAbDhkqdeCu16RjWLRxovho865qnOn08ZlearWB/5PRhDQv+vgo1FP2OzchAeYCltox3RkAYTLUvif0U8pAoTBRV1K6iu5K9FAs6UXwjIyZUT4ndWWNCSoZcs6PAupZc6Lk+LXB1U/BmeCXeztLqk97b+54qUADoIOdz6adJyeZmBrFf9xEtR4ZaFqFAtATrHMFT/iLJyJQTEuxK6Pp8IvuVn4xE8zcIn0euof9aAc/AomTawD/t13HNTJaC1zbX/eximpAHs/U5DWVGYMFU2msKYhNvVnZpQjzHirt95h0rO+ZlNbr6K9ZTfgzEk9P8WnIKVTLmhpT0hlSTZPUh5yXFQSImsV2QdExjIhMX4OocRkJOrrki8Twi9CPRSpFu8FLLEdyRsDIw3XK7clm7415AL8NxM7V8E9tozRN2MdG0V3RfSjWvCw/HWq5UXpgxBqOE58C6oAv/m2yESjrdUkSO9a/QfwYPHzVgrj0q5nnQUtBRPA/eMRVGHf3vVkYiL/ldQ1Bq48keqmhsCO1yw+WloDen/0FFVoUkzyc1Xwqbye1CIRurX+qU79bqzUjLZ7j0PKlRkgYqRR3AdS5P+ShWsRBHfw6xdSeHLi3s5ueqMxE/i4RZ9fkiRSBjCLR+LMHup86eQDrn6v4G/7Y2wLapQxU00LpEgX6hV3GbBo/y+tFfi8tfJoj6GWxYYEs0+sOFa9M+qhuDet+T9syi0x/7von8WLj3qiHQuanyKNxSGwTNrJXgOWgq28pki62aMJSlKYf+e2K3q33D7VxDe+6Kq/L/d8Sf4pHOOqrz5nEluvhL2l9+DQjRSvy44BUsuorsUvpizuwUfKC31xcrQkp/QZ8uNbhZkYlUiys+UfwjIyVV7pCKuo4Ed/8KXocTkGZdLOSHiXYsP+6wWDaGh8In/JOSpXCaVJ7Q0+LPav6RSFMtY0K+on6hscNfTovtCuXFNeCjeehX1kTIIgXA7+L45HryLpkC4c02cotXjnzUdD0/eDM5JT2KlKkzyBjWN2FjRkumZvQljuL2PR1JOUFCswhBqXoDO/eOha2E/CDZ9oLoFtHGie7E6v8bnW86Bv++5SjXvfM4oN19J+8vvQSki2u8TqALameVCCTpZPBmRBYqUK3JuT7bhS2q9SrbjMFnd/Dw3EZCTq02ByfGdCTbjy+R/8ekqUqJLId+eI8r5gpesVyioBhItDd439EL8G0hNEbTWno5/N31TS9TqluUwAgbCo56VtQitNeL4TgE6T9K3VT0PtTk7V6B/1nj0z/ou+mfF7/bs8c/6bo9/1lANwWhpswI61wMFjdVAdozK7pmzK+qUb/UMV1CsQtHdkd6PB0L3V3PRmZU+HhCepUeCb901uPyJcXUUiHz6/Fv/huUOV8ghTv64Yy78eOsj4sQCvpObr6Rw8HtQioj2+75ZUHvZvC1B0d1JUSJrVDIKSt5ByXy25AKPJquDn+cmAmuD8oEPfUuPw6WQvZo7FWp8GwN1ftNbbndoGLzY8bPovZFy9X91N8AY15reerRe2PuLlcCIb6dWFnmR3z74J2Bx9e/tCyk+ga1/7b1Px0Wo4Rn0z6oE/5a7lP2zxtyB/lk70T/rCPkmOPuDa+pr0QPHiw7vguKDV6Bi1oqHkAfwuJ5v8FxE8ZKnkIlj+A3ouN4CrvH34mHlfX0X5iG/sUD9E+D9sLJnd6RMlHs6d9P7Pxf4Vv0YP0g+BDrDMty1CUKtn4N//W+xbBkE1v1cyFbxegUeHXX2plfAF0ZlkUk1AvweVA2VYkYVHkaKZfP6QTn+LfpV+PYKlwcJEIqGm4hIaCkIqZoviER8+Jl2BEbbVsBVnl/DNNunsD08Eu7r/h18GNC/PVypJd/6Zys8CmBk7/3Q0Xe96sje9JKhpSAh3dd+O/gBza1IRsnVzOLP4Wf9/iysRvO1rfwgURl6KRYcofXKOexXom4HtuGSa6hVlJaum8D6qyGw+WZwTX4WbFVHx1mQrK469M96D8Jti6F72ek42e2INsXW/7vgmvQY5hd/XfbEbrPjcT1T8VzEl3vKfXkolqHlahs4UGlzDPoxyrNCMEHMFQl1QWDnvyGw9pf7yuFPEqJTC5ROLkhSNPp4o280nLrx7YJ3aleDlVwefg/KoaI+jS1YCliVo6KkxsEddaVesuFNsphZlNlIa0Nv5XyREIFaaz3cWzwf5tjfgDJLM0y0LYG7i0+G8113JSyn5+FK/yzYEpwgzwJfaN6Ph0IIHdZp6U+JaHnNv+0eXAqZJ8qyPDAbPug6W5SmV66iS4NDUl8ajDXG4hoYu4z+hhqeFd0Xwo1j8GUiP7Qe69XfMtv1YCv4vj42ekwPWYCkchb1z0KH86JDt4Jz4qMYNf4WVK6eiFOupI2OlfMcsgnLPQJF87zgHHqVonIVCbaBf+ONaHUqQuXqCmTX50Mo5W3k/frusTB//YdQHxDLo5F15Dsvfg/qG+GCU7BICVJDLrTtqYmBJeSl5jRyyq9m6VHIl6/1I3C640Hob90ex+hK929gon1JXLrWBCW5etV7qTKr4B7oXjIH/83FZZCP0HemCZd1fPil74Vw9w4I7HoSlbDB+FK6XMSjKVQHNzeTw7KY9MrVDXX/B2Pdq8VMNd5ZK48RvaBJQQw1qNvhpbEq82bHw7wdUuvVVrQKZsh6JQWGlpW7PhuLx++cD6TsSCnqn1V3HjhHXB9n6ZLmFd5b3YPAUYfnTVrlzfa0I9C35qe407Ecor5nwsJpvl6LBzjP3/Ah7MSYV0zxCCjNV9Kc/B6UIqLtvuAULDUWphiEaiwCQid4tQoWO8LHEM7c7zzny7KV2S0BONf5T9lnWhKV5OplVLDWBuR9sWL8w60Lo8663gXV6Hfixi/9Yuj6ZDBG5P4+Lt3Ux7JFfzvD5XA1OozvCg0XpdONHrmipcEr+um35tnrvitqVyRA2+5VrLWLSuX2TfQ4JIzOHqOo9Wrb3bHbrP2Gdj0eVXbIOZycxNNB0VALeOxN97dn9+wI3K7/b0trOz/vPASOXb8AdgXwWCkmWQSU5iu5zPwelENFXVrBKVhqlSB18IlzqeWt50UorpHv1CIwwBJvvYqVned4GRyoaOkhpbEPRpxwY/N/oD1cqYd9tGxnuAyubX4NNgSnyvJKVa7sEIS/D74k5V2DwsbY8BgfIYVbMQaTiYlWZ1ONISZblqxXQ68R9TiADttS61UYN8ds3Nz3r61dVCStN+Qc7l1A4RDei1s2TLXiqGLVuRq6lx6DHwfD0GqZnWXhp5rOh+PXfwB7gn0Kbqp9yudySvOVEX1WyzvV+cqINmaKR8EpWM409litYFFsLXJ0ZzIHAuSTNdOuPvaOXKsTydWO0Ci4pPFLWBc4QK6oqrSv/XPhwr3LYJlfrMAIC6cqV5f3+ytM8nwrZJXytcU9VFQ2uMfcy4OdXmyusgucqC/SG7myjiE/Rd+rmt6stOwbkLFeRcv25gJwya+yCXIYfInhQnxLj46ehxhBXy09RMvAdK5i1+cT8IzM9/SwSrlsBKxww87b4RIMxeDHjxqmxAgkmq8Sl0z+lN+DfRjhq76waAt+KdK/dFA6eaejvYXEM4wTcCI6Aq1YnwSOTZQl4bNkY78ERsK79Z/CbQOvhotr7sN9V+qWaPbil/ifG66FfzT8HKNSJe5DwgYqPBzs3AbXD7hR4am2ZGvZLPTH6ZtSyKoR2v20NiYZzt3egWGeJMdjqW1CXFlbCVqvxDGmAltx2TUUP+F0dvbVQm4GzizpBHQeYgR9pfSdkYkR0zqX93Uow1ed4RK4cPNT8GbbSRmuOXerSzZf6elZOnnraVc2yho/Y2ejF1wnI5AEgZ2R4QlzzLO/gktkKZoyEnLue0hxeH65/e8wbsVW+H39rbDZN7LvoeDKF3HDB+1Hw/mb/wNjV2yHuxt+kRbliqq8Y9CVUGQVvO0F7dB6aUNHaREFm3D9rUuUZKabIOq4Xd3JgwnLtVmurGPwz2SsV3+PKx7A1WivABZSroS+nHEFZBJu23UjLO+aJvMkhSRbcQqF+opEQzjY+6x2fU/Sf7UtMAyOXPcpK1fph5prSAGBvs/NFApzEUYgVxDYFBoHU22fKTa3BsM4TLUvgm+CsxTzGPWAnG/v2H1d9F+ZrQ0GO7bBILQkdYc9sNE3KrrzKRI9S8CoGuX5zC97A04qf0n+YQqp9srDRaVC7V+L7s1200IrYynq1HFlbaW4c/CXoi4Gttwha71qkWzkc2u0Xi3vngp/3HUDKt6/hMeGnw3HlL0pqlfzDS0RYlysVCka/mFfHK1UeaRS7r/tx8ElWx5lf6tUwOMyGUGALVgZgZkryTYCm0LjkzbhaMfzSfMYnaEtVAYruyfBf9vmw0I8zmNHYDC+89PvoOexdsFdaHExkiyeUSJ2oT2viu7NdEMWKFriI9JqPZIr6xiC1itHdQ9D/D8SaISAzA66EG6o7NhXbyxzkXJszlgW0e+12/8StWh24NLYWZtehfv3isN4iDKruAm1LVKRK0GWkERjTJDViEdk4b1mx91w2oY3WbkyAlDmkTYEWMFKG7TM2EwIbA4nV7BOcT4CLsA1owKgX/W/FYY5NxnX0+JJonhIZNUI7nrUOP4Gc2rE1UvaBZgKxZUl69VQddarPY3ieq04A3s0+IC90XoKfNhxRG+zQ3gO5S+2/yN6zl5HuLQ3XctFgI7VSRUMrCi493Ut1enK+03XATBnzZdw7x5jPw50NYoLMwIKCLCCpQAMJ+cXAsuC4uNb5HpXbmmE+c7/yD3Kq7RxGEz05/1w+cpActRdKOZGVg2du9PEDI27a0eXM+kuPrXc5co6hlyJ1quqXhYRPGdSznpFFjMv7VoUULEG61UAd8ddtxNDPsjQkxieYNbqb4BiQGmlSOe3EO5YprVYNH8k1I3x2iRjnxKnxIW6wkVw/Y474bC1X0Qtvolz81NGwBwIsIJljnHgVqQZgb2RAbAjPCJpLee4/pk0T65n+Ase4+Kw+A3thq3qKBG/cMdy0b1ZbvzY7Ua0IqVCsmVtZWi9+oWIXWAr+V6J1wH96NguV29xsahowpvbdv0ONuDZekq02T8CA2x+BDfV34JnnTqUssmmd385RzbKu2zmfYlk9fJvuA7v9MWQS1QHPXu37XiYsXoF/G3PL4EsdkyMQK4gwApWrowUt1M3At8EZyflMcm2GPazf5o0X65mOLvyKTis5H+GN99aNFbEM7RXp+O1iJsxN7R7r343bmwMa+enVLbHetUXRJZCHgS2iZV0H9W7Kz6gqQN1ILUhIt5DH707d/8macNJAfnT7uvhwDXL4bXW05Lm780Qbgfv4oPwqCZ1ijcpV4ENv4UgHWCdJiJn/lM2vAOnb3wDtviHp6kWZssIpA8BVrDShy1zNhkCX4YOU9WiK930VZ5/RIc531R3rfEdcw0FsLp7+UZfvvUP996b4YLCMexEJYeczLWSUlmrozzeerXlT6hJ9YW96MZ6d9XL11tRpq4lO3Hjw8VbH9e0+WEdHnR87qYX4Zj1C+FLb/Ll8WhLvKvBu3AARnj/IKFPFp2V2b3sdAhsuU1dBzTmotALl217EGavXgrvtx+jsTRnZwTMgwArWOYZC25JmhFYGDhBVQ3T7R/BHIf5LDCqGp8g00/7/SUaDiJBlpQeOQZeJD4kOIyORpIzFFNibEChEFqrGpt7LEhyypU9QaCaZGX77fdr9L2q6G1lxN+Avlf3RO+prj179yl1MhYzG650lZT0FlW8CIEd46E9A3uDNYp5Ej34tONQOHzt53De5mdhiXdmoqw9z6IR3o+MRmYPNryEYcw2Rw8hD/vqIdTyGR7e/LPoWZnhvfJneyavQDnHmu4JGIn9UZiyYj081vjDtMV+U24BP2EEjEXAEmV3p44tJMa2h7kxAmlF4JnSGTDRtiRpHetCU+AsjOOUjujpSStPQ4Z+9gZYNnE0lFjbDefunrEIbOV9L+9Q2xJ8Qc8wvB4tDLt96MiOhqR27G6iswb79wOQOpqrKWt1VsDE7+4Gi83Z2yzfuquhfc1dUQd6qpsUNCUagPWqCc9w/c474G8NVyux0Zw+1fM1XFTzLzi78sm0yILWBpEC+XbrCfBI08XR30yEKNHaRs7PCKSKQILvt1RZcjlGwLwIfBg4WZWCNcb2LZzr+gc86bvCvJ3R0LLr636XtheqtXiiqCWhxndE95m82YHLceRQjsfjJaVSdDAXKldayg466DaRchXsaoANn90LIaw7GZWi5UqNcvVc87mGKlfUrmVd+8GV2+7FHXl3wFmVT8N30CfvoKLPwGlFjTRDRErVos6D4Y3Wk+GZph/A7mD/DNXM1TACmUWALViZxZtryzICI6xr4JWy5DGxqJm+iAfO6vgaNofEDtxZ7oLm6se7V8EX46aA1ZKCA1Ky2uy1UHQYWnL2Resk/yvvp4hX9/pkJdPyfONmdWzpeJqBA9B1TOAkobasu6QSRn9nL/a5r3D9ol/C3uV/Tlq5Ex3bBw7EentmXsX8S70z0H9qAXRhdP90EwWdnVX8aXTzw9ySD2B68WLVZ2WqaRvF5yLFbql3OipWs6PHQLWE+pZW1fDgPIxALiLAFqxcHDVuc8oIbAqPg6+Dh+BOwU+S8nBZuuDWovPgvPZPIISvnFylWwdekx7lCgGxD7ygV7mK4hNGS0iWlCu140O79+rQaCJUrrSUHX7ksyLlKhIJQeOq+5KycGG9A0ipS6JcNQQHwNmbXs6IckWNJiXuf+1HRv/RfYm1A6YWfd1zhBMe40QHgtNxTvQ70LEdivHsSmt08TwMEVSs6TSC1mAFtIXLoSHQHyhcxBb8R7/kV7XeNyZvltoJHyZGQC0CrGCpRYrz5Q0CL/l/qErBog5PsS2Cn7pvgL9135aT/Z9X+j4ci2cOpovsNSeKWIe71onuM35DykuCCO0e3OzYrxaAnMzjSE3ZwcPAXn2kqCgdCRQhx/4E5MZ6yd/L1mf0ks0dxjALF25+KnoepWyGDCTSETzkHM/ECDAC+hBI8ueujzmXZgTMiMA7ge9Ae0T9EsVF7j/AKc5HzdiVhG0iK8NtA41zkJarzFoyVZQcwi3+2SQl4xApNtUYrqoOLUiyyhU2Wk3Z4qmPiyx2ZL3yrcJdlAqdprpqcQMgLUcmU66IxS27fg8fdcxT4MbJjAAjkEsIsIKVS6PFbTUEAW+kBB71aVM8fld0CczA8A25RN+rwi3vuGssbWRFL3F7uYh9qP5R0X2mb6TLfm4XKlZ4is2QIQDl4qbGNS1pWfdIsFaILTuhPa/gkUDNccuNdL5gDZ79PHgQADm1qyEKJnrH7vyMwaam/5yHEcg3BHo+vDhMQ76NK/cnCQJFlg54u3QEVFj3JsnZ95isXpd1vAnfhA7uSzTplQt3hX07YXTUZyZdTbQP+gm4xt/Ty56igHv/hxpNFonOGCR/e7IWkUO5wA89aauSlXVP/xhsFYf08iHrlXcBalF45iKVJd8qKzpdONBqJVXWegspXOwO1MFBa5alHO9KgS0nMwKMQBYRYAtWFsHnqrOHAFmxHvL9WlMDSi0tcH/p0XCQPbvLYGoafX7Vg2lVrqgNttpTRU2JdG8W3WfjhsIu0PEzLtTztChX1NaEZd2jwVo+W9QlCsQZO9CaypLVihzZtSpXtDj5o62PsXIlQpdvGIHcR4AVrNwfQ+5Bigg8478cGvEQaC3kgU74Z8kJcJTjRS3FMprXiQc5/7LfH9Nep7X0AFEdoeaPRPf5dOOe9Gic75V/9cWGdPEvDb/C0AVHGcKLmTACjIB5EGAFyzxjwS3JMALdGOfqgW7tPi9O6IY/F58Bv/D8CoM3pCG2lE4czqt6KC1H4oib5cBjYnB5TEDB+scFd3l06RmL1ivxsnCwARVsXBrUS195D4Sb6m/Wy4bLMwKMgAkRYAXLhIPCTcocAs/7L4HdYfSAToEucN0B/y49Avpbd6RQOj1FyHp1df8/pIe5gKttwDkSi04Qwq0LBTny51LWerXyIt0d9IaL4YdbnoRABNcVmRgBRiDvEGAFK++GlDukBQF/xAU3e+/VUkSUd7ptAUaGnwDfdf09GnxR9DALN9+vfgQDQm5Ne8322jNFdUS6t4vu8+aGrFdlB4m6E2x4AQ84xEMOddKvd/wlGoRTJxsuzggwAiZFgBUskw4MNytzCCwIngDP+S9NucIiaIdrPVfAEyUHwzTbZynz0VvQYQnANf0zExDVWn6gqLmh1k9E9/ly4570mMRSFwL/Sv2+V2+0ngIPN/4oX2DifjACjIAMAqxgyYDCSYWHwJ1dd8FmPEZHD022fwGPl86Ge4pPgIn2JXpYpVT2+1WPwBDHlpTKaitkAYuzv6hIcNfTovu8uCkaj9armaKuBHc/q9t6RUfhXL7t3yK+fMMIMAL5hwArWPk3ptyjFBDoihTBbzqfgKAB/jCHOt6EZ0pmwL3Fx8Fcx+sZWTq0QzBz1quaU9Cq0zd1RCJhCDem7zieFIbTkCLuiVLrVRD8q/RbnS7d8hCHZDBkhJgJI2BuBPpmSXO3k1vHCKQdgRWhGXCf73eG1XOI4234e/FJ8EbZaLjEfSuMsq40jLeU0XerH4Ohzs3S5LTc2/ufLeIb8dWL7vPipmgiWq9miLrSY73qFKVpvfn33p/Au+3HaS3G+RkBRiAHEcDYw0gcyT0Hh46bnA4EKOzCgyXz4AB7enbEbQ2PgQ8Cp8L/AqfAN8GD8bRA/d84FjzdePGEyTDelT4FToi155AtYHUP7U2ikAW+b8/ovc+HC/eBi8EmULAikSB4P8TzK8OpK1gbfGPg4DVfgzeMUUmZGAFGIO8R0D+75z1E3MFCQiCEka1+3vkSbA6NT0u3h1rXAYV3eLTkUPigvA5u9PwI5jv/A4Otm1Ku76iydzKmXFEjLS48YE9Awd3PCe7y4LJ4ElhLp4s6Etz9H13KVQjscNGWJ1i5EqHKN4xAfiPAFqz8Hl/uXYoI1Fm3wmMlh2CMq8yFH2iO1MLy0Ez4Njgz+rs8eCC0RMTBPOW68+qoY+CI0v/KPTI2zV4L9gHfAde4f/TyjUQi4P2A4jiZL+BqbyM1XrgP/BKtV30KViSM1quP9Fmv/rDrd3Drrhs1toSzMwKMQC4jwApWLo8etz2tCJDP1KMlc6DM2pTWehIxpyCom3B34+bQOPwdH93pSNe7MD2CZ9hNci+HReOnJGKh75mzDlwT/g22ysPxkD2PKGQBMY4EmnoOPNZXi2lKW4qngOegb0T9DNQ/hqEZzk+5jUu8M+HItZ/gNgR7yjy4ICPACOQeAqxg5d6YcYsziADFtXqg5ChwW7wZrDV5Vd2463FbeDQMr2mFceVbkhdIIYe15nRwT/0PKhuJFYNw5xro+moegD/3nd3dBy5B61XfGYuRcACtV+W4PNiVAoIAXehvNXvtUljXPTal8lyIEWAEchcBQ32wyp0ApbRawMQIGIhANuXqm9DB8Evvc7gAlljJMLC7qliRwjfOsQzGlqZHuXIMux6Vq+eTKlfUWGvxOCg6eBWAPflypqrOZSmTpXga+l7tL6o9uPuplJUrYnTdzjtZuRIhmv832Zyv8h/d3OqhIQpWEb57xlYCVLkB2gO5BQC31rwImEWuFgaOhys6XoWuSImpwCrB5gjCURnXNgxR4Bh1s2iZLBlzi70cPDO/TJbN1M9dkx4R9ZmsV/7VP0m5zf/FcAwPYFgGpsJAwCzzVWGgnRu91KVgObD08DKACfjhStdb23Oj09xKdQjQmPbzANh6FpLVFTIglxnlamHwOLigYwHsDdcZ0ENjWJSWGsNHysUz9QWRoiF9rnRv9QwH++DLlR6bOt1asj9YS6aJ2hjc9UTK1qu9wVqggKJMmUOA56vMYV1INemRq5QVrDJcDpyIilU1voDDEYANLbiPCH+Z8geBQBiA/k2uAeiPoXtSFhYNkJhZrlaF9ofvdXwOG0KTNPQoPVldLgBXGpbjreVzwFI0LuVGO4Zek3LZbBZ0TnxYpFRGrVdrUrc+/WTbQ7Abj8RhyhwCPF9lDutCqkmPXGl+Z5Ixo64YYAwuCdr3ld7cCtCdP7u0C0l2kva12QewF/17B6O1ZBIqWiVpeKlTI3JFrurDQ+G8jk9gcXBeUuzSmaE0TauV9sGXihQNrX2wuIdgkTQJidbGqMxPMa+sJVNFuYP1j+OXIwp/CvTA3svgrdYTUyjJRfQiwPOVXgS5vBwCqcqVJgXLjm/B0RgOZqBgcm/Cly9VzpS/COzsQN86P4DTBjCuCscfFWxSiIyiXJOr9kg5XNrxNrziv8AoCDTxsSD4xTgG6SCrDusVtYfOKLSWipWVdLTTSJ7OCTLWq7WXpVTFat/EqGN7SoW5kCEI8HxlCIzMRIJAKnKlWsFy4cuVfK3KcGkiRkFcPtrGflcxOPL2l1Z+N+ISsH+flbIOFWxStEgm9FKuylUAnHCD92H4jfcJ6IygI2IGyUN+car/cjU2DGNd6aYc2k1oLZ2B1qvJoi4H6x9NyXrlD7vgws1PYWgGAzAUtYhvtCDA85UWtDivWgRSkStV07QTc9EuQbJgCImUqyD7XQkhydtrGuetbX3dK8ZVoPGoZHl0RC/IB7l6w/89OLP9G/g6eEgfOGm+StfyYLTZgT26W28rO1A3j0wxcE58SLQkGgn7wb/2pylVf+Ou2+DbLrGjfEqMuJBuBHi+0g0hM5BBQKtcJVWwyINeTrlqxWXBpm6ZFnBS3iLQisuENO4xIh88kg3anqyV8kmudoSHw4UdH8E93b9Pe7wsWh4sSqOBJHrmntbBlOR3jr4Fig73gnMiWoJMbM2yls7EGF4S69XOR1KyXn3QfjT8veEqCRJ8m00EeL7KJvr5W7cWuUqoYMVegi7JC5R2DQqtGfkLJfdMisB2tFri8XO9FFOytDi/56Nc0SHR93X/H4ZyWAjbw6N68TH6gpYHSclKFwV33I/ji2v/Osli84Cj7jwoOqwB6Gw/a+VROjkaX1zWerVGu/WqMVgDl2x9NHp0kfGtZI56EOD5Sg96XFYJAbVypahg0RxODu1uiXJFFe7qRH8c/XOwUts53cQI0G7R3ZJTY8gfiHaVqlkuzHe5+iY4C05rWw73dt8IvojxpqaSNDm3R0XO6gL3zCVRR3WjRJCc3ungZPf+74JnTgM4RvweWUt8DYyqTAMfa9kstF5NFJUI7nwY77VHSr58279hV6BOxItvzIEAz1fmGId8a4VauVJUsAaV4FKEzG5rcmxvkLxg8w087k9iBOpxV2FAEpbDiprTKDyyjXYEJqJCkCsfuFHB+h2c0rYK3g+cnggOzc+KMB5ZWsgzFooOrQdbaWo+RBE0awb3vgnh7h1oAROYOPc11oJmN6uzFpwj/w+K5nWBa9ob+PU2Oi1dUcPUOeHBeN+rNT9TU1SUh0IyvN56iiiNb8yFAM9X5hqPfGmNGrnqeR3eKZ4RKdgjWSTkaBs6Ojekdu6pHDtOy1EEBuCLfpBMJPE29NFajzsO41+xuAM1gVzVBD6HM0vuhQOKFkOZrQ3aQ6VQHxwIu/x1sNE/GpZ17Rf9t8U/POcQm2V/D37juQJG2PC8Ph1EytWAfjoYKBS11p4B7slP47E7Ml9UCmWEyVHlCq0//tUXRZNpZ55z7F/AWj47oTWMykW61oN/080Q2vW4kGVar6ld7ukfixQs//Z7IbDmMk31LvPuD/PWfwY+3D3IZG4EjJ6v+D1o7vHOVOuSyVWcgkUWCIrQ7pCx4tM2/RV70Qc0U63netKGAJku9Ywj+VFNwcCjcv5AtIS8A61cQlKSq2rbTrim7GI42P2WMLvidWuoAr7yzoDPOw+J/vuicxa0h2U0PUUO2XngsATgXOc/4GLXbVBhxT+iFGgABgYvwvM+jSTHmLvAMeQqkbJB/CmSuW/F98FWcxLYB5yLz2UmBMoX7ADf2ishVP9QfLOsxeAYfXvUF8tiTzxGxCe460nwr7sGBTO9sV88s1bi8uCE3vbSzkHv/9Bkr2F5sANl7pA1X8EGX/ascL0dKIALs8xXBDW/B/NH4NItV3EKFvldlSt8kG1B6xVF9WbKfQQqcYwpBtUeHM9UjzgaiUuClTIv/L24hLxF8o6Uk6sDnB/ATZVnQqm1OWVAwxEbLO+aCgs758LCjsPhk47DoDmkYH5NuRbjChZBJ5ztugfOd98JVZYG1YytOBMMGyKv0KpmIspoQSvOArBVHCpKpZtIoAm8XxyIxzNs7HmGOwHp8GdbBR6j48DYHKiQRLo3Q6D+CVSsHowrL5dg63cOLg/eiMfwjI1T5oT5ycE+3Po5Klq/hHDb58JHhlxbyw/Bfi8UtcG/7Z8Q0Bia4Sos80CjNouXIR0oUCZmmK9i0PN7MIZE7v+mW65EClY5LuGMVng3kc/Nt/jhLbf0kwhm2l1G1g6O9p4Ipew8G4pGBVKQyOJEfnVax7YUx3Ysvm+FFEKz2IpGtAUIzGNycjXX/QLcUPE9cFgEcR+EjFK8juCJiaRwfdQxr1fhakGrl9nIY/HCd5z3woWuO6DKujtp86rx77IcFVpDyFkHnplfgdUVf1ZeqP1r6P5yFipRxo5Lb7vdw8E19m6wVc9PuCQZXT7074LA1r9AcOudWFyrdPbWKLrwzFqF1qvxvWkR7Kf3f7RzACc4DbTDPwRO3/gmrOierKEUZ9WDQDbnq1i7+T0YQyJ/ftMpV70KFl1MwJelR8ENgxy6duKLWC0V4+5DOlKHnJ/XooHCmOlRbe2cTw0CNObka1eKirUXN09tRgtlV1BNyb48k3A5WbjTlLavCncZysnVgc7/wu3Vx+NeMg2VuYaCreroqKN0uHsrhBrfwCi3rX0NUbgiheubrv1hQfs8WIAWrk8750BbKLOR1xWaFk0mRess57/gAlS0aqz1slndaG0caNAmNQqX4N7vdVRuxGbqHj+qB9GP6keybTA+0QKO4TeAfcjlaBWrFVmUpHXREl5oz2u4FHkVrs9skz5OcG8Da80pYC0aBRFU1iASAtekJ0R1+bf9Ha1XVyTgofyoLVQOJ294F770zlTOxE8MQyBb85WwA/weFKKRH9fplCviDYBO7lVoyRiR4Av5WwzwrCY0AzGknWL98aOQ1qpXoTWDop8ymRMB8o2iQ5wpnhVtdahHJZosWmqH7P/b+w44Ocry/2f77V7NXS4VSCWEEEqkGDpBikoRBEQExAaCHbuIfxsiKCJSBEH8oaCoVEUFpQoBDC2UEEJ6T+5yl+t7e1v/zzO3szczNzM7OzuzOzvzvB+WmXn7+32fzHzveZ/3eWmup+RdBySQL63E+ZaWVcrVnNBbcFPrUVDvRzZnIIRm/whCe3wRO9gs+zAKGo7EJhhZcV5JS0m0pEiEaykuJT4/dIxAuHanFWo4A/2yOgvZaJ0QfADOi9wMBwWfL1QfJnI1Gf9QIWOBMkNoxhXCUh+5TpCGHBKPkXcuUbejkma06d7ffCwaxV+HZxi+B+dY3jdpkzTn2aGVkFx3JWS7HpYmye7JBUN4398Kdla69ZnUXkkb60xPhuPeXQabUzOk0XxvEwKVfl8ph8HfQSUi7ni2S64EguVDgkWaCKVDURG6XvTYvq64sgDq0KaHSJro3oHIVbwEJYXYHl8ri0ALfsTnSFbRyFv7BpxvI7ZZ0uU/Oq9QuhRMwiWVqzrU1twx8WDYK7jKwABDUPfe1yCgOCdOWZA+upmeJ2Fk+YnKJIPPPliZ2A9eGDwalg0dDi/FD6+64fL8wOsC0fpo890wtT1pCbmKHPAIGqyfIiOpBBAZlydePQayg8sN4mVjtuAECKPRfXDyueAL4JZJnZBL9aIN2O8gte4K2XJmaN4tSMgvGzdOtapSeOZgcuUn1JJKiluJy4QnrHneUZrRkgZQY5kr9b5SwsLfQSUi7nq2Q64EgtV+Sy63l86qyVpc4iP38HqBPrSz8SNNS4IU1HaSjabw/52IwEyc/zaJX0xaMiR3C1JbKrV+E/M/cNKotnJFl1x71Y71SeXq682fhdNit6tVI4/DD2308NW4HIiqNYMhvfuJMkiWvBHyzP1K/L0C4XoVl3/IRcSudLs8k41PRzQshS+2Xw+nNT9Ufiuo+Ysethz80Vnj6srG18LwsvfYvmtvXMMGIoJTL0anpN8BH9pskQ8trUDat0zPs3h+4OUQmoG/qRdpZR0Xn8sMQ3wpap7SqJ4vMzzR/344a8M/8I8S9d2WZVbPxRUIVOJ9pWgS+DuoRMR9z1bLlfDm2v+uXE55kLMInRGjPmJ+tKNMfA+O5JeKJHbOYnV8dSgCRJSU7jloiZfs50aK2P+SlmoXGslL/aORYC1EfiTK1aLIM3BD6xJDo48sehKCrccbyitmIk1WassvIYW7z+wIHeip+83EQfBW/EDhQF/SWmxIzoZ4Vl/TYrQvzYE+gVB9buKNcEBsudFiuvnIH1Xdwc+gNii/hpvPLWj9dj0MI299WLe8IxJjC9Ao/ga0v1uC7xeVYyUkY6JbPTKmNp7syHYYXroHJkkXttVyFo+7vevz8NWtNxfPyDnKRsDu95Wyg/wdVCLizmc75AoOvpusb9SDHmsnQ/Z90HxFJFZUwyBqut7FjzKH2kOASJF0SU8cwRBqs1bvRkWHGKG4ktWMMm0WasRa8xoxMmb/bfsimB1coSg5/tHfiMeqHPpyyR9Kqom0GfFnke0ZMH4f37K5mM70FFg/Mgc2ItnaMDJbcI7al24B2rlIRtDkt4v8dEVwt2S9fwii/jjE8NeEhGpB3Qo4MLpc+M2MrDfXAY1SwWmXQHj+rxFHuUaF3CAk134bd+b9XKOkU6NDaD92FYSmf2bUVYSF3Uxu/OnoUqMFdV686W64t+cCC2riKoohYNf7Sq1d/g6qoeLOOCvliurSJFhEu15HVz3KjyeVIaa3L37LRA0FxVHQE8TRHPx/JyOgNEoX+2rU/oDyB1A2DsQVNZF4nxG7FS5vNuYziA4GprPrzIZydoWZbdNp5cILfo/OQS8cR1JzmQQklr8f/Uz912ldLqk//rZTIDznp+BH+7xSNVZqDWWTXTD8nDVLwL3og+3QVStgR2qaWlMcZzECdryvlF3k76ASEfc/WyVX2lt2EMN+1EapkSuCdwZqKJTkiux2itlquX9qanuEPbihgZZ4laEFd5mSTZWRQMIpkqugLwnnN/zUSDEhj/IAXsMF8xmDrSeVWsQ9+YXDmt8c9ZwuTkB+dLQUFn9hZs2TKxpOFl10JF46AO2npkNq558Fr/PlTKIvhH8p+g0Kd5GGWgI9cPOelxTJxclWIWD1+0qtX/wdVEPF3XFWyZUuwaLdZGphIr6L6IOrDN3s5V0JSc0901qxlrf+PRpHvb8XG5TUWP4D0btgUqAE30V+FcEq1qAk3YcHCnsyCIc178TDmveXDX90l+Uzo3ZGyQ5ZWs0/JHdA8m100zH0dllDEQ6irpfjVk6FJzf9E05p/ns5VXBZgwhY/b5Sa5a/g2qouDvOKrnSJViDqJFSBiowTW4zW8jSq0HIChn4piYQ6EYtllqgHaK0ywIvmiGMAlIvcVb74fqbNPPakqCwObKlDYdVGph0DsQWv422SRJfG9hHwfB/088g8doSenJYry3sjk8icGarNXnQtVZzV0/7OoRRe8vBfgSsfF+p9Za/g2qouD/OCrnSJFi07kyOI5VhEm6aUjsImgyhjTgiVdbHz85DgFwzkM2VWmhAdxxSDZUyD3mFF8OC8P8MGbaL+YVrTkXoZBmKPASaoO6wNyAw+fwiGd2RHNr7eogs/At6ZpfvsKPDmhNvfhiNt7/tjoHqjELw0q6TXiyJiGh24JVi2UpKnxNZA5e2847CkkAzmdmq95Va8/wdVEPFG3FWyJUmwaIjU5R/85Jhu+i1WwlxP2uvlJDU9LOeLR1pMLUER0qwaHmw1JDDY3DKCbTcE2g8AOoW3gOx44YhcgAu1dTvV06VDi0bQBcMSyG81+XjDL1zqW6Ivzhf19u5QwdlqluZrn+aKlcolB1Cwy7rX2CXT7oWd42y3UQBZxtvrHhfqXWPv4NqqHgnrly50vpOCmfTKWEk26uARolSz7BT1s3PzkJgQGd1gzSY7Rrun8YIVg6OjDxS8qBS2+8ouYxWAV+gDoLtp0HsvW9B9OiduM3/Z8gMNda3tSpxYnx4Oo5nGwRajhzXu0z/a+iqYiqqn611+zCuIQdFpLf9GpdDzWs+03jOoR2hPdgJn2q73Y6quU4FAuW/rxQV5h9p45Yy8HdQiYh7n8uVKw26pH7or97SEBMsdwkZORclR6NagTSZ5I5BGiJIvMSdpfNCr0FbYLs02dB9etO1kEuh0y0TgZZ61IJgxByeDOGZ30CtVn9NLyHSYc2xI9ehl3s8oFASBHurbXdA4uWDMVblqyDJ67pb1D6lt91palh0kHTy3c+bKmuk0Fcm/ZxtsYwAVWaect9XWs2rfdf4O6iFlvviy5UrwwSLnIrWyc08CmjSd62Yt+9CZr6pGQTIaaxWoMOh2xQb/pok9lcHhp/TKlo0Pv7Sobj1XqdxlRpy6X7ctj8VkhuvxdWeHYKBt0o2XE7z1+wSYmjGd6Fu0b/R3gqPTpCE0cOaPwPJVZdIYr11m3z3Usj0l2ZHRaR0ZNVn0TGtfZ6Rp4a2wVktf/XWZFRptOW8r7S6rCRY/B3UQsq98eXIlSbBUp5Bp8fa6VBgdd2Be0H3wsiKkWZSlUtDg2QzF2mwTAdc3kq8fpph/0a5VA/Ely1ClVuHYNQ9vHQaxP+3ANKdDwGdN6cVxi8hXuvYJcTIAf/AJc4fCwRROp5cegDPEzwYMnjwsddD4uXFkI2vMwSD4NF+FZKyHXcZyl9Opk9PvK2c4lzWIALlvK+0muDvoBYy3okvR64ME6wJCm2FFN4ssyspHK65L7YrNIqEiv6iE0NUcj87+JYYbeqa7fkPxP/bBunu/2hqo+gjme78u6C5GmdzFF8lnLUXfyYGibfOhczA61iPutvcsSXEb+aXEF/HXYgfM9VvywvRwddHbEBbslPGGbNn42sg/tx0yA29YXmztVlhBoZfnAsjq7+GxFpjG6w4MLTZSlto7ydWq3ZdXP88LIyW9+9BrV6OkyNQzvtKXtPYk5Jg8XdwDBuv3JUjV6oEi5b8SCslhjq0raElIa2gYfqilZ3jawQBNY/uyq6Lxu5kjiVdQm71W+DUMjsAI6+fjB7IZ0Ny0y8gvftpXAZ6VSBd9BGNP9OEJOpDRXeAZTr/ip6/F2H+hvwS4k5N0ja6hHgg7kL84+guxP3/VrVdiP7GwyB21BZ0Mj5TBjstbaU7HkAyMQ/HPiBL4wdc8dty/ahsvPNZSO/6h7B0mOl5TjbnPn8YgnteXjG4PtFq3eaNinW6xhoq532lNlT+Dqqh4r24cuRKMFNWHvZMxs1vdY0BSUek7IUOJrUCdWBFt1Yqx9cqAqSRWtCm33vSXtJ5lWTcvnDiWN4nptRBCA84dmyILYDInJ9AoO1k8AUUa52KThOhyeHyY3rHHyC14UdIanBbv80hOP0yCO9zE2qtEFhJEJa21nxDIBGSaL41gED08LXgj80p5MyiS5Dh52cUnu286UxPhr3f3oZ/uMrn0842vVZ3Oe8rNaz4O6iGivfiypErVb1UWrGSIrWtUYNXzfGoWj6Ocx8C5N2dXDOQllMa0iAxyJImOOU+vhK1X2eipoOWEM8rvoQYmYK7EMtcQsTz7khrEtn/QYgsegrCC++D4NSLERE5VuEFdyO5umU8uaLDml89jsmVSRlKbb5OVtIX2RMAjxiqRJgU7IBjGp6pRFPchg4CWu8rtSL8HVRDhePUENCSK1WCJV0epMrIe7deoMrJCSkHbyLQjJvapMuDhMJAtrVmwMh0/lmyhPgz3IVYyhLiQwCoDdMNwTYkVI/jkuMgROZdD8FJZ0KwdQmEJp8NkQW3Q2zJIBqwXyMcOFyHPrtCUy8Yb2+V2Ia2ZnvhYc3P6TbFidoIpLfdJrPNItu7yN6/0C5gccrZLX+2uEauzgwCau8rtXr4O6iGCsdpIaAmV6oES8qVyNeR6NtIq2KKZy2WHjruTmtGAi41cKfRbsrsY+mgtyX3hLu7PwVX7/wB3ND5TXis71QYyOisW5tpPTuMuxC/hQcjT8VdiAsFA3o9Y2lhF+KkM/AcwBUQPWpHgSRJm/Y3LRbsqIKtJyBpUv3nhm4Xwqgd+5ZAwAINC6XFBbuh9O6ncCkLtS3pXbI0figdgUz3v2SFAm0nyZ7tfDit+SE8AUGxPGBng1y3KgJq7yu1jPwdVEOF47QQUJMr9Te+pAZyHmkkKJeIjJThPM5GQOlIVKu3EbTVkvrAonyvjJyolb2k+O5MO3xuy50wf+UmuAyvV+/8Ply5/Vo4e8MjMGPFLrhg4/3w+MAH0E1IUVEuqV0QlhA/hEuIUUisOB+XEN/Q34UoLCGOkqS6w5ZDYNJHUa03E4+z+W9RGy+xY0oCJjgP3fhTGFn+Pswi2XUiFnDQdTgbg49v/Cv8tusyGMo2OKhn8q6MoP0a4SoGwdh9jy+Lj7ZeW4PdcEj9S7a24eXKy3lfFcONv4PFEHJvejlypfpVQs15IRgVrLEjUgpF+abGETCiuRSHqNRgPjl8Hozk9I3HxbJa1+cSZ8Ipm1fDH1BzlQOJUOYLJHNheLj3LDhz3b/gwJWr4eZdl0N/plmrOtPxmY4/4RLiQcLOtORGI0uIB0Hd/vdC7Ij1gnbKTMOjhzWfAan13zVTvMJlfHDJpt/Dg73nwFe2/hrmvb0Vvr3tl7B+ZG6F+2GgOfSxlhveIMsY2usrsmc7H05ulGvQ7GzLa3WX875Sw4q/g2qoeC+uHLlSJVhSCJlgSdHw1r3RuVdDZVdmD/jr0FfVkgzE+eB3Az+EK3segFywxUB+gPXJOfhRv174uH9j2432fNxx92BhCXHZ/sWXEKVvaEOjGMuUWH4yHtaMB1XXQPjhjqvgob6zCz3tQ5J7866vwIHvrIYPI/klDSOoEORCgQrfpNCNgzT46nAnYV1lyOBJTY9Km+Z7CxEo531VrBtG62ZFQzEkay/d6NyrjcwygkVGzmzorgZx7caFi0qH/th+N/hDeHz4fP1MitTebDt8ffej8PvB/4cpPsF4vhS5GsTlqVt3fREOeuddOHfD3+C5weMULVj0OPS24IPLyBKimRaDUy4wU6ziZcge7ucdV6i2S1rH/yC5EjSMSLZuQdJlh4ZRtXGdyPTWW/CUgDEXIpU0dl8UexVaAr06veMkswiU+77Sa9foR5a/g3oo1mZaOXI1uu5yncQooTYx4F47FAEy6v0MHhXyzck/gSmh7Zq9zEAQ7us5D763/RrYkZqmmc9MwgHR1+EL7TfAORPuRd9cpZ1xWFJ7/noIzfo+BKd9HHyhSeN2ApZSVzaxddSwvZRCFc57Y+fX4YrtPy+p1Xr/EHys9Q/w2fabYX5kZUllrcwc2f8h3M15RqFKIlzxp3WOqyjkLP/m5DXPwvNDR5dfEdfACDACjkaACZajp8c9navzJWBJ0xNwQuO/Yf/oG7BHaItgV7UzNRX+N3Qk3N71OdiUnGnrgCejLyI6F44I36TgTlvbih2f0dw1aKThXHoQjwpqNJK1Knmu3fk9+PHOH5XV9nENT8Gl7TfBB5seAb8PvRtXMtTNRhu5tTISPPLuFyG99Wbbe/FV1KCRvHNgBBgBdyPABMvd88ujU0EgjFqsD0+4Dy6beCMcHLNnV1f5BKsfCZb1BvsqcJQUlcKNBZ/fcgf8affHSyqnl3mv0Ca4uP1WuKj1t0A77SoVorgJwR+dVWgui8bvw3gsk93hzu5L4ctbbrW7Ga6fEWAEqoxAmVY2Ve49N88ImECAdh/+eff5cOzqZXAc/v60+yLc8Wjx8hD61Con5FK7yyluS9ld6Ulw+rr/WEquqKObUzOEpWHafUguOd6ML7Kl/8pKU5uVxu4z0djdfoK1Xx0f/KycC35mBNyIABMsN84qj8kwAq/ED4NLNt8lnBP33W3XWbb7MDv4tuE+qGXM9P5XLbpqcU8NnASLV72BmwaOta0PCSS55JLjiNWvwYlrlsIDPedCOic/RsjKxmk5MJcds8kbNXaXH6djZXtiXRMD7DBWxIKvjICbEeAlQjfPLo+tZAR8aBl2XONTcFHbb+H0pocg7B/bbVZKZf4JJ0HdosdkNj5Gy+dyaYg/Owk9t/cYLWJbvmQ2Aj/ceRXc2Pk1VV9ktjWcr3gqboz49MTfwKfafoN2cx2WNxfZ/29o7H56od5KGLtvTe4lOM4tNMo3jAAj4EoEmGC5clp5UFYg0BrcDR+dcI9gG7RftPRlnbpDX4ZA0yEldyW55UZIra6Md3G9zj09cAJ8ddstsCYxTy9bRdJEu7lLJ94Eh8SWWdcm+r+KHbFaRoRHVn0O0tvss5HqSrfDzBWd1o2Ba2IEGAFHIsAEy5HTwp1yGgIHRV+Dj7beAx9BVw/GdyAG8IzCreDHY3SMhmx8LQy/uLfR7Lbk68CdneS09b5ePO7HgeE9sVdwg8JNcFbLX0xrGKXDih6xAY3dZxaisvH1OAdzCs9W3wxmG2HKm/1WV8v1MQKMgMMQYILlsAnh7jgbgQC6E1jS+ASc13I3nNbyMMTQr5NuCE+G6KEvgb9uL91sdD5epucpPHfwBN18dib2pFvh+s5vwW+6vgBxPFvQ6aE9uAs+2Xa74HZjWmir6e4G8SzCyD43FMrTXMRpN2FiYyHOyhtadm19M2FllVwXI8AIOBABJlgOnBTuUm0gEPUPw4mNj8GHmh+ADzY/Ao0Bba1EcI/PQ3jONeALyg9CFg4eRlur5IafQFpxhEulUCDv6nSO4+hZjk2VataydoKQhtOaH4bLJt0IR9Q/Z6re2JIR2bmR6c4H0VP/WabqKlaIdmPOWmG9PVmxdjmdEWAEKosAE6zK4s2tuRSBCBrDH9/4OJKtB4HOm9NaRvQ3LAJ/20no6b0dciPbIL3rIds0JcWgpsOYb+36Etzd/UmgI4bcEI5H7eLV078GC+veLGk4kQMegWD7qYUyuUwCD/eOFp6tvHknsR8cumqFlVVyXYwAI+BABJhgOXBSuEu1jQDtRDwwuhxObHoMTmp8FN5b/2LlPZVrQJgDPzw98D5hGfDRvlPxICP3eWqhUwN+tedlcH7rXRooqERH50Hs8FUKY/fL0Nj9NpXM5UXR+ZgfWPt0eZVwaUaAEXA8AkywHD9F3MFaR4AO9z2q4b+4fLUUDscfHfgb9KUqOqw1I/vAH9Gh6r27L4RtqT0q2na1Grttr0/BBa3/Z7j56JGbZLZy2fg6NHafa7i80YwP9Z4DF278q9HsnI8RYARqFIFgjfabu80I1AwCvZkW+Effh4QfdZpstw7BI3oW1z8vnMtInr3n1q2BANoSWRXIQeer8UPh2cEl8Gj/qfDS0GKrqq6Zer6w+XYgbBfhrkMjIbX5VxCZ94tCVl8UDd0juDlhZHMhzoobssHiwAgwAu5HgDVY7p9jHmENIEB+nvaJrIL9Ym/BnPAamBLaAVOD22FKeAdMCe4QnGyqHYhMW/63J6fD9tR02IG/zckZ8GL8SHhx8CgYytbXwMjt7SK5dHh23mHYSM5AQz6ILUnIjN1THfdDcsU5Bsoaz/L1rTfBbbhTkwMjwAi4GwHWYLl7fnl0NYIAnY/4VuIA4afVZbLt8vvIagp/eKUwglv+OWgj8Fr8EHh+6Gg4sv5Z7UyFFHSV0f04GrufUogJTjwVxg7TKUSXdbMysbCs8lyYEQP6cDUAACK5SURBVGAEagMB91m41gbu3EtGoGQEcuCDTC4AKVz+I2LF5MoYhPftPs9YRsw1svabILjOyJfwBeogdnwafxlBuxU9/F0ITr/McH1qGZlgqaHCcYyA+xBgguW+OeURMQKMgASBh/vOhgwYVNbHV+IZkH2S0oA7CwP48+PSYQT8sXkQmf9rEAziG2npsbTQmZ4MXemJpRXi3IwAI1CTCDDBqslp404zAoyAUQSI0CwdPMZQ9rqDX0AfZS1F85Jn/rpD0f1Gy5KieaUZ3h7eX/rI94wAI+BiBJhguXhyeWiMACMwisCaxD5FoQjvdy8EWg4vmk/MQFqtukWPju40FCOLXJfFjyiSg5MZAUbALQgwwXLLTPI4GAFGQBOBLSn9syD9TYshOPlczfJaCbRsGH2PcaehSweO1aqK4xkBRsBlCDDBctmE8nAYAUZgPALbUnuOj5TEhOf+TObFXZJU9NYXnQX+xkOK5kvhTtFlceMasqIVcgZGgBFwNAJMsBw9Pdw5RoARsAKBLSNFNFjN5h2x+nw+CO75xaLdfGXoMBjO2nO+YdHGOQMjwAhUHAEmWBWHnBtkBBiBSiOQyNVpN+lH0uMzuMtQoxY6xLtYWDrEy4PFMOJ0RsBNCDDBctNs8lgYAUZAFYGob1g1niL99QtMLw+KlfqCDeKt5vWJ/pM10ziBEWAE3IcAEyz3zSmPiBFgBBQIRPwJRczYY3Z449iDybtcekC3ZFe6HV4cOlI3DycyAoyAuxBgguWu+eTRMAKMgAoCdToEC9LdkMuWdyBOdnC5SqtjUY/hgdt0yBEHRoAR8A4C/C/eO3PNI2UEPItA1K+9REigZAfeMI0NHa2T2vRL3fKP9J2hm86JjAAj4D4EmGC5b055RIwAI6BAYGpwuyJG/phc9VnZGYTyVP2nbO9SyA1pE7ThbAyeGjhRvxJOZQQYAdchwATLdVPKA2IEGAElArMi65RRsmda4kt33i+LM/KQy2Ug8eZZuln/0/8Bds+gixAnMgLuRIAJljvnlUfFCDACEgRmRdZLntRvkys+Apm+ZeqJKrFkt5VY/n48HHqXSupY1J97Lhh74DtGgBHwDAJMsDwz1TxQRsC7CMwK6WuwRGQSryyGYjsCKW8u2Q3xF/eFbM8TYlHVa0+6Ff7d/0HVNI5kBBgBdyNQnnc9d2PDo2MEGAEXIODH/XszIhsNjcTfeBhAQO7TKpdNoSNS/Fs0OwLZ4XWQ3nY7pLfebKi+B/s+Akk8IocDI8AIeA8BJlhVmvNmfOdmcwAD+O7mwAhYhQDL1Xgk59SthZDPmBuG8N7yMwlz6UGI/7dxfKUGY+7dfaHBnM7OxnLl7Pmp1d65Xa6YYFVYMmOI+B74vk5lADb0V7hxbs61CLBcaU/twbGXtRNlKSHwtxwli0l33id7LuVhQ3IO/G/oiFKKOC4vy5XjpsQVHfKKXHmOYIVQ0z8hAtCNjp0zqEGqVKB2p+PKQxsee5ZIA6zrrVTL3E4lEGC5qgTK5tp4T9QYwQrN/gEemRMoNEL+rZJrvlV4LvXmd12XlFpkXH6Wq3GQcIQFCLBcWQCigSo8R7BSWdQe4W/hRICdQwC74rhUZwCocrI04XLgrGaAIJlxIKkjclVJcldO37msMQRYrozhVI1ch8ReMtRscPrFsnzZwRVFdwjKCkgeUmh3dc/uT0pizN2yXJnDjUvpI8BypY+PVameI1gEXM8IQAwdO9NS3aQYLtX1AQzaYAvlw7am1uNPYjO7EdtK4PIgB/chwHLlvDkNQhoOiL5etGP+5iPAF8K/uiQhueGHkqfSbh/uPQt24fmDVgSWKytQ5DqUCLBcKRGx/hl1Kt4M2wfRwBztXsO4IrBPK8A0JEJEiKwKQaxsboucXO1GUkdCzcG9CLBcOWtu94u9BXVFjsmhHofnXIPLg2NvAHLVkN31gOnB3Nl1qemyagVZrtRQ4bhyEWC5KhdB/fKeJVhkfrUel+qSeW0SaZmIaEXGTDD0kdNJpTr2bQNoQlsvMaRxHXLLgPjEV7ciwHLlrJk9pv6Z4h3yR9C4XW6Mnu74S/FyGjlWjSyApUPHaKSai2a5Mocbl9JHgOVKH59yUz1LsAi4NErXZslOvvoQwHwkWdEyFk7DiOi8CaOaMenkELmi9ji4HwGWK+fM8XGNTxbtTGjWDxXG7VlIrv1m0XJaGW7t/JJWUlnxLFdlwceFNRBgudIAxoJoTxMswq8Plwn7JMt2ZIhOBIm2kZYaaGeGGrmi+nfjrkUO3kGA5ar6c032V0c2PFu0I8Fpn5blyQ6+hX8N9cjijD7sTrfBn3o+bjR7yflYrkqGjAsYQIDlygBIJrJ4nmARZltRu4Q7sgtBJFkNqNEyGkRyFVEQM9o1KNWSGa2P89U+AixX1Z3Dg+tfhga//rq8v/loNG5vk3U0uf4HsudSHu7svtT2g51ZrkqZEc5rFAGWK6NIGc/HBAuxol19HeiuQRoCiMzeqMkyslxIprFk0F6nIFdUH7mCSNrtB0Lacb53DAIsV9WdimMbniragfBcpXF7P2S7Hi5aTi0DuWb4Tdfn1ZIsjWO5shROriyPAMuV9aLABCuP6Q7cVUje1aXBj8xpDvmvGttcJE0u3JMD0ZiKtosM2zsVxK1QiG88gQDLVfWm+fjGx/Ub90fB3/xeWZ70zntlz6U83N/zUdiZmlpKEdN5Wa5MQ8cFdRBgudIBx0QSE6w8aKRkUiNDtORHTkK1OBY5EZ2MLh7UAgkrOxRVQ8Y7cSxX1ZnrlkAvHN7wvG7jodk/Hm/cvs6s53Yf/LLTvGG8bkdVElmuVEDhqLIRYLkqG0JZBa4iWOUOho7PkdpiiUiRu4VpEmehYjxptmY2iU/yK7l/6EK/VxxqHwGWq9qbwxMbH4MAGrnrhdDUT8iSswNvoHF7nyzO6MO/+k6DlYn9jGYX8rFclQQXZzaIAMuVQaAqkK3cuahAF4030YxEaAp6Zg9oqZuKVEXHB/RKdhRKs6stE85EzVZIw2/WDrS9or8GONQ+AixXtTeHJzf/U7fT/pYl+I8XfbJIQnL99yRPpd1e1/md0gpgbparkiHjAgYQYLkyAFKFsriKYJGXdPLMTucMTkaiZYZn0dmEypBBprQdCZM0NOPSIAmyWiBbrm4T2ivatUgHUXNwFgIsV86aj2K9CfgycFLjo7rZwnOvlntuT/VBtluflGlV+NzgcfDS0GKtZM14litNaDihDARYrsoAz+KiriJYhA059BzGlQE6Z9CM09ABPJMwoVhZIG0UabfEQMSNDNu1Ai0NSrw+aGUrxNejndfeuAuR6tTSoBUy801VEGC5qgrspho9LPY/aA12a5cl4/amw2TpqZ1/lD2X8nBdxxWlZJflZbmSwcEPFiHAcmURkGVW4zqCRcSGjsChHXy0s29fXAWgA5dL0WZJSQ6RLaXx+4Q6dN+AdWsFo7ZX1Kc9kFTNRzc85OJhHfa7FGKm1T7HW48Ay5X1mNpV46nNf9OtOjTnJ6i9Gnv15XJZSK39tm4ZrcSXhg6HJwdO1EouGs9yVRQizmACAZYrE6DZUGTsLWND5dWqklz/b8ofgUPnt5KB+hzUEBm1zRpE7+5ioMMwSVjFQKSIDobWCr1oKG/E71UdLmWShk3cgUjkivrNwbkIsFw5d26kPTut+SHp47j70NSLZHHZgeVoMKnvkFRWQPJwdcf3JU/mblmuzOHGpfQRYLnSx6cSqa4kWAQcaaGkdlBkL0XH2JDH9WJhCJcJKdBOQKk2i+ImRvFAaBWHopRGwYj2iuy36DBo0XcWOSONK5YlR2vj/zsNAZYrp82IvD8Lo2/B7MhaeaTkyT/hBHRshy8CSUiuu1LyZPz2ZbS7eqL/ZOMFdHKyXOmAw0mmEWC5Mg2dJQUN0A1L2qlKJeT6X+o8lAgNaY0iGjv/xE4S86elwQ4kPlKlEmmvpuhor6itfon2S6xPem1BokfaNHJiSmEE2yF/WRxqBwGWK+fO1enND+p2LjxHadzeA9ndj+mW0Uq0QnslrZvlSooG31uFAMuVVUiWXo+rCRYRJTJQlwbaZUgG5WpuF6T5iPkrtVGNqHmi8lqBykgJmTIfkavZ5LQ0T64onZYyJfbzyiL87EAEWK4cOCn5Lp3eokOw/PVo3H6wrPOpnffIno0+kO3V4/3vN5rdUD6WK0MwcaYSEWC5KhEwC7O7mmARTkSSSEskDbTENxdXCfQGT1olJfFpQ+N2vdCHBEsr0E5BJbkiWy/atcih9hBguXLenM0Or4OFdW9qdiwkuGYY+1c/atz+Hc38egk/3vljvWTTaSxXpqHjgjoIsFzpgGNj0tjbxsZGqlk1aZSUPqyoP/W4XEhH4GgFJbkiA3naPagVyAP8gMbyIGnLZqPWTKq5onrI9opDbSLAcuW8eTuj5X7dToWmXChLz/a/in9Flf6PkPxePT3wPlldVj2wXFmFJNcjRYDlSopG5e5dT7AIyh7c2afUYlF8CxKmdjRaNxJaMa+SIEnLke2VkpSJ6TPwOB3l0mIcNVd9GoRMLMdXZyPAcuWs+TlTh2D5W98PvtCYcXsO/yJKrrvC1AB+tOMqU+WMFmK5MooU5ysFAZarUtCyJq8nCBaxd1KRqgVySFrM6J3KtRUhYlrLg7TrkIicMkh3OCrT+Lk2EGC5cs48zQhvhEWxVzQ7FJ6jIEVpNG7veUIzv1bC4wMfgBeHjtRKtiSe5coSGLkSBQIsVwpAKvDoCYJFONJBzmqBdvPRgc140QxhRImWFPXCoIotFYGr5TOLDOI51D4CLFfOmEPd5UF/I/gbF8k6mtrxe9mzsQcf/GDHT4xlLTMXy1WZAHJxVQRYrlRhsS3SMwRLOMhZg2Q14O5APQ0V7R7UC2R/pTxeh/JPwvMQ1Q6DJj9bRpyR6rXJac5AgOXKGfPw4Zb7NDsSmnsNLu+PveoE4/Z139PMr5XwYO858EZcTtS08pYbz3JVLoJcXg0Blis1VOyLG3vr2NeGY2rWs3kiTZMWGMUIFp19SOpXaSDDdi2fWf2svZJCVfP3LFfVncI9w5vh4NhLmp0ITTlflpbtx7wlGrdncwGwa+egrHOSB5YrCRh8axkCLFeWQVm0Ii1OUbRgLWbQ2uVHYyFNUztqnNRCMYJFBuvKQLZXAQ10iZBxcA8CLFfVncszmh/Q7IC/7RQ0bh/bLiwYt68t3bj9np5PwJrEPM127EhgubIDVa6T5apyMqBBASrXgUq2NIKe1un4G61AGifleYVkAK/cAagsr0aY9JYc1fIr6+Tn2kGA5aq6c/WhFm2CFZ79I3nn0rsh2/u0PK7IUzIbgat3fr9ILuuTWa6sx5RrxB31/B2smBh4imARqtKDnJUoBxENpTPRpiL2V1SHkjCRU9E6/KkFstciAefgLgRYrqozn1ND22Fx/QtC4/6Jp0PdoS9D7LhBiB2fwV96vHH79rtK7ugd3ZfB1uSeJZezogDLlRUoch1KBFiulIjY86xBA+xpzAm1FiM3tLTXKXHp0FBk9yCNiQwHpUFPe5VBgoX/cXAZAixX1ZnQD9HZg/4wEqtXwV+/AI3ZtfcD0/JgavPPS+poPFsPv+gw5+29pIY0MrNcaQDD0WUhwHJVFnyGC3tOg1Vs914UCRVpoMQQldyLccqrkmDpeXzPMrtSwueKZ5ar6kzj2VNegNhR2yDQsJ8uuaLeEfmKLV6Fa/5TDXf2N11fgM70JMP5rc7IcmU1olwfIcByVRk58BzBUvPoroRaNHanv4W1lvrEMrTkR1opMdShzRYtNWoFys/BfQiwXFV+TlsCvbBkya/QiL3NcOO+UAtED9N2SCqtiLRXN3R+QxpV8XuWq4pD7okGWa4qM806VKAyHah0K3SyeLFAGigiV2TcrrPiIFSj1F4V23FYrG1Or00EWK4qP293HLMZVwfbS27YH5kGoTk/K1rud92XQHfaOHkrWqGJDCxXJkDjIkURYLkqCpElGTxHsIygRt7diSiRNqpYSCvsr4rZbKk5Hi3WBqe7AwGWK2vn8cwD9zVdYWjPzxUp64Nfd365SB5nJLNcOWMe3NYLlqvyZ5QJlgaGzZHiy4NUVLo8SM/kFV4vkNCSE1IO3kSA5cqaeT9tdgYCAQM7UDSa8wXqwVd/oEYqwEtDi2FzaoZmutMSWK6cNiPu6A/LVXnzyARLA79mJEpGDNylXIl8aBXzmUXNsRZLA3QPRLNcWTPJ583uLLuiYPvpmnUsGzpcM82JCSxXTpyV2u8Ty1V5c+g5gqV0JKoFXwR3DxrxgSUtT05JjQQjS49G6uE8zkGA5aqyczG/qav8BnXstzrSU8qv34IaWK4sAJGrGIcAy9U4SGyJ8BzBMqJhEpE2ommSGsEbJVhsCC8i7J4ry1Vl57Il8275DY7s1KxjQqBHM62SCSxXlUTbO22xXFVmrj1HsIySIDPwG62bCZYZdJ1dxujcmxmF0bq9Ild+yMKEvrvMQCkrk+76p+xZ+rC44XnpY9Xujc69mQ4ardsrcmUGw1otY3TuzYzPaN1ekCvPEaywjSM2KljkW4sN3c3803VuGZarys3NzPAGCPX+E3LZpOlGc+l+yA29oVn+yPpn4aDoa5rplUpguaoU0t5qh+WqMvM9aqN9Hbu/rAzc3AojwAiUi8BpzQ/DvbPOhPD8OyA0/TMlV0dH5oy8czFkdtypW/bR/tPgnPV/183DiYwAI8AIaCFg4CAYraIczwgwAjWHQBYdt9EPl9nGrun8PY0mH5+jPBjoKv0JceitV4wT8+hdxTLSPMp7ehaD2Lb4rLjOCD0nxCRXXQyBCceDPzZbkUP/MTe8oSi5oho+0PQInOG/BR7e9UH0OIyqb9HgUrin5/yPMtO9H39AP7rQM71eJfFCXD5dyMT/YwQYATcjwATLzbPLY3MHAmkkQALxyROhrPhMZAjviZAIVyQ+4rM0TiRDRYhLrYAV8GcKXR1edhDEjt4KvmBTIU7vJpvYAsMvv0cviyztxvnfhRc79oaOkYmy+LIeRGImXHERgYiYGCfcS+LoWSRu4j1dibgF+fVd1jxwYUbAZgT4X6jNAHP1jEABAdIcpdFuiEiQ+BOJkPCMxEGMz+K9mFaogG8IgfWDe44BkR2A+PN7QWT/+1Gb9T7NA59pWTDbuxQSrx2LZZGIGgyt4T64fuG1cP6rPzdYwkA2kfAWso4U7kq+EQgZacnQR4xAwIiQSe4FzRrF5X9BdPAnELaSW+ICjAAjUCICbINVImCcnRGQIUDaJYEU5YlTgUDlyVKG4vP3LtEgycZfhYdoIAEbTjwRGoJxWev+xkMgPO+X4G84AElEDNOQSGWGIDOwHFLrr4Rs3wuy/KU8nPfydfBIx5JSijg3b4F0IRELEOGSkDKBgNFzPp61ZM6dR+6Z4xFgguX4KeIOVg0BgTwhQSLSRERJ+KVGCZV4z6SpKtNzzYJfwBdm/6libb/RNx+OfO6PFWvPMQ0RGaMjiUQiJt7Ts0DG6IqEjAMjwAiMQ4AJ1jhIOMIzCEgJVDoxSqDSuFzD5MnxItASHIDXjz8DJoZ7K9ZXIlhEtDgoEJCSsCAe4iqQrzomYAqY+NF7CPCfHt6bc2+NWLR7IgIl/JBAiVda2uNQkwj0phvh0jd+APcf+pWK9f+MqU8ywVJDm7S49IcJ/UYGxuegJUgiXkEiXeJVJGC8q3I8YBzjFgSYYLllJnkc+IJHwpRGu5wk/lLDeE+kCl/6vIznSul4rONouGr1pXDlvNsqMr7ZsS0Vacd1jdAfMkn6DcmHRpovkXCFogBhtJsL0o8/S3Kg+KlWEWBJrtWZ83q/STOVHMS/mPFHZIp+tLTHwVMIXLP6YmgKDsKXZt9j+7hH7Slsb8Y7DdAfPuK/3WHJ2Y+0xEiEi36RBiRe+OOdj96RCxeNlAmWiybT1UMh7ZRAqPpH/xKmFzMHRgARuGLl5ZDKhuBrc//PVjw6R1ptrZ8rzyMg2EDiH0uJPgBxxVHQcNUj4UJ/Z0S4WMvF4lIDCDDBqoFJ8mwXk7jEl0AjZnrRKpcXPAsKD1wNge+v+gK8OzgTbj7gKgj7caenDeF1NnC3AVWDVYqarqGu0QJhJFt1zfhrQcKF9lwcGAEHIsC7CB04KZ7uErlEiO/GX/eo/ZSnweDBl4rAouZ34M5FV8K8ho2lFtXNn835Ye/HH4OOZJtuPk6sAgJkxxXDeYmhhpFcR3BgBByCAG/hcMhEeL4bZJjevQFg5wqA/u1MrjwvEOYAWN63r+Cv6ub1H4N0zjoF/dNd72VyZW5K7C9FG1nonUHvDnqH0LuEAyPgAARYg+WASfB0F8i2qn/bqMbK00Dw4K1GYGZsG1y5z61w7rTH8Agd9OpuMuRyPjh66d3wOpI3DjWCAGm0mqazrVaNTJdbu8kaLLfObC2Mi5YDu95lclULc1WDfdwYnw6fWX4VHP7cvUAuHcyG69Z9ksmVWfCqVY5MDOjdQu8YDoxAlRBgDVaVgOdmEYFda9QdEzI4jIANCOzftBou3PPvcO70R6HNgAf4JO5M/NG7l8EN6y6yoTdcZUUQiDQCtO9dkaa4EUZAiQATLCUi/Fw5BLa9zk5AK4c2t5RHIODLwCEtb8OS9mVwcPPbMKd+C0yPdoAvl4NENgJvD8yFF7oXwR2bz4adiXbGrZYRIGem0w+q5RFw32sYASZYNTx5Nd911mDV/BTyABgBRyPAGixHT4/bO8c2WG6fYSePb8IMNELFLdYcGAFGgBGwGgF6t9A7hgMjUCUEmGBVCXhuFhEgnzUT9xn1YcOAMAKMACNgFQK0i5DeLewXyypEuR4TCFjnKMZE41yEERCOvGjFvzIb0NZloANAeiYZw8MIMAKMQCkIRCcANE4ePTi6lHKclxGwAQEmWDaAylWaQCAcA2ibhduq0XcNe3I3ASAXYQQ8igB7cvfoxDt/2EywnD9H3uohqfSbpoz++CxCb809j5YRMIoAn0VoFCnOV0UEmGBVEXxuuggCdIhrOE+2yON7chD9ZvWPHvxMh79yYAQYAW8gEIriuwAPeI404bWBPbR7Y9ZrfpRMsGp+Cj0ygCCKarAFDeLxRyGbzRMuJF1EtuiXYa/No+Dw/xmBGkYggFpsIlT0iyCZIkLl5/1YNTyjnu06EyzPTn2ND5xeuHX41yz9xEBarjQe9EqHvRLhSifwhwfB5pCMcWAEGAFnIUBOQMl+KoiaakFDhXaYQfrxZ8lZE8W9MYsAS7JZ5Lic8xAQtFwK0kWaLjqPTCBbecIlEq8sEjIOjAAjYC8CftI+54lU4YqkiuwtWTNlL/Zce1URYIJVVfi5cdsRoBe4YMuFL3RlII1XlshXnoDREiNpvOiaSbHmS4kXPzMCagiQJioQwh8SJiJQwlUkUBTHnxk12DjO/Qiw5Lt/jnmEWggIL378J0AuItSClIAJpCtPvEjzxSRMDTGOcxsCUvJEmiiRSAkkijRQTKDcNuU8HusQYIJlHZZck9sQKEbAaLwCCctrwoh4kTaMrtnM6JWImHjPtmBuk5DaHA+RJiJL/sCotkm8F5byiDRRWv7K2qfanGPutSMQYILliGngTtQsAiIJA5UlSOWgRHswgYARCcMfka7Cc56UiQRNTFPWw8+MgIgAkSGBMCFZEohRnjiJ9wUyRfH4Y7snETm+MgK2I4D/4qwLzfhHTzaHJ56g+QoHRsAqBFwjV6I9WCnAECmjH4hELH+l54yEoBEZy+E/PpG0ieSM4oQ0SscfhwIC9Wg2RO+rYYSxooFIT+HnGyU+4rNAmDBOJEZ0DdBrWtQ65a/0zNqlik6b0cZc874yOmDOp4mAJQQrhrXs0Yg74/EP8A3oB5IDI2AFAixXiCKRssJOK/wLptwgI2xEuPAnaMxE8kXP+BNJGbUn3osETUraxHS9q5CGTEaaR3k/mjr6f7EdaZyReyIjakEaj/d1+L6aXO+DNL6vtg1hgVC+nJhP7UpxPiQ+FIR7epaUo3thnvJxwryJxIji8umFuRRq4v+5CAF+X7loMi0aSlkEi95L09EHXBv6g0vgX4Hrei3qFVfjCARofifgpqBu9G6QyX8fK9ExlisbURY+/PTBr15wilyt2o0Y4B+GHNyBgFPkir+D7pAncRTlyJVpgtWEf0zPakYtNb6rSc1OQlXJj7A4eL7ah0AKFRn0WzgRYCf+pb8L/Xfio62B5cpWeB1ROcuVI6bBdZ1guXLdlDpiQOXIVckEi5TkU/BIqGmouRLDxj7UYKG6nYP7EOhBt1AxdIpOS8CT0JvBBpzrQRts7Fiu3Cc7eiNiudJDh9PMIsByZRY5LqeHgFm5KmmtIIhfwbl4FJyUXO3Gjy81zsG9CGzH4/4G0NtAGDcq7dOK848EO2+NYsmgWa4sgbHmKmG5qrkpq4kOs1zVxDTVXCfNyJVhghXBj+u+bQBNaJMjhjSuF20ZEJ/46lYEyPxqPS4BJ/NayqmovSSiRTJRbmC5KhfB2i3PclW7c+fknrNcOXl2ardvZuTKEMEKY655E0Y1GFJ4iFylqVUOrkeA5nmzZIcobXGfjyQrWvIi8xhULFdjWHj1juXKqzNv77hZruzF16u1lypXRQkWWdCrkas+XBbcjbvLOHgHgT5cJqR5FwNtcCDZoO3JpQaWq1IRc29+liv3zm01R8ZyVU303dt2KXKlS7DEj2BE8QGlXYNSbYZ7oeSRKRHYilpLcoMkBpFkNaBGy2hguTKKlHfysVx5Z64rOVKWq0qi7Z22jMqVJsEiI2YyaCenfMpAW/aTdu/XVzbKz45AgHaLdqC7BmkIoBTtjZosI8uFLFdS5PheRIDlSkSCr1YiwHJlJZpcl4iAUbnSJFjkQDSmopUgw/ZOxQdWbJSv3kBgB+4qJK/90uBH5jSH/KIV2V7IciVFje+lCLBcSdHge6sQYLmyCkmuR4qAEblSJVjk7HEybsVXC1QpOxRVQ8Y7caS8VCPZtJRMzme1OBbLlXdkxMxIWa7MoMZliiHAclUMIU43g4ARuRpHsEgDMbNJvTnapt+Ffq841D4C4ya+xCHR8TlSWyyxOLnxkPpJE+NZrkQk3H1luXL3/FZrdCxX1ULe3e3aLVfj6p+JGoiQhn+jHWh7RayNQ+0j0IxEaAp6Zg9oqZuKDJGOD+iV7CiUZldbJmS5kiLk3nuWK/fObTVHxnJVTfTd27bdciUjWM24NEgNqgWyuek2ob2i3WV0YDAHZyFA3vfJMzudMzgZiZYZnkVnEypDBonXdiTi0sByJUXD3fcsV+6e32qNjuWqWsi7u1275apAsOgDSwbIWoGWBiW787WyFeLr0R5nb9yFSHVqaToKmfmmKgiQo9jh9Og5g2achg7gmYQJLC8NpOUk7ZYYWK5EJLxzZbnyzlxXcqQsV5VE2ztt2SlXBYI1oQ632avsGhRhNmp7RR/UPZBUzW8bdfGwDo9YKYWYie3x1X4EaF7oCBzaGUo7RvdFz+xTSzxnUEqeiWwpjd9ZruyfR6e1wHLltBlxR39Yrtwxj04bhZ1yJRAsIkV0gK9W6EWDZiN+r+pwyYk0IeIORCJX5Fqeg3MRoPnZlD8Cx4eCQAbqc1DzaNQ2axC9u4uBDsOUTjfLlYiM964sV96b80qMmOWqEih7rw275EogWBOjeHCvikNREWYj2iuys6HDoEXfWeSMNK5YPhLr46uzECAtlNS+juzw6Agc8rheLAzhMiEF2mEq1WZRHMsVoeDdwHLl3bm3c+QsV3ai69267ZAr4RM6RUd7Rcbt/RIthRr8LfhBJq0HOZukMILEivxlcagdBMj1v9R5KBFl0kZGNHaUiiMj5k9Lgx1IqJXaK5YrESXvXlmuvDv3do6c5cpOdL1bt9Vy9f8BJKYRqwdEKxQAAAAASUVORK5CYII=";

var img = "data:image/png;base64,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";

var entry = {
  name: 'TMPose2Scratch',
  extensionId: 'tmpose2scratch',
  collaborator: 'Tsukurusha, YengawaLab and Google',
  iconURL: img$1,
  insetIconURL: img,
  description: /*#__PURE__*/React.createElement(FormattedMessage, {
    defaultMessage: "Recognize your own poses.",
    id: "gui.extension.tmpose2scratch.description"
  }),
  featured: true,
  disabled: false,
  internetConnectionRequired: true,
  bluetoothRequired: false
};

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

var color$3 = Color$1;

var Color = color$3;
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

var MathUtil$1 = /*#__PURE__*/function () {
  function MathUtil() {
    _classCallCheck(this, MathUtil);
  }

  _createClass(MathUtil, null, [{
    key: "degToRad",
    value:
    /**
     * Convert a value from degrees to radians.
     * @param {!number} deg Value in degrees.
     * @return {!number} Equivalent value in radians.
     */
    function degToRad(deg) {
      return deg * Math.PI / 180;
    }
    /**
     * Convert a value from radians to degrees.
     * @param {!number} rad Value in radians.
     * @return {!number} Equivalent value in degrees.
     */

  }, {
    key: "radToDeg",
    value: function radToDeg(rad) {
      return rad * 180 / Math.PI;
    }
    /**
     * Clamp a number between two limits.
     * If n < min, return min. If n > max, return max. Else, return n.
     * @param {!number} n Number to clamp.
     * @param {!number} min Minimum limit.
     * @param {!number} max Maximum limit.
     * @return {!number} Value of n clamped to min and max.
     */

  }, {
    key: "clamp",
    value: function clamp(n, min, max) {
      return Math.min(Math.max(n, min), max);
    }
    /**
     * Keep a number between two limits, wrapping "extra" into the range.
     * e.g., wrapClamp(7, 1, 5) == 2
     * wrapClamp(0, 1, 5) == 5
     * wrapClamp(-11, -10, 6) == 6, etc.
     * @param {!number} n Number to wrap.
     * @param {!number} min Minimum limit.
     * @param {!number} max Maximum limit.
     * @return {!number} Value of n wrapped between min and max.
     */

  }, {
    key: "wrapClamp",
    value: function wrapClamp(n, min, max) {
      var range = max - min + 1;
      return n - Math.floor((n - min) / range) * range;
    }
    /**
     * Convert a value from tan function in degrees.
     * @param {!number} angle in degrees
     * @return {!number} Correct tan value
     */

  }, {
    key: "tan",
    value: function tan(angle) {
      angle = angle % 360;

      switch (angle) {
        case -270:
        case 90:
          return Infinity;

        case -90:
        case 270:
          return -Infinity;

        default:
          return parseFloat(Math.tan(Math.PI * angle / 180).toFixed(10));
      }
    }
    /**
     * Given an array of unique numbers,
     * returns a reduced array such that each element of the reduced array
     * represents the position of that element in a sorted version of the
     * original array.
     * E.g. [5, 19. 13, 1] => [1, 3, 2, 0]
     * @param {Array<number>} elts The elements to sort and reduce
     * @return {Array<number>} The array of reduced orderings
     */

  }, {
    key: "reducedSortOrdering",
    value: function reducedSortOrdering(elts) {
      var sorted = elts.slice(0).sort(function (a, b) {
        return a - b;
      });
      return elts.map(function (e) {
        return sorted.indexOf(e);
      });
    }
    /**
     * Return a random number given an inclusive range and a number in that
     * range that should be excluded.
     *
     * For instance, (1, 5, 3) will only pick 1, 2, 4, or 5 (with equal
     * probability)
     *
     * @param {number} lower - The lower bound (inlcusive)
     * @param {number} upper - The upper bound (inclusive), such that lower <= upper
     * @param {number} excluded - The number to exclude (MUST be in the range)
     * @return {number} A random integer in the range [lower, upper] that is not "excluded"
     */

  }, {
    key: "inclusiveRandIntWithout",
    value: function inclusiveRandIntWithout(lower, upper, excluded) {
      // Note that subtraction is the number of items in the
      // inclusive range [lower, upper] minus 1 already
      // (e.g. in the set {3, 4, 5}, 5 - 3 = 2).
      var possibleOptions = upper - lower;
      var randInt = lower + Math.floor(Math.random() * possibleOptions);

      if (randInt >= excluded) {
        return randInt + 1;
      }

      return randInt;
    }
    /**
     * Scales a number from one range to another.
     * @param {number} i number to be scaled
     * @param {number} iMin input range minimum
     * @param {number} iMax input range maximum
     * @param {number} oMin output range minimum
     * @param {number} oMax output range maximum
     * @return {number} scaled number
     */

  }, {
    key: "scale",
    value: function scale(i, iMin, iMax, oMin, oMax) {
      var p = (i - iMin) / (iMax - iMin);
      return p * (oMax - oMin) + oMin;
    }
  }]);

  return MathUtil;
}();

var mathUtil = MathUtil$1;

var web = {exports: {}};

var minilog$2 = {exports: {}};

function M() {
  this._events = {};
}

M.prototype = {
  on: function on(ev, cb) {
    this._events || (this._events = {});
    var e = this._events;
    (e[ev] || (e[ev] = [])).push(cb);
    return this;
  },
  removeListener: function removeListener(ev, cb) {
    var e = this._events[ev] || [],
        i;

    for (i = e.length - 1; i >= 0 && e[i]; i--) {
      if (e[i] === cb || e[i].cb === cb) {
        e.splice(i, 1);
      }
    }
  },
  removeAllListeners: function removeAllListeners(ev) {
    if (!ev) {
      this._events = {};
    } else {
      this._events[ev] && (this._events[ev] = []);
    }
  },
  listeners: function listeners(ev) {
    return this._events ? this._events[ev] || [] : [];
  },
  emit: function emit(ev) {
    this._events || (this._events = {});
    var args = Array.prototype.slice.call(arguments, 1),
        i,
        e = this._events[ev] || [];

    for (i = e.length - 1; i >= 0 && e[i]; i--) {
      e[i].apply(this, args);
    }

    return this;
  },
  when: function when(ev, cb) {
    return this.once(ev, cb, true);
  },
  once: function once(ev, cb, when) {
    if (!cb) return this;

    function c() {
      if (!when) this.removeListener(ev, c);
      if (cb.apply(this, arguments) && when) this.removeListener(ev, c);
    }

    c.cb = cb;
    this.on(ev, c);
    return this;
  }
};

M.mixin = function (dest) {
  var o = M.prototype,
      k;

  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};

var microee$1 = M;

var microee = microee$1; // Implements a subset of Node's stream.Transform - in a cross-platform manner.

function Transform$7() {}

microee.mixin(Transform$7); // The write() signature is different from Node's
// --> makes it much easier to work with objects in logs.
// One of the lessons from v1 was that it's better to target
// a good browser rather than the lowest common denominator
// internally.
// If you want to use external streams, pipe() to ./stringify.js first.

Transform$7.prototype.write = function (name, level, args) {
  this.emit('item', name, level, args);
};

Transform$7.prototype.end = function () {
  this.emit('end');
  this.removeAllListeners();
};

Transform$7.prototype.pipe = function (dest) {
  var s = this; // prevent double piping

  s.emit('unpipe', dest); // tell the dest that it's being piped to

  dest.emit('pipe', s);

  function onItem() {
    dest.write.apply(dest, Array.prototype.slice.call(arguments));
  }

  function onEnd() {
    !dest._isStdio && dest.end();
  }

  s.on('item', onItem);
  s.on('end', onEnd);
  s.when('unpipe', function (from) {
    var match = from === dest || typeof from == 'undefined';

    if (match) {
      s.removeListener('item', onItem);
      s.removeListener('end', onEnd);
      dest.emit('unpipe');
    }

    return match;
  });
  return dest;
};

Transform$7.prototype.unpipe = function (from) {
  this.emit('unpipe', from);
  return this;
};

Transform$7.prototype.format = function (dest) {
  throw new Error(['Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:', 'var Minilog = require(\'minilog\');', 'Minilog', '  .pipe(Minilog.backends.console.formatClean)', '  .pipe(Minilog.backends.console);'].join('\n'));
};

Transform$7.mixin = function (dest) {
  var o = Transform$7.prototype,
      k;

  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};

var transform = Transform$7;

var Transform$6 = transform;
var levelMap = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4
};

function Filter() {
  this.enabled = true;
  this.defaultResult = true;
  this.clear();
}

Transform$6.mixin(Filter); // allow all matching, with level >= given level

Filter.prototype.allow = function (name, level) {
  this._white.push({
    n: name,
    l: levelMap[level]
  });

  return this;
}; // deny all matching, with level <= given level


Filter.prototype.deny = function (name, level) {
  this._black.push({
    n: name,
    l: levelMap[level]
  });

  return this;
};

Filter.prototype.clear = function () {
  this._white = [];
  this._black = [];
  return this;
};

function test(rule, name) {
  // use .test for RegExps
  return rule.n.test ? rule.n.test(name) : rule.n == name;
}

Filter.prototype.test = function (name, level) {
  var i,
      len = Math.max(this._white.length, this._black.length);

  for (i = 0; i < len; i++) {
    if (this._white[i] && test(this._white[i], name) && levelMap[level] >= this._white[i].l) {
      return true;
    }

    if (this._black[i] && test(this._black[i], name) && levelMap[level] <= this._black[i].l) {
      return false;
    }
  }

  return this.defaultResult;
};

Filter.prototype.write = function (name, level, args) {
  if (!this.enabled || this.test(name, level)) {
    return this.emit('item', name, level, args);
  }
};

var filter = Filter;

(function (module, exports) {
  var Transform = transform,
      Filter = filter;
  var log = new Transform(),
      slice = Array.prototype.slice;

  exports = module.exports = function create(name) {
    var o = function o() {
      log.write(name, undefined, slice.call(arguments));
      return o;
    };

    o.debug = function () {
      log.write(name, 'debug', slice.call(arguments));
      return o;
    };

    o.info = function () {
      log.write(name, 'info', slice.call(arguments));
      return o;
    };

    o.warn = function () {
      log.write(name, 'warn', slice.call(arguments));
      return o;
    };

    o.error = function () {
      log.write(name, 'error', slice.call(arguments));
      return o;
    };

    o.log = o.debug; // for interface compliance with Node and browser consoles

    o.suggest = exports.suggest;
    o.format = log.format;
    return o;
  }; // filled in separately


  exports.defaultBackend = exports.defaultFormatter = null;

  exports.pipe = function (dest) {
    return log.pipe(dest);
  };

  exports.end = exports.unpipe = exports.disable = function (from) {
    return log.unpipe(from);
  };

  exports.Transform = Transform;
  exports.Filter = Filter; // this is the default filter that's applied when .enable() is called normally
  // you can bypass it completely and set up your own pipes

  exports.suggest = new Filter();

  exports.enable = function () {
    if (exports.defaultFormatter) {
      return log.pipe(exports.suggest) // filter
      .pipe(exports.defaultFormatter) // formatter
      .pipe(exports.defaultBackend); // backend
    }

    return log.pipe(exports.suggest) // filter
    .pipe(exports.defaultBackend); // formatter
  };
})(minilog$2, minilog$2.exports);

var hex = {
  black: '#000',
  red: '#c23621',
  green: '#25bc26',
  yellow: '#bbbb00',
  blue: '#492ee1',
  magenta: '#d338d3',
  cyan: '#33bbc8',
  gray: '#808080',
  purple: '#708'
};

function color$2(fg, isInverse) {
  if (isInverse) {
    return 'color: #fff; background: ' + hex[fg] + ';';
  } else {
    return 'color: ' + hex[fg] + ';';
  }
}

var util = color$2;

var Transform$5 = transform,
    color$1 = util;
var colors$1 = {
  debug: ['cyan'],
  info: ['purple'],
  warn: ['yellow', true],
  error: ['red', true]
},
    logger$4 = new Transform$5();

logger$4.write = function (name, level, args) {
  var fn = console.log;

  if (console[level] && console[level].apply) {
    fn = console[level];
    fn.apply(console, ['%c' + name + ' %c' + level, color$1('gray'), color$1.apply(color$1, colors$1[level])].concat(args));
  }
}; // NOP, because piping the formatted logs can only cause trouble.


logger$4.pipe = function () {};

var color_1 = logger$4;

var Transform$4 = transform,
    color = util,
    colors = {
  debug: ['gray'],
  info: ['purple'],
  warn: ['yellow', true],
  error: ['red', true]
},
    logger$3 = new Transform$4();

logger$3.write = function (name, level, args) {
  var fn = console.log;

  if (level != 'debug' && console[level]) {
    fn = console[level];
  }

  var i = 0;

  if (level != 'info') {
    for (; i < args.length; i++) {
      if (typeof args[i] != 'string') break;
    }

    fn.apply(console, ['%c' + name + ' ' + args.slice(0, i).join(' '), color.apply(color, colors[level])].concat(args.slice(i)));
  } else {
    fn.apply(console, ['%c' + name, color.apply(color, colors[level])].concat(args));
  }
}; // NOP, because piping the formatted logs can only cause trouble.


logger$3.pipe = function () {};

var minilog$1 = logger$3;

var Transform$3 = transform;
var newlines = /\n+$/,
    logger$2 = new Transform$3();

logger$2.write = function (name, level, args) {
  var i = args.length - 1;

  if (typeof console === 'undefined' || !console.log) {
    return;
  }

  if (console.log.apply) {
    return console.log.apply(console, [name, level].concat(args));
  } else if (JSON && JSON.stringify) {
    // console.log.apply is undefined in IE8 and IE9
    // for IE8/9: make console.log at least a bit less awful
    if (args[i] && typeof args[i] == 'string') {
      args[i] = args[i].replace(newlines, '');
    }

    try {
      for (i = 0; i < args.length; i++) {
        args[i] = JSON.stringify(args[i]);
      }
    } catch (e) {}

    console.log(args.join(' '));
  }
};

logger$2.formatters = ['color', 'minilog'];
logger$2.color = color_1;
logger$2.minilog = minilog$1;
var console_1 = logger$2;

var Transform$2 = transform,
    cache$1 = [];
var logger$1 = new Transform$2();

logger$1.write = function (name, level, args) {
  cache$1.push([name, level, args]);
}; // utility functions


logger$1.get = function () {
  return cache$1;
};

logger$1.empty = function () {
  cache$1 = [];
};

var array = logger$1;

var Transform$1 = transform,
    cache = false;
var logger = new Transform$1();

logger.write = function (name, level, args) {
  if (typeof window == 'undefined' || typeof JSON == 'undefined' || !JSON.stringify || !JSON.parse) return;

  try {
    if (!cache) {
      cache = window.localStorage.minilog ? JSON.parse(window.localStorage.minilog) : [];
    }

    cache.push([new Date().toString(), name, level, args]);
    window.localStorage.minilog = JSON.stringify(cache);
  } catch (e) {}
};

var localstorage = logger;

var Transform = transform;
var cid = new Date().valueOf().toString(36);

function AjaxLogger(options) {
  this.url = options.url || '';
  this.cache = [];
  this.timer = null;
  this.interval = options.interval || 30 * 1000;
  this.enabled = true;
  this.jQuery = window.jQuery;
  this.extras = {};
}

Transform.mixin(AjaxLogger);

AjaxLogger.prototype.write = function (name, level, args) {
  if (!this.timer) {
    this.init();
  }

  this.cache.push([name, level].concat(args));
};

AjaxLogger.prototype.init = function () {
  if (!this.enabled || !this.jQuery) return;
  var self = this;
  this.timer = setTimeout(function () {
    var i,
        logs = [],
        ajaxData,
        url = self.url;
    if (self.cache.length == 0) return self.init(); // Test each log line and only log the ones that are valid (e.g. don't have circular references).
    // Slight performance hit but benefit is we log all valid lines.

    for (i = 0; i < self.cache.length; i++) {
      try {
        JSON.stringify(self.cache[i]);
        logs.push(self.cache[i]);
      } catch (e) {}
    }

    if (self.jQuery.isEmptyObject(self.extras)) {
      ajaxData = JSON.stringify({
        logs: logs
      });
      url = self.url + '?client_id=' + cid;
    } else {
      ajaxData = JSON.stringify(self.jQuery.extend({
        logs: logs
      }, self.extras));
    }

    self.jQuery.ajax(url, {
      type: 'POST',
      cache: false,
      processData: false,
      data: ajaxData,
      contentType: 'application/json',
      timeout: 10000
    }).success(function (data, status, jqxhr) {
      if (data.interval) {
        self.interval = Math.max(1000, data.interval);
      }
    }).error(function () {
      self.interval = 30000;
    }).always(function () {
      self.init();
    });
    self.cache = [];
  }, this.interval);
};

AjaxLogger.prototype.end = function () {}; // wait until jQuery is defined. Useful if you don't control the load order.


AjaxLogger.jQueryWait = function (onDone) {
  if (typeof window !== 'undefined' && (window.jQuery || window.$)) {
    return onDone(window.jQuery || window.$);
  } else if (typeof window !== 'undefined') {
    setTimeout(function () {
      AjaxLogger.jQueryWait(onDone);
    }, 200);
  }
};

var jquery_simple = AjaxLogger;

(function (module, exports) {
  var Minilog = minilog$2.exports;
  var oldEnable = Minilog.enable,
      oldDisable = Minilog.disable,
      isChrome = typeof navigator != 'undefined' && /chrome/i.test(navigator.userAgent),
      console = console_1; // Use a more capable logging backend if on Chrome

  Minilog.defaultBackend = isChrome ? console.minilog : console; // apply enable inputs from localStorage and from the URL

  if (typeof window != 'undefined') {
    try {
      Minilog.enable(JSON.parse(window.localStorage['minilogSettings']));
    } catch (e) {}

    if (window.location && window.location.search) {
      var match = RegExp('[?&]minilog=([^&]*)').exec(window.location.search);
      match && Minilog.enable(decodeURIComponent(match[1]));
    }
  } // Make enable also add to localStorage


  Minilog.enable = function () {
    oldEnable.call(Minilog, true);

    try {
      window.localStorage['minilogSettings'] = JSON.stringify(true);
    } catch (e) {}

    return this;
  };

  Minilog.disable = function () {
    oldDisable.call(Minilog);

    try {
      delete window.localStorage.minilogSettings;
    } catch (e) {}

    return this;
  };

  exports = module.exports = Minilog;
  exports.backends = {
    array: array,
    browser: Minilog.defaultBackend,
    localStorage: localstorage,
    jQuery: jquery_simple
  };
})(web, web.exports);

var minilog = web.exports;
minilog.enable();
var log$1 = minilog('vm');

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
var MathUtil = mathUtil;
var log = log$1;
var formatMessage = formatMessage$1.exports; // eslint-disable-next-line max-len

var blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAwKADAAQAAAABAAAAwAAAAABNOznKAAApC0lEQVR4Ae2dB7wU1fXHL/Bo0nvvHQTpShE7oiYi1igxdlCxpZii/qMmmqiJSexI7L1rrIANpYP03nuV3jv/33dgnvPmbd+dx+7be/gs+3bKnZkz99x77im/U6Tc1/88bCxZDmQpB4pm6XPbx7YccDhgBcB2hKzmgBWArH799uGtANg+kNUcsAKQ1a/fPrwVANsHspoDVgCy+vXbh7cCYPtAVnPACkBWv3778FYAbB/Iag5YAcjq128f3gqA7QNZzQErAFn9+u3DWwGwfSCrOWAFIKtfv314KwC2D2Q1B6wAZPXrtw9vBcD2gazmgBWArH799uGtANg+kNUcsAKQ1a/fPrwVANsHspoDVgCy+vXbh7cCYPtAVnPACkBWv3778FYAbB/Iag5YAcjq128f3gqA7QNZzQErAFn9+u3DWwGwfSCrOWAFIKtfv314KwC2D2Q1B3Ky+ukL0cO3LFPFdCxXw7TXp37pCqZa8eNM+ZwSZt+hg2bHwX1m8e6tZu7ODWbEpuVm2o71hejJk3sUKwDJ8e+YnV1EVz6tcgPz82rNzDlVG5vaJctFvJduFevm7l8qYfjPsgnmtTWzzL7DB3O3Z+MfRWyJpMx67VWKlzbX1TnBXFW7ralXqnxSN7927w7zqATh2ZVTkmonk0+2ApABb4/RvknpSubK2sebAXU7mDLFiqf0roduWGwGzP7cbDmwN6XtZkJjVgDS9C21OK6yubRmK3NKpfrm+LLVzHEp7vT+x14mtejS6R+aOTs3+ncV6t9WANLs9XYuX9P8qVF3c1aVRgV+Z+v27jRnT35LC+YtBX7tY3VBKwDHivO+6zY7rpL5S5Ne5rxqTX17Cvbn8t3bzJmT3jBr9+2M68Lcf9fytQ3WqAo5JWWBKmlKFi1mVuzZZkZsXm6Gb1xiDhw+FFebBXGwFYCC4HKEa+QUKWp+06CrubPhieowqTPK/WXxaJNTpIhpI/WpryxF8dCYLSvNuZPfMYdM+BLS5YuVkPWpielbvZnpLgtTZS3OI9FcqVZXzvjYzNu1KdJhBb7PCkCBs/ynC6Lnv3L8z02rslV/2piCv7qOf0k2/42mhEZg/AC9KtYzn3a8NK6WH14y1jy4ZEyec4pJoM6p0sT8Shao02WCpf14aIlUqx4TXpFfYn88pwV6rPUEB8re8I2fV7Wp+aZz/5R3/v+umup0fq5M54d+2L7WvLl2tvN3rP/9TjNSW80eUI0SZcw9jXqYOd0HmDfa9TV95HeIt/PTTqPSFc0NsmKlE6Vuzk2np0rze/lDw5PMXVroFtGImmoav3VVviZ3a8Sdtn2dubxm63z7wm0oJtXsyZZnmxnyGv9C5yXS4UO1PaheR/P0iklm71HhDHVMQW6zM0BBclvX+mPDbubuxj0C6fw8SlOpVaWL+ce1Ik54RLyP2qF8DUfdSVXn5/rVNZv0q9483lsJ7HgrAIGxNn/DN9XtaO5q3D3/jhRuGVSvkylRpJgpdXRBzfdh/ePa6UKof+lC/qEiXe6r0N3HJTVamoeanRr4c5WTdWbxyTebQXOGmWV7tipArqb5vyY9TeqVrcQf5fTKDU1xqVj708AsagUg8fcY85m1SpQ1/25xZmBqj/9G6FxDWp/j35w2v8spSrW5VLVZik491mRVoAJ4A/9ueabjGCqAS2XMJWqULJMW92oFIODXcFH1FuZcOYws5eUAptV0ICsAAb4FVJG/F4DeH+AjBNb0zjRxhlkBCOwVG8PCt2bJsgFeIXObXrhrc1rcvBWAAF/DNUpcsZSfA4cOH06biFMrAPnfT0q2oON2LV8rJW0VtkZGK9huz6EDafFYVgACeg29Fc8fRKhDQLdboM2+tHp6gV4v0sWsAETiThL7TihXPYmzC++pc3ZsMO+tm5s2D2gFIKBX0a6sFQA/aw/K8zto7rAIWQb+M4L/bQUgIB5b609+xt63aKT5Ydva/DuO4RYrAAExn7RASz9x4JkVk81jy3/4aUOa/GVjgaK8CHB4QFtrJ52evFeCzUBoIOJy04Hd5sd9u8zKPdsVb7/eTFXM/eYDe5wWOc7SEQ48unS8uX/xqLRkhxWAEK+lpkyYlwmS5PKabUzrONMVEYIvNiySBShEw1m2iUSc383/xry6ZmbaPrkVAM+rOUELV0KHz1S4btEEezCzBZ9sp5k7fjTXzvosNz0zXflhBUBvBqfVnxv3NP1rtUm446frCy7o+yLG5yEl0z+ptMeD8vimO2W9AJCjeo86P3CD325eZj77cZF0/BzTQYkk6ZS6l+4dab9yfFF1Hl4yzqzZtyPdbzf3/rJWACrllDLPKmkEhAPwb/pNfd9M2LbG7BSUOES8ym2y5MzveaMpnSBeD1ibQJQXTat8rNx3n5I/9hw8YN5eN9s8unSCWaoMtEyjrBSAhqUqmPdOuNA0L1PZeV+XTP3AjNyyIhdGxH2JezSq/XXRaPNAs15xdeJHNAo+vXKy2SVhOiQt4KSKdcz/2l9swNUpLLRGyNJDVk41LyqsYdP+3Rn7WFkHjNVMqXjDOl5mqpY4znlpP+7fZZqMfCbsCywucyfoZy0E+VdLWUw1ld5YSyHOtfXBROqn/kI/++THBXk2lyha1NQtWd6MPfGqhGeTPA0ewx8Ttq42gwWn/tH6+WkJdRgva7JqBqBqygca+d3OD7MW79piKhUvZTbvP2K/9zNwvwpIELuCVah00eIO3OBhqUf75NanuERFqVLVJEy1JRxrBC4LIpuf9h06ZMDif0vgVNfUbuffnfa/QXR7Z+0c87Y+C3enRxx/qpiWNQKAHv/uCf1MA5UP8lJZ6ejEqIQjQF4BcSqh7C46/M6DeSuqMP3zmRei43vb3KXw37sXjMgYAdioZ2KUR2jHa9QvrJQ1AnB/k5NNR0GP+6mJ4PrKFStpth04svj179+mhey7mjV2ybyHdQO04yW7tsr7u82slxd4k1QojH3g74B+vDtCnDuYmM8KupBMscqaOdKJWPRPUpzO15uWmq+E5EzMTiRw3HS692TuJSvWAF2UmPJlp8vD2vgXaYrvNuFlg0XDT0M7/kLox3X8m/P8pmOzKPz70jEyoy40u0O0455AGAUzTrcKdc2Aeu1NnyqNpVYVfEgWZkuQmiero3+7aZnz2XQ0jMO912z4LvQzAJ3riZa9w3Z+XvJQhS4Uk6mSBBb0e5LZG2tm+HfLs6J2fs4vq05NnNBjLc4y760NHevOuoPZZK9mCBxEI+RzmLR9jTkkM9ElCru4uk47p8oj7QVB0xWrhKVrhr5nyEvLWiUdgKmCeNZ42iz0M8BAoRH/o/npYXmCbt5UViBKibLI/Uww4hR5YM2QiNly1d7tptXoIbnXI2iOtcOQNueYFsdVMS+smqZF9TwJpDHbj6pdXKeUrl1R643rlUd8uTzSWJlSSQ+oXsAjS8elsslC0VahngEYye+o3yXii3ps6URH1y2qY0+sWNtQoigZqqNypawH3JzXQfU7mV+rAAadG2I2AiVu2MbF5tkVU83YrSslaEUdBxxOuIfVSflQF2xgvQ7mfBW3SNQR532OaGqc99hs+rtQC0D/WsebOqXC18/FU/ufFRMcnZ1O+0iz05J+997SQi3kaGPx7SfUMgBi+aB3Y2Z9VvHyhFUfkHqE6fUHeaXnzdtobps73JyrohTX1W1venpq/frbjPa7i8oX4ZHOhoVtNF549xdaAeBl/1YjbyR6SFVQ8NQWV6UTkthRfZIlEA9y1F5RdeIzYyh0hzVoQJ32zmeBFqUvKZ7m1VUzzEF11R1SkbAwfbB+gRm+aYnWJsW0VmhrrqzVVmVTK+a7VUyXY1UfgPUL6pZXhQOPk1JMWK4gZhtyGAqbXT8fU6JsKLRrAEr4fKTwg3C0TkXg2o15zjFbllKHnXjStaaBp/A0lpG/KaqRsF7UkQuEaX9BteYRZxSudbNyXl9bPcuJAfpvm3NVUqhxuFsIu51O/50Kyz2nUIPhUpWOqEhHygpReE7LdXXyCrIidTRAL5J9dsHU93TOCkPtLvwWuw7tN+NPvNq0iiLUzDR3zP3KTFchjGykQisAoCNT2SQc0VHflWcTwgrztKqhuPT6mlnm5jlDQyZvn1ihtqOXU8Y01IzRZswQ+Qq2O7PK4p43OZ3TbTeRb8KLP/pxvhksFWneziMF5tz1RRmnsx9w/A94qrHle4k10Ddd+hvyHCLRAXmq/7FsnPm7ZsRUETMb4eXMgoSObJGnHYfa8zICpFPQXKEUAEKbF6rzhauovkxOrC7jXnQWqiwwp3e/3skJ4OWP3qwKiVPeDtn5/Z2jrha818lq81vV04JIh2w26hkF1R1yZpMZ3W/wn5LU75WyML22eqZ5fvU0qUf7df/7o8bcn1K5vvm4/SWaM6LTGxJ8UBuSjeM/pVIDzUzNTccKNY0fHYMssVu0rnk3TaBRCuUaAOdSuM5PN7hn4QhzQDo2ZUmBL3SRihltbwoz8ofqPhukc59ZpWHurrFbVjnmzH2H9prTlFWWakLg/tiom/MhdPuFldPMG2tnRbzMd5uWOzMEs0E0ukIjNurUL2d+nJAQoJ4xckzfsc5MUWE+/B6ty1Q1o7pemevsK63BaXCrPob4onRAiIjOlWhcS8P9vSrVz3NXjGj3LRplWks9Kf/No3L1LzVM+9ji6VAuPbZsYlzTM+bMEzzpj6wb8Cegh7MGCZKAXRzcuo9TwysaAl08+QgU6qaDxkv1tX4iQHCvFv8EFtL5oYXq6BdN+yDPjIrR4U4VCkwHKpQC0MMXunCGKp8PUQgvZkaIkR6dmbpZrn1+g6wjT66IHbbjWkV1ouN6iTga9HA6QY9Kdb27AvubrLVyRcMjUFRWBGzbsc+ZbyScsdJlWjvFU87pOnmxl0utxIvup31yNDIwzJIxwUs9Vbs4HajQCUBVxeg391g+Hlk6Vpac9c7I7GU4HZWaulhbIHJYYy3g3EbT+kM+nwFCtWz3kYyoyjmlDaHXBUGnaaYBhpGcAz8V1zaC9Qjcu2LG/8x5U96J2ex5s4rt3apPJKonHwuJRQ80PdUJH4l07GcKN/ESgpEOlJ9r6XBXSdyDH8aEcF4WpaGIUATQyui8hCjEQiyaXz7+Z6aUrxTpONnf0W+hk30qWCztJnoM6k2d0uU0+honl5n7q6j8BnR5Fr+NFaOEtYho1tFao/QY/4r57fyvzTapatHogaanmAtlZvUTbVPreOKJ1ziq3kurZ0SMKyLEhIHJS2NC1DP27i+ovwvdIpiMLS+RpBKJ6DCvy/mEVzgWIq7IO8O452CDR5DILzijSrD6v3tNvjG5fqTYIgLbih0uYp5odbaTqdZV5lrWIlPk33hlzQzzp/kjnIXtblmOSF5/c81spXqeYq6u3TZsuidrixfbnGdOkUADGEBcU69K9RyfCHr8C7JGPbJ4nJEtyntL+f7mmu1Vc9hLL6xKD4ToQicANY6mOrrMJpWRkN9QREhCRy0myW2Nhaj19St1mFD0pWLoCXNmcV2Q+u1fl4xyOjbOvGvlUb6sRqs8t4f58yp5ji+q3tI8IHQ2Oh73uOfwkQSd/yybYJ6S0Jzs0ckJl0CYHauOzr9GOj4faKsGiqfkk3hCMIccx8wCERFrNBthBPAS1riTJIydhLLhEmsC1kvpQIVOABiBvUQK4nw5kPwvhmNIYOmi4LfHl0/0nhLyb1AkCHcORUR7zj+aEYYahG5cEMTC86N1853RP6dIjvn9UX9EqGvTQVm3DNTC//Z5Xxpye+nkO7VuuWTah+bECnXMY6pmSS7DLfIFECaB8NTVswxudY5UqYoO8sOLGvWNZhpGddQv8hvaCD3v3sYnqwr8cabPpLedfSWlIu5R+xcq+ecpBQC6RPbcjbOHuj+P+XehE4BVe/Ji0lylEXvB7k3m8WU/WXiYvklxfLPdBWbIiikxvYRHmp9mwpX2/GHrWieUev/BvaZHEgFrMd2I56C/KMSZmCEC+a6VP6OyT8/2HJr7ZyOFUHysEJHvpbLdPHeo2bhvjwRhnxkpY0BXOQdpy6sOLlLONGEWmJKx8ZDPcCR8O0e5EnXNvULS6+AxBc/scYMhJokUUfYfmRlyL29umTM8rXCD0l4AcOAwUuc3sP3EVO9fpCz66YEmpziRl69J9+XFnKQXQ1piaY2an/usE/5z+Y3qg2kwHI1UZ9p9eL/jfOvtcYyFOz4V2xn9P14v3V/qTLFiRc2djeKzq6PLT+92vROa8OeFIx0eE2IBFIyfmCkgBg4E5BxhKd3duIdT7Np/LB2ejzeuyj3mrgUjzKcbFro/0+I7rQWAQC5SEgkPvkjYPdNiCNgCnJZRCi+vl7ppiufjpYvloIkmWpFUH7ctYvvpiCWKFSuwGQC0ZboqHfJ66f6J5Bijwtygcy/VuuGehd8rLHuOoxa5z+X9xqRaVzE9n3a4LCEVj4QcTM3pRmltBkV/B7KkurA7I2V1eZlKPA5Y9NHoQb2Q4Vq4RqNIqg/nohrMOCqYRGmCOxQ0Ecv0iUKkyeuVocb8LoLuH8u9YNbsX6u1o/OHOx5rGRCS8a5vcI79VcKartloeYfJcE9/jLZjz3aJKEzc7Uz90YjRkRDiW+t3zncoMfZ/1FSMaTAaRVN9OH+q4l4wD+7VeIzpsSDoLwrrQC1klkt09PffJ4jW+3EmhCFQM5rKpxAPEfg2ULFVwKukK6W1AODBdAmbNJj9/1CxhWjEqHz3wu/MK3LQXKLpnYUf8fFTtq0z70tvxpQXjVAtHml2erTDnOhRrEAcf3bVRlGPT/YAQolBnkMAEDw3EjVcu1hdnAIVTXopUSf8hM/9X1ijuXlfPoV9vnUAuj8Yp97FbrjrudtZi/1SKHlTpJKmM6W1AExSh/XSZTVaxyQA7jnAfjywZLT7M67v2zV71C9dPuo56P8koJSV06kgLEBHRv/Djif6BiX8R9P9ifF/VnFQM1Wd8Xkl6HhR8fwPh7lzvng2SVYtZlDWR+W0oG1UupL5SrAysdLLwgu9a8F3ZrvPJxDr+QV5XFoLACG1XgLMFofKJN927zGp+JvEdhLZYyEyqiBG5LZREk9iaS/SMYz+nwp36IBmHIE0KsUxcsI/UCjPKd4JwpN74viX5Snu7Vi1Ql0Hu/+3nfo7x07YusbBOiITDsGOJZx6qXwKv5n3lfkqTZxcoZ7Rvy2tBWC1wKbWK3WRRbBLd+ilXznzE/dnIN9/bdrLcfBEa3z2zg0OnhDHdZCrnw4UJN2/EMuP7P5yMg2QQwsLVTgizukq8Ql10CWAgH8x/SNzRuWGCmDrJQdWNXdXnu/TlNDCJ1ZarUQdVNOXpXIyEGQSpbUAwEjCeL2pjX01Ip2lF/hlQKPMSTKVXiwfQSxEAvwBqQmEDPSRryBIWqLR9TPZ0DG35sjuHy3hH28uiHehiDCErycsdTr5tQpxYLGPnh8PEfZBJC1rhndkPkUNzERKewFgVPEKAEz+Z4sznOnczY1NFeMZwTF7xkrDNix24BQB0A1a/79/0fdOFhujP+EMbh5DqHv9jxJ7PozB8oJaxId4HXwkJBLheyH8obbUQASbjs2iGPMyTkQQ5eboQ+fH45vplPYCwCgLXIjXvt5IsB//VFQmuaWpJOBG4ilwRwg0RMxLR084QCrvibYY/T+XsBHEVkKdEniTcESgGSHe8RCeXvT2TNLd43m+SMeGt4tFOquA9zEL+ImozFQAWbntMtrd07i7+zPqN+oFIFZQm3LVcnNeo56YwAH3MfpL5cBUObB+h7CjPzWLr5/1eVTvdgK3UGhPyQgBIFkF9GU/3ShcnL8pGymenFd/G+5vMDlrxoHHOUYzE55fQLB6V27sNpPy78UStC8Y/SUAeH1/Uz/06I/HdeDsLwwLXUuxcyAjBIBUxT8s+DbkU91Sv5MZ3ukXDjpzyANi2Iib/zcNjkCbxHC4cwjx/0RRlpFOfrICy4Ki+6XOuKP/TUpRJGwhFBGjn40qTChexLMtIwSAB8Kd/rXQHEIRIQijulxpfqdOHK6DhDrP3cboT5mjWIhFIc4iN8l8p/B5ulaoFcupcR+DmvWFHG3u6P/rMEC/s+Xkilfvj/tmCukJGSMA8P/XcrLg2g9FJKL8WbHpc3sMdNYG3kVzqOPdbWSFgeAcCwF93n3CK6bXhNdyERDonECsB0GO7q+FLzm1g8KM/lhorlNFdsIxLMXPgYwSADyhoBv4Y1W8j41Jj7XBpJOuMZOVD8saAYyecDPDxTVaOCY/bxuh/ibnFtz/xSoSR1yR6+YvqRDodqP/G3O+Qqi2Q20DtHaY1CwEzBQ5bO4IY/kh0nKWHHKWEuNA2ptB/Y81RsgGOHmGtD7Xvyvfb6IXWSPwgagISb7AvF0bzcJdm53PbWHUCn9j9yi4jvgYf0G9vSqaV0QIW4NVFxicoVTRfSSpMPprjXFLvc5Ogru/bWAcH1durqXEOZBxAsCjviVQ26rC3XlQsB3RUNG8rCGvlU8ihOD5O7/bDg65P8z/NmUCwOgPHDqjfwkFW9weIuYH5LUBcz5P+czjPlO2fGeUCuR9KWQXXTf784jqkPf4ZP92of4itQPcSCq80/e6o7+sU4OkzgFv4qffz//GgUTxb7e/4+NAxgoAj0llFRK2gd4OknLhP6JEuzELNPr+aUPnZL2SCC2QauaO/vg3bg+h+2MRe0OAX5aS50BGCwCPP0oOqR4TXxGqwYrkuRGiBZJnzpn89pFF70+BlblHsi4A9Qz0tZ2H9ukjlDnFw3cZ/5I5RzDr8Qbt3YvX19X9lZPgH/1X7dlubp/7Ze717R/JcaBYyat635dcE8f+bNL1gAlHTQGUKlLmUzx3i73/tB9ed6C8UW0IRGslXFCS7glLICOrZskyTiUWMDopP7Rq7zbHQ8wxZEV9IdSJZ4Be0exBQQ3OC0eM/ncv+s7J9SXm5/V25zsBae7xrEEum/GRYqM2u5vsd5IcKPACGWDKdFeRaJDM1ijWH9CqVNqwmyp7iXh+YL6ToaFyQF0981MHKAoY9ZKyxb/R9nzHpEoQHLnJoM5xPW8tAorkgUTNh8h4cpAhAKQOqQP3FdYm2WaUXYKoPk+a5jta2E9VBhzCC2bRrfW6CHokb2zS31WyKZVVXJwbyPL/ClQAgN/7l0KZ6TgQenLPCa86IcWpFALaJjwZcNdOCZQ9fVhphP8SZOBujeIEyeEl/rTDpU7xOdqOhbDg/E+5u48unWAWacTm+RjBGQAY3RtLcP5P2DqUYmJ22eWpLl+heEkzr8eN5jjPbDFRGVpnTXrTBrrFwvw4jikwFejMyg0dKG0XXY0O0nDk0068+UGfMY/Z4YzKjZzOSxy663SK47kc9YMoUiD+agkwN5b8Xjr8L+Voe1ujMd5dRm3CHIYpH9atIhPrPVB/gOoolFA6t1oTB40ZQSDxBPhBIjcB5SLOyY9ezboCoUCtcokqj4RfeMuwuvvsd+IcKJAZgCSLEZ3758KHc7vUiLpVDi3vyOd/jK2n/xbV2XFgjdqywlCCiHxgEjNCrEf9p+f5Tbz+varZ6+1U3gOov/WzKe+a1Vpk0vkIkBugpHPUqVQRC+pXVOPrcdUm3nngQEi8UvdaOMCWnTwoz5qBMBAW5CSkWEoNB8KvyFLTvhOqDPqwi53vNkuY7z5Pvqq73ftNR2fh6DqwXGRmEjimyaM7WTrzHIUBsNjkQyf2p+YB00eRaEZhUIpDEU6uS4QSt0uIyRTOoPM/qyqTJISnkgjHuFVeaT7o8qhZLJZDEQtseMQs4hLYn++062e6TXjZmTnc7fY7cQ4ELgCA03YWBLmfasl6QkfbrmCuUMQI2Gvia6aJPLc3yRl0oeC9XaBVFp0Ar/LxE6WOGMEpgA2qHKpDJHpOuQZ3Lxjh6PtUWamoRPNPOlySu0iNdG4y+yjkgaoXTgB4hlBlWBsI4+hBxTeB8GwpeQ4E7gdw43D8twoyQbjQAvRkJgc6wSyF+joOppFPOUBLbkkjf3vub3Bv6gpBDp0/UudnDUJFSGJ80P3R91uVqeYE0bkWGrfNIL5ZpHsRG7zXKK3n7+DB0/fu42+w+k8twCo0/usXpt+BCgAL33BhyWDvPCegpiP0k4sVVam5gtiAPwFvHrx/1gmoNp8IFeGK6R+bBhKG+xaPTNjbSjL3qT+8YT4UogEFHrjmhYoK/bbzFTFBjKeiA+A8w84PsWD2UiM9/0cdLo6Y6cZ6xlLyHAh0EUylQYqtRSISvq8Wfg0mUcCX+tc63gGlclEPxsrm/pwquAAHmCO92C10gXkS71JzgdHeWK+DU8vKa4/nmpgecZItU9uNSlVwOvd0Adn2nfKeY5UBXBbHFPcJvv6xIPwAV874RMhtPzrBb4R6gzK3vNegqHnGP1PRO3D+LSXOgUAFgCytdqpgGA9h3ck7Hh45GzWFGJjBSv3DCsJxrv5MhyFeH9z6G+q2d8r9sFCm8glWo1ISLMyaQCu+u36uo1o51U3k3Hq/fT8tjvPCpsdzv6k89ueyQqHildPzPK0awH2rNYvYPBly/aa9H/EYuzMyBwIVgCU9bzJVpMakmigM9/Ka6eZFLWB3Kx6f+BuSwgmNZqHM7HC5Clo8q5nDmzyDYCE4LLDBvflUi11UsXQh4NqvkfcZv0dXWa6+6hwdj7ONin/DD0uJcSDQNYADY5DYfUU8C4z6exr1MIt63mzePaGf6VetuTp9jhOSACTghn27VcRtUp7OT4N0fvRtLD1ju/4qrTo/93dWlUa5cUyoarFAwf+8auRZgnYthedAoALgrw7uvw3AW28UlAdT/5+E+hCumqP/PO9vrCkvqW7vMunMFNFA5fJXh/Eej52faieRgtK8x0f6Gz+FC44b6bhY9zFDDajTwZnBqMg15CiwbaTzz69uBSASf6LtC1QFOq9qUyeALFTWFlVcwPDHHOmlzordYeF8gUb1RKM663z3RMTwCfwS38jikwwt373Nic1hEQti9cCjC3HifJIh2ms35jnH6lWuWElnMUz8UDhCoJuOesZsCAMWEO48u/0IBwKNBQLScMK21Q7cYBWZ/RAEoj9vmzfcqTUbqj4XiNAEkb22ZpaE46ATOIfOHg+tFzgUMUCh2sfSdK4iRXtL3UiUcLb9bOo7si4dKeBBp/1EsOUvqgYv+jum30g+iEjXZQHMQhj1h7VMy7JVQhajc9uAp/CY0G1L8XMg0BnAezu8WPTvWKqzeM/DW0yVl4Gy7rSN0aJETu3JijJ1qxu67YHkhmqx9tTb80Rauvtj+SapnsonkfRzoFbOlwXnRsUSnVQxfgsTWEDXz/zMESZAa4cJ+CsS/W3xGPPQ0rGRDrH7wnAg0DWA95qMjPF2fs7H/Ek9rx4TXzW9J73lxM1TeyoSEaM/SotcCKsQQgSCM3j6EwWX4g0zjtSOf9/rmpUISY7U+TkHte4Dxfj3nvyWE+79qgLg9njCnf3t+n+frdnJdY5RYiialad2HJCO/mtl++9AVaBUM5dgt4+lHpFsslQqAmpVnTBV2SsrDoj6Wa2VeNJOkaA4uh5sdkpClh+Q125QAj6J+OHCF8I96zolyBD2/LzSJAntbiYvL8IYiZipcPi5JaJylJFzaoSCFXMF84IKZil+DhSYChT/rcV2Bh2qn7KsKPJAEbdQC+7YWsp/FPm3Dy8d5xTbC7WeyH9G9C044M5TZCp4RFS+DEeg0LUf+7yzGCaKFCsXghFqOfyGZqYbFddkKX4OZLwAeB+ZxBe8wSxy0Z0TWYhiVQFkFkTqoUJlTlXH996n+/e1qoP8z+ZnhLV29ZHKN0ahIKhuzB6UiX28ZW8nLdNtg+8nBI6FRc1S/ByIz7wSf/sFegbWGBAZ+DBSNpU1ppNqdxFZyexAXgGAWq5+zc3hQQZSfKqsRt/L+kK4RTQdP1UPxX0S4w+mqZ9w2lVXyDgmUDo/xH1dpLyFOwUCfJcnX5g6apYS40ChmgFiYQEdihGVtEOIyFC/LyKWdlJ1DPezQPm//vKldwpbiIU0qZN+KpujGKYTLnJmOfaRzAOOqKX4OVBgVqD4by2YM1jE4jRiccrnWHZ+npD7CbWAHakU0FCdn3N2CJKdOmAuUa3SUmIcyDoBSIxNwZ7lDxlh3UECfSRyl8N4pKOZSSO1k+37rACkQQ/A++0lLEXhEok4Dg8xdYkhSp5aSpwDVgAS513KzmTB66crax8f1l9AdtxAeZmhr4QibSlxDlgBSJx3KTuT5Hg/UWvgZn3cxTr7iXIld/lrBfKRMQeG6HeblvtPtb/j4EChMoPG8dxpdWg40K3XhXcKcACpnphLr6jVRnFRLXOD48ZvXe2kdqbVw2TYzVgBSIMX1lBQJ36ic28+CvtO9holn/z0poVI97Mk7t9WBYqbZak/wcVK9bb8lOKOSPUEdv32Bp29u5y/iXT9QPnNlpLjgBWA5PiX9NlYfPzAYUTNDlUAHV7qQ/p3scLB/YTHGlxRS8lxwKpAyfEv6bMB4fLHLFH9pag81TmqDnlhtRYhw7dfVYi4peQ5YGeA5HmYVAvdQiTMPCEvL4BdpFeGqmE8X7nI4JlaSp4DVgCS52FSLRC16iWKb2yWCgTVK1k+JEbp40K8sJQaDlgBSA0fE24FVAsvsfgFChLT520hFr/r9u5UmVhbIM/Ls2T+tgKQDPeSPJeaBW7BEJra4ix+FysSiKXvYS1+W+a7wmBlw6W6mk6+i2TRBrsIPoYv+1zBxnjptbUzHc8vi186P7nMXqLe2PMxYAV5z7F/R+aAnQEi8yfQvaRGeulJ6fYsfgHuCgUqTC40s4Sl1HHACkDqeBlXSw2U3tjmaKVITgQFe+v+I527gZCs23gqw7Cf0f9xpT5aSi0HrACklp8xtwZqnpcY/XfL8wvSNQnzfhq8crLZdDQ10r/P/k6cA3mVzMTbsWfGyYG+RzE9WdAuVPLLcIFhkZDP4vciFevwEgXAAfu1lHoOWAFIPU+jtkj0Zyfhk1476zPz+Y+LVLtAI7/CmykXG2rxy+zgJsZHbdweEBcHrADExa7UHAxsYsdxLzg5vyDfQTs0ygOpOH7Lameh61bI2aik+CdXWN0/NZzP34pdA+TnSeBbqAQPxInb+d0LkqC/bO8282+VT3XpUf1tg95cbqT+2wpA6nkasUUSW6hpHI72yAzq6vtrlStMGVdLwXHACkBwvA3Zch8B3y5VYcBIVEW4phBYpJSKtRQcB+waIDjehmz5bEE3rhYe0QyVQCLmx0+g1rmIEFTGtBQsB+wMECx/87XeSwWuLxKYb4kiocceTKFu/WQC3ywFywErAMHyN0/rjUtXdCDda8oMOvpo/QJQHnIU919OZlDSH99W0T8X779npXp5zrc/Us+B0MNQ6q9jWxQHCHFwiUqXm077tflQqY1Ldm8xtVTk4vTKDfLUL7hP1eC/3bTMqYHsnme/U8sBKwCp5WfE1kCv9hJ2f2BOwhHpkn9o2M08sGR0uEPs9iQ5YFWgJBkYz+lzlcrIiB4PgQjhOsXiOc8eGxsHrADExqeUHXXHvC/Doj6HughocP60yVDH2W2JccAKQGJ8S/isJfIBXCw8f0qtxkqhsENjPdceF5kDVgAi8yeQvVR+7KEyruNiQHYAGpFEeUvBcMAKQDB8jdoqC+I+k982g+YMMysjhEaQBGOzwKKyM+EDsq5EUsKcCvDEEkWKmbOrNjJ9qzV3UOIo8bpeKtJ76+aqSuVYBUlbCooDVgCC4qxtNyM4YFWgjHhN9iaD4oAVgKA4a9vNCA5YAciI12RvMigOWAEIirO23YzggBWAjHhN9iaD4oAVgKA4a9vNCA5YAciI12RvMigOWAEIirO23YzggBWAjHhN9iaD4oAVgKA4a9vNCA5YAciI12RvMigOWAEIirO23YzggBWAjHhN9iaD4oAVgKA4a9vNCA5YAciI12RvMigOWAEIirO23YzggBWAjHhN9iaD4oAVgKA4a9vNCA5YAciI12RvMigOWAEIirO23YzggBWAjHhN9iaD4oAVgKA4a9vNCA5YAciI12RvMigO/D9FXF12c6AtNgAAAABJRU5ErkJggg==';
var Message = {
  pose_classification_model_url: {
    'ja': 'ポーズ分類モデルURL[URL]',
    'ja-Hira': 'ポーズぶんるいモデル[URL]',
    'en': 'pose classification model URL [URL]',
    'pl': 'URL modelu klasyfikacji poz [URL]',
    'ko': '포즈 인식 모델 URL [URL]'
  },
  pose_classification_sample_model_url: {
    'ja': 'https://teachablemachine.withgoogle.com/models/aqQcgCOtq/',
    'ja-Hira': 'https://teachablemachine.withgoogle.com/models/aqQcgCOtq/',
    'en': ' ',
    'pl': ' ',
    'ko': ' '
  },
  classify_pose: {
    'ja': 'ポーズを推定する',
    'ja-Hira': 'ポーズをすいていする',
    'en': 'estimate pose',
    'pl': 'estymowana poza',
    'ko': '포즈 인식하기'
  },
  pose_label: {
    'ja': 'ポーズラベル',
    'ja-Hira': 'ポーズラベル',
    'en': 'pose label',
    'pl': 'poza',
    'ko': '포즈 라벨'
  },
  is_pose_label_detected: {
    'ja': '[LABEL]のポーズになった',
    'ja-Hira': '[LABEL]のポーズになった',
    'en': 'pose [LABEL] detected',
    'pl': 'poza [LABEL] została wykryta',
    'ko': '[LABEL] 포즈가 인식됨'
  },
  pose_label_confidence: {
    'ja': 'ポーズラベル[LABEL]の確度',
    'ja-Hira': 'ポーズラベル[LABEL]のかくど',
    'en': 'confidence of pose [LABEL]',
    'pl': 'pewność wyboru pozy [LABEL]',
    'ko': '[LABEL] 포즈의 신뢰도'
  },
  when_received_pose_label_block: {
    'ja': 'ポーズラベル[LABEL]を受け取ったとき',
    'ja-Hira': 'ポーズラベル[LABEL]をうけとったとき',
    'en': 'when received pose label:[LABEL]',
    'pl': 'kiedy wykryto pozę: [LABEL]',
    'ko': '[LABEL] 포즈 라벨을 받았을 때:'
  },
  label_block: {
    'ja': 'ラベル',
    'ja-Hira': 'ラベル',
    'en': 'label',
    'pl': 'poza',
    'ko': '라벨',
    'zh-cn': '标签'
  },
  any: {
    'ja': 'のどれか',
    'ja-Hira': 'のどれか',
    'en': 'any',
    'pl': 'dowolna',
    'ko': '어떤',
    'zh-cn': '任何'
  },
  any_without_of: {
    'ja': 'どれか',
    'ja-Hira': 'どれか',
    'en': 'any',
    'pl': 'dowolna',
    'ko': '어떤',
    'zh-cn': '任何'
  },
  all: {
    'ja': 'の全て',
    'ja-Hira': 'のすべて',
    'en': 'all',
    'pl': 'wszystkie',
    'ko': '모든',
    'zh-cn': '所有'
  },
  toggle_classification: {
    'ja': 'ラベル付けを[CLASSIFICATION_STATE]にする',
    'ja-Hira': 'ラベルづけを[CLASSIFICATION_STATE]にする',
    'en': 'turn classification [CLASSIFICATION_STATE]',
    'pl': 'włącz klasyfikację [CLASSIFICATION_STATE]',
    'ko': '라벨 분류 [CLASSIFICATION_STATE]',
    'zh-cn': '[CLASSIFICATION_STATE]分类'
  },
  set_confidence_threshold: {
    'ja': '確度のしきい値を[CONFIDENCE_THRESHOLD]にする',
    'ja-Hira': 'かくどのしきいちを[CONFIDENCE_THRESHOLD]にする',
    'en': 'set confidence threshold [CONFIDENCE_THRESHOLD]',
    'pl': 'ustaw próg dokładności [CONFIDENCE_THRESHOLD]',
    'ko': '신뢰도 기준 설정 [CONFIDENCE_THRESHOLD]'
  },
  get_confidence_threshold: {
    'ja': '確度のしきい値',
    'ja-Hira': 'かくどのしきいち',
    'en': 'confidence threshold',
    'pl': 'próg dokładności',
    'ko': '신뢰도 기준'
  },
  set_classification_interval: {
    'ja': 'ラベル付けを[CLASSIFICATION_INTERVAL]秒間に1回行う',
    'ja-Hira': 'ラベルづけを[CLASSIFICATION_INTERVAL]びょうかんに1かいおこなう',
    'en': 'Label once every [CLASSIFICATION_INTERVAL] seconds',
    'pl': 'Ustaw etykietkę raz na [CLASSIFICATION_INTERVAL] sekund',
    'ko': '신뢰도 기준 설정 [CONFIDENCE_THRESHOLD]',
    'zh-cn': '每隔[CLASSIFICATION_INTERVAL]秒标记一次'
  },
  video_toggle: {
    'ja': 'ビデオを[VIDEO_STATE]にする',
    'ja-Hira': 'ビデオを[VIDEO_STATE]にする',
    'en': 'turn video [VIDEO_STATE]',
    'pl': 'włącz video [VIDEO_STATE]',
    'ko': '비디오 화면 [VIDEO_STATE]',
    'zh-cn': '[VIDEO_STATE]摄像头'
  },
  on: {
    'ja': '入',
    'ja-Hira': 'いり',
    'en': 'on',
    'pl': 'włączone',
    'ko': '켜기',
    'zh-cn': '开启'
  },
  off: {
    'ja': '切',
    'ja-Hira': 'きり',
    'en': 'off',
    'pl': 'wyłączone',
    'ko': '멈추기',
    'zh-cn': '关闭'
  },
  video_on_flipped: {
    'ja': '左右反転',
    'ja-Hira': 'さゆうはんてん',
    'en': 'on flipped',
    'pl': 'odwrócone',
    'ko': '좌우 뒤집기',
    'zh-cn': '镜像开启'
  }
};
var AvailableLocales = ['en', 'pl'];

var Scratch3TMPose2ScratchBlocks = /*#__PURE__*/function () {
  function Scratch3TMPose2ScratchBlocks(runtime) {
    var _this = this;

    _classCallCheck(this, Scratch3TMPose2ScratchBlocks);

    this.runtime = runtime;
    this.locale = this.setLocale();
    this.interval = 1000;
    this.minInterval = 100;
    this.poseTimer = setInterval(function () {
      _this.classifyPoseInVideo();
    }, this.minInterval);
    this.poseModelUrl = null;
    this.poseMetadata = null;
    this.poseModel = null;
    this.initPoseProbableLabels();
    this.confidenceThreshold = 0.5;
    this.runtime.ioDevices.video.enableVideo();
    this.runtime.ioDevices.video.mirror = true; // To avoid the problem of the library not loading the first time,
    // we load scripts synchronously.

    var loadScriptSynchronously = function loadScriptSynchronously(url) {
      var request = new XMLHttpRequest();
      request.open('GET', url, false);
      request.send(null);

      if (request.status === 200) {
        var script = document.createElement('script');
        script.text = request.responseText;
        document.head.appendChild(script);
      }
    }; // tmPose needs to specific version of tenforflow tfjs@1.3.1


    loadScriptSynchronously('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js'); // get `tmPose` object from CDN

    loadScriptSynchronously('https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js');
  }
  /**
   * Initialize the result of pose estimation.
   */


  _createClass(Scratch3TMPose2ScratchBlocks, [{
    key: "initPoseProbableLabels",
    value: function initPoseProbableLabels() {
      this.poseProbableLabels = [];
    }
  }, {
    key: "getInfo",
    value: function getInfo() {
      this.locale = this.setLocale();
      return {
        id: 'tmpose2scratch',
        name: 'TMPose2Scratch',
        blockIconURI: blockIconURI,
        blocks: [{
          opcode: 'whenPoseLabelReceived',
          text: Message.when_received_pose_label_block[this.locale],
          blockType: BlockType.HAT,
          arguments: {
            LABEL: {
              type: ArgumentType.STRING,
              menu: 'received_pose_label_menu',
              defaultValue: Message.any[this.locale]
            }
          }
        }, {
          opcode: 'isPoseLabelDetected',
          text: Message.is_pose_label_detected[this.locale],
          blockType: BlockType.BOOLEAN,
          arguments: {
            LABEL: {
              type: ArgumentType.STRING,
              menu: 'pose_labels_menu',
              defaultValue: Message.any_without_of[this.locale]
            }
          }
        }, {
          opcode: 'poseLabelConfidence',
          text: Message.pose_label_confidence[this.locale],
          blockType: BlockType.REPORTER,
          disableMonitor: true,
          arguments: {
            LABEL: {
              type: ArgumentType.STRING,
              menu: 'pose_labels_without_any_menu',
              defaultValue: ''
            }
          }
        }, {
          opcode: 'setPoseClassificationModelURL',
          text: Message.pose_classification_model_url[this.locale],
          blockType: BlockType.COMMAND,
          arguments: {
            URL: {
              type: ArgumentType.STRING,
              defaultValue: Message.pose_classification_sample_model_url[this.locale]
            }
          }
        }, {
          opcode: 'classifyVideoPoseBlock',
          text: Message.classify_pose[this.locale],
          blockType: BlockType.COMMAND
        }, {
          opcode: 'getPoseLabel',
          text: Message.pose_label[this.locale],
          blockType: BlockType.REPORTER
        }, '---', {
          opcode: 'toggleClassification',
          text: Message.toggle_classification[this.locale],
          blockType: BlockType.COMMAND,
          arguments: {
            CLASSIFICATION_STATE: {
              type: ArgumentType.STRING,
              menu: 'classification_menu',
              defaultValue: 'off'
            }
          }
        }, {
          opcode: 'setClassificationInterval',
          text: Message.set_classification_interval[this.locale],
          blockType: BlockType.COMMAND,
          arguments: {
            CLASSIFICATION_INTERVAL: {
              type: ArgumentType.STRING,
              menu: 'classification_interval_menu',
              defaultValue: '1'
            }
          }
        }, {
          opcode: 'setConfidenceThreshold',
          text: Message.set_confidence_threshold[this.locale],
          blockType: BlockType.COMMAND,
          arguments: {
            CONFIDENCE_THRESHOLD: {
              type: ArgumentType.NUMBER,
              defaultValue: 0.5
            }
          }
        }, {
          opcode: 'getConfidenceThreshold',
          text: Message.get_confidence_threshold[this.locale],
          blockType: BlockType.REPORTER,
          disableMonitor: true
        }, {
          opcode: 'videoToggle',
          text: Message.video_toggle[this.locale],
          blockType: BlockType.COMMAND,
          arguments: {
            VIDEO_STATE: {
              type: ArgumentType.STRING,
              menu: 'video_menu',
              defaultValue: 'off'
            }
          }
        }],
        menus: {
          received_pose_label_menu: {
            acceptReporters: true,
            items: 'getPoseLabelsMenu'
          },
          pose_labels_menu: {
            acceptReporters: true,
            items: 'getPoseLabelsWithAnyWithoutOfMenu'
          },
          pose_labels_without_any_menu: {
            acceptReporters: true,
            items: 'getPoseLabelsWithoutAnyMenu'
          },
          video_menu: this.getVideoMenu(),
          classification_interval_menu: this.getClassificationIntervalMenu(),
          classification_menu: this.getClassificationMenu()
        }
      };
    }
    /**
     * Return whether the most probable label of pose is the selected one.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - The label to detect.
     * @return {boolean} - Whether the label is most probable or not.
     */

  }, {
    key: "whenPoseLabelReceived",
    value: function whenPoseLabelReceived(args) {
      var label = this.getPoseLabel();

      if (args.LABEL === Message.any[this.locale]) {
        return label !== '';
      }

      return label === args.LABEL;
    }
    /**
     * Return whether the most probable pose label is the selected one or not.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - The label to detect.
     * @return {boolean} - Whether the label is most probable or not.
     */

  }, {
    key: "isPoseLabelDetected",
    value: function isPoseLabelDetected(args) {
      var label = this.getPoseLabel();

      if (args.LABEL === Message.any[this.locale]) {
        return label !== '';
      }

      return label === args.LABEL;
    }
    /**
     * Return confidence of the pose label.
     * @param {object} args - The block's arguments.
     * @property {string} LABEL - Selected label.
     * @return {number} - Confidence of the label.
     */

  }, {
    key: "poseLabelConfidence",
    value: function poseLabelConfidence(args) {
      if (args.LABEL === '') {
        return 0;
      }

      var entry = this.poseProbableLabels.find(function (element) {
        return element.className === args.LABEL;
      });
      return entry ? entry.probability : 0;
    }
    /**
     * Set a model for pose classification from URL.
     * @param {object} args - the block's arguments.
     * @property {string} URL - URL of model to be loaded.
     * @return {Promise} - A Promise that resolve after loaded.
     */

  }, {
    key: "setPoseClassificationModelURL",
    value: function setPoseClassificationModelURL(args) {
      return this.loadPoseClassificationModelFromURL(args.URL);
    }
    /**
     * Load a model from URL for pose classification.
     * @param {string} url - URL of model to be loaded.
     * @return {Promise} - A Promise that resolves after loaded.
     */

  }, {
    key: "loadPoseClassificationModelFromURL",
    value: function loadPoseClassificationModelFromURL(url) {
      var _this2 = this;

      return new Promise(function (resolve) {
        fetch("".concat(url, "metadata.json")).then(function (res) {
          return res.json();
        }).then(function (metadata) {
          if (url === _this2.poseModelUrl && new Date(metadata.timeStamp).getTime() === new Date(_this2.poseMetadata.timeStamp).getTime()) {
            log.info("pose model already loaded: ".concat(url));
            resolve();
          } else {
            var modelURL = "".concat(url, "model.json");
            var metadataURL = "".concat(url, "metadata.json"); // eslint-disable-next-line no-undef

            tmPose.load(modelURL, metadataURL).then(function (poseModel) {
              _this2.poseModel = poseModel;
              _this2.poseMetadata = metadata;
              log.info("pose model loaded from: ".concat(url));
            }).catch(function (error) {
              log.warn(error);
            }).finally(function () {
              return resolve();
            });
          }
        }).catch(function (error) {
          log.warn(error);
          resolve();
        });
      });
    }
    /**
     * Return menu items to detect the pose label.
     * @return {Array} - Menu items with 'any'.
     */

  }, {
    key: "getPoseLabelsMenu",
    value: function getPoseLabelsMenu() {
      var items = [Message.any[this.locale]];
      if (!this.poseMetadata) return items;
      items = items.concat(this.poseMetadata.labels);
      return items;
    }
    /**
     * Return menu items to detect the pose label.
     * @return {Array} - Menu items with 'any without of'.
     */

  }, {
    key: "getPoseLabelsWithAnyWithoutOfMenu",
    value: function getPoseLabelsWithAnyWithoutOfMenu() {
      var items = [Message.any_without_of[this.locale]];
      if (!this.poseMetadata) return items;
      items = items.concat(this.poseMetadata.labels);
      return items;
    }
    /**
     * Return menu itmes to get properties of the pose label.
     * @return {Array} - Menu items with ''.
     */

  }, {
    key: "getPoseLabelsWithoutAnyMenu",
    value: function getPoseLabelsWithoutAnyMenu() {
      var items = [''];

      if (this.poseMetadata) {
        items = items.concat(this.poseMetadata.labels);
      }

      return items;
    }
    /**
     * Classify pose from the video input.
     * Call stack will wait until the previous classification was done.
     *
     * @param {object} _args - the block's arguments.
     * @param {object} util - utility object provided by the runtime.
     * @return {Promise} - a Promise that resolves after classification.
     */

  }, {
    key: "classifyVideoPoseBlock",
    value: function classifyVideoPoseBlock(_args, util) {
      var _this3 = this;

      if (this._isPoseClassifying) {
        if (util) util.yield();
        return;
      }

      return new Promise(function (resolve) {
        _this3.classifyPoseInVideo().then(function (result) {
          resolve(JSON.stringify(result));
        });
      });
    }
    /**
     * Classyfy pose from input data source.
     *
     * @param {HTMLImageElement | ImageData | HTMLCanvasElement | HTMLVideoElement} input
     *  - Data source for classification.
     * @param {boolean} isMirror - Input is morror mode or not.
     * @return {Promise} - A Promise that resolves the result of classification.
     *  The result will be empty when the poseModel was not set.
     */

  }, {
    key: "classifyPose",
    value: function classifyPose(input, isMirror) {
      var _this4 = this;

      if (!this.poseMetadata || !this.poseModel) {
        this._isPoseClassifying = false;
        return Promise.resolve([]);
      }

      this._isPoseClassifying = true;
      return this.poseModel.estimatePose(input, isMirror).then(function (estimated) {
        _this4.poseKeypoints = estimated.keypoints;
        _this4.poseScore = estimated.score;
        return _this4.poseModel.predict(estimated.posenetOutput);
      }).then(function (prediction) {
        _this4.poseProbableLabels = prediction;
        return prediction;
      }).finally(function () {
        setTimeout(function () {
          // Initialize probabilities to reset whenReceived blocks.
          _this4.initPoseProbableLabels();

          _this4._isPoseClassifying = false;
        }, _this4.interval);
      });
    }
  }, {
    key: "getPoseLabel",
    value: function getPoseLabel() {
      if (!this.poseProbableLabels || this.poseProbableLabels.length === 0) return '';
      var mostOne = this.poseProbableLabels.reduce(function (prev, cur) {
        return prev.probability < cur.probability ? cur : prev;
      });
      return mostOne.probability >= this.confidenceThreshold ? mostOne.className : '';
    }
    /**
     * Set confidence threshold which should be over for detected label.
     * @param {object} args - the block's arguments.
     * @property {number} CONFIDENCE_THRESHOLD - Value of confidence threshold.
     */

  }, {
    key: "setConfidenceThreshold",
    value: function setConfidenceThreshold(args) {
      var threshold = Cast.toNumber(args.CONFIDENCE_THRESHOLD);
      threshold = MathUtil.clamp(threshold, 0, 1);
      this.confidenceThreshold = threshold;
    }
    /**
     * Get confidence threshold which should be over for detected label.
     * @param {object} args - the block's arguments.
     * @return {number} - Value of confidence threshold.
     */

  }, {
    key: "getConfidenceThreshold",
    value: function getConfidenceThreshold() {
      return this.confidenceThreshold;
    }
    /**
     * Set state of the continuous classification.
     * @param {object} args - the block's arguments.
     * @property {string} CLASSIFICATION_STATE - State to be ['on'|'off'].
     */

  }, {
    key: "toggleClassification",
    value: function toggleClassification(args) {
      var _this5 = this;

      var state = args.CLASSIFICATION_STATE;

      if (this.poseTimer) {
        clearTimeout(this.poseTimer);
      }

      if (state === 'on') {
        this.poseTimer = setInterval(function () {
          _this5.classifyPoseInVideo();
        }, this.minInterval);
      }
    }
    /**
     * Set interval time of the continuous pose classification.
     * @param {object} args - the block's arguments.
     * @property {number} CLASSIFICATION_INTERVAL - Interval time (seconds).
     */

  }, {
    key: "setClassificationInterval",
    value: function setClassificationInterval(args) {
      var _this6 = this;

      if (this.poseTimer) {
        clearTimeout(this.poseTimer);
      }

      this.interval = args.CLASSIFICATION_INTERVAL * 1000;
      this.poseTimer = setInterval(function () {
        _this6.classifyPoseInVideo();
      }, this.minInterval);
    }
    /**
     * Show video image on the stage or not.
     * @param {object} args - the block's arguments.
     * @property {string} VIDEO_STATE - Show or not ['on'|'off'].
     */

  }, {
    key: "videoToggle",
    value: function videoToggle(args) {
      var state = args.VIDEO_STATE;

      if (state === 'off') {
        this.runtime.ioDevices.video.setPreviewGhost(100);
      } else {
        this.runtime.ioDevices.video.setPreviewGhost(0);
        this.runtime.ioDevices.video.mirror = state === 'on';
      }
    }
    /**
     * Classify pose in video.
     * @return {Promise} - A Promise that resolves the result of classification.
     *  The result will be empty when another classification was under going.
     */

  }, {
    key: "classifyPoseInVideo",
    value: function classifyPoseInVideo() {
      if (this._isPoseClassifying) return Promise.resolve([]);
      return this.classifyPose(this.runtime.ioDevices.video.getFrame({
        mirror: true
      }), true);
    }
    /**
     * Return menu for video showing state.
     * @return {Array} - Menu items.
     */

  }, {
    key: "getVideoMenu",
    value: function getVideoMenu() {
      return [{
        text: Message.off[this.locale],
        value: 'off'
      }, {
        text: Message.on[this.locale],
        value: 'on'
      }, {
        text: Message.video_on_flipped[this.locale],
        value: 'on-flipped'
      }];
    }
    /**
     * Return menu for classification interval setting.
     * @return {object} - Menu.
     */

  }, {
    key: "getClassificationIntervalMenu",
    value: function getClassificationIntervalMenu() {
      return {
        acceptReporters: true,
        items: [{
          text: '1',
          value: '1'
        }, {
          text: '0.5',
          value: '0.5'
        }, {
          text: '0.2',
          value: '0.2'
        }, {
          text: '0.1',
          value: '0.1'
        }]
      };
    }
    /**
     * Return menu for continuous classification state.
     * @return {Array} - Menu items.
     */

  }, {
    key: "getClassificationMenu",
    value: function getClassificationMenu() {
      return [{
        text: Message.off[this.locale],
        value: 'off'
      }, {
        text: Message.on[this.locale],
        value: 'on'
      }];
    }
    /**
     * Get locale for message text.
     * @return {string} - Locale of this editor.
     */

  }, {
    key: "setLocale",
    value: function setLocale() {
      var locale = formatMessage.setup().locale;

      if (AvailableLocales.includes(locale)) {
        return locale;
      }

      return 'en';
    }
  }]);

  return Scratch3TMPose2ScratchBlocks;
}();

var blockClass = Scratch3TMPose2ScratchBlocks;

export { blockClass, entry };
