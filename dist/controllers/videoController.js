"use strict";

function _typeof(o) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              "function" == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? "symbol"
              : typeof o;
          }),
    _typeof(o)
  );
}
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.watch =
  exports.search =
  exports.registerView =
  exports.postUpload =
  exports.postEdit =
  exports.home =
  exports.getUpload =
  exports.getPresignedUrl =
  exports.getEdit =
  exports.finalizeUpload =
  exports.deleteVideo =
  exports.deleteComment =
  exports.createComment =
    void 0;
var _Video = _interopRequireDefault(require("../models/Video"));
var _Comment = _interopRequireDefault(require("../models/Comment"));
var _User = _interopRequireDefault(require("../models/User"));
var _awsSdk = _interopRequireDefault(require("aws-sdk"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return e;
    };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o =
      Object.defineProperty ||
      function (t, e, r) {
        t[e] = r.value;
      },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return (
      Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      t[e]
    );
  }
  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return (t[e] = r);
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return { type: "normal", arg: t.call(e, r) };
    } catch (t) {
      return { type: "throw", arg: t };
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
  var g =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(p));
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
        return h && "object" == _typeof(h) && n.call(h, "__await")
          ? e.resolve(h.__await).then(
              function (t) {
                invoke("next", t, i, a);
              },
              function (t) {
                invoke("throw", t, i, a);
              }
            )
          : e.resolve(h).then(
              function (t) {
                (u.value = t), i(u);
              },
              function (t) {
                return invoke("throw", t, i, a);
              }
            );
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return (r = r
          ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return { value: t, done: !0 };
      }
      for (n.method = i, n.arg = a; ; ) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;
        else if ("throw" === n.method) {
          if (o === h) throw ((o = s), n.arg);
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (((o = n.done ? s : l), p.arg === y)) continue;
          return { value: p.arg, done: n.done };
        }
        "throw" === p.type && ((o = s), (n.method = "throw"), (n.arg = p.arg));
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t)
      return (
        (r.delegate = null),
        ("throw" === n &&
          e.iterator["return"] &&
          ((r.method = "return"),
          (r.arg = t),
          maybeInvokeDelegate(e, r),
          "throw" === r.method)) ||
          ("return" !== n &&
            ((r.method = "throw"),
            (r.arg = new TypeError(
              "The iterator does not provide a '" + n + "' method"
            )))),
        y
      );
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type)
      return (r.method = "throw"), (r.arg = i.arg), (r.delegate = null), y;
    var a = i.arg;
    return a
      ? a.done
        ? ((r[e.resultName] = a.value),
          (r.next = e.nextLoc),
          "return" !== r.method && ((r.method = "next"), (r.arg = t)),
          (r.delegate = null),
          y)
        : a
      : ((r.method = "throw"),
        (r.arg = new TypeError("iterator result is not an object")),
        (r.delegate = null),
        y);
  }
  function pushTryEntry(t) {
    var e = { tryLoc: t[0] };
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    (e.type = "normal"), delete e.arg, (t.completion = e);
  }
  function Context(t) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      t.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length; )
              if (n.call(e, o))
                return (next.value = e[o]), (next.done = !1), next;
            return (next.value = t), (next.done = !0), next;
          };
        return (i.next = i);
      }
    }
    throw new TypeError(_typeof(e) + " is not iterable");
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    o(g, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    o(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      u,
      "GeneratorFunction"
    )),
    (e.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return (
        !!e &&
        (e === GeneratorFunction ||
          "GeneratorFunction" === (e.displayName || e.name))
      );
    }),
    (e.mark = function (t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, GeneratorFunctionPrototype)
          : ((t.__proto__ = GeneratorFunctionPrototype),
            define(t, u, "GeneratorFunction")),
        (t.prototype = Object.create(g)),
        t
      );
    }),
    (e.awrap = function (t) {
      return { __await: t };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, c, function () {
      return this;
    }),
    (e.AsyncIterator = AsyncIterator),
    (e.async = function (t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r)
        ? a
        : a.next().then(function (t) {
            return t.done ? t.value : a.next();
          });
    }),
    defineIteratorMethods(g),
    define(g, u, "Generator"),
    define(g, a, function () {
      return this;
    }),
    define(g, "toString", function () {
      return "[object Generator]";
    }),
    (e.keys = function (t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return (
        r.reverse(),
        function next() {
          for (; r.length; ) {
            var t = r.pop();
            if (t in e) return (next.value = t), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (e.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(e) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = t),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = t),
          this.tryEntries.forEach(resetTryEntry),
          !e)
        )
          for (var r in this)
            "t" === r.charAt(0) &&
              n.call(this, r) &&
              !isNaN(+r.slice(1)) &&
              (this[r] = t);
      },
      stop: function stop() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return (
            (a.type = "throw"),
            (a.arg = e),
            (r.next = n),
            o && ((r.method = "next"), (r.arg = t)),
            !!o
          );
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
      abrupt: function abrupt(t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (
            o.tryLoc <= this.prev &&
            n.call(o, "finallyLoc") &&
            this.prev < o.finallyLoc
          ) {
            var i = o;
            break;
          }
        }
        i &&
          ("break" === t || "continue" === t) &&
          i.tryLoc <= e &&
          e <= i.finallyLoc &&
          (i = null);
        var a = i ? i.completion : {};
        return (
          (a.type = t),
          (a.arg = e),
          i
            ? ((this.method = "next"), (this.next = i.finallyLoc), y)
            : this.complete(a)
        );
      },
      complete: function complete(t, e) {
        if ("throw" === t.type) throw t.arg;
        return (
          "break" === t.type || "continue" === t.type
            ? (this.next = t.arg)
            : "return" === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === t.type && e && (this.next = e),
          y
        );
      },
      finish: function finish(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t)
            return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function _catch(t) {
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
      delegateYield: function delegateYield(e, r, n) {
        return (
          (this.delegate = { iterator: values(e), resultName: r, nextLoc: n }),
          "next" === this.method && (this.arg = t),
          y
        );
      },
    }),
    e
  );
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
// AWS S3 설정
_awsSdk["default"].config.update({
  region: "ap-northeast-2",
  // 원하는 리전으로 변경
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});
var s3 = new _awsSdk["default"].S3();
var BUCKET_NAME = "wetube-darren"; // 버킷 이름

// S3 Presigned URL 생성 함수
var generateUploadPresignedUrl = /*#__PURE__*/ (function () {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee(
      fileType,
      fileName,
      contentType
    ) {
      var fileExtension, uniqueKey, params, url;
      return _regeneratorRuntime().wrap(
        function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                // 파일 확장자 추출
                fileExtension = fileName.split(".").pop(); // 사용자 ID와 타임스탬프로 유니크한 키 생성
                uniqueKey = ""
                  .concat(fileType, "/")
                  .concat(Date.now(), "_")
                  .concat(Math.random().toString(36).substring(2, 12), ".")
                  .concat(fileExtension);
                params = {
                  Bucket: BUCKET_NAME,
                  Key: uniqueKey,
                  ContentType: contentType,
                  ACL: "public-read",
                  Expires: 60 * 5, // 5분
                };
                _context.prev = 3;
                _context.next = 6;
                return s3.getSignedUrlPromise("putObject", params);
              case 6:
                url = _context.sent;
                return _context.abrupt("return", {
                  url: url,
                  fileUrl: "https://"
                    .concat(BUCKET_NAME, ".s3.amazonaws.com/")
                    .concat(uniqueKey),
                });
              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](3);
                throw _context.t0;
              case 14:
              case "end":
                return _context.stop();
            }
        },
        _callee,
        null,
        [[3, 10]]
      );
    })
  );
  return function generateUploadPresignedUrl(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
var home = (exports.home = /*#__PURE__*/ (function () {
  var _ref2 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2(req, res) {
      var videos;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1)
          switch ((_context2.prev = _context2.next)) {
            case 0:
              _context2.next = 2;
              return _Video["default"]
                .find({})
                .sort({
                  createdAt: "desc",
                })
                .populate("owner");
            case 2:
              videos = _context2.sent;
              return _context2.abrupt(
                "return",
                res.render("home", {
                  pageTitle: "Home",
                  videos: videos,
                })
              );
            case 4:
            case "end":
              return _context2.stop();
          }
      }, _callee2);
    })
  );
  return function home(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})());
var watch = (exports.watch = /*#__PURE__*/ (function () {
  var _ref3 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(req, res) {
      var id, video;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1)
          switch ((_context3.prev = _context3.next)) {
            case 0:
              id = req.params.id;
              _context3.next = 3;
              return _Video["default"]
                .findById(id)
                .populate("owner")
                .populate("comments");
            case 3:
              video = _context3.sent;
              if (video) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt(
                "return",
                res.render("404", {
                  pageTitle: "Video not found.",
                })
              );
            case 7:
              return _context3.abrupt(
                "return",
                res.render("watch", {
                  pageTitle: video.title,
                  video: video,
                })
              );
            case 8:
            case "end":
              return _context3.stop();
          }
      }, _callee3);
    })
  );
  return function watch(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
})());
var getEdit = (exports.getEdit = /*#__PURE__*/ (function () {
  var _ref4 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee4(req, res) {
      var id, _id, video;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1)
          switch ((_context4.prev = _context4.next)) {
            case 0:
              id = req.params.id;
              _id = req.session.user._id;
              _context4.next = 4;
              return _Video["default"].findById(id);
            case 4:
              video = _context4.sent;
              if (video) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt(
                "return",
                res.status(404).render("404", {
                  pageTitle: "Video not found.",
                })
              );
            case 7:
              if (!(String(video.owner) !== String(_id))) {
                _context4.next = 10;
                break;
              }
              req.flash("error", "Not authorized");
              return _context4.abrupt("return", res.status(403).redirect("/"));
            case 10:
              return _context4.abrupt(
                "return",
                res.render("edit", {
                  pageTitle: "Edit: ".concat(video.title),
                  video: video,
                })
              );
            case 11:
            case "end":
              return _context4.stop();
          }
      }, _callee4);
    })
  );
  return function getEdit(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
})());
var postEdit = (exports.postEdit = /*#__PURE__*/ (function () {
  var _ref5 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee5(req, res) {
      var _id, id, _req$body, title, description, hashtags, video;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1)
          switch ((_context5.prev = _context5.next)) {
            case 0:
              _id = req.session.user._id;
              id = req.params.id;
              (_req$body = req.body),
                (title = _req$body.title),
                (description = _req$body.description),
                (hashtags = _req$body.hashtags);
              _context5.next = 5;
              return _Video["default"].findById(id);
            case 5:
              video = _context5.sent;
              if (video) {
                _context5.next = 8;
                break;
              }
              return _context5.abrupt(
                "return",
                res.status(404).render("404", {
                  pageTitle: "Video not found.",
                })
              );
            case 8:
              if (!(String(video.owner) !== String(_id))) {
                _context5.next = 11;
                break;
              }
              req.flash("error", "You are not the the owner of the video.");
              return _context5.abrupt("return", res.status(403).redirect("/"));
            case 11:
              _context5.next = 13;
              return _Video["default"].findByIdAndUpdate(id, {
                title: title,
                description: description,
                hashtags: _Video["default"].formatHashtags(hashtags),
              });
            case 13:
              return _context5.abrupt(
                "return",
                res.redirect("/videos/".concat(id))
              );
            case 14:
            case "end":
              return _context5.stop();
          }
      }, _callee5);
    })
  );
  return function postEdit(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
})());
var getUpload = (exports.getUpload = function getUpload(req, res) {
  return res.render("upload", {
    pageTitle: "Upload Video",
  });
});
var postUpload = (exports.postUpload = /*#__PURE__*/ (function () {
  var _ref6 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee6(req, res) {
      var _id,
        _req$files,
        video,
        thumb,
        _req$body2,
        title,
        description,
        hashtags,
        newVideo,
        user;
      return _regeneratorRuntime().wrap(
        function _callee6$(_context6) {
          while (1)
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _id = req.session.user._id;
                (_req$files = req.files),
                  (video = _req$files.video),
                  (thumb = _req$files.thumb);
                (_req$body2 = req.body),
                  (title = _req$body2.title),
                  (description = _req$body2.description),
                  (hashtags = _req$body2.hashtags);
                _context6.prev = 3;
                _context6.next = 6;
                return _Video["default"].create({
                  title: title,
                  description: description,
                  fileUrl: video[0].location,
                  thumbUrl: thumb[0].location,
                  owner: _id,
                  hashtags: _Video["default"].formatHashtags(hashtags),
                });
              case 6:
                newVideo = _context6.sent;
                _context6.next = 9;
                return _User["default"].findById(_id);
              case 9:
                user = _context6.sent;
                user.videos.push(newVideo._id);
                user.save();
                return _context6.abrupt("return", res.redirect("/"));
              case 15:
                _context6.prev = 15;
                _context6.t0 = _context6["catch"](3);
                return _context6.abrupt(
                  "return",
                  res.status(400).render("upload", {
                    pageTitle: "Upload Video",
                    errorMessage: _context6.t0._message,
                  })
                );
              case 18:
              case "end":
                return _context6.stop();
            }
        },
        _callee6,
        null,
        [[3, 15]]
      );
    })
  );
  return function postUpload(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
})());
var deleteVideo = (exports.deleteVideo = /*#__PURE__*/ (function () {
  var _ref7 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee7(req, res) {
      var id, _id, video;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1)
          switch ((_context7.prev = _context7.next)) {
            case 0:
              id = req.params.id;
              _id = req.session.user._id;
              _context7.next = 4;
              return _Video["default"].findById(id);
            case 4:
              video = _context7.sent;
              if (video) {
                _context7.next = 7;
                break;
              }
              return _context7.abrupt(
                "return",
                res.status(404).render("404", {
                  pageTitle: "Video not found.",
                })
              );
            case 7:
              if (!(String(video.owner) !== String(_id))) {
                _context7.next = 9;
                break;
              }
              return _context7.abrupt("return", res.status(403).redirect("/"));
            case 9:
              _context7.next = 11;
              return _Video["default"].findByIdAndDelete(id);
            case 11:
              return _context7.abrupt("return", res.redirect("/"));
            case 12:
            case "end":
              return _context7.stop();
          }
      }, _callee7);
    })
  );
  return function deleteVideo(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
})());
var search = (exports.search = /*#__PURE__*/ (function () {
  var _ref8 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee8(req, res) {
      var keyword, videos;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1)
          switch ((_context8.prev = _context8.next)) {
            case 0:
              keyword = req.query.keyword;
              videos = [];
              if (!keyword) {
                _context8.next = 6;
                break;
              }
              _context8.next = 5;
              return _Video["default"]
                .find({
                  title: {
                    $regex: new RegExp("".concat(keyword, "$"), "i"),
                  },
                })
                .populate("owner");
            case 5:
              videos = _context8.sent;
            case 6:
              return _context8.abrupt(
                "return",
                res.render("search", {
                  pageTitle: "Search",
                  videos: videos,
                })
              );
            case 7:
            case "end":
              return _context8.stop();
          }
      }, _callee8);
    })
  );
  return function search(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
})());
var registerView = (exports.registerView = /*#__PURE__*/ (function () {
  var _ref9 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee9(req, res) {
      var id, video;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1)
          switch ((_context9.prev = _context9.next)) {
            case 0:
              id = req.params.id;
              _context9.next = 3;
              return _Video["default"].findById(id);
            case 3:
              video = _context9.sent;
              if (video) {
                _context9.next = 6;
                break;
              }
              return _context9.abrupt("return", res.sendStatus(404));
            case 6:
              video.meta.views = video.meta.views + 1;
              _context9.next = 9;
              return video.save();
            case 9:
              return _context9.abrupt("return", res.sendStatus(200));
            case 10:
            case "end":
              return _context9.stop();
          }
      }, _callee9);
    })
  );
  return function registerView(_x18, _x19) {
    return _ref9.apply(this, arguments);
  };
})());
var createComment = (exports.createComment = /*#__PURE__*/ (function () {
  var _ref10 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee10(req, res) {
      var user, text, id, video, comment;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1)
          switch ((_context10.prev = _context10.next)) {
            case 0:
              (user = req.session.user),
                (text = req.body.text),
                (id = req.params.id);
              _context10.next = 3;
              return _Video["default"].findById(id);
            case 3:
              video = _context10.sent;
              if (video) {
                _context10.next = 6;
                break;
              }
              return _context10.abrupt("return", res.sendStatus(404));
            case 6:
              _context10.next = 8;
              return _Comment["default"].create({
                text: text,
                owner: user._id,
                video: id,
              });
            case 8:
              comment = _context10.sent;
              video.comments.push(comment._id);
              video.save();
              return _context10.abrupt(
                "return",
                res.status(201).json({
                  newCommentId: comment._id,
                })
              );
            case 12:
            case "end":
              return _context10.stop();
          }
      }, _callee10);
    })
  );
  return function createComment(_x20, _x21) {
    return _ref10.apply(this, arguments);
  };
})());
var deleteComment = (exports.deleteComment = /*#__PURE__*/ (function () {
  var _ref11 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee11(req, res) {
      var id, _id, comment, video;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1)
          switch ((_context11.prev = _context11.next)) {
            case 0:
              (id = req.params.id), (_id = req.session.user._id);
              _context11.next = 3;
              return _Comment["default"].findById(id);
            case 3:
              comment = _context11.sent;
              _context11.next = 6;
              return _Video["default"].findById(comment.video);
            case 6:
              video = _context11.sent;
              if (comment) {
                _context11.next = 9;
                break;
              }
              return _context11.abrupt("return", res.sendStatus(404));
            case 9:
              if (!(String(comment.owner) !== String(_id))) {
                _context11.next = 11;
                break;
              }
              return _context11.abrupt("return", res.sendStatus(403));
            case 11:
              _context11.next = 13;
              return _Comment["default"].findByIdAndDelete(id);
            case 13:
              video.comments.pull(id);
              video.save();
              return _context11.abrupt("return", res.sendStatus(200));
            case 16:
            case "end":
              return _context11.stop();
          }
      }, _callee11);
    })
  );
  return function deleteComment(_x22, _x23) {
    return _ref11.apply(this, arguments);
  };
})());

// presigned URL 생성 함수 (추가)
var getPresignedUrl = (exports.getPresignedUrl = /*#__PURE__*/ (function () {
  var _ref12 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee12(req, res) {
      var _req$body3,
        fileType,
        fileName,
        contentType,
        folder,
        _yield$generateUpload,
        url,
        fileUrl;
      return _regeneratorRuntime().wrap(
        function _callee12$(_context12) {
          while (1)
            switch ((_context12.prev = _context12.next)) {
              case 0:
                _context12.prev = 0;
                (_req$body3 = req.body),
                  (fileType = _req$body3.fileType),
                  (fileName = _req$body3.fileName),
                  (contentType = _req$body3.contentType);
                if (!(!fileType || !fileName || !contentType)) {
                  _context12.next = 4;
                  break;
                }
                return _context12.abrupt(
                  "return",
                  res.status(400).json({
                    success: false,
                    message: "필수 정보가 누락되었습니다.",
                  })
                );
              case 4:
                folder = fileType === "video" ? "videos" : "thumbnails";
                _context12.next = 7;
                return generateUploadPresignedUrl(
                  folder,
                  fileName,
                  contentType
                );
              case 7:
                _yield$generateUpload = _context12.sent;
                url = _yield$generateUpload.url;
                fileUrl = _yield$generateUpload.fileUrl;
                return _context12.abrupt(
                  "return",
                  res.status(200).json({
                    success: true,
                    presignedUrl: url,
                    fileUrl: fileUrl,
                  })
                );
              case 13:
                _context12.prev = 13;
                _context12.t0 = _context12["catch"](0);
                return _context12.abrupt(
                  "return",
                  res.status(500).json({
                    success: false,
                    message: "URL 생성 중 오류가 발생했습니다.",
                  })
                );
              case 17:
              case "end":
                return _context12.stop();
            }
        },
        _callee12,
        null,
        [[0, 13]]
      );
    })
  );
  return function getPresignedUrl(_x24, _x25) {
    return _ref12.apply(this, arguments);
  };
})());

// 비디오 등록 완료 함수 (추가)
var finalizeUpload = (exports.finalizeUpload = /*#__PURE__*/ (function () {
  var _ref13 = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee13(req, res) {
      var _id,
        _req$body4,
        title,
        description,
        hashtags,
        videoUrl,
        thumbUrl,
        newVideo,
        user;
      return _regeneratorRuntime().wrap(
        function _callee13$(_context13) {
          while (1)
            switch ((_context13.prev = _context13.next)) {
              case 0:
                _context13.prev = 0;
                _id = req.session.user._id;
                (_req$body4 = req.body),
                  (title = _req$body4.title),
                  (description = _req$body4.description),
                  (hashtags = _req$body4.hashtags),
                  (videoUrl = _req$body4.videoUrl),
                  (thumbUrl = _req$body4.thumbUrl);
                if (!(!videoUrl || !thumbUrl)) {
                  _context13.next = 5;
                  break;
                }
                return _context13.abrupt(
                  "return",
                  res.status(400).json({
                    success: false,
                    message: "비디오와 섬네일 URL이 필요합니다.",
                  })
                );
              case 5:
                _context13.next = 7;
                return _Video["default"].create({
                  title: title,
                  description: description,
                  fileUrl: videoUrl,
                  thumbUrl: thumbUrl,
                  owner: _id,
                  hashtags: _Video["default"].formatHashtags(hashtags),
                });
              case 7:
                newVideo = _context13.sent;
                _context13.next = 10;
                return _User["default"].findById(_id);
              case 10:
                user = _context13.sent;
                user.videos.push(newVideo._id);
                _context13.next = 14;
                return user.save();
              case 14:
                return _context13.abrupt(
                  "return",
                  res.status(201).json({
                    success: true,
                    videoId: newVideo._id,
                  })
                );
              case 17:
                _context13.prev = 17;
                _context13.t0 = _context13["catch"](0);
                return _context13.abrupt(
                  "return",
                  res.status(500).json({
                    success: false,
                    message:
                      _context13.t0._message ||
                      "비디오 등록 중 오류가 발생했습니다.",
                  })
                );
              case 21:
              case "end":
                return _context13.stop();
            }
        },
        _callee13,
        null,
        [[0, 17]]
      );
    })
  );
  return function finalizeUpload(_x26, _x27) {
    return _ref13.apply(this, arguments);
  };
})());
