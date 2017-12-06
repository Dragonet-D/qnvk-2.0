'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
  var adswiper = $('#banner .swiper-wrapper');
  var adinfo = new AdInfos(adswiper);
  adinfo.init();
});

var AdInfos = function () {
  function AdInfos(adswiper) {
    _classCallCheck(this, AdInfos);

    this.adWrapper = adswiper;
  }

  // 初始化


  _createClass(AdInfos, [{
    key: 'init',
    value: function init() {
      var _this = this;

      $.ajax({
        url: hosturl + '/index.php/Newindex2/ad',
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        success: function success(data) {
          console.log(data);
          _this.getAdS(data.ad);
        }
      }).done(function () {
        var banner = new Swiper('.swiper-container', {
          loop: true,
          autoplay: 5000,
          pagination: '.swiper-pagination'
        });
      });
    }

    // 渲染广告信息

  }, {
    key: 'getAdS',
    value: function getAdS(adlist) {
      for (var i = 0; i < adlist.length; i++) {
        var adjieshao = adlist[i].ad_jieshao;
        var imgUrl = adlist[i].adpath;
        var adurl = adlist[i].adurl;
        this.adWrapper.append('\n        <div class="swiper-slide">\n          <a href="' + adurl + '">\n            <img src="' + imgUrl + '" alt="">\n          </a>\n          <h2 class="swiper_title">' + adjieshao + '</h2>\n        </div>\n      ');
      }
    }
  }]);

  return AdInfos;
}();
//# sourceMappingURL=video-play.js.map