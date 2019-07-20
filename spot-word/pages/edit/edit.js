// pages/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    title:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.webUrl
    this.setData({
      id:options.id
    })
    wx.request({
      url: url + '/note/note_detail',
      method: 'POST',
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        if(res.data.code == 1){
          this.setData({
            content:res.data.data.content,
            title:res.data.data.title
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      },
      fail:err=>{
        wx.showToast({
          title: err.data.msg,
          icon: 'none'
        })
      }
    })
  },
  bindInputTitle:function(e){
    console.log(e)
    this.setData({
      title:e.detail.value
    })
  },
  bindInputContent:function (e) {
    console.log(e)
    this.setData({
      content: e.detail.value
    })
  },
  submit:function(){
    var url = app.globalData.webUrl
    wx.request({
      url: url + '/note/note_post',
      method: 'POST',
      data: {
        id: this.data.id,
        title: this.data.title,
        content: this.data.content
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log(res)
        if (res.data.code == 1) {
          wx.showToast({
            title: '编辑成功',
            icon: 'none',
            success: () => {
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/note/note',
                })
              }, 1500)
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
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
  }
})