$(function () {
  var hasbought = new HasBought()
  hasbought.init()
})

// 已购构造函数
function HasBought() {
  this.bought = $('#bought')
}

HasBought.prototype.init = function () {
  this.bought.html('')
  var This = this
  $.ajax({
    url: hosturl + '/index.php/Client/buyedcourse',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      console.log(data)
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var picture = data[i].picture
          var title = data[i].title
          var name = data[i].name
          var price = data[i].totalprice
        }
        This.bought.append(
          '<li class="bought_content">' +
          '<h3 class="title">' +
          '<span class="class_name">课程包</span>' +
          '<span class="status">已购买</span>' +
          '</h3>' +
          '<a class="class_list" href="javascript:">' +
          '<img src="' + picture + '" alt="">' +
          '<span class="class_info">' +
          '<span class="class_title">' + title + '</span>' +
          '<span class="class_user">' + name + '</span>' +
          '</span>' +
          '<span class="price">￥' + price + '</span>' +
          '</a>' +
          '</li>'
        )
      }else {
        This.bought.html(
          '<li class="bought_record">'+
          '<span>您还未购买任何课程</span>'+
          '</li>'
        )
      }
    }
  })
}