'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var _eventify = require('./lib/eventify');

var _eventify2 = _interopRequireDefault(_eventify);

var _constructEvent = require('./lib/constructEvent');

var _constructEvent2 = _interopRequireDefault(_constructEvent);

var _constants = require('./lib/constants');

var _punycode = require('punycode');

var _punycode2 = _interopRequireDefault(_punycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Embedding options.
 * @typedef {Object} EmbeddingOptions
 * @property {string} url - url of the dashboard to embed
 * @property {HTMLElement | string} container - parent html element or query selector string
 * @property {Function} errorCallback - callback when error occurs
 * @property {Function} loadCallback - callback when visualization data load complete
 * @property {Object} parameters
 * @property {string} width - width of the iframe
 * @property {string} height - height of the iframe
 * @property {string} loadingHeight - when height is set to be "AutoFit",
 *                                   loadingHeight is used before actual height is received
 * @property {string} scrolling
 */

/**
 * Embeddable dashboard class.
 * @class
 * @name EmbeddableDashboard
 * @param {EmbeddingOptions} options - options set by customers to embed the dashboard.
 */

var EmbeddableDashboard = function () {

    /* eslint-disable complexity */

    function EmbeddableDashboard(options) {
        _classCallCheck(this, EmbeddableDashboard);

        if (!options) {
            throw new Error('options is required');
        }

        if (!options.url) {
            throw new Error('url is required');
        }

        var url = options.url,
            container = options.container,
            parameters = options.parameters,
            errorCallback = options.errorCallback,
            loadCallback = options.loadCallback;


        this.url = url;

        if (container instanceof HTMLElement) {
            this.container = container;
        } else if (typeof container === 'string') {
            this.container = document.querySelector(container);
        }

        if (!this.container) {
            throw new Error('can\'t find valid container');
        }

        this.parameters = parameters;

        this.iframe = createIframe(options);

        (0, _eventify2.default)(this);

        if (typeof errorCallback === 'function') {
            this.on(_constants.CLIENT_FACING_EVENT_NAMES.error, errorCallback);
        }

        if (typeof loadCallback === 'function') {
            this.on(_constants.CLIENT_FACING_EVENT_NAMES.load, loadCallback);
        }

        window.addEventListener('message', function (event) {
            if (!event) {
                return;
            }
            if (event.source === (this.iframe && this.iframe.contentWindow)) {
                var _event$data = event.data,
                    eventName = _event$data.eventName,
                    payload = _event$data.payload;

                this.trigger(_constants.CLIENT_FACING_EVENT_NAMES[eventName], payload);
                if (eventName === _constants.IN_COMING_POST_MESSAGE_EVENT_NAMES.RESIZE_EVENT) {
                    var height = options.height;

                    if (height === _constants.DASHBOARD_SIZE_OPTIONS.AUTO_FIT) {
                        this.iframe.height = payload.height;
                    }
                }
            }
        }.bind(this), false);

        this.getContainer = this.getContainer.bind(this);
        this.getParameters = this.getParameters.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.setParameters = this.setParameters.bind(this);
    }

    _createClass(EmbeddableDashboard, [{
        key: 'getUrl',
        value: function getUrl() {
            return this.url;
        }
    }, {
        key: 'getContainer',
        value: function getContainer() {
            return this.container;
        }
    }, {
        key: 'getParameters',
        value: function getParameters() {
            return this.parameters;
        }
    }, {
        key: 'setParameters',
        value: function setParameters(parameters) {
            var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.UPDATE_PARAMETER_VALUES;
            var payload = { parameters: parameters };
            var event = (0, _constructEvent2.default)(eventName, payload);
            this.iframe.contentWindow.postMessage(event, this.url);
        }
    }]);

    return EmbeddableDashboard;
}();

function createIframe(options) {
    var width = options.width,
        height = options.height;
    var loadingHeight = options.loadingHeight,
        url = options.url,
        scrolling = options.scrolling;

    if (height === _constants.DASHBOARD_SIZE_OPTIONS.AUTO_FIT) {
        height = loadingHeight;
    }
    var iframe = document.createElement('iframe');
    iframe.className = 'quicksight-embedding-iframe';
    iframe.width = width || '100%';
    iframe.height = height || '100%';
    iframe.scrolling = scrolling || 'no';
    iframe.onload = sendInitialPostMessage.bind(null, iframe, url);
    iframe.src = getIframeSrc(options);
    return iframe;
}

function getIframeSrc(options) {
    var url = options.url,
        parameters = options.parameters;

    var src = url + '&punyCodeEmbedOrigin=' + _punycode2.default.encode(window.location.origin + '/');
    if (parameters) {
        return useParameterValuesInUrl(src, parameters);
    }
    return src;
}

/**
 * Use parameter values in url.
 * @function
 * @name useParameterValuesInUrl
 * @param {string} url - url of the dashboard to embed.
 * @param {Object} parameters
 */
function useParameterValuesInUrl(url, parameters) {
    var parameterNames = Object.keys(parameters);
    var parameterStrings = parameterNames.map(function (name) {
        var value = parameters[name];
        var values = [].concat(value);
        var encodedName = encodeURIComponent(name);
        return values.map(function (paramValue) {
            return encodeURIComponent(paramValue);
        }).map(function (encodedValue) {
            return 'p.' + encodedName + '=' + encodedValue;
        }).join('&');
    });

    return url + '#' + parameterStrings.join('&');
}

function sendInitialPostMessage(iframe, domain) {
    if (iframe.contentWindow === null) {
        setTimeout(sendInitialPostMessage.bind(null, iframe, domain), 100);
    }

    var eventName = _constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES.ESTABLISH_MESSAGE_CHANNEL;
    var event = (0, _constructEvent2.default)(eventName);
    // wait until iframe.contentWindow exists and send message to iframe window
    iframe.contentWindow.postMessage(event, domain);
}

exports.default = EmbeddableDashboard;