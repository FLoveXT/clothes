$(function () {

  /*
    点击搜索按钮，
    1. 获取到输入框的值
    2. 根据输入框的值跳转到搜索结果页面，把值传过去
    3. 把搜索框的值存到本地存储localstorage中  
  */

  var searchArr = getLocalStorage('searchArr');//初始化搜索数组数据
  renderSearch(searchArr);//初始化渲染搜索列表
  $("#search-btn").on('tap', function () {
    var searchVal = $('.mui-input-search').val().trim();
    if (searchVal) {
      searchArr.unshift(searchVal);
      //存到本地
      localStorage.setItem('searchArr', JSON.stringify(searchArr));

      searchArr = getLocalStorage('searchArr');
      renderSearch(searchArr);
      location.href = "search-result.html?keyword="+searchVal;
      $('.mui-input-search').val('');

    } else {
      mui.toast('请正确输入', { duration: 'long', type: 'div' })
    }
  })
  //点击清空历史，搜索列表清空
  $('#removeSearch').on('tap', function () {
    localStorage.removeItem('searchArr');
    $('#searchListWrap').html('');
  })
})

/*
*  渲染搜索列表
*/
function renderSearch(data) {
  var html = template('searchList', { result: data })
  $('#searchListWrap').html(html);
}

/*
* 获取本地存储数据
*/

function getLocalStorage(name) {
  if (localStorage.getItem(name)) {
    return JSON.parse(localStorage.getItem('searchArr'));
  } else {
    return [];
  }
}