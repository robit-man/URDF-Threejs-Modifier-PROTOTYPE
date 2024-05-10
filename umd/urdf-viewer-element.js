(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three'), require('three/examples/js/controls/OrbitControls'), require('three/examples/jsm/loaders/STLLoader.js'), require('three/examples/jsm/loaders/ColladaLoader.js'), require('three-mesh-bvh')) :
  typeof define === 'function' && define.amd ? define(['three', 'three/examples/js/controls/OrbitControls', 'three/examples/jsm/loaders/STLLoader.js', 'three/examples/jsm/loaders/ColladaLoader.js', 'three-mesh-bvh'], factory) :
  (global = global || self, global.URDFViewer = factory(global.THREE, global.THREE, global.THREE, global.THREE, global.THREE));
}(this, function (THREE, OrbitControls, STLLoader_js, ColladaLoader_js, threeMeshBvh) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var REACT_ELEMENT_TYPE;

  function _jsx(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      props = {
        children: void 0
      };
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null
    };
  }

  function _asyncIterator(iterable) {
    var method;

    if (typeof Symbol !== "undefined") {
      if (Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator];
        if (method != null) return method.call(iterable);
      }

      if (Symbol.iterator) {
        method = iterable[Symbol.iterator];
        if (method != null) return method.call(iterable);
      }
    }

    throw new TypeError("Object is not async iterable");
  }

  function _AwaitValue(value) {
    this.wrapped = value;
  }

  function _AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;
        var wrappedAwait = value instanceof _AwaitValue;
        Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
          if (wrappedAwait) {
            resume("next", arg);
            return;
          }

          settle(result.done ? "return" : "normal", arg);
        }, function (err) {
          resume("throw", err);
        });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  _AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  _AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  _AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  function _wrapAsyncGenerator(fn) {
    return function () {
      return new _AsyncGenerator(fn.apply(this, arguments));
    };
  }

  function _awaitAsyncGenerator(value) {
    return new _AwaitValue(value);
  }

  function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {},
        waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) {
        resolve(inner[key](value));
      });
      return {
        done: false,
        value: awaitWrap(value)
      };
    }

    ;

    if (typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function () {
        return this;
      };
    }

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }

      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }

        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        return pump("return", value);
      };
    }

    return iter;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);

      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }

    return obj;
  }

  function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);

      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }

    return obj;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();

    _getRequireWildcardCache = function () {
      return cache;
    };

    return cache;
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    var cache = _getRequireWildcardCache();

    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};

    if (obj != null) {
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;

    if (cache) {
      cache.set(obj, newObj);
    }

    return newObj;
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = _superPropBase(target, property);

        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);

          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            return false;
          }
        }

        desc = Object.getOwnPropertyDescriptor(receiver, property);

        if (desc) {
          if (!desc.writable) {
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          _defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);

    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }

  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    strings.raw = raw;
    return strings;
  }

  function _readOnlyError(name) {
    throw new Error("\"" + name + "\" is read-only");
  }

  function _classNameTDZError(name) {
    throw new Error("Class \"" + name + "\" cannot be referenced in computed property keys.");
  }

  function _temporalUndefined() {}

  function _tdz(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }

  function _temporalRef(val, name) {
    return val === _temporalUndefined ? _tdz(name) : val;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _slicedToArrayLoose(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _iterableToArrayLimitLoose(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];

    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    };
  }

  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];

    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }

    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");

    return typeof key === "symbol" ? key : String(key);
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.');
  }

  function _initializerDefineProperty(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object.defineProperty(target, property, desc);
      desc = null;
    }

    return desc;
  }

  var id = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }

  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }

  function _classPrivateFieldDestructureSet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    var descriptor = privateMap.get(receiver);

    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v);
          }

        };
      }

      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }

  function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }

    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }

    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }

  function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }

    return method;
  }

  function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }

  function _decorate(decorators, factory, superClass, mixins) {
    var api = _getDecoratorsApi();

    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
    api.initializeClassElements(r.F, decorated.elements);
    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function () {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],
      initializeInstanceElements: function (O, elements) {
        ["method", "field"].forEach(function (kind) {
          elements.forEach(function (element) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },
      initializeClassElements: function (F, elements) {
        var proto = F.prototype;
        ["method", "field"].forEach(function (kind) {
          elements.forEach(function (element) {
            var placement = element.placement;

            if (element.kind === kind && (placement === "static" || placement === "prototype")) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },
      defineClassElement: function (receiver, element) {
        var descriptor = element.descriptor;

        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver)
          };
        }

        Object.defineProperty(receiver, element.key, descriptor);
      },
      decorateClass: function (elements, decorators) {
        var newElements = [];
        var finishers = [];
        var placements = {
          static: [],
          prototype: [],
          own: []
        };
        elements.forEach(function (element) {
          this.addElementPlacement(element, placements);
        }, this);
        elements.forEach(function (element) {
          if (!_hasDecorators(element)) return newElements.push(element);
          var elementFinishersExtras = this.decorateElement(element, placements);
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return {
            elements: newElements,
            finishers: finishers
          };
        }

        var result = this.decorateConstructor(newElements, decorators);
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;
        return result;
      },
      addElementPlacement: function (element, placements, silent) {
        var keys = placements[element.placement];

        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }

        keys.push(element.key);
      },
      decorateElement: function (element, placements) {
        var extras = [];
        var finishers = [];

        for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);
          var elementObject = this.fromElementDescriptor(element);
          var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras = elementFinisherExtras.extras;

          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }

            extras.push.apply(extras, newExtras);
          }
        }

        return {
          element: element,
          finishers: finishers,
          extras: extras
        };
      },
      decorateConstructor: function (elements, decorators) {
        var finishers = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj = this.fromClassDescriptor(elements);
          var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                  throw new TypeError("Duplicated element (" + elements[j].key + ")");
                }
              }
            }
          }
        }

        return {
          elements: elements,
          finishers: finishers
        };
      },
      fromElementDescriptor: function (element) {
        var obj = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor
        };
        var desc = {
          value: "Descriptor",
          configurable: true
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);
        if (element.kind === "field") obj.initializer = element.initializer;
        return obj;
      },
      toElementDescriptors: function (elementObjects) {
        if (elementObjects === undefined) return;
        return _toArray(elementObjects).map(function (elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },
      toElementDescriptor: function (elementObject) {
        var kind = String(elementObject.kind);

        if (kind !== "method" && kind !== "field") {
          throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
        }

        var key = _toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);

        if (placement !== "static" && placement !== "prototype" && placement !== "own") {
          throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
        }

        var descriptor = elementObject.descriptor;
        this.disallowProperty(elementObject, "elements", "An element descriptor");
        var element = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor)
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
          this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
          this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
          element.initializer = elementObject.initializer;
        }

        return element;
      },
      toElementFinisherExtras: function (elementObject) {
        var element = this.toElementDescriptor(elementObject);

        var finisher = _optionalCallableProperty(elementObject, "finisher");

        var extras = this.toElementDescriptors(elementObject.extras);
        return {
          element: element,
          finisher: finisher,
          extras: extras
        };
      },
      fromClassDescriptor: function (elements) {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this)
        };
        var desc = {
          value: "Descriptor",
          configurable: true
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);
        return obj;
      },
      toClassDescriptor: function (obj) {
        var kind = String(obj.kind);

        if (kind !== "class") {
          throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");

        var elements = this.toElementDescriptors(obj.elements);
        return {
          elements: elements,
          finisher: finisher
        };
      },
      runClassFinishers: function (constructor, finishers) {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor = (0, finishers[i])(constructor);

          if (newConstructor !== undefined) {
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }

            constructor = newConstructor;
          }
        }

        return constructor;
      },
      disallowProperty: function (obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };
    return api;
  }

  function _createElementDescriptor(def) {
    var key = _toPropertyKey(def.key);

    var descriptor;

    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "get") {
      descriptor = {
        get: def.value,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "set") {
      descriptor = {
        set: def.value,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "field") {
      descriptor = {
        configurable: true,
        writable: true,
        enumerable: true
      };
    }

    var element = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
      descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;
    return element;
  }

  function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  function _coalesceClassElements(elements) {
    var newElements = [];

    var isSameElement = function (other) {
      return other.kind === "method" && other.key === element.key && other.placement === element.placement;
    };

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var other;

      if (element.kind === "method" && (other = newElements.find(isSameElement))) {
        if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
          }

          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
            }

            other.decorators = element.decorators;
          }

          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc) {
    return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
  }

  function _optionalCallableProperty(obj, name) {
    var value = obj[name];

    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }

    return value;
  }

  function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    return fn;
  }

  function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }

  function _wrapRegExp(re, groups) {
    _wrapRegExp = function (re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = _wrapNativeSuper(RegExp);

    var _super = RegExp.prototype;

    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);

      _groups.set(_this, groups || _groups.get(re));

      return _this;
    }

    _inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function (str) {
      var result = _super.exec.call(this, str);

      if (result) result.groups = buildGroups(result, this);
      return result;
    };

    BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);

        return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) {
          return "$" + groups[name];
        }));
      } else if (typeof substitution === "function") {
        var _this = this;

        return _super[Symbol.replace].call(this, str, function () {
          var args = [];
          args.push.apply(args, arguments);

          if (typeof args[args.length - 1] !== "object") {
            args.push(buildGroups(args, _this));
          }

          return substitution.apply(this, args);
        });
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    };

    function buildGroups(result, re) {
      var g = _groups.get(re);

      return Object.keys(g).reduce(function (groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }

  function URDFColliderClone() {
    var _proto$clone;

    var proto = Object.getPrototypeOf(this);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = (_proto$clone = proto.clone).call.apply(_proto$clone, [this].concat(args));

    result.isURDFCollider = true;
    return result;
  }

  ;

  function makeURDFCollider(object) {
    object.isURDFCollider = true;
    object.clone = URDFColliderClone;
  }

  var URDFLink =
  /*#__PURE__*/
  function (_Object3D) {
    _inherits(URDFLink, _Object3D);

    function URDFLink() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, URDFLink);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(URDFLink)).call.apply(_getPrototypeOf2, [this].concat(args)));
      _this.isURDFLink = true;
      _this.type = 'URDFLink';
      _this.urdfNode = null;
      return _this;
    }

    _createClass(URDFLink, [{
      key: "show",
      value: function show() {
        this.visible = true;
      }
    }, {
      key: "hide",
      value: function hide() {
        this.visible = false;
      }
    }, {
      key: "delete",
      value: function _delete() {
        var _this2 = this;

        this.parent.remove(this);
        this.children.map(function (child) {
          _this2.remove(child);
        });
      }
    }, {
      key: "copy",
      value: function copy(source, recursive) {
        _get(_getPrototypeOf(URDFLink.prototype), "copy", this).call(this, source, recursive);

        this.urdfNode = source.urdfNode;
        return this;
      }
    }]);

    return URDFLink;
  }(THREE.Object3D);

  var URDFJoint =
  /*#__PURE__*/
  function (_Object3D2) {
    _inherits(URDFJoint, _Object3D2);

    _createClass(URDFJoint, [{
      key: "jointType",
      get: function get() {
        return this._jointType;
      },
      set: function set(v) {
        if (this.jointType === v) return;
        this._jointType = v;

        switch (v) {
          case 'fixed':
          case 'continuous':
          case 'revolute':
          case 'prismatic':
            this.jointValue = 0;
            break;

          case 'planar':
            this.jointValue = new Array(2).fill(0);
            break;

          case 'floating':
            this.jointValue = new Array(6).fill(0);
            break;
        }
      }
    }, {
      key: "angle",
      get: function get() {
        return this.jointValue;
      }
    }]);

    function URDFJoint() {
      var _getPrototypeOf3;

      var _this3;

      _classCallCheck(this, URDFJoint);

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(URDFJoint)).call.apply(_getPrototypeOf3, [this].concat(args)));
      _this3.isURDFJoint = true;
      _this3.type = 'URDFJoint';
      _this3.urdfNode = null;
      _this3.jointValue = null;
      _this3.jointType = 'fixed';
      _this3.axis = null;
      _this3.limit = {
        lower: 0,
        upper: 0
      };
      _this3.ignoreLimits = false;
      _this3.origPosition = null;
      _this3.origQuaternion = null;
      return _this3;
    }
    /* Overrides */


    _createClass(URDFJoint, [{
      key: "copy",
      value: function copy(source, recursive) {
        _get(_getPrototypeOf(URDFJoint.prototype), "copy", this).call(this, source, recursive);

        this.urdfNode = source.urdfNode;
        this.jointType = source.jointType;
        this.axis = source.axis ? source.axis.clone() : null;
        this.limit.lower = source.limit.lower;
        this.limit.upper = source.limit.upper;
        this.ignoreLimits = false;
        this.jointValue = Array.isArray(source.jointValue) ? _toConsumableArray(source.jointValue) : source.jointValue;
        this.origPosition = source.origPosition ? source.origPosition.clone() : null;
        this.origQuaternion = source.origQuaternion ? source.origQuaternion.clone() : null;
        return this;
      }
      /* Public Functions */

    }, {
      key: "setAngle",
      value: function setAngle() {
        return this.setOffset.apply(this, arguments);
      }
    }, {
      key: "setOffset",
      value: function setOffset() {
        for (var _len4 = arguments.length, values = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          values[_key4] = arguments[_key4];
        }

        values = values.map(function (v) {
          return parseFloat(v);
        });

        if (!this.origPosition || !this.origQuaternion) {
          this.origPosition = this.position.clone();
          this.origQuaternion = this.quaternion.clone();
        }

        switch (this.jointType) {
          case 'fixed':
            {
              break;
            }

          case 'continuous':
          case 'revolute':
            {
              var angle = values[0];
              if (angle == null) break;
              if (angle === this.jointValue) break;

              if (!this.ignoreLimits && this.jointType === 'revolute') {
                angle = Math.min(this.limit.upper, angle);
                angle = Math.max(this.limit.lower, angle);
              } // FromAxisAngle seems to rotate the opposite of the
              // expected angle for URDF, so negate it here


              var delta = new THREE.Quaternion().setFromAxisAngle(this.axis, angle);
              this.quaternion.multiplyQuaternions(this.origQuaternion, delta);
              this.jointValue = angle;
              this.matrixWorldNeedsUpdate = true;
              break;
            }

          case 'prismatic':
            {
              var _angle = values[0];
              if (_angle == null) break;
              if (_angle === this.jointValue) break;

              if (!this.ignoreLimits) {
                _angle = Math.min(this.limit.upper, _angle);
                _angle = Math.max(this.limit.lower, _angle);
              }

              this.position.copy(this.origPosition);
              this.position.addScaledVector(this.axis, _angle);
              this.jointValue = _angle;
              this.worldMatrixNeedsUpdate = true;
              break;
            }

          case 'floating':
          case 'planar':
            // TODO: Support these joint types
            console.warn("'".concat(this.jointType, "' joint not yet supported"));
        }

        return this.jointValue;
      }
    }]);

    return URDFJoint;
  }(THREE.Object3D);

  var URDFRobot =
  /*#__PURE__*/
  function (_URDFLink) {
    _inherits(URDFRobot, _URDFLink);

    function URDFRobot() {
      var _getPrototypeOf4;

      var _this4;

      _classCallCheck(this, URDFRobot);

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      _this4 = _possibleConstructorReturn(this, (_getPrototypeOf4 = _getPrototypeOf(URDFRobot)).call.apply(_getPrototypeOf4, [this].concat(args)));
      _this4.isURDFRobot = true;
      _this4.urdfNode = null;
      _this4.urdfRobotNode = null;
      _this4.robotName = null;
      _this4.links = null;
      _this4.joints = null;
      return _this4;
    }

    _createClass(URDFRobot, [{
      key: "copy",
      value: function copy(source, recursive) {
        var _this5 = this;

        _get(_getPrototypeOf(URDFRobot.prototype), "copy", this).call(this, source, recursive);

        this.urdfRobotNode = source.urdfRobotNode;
        this.robotName = source.robotName;
        this.links = {};
        this.joints = {};
        this.traverse(function (c) {
          if (c.isURDFJoint && c.name in source.joints) {
            _this5.joints[c.name] = c;
          }

          if (c.isURDFLink && c.name in source.links) {
            _this5.links[c.name] = c;
          }
        });
        return this;
      }
    }, {
      key: "setAngle",
      value: function setAngle(jointName) {
        var joint = this.joints[jointName];

        if (joint) {
          for (var _len6 = arguments.length, angle = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            angle[_key6 - 1] = arguments[_key6];
          }

          return joint.setAngle.apply(joint, angle);
        }

        return null;
      }
    }, {
      key: "setAngles",
      value: function setAngles(angles) {
        // TODO: How to handle other, multi-dimensional joint types?
        for (var name in angles) {
          this.setAngle(name, angles[name]);
        }
      }
    }]);

    return URDFRobot;
  }(URDFLink);

  /*
  Reference coordinate frames for THREE.js and ROS.
  Both coordinate systems are right handed so the URDF is instantiated without
  frame transforms. The resulting model can be rotated to rectify the proper up,
  right, and forward directions

  THREE.js
     Y
     |
     |
     .-----X
   ／
  Z

  ROS URDf
         Z
         |   X
         | ／
   Y-----.

  */

  var tempQuaternion = new THREE.Quaternion();
  var tempEuler = new THREE.Euler(); // take a vector "x y z" and process it into
  // an array [x, y, z]

  function processTuple(val) {
    if (!val) return [0, 0, 0];
    return val.trim().split(/\s+/g).map(function (num) {
      return parseFloat(num);
    });
  } // applies a rotation a threejs object in URDF order


  function applyRotation(obj, rpy) {
    var additive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // if additive is true the rotation is applied in
    // addition to the existing rotation
    if (!additive) obj.rotation.set(0, 0, 0);
    tempEuler.set(rpy[0], rpy[1], rpy[2], 'ZYX');
    tempQuaternion.setFromEuler(tempEuler);
    tempQuaternion.multiply(obj.quaternion);
    obj.quaternion.copy(tempQuaternion);
  }
  /* URDFLoader Class */
  // Loads and reads a URDF file into a THREEjs Object3D format


  var URDFLoader =
  /*#__PURE__*/
  function () {
    function URDFLoader(manager) {
      var allowMeshBVH = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _classCallCheck(this, URDFLoader);

      this.manager = manager || THREE.DefaultLoadingManager;
      this.allowMeshBVH = allowMeshBVH;
      this.retryMap = {};
    }
    /* Public API */
    // urdf:    The path to the URDF within the package OR absolute
    // onComplete:      Callback that is passed the model once loaded


    _createClass(URDFLoader, [{
      key: "load",
      value: function load(urdf, onComplete, onProgress, onError, options) {
        var _this = this;

        // Check if a full URI is specified before
        // prepending the package info
        var manager = this.manager;
        var workingPath = THREE.LoaderUtils.extractUrlBase(urdf);
        var urdfPath = this.manager.resolveURL(urdf);
        var errors = {};

        var managerOnErrorDefault = function managerOnErrorDefault() {};

        var managerOnProgressDefault = function managerOnProgressDefault() {};

        var managerOnLoadDefault = function managerOnLoadDefault() {};

        var model;

        if (manager.onError) {
          managerOnErrorDefault = manager.onProgress.bind(manager);
        }

        if (manager.onProgress) {
          managerOnProgressDefault = manager.onProgress.bind(manager);
        }

        if (manager.onLoad) {
          managerOnLoadDefault = manager.onLoad.bind(manager);
        }

        var that = this;

        manager.onError = function (url) {
          errors[url] = 'Error in loading resource';

          if (onError) {
            onError({
              url: url,
              retry: that.retryMap[url]
            });
          }

          managerOnErrorDefault(url);
        };

        manager.onProgress = function (url, itemsLoaded, itemsTotal) {
          if (onProgress) {
            onProgress(url, itemsLoaded, itemsTotal);
          }

          managerOnProgressDefault(url, itemsLoaded, itemsTotal);
        };

        manager.onLoad = function () {
          if (onComplete) {
            var partialErrors = Object.keys(errors).length === 0 ? undefined : errors;
            onComplete(model, partialErrors);
          }

          managerOnLoadDefault();
        };

        options = Object.assign({
          workingPath: workingPath
        }, options);
        manager.itemStart(urdfPath);
        fetch(urdfPath, options.fetchOptions).then(function (res) {
          return res.text();
        }).then(function (data) {
          model = _this.parse(data, options);
          window.model = model;
          manager.itemEnd(urdfPath);
        })["catch"](function (e) {
          console.error('URDFLoader: Error parsing file.', e);
          manager.itemError(urdfPath);
          manager.itemEnd(urdfPath);
        });
      }
    }, {
      key: "parse",
      value: function parse(content) {
        var _this2 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var packages = options.packages || '';
        var loadMeshCb = options.loadMeshCb || this.defaultMeshLoader.bind(this);
        var workingPath = options.workingPath || '';
        var parseVisual = 'parseVisual' in options ? options.parseVisual : true;
        var parseCollision = options.parseCollision || false;
        var manager = this.manager;
        var linkMap = {};
        var jointMap = {};
        var materialMap = {}; // Resolves the path of mesh files

        function resolvePath(path) {
          if (!/^package:\/\//.test(path)) {
            return workingPath ? workingPath + path : path;
          } // Remove "package://" keyword and split meshPath at the first slash


          var _path$replace$split = path.replace(/^package:\/\//, '').split(/\/(.+)/),
              _path$replace$split2 = _slicedToArray(_path$replace$split, 2),
              targetPkg = _path$replace$split2[0],
              relPath = _path$replace$split2[1];

          if (typeof packages === 'string') {
            // "pkg" is one single package
            if (packages.endsWith(targetPkg)) {
              // "pkg" is the target package
              return packages + '/' + relPath;
            } else {
              // Assume "pkg" is the target package's parent directory
              return packages + '/' + targetPkg + '/' + relPath;
            }
          } else if (_typeof(packages) === 'object') {
            // "pkg" is a map of packages
            if (targetPkg in packages) {
              return packages[targetPkg] + '/' + relPath;
            } else {
              console.error("URDFLoader : ".concat(targetPkg, " not found in provided package list."));
              return null;
            }
          }
        } // Process the URDF text format


        var processUrdf = function processUrdf(data) {
          var parser = new DOMParser();
          var urdf = parser.parseFromString(data, 'text/xml');

          var children = _toConsumableArray(urdf.children);

          var robotNode = children.filter(function (c) {
            return c.nodeName === 'robot';
          }).pop();
          return processRobot.call(_this2, robotNode);
        }; // Process the <robot> node


        function processRobot(robot) {
          var _this3 = this;

          var robotNodes = _toConsumableArray(robot.children);

          var links = robotNodes.filter(function (c) {
            return c.nodeName.toLowerCase() === 'link';
          });
          var joints = robotNodes.filter(function (c) {
            return c.nodeName.toLowerCase() === 'joint';
          });
          var materials = robotNodes.filter(function (c) {
            return c.nodeName.toLowerCase() === 'material';
          });
          var obj = new URDFRobot();
          obj.robotName = robot.getAttribute('name');
          obj.urdfRobotNode = robot; // Create the <material> map

          materials.forEach(function (m) {
            var name = m.getAttribute('name');
            materialMap[name] = processMaterial.call(_this3, m);
          }); // Create the <link> map

          links.forEach(function (l) {
            var name = l.getAttribute('name');
            var isRoot = robot.querySelector("child[link=\"".concat(name, "\"]")) === null;
            linkMap[name] = processLink.call(_this3, l, isRoot ? obj : null);
          }); // Create the <joint> map

          joints.forEach(function (j) {
            var name = j.getAttribute('name');
            jointMap[name] = processJoint.call(_this3, j);
          });
          obj.joints = jointMap;
          obj.links = linkMap;
          return obj;
        } // Process joint nodes and parent them


        function processJoint(joint) {
          var children = _toConsumableArray(joint.children);

          var jointType = joint.getAttribute('type');
          var obj = new URDFJoint();
          obj.urdfNode = joint;
          obj.name = joint.getAttribute('name');
          obj.jointType = jointType;
          var parent = null;
          var child = null;
          var xyz = [0, 0, 0];
          var rpy = [0, 0, 0]; // Extract the attributes

          children.forEach(function (n) {
            var type = n.nodeName.toLowerCase();

            if (type === 'origin') {
              xyz = processTuple(n.getAttribute('xyz'));
              rpy = processTuple(n.getAttribute('rpy'));
            } else if (type === 'child') {
              child = linkMap[n.getAttribute('link')];
            } else if (type === 'parent') {
              parent = linkMap[n.getAttribute('link')];
            } else if (type === 'limit') {
              obj.limit.lower = parseFloat(n.getAttribute('lower') || obj.limit.lower);
              obj.limit.upper = parseFloat(n.getAttribute('upper') || obj.limit.upper);
            }
          }); // Join the links

          parent.add(obj);
          obj.add(child);
          applyRotation(obj, rpy);
          obj.position.set(xyz[0], xyz[1], xyz[2]); // Set up the rotate function

          var axisNode = children.filter(function (n) {
            return n.nodeName.toLowerCase() === 'axis';
          })[0];

          if (axisNode) {
            var axisXYZ = axisNode.getAttribute('xyz').split(/\s+/g).map(function (num) {
              return parseFloat(num);
            });
            obj.axis = new THREE.Vector3(axisXYZ[0], axisXYZ[1], axisXYZ[2]);
            obj.axis.normalize();
          }

          return obj;
        } // Process the <link> nodes


        function processLink(link) {
          var _this4 = this;

          var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

          if (target === null) {
            target = new URDFLink();
          }

          var children = _toConsumableArray(link.children);

          target.name = link.getAttribute('name');
          target.urdfNode = link;

          if (parseVisual) {
            var visualNodes = children.filter(function (n) {
              return n.nodeName.toLowerCase() === 'visual';
            });
            visualNodes.forEach(function (vn) {
              return processLinkElement.call(_this4, vn, target, materialMap);
            });
          }

          if (parseCollision) {
            var collisionNodes = children.filter(function (n) {
              return n.nodeName.toLowerCase() === 'collision';
            });
            collisionNodes.forEach(function (vn) {
              return processLinkElement.call(_this4, vn, target);
            });
          }

          return target;
        }

        function processMaterial(node) {
          var _this5 = this;

          var matNodes = _toConsumableArray(node.children);

          var material = new THREE.MeshPhongMaterial();
          material.name = node.getAttribute('name') || '';
          matNodes.forEach(function (n) {
            var type = n.nodeName.toLowerCase();

            if (type === 'color') {
              var rgba = n.getAttribute('rgba').split(/\s/g).map(function (v) {
                return parseFloat(v);
              });
              material.color.setRGB(rgba[0], rgba[1], rgba[2]);
              material.opacity = rgba[3];
              material.transparent = rgba[3] < 1;
            } else if (type === 'texture') {
              var loader = new THREE.TextureLoader(manager);
              var filename = n.getAttribute('filename');
              var filePath = resolvePath(filename);

              var onError = function onError() {
                _this5.retryMap[filePath] = function () {
                  return loader.load(filePath, function () {
                    return null;
                  }, function () {
                    return null;
                  }, onError);
                };
              };

              material.map = loader.load(filePath, function () {
                return null;
              }, function () {
                return null;
              }, onError);
            }
          });
          return material;
        } // Process the visual and collision nodes into meshes


        function processLinkElement(vn, linkObj) {
          var _this6 = this;

          var materialMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          var isCollisionNode = vn.nodeName.toLowerCase() === 'collision';
          var xyz = [0, 0, 0];
          var rpy = [0, 0, 0];
          var scale = [1, 1, 1];

          var children = _toConsumableArray(vn.children);

          var material = null;
          var primitiveModel = null; // get the material first

          var materialNode = children.filter(function (n) {
            return n.nodeName.toLowerCase() === 'material';
          })[0];

          if (materialNode) {
            var name = materialNode.getAttribute('name');

            if (name && name in materialMap) {
              material = materialMap[name];
            } else {
              material = processMaterial.call(this, materialNode);
            }
          } else {
            material = new THREE.MeshPhongMaterial();
          }

          children.forEach(function (n) {
            var type = n.nodeName.toLowerCase();

            if (type === 'geometry') {
              var geoType = n.children[0].nodeName.toLowerCase();

              if (geoType === 'mesh') {
                var filename = n.children[0].getAttribute('filename');
                var filePath = resolvePath(filename); // file path is null if a package directory is not provided.

                if (filePath !== null) {
                  var scaleAttr = n.children[0].getAttribute('scale');
                  if (scaleAttr) scale = processTuple(scaleAttr);

                  var cb = function cb(obj, err) {
                    if (err) {
                      console.error('URDFLoader: Error loading mesh.', err);

                      _this6.retryMap[filePath] = function () {
                        return loadMeshCb(filePath, manager, cb);
                      };
                    } else if (obj) {
                      if (obj instanceof THREE.Mesh) {
                        obj.material = material;

                        if (_this6.allowMeshBVH) {
                          obj.raycast = threeMeshBvh.acceleratedRaycast;
                          obj.geometry.boundsTree = new threeMeshBvh.MeshBVH(obj.geometry);
                        }
                      }

                      linkObj.add(obj);
                      obj.position.set(xyz[0], xyz[1], xyz[2]);
                      obj.rotation.set(0, 0, 0); // multiply the existing scale by the scale components because
                      // the loaded model could have important scale values already applied
                      // to the root. Collada files, for example, can load in with a scale
                      // to convert the model units to meters.

                      obj.scale.x *= scale[0];
                      obj.scale.y *= scale[1];
                      obj.scale.z *= scale[2];
                      applyRotation(obj, rpy);

                      if (isCollisionNode) {
                        makeURDFCollider(obj);
                      }
                    }
                  };

                  loadMeshCb(filePath, manager, cb);
                }
              } else if (geoType === 'box') {
                primitiveModel = new THREE.Mesh();
                primitiveModel.geometry = new THREE.BoxBufferGeometry(1, 1, 1);
                primitiveModel.material = material;

                if (_this6.allowMeshBVH) {
                  primitiveModel.raycast = threeMeshBvh.acceleratedRaycast;
                  primitiveModel.geometry.boundsTree = new threeMeshBvh.MeshBVH(primitiveModel.geometry);
                }

                var size = processTuple(n.children[0].getAttribute('size'));
                linkObj.add(primitiveModel);
                primitiveModel.scale.set(size[0], size[1], size[2]);

                if (isCollisionNode) {
                  makeURDFCollider(primitiveModel);
                }
              } else if (geoType === 'sphere') {
                primitiveModel = new THREE.Mesh();
                primitiveModel.geometry = new THREE.SphereBufferGeometry(1, 30, 30);
                primitiveModel.material = material;

                if (_this6.allowMeshBVH) {
                  primitiveModel.raycast = threeMeshBvh.acceleratedRaycast;
                  primitiveModel.geometry.boundsTree = new threeMeshBvh.MeshBVH(primitiveModel.geometry);
                }

                var radius = parseFloat(n.children[0].getAttribute('radius')) || 0;
                primitiveModel.scale.set(radius, radius, radius);
                linkObj.add(primitiveModel);

                if (isCollisionNode) {
                  makeURDFCollider(primitiveModel);
                }
              } else if (geoType === 'cylinder') {
                primitiveModel = new THREE.Mesh();
                primitiveModel.geometry = new THREE.CylinderBufferGeometry(1, 1, 1, 30);
                primitiveModel.material = material;

                if (_this6.allowMeshBVH) {
                  primitiveModel.raycast = threeMeshBvh.acceleratedRaycast;
                  primitiveModel.geometry.boundsTree = new threeMeshBvh.MeshBVH(primitiveModel.geometry);
                }

                var _radius = parseFloat(n.children[0].getAttribute('radius')) || 0;

                var length = parseFloat(n.children[0].getAttribute('length')) || 0;
                primitiveModel.scale.set(_radius, length, _radius);
                primitiveModel.rotation.set(Math.PI / 2, 0, 0);
                linkObj.add(primitiveModel);

                if (isCollisionNode) {
                  makeURDFCollider(primitiveModel);
                }
              }
            } else if (type === 'origin') {
              xyz = processTuple(n.getAttribute('xyz'));
              rpy = processTuple(n.getAttribute('rpy'));
            }
          }); // apply the position and rotation to the primitive geometry after
          // the fact because it's guaranteed to have been scraped from the child
          // nodes by this point

          if (primitiveModel) {
            applyRotation(primitiveModel, rpy, true);
            primitiveModel.position.set(xyz[0], xyz[1], xyz[2]);
          }
        }

        return processUrdf(content);
      } // Default mesh loading function

    }, {
      key: "defaultMeshLoader",
      value: function defaultMeshLoader(path, manager, done) {
        if (/\.stl(?:\?|$)/i.test(path)) {
          var loader = new STLLoader_js.STLLoader(manager);
          loader.load(path, function (geom) {
            var mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial());
            done(mesh);
          });
        } else if (/\.dae(?:\?|$)/i.test(path)) {
          var _loader = new ColladaLoader_js.ColladaLoader(manager);

          _loader.load(path, function (dae) {
            return done(dae.scene);
          });
        } else {
          console.warn("URDFLoader: Could not load model at ".concat(path, ".\nNo loader available"));
        }
      }
    }]);

    return URDFLoader;
  }();
  ; // Add or modify URDFJoint to handle updates more dynamically

  URDFJoint.prototype.updateProperties = function (params) {
    if (params.origin) {
      var _this$origin;

      (_this$origin = this.origin).set.apply(_this$origin, _toConsumableArray(params.origin.xyz));

      var euler = _construct(THREE.Euler, _toConsumableArray(params.origin.rpy).concat(['XYZ']));

      this.origQuaternion.setFromEuler(euler);
    }

    if (params.axis) {
      var _this$axis;

      (_this$axis = this.axis).set.apply(_this$axis, _toConsumableArray(params.axis));
    }

    if (params.limit) {
      this.limit.lower = params.limit.lower;
      this.limit.upper = params.limit.upper;
    } // After updating properties, you might need to recalculate the joint's position in the world


    this.updateTransform();
  };

  URDFJoint.prototype.updateTransform = function () {
    var _this$position;

    // Apply new position and rotation
    (_this$position = this.position).set.apply(_this$position, _toConsumableArray(this.origin.toArray()));

    this.quaternion.copy(this.origQuaternion); // Ensure updates affect the visual representation

    this.updateMatrix();
    this.updateMatrixWorld(true); // If part of a larger kinematic chain, inform parent or children to update as well

    if (this.parent) {
      this.parent.updateMatrixWorld(true);
    }
  }; // Call this method after changing joint parameters


  function refreshScene() {
    if (viewer && viewer.robot) {
      Object.values(viewer.robot.joints).forEach(function (joint) {
        return joint.updateTransform();
      });
      viewer.updateScene(); // Assuming this triggers a re-render
    }
  } // Assuming URDFLoader, URDFRobot, and URDFJoint are already defined elsewhere in your script

  /* Add update joint functionality to URDFRobot */


  URDFRobot.prototype.updateJoint = function (jointName, params) {
    var joint = this.joints[jointName];

    if (joint) {
      // Update joint parameters like origin, axis, limits, etc.
      if (params.origin) {
        joint.origin = params.origin;
      }

      if (params.axis) {
        var _joint$axis;

        (_joint$axis = joint.axis).set.apply(_joint$axis, _toConsumableArray(params.axis));
      }

      if (params.limit) {
        joint.limit.lower = params.limit.lower;
        joint.limit.upper = params.limit.upper;
      } // Trigger a scene update or similar if needed


      this.refreshScene(); // This method would need to be implemented based on your application's structure
    }
  };
  /* Method to refresh the visual scene, to be defined based on how you're managing your THREE.js scene */


  URDFRobot.prototype.refreshScene = function () {
    // Implementation depends on how the scene is managed, but you would typically mark the scene or object for update
    // For example:
    if (this.mesh) {
      this.mesh.geometry.computeBoundingSphere();
      this.mesh.geometry.computeVertexNormals();
    } // You might need to re-render the scene


    render(); // This function would need to be defined in your global scope or passed in
  }; // Extend URDFLoader to handle scene updates


  URDFLoader.prototype.applyUpdates = function () {
    // This could be a method to apply pending updates or simply refresh parts of the model
    if (window.model) {
      window.model.refreshScene();
    }
  };

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // Loads and displays a 3D view of a URDF-formatted robot
  // Events
  // urdf-change: Fires when the URDF has finished loading and getting processed
  // urdf-processed: Fires when the URDF has finished loading and getting processed
  // geometry-loaded: Fires when all the geometry has been fully loaded
  // ignore-limits-change: Fires when the 'ignore-limits' attribute changes
  // angle-change: Fires when an angle changes

  var URDFViewer =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(URDFViewer, _HTMLElement);

    _createClass(URDFViewer, [{
      key: "package",
      get: function get() {
        return this.getAttribute('package') || '';
      },
      set: function set(val) {
        this.setAttribute('package', val);
      }
    }, {
      key: "urdf",
      get: function get() {
        return this.getAttribute('urdf') || '';
      },
      set: function set(val) {
        this.setAttribute('urdf', val);
      }
    }, {
      key: "ignoreLimits",
      get: function get() {
        return this.hasAttribute('ignore-limits') || false;
      },
      set: function set(val) {
        val ? this.setAttribute('ignore-limits', val) : this.removeAttribute('ignore-limits');
      }
    }, {
      key: "up",
      get: function get() {
        return this.getAttribute('up') || '+Z';
      },
      set: function set(val) {
        this.setAttribute('up', val);
      }
    }, {
      key: "displayShadow",
      get: function get() {
        return this.hasAttribute('display-shadow') || false;
      },
      set: function set(val) {
        val ? this.setAttribute('display-shadow', '') : this.removeAttribute('display-shadow');
      }
    }, {
      key: "ambientColor",
      get: function get() {
        return this.getAttribute('ambient-color') || '#263238';
      },
      set: function set(val) {
        val ? this.setAttribute('ambient-color', val) : this.removeAttribute('ambient-color');
      }
    }, {
      key: "autoRedraw",
      get: function get() {
        return this.hasAttribute('auto-redraw') || false;
      },
      set: function set(val) {
        val ? this.setAttribute('auto-redraw', true) : this.removeAttribute('auto-redraw');
      }
    }, {
      key: "noAutoRecenter",
      get: function get() {
        return this.hasAttribute('no-auto-recenter') || false;
      },
      set: function set(val) {
        val ? this.setAttribute('no-auto-recenter', true) : this.removeAttribute('no-auto-recenter');
      }
    }, {
      key: "angles",
      get: function get() {
        var angles = {};

        if (this.robot) {
          for (var name in this.robot.joints) {
            angles[name] = this.robot.joints[name].angle;
          }
        }

        return angles;
      },
      set: function set(val) {
        this._setAngles(val);
      }
      /* Lifecycle Functions */

    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['package', 'urdf', 'up', 'display-shadow', 'ambient-color', 'ignore-limits'];
      }
    }]);

    function URDFViewer() {
      var _this;

      _classCallCheck(this, URDFViewer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(URDFViewer).call(this));
      _this._requestId = 0;
      _this._dirty = false;
      _this._loadScheduled = false;
      _this.robot = null;
      _this.loadMeshFunc = null;
      _this.urlModifierFunc = null; // Scene setup

      var scene = new THREE.Scene();
      var ambientLight = new THREE.HemisphereLight(_this.ambientColor, '#000');
      ambientLight.groundColor.lerp(ambientLight.color, 0.5);
      ambientLight.intensity = 0.5;
      ambientLight.position.set(0, 1, 0);
      scene.add(ambientLight); // Light setup

      var dirLight = new THREE.DirectionalLight(0xffffff);
      dirLight.position.set(4, 10, 1);
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;
      dirLight.castShadow = true;
      scene.add(dirLight);
      scene.add(dirLight.target); // Renderer setup

      var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setClearColor(0xffffff);
      renderer.setClearAlpha(0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.gammaOutput = true; // Camera setup

      var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = -10; // World setup

      var world = new THREE.Object3D();
      scene.add(world);
      var plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(40, 40), new THREE.ShadowMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      }));
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -0.5;
      plane.receiveShadow = true;
      plane.scale.set(10, 10, 10);
      scene.add(plane); // Controls setup

      var controls = new OrbitControls.OrbitControls(camera, renderer.domElement);
      controls.rotateSpeed = 2.0;
      controls.zoomSpeed = 5;
      controls.panSpeed = 2;
      controls.enableZoom = true;
      controls.enableDamping = false;
      controls.maxDistance = 50;
      controls.minDistance = 0.25;
      controls.addEventListener('change', function () {
        return _this.recenter();
      });
      _this.scene = scene;
      _this.world = world;
      _this.renderer = renderer;
      _this.camera = camera;
      _this.controls = controls;
      _this.plane = plane;
      _this.directionalLight = dirLight;
      _this.ambientLight = ambientLight;

      _this._setUp(_this.up);

      var _renderLoop = function _renderLoop() {
        if (_this.parentNode) {
          _this.updateSize();

          if (_this._dirty || _this.autoRedraw) {
            if (!_this.noAutoRecenter) {
              _this._updateEnvironment();
            }

            _this.renderer.render(scene, camera);

            _this._dirty = false;
          } // update controls after the environment in
          // case the controls are retargeted


          _this.controls.update();
        }

        _this._renderLoopId = requestAnimationFrame(_renderLoop);
      };

      _renderLoop();

      return _this;
    }

    _createClass(URDFViewer, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        // Add our initialize styles for the element if they haven't
        // been added yet
        if (!this.constructor._styletag) {
          var styletag = document.createElement('style');
          styletag.innerHTML = "\n                ".concat(this.tagName, " { display: block; }\n                ").concat(this.tagName, " canvas {\n                    width: 100%;\n                    height: 100%;\n                }\n            ");
          document.head.appendChild(styletag);
          this.constructor._styletag = styletag;
        } // add the renderer


        if (this.childElementCount === 0) {
          this.appendChild(this.renderer.domElement);
        }

        this.updateSize();
        requestAnimationFrame(function () {
          return _this2.updateSize();
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        cancelAnimationFrame(this._renderLoopId);
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldval, newval) {
        this.recenter();

        switch (attr) {
          case 'package':
          case 'urdf':
            {
              this._scheduleLoad();

              break;
            }

          case 'up':
            {
              this._setUp(this.up);

              break;
            }

          case 'ambient-color':
            {
              this.ambientLight.color.set(this.ambientColor);
              this.ambientLight.groundColor.set('#000').lerp(this.ambientLight.color, 0.5);
              break;
            }

          case 'ignore-limits':
            {
              this._setIgnoreLimits(this.ignoreLimits, true);

              break;
            }
        }
      }
      /* Public API */

    }, {
      key: "updateSize",
      value: function updateSize() {
        var r = this.renderer;
        var w = this.clientWidth;
        var h = this.clientHeight;
        var currsize = new THREE.Vector2();
        r.getSize(currsize);

        if (currsize.width !== w || currsize.height !== h) {
          this.recenter();
        }

        r.setPixelRatio(window.devicePixelRatio);
        r.setSize(w, h, false);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
      }
    }, {
      key: "redraw",
      value: function redraw() {
        this._dirty = true;
      }
    }, {
      key: "recenter",
      value: function recenter() {
        this._updateEnvironment();

        this.redraw();
      } // Set the joint with jointName to
      // angle in degrees

    }, {
      key: "setAngle",
      value: function setAngle(jointName, angle) {
        if (!this.robot) return;
        if (!this.robot.joints[jointName]) return;
        var origAngle = this.robot.joints[jointName].angle;
        var newAngle = this.robot.setAngle(jointName, angle);

        if (origAngle !== newAngle) {
          this.redraw();
        }

        this.dispatchEvent(new CustomEvent('angle-change', {
          bubbles: true,
          cancelable: true,
          detail: jointName
        }));
      }
    }, {
      key: "setAngles",
      value: function setAngles(angles) {
        for (var name in angles) {
          this.setAngle(name, angles[name]);
        }
      }
      /* Private Functions */
      // Updates the position of the plane to be at the
      // lowest point below the robot and focuses the
      // camera on the center of the scene

    }, {
      key: "_updateEnvironment",
      value: function _updateEnvironment() {
        if (!this.robot) return;
        this.world.updateMatrixWorld();
        var bbox = new THREE.Box3();
        var temp = new THREE.Box3();
        this.robot.traverse(function (c) {
          var geometry = c.geometry;

          if (geometry) {
            if (geometry.boundingBox === null) {
              geometry.computeBoundingBox();
            }

            temp.copy(geometry.boundingBox);
            temp.applyMatrix4(c.matrixWorld);
            bbox.union(temp);
          }
        });
        var center = bbox.getCenter(new THREE.Vector3());
        this.controls.target.y = center.y;
        this.plane.position.y = bbox.min.y - 1e-3;
        var dirLight = this.directionalLight;
        dirLight.castShadow = this.displayShadow;

        if (this.displayShadow) {
          // Update the shadow camera rendering bounds to encapsulate the
          // model. We use the bounding sphere of the bounding box for
          // simplicity -- this could be a tighter fit.
          var sphere = bbox.getBoundingSphere(new THREE.Sphere());
          var minmax = sphere.radius;
          var cam = dirLight.shadow.camera;
          cam.left = cam.bottom = -minmax;
          cam.right = cam.top = minmax; // Update the camera to focus on the center of the model so the
          // shadow can encapsulate it

          var offset = dirLight.position.clone().sub(dirLight.target.position);
          dirLight.target.position.copy(center);
          dirLight.position.copy(center).add(offset);
          cam.updateProjectionMatrix();
        }
      }
    }, {
      key: "_scheduleLoad",
      value: function _scheduleLoad() {
        var _this3 = this;

        // if our current model is already what's being requested
        // or has been loaded then early out
        if (this._prevload === "".concat(this["package"], "|").concat(this.urdf)) return;
        this._prevload = "".concat(this["package"], "|").concat(this.urdf); // if we're already waiting on a load then early out

        if (this._loadScheduled) return;
        this._loadScheduled = true;

        if (this.robot) {
          this.robot.traverse(function (c) {
            return c.dispose && c.dispose();
          });
          this.robot.parent.remove(this.robot);
          this.robot = null;
        }

        requestAnimationFrame(function () {
          _this3._loadUrdf(_this3["package"], _this3.urdf);

          _this3._loadScheduled = false;
        });
      } // Watch the package and urdf field and load the robot model.
      // This should _only_ be called from _scheduleLoad because that
      // ensures the that current robot has been removed

    }, {
      key: "_loadUrdf",
      value: function _loadUrdf(pkg, urdf) {
        var _this4 = this;

        this.dispatchEvent(new CustomEvent('urdf-change', {
          bubbles: true,
          cancelable: true,
          composed: true
        }));

        if (urdf) {
          // Keep track of this request and make
          // sure it doesn't get overwritten by
          // a subsequent one
          this._requestId++;
          var requestId = this._requestId;

          var updateMaterials = function updateMaterials(mesh) {
            mesh.traverse(function (c) {
              if (c.isMesh) {
                c.castShadow = true;
                c.receiveShadow = true;

                if (c.material) {
                  var mats = (Array.isArray(c.material) ? c.material : [c.material]).map(function (m) {
                    if (m instanceof THREE.MeshBasicMaterial) {
                      m = new THREE.MeshPhongMaterial();
                    }

                    if (m.map) {
                      m.map.encoding = THREE.GammaEncoding;
                    }

                    return m;
                  });
                  c.material = mats.length === 1 ? mats[0] : mats;
                }
              }
            });
          };

          if (pkg.includes(':') && pkg.split(':')[1].substring(0, 2) !== '//') {
            // E.g. pkg = "pkg_name: path/to/pkg_name, pk2: path2/to/pk2"}
            // Convert pkg(s) into a map. E.g.
            // { "pkg_name": "path/to/pkg_name",
            //   "pk2":      "path2/to/pk2"      }
            pkg = pkg.split(',').reduce(function (map, value) {
              var split = value.split(/:/).filter(function (x) {
                return !!x;
              });
              var pkgName = split.shift().trim();
              var pkgPath = split.join(':').trim();
              map[pkgName] = pkgPath;
              return map;
            }, {});
          }

          var robot = null;
          var manager = new THREE.LoadingManager();

          manager.onLoad = function () {
            // If another request has come in to load a new
            // robot, then ignore this one
            if (_this4._requestId !== requestId) {
              robot.traverse(function (c) {
                return c.dispose && c.dispose();
              });
              return;
            }

            _this4.robot = robot;

            _this4.world.add(robot);

            updateMaterials(robot);

            _this4._setIgnoreLimits(_this4.ignoreLimits);

            _this4.dispatchEvent(new CustomEvent('urdf-processed', {
              bubbles: true,
              cancelable: true,
              composed: true
            }));

            _this4.dispatchEvent(new CustomEvent('geometry-loaded', {
              bubbles: true,
              cancelable: true,
              composed: true
            }));

            _this4.recenter();
          };

          if (this.urlModifierFunc) {
            manager.setURLModifier(this.urlModifierFunc);
          }

          new URDFLoader(manager).load(urdf, // onComplete
          function (model) {
            robot = model;
          }, // onProgress
          function (url, loaded, total) {
            console.log("".concat(url, "; ").concat(loaded, "/").concat(total));
          }, // onError
          function (error) {
            console.log(error);
          }, // options
          {
            packages: pkg,
            loadMeshCb: this.loadMeshFunc,
            fetchOptions: {
              mode: 'cors',
              credentials: 'same-origin'
            }
          });
        }
      } // Watch the coordinate frame and update the
      // rotation of the scene to match

    }, {
      key: "_setUp",
      value: function _setUp(up) {
        if (!up) up = '+Z';
        up = up.toUpperCase();
        var sign = up.replace(/[^-+]/g, '')[0] || '+';
        var axis = up.replace(/[^XYZ]/gi, '')[0] || 'Z';
        var PI = Math.PI;
        var HALFPI = PI / 2;
        if (axis === 'X') this.world.rotation.set(0, 0, sign === '+' ? HALFPI : -HALFPI);
        if (axis === 'Z') this.world.rotation.set(sign === '+' ? -HALFPI : HALFPI, 0, 0);
        if (axis === 'Y') this.world.rotation.set(sign === '+' ? 0 : PI, 0, 0);
      } // Updates the current robot's angles to ignore
      // joint limits or not

    }, {
      key: "_setIgnoreLimits",
      value: function _setIgnoreLimits(ignore) {
        var dispatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (this.robot) {
          Object.values(this.robot.joints).forEach(function (joint) {
            joint.ignoreLimits = ignore;
            joint.setAngle(joint.angle);
          });
        }

        if (dispatch) {
          this.dispatchEvent(new CustomEvent('ignore-limits-change', {
            bubbles: true,
            cancelable: true,
            composed: true
          }));
        }
      }
    }]);

    return URDFViewer;
  }(_wrapNativeSuper(HTMLElement));
  ;

  return URDFViewer;

}));
//# sourceMappingURL=urdf-viewer-element.js.map
