$(function () {
  // 主页默认数据接口
  advanceData()
  // 广告和分类筛选tab构造函数
  var adandtabs = new AdAndTabs()
  adandtabs.init()
})

// 广告和分类筛选tab构造函数
function AdAndTabs() {
  // 广告外框
  this.adWrapper = $('#banner .swiper-wrapper')
  // 点击选项卡内容
  this.tabwrapper = $('#tab .swiper-wrapper')
  // 选项卡外层
  this.tab = $('#tab');
  this.tabContents = document.querySelectorAll('.tabs');
  // 头部遮罩
  this.tabMsk = $('.tab_mask');
  this.header = $('.header');
  this.homeadvance = $('#home_advance');
}

AdAndTabs.prototype.init = function () {
  var This = this
  $.ajax({
    url: hosturl + '/index.php/Newindex/ad',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      // 广告数据
      This.getAds(data.ad)
      // 默认选项卡内容
      This.defaultTagContent(data.cat)
    }
  }).done(function () {
    // 轮播图
    var banner = new Swiper('.swiper-container', {
      loop: true,
      autoplay: 5000,
      pagination: '.swiper-pagination'
    });
    // 选项卡滑块
    var mySwiper = new Swiper('#tab', {
      freeMode: true,
      freeModeMomentumRatio: 0,
      slidesPerView: 'auto',
      freeModeMomentumVelocityRatio: 0,
      freeModeMomentumBounceRatio: 0,
      touchRatio: 0.5
    });
    // 选项卡构造函数
    var tabcenter = new TabCenter(This.tab, This.tabContents, This.tabMsk, mySwiper, This.homeadvance);
    tabcenter.init();
    // 选项卡active样式添加
    This.activeStyle(This)
  });
}
// 轮播数据
AdAndTabs.prototype.getAds = function (adlist) {
  for (var i = 0; i < adlist.length; i++) {
    var adjieshao = adlist[i].ad_jieshao
    var imgUrl = adlist[i].adpath
    var adurl = adlist[i].adurl
    this.adWrapper.append(
      '<div class="swiper-slide">' +
      '<a href="' + adurl + '">' +
      '<img src="' + imgUrl + '" alt="">' +
      '</a>' +
      '<h2 class="swiper_title">' + adjieshao + '</h2>' +
      '</div>'
    )
  }
}
// 默认推荐选项卡内容
AdAndTabs.prototype.defaultTagContent = function (list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].tag1 !== ' ') {
      var title = list[i].tag1
      var id = list[i].id
      if (title) {
        this.tabwrapper.append(
          '<div class="swiper-slide" data-id="' + id + '">' +
          '<span>' + title + '</span>' +
          '</div>'
        )
      }
    }
  }
}
// 选项卡active样式添加
AdAndTabs.prototype.activeStyle = function (This) {
  This.tabwrapper.find('.swiper-slide').eq(0).addClass('active')
}


var homeadvance = $('#home_advance');
// 传入后端的对象
var chooseObj = {
  id: '',
  tags: ''
};
var data_tanchu;

// 主页默认推荐选项卡数据接口
function advanceData(chooseObj) {
  $.ajax({
      url: hosturl + '/index.php/Newindex/info',
      type: 'get',
      dataType: 'json',
      data: chooseObj,
      success: function (data) {
        console.log(data);
        if (data.tanchu === '2') {
          var shareremind = new ShareRemind()
          shareremind.init();
        } else if (data.tanchu === '1') {
          data_tanchu = data.tanchu;
          // 弹窗引导页
          winguidan.init(data_tanchu);
        }
        // 首页选项卡数据
        var tabInfo = data.info
        if (tabInfo) {
          tagContent(tabInfo)
        }
        // 直播数据
        var liveinfo = data.liveinfo
        if (liveinfo) {
          liveInfo(liveinfo)
        }
        // 切换筛选数据
        var otherdata = data.infolist
        if (otherdata) {
          othertagContent(otherdata)
        }
      },
      error: function (err) {
        console.log(err)
      }
    }
  ).done(function () {
    history()
    livingNums()
    bagClick()
  })
}

// 课程包点击
function bagClick() {
  var bagitem = document.querySelectorAll('.bag_content .bag_item')
  for (var i = 0; i < bagitem.length; i++) {
    bagitem[i].index = i
    bagitem[i].onclick = function () {
      var id = this.getAttribute('data-id')
      $.ajax({
        url: hosturl + '/index.php/Newindex/ispay',
        type: 'get',
        dataType: 'json',
        data: {
          id: id
        },
        success: function (data) {
          // 支付成功
          if (data.status === 1) {
            window.location.href = hosturl + '/index.php/Newautolive/index/id/' + id
          } else {
            window.location.href = hosturl + '/index.php/Newindex/curdetail/id/' + data.id
          }
        }
      })
    }
  }
}

// 弹窗引导
var winguidan = new windowGuidance();
var maskList, shareMask, navMask, tabsMask, knowBtn, nextBtn, mask, maskAll, maskCenter;
var pageState = true;
var clickState = true;

function windowGuidance() {
  mask = this.maskList = $('.mask')
  maskList = this.mask = $('.mask_list')
  shareMask = this.shareMask = $('.share_mask')
  navMask = this.navMask = $('.nav_mask')
  tabsMask = this.tabsMask = $('.tabs_mask')
  knowBtn = this.knowBtn = $('.know_btn')
  nextBtn = this.nextBtn = $('.next_btn')
  maskAll = this.maskAll = $('.mask_all')
  maskCenter = this.maskCenter = $('.mask_center')
}

windowGuidance.prototype.init = function (data_tanchu) {
  console.log(clickState)
  if (pageState) {
    if (data_tanchu == 1) {
      winguidan.indexPage()
      console.log(0)
    }
  } else {
    if (data_tanchu == 1 && clickState) {
      winguidan.otherPage()

    }
  }
}

windowGuidance.prototype.indexPage = function () {
  var This = this
  indexMaskShow(maskList, nextBtn, maskAll, shareMask, navMask, This)
  This.nextPlay()
  This.maskclose()
}
windowGuidance.prototype.otherPage = function () {
  console.log(2)
  var This = this
  otherMaskShow(maskList, knowBtn, maskCenter, tabsMask, mask, This);
  maskCenter.find('.top').css({
    height: 0
  })
  maskCenter.find('.bottom').css({
    top: '4.8rem',
    height: '21rem'
  })
  This.maskclose()
}
windowGuidance.prototype.nextPlay = function () {
  var This = this
  nextBtn.on('click', function () {
    maskAll.css({
      display: 'none'
    })
    nextBtn.css({
      display: 'none'
    })
    indexMaskShow(maskList, knowBtn, maskCenter, navMask, shareMask, This);
  })
}

windowGuidance.prototype.maskclose = function () {
  var This = this
  This.knowBtn.on('click', function () {
    winguidanClose(This)
    closePost();
  })
  This.shareMask.on('click', function () {
    maskAll.css({
      display: 'none'
    })
    nextBtn.css({
      display: 'none'
    })
    indexMaskShow(maskList, knowBtn, maskCenter, navMask, shareMask, This);
    closePost()
  });
  This.navMask.on('click', function () {
    winguidanClose(This)
    closePost()
  })
  This.tabsMask.on('click', function () {
    winguidanClose(This)
    closePost()
  })
}

// 关闭全部弹窗引导面板
function winguidanClose(This) {
  This.maskList.css({
    display: 'none'
  })
  $('.box').css({
    overflow: 'scroll',
    width: 'auto',
    height: 'auto'
  })
  This.mask.css({
    display: 'none'
  })
}

// 主页弹窗引导页显示
function indexMaskShow(maskList, btn, maskPale, beforObj, afterObj, This) {
  console.log(afterObj)
  maskList.css({
    display: 'block'
  });
  $('.box').css({
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  });
  btn.css({
    display: 'block'
  })
  maskPale.css({
    display: 'block'
  })
  beforObj.css({
    display: 'block'
  })
  afterObj.css({
    display: 'none'
  })

}

function otherMaskShow(maskList, btn, maskPale, beforObj, afterObj, This) {
  console.log(afterObj)
  maskList.css({
    display: 'block'
  });
  $('.box').css({
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  });
  btn.css({
    display: 'block'
  })
  maskPale.css({
    display: 'block'
  })
  beforObj.css({
    display: 'block'
  })

}

// 关闭请求
function closePost() {
  $.ajax({
    url: hosturl + '/index.php/Newindex/sesstanchu',
    type: 'post',
    dataType: 'json',
    success: function (data) {
    },
    error: function (err) {
      console.log(err)
    }
  })
}

// 其他选项卡内容
function othertagContent(otherdata) {
  homeadvance.html(
    '<div id="audio_advance" class="audio_advance choose_craful">' +
    '<ul class="audio_content">' + '</ul>' +
    '</div>' +
    '<div class="video_audio choose_craful">' +
    '<ul class="list_content">' + '</ul>' +
    '</div>'
  )
  var audioadvance = $('#audio_advance .audio_content')
  var videoaudio = $('.video_audio .list_content')
  for (var i = 0; i < otherdata.length; i++) {
    if (otherdata[i]) {
      var livetype = Number(otherdata[i].livetype) || '',
        id = otherdata[i].id,
        picture = otherdata[i].picture
      audiotitle = otherdata[i].content,
        title = otherdata[i].title.trim(),
        // time = otherdata[i].tag1.substring(0, otherdata[i].tag1.indexOf(',')),
        time = new Date(Number(otherdata[i].starttime) * 1000).toLocaleDateString()
      name = otherdata[i].name,
        ischoes = Number(otherdata[i].ischoes),
        price = otherdata[i].price
      // 语音消息
      if (livetype === 2) {
        logourl = 'https://cdn2.qnzsvk.cn/static/20170915/images/all_live_audio@2x.png'
        audioadvance.append(
          '<li class="audio_item">' +
          '<a class="audio_wrapper history" data-id="' + id + '" href="' + hosturl + '/index.php/Index/livedeil_0/id/' + id + '">' +
          '<i class="icon">' +
          '<img src="' + picture + '" alt="">' +
          '</i>' +
          '<span class="audio_info">' +
          '<span class="audio_title">' + title + '</span>' +
          '<span class="audio_owner">' + name + '</span>' +
          '<span class="audio_hot">' +
          '<time>' + time + '</time>' +
          '</span>' +
          '</span>' +
          '</a>' +
          '</li>'
        )
      } else if (livetype === 1) {
        logourl = 'https://cdn2.qnzsvk.cn/static/20170915/images/all_live_video@2x.png'
        videoaudio.append(
          '<li class="single_video">' +
          '<a class="single_list_wrapper history" data-id="' + id + '" href="' + hosturl + '/index.php/Newautolive/index/id/' + id + '">' +
          '<section class="list_header">' +
          '<span class="list_header_info">' +
          '<img class="class_type" src="' + logourl + '" alt="">' +
          '<p class="is_free">免费</p>' +
          '</span>' +
          '<img src="' + picture + '" alt="">' +
          '<span class="title">' +
          '<title class="video_introduce">' + title + '</title>' +
          '</span>' +
          '</section>' +
          '<p class="video_owner">' + name + '</p>' +
          '</a>' +
          '</li>'
        )
      }
    }
  }
  // loading样式消失
  loading('none')
}

// 获取遮罩数据接口
function getTagMask(id) {
  $.ajax({
    url: hosturl + '/index.php/Newindex/tags/id/' + id,
    type: 'get',
    dataType: 'jsonp',
    jsonp: 'jsonpcallback',
    success: function (data) {
      console.log(data)
    },
    error: function (err) {
      console.log(err)
    }
  }).done(function () {

  })
}

// 纵向选项卡内容
function tagContent(tabInfo) {
  var onFalse = true
  homeadvance.html(
    '<div id="class_advance" class="class_advance choose_craful" style="display: none">' +
    '<h2 class="live_advance">直播预告</h2>' +
    '<ul class="class_advance"></ul>' +
    '</div>'
  )
  var strr = ''
  for (var i = 0; i < tabInfo.length; i++) {
    var categoryname = tabInfo[i]['categoryname' + tabInfo[i].cid]
    console.log(categoryname)
    var blockTitle = tabInfo[i]['cat' + tabInfo[i].cid]
    var str = ''
    // 心理健康
    if (categoryname === '心理健康课' || categoryname === '心理健康课') {
      homeadvance.append(
        '<div id="audio_advance" class="audio_advance choose_craful">' +
        '<h2 class="audio_title"></h2>' +
        '<ul class="audio_content"></ul>' +
        '</div>'
      )
      var audiotitle = $('#audio_advance .audio_title')
      audiotitle.text(categoryname)
      var audiocontent = $('#audio_advance .audio_content')
      for (var k = 0; k < blockTitle.length; k++) {
        var id = blockTitle[k].id,
          picture = blockTitle[k].picture,
          name = blockTitle[k].name,
          audiotitle = blockTitle[k].title.trim(),
          time = new Date(Number(blockTitle[k].starttime) * 1000).toLocaleDateString()
        audiocontent.append(
          '<li class="audio_item">' +
          '<a class="audio_wrapper history" data-id="' + id + '" href="' + hosturl + '/index.php/Index/livedeil_0/id/' + id + '">' +
          '<i class="icon">' +
          '<img src="' + picture + '" alt="">' +
          '</i>' +
          '<span class="audio_info">' +
          '<span class="audio_title">' + audiotitle + '</span>' +
          '<span class="audio_owner">' + name + '</span>' +
          '<span class="audio_hot">' +
          '<time>' + time + '</time>' +
          '</span>' +
          '</span>' +
          '</a>' +
          '</li>'
        )
      }
    } else if (categoryname === '精品课程包') {
      console.log('精品课程包')
      homeadvance.append(
        `<div class="class_bag choose_craful">
            <h2>${categoryname}</h2>
            <ul class="bag_content">    
            </ul>
          </div>`
      )
      var bagcontent = $('.class_bag .bag_content')
      for (var l = 0; l < blockTitle.length; l++) {
        var ids = blockTitle[l].id,
          pictures = blockTitle[l].picture,
          names = blockTitle[l].name,
          audiotitles = blockTitle[l].title.trim(),
          bagprice = blockTitle[l].price,
          sumi = blockTitle[l].sumi,
          suming = blockTitle[l].suming
        bagcontent.append(`
        <li class="bag_item" data-id="${ids}">
        <a class="bag_wrapper history" href="javascript:">
          <i class="icon">
            <img
                src="${pictures}"
                alt="">
          </i>
          <span class="audio_info">
            <span class="audio_title">${audiotitles}</span>
            <span class="audio_owner">${names}</span>
            <span class="audio_hot">
              <span>更新至第${suming}课/共${sumi}课</span>
              <!--<span>126购买</span>-->
              <span class="bag_price">￥${bagprice}</span>
            </span>
          </span>
        </a>
      </li>
        `)
      }
    } else {
      var str = ''
      for (var j = 0; j < blockTitle.length; j++) {
        var listcontent = $('#home_advance .list_content')
        var ids = blockTitle[j].id,
          pictures = blockTitle[j].picture,
          names = blockTitle[j].name,
          audiotitles = blockTitle[j].title,
          livetype = Number(blockTitle[j].livetype),
          playurl = '',
          logourl = '',
          statuss = Number(blockTitle[j].statuss),
          ischoes = Number(blockTitle[j].ischoes),
          price = Number(blockTitle[j].price)
        // 语音课程
        if (livetype === 2) {
          playurl = 'Index/livedeil_0'
          logourl = 'https://cdn2.qnzsvk.cn/static/20170915/images/all_live_audio@2x.png'
        } else { // 视频课程
          playurl = 'Newautolive/index'
          logourl = 'https://cdn2.qnzsvk.cn/static/20170915/images/all_live_video@2x.png'
          if (statuss === 2) {
            if (price === 0.00) {
              playurl = 'Newautolive/index'
            } else {
              if (ischoes === 2) {
                playurl = 'curdetailpage'
              } else {
                playurl = 'curdetail'
              }
            }
          } else if (statuss === 1) {
            playurl = 'Newautolive/index'
          }
        }
        str +=
          '<li class="single_video">' +
          '<a class="single_list_wrapper history" data-id="' + ids + '" href="' + hosturl + '/index.php/' + playurl + '/id/' + ids + '">' +
          '<section class="list_header">' +
          '<span class="list_header_info">' +
          '<img class="class_type" src="' + logourl + '" alt="">' +
          '<p class="is_free">免费</p>' +
          '</span>' +
          '<img src="' + pictures + '" alt="">' +
          '<span class="title">' +
          '<title class="video_introduce">' + audiotitles + '</title>' +
          '</span>' +
          '</section>' +
          '<p class="video_owner">' + names + '</p>' +
          '</a>' +
          '</li>'
      }
      homeadvance.append(
        '<div class="video_audio choose_craful">' +
        '<h2>' + categoryname + '</h2>' +
        '<ul class="list_content">' + str + '</ul>' +
        '</div>'
      )
    }
  }
  setTimeout(function () {
    loading('none')
  }, 300)
}

// 直播信息函数
function liveInfo(liveinfo) {
  var advanveWrapper = $('#class_advance')
  var classadvanve = $('#class_advance .class_advance')
  var id = liveinfo.id,
    picture = liveinfo.picture,
    title = liveinfo.title,
    livetime = liveinfo.starttime,
    spker = liveinfo.spker,
    jianjie = liveinfo.jianjie,
    willlivetime = new Date(Number(liveinfo.starttime) * 1000).toLocaleString(),
    liveoff = Number(liveinfo.status),
    livetype = Number(liveinfo.livetype),
    liveurl = ''
  if (livetype === 1) {
    livetagsrc = "https://cdn2.qnzsvk.cn/static/20170915/images/all_live_video@2x.png"
    liveurl = 'Newautolive/index'
  } else if (livetype === 2) {
    livetagsrc = "https://cdn2.qnzsvk.cn/static/20170915/images/all_live_audio@2x.png"
    liveurl = 'Index/autolive'
  }
  if (liveoff === 1) {
    advanveWrapper.css('display', 'block')
    classadvanve.html(
      '<li class="live">' +
      '<a  class="history" data-id="' + id + '" href="' + hosturl + '/index.php/' + liveurl + '/id/' + id + '">' +
      '<span class="list_header">' +
      '<span class="list_header_info">' +
      '<img class="class_type" src="' + livetagsrc + '" alt="">' +
      '<p class="is_free">免费</p>' +
      '</span>' +
      '<img class="live_img" src="' + picture + '" alt="">' +
      '<span class="title all-cut-time">' +
      '</span>' +
      '</span>' +
      '<span class="live_introdus">' +
      '<span class="title">' + title + '</span>' +
      '<span class="live_user">' + spker + '</span>' +
      '<span id="living_mark" class="status">' + willlivetime + '</span>' +
      '</span>' +
      '</a>' +
      '</li>'
    )
  }

  // 模拟倒计时
  var startime = livetime;
  //是否直播1是0否
  var living = livetype;
  // 当前时间
  var timestamp = Math.round(new Date().getTime() / 1000);
  // 时间
  var newtime = startime - timestamp;
  var intDiff = newtime;
  // 直播倒计时函数
  countDown(intDiff, living);
}


// 选项卡构造函数
function TabCenter(tab, tabContents, tabMsk, Swiper, homeadvance) {
  // 选项卡外框
  this.tab = tab
  // 选项卡内容
  this.tabContents = tabContents
  // 滑块对象
  this.mySwiper = Swiper
  // 头部标签
  this.tabMsk = tabMsk
  // 选项卡宽度
  this.swiperWidth = Swiper.container[0].clientWidth
  // 最大移动距离
  this.maxTranslate = Swiper.maxTranslate()
  // 最大宽度
  this.maxWidth = this.swiperWidth / 2 - this.maxTranslate
  // 上一次点击的下标
  this.prevIndex = 0
  this.homeadvance = homeadvance
  // 选择的对象
  this.tagss = {}
  // 筛选的ID
  this.cid = {0: ''}
  // 开关
  this.onOff = true
  // 后端遮罩筛选数据
  this.tagsstr = ''
}

// 选项卡构造函数 初始化函数
TabCenter.prototype.init = function () {
  var This = this
  this.mySwiper.on('tap', function (swiper) {
    This.slideClick(swiper, This)
    chooseObj.tags = ''
    This.tagsstr = ''
    This.clearObj(This.tagss)
  })
};
// 选项卡点击居中
TabCenter.prototype.slideClick = function (swiper, This) {
  // swiper-slide
  var slide = swiper.slides[swiper.clickedIndex]
  // 被点击slide的中心点
  var slideCenter = slide.offsetLeft + slide.clientWidth / 2
  // 点击下标
  var clickedIndex = swiper.clickedIndex
  // tab转场
  This.mySwiper.setWrapperTransition(10)
  if (slideCenter < This.swiperWidth / 2) {
    This.mySwiper.setWrapperTranslate(0)
  } else if (slideCenter > This.maxWidth) {
    This.mySwiper.setWrapperTranslate(This.maxTranslate)
  } else {
    var nowTlanslate = slideCenter - This.swiperWidth / 2
    This.mySwiper.setWrapperTranslate(-nowTlanslate)
  }
  // slide 加active样式
  This.slideActive(clickedIndex, This.tab)
  // 选项卡内容切换
  var tabContents = This.tabContents
  var slideContent = swiper.slides[clickedIndex].getElementsByTagName('span')[0].innerText;
  var slideobj = swiper.slides[clickedIndex]
  This.tabListChange(tabContents, clickedIndex, This, slideContent, slideobj)

};
// 选项卡加样式
TabCenter.prototype.slideActive = function (clickedIndex, tab) {
  tab.find('.active').removeClass('active')
  tab.find('.swiper-slide').eq(clickedIndex).addClass('active')
};
// 选项卡内容切换
TabCenter.prototype.tabListChange = function (tabContents, index, This, slideContent, slideobj) {
  if (index === 0) {
    This.tabMsk.css('display', 'none')
    advanceData('')
  } else {
    This.homeadvance.html(
      '<div id="audio_advance" class="audio_advance choose_craful">' +
      '<ul class="audio_content">' + '</ul>' +
      '</div>' +
      '<div class="video_audio choose_craful">' +
      '<ul class="list_content">' + '</ul>' +
      '</div>' +
      '<div class="class_bag choose_craful">' +
      '<ul class="bag_content">' + '</ul>' +
      '</div>'
    )
    var listcontent = ''
    var tabId = slideobj.getAttribute('data-id')
    var page = 0
    var onOff = true
    // 分页
    This.homeadvance.dropload({
      scrollArea: window,
      domDown: {
        domClass: 'dropload-down',
        domRefresh: '',
        domLoad: '<img width="24" height="24" src="https://cdn2.qnzsvk.cn/static/20170919/qnvk_2.0/images/loading.gif" alt=""><span>加载中...</span>',
        domNoData: '- 暂时没有了哦 -'
      },
      distance: 50,
      loadDownFn: function (me) {
        page++;
        // 拼接HTML
        var result = '';
        var logourl = ''
        $.ajax({
          url: hosturl + '/index.php/Newindex/info',
          type: 'get',
          dataType: 'json',
          data: {
            id: tabId,
            tags: '',
            page: page
          },
          success: function (data) {
            console.log(data)
            if (onOff && data.infolist.length > 0) {
              if (data.infolist[0].livetype === '2' && data.infolist[0].ischoes !== '2') {
                // '语音'
                listcontent = $('#audio_advance .audio_content')
              } else if (data.infolist[0].livetype === '1' && data.infolist[0].ischoes !== '2') {
                // '视频'
                listcontent = $('#home_advance .list_content')
              } else if (data.infolist[0].ischoes === '2') {
                // '精选课程包'
                listcontent = $('.class_bag .bag_content')
              }
              onOff = false
            }
            var arrLen = data.infolist.length;
            var otherdata = data.infolist
            if (arrLen > 0) {
              for (var i = 0; i < arrLen; i++) {
                var livetype = Number(otherdata[i].livetype),
                  id = otherdata[i].id,
                  picture = otherdata[i].picture
                audiotitle = otherdata[i].content,
                  title = otherdata[i].title.trim(),
                  time = new Date(Number(otherdata[i].starttime) * 1000).toLocaleDateString(),
                  name = otherdata[i].name,
                  ischoes = Number(otherdata[i].ischoes),
                  price = otherdata[i].price,
                  sumi = otherdata[i].sumi,
                  suming = otherdata[i].suming
                // 语音课程
                if (livetype === 2 && ischoes !== 2) {
                  result +=
                    '<li class="audio_item" data-id="' + id + '">' +
                    '<a class="audio_wrapper history"  href="' + hosturl + '/index.php/Index/livedeil_0/id/' + id + '">' +
                    '<i class="icon">' +
                    '<img src="' + picture + '" alt="">' +
                    '</i>' +
                    '<span class="audio_info">' +
                    '<span class="audio_title">' + title + '</span>' +
                    '<span class="audio_owner">' + name + '</span>' +
                    '<span class="audio_hot">' +
                    '<time>' + time + '</time>' +
                    '</span>' +
                    '</span>' +
                    '</a>' +
                    '</li>'
                  // 视频
                } else if (livetype === 1 && ischoes !== 2) {
                  result +=
                    '<li class="single_video" data-id="' + id + '" >' +
                    '<a class="single_list_wrapper history" href="' + hosturl + '/index.php/Newautolive/index/id/' + id + '">' +
                    '<section class="list_header">' +
                    '<span class="list_header_info">' +
                    '<img class="class_type" src="https://cdn2.qnzsvk.cn/static/20170915/images/all_live_video@2x.png" alt="">' +
                    '<p class="is_free">免费</p>' +
                    '</span>' +
                    '<img src="' + picture + '" alt="">' +
                    '<span class="title">' +
                    '<title class="video_introduce">' + title + '</title>' +
                    '</span>' +
                    '</section>' +
                    '<p class="video_owner">' + name + '</p>' +
                    '</a>' +
                    '</li>'
                  // 课程包
                } else if (livetype && ischoes === 2) {
                  result += `
                    <li class="bag_item" data-id="${id}">
                      <a class="bag_wrapper history" href="javascript:">
                        <i class="icon">
                          <img
                              src="${picture}"
                              alt=""> 
                        </i>
                        <span class="audio_info">
                          <span class="audio_title">${title}</span>
                          <span class="audio_owner">${name}</span>
                          <span class="audio_hot">
                            <span>更新至第${suming}课/共${sumi}课</span>
                            <!--<span>126购买</span>-->
                            <span class="bag_price">￥${price}</span>
                          </span>
                        </span>
              
                      </a>
                    </li>
                  `
                }
              }
            } else {
              // 锁定
              me.lock();
              // 无数据
              me.noData();
            }
            // 插入数据到页面，放到最后面
            if (listcontent) {
              listcontent.append(result);
            }
            // 每次数据插入，必须重置
            me.resetload();
          },
          error: function (xhr, type) {
            console.log('Ajax error!');
            // 即使加载出错，也得重置
            me.resetload();
          }
        }).done(function () {
          // 记录历史记录
          history()
          // 课程包点击
          bagClick()
        });
      }
    });

    // 获取遮罩数据
    $.ajax({
      url: hosturl + '/index.php/Newindex/tags/id/' + tabId,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        // 遮罩数据渲染函数
        This.maskData(data.tagslist, This)
        if (data.tagslist.length) {
          This.tabMsk.css('display', 'block')
        } else {
          This.tabMsk.css('display', 'none')
        }
      },
      error: function (err) {
        console.log(err)
      }
    }).done(function () {
      // 选项卡过滤
      var tabMskDetials = This.tabMsk.get(0).getElementsByTagName('div')
      This.tabFilter(tabMskDetials, This)
    })
  }
  This.cid[0] = tabId
};
// 页面滚动
TabCenter.prototype.windowScroll = function () {
  $(window).scroll(function () {
    var bodyScroll = document.body.scrollTop || document.documentElement.scrollTop
  })
}
// 遮罩数据点击过滤
TabCenter.prototype.tabFilter = function (maskcontent, This) {
  var itemA = null;
  for (var k = 0; k < maskcontent.length; k++) {
    itemA = maskcontent[k].querySelectorAll("span");
    maskcontent[k].prevNode = null;
    maskcontent[k].index = k;
    for (var m = 0; m < itemA.length; m++) {
      itemA[m].onOff = true
      itemA[m].addEventListener('touchstart', function () {
        chooseObj.tags = ' '
        This.tagsstr = ''
        var parent = this.parentNode;
        if (parent.prevNode) {
          parent.prevNode.className = ''
        }
        // 点击切换筛选明细状态
        if (this.onOff) {
          this.className = 'search_active';
          this.onOff = false
          This.tagss[parent.index + 1] = this.getAttribute('data-id')
          for (var attr in This.tagss) {
            This.tagsstr += This.tagss[attr] + ','
          }
        } else {
          this.className = ''
          This.tagss[parent.index + 1] = ''
          this.onOff = true
          for (var key in This.tagss) {
            This.tagsstr += This.tagss[key] + ','
          }
        }
        parent.prevNode = this;
        // 传给后台筛选数据的参数
        var reg = /\d+/g
        if (reg.test(This.tagsstr)) {
          chooseObj.tags = This.tagsstr.match(reg).join(',') + ','
        } else {
          chooseObj.tags = ''
        }
        chooseObj.id = This.cid[0]
        console.log(chooseObj)
        // 数据筛选
        advanceData(chooseObj)
      })
    }
  }
};
// 遮罩数据获取;
TabCenter.prototype.maskData = function (data, This) {
  var str1 = '',
    str2 = '',
    str3 = '',
    sum = 0
  for (var i = 0; i < data.length; i++) {
    var tag2 = data[i].tag2,
      tag3 = data[i].tag3,
      tag4 = data[i].tag4,
      id2 = data[i].ta2,
      id3 = data[i].ta3,
      id4 = data[i].ta4
    if (tag2) {
      str1 += '<span data-id="' + id2 + '">' + tag2 + '</span>'
      This.tabMsk.find('.objects').find('h2').css('display', 'block')
      This.tabMsk.find('.objects').html('<h2>学科:</h2>' + str1)
      // 弹窗引导
      pageState = false
      winguidan.init(data_tanchu)
      clickState = false
    }

    if (tag3) {
      str2 += '<span data-id="' + id3 + '">' + tag3 + '</span>'
      This.tabMsk.find('.stages').find('h2').css('display', 'block')
      This.tabMsk.find('.stages').html('<h2>学段:</h2>' + str2)
      // 弹窗引导
      pageState = false
      winguidan.init(data_tanchu)
      clickState = false

    } else {
      sum++
      if (sum === data.length) {
        This.tabMsk.find('.stages').html(' ')
      }
    }
    if (tag4 && false) {
      str3 += '<span data-id="' + id4 + '">' + tag4 + '</span>'
      This.tabMsk.find('.classes').find('h2').css('display', 'block')
      This.tabMsk.find('.classes').html('<h2>年级:</h2>' + str3)
    }
  }

};
// 清空筛选对象
TabCenter.prototype.clearObj = function (obj) {
  for (var attr in obj) {
    delete obj[attr]
  }
};

// 固定tab
function TabFixed(tab, header) {
  this.tab = $(tab)
  this.headerHeight = $(header).height()
}

TabFixed.prototype.init = function () {
  var This = this
  $(window).scroll(function () {
    var bodyScroll = document.body.scrollTop || document.documentElement.scrollTop
    if (bodyScroll > This.headerHeight) {
      This.tab.css({
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 99
      })
    } else {
      This.tab.css({
        position: 'static'
      })
    }
  })
};

// 直播倒计时函数
function countDown(intDiff, living) {
  // 设置定时器
  var timer = null;
  var allCutTime = $('.all-cut-time')
  var liveingMark = $('#living_mark')
  timer = setInterval(function () {
    var day = 0,
      hour = 0,
      minute = 0,
      second = 0;
    //时间默认值
    if (intDiff > 0) {
      day = Math.floor(intDiff / (60 * 60 * 24));
      hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
      minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      if (minute <= 9)
        minute = '0' + minute;
      if (second <= 9)
        second = '0' + second;
    } else if (intDiff < 0 && living === 1) {
      allCutTime.html(
        '<span class="video_introduce">直播进行中...</span>'
      );
      liveingMark.html('直播中...')
      // 清除定时器
      clearInterval(timer);
      return;
    } else if (living === 2) {
      allCutTime.html(
        '<span class="video_introduce">直播进行中...</span>'
      );
      liveingMark.html('直播中...')
      // 清除定时器
      clearInterval(timer);
      return;
    }
    allCutTime.html(
      '<span>倒计时：</span>' +
      '<span>' + day + '天' + hour + '时' + minute + '分' + second + '秒' + '</span>'
    )
    intDiff--;
  }, 1000);
}

// loading样式
function loading(showhide) {
  $('.loading').css('display', showhide)
}

// 历史记录
function history() {
  setTimeout(function () {
    var history = document.querySelectorAll('.history')
    for (var i = 0; i < history.length; i++) {
      history[i].addEventListener('click', function () {
        $.ajax({
          url: hosturl + '/index.php/Index/addsee',
          type: 'get',
          dataType: 'json',
          data: {
            live_id: this.getAttribute('data-id'),
            playtime: new Date().getTime()
          },
          success: function (data) {
            console.log(data)
          }
        })
        $.ajax({
          url: hosturl + '/index.php/Newautolive/seecount',
          type: 'get',
          dataType: 'json',
          data: {
            id: this.getAttribute('data-id')
          },
          success: function (data) {
            console.log(data)
          },
          error: function (err) {
            console.log(err)
          }
        })
      })
    }
  }, 200)
}

// 分享提示
function ShareRemind() {
  this.body = $('body')
}

ShareRemind.prototype.init = function () {
  var This = this
  $.ajax({
    url: hosturl + '/index.php/Newindex/tanchu',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      console.log(data)
      if (data == null) {
        $.ajax({
          url: hosturl + '/index.php/Newindex/tanchu2',
          type: 'get',
          dataType: 'json',
          success: function (data) {
            console.log(data)
            var imgSrc = data.tanchupath;
            var imgUrl = data.tanchuurl;
            This.body.append(
              '<section id="rules" class="center_box">' +
              '<div class="rules">' +
              '<div class="rules_content">' +
              '<img class="close_btn" src="https://cdn2.qnzsvk.cn/static/20170927_/qnvk_2.0/images/popup_coupon_close_btn@3x.png">' +
              '<a href="' + imgUrl + '">' +
              '<img class="get_rules" src=" ' + imgSrc + ' ">' +
              '</a>' +
              '</div>' +
              '</div>' +
              '</section>'
            )
            This.close()
          }
        })

      }
    }
  })
}
ShareRemind.prototype.close = function () {
  setTimeout(function () {
    var closebtn = $('#rules .close_btn')
    var rules = $('#rules')
    var rulescontent = document.querySelector('#rules .rules')
    closebtn.on('click', function () {
      rules.css({
        display: 'none'
      })
    })
    rules.on('click', function () {
      this.css({
        display: 'none'
      })
    })
    rulescontent.addEventListener('click', function (e) {
      e.stopPropagation()
    })
  }, 500)
}

// 直播播放次数统计
function livingNums() {
  var livingSum = $('#class_advance').find('.history')
  // livingSum.attr('href', 'javascript:')
  livingSum.on('click', function () {
    $.ajax({
      url: hosturl + '/index.php/Newautolive/seecount',
      type: 'get',
      dataType: 'json',
      data: {
        id: this.getAttribute('data-id')
      },
      success: function (data) {
        console.log(data)
      },
      error: function (err) {
        console.log(err)
      }
    })
  })
}