$(function () {
  var playhistory = new PlayHistory()
  playhistory.init()
})

// 播放历史构造函数
function PlayHistory() {
  this.playhistory = $('#play_history')
}

// 初始化
PlayHistory.prototype.init = function () {
  this.playhistory.html(' ')
  var This = this
  $.ajax({
    url: hosturl + '/index.php/Client/playhistory',
    type: 'get',
    dataType: 'jsonp',
    jsonp: 'jsonpcallback',
    success: function (data) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var picture = data[i].picture
          var name = data[i].name
          var title = data[i].title
          var historyid = data[i].historyid
          This.playhistory.append(
            '<li class="history_wrapper">' +
            '<a class="history_title" href="javascript:">' +
            '<img src="' + picture + '" alt="">' +
            '<span class="history_info">' +
            '<span class="class_title">' + title + '</span>' +
            '<span class="class_user">' + name + '</span>' +
            '</span>' +
            '</a>' +
            '<span data-id="' + historyid + '"  class="deleteone" ">' +
            '<img class="delete" src="https://cdn2.qnzsvk.cn/static/20170925/qnvk_2.0/images/history_delete_btn@2x.png" alt="删除">' +
            '</span>' +
            '</li>'
          )
        }
      }
      console.log(data)
    }
  }).done(function () {
    var deletebtn = $('#play_history .deleteone')
    var historywrapper = $('#play_history .history_wrapper')
    deletebtn.on('click', function () {
      var id = this.getAttribute('data-id')
      this.parentNode.parentNode.removeChild(this.parentNode)
      $.ajax({
        url: hosturl + '/index.php/Client/delplayhistory',
        type: 'get',
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        data: {
          id: id
        },
        success: function (data) {
          console.log(data)
        }
      })
    })
  })
}
// 删除记录
PlayHistory.prototype.delete = function () {

}