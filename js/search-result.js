/**
 * 模拟了从后台拿数据，点击了价格和销量，页面的数据重新排序
 * 没有模拟往上拉，增加数据
 */


//初始化获取数据的参数

var keyword = getQueryString('keyword')

var data = {
  keyword: keyword,
  page: 1,
  priceSort: 1,//默认价格升序
  pageSize: 1
}

var isPriceTwo = false;//判断是不是降序，用来切换按价格升降序的值
var isNumTwo = false;//判断是不是降序，用来切换按销量升降序的值
var html = ''; //初始化模板

// 模拟后台来的数据
var analogData = [
  { id: 23, proName: '牛逼衣服',title:'这是个牛逼的衣服1', newPrice: 499.1,oldPrice:698, sellNum: 120,picAddress:'./images/clothes01.jpg'},
  { id: 24, proName: '牛逼衣服',title:'这是个牛逼的衣服2', newPrice: 599.1,oldPrice:798, sellNum: 320,picAddress:'./images/clothes02.jpg'},
  { id: 25, proName: '牛逼衣服',title:'这是个牛逼的衣服3', newPrice: 1099.1,oldPrice:898, sellNum: 20,picAddress:'./images/clothes03.jpg'},
  { id: 26, proName: '牛逼衣服',title:'这是个牛逼的衣服4', newPrice: 799.1,oldPrice:998, sellNum: 620,picAddress:'./images/clothes04.jpg'},
  { id: 27, proName: '牛逼衣服',title:'这是个牛逼的衣服5', newPrice: 899.1,oldPrice:1098, sellNum: 210,picAddress:'./images/clothes05.jpg'},
  { id: 28, proName: '牛逼衣服',title:'这是个牛逼的衣服6', newPrice: 999.1,oldPrice:1598, sellNum: 920,picAddress:'./images/clothes06.jpg'}
]


$(function () {


  //初始化scroll控件
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.005
  });

  /*
  *点击价格和销量
  1. 箭头翻转
  2. 发送请求
  * */
  //价格
  $('.price').on('tap', function () {
    data = {
      keyword: keyword,
      page: 1,
      priceSort: 1,//默认价格升序
      pageSize: 1
    }
    // 1. 箭头翻转
    toggleArrow(this)
    if(isPriceTwo){
      data.priceSort = 1;
      isPriceTwo = false;
    }else{
      data.priceSort = 2;
      isPriceTwo = true;
    }
    getData(data);
  })
  //销量
  $('.quantity').on('tap', function () {
    data = {
      keyword: keyword,
      page: 1,
      quantitySort: 1,
      pageSize: 1
    }
    // 1. 箭头翻转
    toggleArrow(this)
    if(isNumTwo){
      data.quantitySort = 1;
      isNumTwo = false;
    }else{
      data.quantitySort = 2;
      isNumTwo = true;
    }
    getData(data);
  })

  getData(data);//初始化页面

  /**
   * 点击查看详情，进入到产品详情页面，并把产品id传过去
   */
  /*点击一级分类获取二级分类*/
  $('.result-wrap').on('tap','.enter-info', function () {
    var id = $(this).attr('data-proid');
    location.href = "product-info.html?proid="+id;
  })
})

/*
* 箭头翻转函数
*/
function toggleArrow(node) {
  if ($(node).hasClass('mui-icon-arrowdown')) {
    $(node).removeClass('mui-icon-arrowdown').addClass('mui-icon-arrowup')
  } else {
    $(node).removeClass('mui-icon-arrowup').addClass('mui-icon-arrowdown')
  }
}
/*
* 根据参数发送请求数据
*/

function getData(data) {
  $.ajax({
    url: 'http://api.douban.com/v2/movie/top250',//模拟后台接口
    type: 'get',
    data: data,
    success:function(res){
      if(data.priceSort){
        if(data.priceSort ===1){
          html = template('seachResultList', {result:analogData.sort(compare('newPrice'))});
				  $('.result-wrap').html(html);
        }else if(data.priceSort ===2){
          html = template('seachResultList', {result:analogData.sort(compare('newPrice')).reverse()});
          $('.result-wrap').html(html);
        }
      }else if(data.quantitySort){
        if(data.quantitySort ===1){
          html = template('seachResultList', {result:analogData.sort(compare('sellNum'))});
				  $('.result-wrap').html(html);
        }else if(data.quantitySort ===2){
          html = template('seachResultList', {result:analogData.sort(compare('sellNum')).reverse()});
				  $('.result-wrap').html(html);
        }
      }
    }
  })
}

/**
 * 
 * @param {所需排序的属性} prop 
 * 进行从小到大排序
 */
var compare = function (prop) {
  return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (val1 < val2) {
          return -1;
      } else if (val1 > val2) {
          return 1;
      } else {
          return 0;
      }            
  } 
}
