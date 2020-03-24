//格式化时间yyyy/MM/dd HH:mm:ss
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//格式化数字 默认为零
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/* 
  * 获得时间差,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
  * 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
  * 返回精度为：秒(second)，分(minute)，小时(hour)，天(day)
*/
// Demo
// var testDate = new Date();
// var testStr = testDate.format("yyyy-MM-dd hh:mm:ss");
// var result = GetDateDiff("2010-02-26 16:00:00", testStr, "day");
// document.write("两者时间差为：" + result + "天了。");
const getDateDiff = (startTime, endTime, diffType) => {
  //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
  startTime = startTime.replace(/\-/g, "/");
  endTime = endTime.replace(/\-/g, "/");

  //将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase();
  var sTime = new Date(startTime);      //开始时间
  var eTime = new Date(endTime);  //结束时间
  //作为除数的数字
  var divNum = 1;
  switch (diffType) {
    case "second":
      divNum = 1000;
      break;
    case "minute":
      divNum = 1000 * 60;
      break;
    case "hour":
      divNum = 1000 * 3600;
      break;
    case "day":
      divNum = 1000 * 3600 * 24;
      break;
    default:
      break;
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  getDateDiff: getDateDiff
}
