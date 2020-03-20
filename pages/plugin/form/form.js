const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: 0,
    picker: ['一个月', '三个月', '一年', '三年'],
    firCode: '123456',
    secCode: '654321'
  },
  FirCodeChange(e){
    this.setData({
      firCode: e.detail.value
    })
  },
  SecCodeChange(e) {
    this.setData({
      secCode: e.detail.value
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
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  SubmitForm(event) {
    let index = event.currentTarget.dataset.index;
    let firCode = event.currentTarget.dataset.firCode;
    let secCode = event.currentTarget.dataset.secCode;

    console.log(index);

    console.log(this.getPreMonth(this.getToDay()));

    if (firCode === "" || secCode === "" ){
      wx.showToast({
        title: '请输入股票代码',
        icon: 'none',
        duration: 2000
      })

      return
    }

    //数据提交与后台交互
    wx.showToast({
      title: '后台数据敬请期待',
      icon: 'none',
      duration: 2000
    })
  },
  getToDay() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    var LY = date.getFullYear() - 1;
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //需要对时间的区间进行精确的定义
    return Y + "-" + M + "-" + D
  },
  /*获取上个月*/
  getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
  },


  showInputStatus: false,
  inputValue: '',//点击结果项之后替换到文本框的值
  adapterSource: ["app", "application", "apply", "weixin", "WeiXin"],//本地匹配源
  bindSource: [],//绑定到页面的数据，根据用户输入动态变化  },
  bindKeyInput: function (e) {
    var currentInputStatu = e.currentTarget.dataset.statu; var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的结果
    if (prefix != "") {
      this.setData(
        {
          showBtnStatus1: false,
          showBtnStatus2: true
        }
      ); this.data.adapterSource.forEach(function (e) {
        if (e.indexOf(prefix) != -1) {//返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1          newSource.push(e)
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
    var currentInputStatu = e.currentTarget.dataset.statu; this.setData({
      inputValue: e.target.id,
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
  }
})