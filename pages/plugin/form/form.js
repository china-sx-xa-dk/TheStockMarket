const api = require('../../../utils/request.js')
const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: 0,
    picker: ['一个月', '三个月', '一年', '三年'],
    firCode: '',
    secCode: ''
  },
  StockCodeClick(e){
    let index = e.currentTarget.dataset.index
    const self = this
    //跳转子页面
    wx.navigateTo({
      url: '../choose/choose?index='+index,
      events: {
        // 子页面修改父页面的内容
        changeStockCode: function (data) {
          let _index = data.index
          let _data = data.data
          if (_index == '0'){
            self.setData({
              firCode: _data
            })
          }else{
            self.setData({
              secCode: _data
            })
          }
        }
      }
    })
  },
  StartDateChange(e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  EndDateChange(e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  SubmitForm(event) {
    let _index = event.currentTarget.dataset.index;
    let _firCode = event.currentTarget.dataset.firCode;
    let _secCode = event.currentTarget.dataset.secCode;

    if (_firCode === "" || _secCode === "" ){
      wx.showToast({
        title: '请输入股票代码',
        icon: 'none',
        duration: 2000
      })

      return
    }

    // 后台接口设置time_type有限定值
    // time_type：a->一个月 b->三个月 c->一年 d->三年
    let _data_index = _index == 0 ? 'a' : _index == 1 ? 'b' : _index == 2 ? 'c' : _index == 3 ? 'd':'a'
    let _url_get_calculate_relation_result = 'getCalculateRelationResult/' + _firCode + '/' + _secCode + '/' + _data_index
    wx.navigateTo({
      url: '../result/result'
    })
    // api._post(_url_get_calculate_relation_result).then(res => {
    //     wx.setStorageSync(app.globalData.CaluateResult, res)
    //     wx.navigateTo({
    //       url: '../result/result'
    //     })
    // }).catch(e => {
    //   wx.showToast({
    //     title: '服务器无响应，请联系客服。',
    //     icon: 'none',
    //     duration: 2000
    //   })
    // })
  },
})