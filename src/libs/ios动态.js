window.DYNAMIC_KEY = 'ios_dongtai';
window.IAP_KEY = 'iap';
speed.domEnd = +new Date();
speed.cssEnd = +new Date();
document.body.setAttribute('id', 'global');
var BJ_REPORT = function (e) {
   if (e.BJ_REPORT) return e.BJ_REPORT;
   var t = [],
       r = {
          id: 0,
          uin: 0,
          url: "",
          combo: 1,
          ext: null,
          level: 4,
          ignore: [],
          random: 1,
          delay: 1e3,
          submit: null
       },
       n = function (e, t) {
          return Object.prototype.toString.call(e) === "[object " + (t || "Object") + "]"
       },
       o = function (e) {
          var t = typeof e;
          return "object" === t && !! e
       },
       i = function (e) {
          return null === e ? !0 : n(e, "Number") ? !1 : !e
       },
       a = e.onerror;
   e.onerror = function (t, r, o, i, u) {
      if (!/kaoyanclub-android/.test(navigator.userAgent.toLowerCase())) {
         var s = t;
         u && u.stack && (s = c(u)),
         n(s, "Event") && (s += s.type ? "--" + s.type + "--" + (s.target ? s.target.tagName + "::" + s.target.src : "") : ""),
             d.push({
                msg: s,
                target: r,
                rowNum: o,
                colNum: i
             }),
             g(),
         a && a.apply(e, arguments)
      }
   };
   var u = function (e) {
          try {
             if (e.stack) {
                var t = e.stack.match("https?://[^\n]+");
                t = t ? t[0] : "";
                var r = t.match(":(\\d+):(\\d+)");
                r || (r = [0, 0, 0]);
                var n = c(e);
                return {
                   msg: n,
                   rowNum: r[1],
                   colNum: r[2],
                   target: t.replace(r[0], "")
                }
             }
             return e.name && e.message && e.description ? {
                    msg: JSON.stringify(e)
                 } : e
          } catch (o) {
             return e
          }
       },
       c = function (e) {
          var t = e.stack.replace(/\n/gi, "").split(/\bat\b/).slice(0, 5).join("@").replace(/\?[^:]+/gi, ""),
              r = e.toString();
          return t.indexOf(r) < 0 && (t = r + "@" + t),
              t
       },
       s = function (e, t) {
          var n = [],
              a = [],
              u = [];
          if (o(e)) {
             e.level = e.level || r.level;
             for (var c in e) {
                var s = e[c];
                if (!i(s)) {
                   if (o(s)) try {
                      s = JSON.stringify(s)
                   } catch (l) {
                      s = "[BJ_REPORT detect value stringify error] " + l.toString()
                   }
                   u.push(c + ":" + s),
                       n.push(c + "=" + encodeURIComponent(s)),
                       a.push(c + "[" + t + "]=" + encodeURIComponent(s))
                }
             }
          }
          return [a.join("&"), u.join(","), n.join("&")]
       },
       l = [],
       f = function (e) {
          if (r.submit) r.submit(e);
          else {
             var t = new Image;
             l.push(t),
                 t.src = e
          }
       },
       m = [],
       p = 0,
       g = function (e) {
          if (r.report) {
             for (; t.length;) {
                var o = !1,
                    i = t.shift(),
                    a = s(i, m.length);
                if (n(r.ignore, "Array")) for (var u = 0, c = r.ignore.length; c > u; u++) {
                   var l = r.ignore[u];
                   if (n(l, "RegExp") && l.test(a[1]) || n(l, "Function") && l(i, a[1])) {
                      o = !0;
                      break
                   }
                }
                o || (r.combo ? m.push(a[0]) : f(r.report + a[2] + "&_t=" + +new Date), r.onReport && r.onReport(r.id, i))
             }
             var g = m.length;
             if (g) {
                var d = function () {
                   clearTimeout(p),
                       f(r.report + m.join("&") + "&count=" + m.length + "&_t=" + +new Date),
                       p = 0,
                       m = []
                };
                e ? d() : p || (p = setTimeout(d, r.delay))
             }
          }
       },
       d = {
          push: function (e) {
             if (Math.random() >= r.random) return d;
             var n = o(e) ? u(e) : {
                    msg: e
                 };
             return r.ext && !n.ext && (n.ext = r.ext),
                 t.push(n),
                 g(),
                 d
          },
          report: function (e) {
             return e && d.push(e),
                 g(!0),
                 d
          },
          info: function (e) {
             return e ? (o(e) ? e.level = 2 : e = {
                        msg: e,
                        level: 2
                     }, d.push(e), d) : d
          },
          debug: function (e) {
             return e ? (o(e) ? e.level = 1 : e = {
                        msg: e,
                        level: 1
                     }, d.push(e), d) : d
          },
          init: function (e) {
             if (o(e)) for (var t in e) r[t] = e[t];
             var n = parseInt(r.id, 10);
             return n && (/qq\.com$/gi.test(location.hostname) && (r.url || (r.url = "//badjs2.qq.com/badjs"), r.uin || (r.uin = parseInt((document.cookie.match(/\bp_uin=\D+(\d+)/) || [])[1] || (document.cookie.match(/\buin=\D+(\d+)/) || [])[1], 10))), r.report = (r.url || "/badjs") + "?id=" + n + "&uin=" + r.uin + "&from=" + encodeURIComponent(location.href) + "&"),
                 d
          },
          __onerror__: e.onerror
       };
   return "undefined" != typeof console && console.error && setTimeout(function () {
      var e = ((location.hash || "").match(/([#&])BJ_ERROR=([^&$]+)/) || [])[2];
      e && console.error("BJ_ERROR", decodeURIComponent(e).replace(/(:\d+:\d+)\s*/g, "$1\n"))
   }, 0),
       d
}(window);;
"use strict";
var monitor = function () {
   function n() {
      if (o.length) {
         var n = new Image;
         n.onload = n.onerror = function () {
            n = null
         },
             n.src = t.url + "?monitors=[" + o.join(",") + "]&_=" + o.join(",") + "&t=" + Math.random(),
             o = []
      }
   }
   function r(r) {
      if (r) {
         if (r instanceof Array) for (var e in r) r[e] && o.push(r[e]);
         else o.push(r);
         setTimeout(function () {
            n()
         }, t.delay)
      }
   }
   var o = [],
       t = {
          url: "//cgi.connect.qq.com/report/report_vm",
          delay: 100
       };
   return {
      defaults: t,
      report: r
   }
}();;
!
    function () {
       BJ_REPORT.init({
          id: 3,
          url: "//badjs2.qq.com/badjs",
          ignore: [/QuotaExceededError:/, /_MQQ_CALLBACK_/, /WeixinJSBridge/, /iOSQQApi/, /hookhunantvByTimer/, /QzoneApp/, /daylightMode/, /diableNightMode/, /INVALID_STATE_ERR: DOM Exception 11/, /document.getElementById\('webVal'\)/, /adfilter_baidumusic/, /Can't find variable: bds/, /TypeError: Cannot read property 'name' of undefined/, /embed_mobile_V1\.js/, /Can't find variable: taobao/],
          level: 4,
          ext: {
             msid: 488003
          }
       })
    }();;
!
    function (n) {
       n.WIN_NAME = {
          get: function (n) {
             var e = window.name.match(new RegExp("(&?)" + n + "=([^&]*)(&?)"));
             return e ? decodeURIComponent(e[2]) : ""
          },
          set: function (n, e) {
             var o = n + "=" + e;
             window.name += window.name ? "&" + o : o
          }
       }
    }(this);;
var require, define;
!
    function (e) {
       function t(e, r, a) {
          if (!(e in s)) {
             s[e] = !0;
             var u = document.createElement("script"),
                 p = +new Date;
             return u.onload = function () {
                var t = +new Date - p;
                a && a.noReport || (a && a.reportPath && (window.tools ? window.tools.reportMM(a.reportPath, 0, t) : (window.MMReportDATA = window.MMReportDATA || [], window.MMReportDATA.push([a.reportPath, 0, t]))), (a || (a = {})) && (a.onloadReportInfo = {
                   url: a && a.reportPath ? a.reportPath : e,
                   ec: 0,
                   duration: t
                }), -1 != e.search(".js") && (-1 != e.search(n) ? setTimeout(function () {
                       monitor.report(526122)
                    }, 3e3) : setTimeout(function () {
                       monitor.report(2423517)
                    }, 3e3)))
             },
                 u.onerror = function () {
                    var i = +new Date - p;
                    r && r(),
                    -1 != e.indexOf(o) && t(e.replace(o, n), r, a),
                    a && a.noReport || (-1 == e.search(n) ? (setTimeout(function () {
                           a && a.reportPath && (window.tools ? window.tools.reportMM(a.reportPath, 1, i) : (window.MMReportDATA = window.MMReportDATA || [], window.MMReportDATA.push([a.reportPath, 1, i]))),
                               monitor.report(507884)
                        }, 3e3), (a || (a = {})) && (a.onloadReportInfo = {
                           url: a && a.reportPath ? a.reportPath : e,
                           ec: 1,
                           duration: i
                        })) : setTimeout(function () {
                           monitor.report(526123)
                        }, 3e3))
                 },
                 u.type = "text/javascript",
                 u.src = e,
             /^(https?:)?\/\/[7-9]\.url\.cn\//.test(e) && -1 == d.indexOf("educationapp") && u.setAttribute("crossOrigin", "anonymous"),
                 i.appendChild(u),
                 u
          }
       }
       function r(e, r, o) {
          var n = a[e] || (a[e] = []);
          n.push(r);
          var i, u = c[e] || {},
              p = u.pkg;
          i = p ? f[p].url : u.url || e,
          l[e] && (i = l[e]),
              t(i, o &&
                  function () {
                     o(e)
                  })
       }
       var o, n, i = document.getElementsByTagName("head")[0],
           a = {},
           u = {},
           p = {},
           s = {},
           c = {},
           f = {},
           l = {},
           d = navigator.userAgent.toLowerCase() || "";
       define = function (e, t, r) {
          void 0 === r && (r = t),
              u[e] = r;
          var o = a[e];
          if (o) {
             for (var n = 0, i = o.length; i > n; n++) o[n]();
             delete a[e]
          }
       },
           require = function (e) {
              e = require.alias(e);
              var t = p[e];
              if (t) return t.exports;
              var r = u[e];
              if (!r) throw "[ModJS] Cannot find module `" + e + "`";
              t = p[e] = {
                 exports: {}
              };
              var o = "function" == typeof r ? r.apply(t, [require, t.exports, t]) : r;
              return o && (t.exports = o),
                  t.exports
           },
           require.loadUrl = function (t, o, n) {
              function i() {
                 0 === a-- && o && o.apply(e)
              }
              "string" == typeof t && (t = [t]);
              for (var a = t.length, u = 0, p = t.length; p > u; ++u) r(t[u], i, n);
              i()
           },
           require.async = function (t, o, n) {
              function i(e) {
                 for (var t = 0, o = e.length; o > t; t++) {
                    var p = e[t];
                    if (!(p in u || p in f)) {
                       f[p] = !0,
                           l++,
                           r(p, a, n);
                       var s = c[p];
                       s && "deps" in s && i(s.deps)
                    }
                 }
              }
              function a() {
                 if (0 == l--) {
                    for (var r = [], n = 0, i = t.length; i > n; n++) r[n] = require(t[n]);
                    o && o.apply(e, r)
                 }
              }
              "string" == typeof t && (t = [t]);
              for (var p = 0, s = t.length; s > p; p++) t[p] = require.alias(t[p]);
              var f = {},
                  l = 0;
              i(t),
                  a()
           },
           require.resourceMap = function (e) {
              var t, r;
              r = e.res;
              for (t in r) r.hasOwnProperty(t) && (c[t] = r[t]);
              r = e.pkg;
              for (t in r) r.hasOwnProperty(t) && (f[t] = r[t])
           },
           require.loadJs = function (e) {
              t(e)
           },
           require.loadCss = function (e) {
              if (e.content) {
                 var t = document.createElement("style");
                 t.type = "text/css",
                     t.styleSheet ? t.styleSheet.cssText = e.content : t.innerHTML = e.content,
                     i.appendChild(t)
              } else if (e.url) {
                 var r = document.createElement("link");
                 r.href = e.url,
                     r.rel = "stylesheet",
                     r.type = "text/css",
                     i.appendChild(r)
              }
           },
           require.alias = function (e) {
              return e
           },
           require.timeout = 5e3,
           require.config = function (e) {
              o = e.cdnPath || o,
                  n = e.htdocsPath || n,
                  l = e.aliasMap || l
           };
       require.getData = function (e, r, o, n) {
          var i = "defineData" + Math.floor(1e4 * Math.random());
          e += (-1 != e.indexOf("?") ? "&" : "?") + "callback=" + i + "&_t=" + (new Date).getTime(),
              window[i] = function (e) {
                 setTimeout(function () {
                    r(e, n)
                 })
              },
              t(e, o, n)
       }
    }(this);;
require.config({
   cdnPath: "7.url.cn/edu",
   htdocsPath: "ke.qq.com",
   aliasMap: {
      tvp: "//imgcache.gtimg.cn/tencentvideo_v1/tvp/js/tvp.player_v2_zepto.js",
      tvp3: "//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js",
      tcp: "//imgcache.qq.com/open/qcloud/video/vcplayer/TcPlayer.js",
      smartpay: "//imgcache.gtimg.cn/club/platform/lib/pay/smartpay.js?_bid=193"
   }
});;
!
    function (t) {
       function e(t, e) {
          var n;
          for (n in e) t[n] = e[n]
       }
       function n(t) {
          return "function" == typeof t
       }
       function r(t, e) {
          return function () {
             try {
                return t.apply(this, e || arguments)
             } catch (n) {
                u(n)
             }
          }
       }
       function o(t) {
          return function () {
             for (var e, o = [], a = 0, c = arguments.length; c > a; a++) e = arguments[a],
             n(e) && (e = r(e)),
                 o.push(e);
             return t.apply(this, o)
          }
       }
       function a(t) {
          return function (e, n) {
             if ("string" == typeof e) try {
                e = new Function(e)
             } catch (o) {
                u(o)
             }
             var a = [].slice.call(arguments, 2);
             return e = r(e, a.length && a),
                 t(e, n)
          }
       }
       function c(t, e) {
          return function () {
             for (var o, a, c = [], i = 0, u = arguments.length; u > i; i++) o = arguments[i],
             n(o) && (a = r(o)) && (o.tryWrap = a) && (o = a),
                 c.push(o);
             return t.apply(e || this, c)
          }
       }
       function i(t) {
          var e, o;
          for (e in t) o = t[e],
          n(o) && (t[e] = r(o));
          return t
       }
       var u = function (e) {
          e = e || {},
          t.console && t.console.error && t.console.error(e),
              window.error = e,
              e.stack = e.stack || "",
          /kaoyanclub-android/.test(navigator.userAgent.toLowerCase()) || BJ_REPORT && BJ_REPORT.report(e.message + " " + e.stack.replace(/\n/g, " "))
       };
       try {
          badjsIngore()
       } catch (s) {
          if (!s.stack) return
       }
       t.setTimeout = a(t.setTimeout),
           t.setInterval = a(t.setInterval);
       var p = t.require.async,
           d = t.define;
       p && d && (t.require.async = o(p), e(t.require.async, p), t.define = o(d), e(t.define, d));
       var v = t.Async && t.Async.parallel;
       v && (t.Async.parallel = o(v), e(t.Async.parallel, v));
       try {
          !
              function () {
                 var t = document.addEventListener,
                     e = window.addEventListener;
                 try {
                    document.constructor.prototype.addEventListener = window.constructor.prototype.addEventListener = Element.prototype.addEventListener = !0
                 } catch (r) {
                    return monitor.report(615694),
                        document.constructor.prototype.addEventListener = Element.prototype.addEventListener = t,
                        void(window.constructor.prototype.addEventListener = e)
                 }
                 var o = document.removeEventListener,
                     a = window.removeEventListener;
                 document.constructor.prototype.addEventListener = Element.prototype.addEventListener = c(t),
                     window.constructor.prototype.addEventListener = c(e),
                     document.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = function () {
                        for (var t, e = [], r = 0, a = arguments.length; a > r; r++) t = arguments[r],
                        n(t) && (t = t.tryWrap),
                            e.push(t);
                        return o.apply(this, e)
                     },
                     window.constructor.prototype.removeEventListener = function () {
                        for (var t, e = [], r = 0, o = arguments.length; o > r; r++) t = arguments[r],
                        n(t) && (t = t.tryWrap),
                            e.push(t);
                        return a.apply(this, e)
                     }
              }()
       } catch (s) {
          monitor.report(615694)
       }
       t.bindCatchFunctionWithZepto = function () {
          var e = t.Zepto && t.Zepto.ajax;
          e && (t.Zepto.ajax = function (n, r) {
             return r || (r = n, n = void 0),
                 i(r),
                 n ? e.call(t.Zepto, n, r) : e.call(t.Zepto, r)
          })
       }
    }(window);