const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertToStars(stars) {
  var num = stars.toString().substring(0, 1);
  var half = stars.toString().substring(1,2);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  if (half !== "0") {
    array[parseInt(num)] = 2;
  }
  return array;
}
function http(url,callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: (res) => {
      callback(res.data)
    },
    fail: function () {
      console.log("fail");
    }
  })
}
module.exports = {
  formatTime: formatTime,
  convertToStars: convertToStars,
  http:http
}


