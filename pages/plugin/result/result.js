const app = getApp();
Page({  // 页面的初始数据  data: {
  firCode: '',
  secCode: '',
  timeStemp: '',
  caluateResult: '',
  imgData: '',
  onLoad: function (options) {
    let self = this
    let _caluate_result = wx.getStorageSync(app.globalData.CaluateResult)
    
    self.setData({
      firCode: _caluate_result.first_code + ' ' + _caluate_result.first_name,
      secCode: _caluate_result.second_code + ' ' + _caluate_result.second_name,
      timeStemp: _caluate_result.start_data + ' - ' + _caluate_result.end_data,
      caluateResult: _caluate_result.relation_result.toFixed(5),
      imgData: _caluate_result.base64
    })
  },
  saveImage: function(){

    var imgSrc = this.data.imgData.slice(22);//base64编码截取后边的图像代码,data:image/png;base64这一段去除
    var save = wx.getFileSystemManager();
    var number = Math.random();
    save.writeFile({
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
      data: imgSrc,
      encoding: 'base64',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
        console.log(res)
      }, fail: err => {
        console.log(err)
      }
    })
  }
})