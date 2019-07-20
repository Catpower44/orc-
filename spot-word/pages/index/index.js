//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },

  onLoad: function () {

  },
  chooImg: function() {
    var url = app.globalData.webUrl
    //选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      success: res => {
        var paths = res.tempFilePaths[0];
        wx.showLoading({
          title: '识别中',
          mask: true
        })
        //上传文件
        wx.uploadFile({
          url: url+'/note/get_img',
          filePath: paths,
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success: res => {
            wx.setStorage({
              key: 'word',
              data: res.data,
              success(res){
                wx.hideLoading();
                wx.showToast({
                  title: '识别成功',
                  icon: 'success'
                });
                setTimeout(function(){
                  wx.navigateTo({
                    url: '/pages/resultText/resultText',
                  })
                },1500)
              }
            })
            
          }
        })
      }
    })
  }
})
