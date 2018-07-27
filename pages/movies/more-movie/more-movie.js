// pages/movies/mor-movie/more-movie.js

var app = getApp();
var util = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle:"",
    movies:"",
    requestUrl:"",
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch(category){
      case "正在热映":
        dataUrl = app.globalData.apiBase + "/v2/movie/in_theaters"
        break;
      case "即将上映":
        dataUrl = app.globalData.apiBase + "/v2/movie/coming_soon"
        break;
      case "豆瓣top250":
        dataUrl = app.globalData.apiBase + "/v2/movie/top250"
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl,this.callback);
    // wx.setNavigationBarTitle({
    //   title: '豆瓣',
    //   success:function(){

    //   }
    // })
  },
  callback:function(data){
    var movies = [];
    for (var idx in data.subjects) {
      var subject = data.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      var temp = {
        stars: util.convertToStars(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp);
    }
    var totalMovies = {};
    //如果要绑定新的数据，需要与旧的数据连接在一起
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount =this.data.totalCount+20;
    wx.hideNavigationBarLoading();
  },
  // onScrollLower:function(event){
  //   var nextUrl = this.data.requestUrl +
  //   "?start=" + this.data.totalCount +"&count=20";
  //   util.http(nextUrl, this.callback);
  //   wx.showNavigationBarLoading();
  //   wx.stopPullDownRefresh();
  // },
  //下拉刷新
  onPullDownRefresh:function(){
    var refreshUrl = this.data.requestUrl 
    + "?start=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl,this.callback);
    wx.hideNavigationBarLoading();
  },
  onReachBottom: function () {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.callback);
    wx.showNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success:function(){

      }
    })
  }
})