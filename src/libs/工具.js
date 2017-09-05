var isWeiXinFlag = -1 != navigator.userAgent.toLowerCase().indexOf("micromessenger"),
    getCookie = function (e) {
       var o = document.cookie.match(new RegExp("(^| )" + e + "=([^;]*)(;|$)"));
       return o ? decodeURIComponent(o[2]) : ""
    },
    delCookie = function (e, o, i) {
       document.cookie = e + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (i ? i : "/") + "; " + (o ? "domain=" + o + ";" : "")
    };
if (isWeiXinFlag) {
   var k, l, skey;
   try {
      k = localStorage.getItem("wantedToQQLogin"),
          l = localStorage.getItem("wantedToWeixinLogin")
   } catch (e) {
   }
   "1" == k && (localStorage.removeItem("wantedToQQLogin"), skey = getCookie("p_skey") || getCookie("skey"), skey && (delCookie("uid_a2", ".qq.com"), delCookie("uid_type", ".qq.com"), delCookie("uid_uin", ".qq.com")), skey = null),
   "1" == l && (localStorage.removeItem("wantedToWeixinLogin"), skey = getCookie("uid_a2"), skey && (delCookie("p_uin", "ke.qq.com"), delCookie("p_skey", "ke.qq.com"), delCookie("uin", ".qq.com"), delCookie("skey", ".qq.com"), delCookie("luin", ".qq.com"), delCookie("lskey", ".qq.com")))
}
;
var getArg = function (e) {
       var t = (window.location.search + window.location.hash).match(new RegExp("(\\?|#|&)" + e + "=([^#&]*)(#|&|$)"));
       return t ? decodeURIComponent(t[2]) : ""
    },
    __ua = navigator.userAgent,
    isIOSQQ = /iPhone|iPod/i.test(__ua) && /qq\/(\d+\.\d+)/i.test(__ua);
1 != WIN_NAME.get(window.IAP_KEY) && 1 == getArg("isIAP") && isIOSQQ && WIN_NAME.set(window.IAP_KEY, 1);
;
window.onload = function () {
   function n() {
      return -1 !== navigator.userAgent.toLowerCase().indexOf("micromessenger")
   }

   function e() {
      var e = getCookie("uid_a2"),
          o = getCookie("p_skey") || getCookie("skey");
      return n() ? e || o : o
   }

   function o(n) {
      var e = 5381;
      if (!n) return "";
      for (var o = 0, t = n.length; t > o; ++o) e += (e << 5) + n.charAt(o).charCodeAt();
      return 2147483647 & e
   }

   function t() {
      return o(e())
   }

   function i(n) {
      var e = (navigator.userAgent, c.mobile.isIOS() && c.mobile.qqVersion()),
          o = t();
      return n += 1 == WIN_NAME.get(window.DYNAMIC_KEY) ? (n.indexOf("?") < 0 ? "?" : "&") + "is_ios_h5=" + (e ? 1 : 0) : (n.indexOf("?") < 0 ? "?" : "&") + "is_ios=" + (e ? 1 : 0),
      e && (n += "&is_ios_qq=1"),
      1 == WIN_NAME.get(window.IAP_KEY) && (n += "&ios_course=1"),
      o && (n += "&bkn=" + o),
          n
   }

   function r(n, e, o) {
      window.PRELOADDATA[n] = e,
      ++d >= o && (window.PRELOADDATADONE = !0, window.$ && $(document).trigger("onPreloadDataReady"))
   }

   var a = function () {
          var n = navigator.userAgent.toLowerCase() || "";
          return {
             tools: {
                bom: {
                   get: function (n) {
                      var e = (window.location.search + window.location.hash).match(new RegExp("(\\?|#|&)" + n + "=([^#&]*)(#|&|$)"));
                      return e ? decodeURIComponent(e[2]) : ""
                   }
                },
                mobile: {
                   qqVersion: function () {
                      var e = n.match(/qq\/(\d+\.\d+(\.\d+)?)/i);
                      return e && e[1] || 0
                   },
                   isIOS: function () {
                      return /iPhone|iPod/i.test(navigator.userAgent) ? !0 : !1
                   }
                }
             }
          }
       }(),
       c = a.tools,
       u = c.bom.get("from");
   "ios_dongtai" === u && WIN_NAME.set(window.DYNAMIC_KEY, 1),
       window.PRELOADDATA = {},
       window.PRELOADDATADONE = !1;
   var d = 0,
       s = function () {
          return {
             detail: {
                preload: !0,
                url: "/cgi-bin/h5/index_4",
                param: {
                   platform: 3
                }
             }
          }
       }(),
       w = !!document.documentElement.getAttribute("alpaca");
   !w &&
   function (n) {
      var e, o, t, c, u = Object.keys(n).length;
      for (e in n) o = n[e],
          t = o.param && "function" == typeof o.param ? o.param.call(a) : o.param,
          c = i(o.url),
      t && Object.keys(t).forEach(function (n) {
         c += "&" + n + "=" + encodeURIComponent(t[n])
      }),


          function (n) {
             require.getData(c, function (e) {
                r(n, e && e.result, u)
             }, function () {
                r(n, {
                   retcode: -1
                }, u)
             }, {
                reportPath: c.replace(/\?.*/, "")
             })
          }(e || o.url)
   }(s),
       window.winWidth = parseInt(document.body.clientWidth),
       banner = document.getElementById("js-banner"),
       banner.style.height = 143 * window.winWidth / 375 + "px",
       require.loadUrl(["//7.url.cn/edu/mobilev2/pkg/zepto_min.cbfebdb.js", "//7.url.cn/edu/mobilev2/pkg/common_min.bd602c6.js", "//7.url.cn/edu/mobilev2/pkg/page_min.8787b7e.js", "//7.url.cn/edu/mobilev2/pkg/pages/index/index_min.1cd23a6.js"], function () {
          var n = require("zepto");
          var e = require("common");
          var o = require("page");
          var t = require("pages/index/index");
          window.bindCatchFunctionWithZepto(),
              o.init(t),
              require.async(["modules/common.async", "modules/page/page.async", "pages/index/index.async"], function () {
              })
       })
};
