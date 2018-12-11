$(function () {
  /**
   * 获取用户名和密码，发送后台接口
   */
  $('.login').on('tap', function () {
    var username = $('[name="username"]').val().trim();
    var password = $('[name="password"]').val().trim();
    if (!username) {
      mui.toast("请输入用户名", 2)
    }
    if (!password) {
      mui.toast("请输入密码", 2)
    }
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',//模拟注册接口
      type: 'post',
      data: {
        username: username,
        password: password
      },
      success: function () {
        //模拟登录成功或失败
        /**
         * 先获取存储的username和password
         */
        var usernameF = localStorage.getItem('username');
        var passwordF = localStorage.getItem('password');
        if (username !== usernameF) {
          mui.toast('用户名错误', 2)
        } else
          if (password !== passwordF) {
            mui.toast('密码错误', 2)
          } else {
            /**
                    * 登录成功去 会员中心
                    */
            mui.toast('登录成功', 1)
            setTimeout(function () {
              location.href = "user.html";
            }, 2000)
          }

      }
    })
  })
})