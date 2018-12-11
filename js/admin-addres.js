$(function(){

  var isEdit = Number(getQueryString('isEdit'));

  if(isEdit === 0){
   //添加
   // 添加操作
		var html = template("adminAdd",{});

		$('#address-admin').html(html);
  }else {
    //编辑
    // 编辑操作
		if(localStorage.getItem("editAdd")){

			var address = JSON.parse(localStorage.getItem("editAdd"));

			var html = template("adminAdd",address);

			$('#address-admin').html(html);
			
		}
  }

  /**
   * 点击选择城市，显示城市数据
   */
  //创建对象
  var picker = new mui.PopPicker({layer: 3});
  //添加数据
  picker.setData(cityData);

  $('#selectCity').on('tap',function(){
    picker.show(function(selectItems){
			// 将用户选择的内容显示在文本框中
			$('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
		});
  })

  /**
   * 点击确认，添加地址
   */
  $('#addAddress').on('tap',function(){
    var receiver = $.trim($("[name='receiver']").val());
		var phoneNum = $.trim($("[name='phoneNum']").val());
		var city = $.trim($("[name='city']").val());
    var detail = $.trim($("[name='detailAdd']").val());
    
    if(!username && !phoneNum && !city && !detail){
      mui.toast('请全部输入',2);
      return;
    }

    var data = {
			receiver: receiver,
			phoneNum: phoneNum,
			address: city,
			addressDetail: detail
    };
    
    if(isEdit === 0){
      //新添加
      var url = "http://api.douban.com/v2/movie/top250"
    }else{
      //编辑
      var url = "http://api.douban.com/v2/movie/top250"
      data.id = isEdit
    }
    //发送给接口
    $.ajax({
			url: url,
			type: 'post',
			data: data,
			success: function(res) {
				
				if(res.code) {

					if(isEdit === 0){
						mui.toast("地址添加成功");
					}else{
						mui.toast("地址修改成功");
					}

					setTimeout(function(){
						location.href = "adress.html";
					},2000)

				}

			}
		})
  })
})