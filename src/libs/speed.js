var speed = {
   pageStart: +new Date()
};

!function () {
   var e = navigator.userAgent.toLowerCase(),
       n = "";
   e.indexOf("iphone") >= 0 || e.indexOf("ipod") >= 0 || e.indexOf("ipad") >= 0 ? n = "iphone" : e.indexOf("android") >= 0 && (n = "android"),
   e.indexOf("educationapp") >= 0 && (n += " app"),
       document.getElementsByTagName("html")[0].className += " " + n
}();

!function () {
   var a, n = navigator.userAgent.toLowerCase();
   a = n.indexOf("android") >= 0 && navigator.userAgent.match(/android ([\d\.]+);/i)[1] < "4.3" ? " not-animation" : " animation",
       document.getElementsByTagName("html")[0].className += a
}();