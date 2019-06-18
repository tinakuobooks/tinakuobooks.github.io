'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = eventify;

// Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * Adds `on()`, `off()`, and `trigger()` methods to an object.
 * Consumers can use `on()` function to subscribe to events, use `off()` to unsubscribe
 * and use `trigger()` to trigger event.
 */
function eventify(object) {
    if (!object) {
        object = {};
    }

    assertObjectHasNoReservedKeywords(object);

    var listeners = new Map(); // eventName -> Set() of listeners

    object.on = on;
    object.off = off;
    object.trigger = trigger;

    return object;

    function on(eventName, callback) {
        var eventListeners = listeners.get(eventName);
        if (!eventListeners) {
            eventListeners = new Set();
            listeners.set(eventName, eventListeners);
        }

        eventListeners.add(callback);
    }

    function trigger(eventName) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var eventListeners = listeners.get(eventName);
        if (eventListeners) {
            eventListeners.forEach(function (listener) {
                return listener.apply(null, args);
            });
        }
    }

    function off(eventName, callback) {
        if (!callback) {
            // we want to unsubscribe from all events
            listeners.delete(eventName);
            return object;
        }

        var eventListeners = listeners.get(eventName);
        if (!eventListeners) {
            // no listeners, nothing to unsubscribe from
            return object;
        }
        // remove this specific callback from this event
        eventListeners.delete(callback);

        return object;
    }
}

function assertObjectHasNoReservedKeywords(object) {
    ['on', 'trigger', 'off'].forEach(function (keyword) {
        if (keyword in object) {
            throw new Error('Cannot eventify object that has `' + keyword + '()` method on it');
        }
    });
}