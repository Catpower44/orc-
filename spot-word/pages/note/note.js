// pages/note/note.js
const app = getApp()
var functions = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    openId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.webUrl
    wx.getStorage({
      key: 'openid',
      success: res => {
        this.setData({
          openId: res.data
        })
        wx.request({
          url: url + '/note/note_list',
          method: 'POST',
          data: {
            user: this.data.openId
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: res => {
            console.log(res)
            if (res.data.code == 1) {
              for (let i in res.data.data) {
                res.data.data[i].create_time = functions.formatTimeTwo(res.data.data[i].create_time, "Y-M-D")
              }
              this.setData({
                list: res.data.data
              })
            }else{
              this.setData({
                list:''
              })
            }
          },
          fail: err => {
            wx.showToast({
              title: err.data.msg,
              icon: 'none'
            })
          }
        })
      },
    })
  },
  onShow:function(){
    this.onLoad();
  },
  toEdit:function(e){
    console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/detail/detail?id='+id,
    })
  }
})