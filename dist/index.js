"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mod = exports.p = exports.t = exports.setConfig = exports.getConfig = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var defaultConfig = {
  lng: 'en',
  resources: {
    en: {}
  },
  onKey: function onKey(_ref) {
    var key = _ref.key,
        type = _ref.type,
        lng = _ref.lng;
  }
};
var config = (0, _objectSpread3["default"])({}, defaultConfig);

var getConfig = function getConfig() {
  return (0, _objectSpread3["default"])({}, config);
};

exports.getConfig = getConfig;

var setConfig =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    var configNew,
        resolvedRecources,
        keys,
        funcs,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configNew = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            resolvedRecources = {};

            if (!configNew.resources) {
              _context.next = 8;
              break;
            }

            keys = Object.keys(configNew.resources).filter(function (key) {
              var val = configNew.resources[key];
              return typeof val === 'function';
            });
            funcs = keys.map(function (key) {
              return configNew.resources[key]();
            });
            _context.next = 7;
            return Promise.all(funcs).then(function (x) {
              return x.reduce(function (acc, val, keyIndex) {
                return (0, _objectSpread3["default"])({}, acc, (0, _defineProperty2["default"])({}, keys[keyIndex], val));
              }, {});
            });

          case 7:
            resolvedRecources = _context.sent;

          case 8:
            config = (0, _objectSpread3["default"])({}, defaultConfig, config, configNew, {
              resources: (0, _objectSpread3["default"])({}, defaultConfig.resources, config.resources, configNew.resources, resolvedRecources)
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function setConfig() {
    return _ref2.apply(this, arguments);
  };
}();

exports.setConfig = setConfig;

var calcKey = function calcKey(statics) {
  var key = statics.reduce(function (acc, val, i) {
    return acc + val + (statics.length - 1 !== i ? "${".concat(i + 1, "}") : '');
  }, '');
  var _config = config,
      _config$resources = _config.resources,
      resources = _config$resources === void 0 ? {} : _config$resources,
      _config$lng = _config.lng,
      lng = _config$lng === void 0 ? '' : _config$lng;
  var _resources$lng = resources[lng],
      _resources$lng$transl = _resources$lng.translation,
      translation = _resources$lng$transl === void 0 ? {} : _resources$lng$transl,
      _resources$lng$plural = _resources$lng.plural,
      plural = _resources$lng$plural === void 0 ? {} : _resources$lng$plural;
  var isTranslation = !!translation[key];
  var isPlural = !!plural[key];
  var type = isTranslation ? 'translation' : isPlural ? 'plural' : 'new';
  config.onKey({
    key: key,
    type: type,
    lng: lng
  });
  return key;
};

var parseValuesToStatics = function parseValuesToStatics(statics, vars) {
  return statics.reduce(function (acc, val, i) {
    return acc + val + (statics.length - 1 !== i ? "".concat(vars[i]) : '');
  }, '');
};

var calcValue = function calcValue(statics, vars) {
  var key = calcKey(statics);
  var _config2 = config,
      _config2$resources = _config2.resources,
      resources = _config2$resources === void 0 ? {} : _config2$resources,
      _config2$lng = _config2.lng,
      lng = _config2$lng === void 0 ? '' : _config2$lng;
  var _resources$lng$transl2 = resources[lng].translation,
      translation = _resources$lng$transl2 === void 0 ? {} : _resources$lng$transl2;
  if (!translation || !translation[key]) return parseValuesToStatics(statics, vars);
  var regex = /\$\{\d+\}/g;
  var order = translation[key].match(regex).map(function (x) {
    return parseInt(x.substr(0, x.length - 1).substr(2), 10) - 1;
  });
  var locVars = order.map(function (x) {
    return vars[x];
  });
  var locKeys = translation[key].split(regex);
  return parseValuesToStatics(locKeys, locVars);
};

var t = function t(statics) {
  for (var _len = arguments.length, vars = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    vars[_key - 1] = arguments[_key];
  }

  return calcValue(statics, vars);
};

exports.t = t;

var p = function p(_ref3, count) {
  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      start = _ref4[0],
      end = _ref4[1];

  var key = calcKey([start, end]);
  var _config3 = config,
      _config3$resources = _config3.resources,
      resources = _config3$resources === void 0 ? {} : _config3$resources,
      _config3$lng = _config3.lng,
      lng = _config3$lng === void 0 ? '' : _config3$lng;
  var _resources$lng$plural2 = resources[lng].plural,
      plural = _resources$lng$plural2 === void 0 ? {} : _resources$lng$plural2;

  if (!plural || !plural[key]) {
    config.onKey({
      key: key,
      type: 'unknown_mod',
      lng: lng
    });
    return parseValuesToStatics([start, end], [count]);
  }

  config.onKey({
    key: key,
    type: 'mod',
    lng: lng
  });
  return plural[key](count);
};

exports.p = p;

var mod = function mod(modifierKey) {
  return function () {
    var _config4 = config,
        _config4$resources = _config4.resources,
        resources = _config4$resources === void 0 ? {} : _config4$resources,
        _config4$lng = _config4.lng,
        lng = _config4$lng === void 0 ? '' : _config4$lng;
    var _resources$lng$modifi = resources[lng].modifier,
        modifier = _resources$lng$modifi === void 0 ? {} : _resources$lng$modifi;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (!modifier || !modifier[modifierKey]) return args.map(function (x) {
      return x.toString();
    }).join(' ');
    return modifier[modifierKey].apply(modifier, args);
  };
};

exports.mod = mod;