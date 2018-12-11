$(function () {
  /**
   * 点击发送验证码
   * 得到手机号码，发送到后台，得到验证码
   * 同时验证码的内容变为倒计时
   * 输入验证码，失去焦点后，验证验证码是否正确
   */


  var vCode = '';

  $('.vertifyCode').on('tap', function () {
    var phoneNum = $('[name="phoneNum"]').val().trim();
    if (!phoneNum) {
      mui.toast("请输入手机号码", 1)
    }
    if (!(/^1[34578]\d{9}$/.test(phoneNum))) {
      mui.toast("手机号码错误", 1)
      return false;
    }
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',
      type: 'get',
      data: {
        phoneNum: phoneNum
      },
      success: function (res) {
        /**
         * 模拟返回一个随机6位数字
         */
        vCode = Math.floor((Math.random()*9+1) * 100000);
        mui.toast("验证码是:" + vCode, 15)
        setTime();
        if (duringTime) {
          $('[name="vCode"]').on('blur', function () {
            if ($('[name="vCode"]').val()*1 !== vCode) {
              mui.toast("验证码错误", 1)
              return false;
            }else{
              // 验证码正确，点击确认，发送注册
              $('.confirm').on('tap',function(){
                Register();
              })
            }
          })
        }
      }
    })
  })

  /**
   * 同时验证码的内容变为倒计时
   * 输入验证码，失去焦点后，验证验证码是否正确
   */
  var endTime = 20;
  var that = $('.vertifyCode');
  var duringTime = false;
  function setTime() {
    if (endTime == 0) {
      that.removeAttr("disabled");
      that.text("获取验证码");
      endTime = 20;
      duringTime = false;
      return false;
    } else {
      that.attr("disabled", false);
      that.text("(" + endTime + "秒)");
      endTime--;
      duringTime = true;
    }
    setTimeout(function () {
      setTime();
    }, 1000)
  }

  /**
   * 发送注册
   */
  function Register(){
    var username = $('[name="username"]').val().trim();
		var password = $('[name="password"]').val().trim();
    var password2 = $('[name="password2"]').val().trim();
    var phoneNum = $('[name="phoneNum"]').val().trim();
    if(!username){
      mui.toast("请输入用户名",2)
    }
    if(!password && !password2){
      mui.toast("请输入密码",2)
    }
    if(password !== password2){
      mui.toast("两次密码不一样",2)
    }
    //发送ajax到注册接口
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',//模拟注册接口
      type: 'post',
      data: {
        username: username,
				password: password,
        phoneNum: phoneNum,
      },
      success: function (res) {
       /**
        * 模拟成功注册
        */
       localStorage.setItem('username',username);
       localStorage.setItem('password',password);
       mui.toast("注册成功",2)
       setTimeout(function(){
         //跳转到登录
         location.href = "login.html";
       },2000)
      }
    })
  }

})