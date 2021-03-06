"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwipeService = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classPrivateFieldGet5 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

var _el = /*#__PURE__*/new WeakMap();

var _params = /*#__PURE__*/new WeakMap();

var _diff = /*#__PURE__*/new WeakMap();

var _left = /*#__PURE__*/new WeakMap();

var _top = /*#__PURE__*/new WeakMap();

var _dir = /*#__PURE__*/new WeakMap();

var SwipeService = /*#__PURE__*/function () {
  function SwipeService(el) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      direction: '',
      onStart: null,
      onEnd: null,
      onMove: null,
      fixed: false,
      fixedTimeout: 0
    };
    (0, _classCallCheck2["default"])(this, SwipeService);

    _classPrivateFieldInitSpec(this, _el, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _params, {
      writable: true,
      value: {}
    });

    _classPrivateFieldInitSpec(this, _diff, {
      writable: true,
      value: {
        x: 0,
        y: 0
      }
    });

    _classPrivateFieldInitSpec(this, _left, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _top, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _dir, {
      writable: true,
      value: {
        up: false,
        down: false,
        left: false,
        right: false
      }
    });

    (0, _classPrivateFieldSet2["default"])(this, _el, el);
    (0, _classPrivateFieldSet2["default"])(this, _params, params);
  }

  (0, _createClass2["default"])(SwipeService, [{
    key: "el",
    get: function get() {
      return (0, _classPrivateFieldGet5["default"])(this, _el);
    }
  }, {
    key: "top",
    get: function get() {
      return (0, _classPrivateFieldGet5["default"])(this, _top);
    }
  }, {
    key: "left",
    get: function get() {
      return (0, _classPrivateFieldGet5["default"])(this, _left);
    }
  }, {
    key: "params",
    get: function get() {
      return _objectSpread({}, (0, _classPrivateFieldGet5["default"])(this, _params));
    }
  }, {
    key: "diff",
    get: function get() {
      return _objectSpread({}, (0, _classPrivateFieldGet5["default"])(this, _diff));
    }
  }, {
    key: "dir",
    get: function get() {
      return _objectSpread({}, (0, _classPrivateFieldGet5["default"])(this, _dir));
    }
  }, {
    key: "start",
    get: function get() {
      var _classPrivateFieldGet2 = (0, _classPrivateFieldGet5["default"])(this, _el).getBoundingClientRect(),
          width = _classPrivateFieldGet2.width,
          height = _classPrivateFieldGet2.height;

      return {
        x: (0, _classPrivateFieldGet5["default"])(this, _left) + width,
        y: (0, _classPrivateFieldGet5["default"])(this, _top) + height,
        width: width,
        height: height
      };
    }
  }, {
    key: "validate",
    value: function validate() {
      if ((0, _classPrivateFieldGet5["default"])(this, _params).direction && !['up', 'down', 'left', 'right'].includes((0, _classPrivateFieldGet5["default"])(this, _params).direction)) {
        console.error('Invalid direction value.');
        return false;
      }

      return !!Object.values((0, _classPrivateFieldGet5["default"])(this, _params)).some(function (v) {
        return v;
      });
    }
  }, {
    key: "assignParams",
    value: function assignParams(params, x, y) {
      return _objectSpread(_objectSpread({}, params), {}, {
        dir: _objectSpread({}, (0, _classPrivateFieldGet5["default"])(this, _dir)),
        diff: _objectSpread({}, (0, _classPrivateFieldGet5["default"])(this, _diff)),
        threshold: this.getThreshold({
          x: x,
          y: y
        })
      });
    }
  }, {
    key: "getThreshold",
    value: function getThreshold(_ref) {
      var x = _ref.x,
          y = _ref.y;
      var start = this.start;
      var pos = this.getPos({
        x: x,
        y: y
      });
      var threshold = 0;

      switch ((0, _classPrivateFieldGet5["default"])(this, _params).direction) {
        case 'left':
        case 'right':
          threshold = pos.x < start.x ? pos.x / start.x * 100 : start.x / pos.x * 100;
          break;

        case 'up':
        case 'down':
          threshold = pos.y < start.y ? pos.y / start.y * 100 : start.y / pos.y * 100;
          break;
      }

      return isNaN(threshold) || threshold < 0 ? 0 : threshold;
    }
  }, {
    key: "onSwipeStart",
    value: function onSwipeStart(params) {
      var x = params.x,
          y = params.y;

      if ((0, _classPrivateFieldGet5["default"])(this, _left) === undefined || (0, _classPrivateFieldGet5["default"])(this, _top) === undefined) {
        var _classPrivateFieldGet3 = (0, _classPrivateFieldGet5["default"])(this, _el).getBoundingClientRect(),
            left = _classPrivateFieldGet3.left,
            top = _classPrivateFieldGet3.top;

        (0, _classPrivateFieldSet2["default"])(this, _left, left);
        (0, _classPrivateFieldSet2["default"])(this, _top, top);
      }

      (0, _classPrivateFieldGet5["default"])(this, _diff).x = x > (0, _classPrivateFieldGet5["default"])(this, _left) ? x - (0, _classPrivateFieldGet5["default"])(this, _left) : (0, _classPrivateFieldGet5["default"])(this, _left) - x;
      (0, _classPrivateFieldGet5["default"])(this, _diff).y = y > (0, _classPrivateFieldGet5["default"])(this, _top) ? y - (0, _classPrivateFieldGet5["default"])(this, _top) : (0, _classPrivateFieldGet5["default"])(this, _top) - y;
      (0, _classPrivateFieldGet5["default"])(this, _params).onStart && (0, _classPrivateFieldGet5["default"])(this, _params).onStart(this.assignParams(params, x, y));
    }
  }, {
    key: "onSwipeEnd",
    value: function onSwipeEnd(params) {
      var _this = this;

      var x = params.x,
          y = params.y;
      (0, _classPrivateFieldGet5["default"])(this, _params).onEnd && (0, _classPrivateFieldGet5["default"])(this, _params).onEnd(this.assignParams(params, x, y));
      (0, _classPrivateFieldGet5["default"])(this, _params).fixed && setTimeout(function () {
        if (['left', 'right'].includes((0, _classPrivateFieldGet5["default"])(_this, _params).direction)) _this.setPos.left();
        if (['up', 'down'].includes((0, _classPrivateFieldGet5["default"])(_this, _params).direction)) _this.setPos.top();
      }, +(0, _classPrivateFieldGet5["default"])(this, _params).fixedTimeout || 0);
    }
  }, {
    key: "onSwipeMove",
    value: function onSwipeMove(params) {
      var x = params.x,
          y = params.y,
          dir = params.dir;
      (0, _classPrivateFieldSet2["default"])(this, _dir, dir);
      if ((0, _classPrivateFieldGet5["default"])(this, _params).onMove && (0, _classPrivateFieldGet5["default"])(this, _params).onMove(this.assignParams(params, x, y)) === false) return false;
      if (['left', 'right'].includes((0, _classPrivateFieldGet5["default"])(this, _params).direction)) this.setPos.x(x);
      if (['up', 'down'].includes((0, _classPrivateFieldGet5["default"])(this, _params).direction)) this.setPos.y(y);
    }
  }, {
    key: "checkPosX",
    value: function checkPosX(posX) {
      var start = this.start;
      if ((0, _classPrivateFieldGet5["default"])(this, _params).direction === 'left' && posX > start.x) return false;
      return !((0, _classPrivateFieldGet5["default"])(this, _params).direction === 'right' && posX - start.width < start.x - start.width);
    }
  }, {
    key: "checkPosY",
    value: function checkPosY(posY) {
      var start = this.start;
      if ((0, _classPrivateFieldGet5["default"])(this, _params).direction === 'up' && posY > start.y) return false;
      return !((0, _classPrivateFieldGet5["default"])(this, _params).direction === 'down' && posY - start.height < start.y - start.height);
    }
  }, {
    key: "getPos",
    value: function getPos(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;

      var _classPrivateFieldGet4 = (0, _classPrivateFieldGet5["default"])(this, _el).getBoundingClientRect(),
          width = _classPrivateFieldGet4.width,
          height = _classPrivateFieldGet4.height;

      return {
        x: x + width - (0, _classPrivateFieldGet5["default"])(this, _diff).x,
        y: y + height - (0, _classPrivateFieldGet5["default"])(this, _diff).y,
        width: width,
        height: height
      };
    }
  }, {
    key: "setPos",
    get: function get() {
      var _this2 = this;

      return {
        x: function x(_x) {
          var pos = _this2.getPos({
            x: _x
          });

          (0, _classPrivateFieldGet5["default"])(_this2, _el).style.left = (_this2.checkPosX(pos.x) ? _x - (0, _classPrivateFieldGet5["default"])(_this2, _diff).x : (0, _classPrivateFieldGet5["default"])(_this2, _left)) + 'px';
        },
        y: function y(_y) {
          var pos = _this2.getPos({
            y: _y
          });

          (0, _classPrivateFieldGet5["default"])(_this2, _el).style.top = (_this2.checkPosY(pos.y) ? _y - (0, _classPrivateFieldGet5["default"])(_this2, _diff).y : (0, _classPrivateFieldGet5["default"])(_this2, _top)) + 'px';
        },
        left: function left() {
          (0, _classPrivateFieldGet5["default"])(_this2, _el).style.left = (0, _classPrivateFieldGet5["default"])(_this2, _left) + 'px';
        },
        top: function top() {
          (0, _classPrivateFieldGet5["default"])(_this2, _el).style.top = (0, _classPrivateFieldGet5["default"])(_this2, _top) + 'px';
        }
      };
    }
  }]);
  return SwipeService;
}();

exports.SwipeService = SwipeService;