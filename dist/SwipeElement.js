"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwipeElement = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldGet5 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _SwipeService = require("./SwipeService");

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var _swipeService = /*#__PURE__*/new WeakMap();

var SwipeElement = /*#__PURE__*/function () {
  function SwipeElement(el, swipeService) {
    (0, _classCallCheck2["default"])(this, SwipeElement);
    (0, _defineProperty2["default"])(this, "el", void 0);

    _classPrivateFieldInitSpec(this, _swipeService, {
      writable: true,
      value: void 0
    });

    (0, _defineProperty2["default"])(this, "start", void 0);
    (0, _defineProperty2["default"])(this, "end", void 0);
    (0, _defineProperty2["default"])(this, "x", void 0);
    (0, _defineProperty2["default"])(this, "y", void 0);
    (0, _defineProperty2["default"])(this, "period", 0);
    (0, _defineProperty2["default"])(this, "isEnd", false);
    this.el = el;
    (0, _classPrivateFieldSet2["default"])(this, _swipeService, swipeService instanceof _SwipeService.SwipeService ? swipeService : null);
  }

  (0, _createClass2["default"])(SwipeElement, [{
    key: "setPeriod",
    value: function setPeriod() {
      if (this.isEnd) return this.period = 0;
      this.period += 10;
      setTimeout(this.setPeriod, 1);
    }
  }, {
    key: "assignParams",
    value: function assignParams(x, y, dir, event) {
      return {
        x: x,
        y: y,
        period: this.period,
        dir: dir,
        event: event,
        startX: this.start.clientX,
        startY: this.start.clientY
      };
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this = this;

      this.el.addEventListener('touchstart', function (event) {
        var _classPrivateFieldGet2, _this$start, _this$start2;

        _this.start = _this.end = event.touches[0];

        _this.setPeriod();

        (_classPrivateFieldGet2 = (0, _classPrivateFieldGet5["default"])(_this, _swipeService)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.onSwipeStart(_this.assignParams((_this$start = _this.start) === null || _this$start === void 0 ? void 0 : _this$start.clientX, (_this$start2 = _this.start) === null || _this$start2 === void 0 ? void 0 : _this$start2.clientY, _this.getDirection(event), event));
      }, false);
      this.el.addEventListener('touchend', function (event) {
        var _classPrivateFieldGet3, _this$end, _this$end2;

        _this.isEnd = false;
        _this.end || (_this.end = event.touches[0]);
        (_classPrivateFieldGet3 = (0, _classPrivateFieldGet5["default"])(_this, _swipeService)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.onSwipeEnd(_this.assignParams((_this$end = _this.end) === null || _this$end === void 0 ? void 0 : _this$end.clientX, (_this$end2 = _this.end) === null || _this$end2 === void 0 ? void 0 : _this$end2.clientY, _this.getDirection(event), event));
      }, false);
      this.el.addEventListener('touchmove', function (event) {
        var _event$touches$, _event$touches$2, _classPrivateFieldGet4;

        _this.x = (_event$touches$ = event.touches[0]) === null || _event$touches$ === void 0 ? void 0 : _event$touches$.clientX;
        _this.y = (_event$touches$2 = event.touches[0]) === null || _event$touches$2 === void 0 ? void 0 : _event$touches$2.clientY;
        _this.end || (_this.end = event.touches[0]);
        return (_classPrivateFieldGet4 = (0, _classPrivateFieldGet5["default"])(_this, _swipeService)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.onSwipeMove(_this.assignParams(_this.x, _this.y, _this.getDirection(event), event));
      }, false);
    }
  }, {
    key: "getDirection",
    value: function getDirection(event) {
      var _event$touches$3, _event$touches$4, _this$end3, _this$end4, _this$end5, _this$end6;

      this.x = (_event$touches$3 = event.touches[0]) === null || _event$touches$3 === void 0 ? void 0 : _event$touches$3.clientX;
      this.y = (_event$touches$4 = event.touches[0]) === null || _event$touches$4 === void 0 ? void 0 : _event$touches$4.clientY;
      var dir = {
        right: this.x > ((_this$end3 = this.end) === null || _this$end3 === void 0 ? void 0 : _this$end3.clientX),
        left: this.x < ((_this$end4 = this.end) === null || _this$end4 === void 0 ? void 0 : _this$end4.clientX),
        up: this.y < ((_this$end5 = this.end) === null || _this$end5 === void 0 ? void 0 : _this$end5.clientY),
        down: this.y > ((_this$end6 = this.end) === null || _this$end6 === void 0 ? void 0 : _this$end6.clientY)
      };
      this.end = event.touches[0];
      return dir;
    }
  }]);
  return SwipeElement;
}();

exports.SwipeElement = SwipeElement;