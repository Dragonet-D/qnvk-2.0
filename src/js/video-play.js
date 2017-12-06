$(function () {
  let adswiper = $('#banner .swiper-wrapper')
  let adinfo = new AdInfos(adswiper)
  adinfo.init()
})

class AdInfos {
  constructor(adswiper) {
    this.adWrapper = adswiper
  }

  // 初始化
  init() {
    $.ajax({
      url: hosturl + '/index.php/Newindex2/ad',
      type: 'get',
      dataType: 'jsonp',
      jsonp: 'jsonpcallback',
      success: (data) => {
        console.log(data)
        this.getAdS(data.ad)
      }
    }).done(() => {
      let banner = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        pagination: '.swiper-pagination'
      });
    })
  }

  // 渲染广告信息
  getAdS(adlist) {
    for (let i = 0; i < adlist.length; i++) {
      let adjieshao = adlist[i].ad_jieshao
      let imgUrl = adlist[i].adpath
      let adurl = adlist[i].adurl
      this.adWrapper.append(`
        <div class="swiper-slide">
          <a href="${adurl}">
            <img src="${imgUrl}" alt="">
          </a>
          <h2 class="swiper_title">${adjieshao}</h2>
        </div>
      `)
    }
  }
}
