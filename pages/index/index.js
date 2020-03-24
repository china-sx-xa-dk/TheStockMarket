const api = require('../../utils/request.js')
const util = require('../../utils/util.js')
const app = getApp();
//index.js
//获取应用实例
Page({
  data: {
    PageCur: 'plugin'
  },
  //刷新股票缓存列表
  refreshStock(){
    api._post('getBasicStock').then(res => {
      if (res.CodeStatus == 200) {
        wx.setStorageSync(app.globalData.StockList, res.BasicStockOneRowList)
      }
    }).catch(e => {
      console.log(e)
    })
  },
  onLoad(){
    const self = this
    //初始化模糊匹配列表为空 用于无法获取对应列表时可正常运行程序
    let stockInitTime = wx.getStorageSync(app.globalData.StockInitTime)
    if (stockInitTime == ''){
      //没有初始化过股票列表
      self.refreshStock()
      wx.setStorageSync(app.globalData.StockInitTime, util.formatTime(new Date()))
    }else{
      //比较缓存时间是否与今日超过1天 超过时访问股票列表
      let _cut_hours = util.getDateDiff(stockInitTime, util.formatTime(new Date()), 'hour')
      if (_cut_hours > 24) {
        self.refreshStock()
      }
    }
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onShareAppMessage() {
    return {
      title: 'GOKIT-股市AI计算器',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})