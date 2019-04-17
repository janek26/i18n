"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _ = require(".");

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Bye ", ""]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["", " house"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Bye ", "!"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["", " tree"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Hello ", "!"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["", " tree"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["", " tree"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["Hello ", "!"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

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
            lng: ['de'],
            resources: {
              de: {
                translation: {
                  'Hello ${1}!': 'Hallo ${1}!',
                  'Bye ${1}': 'Tschüss ${1}'
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
          expect((0, _.getConfig)().lng).toEqual(['de']);

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

var mockEsAsync = function mockEsAsync() {
  return new Promise(function (res) {
    return setTimeout(function () {
      return res({
        translation: {
          'Hello ${1}!': 'hola ${1}!'
        },
        modifier: {
          "int": function int(_int3) {
            return _int3 * 50;
          }
        },
        plural: {
          '${1} tree': function $1Tree(c) {
            return c === 1 ? "el \xE1rbol" : "".concat(c, " \xE1rboles");
          }
        }
      });
    }, 1000);
  });
};

test('setConfig works (async resource)',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _.setConfig)({
            lng: ['es'],
            resources: {
              es: function es() {
                return mockEsAsync();
              }
            }
          });

        case 2:
          expect((0, _.getConfig)().lng).toEqual(['es']);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));
test('t works', function () {
  expect((0, _.t)(_templateObject6(), 'Username')).toBe('hola Username!');
});
test('p works', function () {
  expect((0, _.p)(_templateObject7(), 1)).toBe('el árbol');
  expect((0, _.p)(_templateObject8(), 5)).toBe('5 árboles');
});
test('mod works', function () {
  expect((0, _.mod)('int')(5)).toBe(250);
  expect((0, _.mod)('int')(5, 25)).toBe(250); // Just the first argument is used in modifier int
});
test('onKey Hook works',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee3() {
  var mockFn;
  return _regenerator["default"].wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mockFn = jest.fn();
          _context3.next = 3;
          return (0, _.setConfig)({
            onKey: mockFn
          });

        case 3:
          (0, _.t)(_templateObject9(), 'Username');
          (0, _.p)(_templateObject10(), 1);
          (0, _.mod)('int')(5);
          (0, _.t)(_templateObject11(), 'Username');
          (0, _.p)(_templateObject12(), 1);
          (0, _.mod)('date')(new Date());
          expect(mockFn.mock.calls.length).toBe(6);
          expect(mockFn.mock.calls[0][0]).toEqual({
            key: 'Hello ${1}!',
            type: 'translation',
            lng: 'es'
          });
          expect(mockFn.mock.calls[1][0]).toEqual({
            key: '${1} tree',
            type: 'plural',
            lng: 'es'
          });
          expect(mockFn.mock.calls[2][0]).toEqual({
            key: 'int',
            type: 'mod',
            lng: 'es'
          });
          expect(mockFn.mock.calls[3][0]).toEqual({
            key: 'Bye ${1}!',
            type: 'unknown_translation',
            lng: 'es'
          });
          expect(mockFn.mock.calls[4][0]).toEqual({
            key: '${1} house',
            type: 'unknown_plural',
            lng: 'es'
          });
          expect(mockFn.mock.calls[5][0]).toEqual({
            key: 'date',
            type: 'unknown_mod',
            lng: 'es'
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})));
test('setConfig to use fallback language',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee4() {
  return _regenerator["default"].wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _.setConfig)({
            lng: ['es', 'de']
          });

        case 2:
          expect((0, _.getConfig)().lng).toEqual(['es', 'de']);
          expect((0, _.t)(_templateObject13(), 'user')).toBe('Tschüss user');

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4);
})));