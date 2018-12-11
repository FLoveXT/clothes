$(function () {

  /*初始化scroll控件*/
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005
  });

  /*初始化二级分类列表*/
  getSecondClass(1);

  /*获取左边分类数据*/
  $.ajax({
    url: 'http://api.douban.com/v2/movie/top250',//模拟后台接口
    type: 'get',
    success: function (res) {
      //模拟后台拿到的数据
      var data = [
        {
          "id": 1,
          "categoryName": "男装",
          "isDelete": 1
        },
        {
          "id": 2,
          "categoryName": "女装",
          "isDelete": 1
        },
        {
          "id": 3,
          "categoryName": "童装",
          "isDelete": 1
        },
        {
          "id": 4,
          "categoryName": "春装",
          "isDelete": 1
        },
        {
          "id": 5,
          "categoryName": "夏装",
          "isDelete": 1
        },
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        },
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        },
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        },
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        },
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        },
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        },
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        }
        ,
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        }
        ,
        {
          "id": 6,
          "categoryName": "秋装",
          "isDelete": 1
        }
      ];
      var html = template('firstClass', { result: data })
      $('#con-l-first').html(html)
    },
    error: function (res) {

    }
  })

  /*点击一级分类获取二级分类*/
  $('#con-l-first').on('tap', 'li', function () {
    var id = $(this).attr('data-id')
    $(this).addClass('active').siblings().removeClass('active')
    getSecondClass(id)
  })


});
/*根据一级分类的ID获取右边分类数据*/
function getSecondClass(id) {
  $.ajax({
    url: 'http://api.douban.com/v2/movie/top250',//模拟后台接口
    type: 'get',
    data: {
      id: id
    },
    success: function (res) {
      var picurl = './images/man.jpg'
      //利用id模拟一下女装时的数据
      if (id == 2) {
        picurl = './images/women.jpg'
      }
      var data = [
        {
          "id": 1,
          "secondName": "卫衣",
          "categoryId": 1,
          "pic": picurl,
          "isDelete": 1,
          "categoryName": "男装",
          "hot": 1
        },
        {
          "id": 2,
          "secondName": "裤子",
          "categoryId": 1,
          "pic": picurl,
          "isDelete": 1,
          "categoryName": "男装",
          "hot": 1
        },
        {
          "id": 3,
          "secondName": "校园风",
          "categoryId": 1,
          "pic": picurl,
          "isDelete": 1,
          "categoryName": "男装",
          "hot": 1
        },
        {
          "id": 4,
          "secondName": "牛仔裤",
          "categoryId": 1,
          "pic": picurl,
          "isDelete": 1,
          "categoryName": "男装",
          "hot": 1
        },
        {
          "id": 5,
          "secondName": "休闲裤",
          "categoryId": 1,
          "pic": picurl,
          "isDelete": 1,
          "categoryName": "男装",
          "hot": 1
        }
      ]

      var html = template('secondClass', { result: data })
      $('#con-r-second').html(html)

    },
    error: function (res) {

    }
  })
}