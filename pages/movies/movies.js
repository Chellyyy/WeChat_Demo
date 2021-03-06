var util = require("../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:{},
    comingSoon:{},
    top250:{},
    searchResutl:{},
    containerShow:true,
    searchPanelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.apiBase + "/v2/movie/in_theaters"+"?start=0&&count=3";
    var comingSoonUrl = app.globalData.apiBase + "/v2/movie/coming_soon" + "?start=0&&count=3";
    var top25oUrl = app.globalData.apiBase + "/v2/movie/top250" + "?start=0&&count=3";

    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映");
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映");
    this.getMovieListData(top25oUrl,"top250","豆瓣top250");
  },

  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category='+category,
    })
  },
  onMovieTap:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

  getMovieListData: function (url, setKey, cateTitle){
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: (res) => {
        this.processDoubanData(res.data, setKey, cateTitle);
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  processDoubanData: function (moviesDouban,setKey,cateTitle){
    var movies = [];
    for (var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6)+"...";
      }
      var temp={
        stars: util.convertToStars(subject.rating.stars),
        title:title,
        average:subject.rating.average,
        coverageUrl:subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[setKey] = {
      movies:movies,
      cateTitle: cateTitle
      };
    this.setData(readyData);
  },
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{}
    })
  },
  onBindFocus:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onBindChange:function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.apiBase + "/v2/movie/search?q=" + text; 
    this.getMovieListData(searchUrl,"searchResutl","");
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