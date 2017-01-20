const request = require('request-promise'),
  config = require('./config')

// request.debug = true

function Client(token) {
  this.init(token)
}

Client.prototype.init = function (token) {
  this.token = token
  this.request = request.defaults({
    baseUrl: config.baseUrl,
    qs: {'access_token': this.token},
    transform: function (response) {
      return JSON.parse(response)
    }
  })
}

Client.prototype.streaks = function () {
  var opts = {
    uri: '/streaks',
  }
  return this.request.get(opts)
}

Client.prototype.events = function (date, type) {
  var qs = {};
  if (typeof(date) == 'Date') {
    var y = Date.getFullYear();
    var m = Date.getMonth() + 1;
    if (m < 10) m = '' + '0' + m;
    var d = Date.getDate();
    if (d < 10) d = '' + '0' + d;
    date = [y, m, d].join('')
  }
  if (date) {
    qs.date = date;
  }
  var supportedTypes = ['br', 'steps', 'calories'];
  if (type) {
    if (supportedTypes.indexOf(type) < 0) {
      throw 'Unsupported type ' + type;
    }
    else if (supportedTypes.indexOf(type) >= 0) {
      qs.type = type;
    }
  }
  var opts = {
    uri: '/events',
    qs: qs
  }
  return this.request.get(opts)
}

module.exports = Client
