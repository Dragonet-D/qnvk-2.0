$(function () {
    tabClick()
})
var tabs = $('.tab')
var tabContent = $('.tab_content')

$.ajax({
    url: hosturl + '/index.php/Client/buyedcourse',
    type: 'get',
    data: {
        type: 1
    },
    dataType: 'json',
    success: function (data) {
        if (data.live.length > 0) {
            var str = ''
            for (var i = 0; i < data.live.length; i++) {
                str += `
        <li class="bought_content history">
          <h3 class="title">
            <span class="class_name">课程包</span>
            <span class="status">已购买</span>
          </h3>
          <a class="class_list" href="${hosturl}/index.php/Newautolive/index/id/${data.live.id}">
            <img
                src="${data.live[i].picture}" alt="">
            <span class="class_info">
            <span class="class_title">${data.live[i].title}</span>
              <span class="class_user">${data.live[i].name}</span>
            </span>
            <span class="price">￥${data.live[i].totalprice}</span>
          </a>
        </li>
      `
            }
            tabContent[0].innerHTML = str
        } else {
            tabContent[0].innerHTML = `
        <li class="bought_record">
          <span>您还未购买任何课程</span>
        </li>
      `
        }

    }
})

function tabClick() {
    var onOff = true
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].index = i
        tabs[i].onclick = function () {
            for (var i = 0; i < tabContent.length; i++) {
                tabContent[i].style.display = 'none'
                tabs[i].className = 'tab'
            }
            tabContent[this.index].style.display = 'block'
            tabs[this.index].className = 'tab tab_active'
            var This = this
            if (this.index !== 0 && onOff) {
                $.ajax({
                    url: hosturl + '/index.php/Client/buyedcourse',
                    type: 'get',
                    data: {
                        type: this.index + 1
                    },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data)
                        var str = ''
                        if (data.ticket.length > 0) {
                            for (var i = 0; i < data.ticket.length; i++) {
                                str += `
              <li class="tickets_item bought_content history" data-id="${data.ticket[i].id}">
                <h3 class="title">
                  <span class="status ticket_status">支付成功</span>
                </h3>
                <ul class="activity_content">
                  <li class="activity_item">
                    <div class="activity_left">
                      <img src="${data.ticket[i].tickets_picture}"
                           alt="">
                    </div>
                    <div class="activity_right">
                      <div class="activity_title">
                        <h2>${data.ticket[i].tickets_name}</h2>
                      </div>
                      <div class="time_where">
                        <time>${data.ticket[i].startime} | ${data.ticket[i].tikeaddress}</time>
                      </div>
                      <div class="activity_money">
                        <span class="money_sum">${data.ticket[i].tprice}</span>
                        <span class="money_unit">元</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              `
                            }
                            tabContent[1].innerHTML = str
                        } else {
                            tabContent[1].innerHTML = `
              <li class="bought_record">
                <span>您还未购买任何门票</span>
              </li>
              `
                        }
                        onOff = false
                    }
                }).done(function () {
                    var activityitems = document.querySelectorAll('.tickets_item')
                    for (var i = 0; i < activityitems.length; i++) {
                        activityitems[i].index = i
                        activityitems[i].onclick = function () {
                            var id = activityitems[this.index].getAttribute('data-id')
                            window.location.href = `${hosturl}/index.php/Client/playticket/id/${id}`
                        }
                    }
                })
            }

        }
    }
}
