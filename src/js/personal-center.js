// 个人中心构造函数
$(function () {
  var personalcenter = new PersonalCenter()
  personalcenter.init()
  personalcenter.indexdata()
  personalcenter.sharelink()
})

// 个人中心构造函数
function PersonalCenter() {
  // 个人中心
  this.personalcenter = $('#person_center')
  // 听课券
  this.coupon = $('#person_center .coupon')
  // 听课券详细
  this.coupondetial = $('#person_center #coupon')
  // 分享规则
  this.seerules = $('#person_center #rules')
  // 消费记录
  this.expense = $('#person_center .expense')
  // 消费记录详细
  this.expenserecords = $('#person_center #expense')
}

// 初始化
PersonalCenter.prototype.init = function () {
  var This = this
  // 听课券点击
  this.coupon.on('touchstart', function () {
    This.coupons(This)
  })
  // 消费记录点击
  this.expense.on('touchstart', function () {
    This.expenserecord(This)
  })
}

// 主页数据获取
PersonalCenter.prototype.indexdata = function () {
  var header = this.personalcenter.find('.header')
  var cardsum = this.personalcenter.find('.cardsum')
  $.ajax({
    url: hosturl + '/index.php/Client/mycenter',
    dataType: 'json',
    type: 'get',
    success: function (data) {
      console.log(data)
      var avatar = data.uinfo.cimge
      var username = data.uinfo.clienter
      header.html(
        '<h2 class="avator">' +
        '<img src="' + avatar + '" alt="">' +
        '</h2>' +
        '<h3 class="user_name">' + username + '</h3>'
      )
      cardsum.text(data.cardsum)
    },
    error: function (err) {
      console.log(err)
    }
  }).done(function () {

  })
}

// 听课券点击
PersonalCenter.prototype.coupons = function (This) {
  var coupondetial = $('#coupon .coupon_detial')
  var couponcontent = $('#coupon .audio_content')
  couponcontent.html('')
  This.showhide(This.coupondetial, 'block')
  This.couponclose(This)
  This.seeruleshow(This)
  $.ajax({
    url: hosturl + '/index.php/Client/card_jilu',
    dataType: 'json',
    type: 'get',
    success: function (data) {
      console.log(data)
      if (data.resultmsg) {
        couponcontent.html('暂无听课券')
      } else {
        if (data.cardinfo) {
          var cardcanuse = data.cardinfo
          var cardused = data.cardinfo2
          coupondetial.html(
            '<div class="coupon_detial_left">' +
            '<h3>' + cardcanuse + '</h3>' +
            '<span>可用</span>' +
            '</div>' +
            '<div class="coupon_detial_right">' +
            '<h3>' + cardused + '</h3>' +
            '<span>已兑换</span>' +
            '</div>'
          )
        }
        if (data.usedinfo.length === 0) {
          couponcontent.html('')
        } else {
          for (var i = 0; i < data.usedinfo.length; i++) {
            var picture = data.usedinfo[i].picture
            var title = data.usedinfo[i].title
            var name = data.usedinfo[i].name
            var time = new Date(Number(data.usedinfo[i].starttime) * 1000).toLocaleString()
            var price = data.usedinfo[i].price
            couponcontent.append(
              '<li class="audio_item">' +
              '<a class="audio_wrapper" href="javascript:">' +
              '<span class="icon">' +
              '<img src="' + picture + '" alt="">' +
              '</span>' +
              '<span class="audio_info">' +
              '<span class="audio_title">' + title + '</span>' +
              '<span class="audio_owner">' + name + '</span>' +
              '<span class="audio_hot">' +
              '<time>' + time + '</time>' +
              '<i class="watched_sum"></i>' +
              '<i></i>' +
              '</span>' +
              '</span>' +
              '<span class="status">' +
              '<span class="used_price">￥' + price + '</span>' +
              '<span class="is_free">免费观看</span>' +
              '</span>' +
              '</a>' +
              '</li>'
            )
          }
        }
      }
    }
  })
}

// 听课券详细
PersonalCenter.prototype.couponclose = function (This) {
  var target = This.coupondetial.find('.back_wraper')
  target.on('touchstart', function () {
    This.showhide(This.coupondetial, 'none')
  })
}

// 查看规则
PersonalCenter.prototype.seeruleshow = function (This) {
  var target = This.coupondetial.find('.see_rules')
  target.on('touchstart', function () {
    This.showhide(This.seerules, 'block')
    // This.showhide(This.coupondetial, 'none')
    This.sharepage(This)
  })
}

// 分享页面
PersonalCenter.prototype.sharepage = function (This) {
  var imgbtn = This.seerules.find('.close_btn')
  var sharewrapper = This.seerules
  var sharecontent = This.seerules.find('.rules_content')
  imgbtn.on('touchstart', function () {
    This.showhide(This.seerules, 'none')
  })
  sharewrapper.on('touchstart', function () {
    This.showhide(This.seerules, 'none')
  })
  sharecontent.on('touchstart', function (e) {
    e.stopPropagation()
  })
}

// 消费记录
PersonalCenter.prototype.expenserecord = function (This) {
  var back = This.expenserecords.find('.back_wraper')
  var boughtlist = This.expenserecords.find('.bought_list')
  boughtlist.html('')
  This.showhide(This.expenserecords, 'block')
  back.on('touchstart', function () {
    This.showhide(This.expenserecords, 'none')
  })
  $.ajax({
    url: hosturl + '/index.php/Client/expenselist',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var title = data[i].titlename
          var price = data[i].payprice
          var time = new Date(Number(data[i].paytime) * 1000).toLocaleString()
          boughtlist.append(
            '<li>' +
            '<a href="javascript:">' +
            '<span class="title">' + title + '</span>' +
            '<time>' + time + '</time>' +
            '</a>' +
            '<span class="used_money">' +
            '<span>-' + price + '</span>' +
            '</span>' +
            '</li>'
          )
        }
      } else {
        boughtlist.html(
          '<li class="bought_record">' +
          '<span>您还没有任何消费</span>' +
          '</li>'
        )
      }
      console.log(data)
    }
  })
}

// 控制显示隐藏
PersonalCenter.prototype.showhide = function (obj, showhide) {
  obj.css({
    display: showhide
  })
}
// 分享链接
PersonalCenter.prototype.sharelink = function () {
  var sharelink = $('.go_share')
  sharelink.on('click', function () {
    this.href = hosturl
  })
}