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
    dataType: 'json',
    success: function (data) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          var picture = data[i].picture
          var name = data[i].name
          var title = data[i].title
          var historyid = data[i].historyid
          var time = new Date(Number(data[i].starttime) * 1000).toLocaleString()
          var id = data[i].liveid
          var livetype = data[i].livetype
          var playurl = ''
          if (livetype === '2') {
            playurl = 'livedeil_0'
          } else {
            playurl = 'livedeil'
          }
          This.playhistory.append(
            '<li class="history_wrapper">' +
            '<a class="history_title" href="' + hosturl + '/index.php/Index/' + playurl + '/id/' + id + '">' +
            '<img src="' + picture + '" alt="">' +
            '<span class="history_info">' +
            '<span class="class_title">' + title + '</span>' +
            '<span class="class_user">' + name + '</span>' +
            '<span class="play_time">' + time + '</span>' +
            '</span>' +
            '</a>' +
            '<span data-id="' + historyid + '"  class="deleteone" ">' +
            '<img class="delete" src="https://cdn2.qnzsvk.cn/static/20170925/qnvk_2.0/images/history_delete_btn@2x.png" alt="删除">' +
            '</span>' +
            '</li>'
          )
        }
      } else {
        This.playhistory.html(
          '<li class="no_record">' +
          '<span>暂无播放记录</span>' +
          '</li>'
        )
      }
      console.log(data)
    }
  }).done(function () {
    var deletebtn = $('#play_history .deleteone')
    var historywrapper = $('#play_history .history_wrapper')
    deletebtn.on('click', function () {
      var id = this.getAttribute('data-id')
      if (this.parentNode.parentNode.childNodes.length <= 2) {
        This.playhistory.html(
          '<li class="no_record">' +
          '<span>暂无播放记录</span>' +
          '</li>'
        )
      } else {
        this.parentNode.parentNode.removeChild(this.parentNode)
      }
      $.ajax({
        url: hosturl + '/index.php/Client/delplayhistory',
        type: 'get',
        dataType: 'json',
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