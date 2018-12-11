
var username = localStorage.getItem('username')
if (!username) {//没有登录
  location.href = 'login.html'
}
$(function () {
  /**
   * 先要判断用户有没有登录，
   * 没有，跳转到登录界面
   * 有的话，拿到用户的数据渲染到页面
   */
  if(username){
    var html = template('userInfo', {username})
    $('#content').html(html)
  }


  /**
   * 点击退出登录，回到首页
   */
  $('#logout').on('tap',function(){
    localStorage.removeItem('username')
    setTimeout(function(){
      location.href = '../index.html'
    },2000)
  })
})
