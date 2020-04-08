const app = getApp();
Page({  // 页面的初始数据  data: {
  showInputStatus: false,
  inputValue: '',//点击结果项之后替换到文本框的值
  history: new Array(),
  returnIndex: 0,//返回给哪个选择框的标示
  adapterSource: wx.getStorageSync(app.globalData.StockList),//本地匹配源
  bindSource: [],//绑定到页面的数据，根据用户输入动态变化  },
  onLoad: function (options){
    let self = this;
    let _stock_code_index = options.index;
    try {
      //获取历史记录,进行展示
      let _choose_stock_history = wx.getStorageSync(app.globalData.ChooseStockHistory)
      if (_choose_stock_history != ''){
        self.setData({
          history: _choose_stock_history,
          returnIndex: _stock_code_index
        })
      }
    } catch (e) {
      console.log('读取选择历史记录发生错误')
    }
    //进行父页面传入的选择框信息初始化
    self.setData({
      returnFlag: options.index,//返回给哪个选择框的标示
    })
  },
  bindKeyInput: function (e) {
    const self = this
    let _stock_list = self.adapterSource

    var currentInputStatu = e.currentTarget.dataset.statu
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    this.setData({
      inputValue: prefix
    })
    if (prefix != "") {
      self.setData(
        {
          showBtnStatus1: false,
          showBtnStatus2: true
        }
      );
      _stock_list.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {//返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1
          newSource.push(e)
        }
      })
    } else {
      currentInputStatu = "close"; self.setData(
        {
          isScroll: true,
          showBtnStatus1: true,
          showBtnStatus2: false
        }
      );
    } if (newSource.length != 0) {
      self.setData({
        bindSource: newSource
      })
    } else {
      self.setData({
        bindSource: []
      })
      currentInputStatu = "close"; self.setData(
        {
          isScroll: "{{false}}"
        }
      );
    }    //关闭 
    if (currentInputStatu == "close") {
      self.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }    // 显示 
    if (currentInputStatu == "open") {
      self.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
  },
  //选择 点击动态列表 点击历史记录后完成历史记录缓存并跳转携带参数
  chooseStock: function (e, itemtap) {
    //效验是否有效传值
    let self = this
    let _input_value = itemtap ? e.currentTarget.dataset.content.substring(0, 6) : self.data.inputValue
    let _data = self.adapterSource
    let _flag = 0
    for (let i = 0; i < _data.length; i++) {
      if (_data[i].indexOf(_input_value) > -1) {
        _flag = 1
        break
      }
    }
    //判断是否为正常值
    if (_flag == 0) {
      wx.showToast({
        title: '没有您填写的股票代码',
        icon: 'none',
        duration: 2000
      })
    } else {
      //保存搜索记录到本地缓存中
      let _history = self.data.history
      if (typeof (_history) == "undefined"){
        _history = []
      }
      _history.push(_input_value)
      _history = Array.from(new Set(_history))
      this.setData({
        history: _history
      })
      wx.setStorageSync(app.globalData.ChooseStockHistory, _history)
      //修改父页面数据
      const eventChannel = self.getOpenerEventChannel()
      eventChannel.emit('changeStockCode', { data: _input_value, index: self.data.returnIndex});
      //正常匹配 跳转回填写股票界面
      wx.navigateBack({
        delta: 1
      })
    }
  },
  //点击选型确定input值
  itemtap: function (e) {
    let currentInputStatu = e.currentTarget.dataset.statu; 
    let _stock_code = e.currentTarget.dataset.content.substring(0, 6)
    this.setData({
      inputValue: _stock_code,
      bindSource: []
    })    //关闭 
    if (currentInputStatu == "close") {
      this.setData(
        {
          showInputStatus: false,
          isScroll: true
        }
      );
    }    // 显示 
    if (currentInputStatu == "open") {
      this.setData(
        {
          showInputStatus: true,
          isScroll: "{{false}}"
        }
      );
    }
    //关闭动态选择框后进行跳转
    this.chooseStock(e)
  },
  //历史数据删除
  historyClose: function (e) {
    let _index = -1;
    let _history = this.data.history
    let _content = e.currentTarget.dataset.content
    for(let i=0;i<_history.length;i++){
      if (_content == _history[i]){
        _index = i
      }
    }
    let _hc = _history.splice(_index, 1)
    this.setData({
      history: _history
    })

    //删除本地缓存
    wx.setStorageSync(app.globalData.ChooseStockHistory, _history)
  },
  //历史数据点击
  historyChoose: function (e) {
    this.setData({
      inputValue: e.currentTarget.dataset.content
    })
    //回填历史记录并跳转
    this.chooseStock(e)
  },
  //历史数据全部清除
  clickDeleteHistory: function(e) {
    let self = this
    let data = wx.getStorageSync(app.globalData.ChooseStockHistory)
    if (data.length != 0){
      //删除本地缓存
      wx.showModal({
        title: '全部删除',
        content: '是否删除所有历史记录',
        success(res) {
          if (res.confirm) {
            self.setData({
              history: []
            })
            wx.setStorageSync(app.globalData.ChooseStockHistory, [])
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
  }
})
