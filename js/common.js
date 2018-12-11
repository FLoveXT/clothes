$(function(){
  $('body').on('tap','a',function(){
    mui.openWindow({
      url:$(this).attr('href')//恢复a标签的默认事件
    })
  })
})

/**
 *  获取GET中的URL参数
 */
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return "";
}

