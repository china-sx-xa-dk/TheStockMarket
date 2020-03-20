const app = getApp();
Page({  // 页面的初始数据  data: {
  showInputStatus: false,
  inputValue: '',//点击结果项之后替换到文本框的值
  history: [],
  returnResult: '',//返回给选择框的值
  returnIndex: 0,//返回给哪个选择框的标示
  adapterSource: [
    "000001 深圳 平安银行",
    "000002 深圳 万科A",
    "000004 深圳 国农科技",
    "000005 深圳 世纪星源",
    "000006 深圳 深振业A",
    "000007 深圳 全新好",
    "000008 北京 神州高铁",
    "000009 深圳 中国宝安",
    "000010 深圳 *ST美丽",
    "000011 深圳 深物业A",
    "000012 深圳 南玻A",
    "000014 深圳 沙河股份",
    "000016 深圳 深康佳A",
    "000017 深圳 深中华A",
    "000019 深圳 深粮控股",
    "000020 深圳 深华发A",
    "000021 深圳 深科技",
    "000023 深圳 深天地A",
    "000025 深圳 特力A",
    "000026 深圳 飞亚达",
    "000009 深圳 中国宝安",
    "000010 深圳 *ST美丽",
    "000011 深圳 深物业A",
    "000012 深圳 南玻A",
    "000014 深圳 沙河股份",
    "000016 深圳 深康佳A",
    "000017 深圳 深中华A",
    "000019 深圳 深粮控股",
    "000020 深圳 深华发A",
    "000021 深圳 深科技",
    "000023 深圳 深天地A",
    "000025 深圳 特力A",
    "000026 深圳 飞亚达",
    "000009 深圳 中国宝安",
    "000010 深圳 *ST美丽",
    "000011 深圳 深物业A",
    "000012 深圳 南玻A",
    "000014 深圳 沙河股份",
    "000016 深圳 深康佳A",
    "000017 深圳 深中华A",
    "000019 深圳 深粮控股",
    "000020 深圳 深华发A",
    "000021 深圳 深科技",
    "000023 深圳 深天地A",
    "000025 深圳 特力A",
    "000026 深圳 飞亚达",
    "000009 深圳 中国宝安",
    "000010 深圳 *ST美丽",
    "000011 深圳 深物业A",
    "000012 深圳 南玻A",
    "000014 深圳 沙河股份",
    "000016 深圳 深康佳A",
    "000017 深圳 深中华A",
    "000019 深圳 深粮控股",
    "000020 深圳 深华发A",
    "000021 深圳 深科技",
    "000023 深圳 深天地A",
    "000025 深圳 特力A",
    "000026 深圳 飞亚达",
    "000009 深圳 中国宝安",
    "000010 深圳 *ST美丽",
    "000011 深圳 深物业A",
    "000012 深圳 南玻A",
    "000014 深圳 沙河股份",
    "000016 深圳 深康佳A",
    "000017 深圳 深中华A",
    "000019 深圳 深粮控股",
    "000020 深圳 深华发A",
    "000021 深圳 深科技",
    "000023 深圳 深天地A",
    "000025 深圳 特力A",
    "000026 深圳 飞亚达",
    "000009 深圳 中国宝安",
    "000010 深圳 *ST美丽",
    "000011 深圳 深物业A",
    "000012 深圳 南玻A",
    "000014 深圳 沙河股份",
    "000016 深圳 深康佳A",
    "000017 深圳 深中华A",
    "000019 深圳 深粮控股",
    "000020 深圳 深华发A",
    "000021 深圳 深科技",
    "000023 深圳 深天地A",
    "000025 深圳 特力A",
    "000026 深圳 飞亚达",
    "000027 深圳 深圳能源"],//本地匹配源
  bindSource: [],//绑定到页面的数据，根据用户输入动态变化  },
  onLoad: function (options){
    let self = this;
    var orderId = options.orderId;

    try {
      //获取历史记录,进行展示
      let _choose_stock_history = wx.getStorageSync('choose_stock_history')
      self.setData({
        history: _choose_stock_history
      })
    } catch (e) {
      console.log('读取选择历史记录发生错误')
    }

    //进行父页面传入的选择框信息初始化
    self.setData({
      returnFlag: options.index,//返回给哪个选择框的标示
    })
  },
  bindKeyInput: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    this.setData({
      inputValue: prefix
    })
    if (prefix != "") {
      this.setData(
        {
          showBtnStatus1: false,
          showBtnStatus2: true
        }
      );
      this.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {//返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1
          newSource.push(e)
        }
      })
    } else {
      currentInputStatu = "close"; this.setData(
        {
          isScroll: true,
          showBtnStatus1: true,
          showBtnStatus2: false
        }
      );
    } if (newSource.length != 0) {
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
      currentInputStatu = "close"; this.setData(
        {
          isScroll: "{{false}}"
        }
      );
    }    //关闭 
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
  },//点击选型确定input值
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
    wx.setStorageSync('choose_stock_history', _history)
  },
  //历史数据点击
  historyChoose: function (e) {
    this.setData({
      inputValue: e.currentTarget.dataset.content
    })
  },
  //历史数据全部清除
  clickDeleteHistory: function(e) {
    let self = this
    let data = wx.getStorageSync('choose_stock_history')
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
            wx.setStorageSync('choose_stock_history', [])
          } else if (res.cancel) {
            //console.log('用户点击取消')
          }
        }
      })
    }
  },
  //选择 点击动态列表 点击历史记录后完成历史记录缓存并跳转携带参数
  chooseStock: function (e) {
    //效验是否有效传值
    let self = this
    let _input_value = self.data.inputValue
    let _data = self.adapterSource
    let _flag = 0
    for (let i = 0; i < _data.length; i++)
    {
      if (_data[i].indexOf(_input_value) > -1)
      {
        _flag = 1
        break
      }
    }
    //判断是否为正常值
    if (_flag == 0)
    {
      wx.showToast({
        title: '没有您填写的股票代码',
        icon: 'none',
        duration: 2000
      })
    }else
    {
      //保存搜索记录到本地缓存中
      let _history = self.history
      self.history.push(_input_value)
      _history = Array.from(new Set(_history))
      this.setData({
        history: _history
      })
      wx.setStorageSync('choose_stock_history', _history)
      //正常匹配进行封装参数返回跳转
    }
    //跳转回填写股票界面
    wx.redirectTo({
      url: '../form/form?returnResult=' + _input_value + '&returnIndex=' + self.returnIndex
    });
  }
})