/**
 * 先要判断是否登录
 */
var username = localStorage.getItem('username')
if (!username) {//没有登录
  location.href = 'login.html'
}

$(function () {
  /**
   * 修改密码
   * 点击确认，把数据发到修改密码接口，
   * 修改成功后跳转到登录页面
   * 重新登录
   */
  $('#modify-confirm').on('tap', function () {

    var oldPw = $.trim($("[name='oldPw']").val());

    var newPw = $.trim($("[name='newPw']").val());

    var newPw2 = $.trim($("[name='newPw2']").val());

    if (!oldPw) {
      mui.toast('请输入原密码', 2);
      return;
    }
    if (!newPw && !newPw2) {
      mui.toast('请输入新密码', 2);
      return;
    }
    if (newPw !== newPw2) {
      mui.toast('两次输入的密码不一样', 2)
    }

    //发送修改密码请求
    $.ajax({
      url: '/user/updatePassword',
      type: 'post',
      data: {
        oldPassword: oldPw,
        newPassword: newPw
      },
      success: function (res) {

        if (res.code) {

          mui.toast("修改密码成功");

          setTimeout(function () {
            location.href = "login.html";
          }, 2000)

        }

      }
    })
  })
})