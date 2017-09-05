!function () {
   if (-1 == location.hash.indexOf("debug") && !navigator.userAgent.match(/iPhone|iPod|Android|iPad/i)) {
      var o = window.location.hash,
          i = window.location.search;
      location.href = "//ke.qq.com/" + i + (o ? (i ? "&" : "?") + o.substr(1) : "")
   }
}();