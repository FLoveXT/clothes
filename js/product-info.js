$(function () {
  /*轮播图自动轮播*/

  mui('.mui-slider').slider({
    interval: 2000
  })

  // 初始化产品相关参数
  var productData = {
    proId: '',
    proColor: '黑色',
    proSize: 'XS',
    buyNum: 0
  }


  /**
   * 获取产品的id
   */
  productData.proId = getQueryString('proid');



  /**
   * 点击服务，选择，参数，弹出对话框
   */
  $('.proInfo-list').on('tap', '.proInfo-list-item', function () {

    var nodeClass = $(this).attr('data-role')//获取到属性值，用来显示那个section
    $('.widgets-cover').addClass('show').parent().addClass('fixed');//显示对话框
    $('.' + nodeClass).addClass('sectionShow');//显示哪个section

    /**
     * 在choice的section中，点击颜色，和尺码，获取点击元素的值
     */
    $('.colors').on('tap', 'p', function () {
      $(this).addClass('active').siblings().removeClass('active')
      productData.proColor = $(this).text()
    })
    $('.sizes').on('tap', 'p', function () {
      $(this).addClass('active').siblings().removeClass('active')
      productData.proSize = $(this).text()
    })

    /**
     * 购买数量，点击+数量加，点击-数量-，不能小于0，每次点击都获取到里面的值
     */
    $('.mui-numbox-btn-minus').on('tap',function(){
      productData.buyNum = $('.mui-numbox-input').val()
    })
    $('.mui-numbox-btn-plus').on('tap',function(){
      productData.buyNum = $('.mui-numbox-input').val()
    })

    /**
     * 点击 确定按钮，获取整个的 产品参数 productData
     * 同时，隐藏section和对话框
     */
    $('.confirm').on('tap',function(){
      console.log(productData);
      $('.widgets-cover').removeClass('show').parent().removeClass('fixed')//隐藏对话框
      $('.' + nodeClass).removeClass('sectionShow');//隐藏刚显示的section
    })


    $('.cover-bg').on('tap', function () {
      $('.widgets-cover').removeClass('show').parent().removeClass('fixed')//隐藏对话框
      $('.' + nodeClass).removeClass('sectionShow');//隐藏刚显示的section
    })
  })

  /**
   * 点击加入购物车，把参数传到后台，进入到购物车页面
   * 1.先要判断用户是否登录，如果没有登录，调到login页面
   */

    /**
   * 点击立即购买，把参数传到后台，进入到付款详情页面
   * 1.先要判断用户是否登录，如果没有登录，调到login页面
   */
})