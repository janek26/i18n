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
  lng: ['en'],
  resources: {
    en: {
      translation: {},
      plural: {},
      modifier: {}
    }
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
        updatedConfig,
        keys,
        funcs,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configNew = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
            resolvedRecources = {};
            updatedConfig = (0, _objectSpread3["default"])({}, defaultConfig, config, configNew);

            if (!configNew.resources) {
              _context.next = 9;
              break;
            }

            keys = updatedConfig.lng.filter(function (key) {
              var val = configNew.resources[key];
              return typeof val === 'function';
            });
            funcs = keys.map(function (key) {
              return configNew.resources[key]();
            });
            _context.next = 8;
            return Promise.all(funcs).then(function (x) {
              return x.reduce(function (acc, val, keyIndex) {
                return (0, _objectSpread3["default"])({}, acc, (0, _defineProperty2["default"])({}, keys[keyIndex], val));
              }, {});
            });

          case 8:
            resolvedRecources = _context.sent;

          case 9:
            config = (0, _objectSpread3["default"])({}, updatedConfig, {
              resources: (0, _objectSpread3["default"])({}, defaultConfig.resources, config.resources, configNew.resources, resolvedRecources)
            });

          case 10:
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

var calcKey = function calcKey(statics, calledBy) {
  var key = statics.reduce(function (acc, val, i) {
    return acc + val + (statics.length - 1 !== i ? "${".concat(i + 1, "}") : '');
  }, '');
  var _config = config,
      _config$resources = _config.resources,
      resources = _config$resources === void 0 ? {} : _config$resources,
      _config$lng = _config.lng;
  _config$lng = _config$lng === void 0 ? [] : _config$lng;

  var _config$lng2 = (0, _slicedToArray2["default"])(_config$lng, 1),
      lng = _config$lng2[0];

  var _resources$lng = resources[lng],
      _resources$lng$transl = _resources$lng.translation,
      translation = _resources$lng$transl === void 0 ? {} : _resources$lng$transl,
      _resources$lng$plural = _resources$lng.plural,
      plural = _resources$lng$plural === void 0 ? {} : _resources$lng$plural;
  var isTranslation = !!translation[key];
  var isPlural = !!plural[key];
  var type = isTranslation ? 'translation' : isPlural ? 'plural' : calledBy === 't' ? 'unknown_translation' : 'unknown_plural';
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

var getResourceForKeys = function getResourceForKeys(locals, type) {
  return function (key) {
    return config.resources[locals.find(function (locale) {
      return !!(config.resources[locale] && config.resources[locale][type] && config.resources[locale][type][key]);
    })] || {};
  };
};

var t = function t(statics) {
  for (var _len = arguments.length, vars = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    vars[_key - 1] = arguments[_key];
  }

  var key = calcKey(statics, 't');
  var _config2 = config,
      _config2$lng = _config2.lng,
      lng = _config2$lng === void 0 ? [] : _config2$lng;

  var _getResourceForKeys = getResourceForKeys(lng, 'translation')(key),
      _getResourceForKeys$t = _getResourceForKeys.translation,
      translation = _getResourceForKeys$t === void 0 ? {} : _getResourceForKeys$t;

  if (!translation[key]) return parseValuesToStatics(statics, vars);
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

exports.t = t;

var p = function p(_ref3, count) {
  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      start = _ref4[0],
      end = _ref4[1];

  var key = calcKey([start, end], 'p');
  var _config3 = config,
      _config3$lng = _config3.lng,
      lng = _config3$lng === void 0 ? [] : _config3$lng;

  var _getResourceForKeys2 = getResourceForKeys(lng, 'plural')(key),
      _getResourceForKeys2$ = _getResourceForKeys2.plural,
      plural = _getResourceForKeys2$ === void 0 ? {} : _getResourceForKeys2$;

  if (!plural[key]) return parseValuesToStatics([start, end], [count]);
  return plural[key](count);
};

exports.p = p;

var mod = function mod(modifierKey) {
  return function () {
    var _config4 = config,
        _config4$lng = _config4.lng,
        lng = _config4$lng === void 0 ? [] : _config4$lng,
        _config4$resources = _config4.resources,
        resources = _config4$resources === void 0 ? {} : _config4$resources;

    var _getResourceForKeys3 = getResourceForKeys(lng, 'modifier')(modifierKey),
        _getResourceForKeys3$ = _getResourceForKeys3.modifier,
        modifier = _getResourceForKeys3$ === void 0 ? {} : _getResourceForKeys3$;

    var primaryLang = lng[0];
    config.onKey({
      key: modifierKey,
      type: resources[primaryLang] && resources[primaryLang].modifier && resources[primaryLang].modifier[modifierKey] ? 'mod' : 'unknown_mod',
      lng: primaryLang
    });

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