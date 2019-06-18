/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/index.js-exposed");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/EmbeddableDashboard.js":
/*!*************************************!*\
  !*** ./dist/EmbeddableDashboard.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.\n// SPDX-License-Identifier: Apache-2.0\n\nvar _eventify = __webpack_require__(/*! ./lib/eventify */ \"./dist/lib/eventify.js\");\n\nvar _eventify2 = _interopRequireDefault(_eventify);\n\nvar _constructEvent = __webpack_require__(/*! ./lib/constructEvent */ \"./dist/lib/constructEvent.js\");\n\nvar _constructEvent2 = _interopRequireDefault(_constructEvent);\n\nvar _constants = __webpack_require__(/*! ./lib/constants */ \"./dist/lib/constants.js\");\n\nvar _punycode = __webpack_require__(/*! punycode */ \"./node_modules/node-libs-browser/node_modules/punycode/punycode.js\");\n\nvar _punycode2 = _interopRequireDefault(_punycode);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Embedding options.\n * @typedef {Object} EmbeddingOptions\n * @property {string} url - url of the dashboard to embed\n * @property {HTMLElement | string} container - parent html element or query selector string\n * @property {Function} errorCallback - callback when error occurs\n * @property {Function} loadCallback - callback when visualization data load complete\n * @property {Object} parameters\n * @property {string} width - width of the iframe\n * @property {string} height - height of the iframe\n * @property {string} loadingHeight - when height is set to be \"AutoFit\",\n *                                   loadingHeight is used before actual height is received\n * @property {string} scrolling\n */\n\n/**\n * Embeddable dashboard class.\n * @class\n * @name EmbeddableDashboard\n * @param {EmbeddingOptions} options - options set by customers to embed the dashboard.\n */\n\nvar EmbeddableDashboard = function () {\n\n    /* eslint-disable complexity */\n\n    function EmbeddableDashboard(options) {\n        _classCallCheck(this, EmbeddableDashboard);\n\n        if (!options) {\n            throw new Error('options is required');\n        }\n\n        if (!options.url) {\n            throw new Error('url is required');\n        }\n\n        var url = options.url,\n            container = options.container,\n            parameters = options.parameters,\n            errorCallback = options.errorCallback,\n            loadCallback = options.loadCallback;\n\n\n        this.url = url;\n\n        if (container instanceof HTMLElement) {\n            this.container = container;\n        } else if (typeof container === 'string') {\n            this.container = document.querySelector(container);\n        }\n\n        if (!this.container) {\n            throw new Error('can\\'t find valid container');\n        }\n\n        this.parameters = parameters;\n\n        this.iframe = createIframe(options);\n\n        (0, _eventify2.default)(this);\n\n        if (typeof errorCallback === 'function') {\n            this.on(_constants.CLIENT_FACING_EVENT_NAMES.error, errorCallback);\n        }\n\n        if (typeof loadCallback === 'function') {\n            this.on(_constants.CLIENT_FACING_EVENT_NAMES.load, loadCallback);\n        }\n\n        window.addEventListener('message', function (event) {\n            if (!event) {\n                return;\n            }\n            if (event.source === (this.iframe && this.iframe.contentWindow)) {\n                var _event$data = event.data,\n                    eventName = _event$data.eventName,\n                    payload = _event$data.payload;\n\n                this.trigger(_constants.CLIENT_FACING_EVENT_NAMES[eventName], payload);\n                if (eventName === _constants.IN_COMING_POST_MESSAGE_EVENT_NAMES.RESIZE_EVENT) {\n                    var height = options.height;\n\n                    if (height === _constants.DASHBOARD_SIZE_OPTIONS.AUTO_FIT) {\n                        this.iframe.height = payload.height;\n                    }\n                }\n            }\n        }.bind(this), false);\n\n        this.getContainer = this.getContainer.bind(this);\n        this.getParameters = this.getParameters.bind(this);\n        this.getUrl = this.getUrl.bind(this);\n        this.setParameters = this.setParameters.bind(this);\n    }\n\n    _createClass(EmbeddableDashboard, [{\n        key: 'getUrl',\n        value: function getUrl() {\n            return this.url;\n        }\n    }, {\n        key: 'getContainer',\n        value: function getContainer() {\n            return this.container;\n        }\n    }, {\n        key: 'getParameters',\n        value: function getParameters() {\n            return this.parameters;\n        }\n    }, {\n        key: 'setParameters',\n        value: function setParameters(parameters) {\n            var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.UPDATE_PARAMETER_VALUES;\n            var payload = { parameters: parameters };\n            var event = (0, _constructEvent2.default)(eventName, payload);\n            this.iframe.contentWindow.postMessage(event, this.url);\n        }\n    }]);\n\n    return EmbeddableDashboard;\n}();\n\nfunction createIframe(options) {\n    var width = options.width,\n        height = options.height;\n    var loadingHeight = options.loadingHeight,\n        url = options.url,\n        scrolling = options.scrolling;\n\n    if (height === _constants.DASHBOARD_SIZE_OPTIONS.AUTO_FIT) {\n        height = loadingHeight;\n    }\n    var iframe = document.createElement('iframe');\n    iframe.className = 'quicksight-embedding-iframe';\n    iframe.width = width || '100%';\n    iframe.height = height || '100%';\n    iframe.scrolling = scrolling || 'no';\n    iframe.onload = sendInitialPostMessage.bind(null, iframe, url);\n    iframe.src = getIframeSrc(options);\n    return iframe;\n}\n\nfunction getIframeSrc(options) {\n    var url = options.url,\n        parameters = options.parameters;\n\n    var src = url + '&punyCodeEmbedOrigin=' + _punycode2.default.encode(window.location.origin + '/');\n    if (parameters) {\n        return useParameterValuesInUrl(src, parameters);\n    }\n    return src;\n}\n\n/**\n * Use parameter values in url.\n * @function\n * @name useParameterValuesInUrl\n * @param {string} url - url of the dashboard to embed.\n * @param {Object} parameters\n */\nfunction useParameterValuesInUrl(url, parameters) {\n    var parameterNames = Object.keys(parameters);\n    var parameterStrings = parameterNames.map(function (name) {\n        var value = parameters[name];\n        var values = [].concat(value);\n        var encodedName = encodeURIComponent(name);\n        return values.map(function (paramValue) {\n            return encodeURIComponent(paramValue);\n        }).map(function (encodedValue) {\n            return 'p.' + encodedName + '=' + encodedValue;\n        }).join('&');\n    });\n\n    return url + '#' + parameterStrings.join('&');\n}\n\nfunction sendInitialPostMessage(iframe, domain) {\n    if (iframe.contentWindow === null) {\n        setTimeout(sendInitialPostMessage.bind(null, iframe, domain), 100);\n    }\n\n    var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.ESTABLISH_MESSAGE_CHANNEL;\n    var event = (0, _constructEvent2.default)(eventName);\n    // wait until iframe.contentWindow exists and send message to iframe window\n    iframe.contentWindow.postMessage(event, domain);\n}\n\nexports.default = EmbeddableDashboard;\n\n//# sourceURL=webpack:///./dist/EmbeddableDashboard.js?");

/***/ }),

/***/ "./dist/embedDashboard.js":
/*!********************************!*\
  !*** ./dist/embedDashboard.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _EmbeddableDashboard = __webpack_require__(/*! ./EmbeddableDashboard */ \"./dist/EmbeddableDashboard.js\");\n\nvar _EmbeddableDashboard2 = _interopRequireDefault(_EmbeddableDashboard);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Embed a dashboard.\n * @function\n * @name embedDashboard\n * @param {EmbeddingOptions} options - options set by customers to embed the dashboard.\n */\nfunction embedDashboard(options) {\n    var dashboard = new _EmbeddableDashboard2.default(options);\n    var container = dashboard.getContainer();\n    setTimeout(attachToDom.bind(null, dashboard.iframe, container), 0);\n    return dashboard;\n}\n\n/**\n * Create a iframe and attach it to parent element.\n * @function\n * @name attachToDom\n * @param {HTMLIFrameElement} iframe\n * @param {string} url - url of the dashboard to embed with parameter values appended.\n * @param {HTMLElement} container - parent html element.\n */\n\n// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.\n// SPDX-License-Identifier: Apache-2.0\n\nfunction attachToDom(iframe, container) {\n    if (!iframe) {\n        throw new Error('iFrame is required');\n    }\n\n    if (!container) {\n        throw new Error('container of iFrame is required');\n    }\n\n    container.appendChild(iframe);\n}\n\nexports.default = embedDashboard;\n\n//# sourceURL=webpack:///./dist/embedDashboard.js?");

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.embedDashboard = undefined;\n\nvar _embedDashboard = __webpack_require__(/*! ./embedDashboard */ \"./dist/embedDashboard.js\");\n\nvar _embedDashboard2 = _interopRequireDefault(_embedDashboard);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.embedDashboard = _embedDashboard2.default;\n// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.\n// SPDX-License-Identifier: Apache-2.0\n\n//# sourceURL=webpack:///./dist/index.js?");

/***/ }),

/***/ "./dist/index.js-exposed":
/*!*******************************!*\
  !*** ./dist/index.js-exposed ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {module.exports = global[\"QuickSightEmbedding\"] = __webpack_require__(/*! -!./index.js */ \"./dist/index.js\");\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./dist/index.js-exposed?");

/***/ }),

/***/ "./dist/lib/constants.js":
/*!*******************************!*\
  !*** ./dist/lib/constants.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\n// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.\n// SPDX-License-Identifier: Apache-2.0\n\nvar OUT_GOING_POST_MESSAGE_EVENT_NAMES = exports.OUT_GOING_POST_MESSAGE_EVENT_NAMES = {\n    ESTABLISH_MESSAGE_CHANNEL: 'establishMessageChannel',\n    UPDATE_PARAMETER_VALUES: 'updateParameterValues'\n};\n\nvar IN_COMING_POST_MESSAGE_EVENT_NAMES = exports.IN_COMING_POST_MESSAGE_EVENT_NAMES = {\n    LOAD: 'load',\n    ERROR: 'error',\n    RESIZE_EVENT: 'RESIZE_EVENT'\n};\n\n// this is a mapping of event names we use internally to the event names we expose to clients\nvar CLIENT_FACING_EVENT_NAMES = exports.CLIENT_FACING_EVENT_NAMES = {\n    load: 'load',\n    error: 'error',\n    RESIZE_EVENT: 'resize'\n};\n\nvar DASHBOARD_SIZE_OPTIONS = exports.DASHBOARD_SIZE_OPTIONS = {\n    AUTO_FIT: 'AutoFit'\n};\n\n//# sourceURL=webpack:///./dist/lib/constants.js?");

/***/ }),

/***/ "./dist/lib/constructEvent.js":
/*!************************************!*\
  !*** ./dist/lib/constructEvent.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = constructEvent;\n\nvar _constants = __webpack_require__(/*! ./constants */ \"./dist/lib/constants.js\");\n\nfunction constructEvent(eventName, payload) {\n    var validEventNames = new Set(Object.values(_constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES));\n\n    if (!validEventNames.has(eventName)) {\n        throw new Error('Unexpected eventName');\n    }\n\n    return {\n        eventName: eventName,\n        clientType: 'EMBEDDING',\n        payload: payload\n    };\n}\n// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.\n// SPDX-License-Identifier: Apache-2.0\n\n//# sourceURL=webpack:///./dist/lib/constructEvent.js?");

/***/ }),

/***/ "./dist/lib/eventify.js":
/*!******************************!*\
  !*** ./dist/lib/eventify.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.default = eventify;\n\n// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.\n// SPDX-License-Identifier: Apache-2.0\n\n/**\n * Adds `on()`, `off()`, and `trigger()` methods to an object.\n * Consumers can use `on()` function to subscribe to events, use `off()` to unsubscribe\n * and use `trigger()` to trigger event.\n */\nfunction eventify(object) {\n    if (!object) {\n        object = {};\n    }\n\n    assertObjectHasNoReservedKeywords(object);\n\n    var listeners = new Map(); // eventName -> Set() of listeners\n\n    object.on = on;\n    object.off = off;\n    object.trigger = trigger;\n\n    return object;\n\n    function on(eventName, callback) {\n        var eventListeners = listeners.get(eventName);\n        if (!eventListeners) {\n            eventListeners = new Set();\n            listeners.set(eventName, eventListeners);\n        }\n\n        eventListeners.add(callback);\n    }\n\n    function trigger(eventName) {\n        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n            args[_key - 1] = arguments[_key];\n        }\n\n        var eventListeners = listeners.get(eventName);\n        if (eventListeners) {\n            eventListeners.forEach(function (listener) {\n                return listener.apply(null, args);\n            });\n        }\n    }\n\n    function off(eventName, callback) {\n        if (!callback) {\n            // we want to unsubscribe from all events\n            listeners.delete(eventName);\n            return object;\n        }\n\n        var eventListeners = listeners.get(eventName);\n        if (!eventListeners) {\n            // no listeners, nothing to unsubscribe from\n            return object;\n        }\n        // remove this specific callback from this event\n        eventListeners.delete(callback);\n\n        return object;\n    }\n}\n\nfunction assertObjectHasNoReservedKeywords(object) {\n    ['on', 'trigger', 'off'].forEach(function (keyword) {\n        if (keyword in object) {\n            throw new Error('Cannot eventify object that has `' + keyword + '()` method on it');\n        }\n    });\n}\n\n//# sourceURL=webpack:///./dist/lib/eventify.js?");

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */\n;(function(root) {\n\n\t/** Detect free variables */\n\tvar freeExports = typeof exports == 'object' && exports &&\n\t\t!exports.nodeType && exports;\n\tvar freeModule = typeof module == 'object' && module &&\n\t\t!module.nodeType && module;\n\tvar freeGlobal = typeof global == 'object' && global;\n\tif (\n\t\tfreeGlobal.global === freeGlobal ||\n\t\tfreeGlobal.window === freeGlobal ||\n\t\tfreeGlobal.self === freeGlobal\n\t) {\n\t\troot = freeGlobal;\n\t}\n\n\t/**\n\t * The `punycode` object.\n\t * @name punycode\n\t * @type Object\n\t */\n\tvar punycode,\n\n\t/** Highest positive signed 32-bit float value */\n\tmaxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1\n\n\t/** Bootstring parameters */\n\tbase = 36,\n\ttMin = 1,\n\ttMax = 26,\n\tskew = 38,\n\tdamp = 700,\n\tinitialBias = 72,\n\tinitialN = 128, // 0x80\n\tdelimiter = '-', // '\\x2D'\n\n\t/** Regular expressions */\n\tregexPunycode = /^xn--/,\n\tregexNonASCII = /[^\\x20-\\x7E]/, // unprintable ASCII chars + non-ASCII chars\n\tregexSeparators = /[\\x2E\\u3002\\uFF0E\\uFF61]/g, // RFC 3490 separators\n\n\t/** Error messages */\n\terrors = {\n\t\t'overflow': 'Overflow: input needs wider integers to process',\n\t\t'not-basic': 'Illegal input >= 0x80 (not a basic code point)',\n\t\t'invalid-input': 'Invalid input'\n\t},\n\n\t/** Convenience shortcuts */\n\tbaseMinusTMin = base - tMin,\n\tfloor = Math.floor,\n\tstringFromCharCode = String.fromCharCode,\n\n\t/** Temporary variable */\n\tkey;\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/**\n\t * A generic error utility function.\n\t * @private\n\t * @param {String} type The error type.\n\t * @returns {Error} Throws a `RangeError` with the applicable error message.\n\t */\n\tfunction error(type) {\n\t\tthrow new RangeError(errors[type]);\n\t}\n\n\t/**\n\t * A generic `Array#map` utility function.\n\t * @private\n\t * @param {Array} array The array to iterate over.\n\t * @param {Function} callback The function that gets called for every array\n\t * item.\n\t * @returns {Array} A new array of values returned by the callback function.\n\t */\n\tfunction map(array, fn) {\n\t\tvar length = array.length;\n\t\tvar result = [];\n\t\twhile (length--) {\n\t\t\tresult[length] = fn(array[length]);\n\t\t}\n\t\treturn result;\n\t}\n\n\t/**\n\t * A simple `Array#map`-like wrapper to work with domain name strings or email\n\t * addresses.\n\t * @private\n\t * @param {String} domain The domain name or email address.\n\t * @param {Function} callback The function that gets called for every\n\t * character.\n\t * @returns {Array} A new string of characters returned by the callback\n\t * function.\n\t */\n\tfunction mapDomain(string, fn) {\n\t\tvar parts = string.split('@');\n\t\tvar result = '';\n\t\tif (parts.length > 1) {\n\t\t\t// In email addresses, only the domain name should be punycoded. Leave\n\t\t\t// the local part (i.e. everything up to `@`) intact.\n\t\t\tresult = parts[0] + '@';\n\t\t\tstring = parts[1];\n\t\t}\n\t\t// Avoid `split(regex)` for IE8 compatibility. See #17.\n\t\tstring = string.replace(regexSeparators, '\\x2E');\n\t\tvar labels = string.split('.');\n\t\tvar encoded = map(labels, fn).join('.');\n\t\treturn result + encoded;\n\t}\n\n\t/**\n\t * Creates an array containing the numeric code points of each Unicode\n\t * character in the string. While JavaScript uses UCS-2 internally,\n\t * this function will convert a pair of surrogate halves (each of which\n\t * UCS-2 exposes as separate characters) into a single code point,\n\t * matching UTF-16.\n\t * @see `punycode.ucs2.encode`\n\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t * @memberOf punycode.ucs2\n\t * @name decode\n\t * @param {String} string The Unicode input string (UCS-2).\n\t * @returns {Array} The new array of code points.\n\t */\n\tfunction ucs2decode(string) {\n\t\tvar output = [],\n\t\t    counter = 0,\n\t\t    length = string.length,\n\t\t    value,\n\t\t    extra;\n\t\twhile (counter < length) {\n\t\t\tvalue = string.charCodeAt(counter++);\n\t\t\tif (value >= 0xD800 && value <= 0xDBFF && counter < length) {\n\t\t\t\t// high surrogate, and there is a next character\n\t\t\t\textra = string.charCodeAt(counter++);\n\t\t\t\tif ((extra & 0xFC00) == 0xDC00) { // low surrogate\n\t\t\t\t\toutput.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);\n\t\t\t\t} else {\n\t\t\t\t\t// unmatched surrogate; only append this code unit, in case the next\n\t\t\t\t\t// code unit is the high surrogate of a surrogate pair\n\t\t\t\t\toutput.push(value);\n\t\t\t\t\tcounter--;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\toutput.push(value);\n\t\t\t}\n\t\t}\n\t\treturn output;\n\t}\n\n\t/**\n\t * Creates a string based on an array of numeric code points.\n\t * @see `punycode.ucs2.decode`\n\t * @memberOf punycode.ucs2\n\t * @name encode\n\t * @param {Array} codePoints The array of numeric code points.\n\t * @returns {String} The new Unicode string (UCS-2).\n\t */\n\tfunction ucs2encode(array) {\n\t\treturn map(array, function(value) {\n\t\t\tvar output = '';\n\t\t\tif (value > 0xFFFF) {\n\t\t\t\tvalue -= 0x10000;\n\t\t\t\toutput += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);\n\t\t\t\tvalue = 0xDC00 | value & 0x3FF;\n\t\t\t}\n\t\t\toutput += stringFromCharCode(value);\n\t\t\treturn output;\n\t\t}).join('');\n\t}\n\n\t/**\n\t * Converts a basic code point into a digit/integer.\n\t * @see `digitToBasic()`\n\t * @private\n\t * @param {Number} codePoint The basic numeric code point value.\n\t * @returns {Number} The numeric value of a basic code point (for use in\n\t * representing integers) in the range `0` to `base - 1`, or `base` if\n\t * the code point does not represent a value.\n\t */\n\tfunction basicToDigit(codePoint) {\n\t\tif (codePoint - 48 < 10) {\n\t\t\treturn codePoint - 22;\n\t\t}\n\t\tif (codePoint - 65 < 26) {\n\t\t\treturn codePoint - 65;\n\t\t}\n\t\tif (codePoint - 97 < 26) {\n\t\t\treturn codePoint - 97;\n\t\t}\n\t\treturn base;\n\t}\n\n\t/**\n\t * Converts a digit/integer into a basic code point.\n\t * @see `basicToDigit()`\n\t * @private\n\t * @param {Number} digit The numeric value of a basic code point.\n\t * @returns {Number} The basic code point whose value (when used for\n\t * representing integers) is `digit`, which needs to be in the range\n\t * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is\n\t * used; else, the lowercase form is used. The behavior is undefined\n\t * if `flag` is non-zero and `digit` has no uppercase form.\n\t */\n\tfunction digitToBasic(digit, flag) {\n\t\t//  0..25 map to ASCII a..z or A..Z\n\t\t// 26..35 map to ASCII 0..9\n\t\treturn digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);\n\t}\n\n\t/**\n\t * Bias adaptation function as per section 3.4 of RFC 3492.\n\t * https://tools.ietf.org/html/rfc3492#section-3.4\n\t * @private\n\t */\n\tfunction adapt(delta, numPoints, firstTime) {\n\t\tvar k = 0;\n\t\tdelta = firstTime ? floor(delta / damp) : delta >> 1;\n\t\tdelta += floor(delta / numPoints);\n\t\tfor (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {\n\t\t\tdelta = floor(delta / baseMinusTMin);\n\t\t}\n\t\treturn floor(k + (baseMinusTMin + 1) * delta / (delta + skew));\n\t}\n\n\t/**\n\t * Converts a Punycode string of ASCII-only symbols to a string of Unicode\n\t * symbols.\n\t * @memberOf punycode\n\t * @param {String} input The Punycode string of ASCII-only symbols.\n\t * @returns {String} The resulting string of Unicode symbols.\n\t */\n\tfunction decode(input) {\n\t\t// Don't use UCS-2\n\t\tvar output = [],\n\t\t    inputLength = input.length,\n\t\t    out,\n\t\t    i = 0,\n\t\t    n = initialN,\n\t\t    bias = initialBias,\n\t\t    basic,\n\t\t    j,\n\t\t    index,\n\t\t    oldi,\n\t\t    w,\n\t\t    k,\n\t\t    digit,\n\t\t    t,\n\t\t    /** Cached calculation results */\n\t\t    baseMinusT;\n\n\t\t// Handle the basic code points: let `basic` be the number of input code\n\t\t// points before the last delimiter, or `0` if there is none, then copy\n\t\t// the first basic code points to the output.\n\n\t\tbasic = input.lastIndexOf(delimiter);\n\t\tif (basic < 0) {\n\t\t\tbasic = 0;\n\t\t}\n\n\t\tfor (j = 0; j < basic; ++j) {\n\t\t\t// if it's not a basic code point\n\t\t\tif (input.charCodeAt(j) >= 0x80) {\n\t\t\t\terror('not-basic');\n\t\t\t}\n\t\t\toutput.push(input.charCodeAt(j));\n\t\t}\n\n\t\t// Main decoding loop: start just after the last delimiter if any basic code\n\t\t// points were copied; start at the beginning otherwise.\n\n\t\tfor (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {\n\n\t\t\t// `index` is the index of the next character to be consumed.\n\t\t\t// Decode a generalized variable-length integer into `delta`,\n\t\t\t// which gets added to `i`. The overflow checking is easier\n\t\t\t// if we increase `i` as we go, then subtract off its starting\n\t\t\t// value at the end to obtain `delta`.\n\t\t\tfor (oldi = i, w = 1, k = base; /* no condition */; k += base) {\n\n\t\t\t\tif (index >= inputLength) {\n\t\t\t\t\terror('invalid-input');\n\t\t\t\t}\n\n\t\t\t\tdigit = basicToDigit(input.charCodeAt(index++));\n\n\t\t\t\tif (digit >= base || digit > floor((maxInt - i) / w)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\ti += digit * w;\n\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\n\t\t\t\tif (digit < t) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tbaseMinusT = base - t;\n\t\t\t\tif (w > floor(maxInt / baseMinusT)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tw *= baseMinusT;\n\n\t\t\t}\n\n\t\t\tout = output.length + 1;\n\t\t\tbias = adapt(i - oldi, out, oldi == 0);\n\n\t\t\t// `i` was supposed to wrap around from `out` to `0`,\n\t\t\t// incrementing `n` each time, so we'll fix that now:\n\t\t\tif (floor(i / out) > maxInt - n) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tn += floor(i / out);\n\t\t\ti %= out;\n\n\t\t\t// Insert `n` at position `i` of the output\n\t\t\toutput.splice(i++, 0, n);\n\n\t\t}\n\n\t\treturn ucs2encode(output);\n\t}\n\n\t/**\n\t * Converts a string of Unicode symbols (e.g. a domain name label) to a\n\t * Punycode string of ASCII-only symbols.\n\t * @memberOf punycode\n\t * @param {String} input The string of Unicode symbols.\n\t * @returns {String} The resulting Punycode string of ASCII-only symbols.\n\t */\n\tfunction encode(input) {\n\t\tvar n,\n\t\t    delta,\n\t\t    handledCPCount,\n\t\t    basicLength,\n\t\t    bias,\n\t\t    j,\n\t\t    m,\n\t\t    q,\n\t\t    k,\n\t\t    t,\n\t\t    currentValue,\n\t\t    output = [],\n\t\t    /** `inputLength` will hold the number of code points in `input`. */\n\t\t    inputLength,\n\t\t    /** Cached calculation results */\n\t\t    handledCPCountPlusOne,\n\t\t    baseMinusT,\n\t\t    qMinusT;\n\n\t\t// Convert the input in UCS-2 to Unicode\n\t\tinput = ucs2decode(input);\n\n\t\t// Cache the length\n\t\tinputLength = input.length;\n\n\t\t// Initialize the state\n\t\tn = initialN;\n\t\tdelta = 0;\n\t\tbias = initialBias;\n\n\t\t// Handle the basic code points\n\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\tcurrentValue = input[j];\n\t\t\tif (currentValue < 0x80) {\n\t\t\t\toutput.push(stringFromCharCode(currentValue));\n\t\t\t}\n\t\t}\n\n\t\thandledCPCount = basicLength = output.length;\n\n\t\t// `handledCPCount` is the number of code points that have been handled;\n\t\t// `basicLength` is the number of basic code points.\n\n\t\t// Finish the basic string - if it is not empty - with a delimiter\n\t\tif (basicLength) {\n\t\t\toutput.push(delimiter);\n\t\t}\n\n\t\t// Main encoding loop:\n\t\twhile (handledCPCount < inputLength) {\n\n\t\t\t// All non-basic code points < n have been handled already. Find the next\n\t\t\t// larger one:\n\t\t\tfor (m = maxInt, j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\t\t\t\tif (currentValue >= n && currentValue < m) {\n\t\t\t\t\tm = currentValue;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,\n\t\t\t// but guard against overflow\n\t\t\thandledCPCountPlusOne = handledCPCount + 1;\n\t\t\tif (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tdelta += (m - n) * handledCPCountPlusOne;\n\t\t\tn = m;\n\n\t\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\n\t\t\t\tif (currentValue < n && ++delta > maxInt) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tif (currentValue == n) {\n\t\t\t\t\t// Represent delta as a generalized variable-length integer\n\t\t\t\t\tfor (q = delta, k = base; /* no condition */; k += base) {\n\t\t\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\t\t\t\t\t\tif (q < t) {\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tqMinusT = q - t;\n\t\t\t\t\t\tbaseMinusT = base - t;\n\t\t\t\t\t\toutput.push(\n\t\t\t\t\t\t\tstringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))\n\t\t\t\t\t\t);\n\t\t\t\t\t\tq = floor(qMinusT / baseMinusT);\n\t\t\t\t\t}\n\n\t\t\t\t\toutput.push(stringFromCharCode(digitToBasic(q, 0)));\n\t\t\t\t\tbias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);\n\t\t\t\t\tdelta = 0;\n\t\t\t\t\t++handledCPCount;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t++delta;\n\t\t\t++n;\n\n\t\t}\n\t\treturn output.join('');\n\t}\n\n\t/**\n\t * Converts a Punycode string representing a domain name or an email address\n\t * to Unicode. Only the Punycoded parts of the input will be converted, i.e.\n\t * it doesn't matter if you call it on a string that has already been\n\t * converted to Unicode.\n\t * @memberOf punycode\n\t * @param {String} input The Punycoded domain name or email address to\n\t * convert to Unicode.\n\t * @returns {String} The Unicode representation of the given Punycode\n\t * string.\n\t */\n\tfunction toUnicode(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexPunycode.test(string)\n\t\t\t\t? decode(string.slice(4).toLowerCase())\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/**\n\t * Converts a Unicode string representing a domain name or an email address to\n\t * Punycode. Only the non-ASCII parts of the domain name will be converted,\n\t * i.e. it doesn't matter if you call it with a domain that's already in\n\t * ASCII.\n\t * @memberOf punycode\n\t * @param {String} input The domain name or email address to convert, as a\n\t * Unicode string.\n\t * @returns {String} The Punycode representation of the given domain name or\n\t * email address.\n\t */\n\tfunction toASCII(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexNonASCII.test(string)\n\t\t\t\t? 'xn--' + encode(string)\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/** Define the public API */\n\tpunycode = {\n\t\t/**\n\t\t * A string representing the current Punycode.js version number.\n\t\t * @memberOf punycode\n\t\t * @type String\n\t\t */\n\t\t'version': '1.4.1',\n\t\t/**\n\t\t * An object of methods to convert from JavaScript's internal character\n\t\t * representation (UCS-2) to Unicode code points, and back.\n\t\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t\t * @memberOf punycode\n\t\t * @type Object\n\t\t */\n\t\t'ucs2': {\n\t\t\t'decode': ucs2decode,\n\t\t\t'encode': ucs2encode\n\t\t},\n\t\t'decode': decode,\n\t\t'encode': encode,\n\t\t'toASCII': toASCII,\n\t\t'toUnicode': toUnicode\n\t};\n\n\t/** Expose `punycode` */\n\t// Some AMD build optimizers, like r.js, check for specific condition patterns\n\t// like the following:\n\tif (\n\t\ttrue\n\t) {\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n\t\t\treturn punycode;\n\t\t}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n\n}(this));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/node-libs-browser/node_modules/punycode/punycode.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\r\n\tif (!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif (!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.l;\r\n\t\t\t}\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.i;\r\n\t\t\t}\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n};\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ })

/******/ });