const app = getApp();
Page({  // 页面的初始数据  data: {
  showInputStatus: false,
  inputValue: '',//点击结果项之后替换到文本框的值
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
    "000027 深圳 深圳能源"],//本地匹配源
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
  },

  //列表滚动
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'purple',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'mauve',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'purple',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'mauve',
      badge: 0,
      name: '版权'
    }],
    gridCol: 3,
    skin: false
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  }
})