var postsData = require("../../../data/data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData:postData
    })
    // var logsCollectied = {
    //   0:"true",
    //   1:"true",
    //   2:"false",
    //   3:"true",
    //   4:"false"
    // },
    var postsCollected = wx.getStorageSync("posts_collected");
    if(postsCollected){
      var postcollected = postsCollected[postId];
      this.setData({
        collection:postcollected
      })
    }else{
      var postsCollected = {};
        postsCollected[postId] = false;
        wx.setStorageSync("posts_collected", postsCollected);
    }
    
  },
  onCollectionTap:function(){
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    //更新缓存
    wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定改变图片
    this.setData({
      collection:postCollected
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})