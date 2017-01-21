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

Client.prototype.events = function (type, date) {
  var qs = {};
  var supportedTypes = ['br', 'steps', 'calories'];
  if (type) {
    if (supportedTypes.indexOf(type) < 0) {
      throw 'Unsupported type ' + type;
    }
    else if (supportedTypes.indexOf(type) >= 0) {
      qs.type = type;
    }
  }
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
  var opts = {
    uri: '/events',
    qs: qs
  }
  return this.request.get(opts)
}

Client.prototype.br = function(date) {
  return this.getEvents('br', date);
}

Client.prototype.calories = function(date) {
  return this.getEvents('calories', date);
}

Client.prototype.steps = function(date) {
  return this.getEvents('steps', date);
}

Client.prototype.events = function(date) {
  var self = this;
  return new Promise(function (fulfill, reject){
    var events = [];
    Promise.all([
      self.getEvents('br', date),
      self.getEvents('calories', date),
      self.getEvents('steps', date)
    ]).then(function(values) {
      var br = values[0];
      var calories = values[1];
      var steps = values[2];
      for (var i=0; i<br.length; i++) {
        events.push({
          timestamp: br[i].timestamp, // assume all events have same times!
          br: br[i].value,
          calories: calories[i].value,
          steps: steps[i].value
        });
      }
      fulfill(events);
    }).catch(reject);
  })
}

Client.prototype.getEvents = function(type, date) {
  var qs = {};
  var supportedTypes = ['br', 'steps', 'calories'];
  if (type) {
    if (supportedTypes.indexOf(type) < 0) {
      throw 'Unsupported type ' + type;
    }
    else if (supportedTypes.indexOf(type) >= 0) {
      qs.type = type;
    }
  }
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
  var opts = {
    uri: '/events',
    qs: qs
  }
  return this.request.get(opts)
}

module.exports = Client
