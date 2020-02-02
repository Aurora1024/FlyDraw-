//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false , // loading
    userInfo: {},
    swiperCurrent: 0,  
    selectCurrent:0,
    categories: [],
    banners:[],
    activeCategoryId: 0,
    goods:[],
    scrollTop:"0",
    loadingMoreHidden:true,

    hasNoCoupons:true,
    coupons: [],
    src01: '../../images/Images/good_works/01.jpeg',
    src02: '../../images/Images/good_works/02.jpeg',
    src03: '../../images/Images/good_works/03.jpeg',
    src04: '../../images/Images/good_works/04.jpeg',    
    src05: '../../images/Images/good_works/05.jpeg',
    src06: '../../images/Images/good_works/06.jpeg',       
    src07: '../../images/Images/good_works/07.jpeg',        
    src08: '../../images/Images/good_works/08.jpeg',
    src09: '../../images/Images/good_works/09.jpeg',
    src10: '../../images/Images/good_works/10.jpeg',
    src11: '../../images/Images/good_works/11.jpeg',
    src12: '../../images/Images/good_works/12.jpeg',       
    src13: '../../images/Images/good_works/13.jpeg',       
    src14: '../../images/Images/good_works/14.jpeg',       
    src15: '../../images/Images/good_works/15.jpeg'           
  },

  tabClick: function (e) {
    e = {
      id:1,
      msg:"sdsada"
    }
    var that = this;
    that.setData({
      activeCategoryId: 2201
    });
    that.getGoodsList(2201);
    wx.navigateTo({
      url: "/pages/goods-details/index?id=2201"
    })
  },
  //事件处理函数
  swiperchange: function(e) {
      //console.log(e.detail.current)
       this.setData({  
        swiperCurrent: e.detail.current  
    })  
  },
  toDetailsTap:function(e){
    wx.navigateTo({
      url:"/pages/goods-details/index?id=2201"
    })
  },
  tapBanner: function(e) {
    if (e.currentTarget.dataset.id != 0) {
      wx.navigateTo({
        url: "/pages/goods-details/index?id=2201"
      })
    }
  },
  bindTypeTap: function(e) {
     this.setData({  
        selectCurrent: e.index  
    })  
  },
  scroll: function (e) {
    //  console.log(e) ;
    var that = this,scrollTop=that.data.scrollTop;
    that.setData({
      scrollTop:e.detail.scrollTop
    })
    // console.log('e.detail.scrollTop:'+e.detail.scrollTop) ;
    // console.log('scrollTop:'+scrollTop)
  },
  onShow:function(){
    this.login();
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    that.setData({
      banners: [
        {picurl: '../../images/Images/good_works/16.jpeg'},
        ]
    })
      
        if (app.globalData.userInfo) {
          console.log(1)
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        } else if (this.data.canIUse) {
          console.log(2)
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          app.userInfoReadyCallback = res => {
            console.log(12)
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        } else {
          console.log(3)
          // 在没有 open-type=getUserInfo 版本的兼容处理
          wx.getUserInfo({
            success: res => {
              app.globalData.userInfo = res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            },
            fail: res => {
              console.log(4);
              this.setData({
                getUserInfoFail: true
              })
            }
          })
        }
  },
  getUserInfo: function (e) {
    console.log(5);
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      this.openSetting();
    }

  },
  login: function () {
    console.log(111)
    var that = this
    // if (typeof success == "function") {
    //   console.log(6);
    //   console.log('success');
    //   this.data.getUserInfoSuccess = success
    // }
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log(code);
        wx.getUserInfo({
          success: function (res) {
            console.log(7);
            app.globalData.userInfo = res.userInfo
            that.setData({
              getUserInfoFail: false,
              userInfo: res.userInfo,
              hasUserInfo: true

            })
            //平台登录
          },
          fail: function (res) {
            console.log(8);
            console.log(res);
            that.setData({
              getUserInfoFail: true
            })
          }
        })
      }
    })
  },
  //跳转设置页面授权
  openSetting: function () {
    var that = this
    if (wx.openSetting) {
      wx.openSetting({
        success: function (res) {
          console.log(9);
          //尝试再次登录
          that.login()
        }
      })
    } else {
      console.log(10);
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
      })
    }
  },
  getGoodsList: function (categoryId) {
    var that = this;
    that.setData({
      goods: [],
      loadingMoreHidden: true
    });
    var goods = [];
    var tmp = {
      "categoryId":1197,
      "characteristic": "",
      "commission": 0.00,
      "commissionType": 0,
      "dateAdd":"2018-01-01",
      "id": 2201, 
      "logisticsId": 0, 
      "minPrice": 1.00, 
      "minScore": 0,
      "name": "豆浆", 
      "numberFav": 0,
      "numberGoodReputation": 2, 
      "numberOrders": 1, 
      "originalPrice": 1.00, 
      "paixu": 0,
      "pic": '../../images/Images/good_works/15.jpeg' ,
      "pingtuan": false, 
      "pingtuanPrice": 0.00, 
      "recommendStatus": 0, 
      "recommendStatusStr": "普通",
      "shopId": 0, 
      "status": 0, 
      "statusStr": "上架", 
      "stores": 998, 
      "userId": 457, 
      "views": 17, 
      "weight": 0.10
    }
    goods.push(tmp);
    that.setData({
      goods:goods,
    })
    console.log(goods);
  },
})
