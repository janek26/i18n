"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _ = require(".");

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["", " tree"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["", " tree"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Hello ", "!"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["", " tree"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Hello ", "!"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var fetchGermanLocal = function fetchGermanLocal() {
  return new Promise(function (res) {
    return setTimeout(function () {
      return res({
        modifier: {
          datetime: function datetime() {
            var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
            return "".concat(date.getDay(), ".").concat(date.getMonth(), ".").concat(date.getFullYear(), " um ").concat(date.getHours(), ":").concat(date.getMinutes());
          }
        },
        plural: {
          '${1} Nachrichten': function $1Nachrichten(c) {
            return c === 1 ? "eine Nachricht" : c === 2 ? "zwei Nachrichten" : "".concat(c, " Nachrichten");
          }
        }
      });
    }, 2000);
  });
};

test('t defaults work', function () {
  expect((0, _.t)(_templateObject(), 'Username')).toBe('Hello Username!');
});
test('p defaults work', function () {
  expect((0, _.p)(_templateObject2(), 5)).toBe('5 tree');
});
test('mod defaults work', function () {
  expect((0, _.mod)('int')(5)).toBe('5');
  expect((0, _.mod)('int')(5, 25)).toBe('5 25');
});
test('setConfig works',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _.setConfig)({
            lng: 'de',
            resources: {
              de: {
                translation: {
                  world: 'Welt',
                  'Hello ${1}': 'Hallo ${1}'
                },
                modifier: {
                  "int": function _int2(_int) {
                    return _int * 10;
                  }
                },
                plural: {
                  '${1} tree': function $1Tree(c) {
                    return c === 1 ? "ein Baum" : "".concat(c, " B\xE4ume");
                  }
                }
              }
            }
          });

        case 2:
          expect((0, _.getConfig)().lng).toBe('de');

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
test('t works', function () {
  expect((0, _.t)(_templateObject3(), 'Username')).toBe('Hallo Username!');
});
test('p works', function () {
  expect((0, _.p)(_templateObject4(), 1)).toBe('ein Baum');
  expect((0, _.p)(_templateObject5(), 5)).toBe('5 Bäume');
});
test('mod works', function () {
  expect((0, _.mod)('int')(5)).toBe(50);
  expect((0, _.mod)('int')(5, 25)).toBe(50); // Just the first argument is used in modifier int
});