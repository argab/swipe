"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VueSwipeDirective = void 0;

var _SwipeElement = require("./SwipeElement");

var _SwipeService = require("./SwipeService");

var VueSwipeDirective = function VueSwipeDirective(el, binding) {
  if (!binding.value) return;

  var isPlainObject = function isPlainObject(value) {
    return value !== undefined && value !== null && !Array.isArray(value) && typeof value !== 'function' && value instanceof Object;
  };

  var data = isPlainObject(binding.value) ? binding.value : {};
  var modifiers = isPlainObject(binding.modifiers) ? binding.modifiers : {};
  var args = {};
  var direction = data.direction,
      onEnd = data.onEnd,
      onStart = data.onStart,
      onMove = data.onMove,
      fixed = data.fixed,
      fixedTimeout = data.fixedTimeout;
  Object.keys(modifiers).forEach(function (arg) {
    if (['up', 'down', 'left', 'right'].includes(arg)) args.direction = arg;

    if (arg.match(/fixed\s*:?/)) {
      var _arg$split$;

      args.fixed = true;
      var timeout = (_arg$split$ = arg.split(':')[1]) === null || _arg$split$ === void 0 ? void 0 : _arg$split$.trim();
      timeout && (args.fixedTimeout = +timeout);
    }
  });
  var swipe = new _SwipeService.SwipeService(el, {
    direction: direction || args.direction,
    onStart: onStart,
    onEnd: onEnd,
    onMove: onMove,
    fixed: fixed || args.fixed || false,
    fixedTimeout: fixedTimeout || args.fixedTimeout
  });
  var swipeEl = new _SwipeElement.SwipeElement(el, swipe);
  swipe.validate() && swipeEl.addListeners();
};

exports.VueSwipeDirective = VueSwipeDirective;