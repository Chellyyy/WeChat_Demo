var postData = require("../../data/data.js")
//logs.js
Page({
  data: {
    imgUrls: [
      '/images/iqiyi.png',
      '/images/vr.png',
      '/images/wx.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },
  onLoad:function(){
    this.setData({
      postData: postData.postList
    })
  },
  logsTab:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'logs-detail/logs-detail?id='+postId,
    })
  }
})
