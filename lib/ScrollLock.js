'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var upKeys = [33, // pageUp
38 // arrowUp
];
var downKeys = [32, // space
34, // pageDown
40 // arrowDown
];

var ScrollLock = function () {
  function ScrollLock() {
    var _this = this;

    _classCallCheck(this, ScrollLock);

    this.handleEventDelta = function (e, delta) {
      var isDeltaPositive = delta > 0;
      var elem = _this.scrollingElement;
      var scrollTop = elem.scrollTop,
          scrollHeight = elem.scrollHeight,
          clientHeight = elem.clientHeight;


      var shouldCancelScroll = false;
      if (isDeltaPositive && delta > scrollHeight - clientHeight - scrollTop) {
        // bottom limit
        elem.scrollTop = scrollHeight;
        shouldCancelScroll = true;
      } else if (!isDeltaPositive && -delta > scrollTop) {
        // top limit
        elem.scrollTop = 0;
        shouldCancelScroll = true;
      }

      if (shouldCancelScroll) {
        _this.cancelScrollEvent(e);
      }
    };

    this.onWheelHandler = function (e) {
      _this.handleEventDelta(e, e.deltaY);
    };

    this.onTouchStartHandler = function (e) {
      // set touch start so we can calculate touchmove delta
      _this.touchStart = e.changedTouches[0].clientY;
    };

    this.onTouchMoveHandler = function (e) {
      var delta = _this.touchStart - e.changedTouches[0].clientY;
      _this.handleEventDelta(e, delta);
    };

    this.onKeyDownHandler = function (e) {
      if (e.target !== _this.scrollingElement) {
        return;
      }

      if (upKeys.indexOf(e.keyCode) >= 0) {
        _this.handleEventDelta(e, -1);
      } else if (downKeys.indexOf(e.keyCode) >= 0) {
        _this.handleEventDelta(e, 1);
      }
    };

    this.preventOutside = function (e) {
      var elem = _this.scrollingElement;
      if (!elem.contains(e.target)) {
        _this.cancelScrollEvent(e);
      }
    };

    this.cancelScrollEvent = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    };
  }

  _createClass(ScrollLock, [{
    key: 'lock',
    value: function lock(el) {
      this.scrollingElement = el;
      this.listenToScrollEvents(this.scrollingElement);
    }
  }, {
    key: 'unlock',
    value: function unlock(el) {
      this.stopListeningToScrollEvents(this.scrollingElement);
    }
  }, {
    key: 'only',
    value: function only(el) {
      this.scrollingElement = el;
      this.listenToScrollEvents(this.scrollingElement, true);
    }
  }, {
    key: 'any',
    value: function any(el) {
      this.stopListeningToScrollEvents(this.scrollingElement, true);
    }
  }, {
    key: 'listenToScrollEvents',
    value: function listenToScrollEvents(el, only) {
      if (only) {
        window.addEventListener('wheel', this.preventOutside);
        el.addEventListener('touchstart', this.preventOutside);
        el.addEventListener('touchmove', this.preventOutside);
      }
      el.addEventListener('wheel', this.onWheelHandler, false);
      el.addEventListener('touchstart', this.onTouchStartHandler, false);
      el.addEventListener('touchmove', this.onTouchMoveHandler, false);
      el.addEventListener('keydown', this.onKeyDownHandler, false);
    }
  }, {
    key: 'stopListeningToScrollEvents',
    value: function stopListeningToScrollEvents(el, any) {
      if (any) {
        window.removeEventListener('wheel', this.preventOutside);
        el.removeEventListener('touchstart', this.preventOutside);
        el.removeEventListener('touchmove', this.preventOutside);
      }
      el.removeEventListener('wheel', this.onWheelHandler, false);
      el.removeEventListener('touchstart', this.onTouchStartHandler, false);
      el.removeEventListener('touchmove', this.onTouchMoveHandler, false);
      el.removeEventListener('keydown', this.onKeyDownHandler, false);
    }
  }]);

  return ScrollLock;
}();

exports.default = ScrollLock;