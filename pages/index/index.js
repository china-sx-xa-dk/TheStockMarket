//index.js
//获取应用实例
Page({
  data: {
    PageCur: 'plugin'
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