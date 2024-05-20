(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three'), require('three/examples/jsm/controls/OrbitControls.js'), require('three/examples/jsm/loaders/STLLoader.js'), require('three/examples/jsm/loaders/ColladaLoader.js')) :
  typeof define === 'function' && define.amd ? define(['three', 'three/examples/jsm/controls/OrbitControls.js', 'three/examples/jsm/loaders/STLLoader.js', 'three/examples/jsm/loaders/ColladaLoader.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.URDFViewer = factory(global.THREE, global.THREE, global.THREE, global.THREE));
})(this, (function (THREE, OrbitControls_js, STLLoader_js, ColladaLoader_js) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

  function _AsyncGenerator(e) {
    var r, t;
    function resume(r, t) {
      try {
        var n = e[r](t),
          o = n.value,
          u = o instanceof _OverloadYield;
        Promise.resolve(u ? o.v : o).then(function (t) {
          if (u) {
            var i = "return" === r ? "return" : "next";
            if (!o.k || t.done) return resume(i, t);
            t = e[i](t).value;
          }
          settle(n.done ? "return" : "normal", t);
        }, function (e) {
          resume("throw", e);
        });
      } catch (e) {
        settle("throw", e);
      }
    }
    function settle(e, n) {
      switch (e) {
        case "return":
          r.resolve({
            value: n,
            done: !0
          });
          break;
        case "throw":
          r.reject(n);
          break;
        default:
          r.resolve({
            value: n,
            done: !1
          });
      }
      (r = r.next) ? resume(r.key, r.arg) : t = null;
    }
    this._invoke = function (e, n) {
      return new Promise(function (o, u) {
        var i = {
          key: e,
          arg: n,
          resolve: o,
          reject: u,
          next: null
        };
        t ? t = t.next = i : (r = t = i, resume(e, n));
      });
    }, "function" != typeof e.return && (this.return = void 0);
  }
  _AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () {
    return this;
  }, _AsyncGenerator.prototype.next = function (e) {
    return this._invoke("next", e);
  }, _AsyncGenerator.prototype.throw = function (e) {
    return this._invoke("throw", e);
  }, _AsyncGenerator.prototype.return = function (e) {
    return this._invoke("return", e);
  };
  function _OverloadYield(t, e) {
    this.v = t, this.k = e;
  }
  function old_createMetadataMethodsForProperty(e, t, a, r) {
    return {
      getMetadata: function (o) {
        old_assertNotFinished(r, "getMetadata"), old_assertMetadataKey(o);
        var i = e[o];
        if (void 0 !== i) if (1 === t) {
          var n = i.public;
          if (void 0 !== n) return n[a];
        } else if (2 === t) {
          var l = i.private;
          if (void 0 !== l) return l.get(a);
        } else if (Object.hasOwnProperty.call(i, "constructor")) return i.constructor;
      },
      setMetadata: function (o, i) {
        old_assertNotFinished(r, "setMetadata"), old_assertMetadataKey(o);
        var n = e[o];
        if (void 0 === n && (n = e[o] = {}), 1 === t) {
          var l = n.public;
          void 0 === l && (l = n.public = {}), l[a] = i;
        } else if (2 === t) {
          var s = n.priv;
          void 0 === s && (s = n.private = new Map()), s.set(a, i);
        } else n.constructor = i;
      }
    };
  }
  function old_convertMetadataMapToFinal(e, t) {
    var a = e[Symbol.metadata || Symbol.for("Symbol.metadata")],
      r = Object.getOwnPropertySymbols(t);
    if (0 !== r.length) {
      for (var o = 0; o < r.length; o++) {
        var i = r[o],
          n = t[i],
          l = a ? a[i] : null,
          s = n.public,
          c = l ? l.public : null;
        s && c && Object.setPrototypeOf(s, c);
        var d = n.private;
        if (d) {
          var u = Array.from(d.values()),
            f = l ? l.private : null;
          f && (u = u.concat(f)), n.private = u;
        }
        l && Object.setPrototypeOf(n, l);
      }
      a && Object.setPrototypeOf(t, a), e[Symbol.metadata || Symbol.for("Symbol.metadata")] = t;
    }
  }
  function old_createAddInitializerMethod(e, t) {
    return function (a) {
      old_assertNotFinished(t, "addInitializer"), old_assertCallable(a, "An initializer"), e.push(a);
    };
  }
  function old_memberDec(e, t, a, r, o, i, n, l, s) {
    var c;
    switch (i) {
      case 1:
        c = "accessor";
        break;
      case 2:
        c = "method";
        break;
      case 3:
        c = "getter";
        break;
      case 4:
        c = "setter";
        break;
      default:
        c = "field";
    }
    var d,
      u,
      f = {
        kind: c,
        name: l ? "#" + t : _toPropertyKey(t),
        isStatic: n,
        isPrivate: l
      },
      p = {
        v: !1
      };
    if (0 !== i && (f.addInitializer = old_createAddInitializerMethod(o, p)), l) {
      d = 2, u = Symbol(t);
      var v = {};
      0 === i ? (v.get = a.get, v.set = a.set) : 2 === i ? v.get = function () {
        return a.value;
      } : (1 !== i && 3 !== i || (v.get = function () {
        return a.get.call(this);
      }), 1 !== i && 4 !== i || (v.set = function (e) {
        a.set.call(this, e);
      })), f.access = v;
    } else d = 1, u = t;
    try {
      return e(s, Object.assign(f, old_createMetadataMethodsForProperty(r, d, u, p)));
    } finally {
      p.v = !0;
    }
  }
  function old_assertNotFinished(e, t) {
    if (e.v) throw Error("attempted to call " + t + " after decoration was finished");
  }
  function old_assertMetadataKey(e) {
    if ("symbol" != typeof e) throw new TypeError("Metadata keys must be symbols, received: " + e);
  }
  function old_assertCallable(e, t) {
    if ("function" != typeof e) throw new TypeError(t + " must be a function");
  }
  function old_assertValidReturnValue(e, t) {
    var a = typeof t;
    if (1 === e) {
      if ("object" !== a || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
      void 0 !== t.get && old_assertCallable(t.get, "accessor.get"), void 0 !== t.set && old_assertCallable(t.set, "accessor.set"), void 0 !== t.init && old_assertCallable(t.init, "accessor.init"), void 0 !== t.initializer && old_assertCallable(t.initializer, "accessor.initializer");
    } else if ("function" !== a) throw new TypeError((0 === e ? "field" : 10 === e ? "class" : "method") + " decorators must return a function or void 0");
  }
  function old_getInit(e) {
    var t;
    return null == (t = e.init) && (t = e.initializer) && void 0 !== console && console.warn(".initializer has been renamed to .init as of March 2022"), t;
  }
  function old_applyMemberDec(e, t, a, r, o, i, n, l, s) {
    var c,
      d,
      u,
      f,
      p,
      v,
      y,
      h = a[0];
    if (n ? (0 === o || 1 === o ? (c = {
      get: a[3],
      set: a[4]
    }, u = "get") : 3 === o ? (c = {
      get: a[3]
    }, u = "get") : 4 === o ? (c = {
      set: a[3]
    }, u = "set") : c = {
      value: a[3]
    }, 0 !== o && (1 === o && _setFunctionName(a[4], "#" + r, "set"), _setFunctionName(a[3], "#" + r, u))) : 0 !== o && (c = Object.getOwnPropertyDescriptor(t, r)), 1 === o ? f = {
      get: c.get,
      set: c.set
    } : 2 === o ? f = c.value : 3 === o ? f = c.get : 4 === o && (f = c.set), "function" == typeof h) void 0 !== (p = old_memberDec(h, r, c, l, s, o, i, n, f)) && (old_assertValidReturnValue(o, p), 0 === o ? d = p : 1 === o ? (d = old_getInit(p), v = p.get || f.get, y = p.set || f.set, f = {
      get: v,
      set: y
    }) : f = p);else for (var m = h.length - 1; m >= 0; m--) {
      var b;
      void 0 !== (p = old_memberDec(h[m], r, c, l, s, o, i, n, f)) && (old_assertValidReturnValue(o, p), 0 === o ? b = p : 1 === o ? (b = old_getInit(p), v = p.get || f.get, y = p.set || f.set, f = {
        get: v,
        set: y
      }) : f = p, void 0 !== b && (void 0 === d ? d = b : "function" == typeof d ? d = [d, b] : d.push(b)));
    }
    if (0 === o || 1 === o) {
      if (void 0 === d) d = function (e, t) {
        return t;
      };else if ("function" != typeof d) {
        var g = d;
        d = function (e, t) {
          for (var a = t, r = 0; r < g.length; r++) a = g[r].call(e, a);
          return a;
        };
      } else {
        var _ = d;
        d = function (e, t) {
          return _.call(e, t);
        };
      }
      e.push(d);
    }
    0 !== o && (1 === o ? (c.get = f.get, c.set = f.set) : 2 === o ? c.value = f : 3 === o ? c.get = f : 4 === o && (c.set = f), n ? 1 === o ? (e.push(function (e, t) {
      return f.get.call(e, t);
    }), e.push(function (e, t) {
      return f.set.call(e, t);
    })) : 2 === o ? e.push(f) : e.push(function (e, t) {
      return f.call(e, t);
    }) : Object.defineProperty(t, r, c));
  }
  function old_applyMemberDecs(e, t, a, r, o) {
    for (var i, n, l = new Map(), s = new Map(), c = 0; c < o.length; c++) {
      var d = o[c];
      if (Array.isArray(d)) {
        var u,
          f,
          p,
          v = d[1],
          y = d[2],
          h = d.length > 3,
          m = v >= 5;
        if (m ? (u = t, f = r, 0 != (v -= 5) && (p = n = n || [])) : (u = t.prototype, f = a, 0 !== v && (p = i = i || [])), 0 !== v && !h) {
          var b = m ? s : l,
            g = b.get(y) || 0;
          if (!0 === g || 3 === g && 4 !== v || 4 === g && 3 !== v) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + y);
          !g && v > 2 ? b.set(y, v) : b.set(y, !0);
        }
        old_applyMemberDec(e, u, d, y, v, m, h, f, p);
      }
    }
    old_pushInitializers(e, i), old_pushInitializers(e, n);
  }
  function old_pushInitializers(e, t) {
    t && e.push(function (e) {
      for (var a = 0; a < t.length; a++) t[a].call(e);
      return e;
    });
  }
  function old_applyClassDecs(e, t, a, r) {
    if (r.length > 0) {
      for (var o = [], i = t, n = t.name, l = r.length - 1; l >= 0; l--) {
        var s = {
          v: !1
        };
        try {
          var c = Object.assign({
              kind: "class",
              name: n,
              addInitializer: old_createAddInitializerMethod(o, s)
            }, old_createMetadataMethodsForProperty(a, 0, n, s)),
            d = r[l](i, c);
        } finally {
          s.v = !0;
        }
        void 0 !== d && (old_assertValidReturnValue(10, d), i = d);
      }
      e.push(i, function () {
        for (var e = 0; e < o.length; e++) o[e].call(i);
      });
    }
  }
  function _applyDecs(e, t, a) {
    var r = [],
      o = {},
      i = {};
    return old_applyMemberDecs(r, e, i, o, t), old_convertMetadataMapToFinal(e.prototype, i), old_applyClassDecs(r, e, o, a), old_convertMetadataMapToFinal(e, o), r;
  }
  function applyDecs2203Factory() {
    function createAddInitializerMethod(e, t) {
      return function (r) {
        !function (e, t) {
          if (e.v) throw Error("attempted to call addInitializer after decoration was finished");
        }(t), assertCallable(r, "An initializer"), e.push(r);
      };
    }
    function memberDec(e, t, r, a, n, i, s, o) {
      var c;
      switch (n) {
        case 1:
          c = "accessor";
          break;
        case 2:
          c = "method";
          break;
        case 3:
          c = "getter";
          break;
        case 4:
          c = "setter";
          break;
        default:
          c = "field";
      }
      var l,
        u,
        f = {
          kind: c,
          name: s ? "#" + t : t,
          static: i,
          private: s
        },
        p = {
          v: !1
        };
      0 !== n && (f.addInitializer = createAddInitializerMethod(a, p)), 0 === n ? s ? (l = r.get, u = r.set) : (l = function () {
        return this[t];
      }, u = function (e) {
        this[t] = e;
      }) : 2 === n ? l = function () {
        return r.value;
      } : (1 !== n && 3 !== n || (l = function () {
        return r.get.call(this);
      }), 1 !== n && 4 !== n || (u = function (e) {
        r.set.call(this, e);
      })), f.access = l && u ? {
        get: l,
        set: u
      } : l ? {
        get: l
      } : {
        set: u
      };
      try {
        return e(o, f);
      } finally {
        p.v = !0;
      }
    }
    function assertCallable(e, t) {
      if ("function" != typeof e) throw new TypeError(t + " must be a function");
    }
    function assertValidReturnValue(e, t) {
      var r = typeof t;
      if (1 === e) {
        if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
        void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init");
      } else if ("function" !== r) throw new TypeError((0 === e ? "field" : 10 === e ? "class" : "method") + " decorators must return a function or void 0");
    }
    function applyMemberDec(e, t, r, a, n, i, s, o) {
      var c,
        l,
        u,
        f,
        p,
        d,
        h = r[0];
      if (s ? c = 0 === n || 1 === n ? {
        get: r[3],
        set: r[4]
      } : 3 === n ? {
        get: r[3]
      } : 4 === n ? {
        set: r[3]
      } : {
        value: r[3]
      } : 0 !== n && (c = Object.getOwnPropertyDescriptor(t, a)), 1 === n ? u = {
        get: c.get,
        set: c.set
      } : 2 === n ? u = c.value : 3 === n ? u = c.get : 4 === n && (u = c.set), "function" == typeof h) void 0 !== (f = memberDec(h, a, c, o, n, i, s, u)) && (assertValidReturnValue(n, f), 0 === n ? l = f : 1 === n ? (l = f.init, p = f.get || u.get, d = f.set || u.set, u = {
        get: p,
        set: d
      }) : u = f);else for (var v = h.length - 1; v >= 0; v--) {
        var g;
        void 0 !== (f = memberDec(h[v], a, c, o, n, i, s, u)) && (assertValidReturnValue(n, f), 0 === n ? g = f : 1 === n ? (g = f.init, p = f.get || u.get, d = f.set || u.set, u = {
          get: p,
          set: d
        }) : u = f, void 0 !== g && (void 0 === l ? l = g : "function" == typeof l ? l = [l, g] : l.push(g)));
      }
      if (0 === n || 1 === n) {
        if (void 0 === l) l = function (e, t) {
          return t;
        };else if ("function" != typeof l) {
          var y = l;
          l = function (e, t) {
            for (var r = t, a = 0; a < y.length; a++) r = y[a].call(e, r);
            return r;
          };
        } else {
          var m = l;
          l = function (e, t) {
            return m.call(e, t);
          };
        }
        e.push(l);
      }
      0 !== n && (1 === n ? (c.get = u.get, c.set = u.set) : 2 === n ? c.value = u : 3 === n ? c.get = u : 4 === n && (c.set = u), s ? 1 === n ? (e.push(function (e, t) {
        return u.get.call(e, t);
      }), e.push(function (e, t) {
        return u.set.call(e, t);
      })) : 2 === n ? e.push(u) : e.push(function (e, t) {
        return u.call(e, t);
      }) : Object.defineProperty(t, a, c));
    }
    function pushInitializers(e, t) {
      t && e.push(function (e) {
        for (var r = 0; r < t.length; r++) t[r].call(e);
        return e;
      });
    }
    return function (e, t, r) {
      var a = [];
      return function (e, t, r) {
        for (var a, n, i = new Map(), s = new Map(), o = 0; o < r.length; o++) {
          var c = r[o];
          if (Array.isArray(c)) {
            var l,
              u,
              f = c[1],
              p = c[2],
              d = c.length > 3,
              h = f >= 5;
            if (h ? (l = t, 0 != (f -= 5) && (u = n = n || [])) : (l = t.prototype, 0 !== f && (u = a = a || [])), 0 !== f && !d) {
              var v = h ? s : i,
                g = v.get(p) || 0;
              if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p);
              !g && f > 2 ? v.set(p, f) : v.set(p, !0);
            }
            applyMemberDec(e, l, c, p, f, h, d, u);
          }
        }
        pushInitializers(e, a), pushInitializers(e, n);
      }(a, e, t), function (e, t, r) {
        if (r.length > 0) {
          for (var a = [], n = t, i = t.name, s = r.length - 1; s >= 0; s--) {
            var o = {
              v: !1
            };
            try {
              var c = r[s](n, {
                kind: "class",
                name: i,
                addInitializer: createAddInitializerMethod(a, o)
              });
            } finally {
              o.v = !0;
            }
            void 0 !== c && (assertValidReturnValue(10, c), n = c);
          }
          e.push(n, function () {
            for (var e = 0; e < a.length; e++) a[e].call(n);
          });
        }
      }(a, e, r), a;
    };
  }
  var applyDecs2203Impl;
  function _applyDecs2203(e, t, r) {
    return (applyDecs2203Impl = applyDecs2203Impl || applyDecs2203Factory())(e, t, r);
  }
  function applyDecs2203RFactory() {
    function createAddInitializerMethod(e, t) {
      return function (r) {
        !function (e, t) {
          if (e.v) throw Error("attempted to call addInitializer after decoration was finished");
        }(t), assertCallable(r, "An initializer"), e.push(r);
      };
    }
    function memberDec(e, t, r, n, a, i, o, s) {
      var c;
      switch (a) {
        case 1:
          c = "accessor";
          break;
        case 2:
          c = "method";
          break;
        case 3:
          c = "getter";
          break;
        case 4:
          c = "setter";
          break;
        default:
          c = "field";
      }
      var l,
        u,
        f = {
          kind: c,
          name: o ? "#" + t : _toPropertyKey(t),
          static: i,
          private: o
        },
        p = {
          v: !1
        };
      0 !== a && (f.addInitializer = createAddInitializerMethod(n, p)), 0 === a ? o ? (l = r.get, u = r.set) : (l = function () {
        return this[t];
      }, u = function (e) {
        this[t] = e;
      }) : 2 === a ? l = function () {
        return r.value;
      } : (1 !== a && 3 !== a || (l = function () {
        return r.get.call(this);
      }), 1 !== a && 4 !== a || (u = function (e) {
        r.set.call(this, e);
      })), f.access = l && u ? {
        get: l,
        set: u
      } : l ? {
        get: l
      } : {
        set: u
      };
      try {
        return e(s, f);
      } finally {
        p.v = !0;
      }
    }
    function assertCallable(e, t) {
      if ("function" != typeof e) throw new TypeError(t + " must be a function");
    }
    function assertValidReturnValue(e, t) {
      var r = typeof t;
      if (1 === e) {
        if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
        void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init");
      } else if ("function" !== r) throw new TypeError((0 === e ? "field" : 10 === e ? "class" : "method") + " decorators must return a function or void 0");
    }
    function applyMemberDec(e, t, r, n, a, i, o, s) {
      var c,
        l,
        u,
        f,
        p,
        d,
        h,
        v = r[0];
      if (o ? (0 === a || 1 === a ? (c = {
        get: r[3],
        set: r[4]
      }, u = "get") : 3 === a ? (c = {
        get: r[3]
      }, u = "get") : 4 === a ? (c = {
        set: r[3]
      }, u = "set") : c = {
        value: r[3]
      }, 0 !== a && (1 === a && _setFunctionName(r[4], "#" + n, "set"), _setFunctionName(r[3], "#" + n, u))) : 0 !== a && (c = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? f = {
        get: c.get,
        set: c.set
      } : 2 === a ? f = c.value : 3 === a ? f = c.get : 4 === a && (f = c.set), "function" == typeof v) void 0 !== (p = memberDec(v, n, c, s, a, i, o, f)) && (assertValidReturnValue(a, p), 0 === a ? l = p : 1 === a ? (l = p.init, d = p.get || f.get, h = p.set || f.set, f = {
        get: d,
        set: h
      }) : f = p);else for (var g = v.length - 1; g >= 0; g--) {
        var y;
        void 0 !== (p = memberDec(v[g], n, c, s, a, i, o, f)) && (assertValidReturnValue(a, p), 0 === a ? y = p : 1 === a ? (y = p.init, d = p.get || f.get, h = p.set || f.set, f = {
          get: d,
          set: h
        }) : f = p, void 0 !== y && (void 0 === l ? l = y : "function" == typeof l ? l = [l, y] : l.push(y)));
      }
      if (0 === a || 1 === a) {
        if (void 0 === l) l = function (e, t) {
          return t;
        };else if ("function" != typeof l) {
          var m = l;
          l = function (e, t) {
            for (var r = t, n = 0; n < m.length; n++) r = m[n].call(e, r);
            return r;
          };
        } else {
          var b = l;
          l = function (e, t) {
            return b.call(e, t);
          };
        }
        e.push(l);
      }
      0 !== a && (1 === a ? (c.get = f.get, c.set = f.set) : 2 === a ? c.value = f : 3 === a ? c.get = f : 4 === a && (c.set = f), o ? 1 === a ? (e.push(function (e, t) {
        return f.get.call(e, t);
      }), e.push(function (e, t) {
        return f.set.call(e, t);
      })) : 2 === a ? e.push(f) : e.push(function (e, t) {
        return f.call(e, t);
      }) : Object.defineProperty(t, n, c));
    }
    function applyMemberDecs(e, t) {
      for (var r, n, a = [], i = new Map(), o = new Map(), s = 0; s < t.length; s++) {
        var c = t[s];
        if (Array.isArray(c)) {
          var l,
            u,
            f = c[1],
            p = c[2],
            d = c.length > 3,
            h = f >= 5;
          if (h ? (l = e, 0 != (f -= 5) && (u = n = n || [])) : (l = e.prototype, 0 !== f && (u = r = r || [])), 0 !== f && !d) {
            var v = h ? o : i,
              g = v.get(p) || 0;
            if (!0 === g || 3 === g && 4 !== f || 4 === g && 3 !== f) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + p);
            !g && f > 2 ? v.set(p, f) : v.set(p, !0);
          }
          applyMemberDec(a, l, c, p, f, h, d, u);
        }
      }
      return pushInitializers(a, r), pushInitializers(a, n), a;
    }
    function pushInitializers(e, t) {
      t && e.push(function (e) {
        for (var r = 0; r < t.length; r++) t[r].call(e);
        return e;
      });
    }
    return function (e, t, r) {
      return {
        e: applyMemberDecs(e, t),
        get c() {
          return function (e, t) {
            if (t.length > 0) {
              for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) {
                var o = {
                  v: !1
                };
                try {
                  var s = t[i](n, {
                    kind: "class",
                    name: a,
                    addInitializer: createAddInitializerMethod(r, o)
                  });
                } finally {
                  o.v = !0;
                }
                void 0 !== s && (assertValidReturnValue(10, s), n = s);
              }
              return [n, function () {
                for (var e = 0; e < r.length; e++) r[e].call(n);
              }];
            }
          }(e, r);
        }
      };
    };
  }
  function _applyDecs2203R(e, t, r) {
    return (_applyDecs2203R = applyDecs2203RFactory())(e, t, r);
  }
  function applyDecs2301Factory() {
    function createAddInitializerMethod(e, t) {
      return function (r) {
        !function (e, t) {
          if (e.v) throw Error("attempted to call addInitializer after decoration was finished");
        }(t), assertCallable(r, "An initializer"), e.push(r);
      };
    }
    function assertInstanceIfPrivate(e, t) {
      if (!e(t)) throw new TypeError("Attempted to access private element on non-instance");
    }
    function memberDec(e, t, r, n, a, i, s, o, c) {
      var u;
      switch (a) {
        case 1:
          u = "accessor";
          break;
        case 2:
          u = "method";
          break;
        case 3:
          u = "getter";
          break;
        case 4:
          u = "setter";
          break;
        default:
          u = "field";
      }
      var l,
        f,
        p = {
          kind: u,
          name: s ? "#" + t : _toPropertyKey(t),
          static: i,
          private: s
        },
        d = {
          v: !1
        };
      if (0 !== a && (p.addInitializer = createAddInitializerMethod(n, d)), s || 0 !== a && 2 !== a) {
        if (2 === a) l = function (e) {
          return assertInstanceIfPrivate(c, e), r.value;
        };else {
          var h = 0 === a || 1 === a;
          (h || 3 === a) && (l = s ? function (e) {
            return assertInstanceIfPrivate(c, e), r.get.call(e);
          } : function (e) {
            return r.get.call(e);
          }), (h || 4 === a) && (f = s ? function (e, t) {
            assertInstanceIfPrivate(c, e), r.set.call(e, t);
          } : function (e, t) {
            r.set.call(e, t);
          });
        }
      } else l = function (e) {
        return e[t];
      }, 0 === a && (f = function (e, r) {
        e[t] = r;
      });
      var v = s ? c.bind() : function (e) {
        return t in e;
      };
      p.access = l && f ? {
        get: l,
        set: f,
        has: v
      } : l ? {
        get: l,
        has: v
      } : {
        set: f,
        has: v
      };
      try {
        return e(o, p);
      } finally {
        d.v = !0;
      }
    }
    function assertCallable(e, t) {
      if ("function" != typeof e) throw new TypeError(t + " must be a function");
    }
    function assertValidReturnValue(e, t) {
      var r = typeof t;
      if (1 === e) {
        if ("object" !== r || null === t) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
        void 0 !== t.get && assertCallable(t.get, "accessor.get"), void 0 !== t.set && assertCallable(t.set, "accessor.set"), void 0 !== t.init && assertCallable(t.init, "accessor.init");
      } else if ("function" !== r) throw new TypeError((0 === e ? "field" : 10 === e ? "class" : "method") + " decorators must return a function or void 0");
    }
    function curryThis2(e) {
      return function (t) {
        e(this, t);
      };
    }
    function applyMemberDec(e, t, r, n, a, i, s, o, c) {
      var u,
        l,
        f,
        p,
        d,
        h,
        v,
        y,
        g = r[0];
      if (s ? (0 === a || 1 === a ? (u = {
        get: (d = r[3], function () {
          return d(this);
        }),
        set: curryThis2(r[4])
      }, f = "get") : 3 === a ? (u = {
        get: r[3]
      }, f = "get") : 4 === a ? (u = {
        set: r[3]
      }, f = "set") : u = {
        value: r[3]
      }, 0 !== a && (1 === a && _setFunctionName(u.set, "#" + n, "set"), _setFunctionName(u[f || "value"], "#" + n, f))) : 0 !== a && (u = Object.getOwnPropertyDescriptor(t, n)), 1 === a ? p = {
        get: u.get,
        set: u.set
      } : 2 === a ? p = u.value : 3 === a ? p = u.get : 4 === a && (p = u.set), "function" == typeof g) void 0 !== (h = memberDec(g, n, u, o, a, i, s, p, c)) && (assertValidReturnValue(a, h), 0 === a ? l = h : 1 === a ? (l = h.init, v = h.get || p.get, y = h.set || p.set, p = {
        get: v,
        set: y
      }) : p = h);else for (var m = g.length - 1; m >= 0; m--) {
        var b;
        void 0 !== (h = memberDec(g[m], n, u, o, a, i, s, p, c)) && (assertValidReturnValue(a, h), 0 === a ? b = h : 1 === a ? (b = h.init, v = h.get || p.get, y = h.set || p.set, p = {
          get: v,
          set: y
        }) : p = h, void 0 !== b && (void 0 === l ? l = b : "function" == typeof l ? l = [l, b] : l.push(b)));
      }
      if (0 === a || 1 === a) {
        if (void 0 === l) l = function (e, t) {
          return t;
        };else if ("function" != typeof l) {
          var I = l;
          l = function (e, t) {
            for (var r = t, n = 0; n < I.length; n++) r = I[n].call(e, r);
            return r;
          };
        } else {
          var w = l;
          l = function (e, t) {
            return w.call(e, t);
          };
        }
        e.push(l);
      }
      0 !== a && (1 === a ? (u.get = p.get, u.set = p.set) : 2 === a ? u.value = p : 3 === a ? u.get = p : 4 === a && (u.set = p), s ? 1 === a ? (e.push(function (e, t) {
        return p.get.call(e, t);
      }), e.push(function (e, t) {
        return p.set.call(e, t);
      })) : 2 === a ? e.push(p) : e.push(function (e, t) {
        return p.call(e, t);
      }) : Object.defineProperty(t, n, u));
    }
    function applyMemberDecs(e, t, r) {
      for (var n, a, i, s = [], o = new Map(), c = new Map(), u = 0; u < t.length; u++) {
        var l = t[u];
        if (Array.isArray(l)) {
          var f,
            p,
            d = l[1],
            h = l[2],
            v = l.length > 3,
            y = d >= 5,
            g = r;
          if (y ? (f = e, 0 != (d -= 5) && (p = a = a || []), v && !i && (i = function (t) {
            return _checkInRHS(t) === e;
          }), g = i) : (f = e.prototype, 0 !== d && (p = n = n || [])), 0 !== d && !v) {
            var m = y ? c : o,
              b = m.get(h) || 0;
            if (!0 === b || 3 === b && 4 !== d || 4 === b && 3 !== d) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h);
            !b && d > 2 ? m.set(h, d) : m.set(h, !0);
          }
          applyMemberDec(s, f, l, h, d, y, v, p, g);
        }
      }
      return pushInitializers(s, n), pushInitializers(s, a), s;
    }
    function pushInitializers(e, t) {
      t && e.push(function (e) {
        for (var r = 0; r < t.length; r++) t[r].call(e);
        return e;
      });
    }
    return function (e, t, r, n) {
      return {
        e: applyMemberDecs(e, t, n),
        get c() {
          return function (e, t) {
            if (t.length > 0) {
              for (var r = [], n = e, a = e.name, i = t.length - 1; i >= 0; i--) {
                var s = {
                  v: !1
                };
                try {
                  var o = t[i](n, {
                    kind: "class",
                    name: a,
                    addInitializer: createAddInitializerMethod(r, s)
                  });
                } finally {
                  s.v = !0;
                }
                void 0 !== o && (assertValidReturnValue(10, o), n = o);
              }
              return [n, function () {
                for (var e = 0; e < r.length; e++) r[e].call(n);
              }];
            }
          }(e, r);
        }
      };
    };
  }
  function _applyDecs2301(e, t, r, n) {
    return (_applyDecs2301 = applyDecs2301Factory())(e, t, r, n);
  }
  function _applyDecs2305(e, t, r, n, o, a) {
    function i(e, t, r) {
      return function (n, o) {
        return r && r(n), e[t].call(n, o);
      };
    }
    function c(e, t) {
      for (var r = 0; r < e.length; r++) e[r].call(t);
      return t;
    }
    function s(e, t, r, n) {
      if ("function" != typeof e && (n || void 0 !== e)) throw new TypeError(t + " must " + (r || "be") + " a function" + (n ? "" : " or undefined"));
      return e;
    }
    function applyDec(e, t, r, n, o, a, c, u, l, f, p, d, h) {
      function m(e) {
        if (!h(e)) throw new TypeError("Attempted to access private element on non-instance");
      }
      var y,
        v = t[0],
        g = t[3],
        b = !u;
      if (!b) {
        r || Array.isArray(v) || (v = [v]);
        var w = {},
          S = [],
          A = 3 === o ? "get" : 4 === o || d ? "set" : "value";
        f ? (p || d ? w = {
          get: _setFunctionName(function () {
            return g(this);
          }, n, "get"),
          set: function (e) {
            t[4](this, e);
          }
        } : w[A] = g, p || _setFunctionName(w[A], n, 2 === o ? "" : A)) : p || (w = Object.getOwnPropertyDescriptor(e, n));
      }
      for (var P = e, j = v.length - 1; j >= 0; j -= r ? 2 : 1) {
        var D = v[j],
          E = r ? v[j - 1] : void 0,
          I = {},
          O = {
            kind: ["field", "accessor", "method", "getter", "setter", "class"][o],
            name: n,
            metadata: a,
            addInitializer: function (e, t) {
              if (e.v) throw Error("attempted to call addInitializer after decoration was finished");
              s(t, "An initializer", "be", !0), c.push(t);
            }.bind(null, I)
          };
        try {
          if (b) (y = s(D.call(E, P, O), "class decorators", "return")) && (P = y);else {
            var k, F;
            O.static = l, O.private = f, f ? 2 === o ? k = function (e) {
              return m(e), w.value;
            } : (o < 4 && (k = i(w, "get", m)), 3 !== o && (F = i(w, "set", m))) : (k = function (e) {
              return e[n];
            }, (o < 2 || 4 === o) && (F = function (e, t) {
              e[n] = t;
            }));
            var N = O.access = {
              has: f ? h.bind() : function (e) {
                return n in e;
              }
            };
            if (k && (N.get = k), F && (N.set = F), P = D.call(E, d ? {
              get: w.get,
              set: w.set
            } : w[A], O), d) {
              if ("object" == typeof P && P) (y = s(P.get, "accessor.get")) && (w.get = y), (y = s(P.set, "accessor.set")) && (w.set = y), (y = s(P.init, "accessor.init")) && S.push(y);else if (void 0 !== P) throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
            } else s(P, (p ? "field" : "method") + " decorators", "return") && (p ? S.push(P) : w[A] = P);
          }
        } finally {
          I.v = !0;
        }
      }
      return (p || d) && u.push(function (e, t) {
        for (var r = S.length - 1; r >= 0; r--) t = S[r].call(e, t);
        return t;
      }), p || b || (f ? d ? u.push(i(w, "get"), i(w, "set")) : u.push(2 === o ? w[A] : i.call.bind(w[A])) : Object.defineProperty(e, n, w)), P;
    }
    function u(e, t) {
      return Object.defineProperty(e, Symbol.metadata || Symbol.for("Symbol.metadata"), {
        configurable: !0,
        enumerable: !0,
        value: t
      });
    }
    if (arguments.length >= 6) var l = a[Symbol.metadata || Symbol.for("Symbol.metadata")];
    var f = Object.create(null == l ? null : l),
      p = function (e, t, r, n) {
        var o,
          a,
          i = [],
          s = function (t) {
            return _checkInRHS(t) === e;
          },
          u = new Map();
        function l(e) {
          e && i.push(c.bind(null, e));
        }
        for (var f = 0; f < t.length; f++) {
          var p = t[f];
          if (Array.isArray(p)) {
            var d = p[1],
              h = p[2],
              m = p.length > 3,
              y = 16 & d,
              v = !!(8 & d),
              g = 0 == (d &= 7),
              b = h + "/" + v;
            if (!g && !m) {
              var w = u.get(b);
              if (!0 === w || 3 === w && 4 !== d || 4 === w && 3 !== d) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h);
              u.set(b, !(d > 2) || d);
            }
            applyDec(v ? e : e.prototype, p, y, m ? "#" + h : _toPropertyKey(h), d, n, v ? a = a || [] : o = o || [], i, v, m, g, 1 === d, v && m ? s : r);
          }
        }
        return l(o), l(a), i;
      }(e, t, o, f);
    return r.length || u(e, f), {
      e: p,
      get c() {
        var t = [];
        return r.length && [u(applyDec(e, [r], n, e.name, 5, f, t), f), c.bind(null, t, e)];
      }
    };
  }
  function _applyDecs2311(e, t, n, r, o, i) {
    var a,
      c,
      u,
      s,
      f,
      l,
      p,
      d = Symbol.metadata || Symbol.for("Symbol.metadata"),
      m = Object.defineProperty,
      h = Object.create,
      y = [h(null), h(null)],
      v = t.length;
    function g(t, n, r) {
      return function (o, i) {
        n && (i = o, o = e);
        for (var a = 0; a < t.length; a++) i = t[a].apply(o, r ? [i] : []);
        return r ? i : o;
      };
    }
    function b(e, t, n, r) {
      if ("function" != typeof e && (r || void 0 !== e)) throw new TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined"));
      return e;
    }
    function applyDec(e, t, n, r, o, i, u, s, f, l, p) {
      function d(e) {
        if (!p(e)) throw new TypeError("Attempted to access private element on non-instance");
      }
      var h = [].concat(t[0]),
        v = t[3],
        w = !u,
        D = 1 === o,
        S = 3 === o,
        j = 4 === o,
        E = 2 === o;
      function I(t, n, r) {
        return function (o, i) {
          return n && (i = o, o = e), r && r(o), P[t].call(o, i);
        };
      }
      if (!w) {
        var P = {},
          k = [],
          F = S ? "get" : j || D ? "set" : "value";
        if (f ? (l || D ? P = {
          get: _setFunctionName(function () {
            return v(this);
          }, r, "get"),
          set: function (e) {
            t[4](this, e);
          }
        } : P[F] = v, l || _setFunctionName(P[F], r, E ? "" : F)) : l || (P = Object.getOwnPropertyDescriptor(e, r)), !l && !f) {
          if ((c = y[+s][r]) && 7 != (c ^ o)) throw Error("Decorating two elements with the same name (" + P[F].name + ") is not supported yet");
          y[+s][r] = o < 3 ? 1 : o;
        }
      }
      for (var N = e, O = h.length - 1; O >= 0; O -= n ? 2 : 1) {
        var z = b(h[O], "A decorator", "be", !0),
          A = n ? h[O - 1] : void 0,
          H = {},
          K = {
            kind: ["field", "accessor", "method", "getter", "setter", "class"][o],
            name: r,
            metadata: a,
            addInitializer: function (e, t) {
              if (e.v) throw Error("attempted to call addInitializer after decoration was finished");
              b(t, "An initializer", "be", !0), i.push(t);
            }.bind(null, H)
          };
        if (w) c = z.call(A, N, K), H.v = 1, b(c, "class decorators", "return") && (N = c);else if (K.static = s, K.private = f, c = K.access = {
          has: f ? p.bind() : function (e) {
            return r in e;
          }
        }, j || (c.get = f ? E ? function (e) {
          return d(e), P.value;
        } : I("get", 0, d) : function (e) {
          return e[r];
        }), E || S || (c.set = f ? I("set", 0, d) : function (e, t) {
          e[r] = t;
        }), N = z.call(A, D ? {
          get: P.get,
          set: P.set
        } : P[F], K), H.v = 1, D) {
          if ("object" == typeof N && N) (c = b(N.get, "accessor.get")) && (P.get = c), (c = b(N.set, "accessor.set")) && (P.set = c), (c = b(N.init, "accessor.init")) && k.unshift(c);else if (void 0 !== N) throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined");
        } else b(N, (l ? "field" : "method") + " decorators", "return") && (l ? k.unshift(N) : P[F] = N);
      }
      return o < 2 && u.push(g(k, s, 1), g(i, s, 0)), l || w || (f ? D ? u.splice(-1, 0, I("get", s), I("set", s)) : u.push(E ? P[F] : b.call.bind(P[F])) : m(e, r, P)), N;
    }
    function w(e) {
      return m(e, d, {
        configurable: !0,
        enumerable: !0,
        value: a
      });
    }
    return void 0 !== i && (a = i[d]), a = h(null == a ? null : a), f = [], l = function (e) {
      e && f.push(g(e));
    }, p = function (t, r) {
      for (var i = 0; i < n.length; i++) {
        var a = n[i],
          c = a[1],
          l = 7 & c;
        if ((8 & c) == t && !l == r) {
          var p = a[2],
            d = !!a[3],
            m = 16 & c;
          applyDec(t ? e : e.prototype, a, m, d ? "#" + p : _toPropertyKey(p), l, l < 2 ? [] : t ? s = s || [] : u = u || [], f, !!t, d, r, t && d ? function (t) {
            return _checkInRHS(t) === e;
          } : o);
        }
      }
    }, p(8, 0), p(0, 0), p(8, 1), p(0, 1), l(u), l(s), c = f, v || w(e), {
      e: c,
      get c() {
        var n = [];
        return v && [w(e = applyDec(e, [t], r, e.name, 5, n)), g(n, 1)];
      }
    };
  }
  function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
  }
  function _asyncGeneratorDelegate(t) {
    var e = {},
      n = !1;
    function pump(e, r) {
      return n = !0, r = new Promise(function (n) {
        n(t[e](r));
      }), {
        done: !1,
        value: new _OverloadYield(r, 1)
      };
    }
    return e["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function () {
      return this;
    }, e.next = function (t) {
      return n ? (n = !1, t) : pump("next", t);
    }, "function" == typeof t.throw && (e.throw = function (t) {
      if (n) throw n = !1, t;
      return pump("throw", t);
    }), "function" == typeof t.return && (e.return = function (t) {
      return n ? (n = !1, t) : pump("return", t);
    }), e;
  }
  function _asyncIterator(r) {
    var n,
      t,
      o,
      e = 2;
    for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) {
      if (t && null != (n = r[t])) return n.call(r);
      if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r));
      t = "@@asyncIterator", o = "@@iterator";
    }
    throw new TypeError("Object is not async iterable");
  }
  function AsyncFromSyncIterator(r) {
    function AsyncFromSyncIteratorContinuation(r) {
      if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
      var n = r.done;
      return Promise.resolve(r.value).then(function (r) {
        return {
          value: r,
          done: n
        };
      });
    }
    return AsyncFromSyncIterator = function (r) {
      this.s = r, this.n = r.next;
    }, AsyncFromSyncIterator.prototype = {
      s: null,
      n: null,
      next: function () {
        return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
      },
      return: function (r) {
        var n = this.s.return;
        return void 0 === n ? Promise.resolve({
          value: r,
          done: !0
        }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      },
      throw: function (r) {
        var n = this.s.return;
        return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments));
      }
    }, new AsyncFromSyncIterator(r);
  }
  function _awaitAsyncGenerator(e) {
    return new _OverloadYield(e, 0);
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _checkInRHS(e) {
    if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e ? typeof e : "null"));
    return e;
  }
  function _classPrivateFieldGet2(s, a) {
    return s.get(_assertClassBrand(s, a));
  }
  function _classPrivateFieldSet2(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
  }
  function _classPrivateGetter(s, r, a) {
    return a(_assertClassBrand(s, r));
  }
  function _classPrivateSetter(s, r, a, t) {
    return r(_assertClassBrand(s, a), t), t;
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _defineAccessor(e, r, n, t) {
    var c = {
      configurable: !0,
      enumerable: !0
    };
    return c[e] = t, Object.defineProperty(r, n, c);
  }
  function dispose_SuppressedError(r, e) {
    return "undefined" != typeof SuppressedError ? dispose_SuppressedError = SuppressedError : (dispose_SuppressedError = function (r, e) {
      this.suppressed = e, this.error = r, this.stack = Error().stack;
    }, dispose_SuppressedError.prototype = Object.create(Error.prototype, {
      constructor: {
        value: dispose_SuppressedError,
        writable: !0,
        configurable: !0
      }
    })), new dispose_SuppressedError(r, e);
  }
  function _dispose(r, e, s) {
    function next() {
      for (; r.length > 0;) try {
        var o = r.pop(),
          p = o.d.call(o.v);
        if (o.a) return Promise.resolve(p).then(next, err);
      } catch (r) {
        return err(r);
      }
      if (s) throw e;
    }
    function err(r) {
      return e = s ? new dispose_SuppressedError(e, r) : r, s = !0, next();
    }
    return next();
  }
  function _importDeferProxy(e) {
    var t = null,
      constValue = function (e) {
        return function () {
          return e;
        };
      },
      proxy = function (r) {
        return function (n, o, f) {
          return null === t && (t = e()), r(t, o, f);
        };
      };
    return new Proxy({}, {
      defineProperty: constValue(!1),
      deleteProperty: constValue(!1),
      get: proxy(Reflect.get),
      getOwnPropertyDescriptor: proxy(Reflect.getOwnPropertyDescriptor),
      getPrototypeOf: constValue(null),
      isExtensible: constValue(!1),
      has: proxy(Reflect.has),
      ownKeys: proxy(Reflect.ownKeys),
      preventExtensions: constValue(!0),
      set: constValue(!1),
      setPrototypeOf: constValue(!1)
    });
  }
  function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = new WeakMap(),
      t = new WeakMap();
    return (_getRequireWildcardCache = function (e) {
      return e ? t : r;
    })(e);
  }
  function _interopRequireWildcard(e, r) {
    if (!r && e && e.__esModule) return e;
    if (null === e || "object" != typeof e && "function" != typeof e) return {
      default: e
    };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = {
        __proto__: null
      },
      a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n.default = e, t && t.set(e, n), n;
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _iterableToArrayLimitLoose(e, r) {
    var t = e && ("undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"]);
    if (null != t) {
      var o,
        l = [];
      for (t = t.call(e); e.length < r && !(o = t.next()).done;) l.push(o.value);
      return l;
    }
  }
  var REACT_ELEMENT_TYPE;
  function _jsx(e, r, E, l) {
    REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);
    var o = e && e.defaultProps,
      n = arguments.length - 3;
    if (r || 0 === n || (r = {
      children: void 0
    }), 1 === n) r.children = l;else if (n > 1) {
      for (var t = Array(n), f = 0; f < n; f++) t[f] = arguments[f + 3];
      r.children = t;
    }
    if (r && o) for (var i in o) void 0 === r[i] && (r[i] = o[i]);else r || (r = o || {});
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: e,
      key: void 0 === E ? null : "" + E,
      ref: null,
      props: r,
      _owner: null
    };
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    _regeneratorRuntime = function () {
      return e;
    };
    var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
        t[e] = r.value;
      },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";
    function define(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }
    try {
      define({}, "");
    } catch (t) {
      define = function (t, e, r) {
        return t[e] = r;
      };
    }
    function wrap(t, e, r, n) {
      var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
      return o(a, "_invoke", {
        value: makeInvokeMethod(t, r, c)
      }), a;
    }
    function tryCatch(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }
    e.wrap = wrap;
    var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var p = {};
    define(p, a, function () {
      return this;
    });
    var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
    v && v !== r && n.call(v, a) && (p = v);
    var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
    function defineIteratorMethods(t) {
      ["next", "throw", "return"].forEach(function (e) {
        define(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function AsyncIterator(t, e) {
      function invoke(r, o, i, a) {
        var c = tryCatch(t[r], t, o);
        if ("throw" !== c.type) {
          var u = c.arg,
            h = u.value;
          return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
            invoke("next", t, i, a);
          }, function (t) {
            invoke("throw", t, i, a);
          }) : e.resolve(h).then(function (t) {
            u.value = t, i(u);
          }, function (t) {
            return invoke("throw", t, i, a);
          });
        }
        a(c.arg);
      }
      var r;
      o(this, "_invoke", {
        value: function (t, n) {
          function callInvokeWithMethodAndArg() {
            return new e(function (e, r) {
              invoke(t, n, e, r);
            });
          }
          return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(e, r, n) {
      var o = h;
      return function (i, a) {
        if (o === f) throw Error("Generator is already running");
        if (o === s) {
          if ("throw" === i) throw a;
          return {
            value: t,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var c = n.delegate;
          if (c) {
            var u = maybeInvokeDelegate(c, n);
            if (u) {
              if (u === y) continue;
              return u;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === h) throw o = s, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = f;
          var p = tryCatch(e, r, n);
          if ("normal" === p.type) {
            if (o = n.done ? s : l, p.arg === y) continue;
            return {
              value: p.arg,
              done: n.done
            };
          }
          "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
        }
      };
    }
    function maybeInvokeDelegate(e, r) {
      var n = r.method,
        o = e.iterator[n];
      if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
      var i = tryCatch(o, e.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
      var a = i.arg;
      return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
    }
    function pushTryEntry(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }
    function resetTryEntry(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }
    function Context(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(e) {
      if (e || "" === e) {
        var r = e[a];
        if (r) return r.call(e);
        if ("function" == typeof e.next) return e;
        if (!isNaN(e.length)) {
          var o = -1,
            i = function next() {
              for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
              return next.value = t, next.done = !0, next;
            };
          return i.next = i;
        }
      }
      throw new TypeError(typeof e + " is not iterable");
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
    }, e.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
    }, e.awrap = function (t) {
      return {
        __await: t
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
      return this;
    }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
      return this;
    }), define(g, "toString", function () {
      return "[object Generator]";
    }), e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return r.reverse(), function next() {
        for (; r.length;) {
          var t = r.pop();
          if (t in e) return next.value = t, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, e.values = values, Context.prototype = {
      constructor: Context,
      reset: function (e) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ("root" === i.tryLoc) return handle("end");
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }
        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function (e, r, n) {
        return this.delegate = {
          iterator: values(e),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = t), y;
      }
    }, e;
  }
  function _setFunctionName(e, t, n) {
    "symbol" == typeof t && (t = (t = t.description) ? "[" + t + "]" : "");
    try {
      Object.defineProperty(e, "name", {
        configurable: !0,
        value: n ? n + " " + t : t
      });
    } catch (e) {}
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _toSetter(t, e, n) {
    e || (e = []);
    var r = e.length++;
    return Object.defineProperty({}, "_", {
      set: function (o) {
        e[r] = o, t.apply(n, e);
      }
    });
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _using(o, n, e) {
    if (null == n) return n;
    if (Object(n) !== n) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
    if (e) var r = n[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
    if (null == r && (r = n[Symbol.dispose || Symbol.for("Symbol.dispose")]), "function" != typeof r) throw new TypeError("Property [Symbol.dispose] is not a function.");
    return o.push({
      v: n,
      d: r,
      a: e
    }), n;
  }
  function _usingCtx() {
    var r = "function" == typeof SuppressedError ? SuppressedError : function (r, n) {
        var e = Error();
        return e.name = "SuppressedError", e.error = r, e.suppressed = n, e;
      },
      n = {},
      e = [];
    function using(r, n) {
      if (null != n) {
        if (Object(n) !== n) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
        if (r) var o = n[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];
        if (null == o && (o = n[Symbol.dispose || Symbol.for("Symbol.dispose")]), "function" != typeof o) throw new TypeError("Property [Symbol.dispose] is not a function.");
        e.push({
          v: n,
          d: o,
          a: r
        });
      } else r && e.push({
        d: n,
        a: r
      });
      return n;
    }
    return {
      e: n,
      u: using.bind(null, !1),
      a: using.bind(null, !0),
      d: function () {
        var o = this.e;
        function next() {
          for (; r = e.pop();) try {
            var r,
              t = r.d && r.d.call(r.v);
            if (r.a) return Promise.resolve(t).then(next, err);
          } catch (r) {
            return err(r);
          }
          if (o !== n) throw o;
        }
        function err(e) {
          return o = o !== n ? new r(e, o) : e, next();
        }
        return next();
      }
    };
  }
  function _wrapRegExp() {
    _wrapRegExp = function (e, r) {
      return new BabelRegExp(e, void 0, r);
    };
    var e = RegExp.prototype,
      r = new WeakMap();
    function BabelRegExp(e, t, p) {
      var o = RegExp(e, t);
      return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype);
    }
    function buildGroups(e, t) {
      var p = r.get(t);
      return Object.keys(p).reduce(function (r, t) {
        var o = p[t];
        if ("number" == typeof o) r[t] = e[o];else {
          for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length;) i++;
          r[t] = e[o[i]];
        }
        return r;
      }, Object.create(null));
    }
    return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (r) {
      var t = e.exec.call(this, r);
      if (t) {
        t.groups = buildGroups(t, this);
        var p = t.indices;
        p && (p.groups = buildGroups(p, this));
      }
      return t;
    }, BabelRegExp.prototype[Symbol.replace] = function (t, p) {
      if ("string" == typeof p) {
        var o = r.get(this);
        return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)>/g, function (e, r) {
          var t = o[r];
          return "$" + (Array.isArray(t) ? t.join("$") : t);
        }));
      }
      if ("function" == typeof p) {
        var i = this;
        return e[Symbol.replace].call(this, t, function () {
          var e = arguments;
          return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e);
        });
      }
      return e[Symbol.replace].call(this, t, p);
    }, _wrapRegExp.apply(this, arguments);
  }
  function _AwaitValue(value) {
    this.wrapped = value;
  }
  function _wrapAsyncGenerator(fn) {
    return function () {
      return new _AsyncGenerator(fn.apply(this, arguments));
    };
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
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
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
    key = _toPropertyKey(key);
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
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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
      var source = arguments[i] != null ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeFunction(fn) {
    try {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    } catch (e) {
      return typeof fn === "function";
    }
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
  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
  function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure " + obj);
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
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
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
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
      throw new TypeError('failed to set property');
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
    throw new TypeError("\"" + name + "\" is read-only");
  }
  function _writeOnlyError(name) {
    throw new TypeError("\"" + name + "\" is write-only");
  }
  function _classNameTDZError(name) {
    throw new ReferenceError("Class \"" + name + "\" cannot be referenced in computed property keys.");
  }
  function _temporalUndefined() {}
  function _tdz(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
  function _temporalRef(val, name) {
    return val === _temporalUndefined ? _tdz(name) : val;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _slicedToArrayLoose(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimitLoose(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return _arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }
    return next(arr, i);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    };
  }
  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.');
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
    var descriptor = _classPrivateFieldGet2(privateMap, receiver);
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classPrivateFieldGet2(privateMap, receiver);
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classPrivateFieldDestructureSet(receiver, privateMap) {
    var descriptor = _classPrivateFieldGet2(privateMap, receiver);
    return _classApplyDescriptorDestructureSet(receiver, descriptor);
  }
  function _classExtractFieldDescriptor(receiver, privateMap) {
    return _classPrivateFieldGet2(privateMap, receiver);
  }
  function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    _assertClassBrand(classConstructor, receiver);
    _classCheckPrivateStaticFieldDescriptor(descriptor, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    _assertClassBrand(classConstructor, receiver);
    _classCheckPrivateStaticFieldDescriptor(descriptor, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    _assertClassBrand(classConstructor, receiver);
    return method;
  }
  function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _classApplyDescriptorDestructureSet(receiver, descriptor) {
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
  function _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {
    _assertClassBrand(classConstructor, receiver);
    _classCheckPrivateStaticFieldDescriptor(descriptor, "set");
    return _classApplyDescriptorDestructureSet(receiver, descriptor);
  }
  function _classCheckPrivateStaticAccess(receiver, classConstructor, returnValue) {
    return _assertClassBrand(classConstructor, receiver, returnValue);
  }
  function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
    if (descriptor === undefined) {
      throw new TypeError("attempted to " + action + " private static field before its declaration");
    }
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
    _assertClassBrand(privateSet, receiver);
    return fn;
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }
  function _classPrivateMethodInitSpec(obj, privateSet) {
    _checkPrivateRedeclaration(obj, privateSet);
    privateSet.add(obj);
  }
  function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }
  function _identity(x) {
    return x;
  }
  function _nullishReceiverError(r) {
    throw new TypeError("Cannot set property of null or undefined.");
  }

  var _tempAxis = new THREE.Vector3();
  var URDFBase = /*#__PURE__*/function (_Object3D) {
    function URDFBase() {
      var _this;
      _classCallCheck(this, URDFBase);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, URDFBase, [].concat(args));
      _this.urdfNode = null;
      _this.urdfName = '';
      return _this;
    }
    _inherits(URDFBase, _Object3D);
    return _createClass(URDFBase, [{
      key: "copy",
      value: function copy(source, recursive) {
        _get(_getPrototypeOf(URDFBase.prototype), "copy", this).call(this, source, recursive);
        this.urdfNode = source.urdfNode;
        this.urdfName = source.urdfName;
        return this;
      }
    }]);
  }(THREE.Object3D);
  var URDFCollider = /*#__PURE__*/function (_URDFBase) {
    function URDFCollider() {
      var _this2;
      _classCallCheck(this, URDFCollider);
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _this2 = _callSuper(this, URDFCollider, [].concat(args));
      _this2.isURDFCollider = true;
      _this2.type = 'URDFCollider';
      return _this2;
    }
    _inherits(URDFCollider, _URDFBase);
    return _createClass(URDFCollider);
  }(URDFBase);
  var URDFVisual = /*#__PURE__*/function (_URDFBase2) {
    function URDFVisual() {
      var _this3;
      _classCallCheck(this, URDFVisual);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      _this3 = _callSuper(this, URDFVisual, [].concat(args));
      _this3.isURDFVisual = true;
      _this3.type = 'URDFVisual';
      return _this3;
    }
    _inherits(URDFVisual, _URDFBase2);
    return _createClass(URDFVisual);
  }(URDFBase);
  var URDFLink = /*#__PURE__*/function (_URDFBase3) {
    function URDFLink() {
      var _this4;
      _classCallCheck(this, URDFLink);
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      _this4 = _callSuper(this, URDFLink, [].concat(args));
      _this4.isURDFLink = true;
      _this4.type = 'URDFLink';
      return _this4;
    }
    _inherits(URDFLink, _URDFBase3);
    return _createClass(URDFLink);
  }(URDFBase);
  var URDFJoint = /*#__PURE__*/function (_URDFBase4) {
    function URDFJoint() {
      var _this5;
      _classCallCheck(this, URDFJoint);
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      _this5 = _callSuper(this, URDFJoint, [].concat(args));
      _this5.isURDFJoint = true;
      _this5.type = 'URDFJoint';
      _this5.jointValue = null;
      _this5.jointType = 'fixed';
      _this5.axis = new THREE.Vector3(1, 0, 0);
      _this5.limit = {
        lower: 0,
        upper: 0
      };
      _this5.ignoreLimits = false;
      _this5.origPosition = null;
      _this5.origQuaternion = null;
      _this5.mimicJoints = [];
      return _this5;
    }

    /* Overrides */
    _inherits(URDFJoint, _URDFBase4);
    return _createClass(URDFJoint, [{
      key: "jointType",
      get: function get() {
        return this._jointType;
      },
      set: function set(v) {
        if (this.jointType === v) return;
        this._jointType = v;
        this.matrixWorldNeedsUpdate = true;
        switch (v) {
          case 'fixed':
            this.jointValue = [];
            break;
          case 'continuous':
          case 'revolute':
          case 'prismatic':
            this.jointValue = new Array(1).fill(0);
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
        return this.jointValue[0];
      }
    }, {
      key: "copy",
      value: function copy(source, recursive) {
        _get(_getPrototypeOf(URDFJoint.prototype), "copy", this).call(this, source, recursive);
        this.jointType = source.jointType;
        this.axis = source.axis.clone();
        this.limit.lower = source.limit.lower;
        this.limit.upper = source.limit.upper;
        this.ignoreLimits = false;
        this.jointValue = _toConsumableArray(source.jointValue);
        this.origPosition = source.origPosition ? source.origPosition.clone() : null;
        this.origQuaternion = source.origQuaternion ? source.origQuaternion.clone() : null;
        this.mimicJoints = _toConsumableArray(source.mimicJoints);
        return this;
      }

      /* Public Functions */
      /**
       * @param {...number|null} values The joint value components to set, optionally null for no-op
       * @returns {boolean} Whether the invocation of this function resulted in an actual change to the joint value
       */
    }, {
      key: "setJointValue",
      value: function setJointValue() {
        for (var _len6 = arguments.length, values = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          values[_key6] = arguments[_key6];
        }
        // Parse all incoming values into numbers except null, which we treat as a no-op for that value component.
        values = values.map(function (v) {
          return v === null ? null : parseFloat(v);
        });
        if (!this.origPosition || !this.origQuaternion) {
          this.origPosition = this.position.clone();
          this.origQuaternion = this.quaternion.clone();
        }
        var didUpdate = false;
        this.mimicJoints.forEach(function (joint) {
          didUpdate = joint.updateFromMimickedJoint.apply(joint, _toConsumableArray(values)) || didUpdate;
        });
        switch (this.jointType) {
          case 'fixed':
            {
              return didUpdate;
            }
          case 'continuous':
          case 'revolute':
            {
              var angle = values[0];
              if (angle == null) return didUpdate;
              if (angle === this.jointValue[0]) return didUpdate;
              if (!this.ignoreLimits && this.jointType === 'revolute') {
                angle = Math.min(this.limit.upper, angle);
                angle = Math.max(this.limit.lower, angle);
              }
              this.quaternion.setFromAxisAngle(this.axis, angle).premultiply(this.origQuaternion);
              if (this.jointValue[0] !== angle) {
                this.jointValue[0] = angle;
                this.matrixWorldNeedsUpdate = true;
                return true;
              } else {
                return didUpdate;
              }
            }
          case 'prismatic':
            {
              var pos = values[0];
              if (pos == null) return didUpdate;
              if (pos === this.jointValue[0]) return didUpdate;
              if (!this.ignoreLimits) {
                pos = Math.min(this.limit.upper, pos);
                pos = Math.max(this.limit.lower, pos);
              }
              this.position.copy(this.origPosition);
              _tempAxis.copy(this.axis).applyEuler(this.rotation);
              this.position.addScaledVector(_tempAxis, pos);
              if (this.jointValue[0] !== pos) {
                this.jointValue[0] = pos;
                this.matrixWorldNeedsUpdate = true;
                return true;
              } else {
                return didUpdate;
              }
            }
          case 'floating':
          case 'planar':
            // TODO: Support these joint types
            console.warn("'".concat(this.jointType, "' joint not yet supported"));
        }
        return didUpdate;
      }
    }]);
  }(URDFBase);
  var URDFMimicJoint = /*#__PURE__*/function (_URDFJoint) {
    function URDFMimicJoint() {
      var _this6;
      _classCallCheck(this, URDFMimicJoint);
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      _this6 = _callSuper(this, URDFMimicJoint, [].concat(args));
      _this6.type = 'URDFMimicJoint';
      _this6.mimicJoint = null;
      _this6.offset = 0;
      _this6.multiplier = 1;
      return _this6;
    }
    _inherits(URDFMimicJoint, _URDFJoint);
    return _createClass(URDFMimicJoint, [{
      key: "updateFromMimickedJoint",
      value: function updateFromMimickedJoint() {
        var _this7 = this,
          _get2;
        for (var _len8 = arguments.length, values = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          values[_key8] = arguments[_key8];
        }
        var modifiedValues = values.map(function (x) {
          return x * _this7.multiplier + _this7.offset;
        });
        return (_get2 = _get(_getPrototypeOf(URDFMimicJoint.prototype), "setJointValue", this)).call.apply(_get2, [this].concat(_toConsumableArray(modifiedValues)));
      }

      /* Overrides */
    }, {
      key: "copy",
      value: function copy(source, recursive) {
        _get(_getPrototypeOf(URDFMimicJoint.prototype), "copy", this).call(this, source, recursive);
        this.mimicJoint = source.mimicJoint;
        this.offset = source.offset;
        this.multiplier = source.multiplier;
        return this;
      }
    }]);
  }(URDFJoint);
  var URDFRobot = /*#__PURE__*/function (_URDFLink) {
    function URDFRobot() {
      var _this8;
      _classCallCheck(this, URDFRobot);
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      _this8 = _callSuper(this, URDFRobot, [].concat(args));
      _this8.isURDFRobot = true;
      _this8.urdfNode = null;
      _this8.urdfRobotNode = null;
      _this8.robotName = null;
      _this8.links = null;
      _this8.joints = null;
      _this8.colliders = null;
      _this8.visual = null;
      _this8.frames = null;
      return _this8;
    }
    _inherits(URDFRobot, _URDFLink);
    return _createClass(URDFRobot, [{
      key: "copy",
      value: function copy(source, recursive) {
        var _this9 = this;
        _get(_getPrototypeOf(URDFRobot.prototype), "copy", this).call(this, source, recursive);
        this.urdfRobotNode = source.urdfRobotNode;
        this.robotName = source.robotName;
        this.links = {};
        this.joints = {};
        this.colliders = {};
        this.visual = {};
        this.traverse(function (c) {
          if (c.isURDFJoint && c.urdfName in source.joints) {
            _this9.joints[c.urdfName] = c;
          }
          if (c.isURDFLink && c.urdfName in source.links) {
            _this9.links[c.urdfName] = c;
          }
          if (c.isURDFCollider && c.urdfName in source.colliders) {
            _this9.colliders[c.urdfName] = c;
          }
          if (c.isURDFVisual && c.urdfName in source.visual) {
            _this9.visual[c.urdfName] = c;
          }
        });

        // Repair mimic joint references once we've re-accumulated all our joint data
        for (var joint in this.joints) {
          this.joints[joint].mimicJoints = this.joints[joint].mimicJoints.map(function (mimicJoint) {
            return _this9.joints[mimicJoint.name];
          });
        }
        this.frames = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, this.colliders), this.visual), this.links), this.joints);
        return this;
      }
    }, {
      key: "getFrame",
      value: function getFrame(name) {
        return this.frames[name];
      }
    }, {
      key: "setJointValue",
      value: function setJointValue(jointName) {
        var joint = this.joints[jointName];
        if (joint) {
          for (var _len10 = arguments.length, angle = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
            angle[_key10 - 1] = arguments[_key10];
          }
          return joint.setJointValue.apply(joint, angle);
        }
        return false;
      }
    }, {
      key: "setJointValues",
      value: function setJointValues(values) {
        var didChange = false;
        for (var name in values) {
          var value = values[name];
          if (Array.isArray(value)) {
            didChange = this.setJointValue.apply(this, [name].concat(_toConsumableArray(value))) || didChange;
          } else {
            didChange = this.setJointValue(name, value) || didChange;
          }
        }
        return didChange;
      }
    }]);
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

  var tempQuaternion = new THREE__namespace.Quaternion();
  var tempEuler = new THREE__namespace.Euler();

  // take a vector "x y z" and process it into
  // an array [x, y, z]
  function processTuple(val) {
    if (!val) return [0, 0, 0];
    return val.trim().split(/\s+/g).map(function (num) {
      return parseFloat(num);
    });
  }

  // applies a rotation a threejs object in URDF order
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
  var URDFLoader = /*#__PURE__*/function () {
    function URDFLoader(manager) {
      _classCallCheck(this, URDFLoader);
      this.manager = manager || THREE__namespace.DefaultLoadingManager;
      this.loadMeshCb = this.defaultMeshLoader.bind(this);
      this.parseVisual = true;
      this.parseCollision = false;
      this.packages = '';
      this.workingPath = '';
      this.fetchOptions = {};
    }

    /* Public API */
    return _createClass(URDFLoader, [{
      key: "loadAsync",
      value: function loadAsync(urdf) {
        var _this = this;
        return new Promise(function (resolve, reject) {
          _this.load(urdf, resolve, null, reject);
        });
      }

      // urdf:    The path to the URDF within the package OR absolute
      // onComplete:      Callback that is passed the model once loaded
    }, {
      key: "load",
      value: function load(urdf, onComplete, onProgress, onError) {
        var _this2 = this;
        // Check if a full URI is specified before
        // prepending the package info
        var manager = this.manager;
        var workingPath = THREE__namespace.LoaderUtils.extractUrlBase(urdf);
        var urdfPath = this.manager.resolveURL(urdf);
        manager.itemStart(urdfPath);
        fetch(urdfPath, this.fetchOptions).then(function (res) {
          if (res.ok) {
            if (onProgress) {
              onProgress(null);
            }
            return res.text();
          } else {
            throw new Error("URDFLoader: Failed to load url '".concat(urdfPath, "' with error code ").concat(res.status, " : ").concat(res.statusText, "."));
          }
        }).then(function (data) {
          if (_this2.workingPath === '') {
            _this2.workingPath = workingPath;
          }
          var model = _this2.parse(data);
          onComplete(model);
          manager.itemEnd(urdfPath);
        })["catch"](function (e) {
          if (onError) {
            onError(e);
          } else {
            console.error('URDFLoader: Error loading file.', e);
          }
          manager.itemError(urdfPath);
          manager.itemEnd(urdfPath);
        });
      }
    }, {
      key: "parse",
      value: function parse(content) {
        var packages = this.packages;
        var loadMeshCb = this.loadMeshCb;
        var parseVisual = this.parseVisual;
        var parseCollision = this.parseCollision;
        var workingPath = this.workingPath;
        var manager = this.manager;
        var linkMap = {};
        var jointMap = {};
        var materialMap = {};

        // Resolves the path of mesh files
        function resolvePath(path) {
          if (!/^package:\/\//.test(path)) {
            return workingPath ? workingPath + path : path;
          }

          // Remove "package://" keyword and split meshPath at the first slash
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
          } else if (packages instanceof Function) {
            return packages(targetPkg) + '/' + relPath;
          } else if (_typeof(packages) === 'object') {
            // "pkg" is a map of packages
            if (targetPkg in packages) {
              return packages[targetPkg] + '/' + relPath;
            } else {
              console.error("URDFLoader : ".concat(targetPkg, " not found in provided package list."));
              return null;
            }
          }
        }

        // Process the URDF text format
        function processUrdf(data) {
          var children;
          if (data instanceof Document) {
            children = _toConsumableArray(data.children);
          } else if (data instanceof Element) {
            children = [data];
          } else {
            var parser = new DOMParser();
            var urdf = parser.parseFromString(data, 'text/xml');
            children = _toConsumableArray(urdf.children);
          }
          var robotNode = children.filter(function (c) {
            return c.nodeName === 'robot';
          }).pop();
          return processRobot(robotNode);
        }

        // Process the <robot> node
        function processRobot(robot) {
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
          obj.urdfRobotNode = robot;

          // Create the <material> map
          materials.forEach(function (m) {
            var name = m.getAttribute('name');
            materialMap[name] = processMaterial(m);
          });

          // Create the <link> map
          var visualMap = {};
          var colliderMap = {};
          links.forEach(function (l) {
            var name = l.getAttribute('name');
            var isRoot = robot.querySelector("child[link=\"".concat(name, "\"]")) === null;
            linkMap[name] = processLink(l, visualMap, colliderMap, isRoot ? obj : null);
          });

          // Create the <joint> map
          joints.forEach(function (j) {
            var name = j.getAttribute('name');
            jointMap[name] = processJoint(j);
          });
          obj.joints = jointMap;
          obj.links = linkMap;
          obj.colliders = colliderMap;
          obj.visual = visualMap;

          // Link up mimic joints
          var jointList = Object.values(jointMap);
          jointList.forEach(function (j) {
            if (j instanceof URDFMimicJoint) {
              jointMap[j.mimicJoint].mimicJoints.push(j);
            }
          });

          // Detect infinite loops of mimic joints
          jointList.forEach(function (j) {
            var uniqueJoints = new Set();
            var iterFunction = function iterFunction(joint) {
              if (uniqueJoints.has(joint)) {
                throw new Error('URDFLoader: Detected an infinite loop of mimic joints.');
              }
              uniqueJoints.add(joint);
              joint.mimicJoints.forEach(function (j) {
                iterFunction(j);
              });
            };
            iterFunction(j);
          });
          obj.frames = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, colliderMap), visualMap), linkMap), jointMap);
          return obj;
        }

        // Process joint nodes and parent them
        function processJoint(joint) {
          var children = _toConsumableArray(joint.children);
          var jointType = joint.getAttribute('type');
          var obj;
          var mimicTag = children.find(function (n) {
            return n.nodeName.toLowerCase() === 'mimic';
          });
          if (mimicTag) {
            obj = new URDFMimicJoint();
            obj.mimicJoint = mimicTag.getAttribute('joint');
            obj.multiplier = parseFloat(mimicTag.getAttribute('multiplier') || 1.0);
            obj.offset = parseFloat(mimicTag.getAttribute('offset') || 0.0);
            console.log('MIMIC: ', obj);
          } else {
            obj = new URDFJoint();
          }
          obj.urdfNode = joint;
          obj.name = joint.getAttribute('name');
          obj.urdfName = obj.name;
          obj.jointType = jointType;
          var parent = null;
          var child = null;
          var xyz = [0, 0, 0];
          var rpy = [0, 0, 0];

          // Extract the attributes
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
          });

          // Join the links
          parent.add(obj);
          obj.add(child);
          applyRotation(obj, rpy);
          obj.position.set(xyz[0], xyz[1], xyz[2]);

          // Set up the rotate function
          var axisNode = children.filter(function (n) {
            return n.nodeName.toLowerCase() === 'axis';
          })[0];
          if (axisNode) {
            var axisXYZ = axisNode.getAttribute('xyz').split(/\s+/g).map(function (num) {
              return parseFloat(num);
            });
            obj.axis = new THREE__namespace.Vector3(axisXYZ[0], axisXYZ[1], axisXYZ[2]);
            obj.axis.normalize();
          }
          return obj;
        }

        // Process the <link> nodes
        function processLink(link, visualMap, colliderMap) {
          var target = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
          if (target === null) {
            target = new URDFLink();
          }
          var children = _toConsumableArray(link.children);
          target.name = link.getAttribute('name');
          target.urdfName = target.name;
          target.urdfNode = link;
          if (parseVisual) {
            var visualNodes = children.filter(function (n) {
              return n.nodeName.toLowerCase() === 'visual';
            });
            visualNodes.forEach(function (vn) {
              var v = processLinkElement(vn, materialMap);
              target.add(v);
              if (vn.hasAttribute('name')) {
                var name = vn.getAttribute('name');
                v.name = name;
                v.urdfName = name;
                visualMap[name] = v;
              }
            });
          }
          if (parseCollision) {
            var collisionNodes = children.filter(function (n) {
              return n.nodeName.toLowerCase() === 'collision';
            });
            collisionNodes.forEach(function (cn) {
              var c = processLinkElement(cn);
              target.add(c);
              if (cn.hasAttribute('name')) {
                var name = cn.getAttribute('name');
                c.name = name;
                c.urdfName = name;
                colliderMap[name] = c;
              }
            });
          }
          return target;
        }
        function processMaterial(node) {
          var matNodes = _toConsumableArray(node.children);
          var material = new THREE__namespace.MeshPhongMaterial();
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
              material.depthWrite = !material.transparent;
            } else if (type === 'texture') {
              // The URDF spec does not require that the <texture/> tag include
              // a filename attribute so skip loading the texture if not provided.
              var filename = n.getAttribute('filename');
              if (filename) {
                var loader = new THREE__namespace.TextureLoader(manager);
                var filePath = resolvePath(filename);
                material.map = loader.load(filePath);
                material.map.colorSpace = THREE__namespace.SRGBColorSpace;
              }
            }
          });
          return material;
        }

        // Process the visual and collision nodes into meshes
        function processLinkElement(vn) {
          var materialMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var isCollisionNode = vn.nodeName.toLowerCase() === 'collision';
          var children = _toConsumableArray(vn.children);
          var material = null;

          // get the material first
          var materialNode = children.filter(function (n) {
            return n.nodeName.toLowerCase() === 'material';
          })[0];
          if (materialNode) {
            var name = materialNode.getAttribute('name');
            if (name && name in materialMap) {
              material = materialMap[name];
            } else {
              material = processMaterial(materialNode);
            }
          } else {
            material = new THREE__namespace.MeshPhongMaterial();
          }
          var group = isCollisionNode ? new URDFCollider() : new URDFVisual();
          group.urdfNode = vn;
          children.forEach(function (n) {
            var type = n.nodeName.toLowerCase();
            if (type === 'geometry') {
              var geoType = n.children[0].nodeName.toLowerCase();
              if (geoType === 'mesh') {
                var filename = n.children[0].getAttribute('filename');
                var filePath = resolvePath(filename);

                // file path is null if a package directory is not provided.
                if (filePath !== null) {
                  var scaleAttr = n.children[0].getAttribute('scale');
                  if (scaleAttr) {
                    var scale = processTuple(scaleAttr);
                    group.scale.set(scale[0], scale[1], scale[2]);
                  }
                  loadMeshCb(filePath, manager, function (obj, err) {
                    if (err) {
                      console.error('URDFLoader: Error loading mesh.', err);
                    } else if (obj) {
                      if (obj instanceof THREE__namespace.Mesh) {
                        obj.material = material;
                      }

                      // We don't expect non identity rotations or positions. In the case of
                      // COLLADA files the model might come in with a custom scale for unit
                      // conversion.
                      obj.position.set(0, 0, 0);
                      obj.quaternion._x = 0;
                      obj.quaternion._y = 0;
                      obj.quaternion._z = 0;
                      obj.quaternion._w = 0;
                      group.add(obj);
                    }
                  });
                }
              } else if (geoType === 'box') {
                var primitiveModel = new THREE__namespace.Mesh();
                primitiveModel.geometry = new THREE__namespace.BoxGeometry(1, 1, 1);
                primitiveModel.material = material;
                var size = processTuple(n.children[0].getAttribute('size'));
                primitiveModel.scale.set(size[0], size[1], size[2]);
                group.add(primitiveModel);
              } else if (geoType === 'sphere') {
                var _primitiveModel = new THREE__namespace.Mesh();
                _primitiveModel.geometry = new THREE__namespace.SphereGeometry(1, 30, 30);
                _primitiveModel.material = material;
                var radius = parseFloat(n.children[0].getAttribute('radius')) || 0;
                _primitiveModel.scale.set(radius, radius, radius);
                group.add(_primitiveModel);
              } else if (geoType === 'cylinder') {
                var _primitiveModel2 = new THREE__namespace.Mesh();
                _primitiveModel2.geometry = new THREE__namespace.CylinderGeometry(1, 1, 1, 30);
                _primitiveModel2.material = material;
                var _radius = parseFloat(n.children[0].getAttribute('radius')) || 0;
                var length = parseFloat(n.children[0].getAttribute('length')) || 0;
                _primitiveModel2.scale.set(_radius, length, _radius);
                _primitiveModel2.rotation.set(Math.PI / 2, 0, 0);
                group.add(_primitiveModel2);
              }
            } else if (type === 'origin') {
              var xyz = processTuple(n.getAttribute('xyz'));
              var rpy = processTuple(n.getAttribute('rpy'));
              group.position.set(xyz[0], xyz[1], xyz[2]);
              group.rotation.set(0, 0, 0);
              applyRotation(group, rpy);
            }
          });
          return group;
        }
        return processUrdf(content);
      }

      // Default mesh loading function
    }, {
      key: "defaultMeshLoader",
      value: function defaultMeshLoader(path, manager, done) {
        if (/\.stl$/i.test(path)) {
          var loader = new STLLoader_js.STLLoader(manager);
          loader.load(path, function (geom) {
            var mesh = new THREE__namespace.Mesh(geom, new THREE__namespace.MeshPhongMaterial());
            done(mesh);
          });
        } else if (/\.dae$/i.test(path)) {
          var _loader = new ColladaLoader_js.ColladaLoader(manager);
          _loader.load(path, function (dae) {
            return done(dae.scene);
          });
        } else {
          console.warn("URDFLoader: Could not load model at ".concat(path, ".\nNo loader available"));
        }
      }
    }]);
  }();
  ;

  var tempVec2 = new THREE__namespace.Vector2();
  var emptyRaycast = function emptyRaycast() {};

  // urdf-viewer element
  // Loads and displays a 3D view of a URDF-formatted robot

  // Events
  // urdf-change: Fires when the URDF has finished loading and getting processed
  // urdf-processed: Fires when the URDF has finished loading and getting processed
  // geometry-loaded: Fires when all the geometry has been fully loaded
  // ignore-limits-change: Fires when the 'ignore-limits' attribute changes
  // angle-change: Fires when an angle changes
  var URDFViewer = /*#__PURE__*/function (_HTMLElement) {
    /* Lifecycle Functions */
    function URDFViewer() {
      var _this;
      _classCallCheck(this, URDFViewer);
      _this = _callSuper(this, URDFViewer);
      _this._requestId = 0;
      _this._dirty = false;
      _this._loadScheduled = false;
      _this.robot = null;
      _this.loadMeshFunc = null;
      _this.urlModifierFunc = null;

      // Scene setup
      var scene = new THREE__namespace.Scene();
      var ambientLight = new THREE__namespace.HemisphereLight(_this.ambientColor, '#000');
      ambientLight.groundColor.lerp(ambientLight.color, 0.5 * Math.PI);
      ambientLight.intensity = 0.5;
      ambientLight.position.set(0, 1, 0);
      scene.add(ambientLight);

      // Light setup
      var dirLight = new THREE__namespace.DirectionalLight(0xffffff, Math.PI);
      dirLight.position.set(4, 10, 1);
      dirLight.shadow.mapSize.width = 2048;
      dirLight.shadow.mapSize.height = 2048;
      dirLight.shadow.normalBias = 0.001;
      dirLight.castShadow = true;
      scene.add(dirLight);
      scene.add(dirLight.target);

      // Renderer setup
      var renderer = new THREE__namespace.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setClearColor(0xffffff);
      renderer.setClearAlpha(0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE__namespace.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE__namespace.SRGBColorSpace;

      // Camera setup
      var camera = new THREE__namespace.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = -10;

      // World setup
      var world = new THREE__namespace.Object3D();
      scene.add(world);
      var plane = new THREE__namespace.Mesh(new THREE__namespace.PlaneGeometry(40, 40), new THREE__namespace.ShadowMaterial({
        side: THREE__namespace.DoubleSide,
        transparent: true,
        opacity: 0.25
      }));
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -0.5;
      plane.receiveShadow = true;
      plane.scale.set(10, 10, 10);
      scene.add(plane);

      // Controls setup
      var controls = new OrbitControls_js.OrbitControls(camera, renderer.domElement);
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
      _this._collisionMaterial = new THREE.MeshPhongMaterial({
        transparent: true,
        opacity: 0.35,
        shininess: 2.5,
        premultipliedAlpha: true,
        color: 0xffbe38,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      });
      var _renderLoop = function _renderLoop() {
        if (_this.parentNode) {
          _this.updateSize();
          if (_this._dirty || _this.autoRedraw) {
            if (!_this.noAutoRecenter) {
              _this._updateEnvironment();
            }
            _this.renderer.render(scene, camera);
            _this._dirty = false;
          }

          // update controls after the environment in
          // case the controls are retargeted
          _this.controls.update();
        }
        _this._renderLoopId = requestAnimationFrame(_renderLoop);
      };
      _renderLoop();
      return _this;
    }
    _inherits(URDFViewer, _HTMLElement);
    return _createClass(URDFViewer, [{
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
        return this.getAttribute('ambient-color') || '#8ea0a8';
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
      key: "showCollision",
      get: function get() {
        return this.hasAttribute('show-collision') || false;
      },
      set: function set(val) {
        val ? this.setAttribute('show-collision', true) : this.removeAttribute('show-collision');
      }
    }, {
      key: "jointValues",
      get: function get() {
        var values = {};
        if (this.robot) {
          for (var name in this.robot.joints) {
            var joint = this.robot.joints[name];
            values[name] = joint.jointValue.length === 1 ? joint.angle : _toConsumableArray(joint.jointValue);
          }
        }
        return values;
      },
      set: function set(val) {
        this.setJointValues(val);
      }
    }, {
      key: "angles",
      get: function get() {
        return this.jointValues;
      },
      set: function set(v) {
        this.jointValues = v;
      }
    }, {
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
        }

        // add the renderer
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
        this._updateCollisionVisibility();
        if (!this.noAutoRecenter) {
          this.recenter();
        }
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
        var currSize = r.getSize(tempVec2);
        if (currSize.width !== w || currSize.height !== h) {
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
      }

      // Set the joint with jointName to
      // angle in degrees
    }, {
      key: "setJointValue",
      value: function setJointValue(jointName) {
        var _this$robot$joints$jo;
        if (!this.robot) return;
        if (!this.robot.joints[jointName]) return;
        for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }
        if ((_this$robot$joints$jo = this.robot.joints[jointName]).setJointValue.apply(_this$robot$joints$jo, values)) {
          this.redraw();
          this.dispatchEvent(new CustomEvent('angle-change', {
            bubbles: true,
            cancelable: true,
            detail: jointName
          }));
        }
      }
    }, {
      key: "setJointValues",
      value: function setJointValues(values) {
        for (var name in values) this.setJointValue(name, values[name]);
      }

      /* Private Functions */
      // Updates the position of the plane to be at the
      // lowest point below the robot and focuses the
      // camera on the center of the scene
    }, {
      key: "_updateEnvironment",
      value: function _updateEnvironment() {
        var robot = this.robot;
        if (!robot) return;
        this.world.updateMatrixWorld();
        var bbox = new THREE__namespace.Box3();
        bbox.makeEmpty();
        robot.traverse(function (c) {
          if (c.isURDFVisual) {
            bbox.expandByObject(c);
          }
        });
        var center = bbox.getCenter(new THREE__namespace.Vector3());
        this.controls.target.y = center.y;
        this.plane.position.y = bbox.min.y - 1e-3;
        var dirLight = this.directionalLight;
        dirLight.castShadow = this.displayShadow;
        if (this.displayShadow) {
          // Update the shadow camera rendering bounds to encapsulate the
          // model. We use the bounding sphere of the bounding box for
          // simplicity -- this could be a tighter fit.
          var sphere = bbox.getBoundingSphere(new THREE__namespace.Sphere());
          var minmax = sphere.radius;
          var cam = dirLight.shadow.camera;
          cam.left = cam.bottom = -minmax;
          cam.right = cam.top = minmax;

          // Update the camera to focus on the center of the model so the
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
        this._prevload = "".concat(this["package"], "|").concat(this.urdf);

        // if we're already waiting on a load then early out
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
      }

      // Watch the package and urdf field and load the robot model.
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
                    if (m instanceof THREE__namespace.MeshBasicMaterial) {
                      m = new THREE__namespace.MeshPhongMaterial();
                    }
                    if (m.map) {
                      m.map.colorSpace = THREE__namespace.SRGBColorSpace;
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
          var manager = new THREE__namespace.LoadingManager();
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
            _this4._updateCollisionVisibility();
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
          var loader = new URDFLoader(manager);
          loader.packages = pkg;
          loader.loadMeshCb = this.loadMeshFunc;
          loader.fetchOptions = {
            mode: 'cors',
            credentials: 'same-origin'
          };
          loader.parseCollision = true;
          loader.load(urdf, function (model) {
            return robot = model;
          });
        }
      }
    }, {
      key: "_updateCollisionVisibility",
      value: function _updateCollisionVisibility() {
        var showCollision = this.showCollision;
        var collisionMaterial = this._collisionMaterial;
        var robot = this.robot;
        if (robot === null) return;
        var colliders = [];
        robot.traverse(function (c) {
          if (c.isURDFCollider) {
            c.visible = showCollision;
            colliders.push(c);
          }
        });
        colliders.forEach(function (coll) {
          coll.traverse(function (c) {
            if (c.isMesh) {
              c.raycast = emptyRaycast;
              c.material = collisionMaterial;
              c.castShadow = false;
            }
          });
        });
      }

      // Watch the coordinate frame and update the
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
      }

      // Updates the current robot's angles to ignore
      // joint limits or not
    }, {
      key: "_setIgnoreLimits",
      value: function _setIgnoreLimits(ignore) {
        var dispatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        if (this.robot) {
          Object.values(this.robot.joints).forEach(function (joint) {
            joint.ignoreLimits = ignore;
            joint.setJointValue.apply(joint, _toConsumableArray(joint.jointValue));
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
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['package', 'urdf', 'up', 'display-shadow', 'ambient-color', 'ignore-limits', 'show-collision'];
      }
    }]);
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
  ;

  return URDFViewer;

}));
//# sourceMappingURL=urdf-viewer-element.js.map
