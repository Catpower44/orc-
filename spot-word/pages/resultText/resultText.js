// pages/resultText/resultText.js
const app = getApp()
Page({
  data: {
    content:'',
    title:'',
    modelShow:false,
    openId:''
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'word',
      success: res=> {
        var resData = JSON.parse(res.data)
        var resString = '';
        for(let i in resData){
          resString += resData[i].words+" "
        }
        this.setData({
          content: resString
        })
      },
    }),
    wx.getStorage({
      key: 'openid',
      success: res=> {
        this.setData({
          openId:res.data
        })
      },
    })
  },
  titleInput:function(e){
    this.setData({
      title:e.detail.value
    })
  },
  save:function(){
    var url = app.globalData.webUrl
    if(this.data.title == ''){
      wx.showToast({
        title: '标题不能为空',
        icon:'none'
      })
      return
    }
    wx.request({
      url: url +'/note/note_add',
      method:'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        user:this.data.openId,
        title:this.data.title,
        content:this.data.content
      },
      success:res=>{
        console.log(res)
        if(res.data.code == 1){
          wx.showToast({
            title: '添加成功',
            icon:'none',
            success:()=>{
              setTimeout(function(){
                wx.switchTab({
                  url: '/pages/note/note',
                })
              },1500)
            }
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      },
      fail:res=>{
        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
      }
    })

  },
  openModel:function(){
    this.setData({
      modelShow:true
    })
  },
  closeModel:function(){
    this.setData({
      modelShow: false
    })
  },
  copy:function(){
    wx.setClipboardData({
      data: this.data.content,
      success:res=>{
        console.log(res)
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }

  
})