'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _EmbeddableDashboard = require('./EmbeddableDashboard');

var _EmbeddableDashboard2 = _interopRequireDefault(_EmbeddableDashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Embed a dashboard.
 * @function
 * @name embedDashboard
 * @param {EmbeddingOptions} options - options set by customers to embed the dashboard.
 */
function embedDashboard(options) {
    var dashboard = new _EmbeddableDashboard2.default(options);
    var container = dashboard.getContainer();
    setTimeout(attachToDom.bind(null, dashboard.iframe, container), 0);
    return dashboard;
}

/**
 * Create a iframe and attach it to parent element.
 * @function
 * @name attachToDom
 * @param {HTMLIFrameElement} iframe
 * @param {string} url - url of the dashboard to embed with parameter values appended.
 * @param {HTMLElement} container - parent html element.
 */

// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

function attachToDom(iframe, container) {
    if (!iframe) {
        throw new Error('iFrame is required');
    }

    if (!container) {
        throw new Error('container of iFrame is required');
    }

    container.appendChild(iframe);
}

exports.default = embedDashboard;