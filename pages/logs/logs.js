var postData = require("../../data/data.js")
//logs.js
Page({
  data: {
    sdata: [
      {
        imgUrl: '/images/iqiyi.png',
        postId:5
      },
      {
        imgUrl: '/images/vr.png',
        postId: 3
      },
      {
        imgUrl: '/images/wx.png',
        postId: 4
      },
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
  },
  onSwiperItemTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'logs-detail/logs-detail?id=' + postId,
    })
  },
  onSwiperTap:function(event){
    //target和currentTarget
    //target指的是当前点击的组件，currentTarget指的是事件捕获的组件
    //target指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'logs-detail/logs-detail?id=' + postId,
    })
  }
})
