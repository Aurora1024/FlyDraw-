const app = getApp()

Page({
	data: {
		userInfo: {},		
	},
	onLoad() {
    this.getUserInfo();
    this.setData({
      version: app.globalData.version
    });
	},	
  getUserInfo: function (cb) {
      var that = this       
      wx.login({
        success: function (res) {
          var code = res.code; //返回code
          console.log(code);
          var appId = '...';
          var secret = '...';
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
          },
          success: function(res){
            that.setData({
              userInfo: res.userInfo
            })
          }
          })
          wx.getUserInfo({
            success: function (res) {                        
              that.setData({
                userInfo: res.userInfo
              });  
            }
          })
        }
      })
  },
  aboutUs : function () {
    wx.showModal({
      title: '关于我们',
      content: '飞画~,祝大家使用愉快！',
      showCancel:false
    })
  }
})