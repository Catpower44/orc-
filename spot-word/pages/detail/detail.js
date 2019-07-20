// pages/edit/edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    title: '',
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
        console.log(res)
        if (res.data.code == 1) {
          this.setData({
            content: res.data.data.content,
            title: res.data.data.title
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
  },
  toEdit:function(){
    wx.navigateTo({
      url: '/pages/edit/edit?id='+this.data.id,
    })
  },
  deleteNote:function(){
    var url = app.globalData.webUrl
    wx.showModal({
      title: '提示',
      content: '确认删除笔记？',
      success:res=>{
        if(res.confirm){
          wx.request({
            url: url + '/note/note_del',
            method: 'POST',
            data: {
              id: this.data.id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: res => {
              console.log(res)
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                success:()=>{
                  setTimeout(function(){
                    wx.switchTab({
                      url: '/pages/note/note',
                    })
                  },1500)
                }
              })
            },
            fail: err => {
              wx.showToast({
                title: err.data.msg,
                icon: 'none'
              })
            }
          })
        }
      }
    })
  }
})