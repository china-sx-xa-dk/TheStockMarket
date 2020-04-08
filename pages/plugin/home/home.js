const app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  multipleSlots: true,
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: 
    [
      
      {
        title: '计算相关性',
          img: 'https://aitools.oss-cn-beijing.aliyuncs.com/toolLost-01.jpg',
          url: '/form/form'
      }
      // ,{
      //   title: '自动补全测试',
      //   img: 'https://aitools.oss-cn-beijing.aliyuncs.com/toolLost-01.jpg',
      //   url: '/result/result'
      // }
      // ,
      // {
      //   title: '全屏抽屉',
      //   img: 'https://image.weilanwl.com/color2.0/plugin/qpct2148.jpg',
      //   url: '/drawer/drawer'
      // },
      // {
      //   title: '索引列表',
      //   img: 'https://image.weilanwl.com/color2.0/plugin/sylb2244.jpg',
      //   url: '/indexes/indexes'
      // },
      // {
      //   title: '垂直导航',
      //   img: 'https://image.weilanwl.com/color2.0/plugin/qpczdh2307.jpg',
      //   url: '/verticalnav/verticalnav'
      // }
    ]
  },
  methods: {
    toChild(e) {
      wx.navigateTo({
        url: '/pages/plugin' + e.currentTarget.dataset.url
      })
    },
  }
});