var postsData = require("../../../data/data.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    var globalData = app.globalData;
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
      var postcollected = false;
      if (postsCollected[postId]){
        postcollected = postsCollected[postId];
      }
      this.setData({
        collection:postcollected
      })
    }else{
      var postsCollected = {};
        postsCollected[postId] = false;
        wx.setStorageSync("posts_collected", postsCollected);
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
      // this.data.isPlayingMusic = true;
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setAudioMonitor();
  },
  setAudioMonitor:function(){
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
    });
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
  },
  onCollectionTap:function(){
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.modal(postsCollected, postCollected)
  },


  toast: function (postsCollected, postCollected){
    //更新缓存
    wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定改变图片
    this.setData({
      collection: postCollected
    });
    wx.showToast({
      title: postCollected ? '收藏成功' : "取消收藏",
    })
  },
  modal:function(postsCollected,postCollected){
    // ES6使用箭头函数修复this指向
    // var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章？':'取消收藏？',
      cancelText:"取消",
      confirmText:"确定",
      // ES6使用箭头函数修复this指向
      success: (res) =>{
        if(res.confirm){
          wx.setStorageSync("posts_collected", postsCollected);
          //更新数据绑定改变图片
          this.setData({
            collection: postCollected
          });
        }
      }
    })
  },
  onShareTap: function (event){
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
      ];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        wx.showModal
      }
    })
  },
  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic : false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  },
  // bindended="musicEnd"
  // musicEnd:function(){
  //   this.setData({
  //     isPlayingMusic:false
  //   })
  // },
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