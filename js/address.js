/**
 * 先要判断是否登录
 */
var username = localStorage.getItem('username')
if (!username) {//没有登录
  location.href = 'login.html'
}


$(function () {
  /**
   * 获取用户存储的所有收货地址，进行渲染
   */
  var address = [{ //模拟数据
    id: 'adsf4545644564sd',
    userId: '123456sdfdsf4567',
    address: '中国少林寺',
    addressDetail: '后花园扫地憎',
    phoneNum:'12345678900',
    receiver:'张三'
  },
  {
    id: 'adsf4545644564sd',
    userId: '123456sdfdsf4567',
    address: '中国武当山',
    addressDetail: '山顶张三丰',
    phoneNum:'12345678900',
    receiver:'李四'
  }]

  $.ajax({
		url: 'http://api.douban.com/v2/movie/top250',
		type: 'get',
		success: function(res) {
      //模拟成功拿到数据
      
			res = address;

			var html = template("addressList",{result:res});

			$('#address-wrap').html(html);
			
		}
	})


  /**
   * 点击编辑，进入到编辑页面
   */
  $('#address-wrap').on('tap','.edit-btn',function(){
    var id = $(this).attr('data-id');
    //根据id找出是哪个数据
    var editAdd = address.find((el)=> {return el.id === id})
    //存到本地存储
    localStorage.setItem('editAdd',JSON.stringify(editAdd));
    // 跳转到编辑页面
		location.href = "add-address.html?isEdit="+id;
  })
})