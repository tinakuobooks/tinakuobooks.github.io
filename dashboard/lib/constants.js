'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var OUT_GOING_POST_MESSAGE_EVENT_NAMES = exports.OUT_GOING_POST_MESSAGE_EVENT_NAMES = {
    ESTABLISH_MESSAGE_CHANNEL: 'establishMessageChannel',
    UPDATE_PARAMETER_VALUES: 'updateParameterValues'
};

var IN_COMING_POST_MESSAGE_EVENT_NAMES = exports.IN_COMING_POST_MESSAGE_EVENT_NAMES = {
    LOAD: 'load',
    ERROR: 'error',
    RESIZE_EVENT: 'RESIZE_EVENT'
};

// this is a mapping of event names we use internally to the event names we expose to clients
var CLIENT_FACING_EVENT_NAMES = exports.CLIENT_FACING_EVENT_NAMES = {
    load: 'load',
    error: 'error',
    RESIZE_EVENT: 'resize'
};

var DASHBOARD_SIZE_OPTIONS = exports.DASHBOARD_SIZE_OPTIONS = {
    AUTO_FIT: 'AutoFit'
};