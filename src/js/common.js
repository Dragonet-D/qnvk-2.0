$(function () {
  // 微信接口
  weixinconfig()
  // 分享朋友圈
  shareFriend()
})
// 微信配置数据
var urls = location.href.split('#')[0]
var config = ''


// 微信config
function weixinconfig() {
  $.ajax({
    url: hosturl + '/index.php/Index/sing',
    type: 'post',
    dataType: 'json',
    async: false,
    data: {
      data: urls
    },
    success: function (data) {
      config = data;
      console.log(config)
    },
    error: function (err) {
      console.log(err)
    }
  });
}

//微信配置
function weixin() {
  wx.config({
    // debug: true,
    appId: config.appId, // 必填，公众号的唯一标识
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature, // 必填，签名，见附录1 ba939f772c41cadd1175bcedb4f9ec6627578484
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  });
}

// 分享朋友圈
function shareFriend() {
  weixin();
  var title = '青年之声V课堂直播间'
  var link = window.location.href;
  var description = '青年V课堂邀请名校名师走进直播间从学习方法、升学攻略、心理健康等全方位为青少年成长助力。';
  var imgUrl = 'https://cdn2.qnzsvk.cn/live/Home/images/share_logo.png'
  var shareObj = {
    title: title,
    link: link,
    imgUrl: imgUrl,
    desc: description,
    success: function () {
      $.ajax({
        url: hosturl + '/index.php/Client_1/addcard',
        jsonp: 'jsonpcallback',
        type: 'get',
        dataType: 'jsonp',
        success: function (data) {
          console.log(data)
        },
        error: function (err) {
          console.log(err)
        }
      })
    }
  }
  wx.ready(function () {
    wx.onMenuShareTimeline(shareObj);
    wx.onMenuShareAppMessage(shareObj);
    wx.onMenuShareQQ(shareObj);
    wx.onMenuShareWeibo(shareObj);
    wx.onMenuShareQZone(shareObj);
  })
}
