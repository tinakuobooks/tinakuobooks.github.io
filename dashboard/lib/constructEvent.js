'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = constructEvent;

var _constants = require('./constants');

function constructEvent(eventName, payload) {
    var validEventNames = new Set(Object.values(_constants.OUT_GOING_POST_MESSAGE_EVENT_NAMES));

    if (!validEventNames.has(eventName)) {
        throw new Error('Unexpected eventName');
    }

    return {
        eventName: eventName,
        clientType: 'EMBEDDING',
        payload: payload
    };
}
// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0