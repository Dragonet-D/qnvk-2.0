'use strict';

$(function () {
  tabClick();
});
var tabs = $('.tab');
var tabContent = $('.tab_content');

$.ajax({
  url: hosturl + '/index.php/Client/buyedcourse',
  type: 'get',
  data: {
    type: 1
  },
  dataType: 'json',
  success: function success(data) {
    if (data.live.length > 0) {
      var str = '';
      for (var i = 0; i < data.live.length; i++) {
        str += '\n        <li class="bought_content history">\n          <h3 class="title">\n            <span class="class_name">\u8BFE\u7A0B\u5305</span>\n            <span class="status">\u5DF2\u8D2D\u4E70</span>\n          </h3>\n            <a class="class_list" href="' + hosturl + '/index.php/Newautolive/index/id/' + data.live[i].liveid + '">\n            <img\n                src="' + data.live[i].picture + '" alt="">\n            <span class="class_info">\n            <span class="class_title">' + data.live[i].title + '</span>\n              <span class="class_user">' + data.live[i].name + '</span>\n            </span>\n            <span class="price">\uFFE5' + data.live[i].totalprice + '</span>\n          </a>\n        </li>\n      ';
      }
      tabContent[0].innerHTML = str;
    } else {
      tabContent[0].innerHTML = '\n        <li class="bought_record">\n          <span>\u60A8\u8FD8\u672A\u8D2D\u4E70\u4EFB\u4F55\u8BFE\u7A0B</span>\n        </li>\n      ';
    }
  }
});

function tabClick() {
  var onOff = true;
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].index = i;
    tabs[i].onclick = function () {
      for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
        tabs[i].className = 'tab';
      }
      tabContent[this.index].style.display = 'block';
      tabs[this.index].className = 'tab tab_active';
      var This = this;
      if (this.index !== 0 && onOff) {
        $.ajax({
          url: hosturl + '/index.php/Client/buyedcourse',
          type: 'get',
          data: {
            type: this.index + 1
          },
          dataType: 'json',
          success: function success(data) {
            console.log(data);
            var str = '';
            if (data.ticket.length > 0) {
              for (var i = 0; i < data.ticket.length; i++) {
                str += '\n              <li class="tickets_item bought_content history" data-id="' + data.ticket[i].liveid + '">\n                <h3 class="title">\n                  <span class="status ticket_status">\u652F\u4ED8\u6210\u529F</span>\n                </h3>\n                <ul class="activity_content">\n                  <li class="activity_item">\n                    <div class="activity_left">\n                      <img src="' + data.ticket[i].tickets_picture + '"\n                           alt="">\n                    </div>\n                    <div class="activity_right">\n                      <div class="activity_title">\n                        <h2>' + data.ticket[i].tickets_name + '</h2>\n                      </div>\n                      <div class="time_where">\n                        <time>' + data.ticket[i].startime + ' | ' + data.ticket[i].tikeaddress + '</time>\n                      </div>\n                      <div class="activity_money">\n                        <span class="money_sum">' + data.ticket[i].tprice + '</span>\n                        <span class="money_unit">\u5143</span>\n                      </div>\n                    </div>\n                  </li>\n                </ul>\n              </li>\n              ';
              }
              tabContent[1].innerHTML = str;
            } else {
              tabContent[1].innerHTML = '\n              <li class="bought_record">\n                <span>\u60A8\u8FD8\u672A\u8D2D\u4E70\u4EFB\u4F55\u95E8\u7968</span>\n              </li>\n              ';
            }
            onOff = false;
          }
        }).done(function () {
          var activityitems = document.querySelectorAll('.tickets_item');
          for (var i = 0; i < activityitems.length; i++) {
            activityitems[i].index = i;
            activityitems[i].onclick = function () {
              var id = activityitems[this.index].getAttribute('data-id');
              window.location.href = hosturl + '/index.php/Client/playticket/id/' + id;
            };
          }
        });
      }
    };
  }
}
//# sourceMappingURL=bought.js.map