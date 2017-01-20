require('chai').should()
const nock = require('nock'),
  Spire = require('../index'),
  config = require('../config')

describe('Events ', function () {

    var client = new Spire('token')
    var breathData = [
      {"timestamp":1455454720,"value":16.94,"event_type":"br"},
      {"timestamp":1455454760,"value":18.18,"event_type":"br"}
    ]
    var stepData = [
      {"timestamp":1455454720,"value":8,"event_type":"steps"},
      {"timestamp":1455454760,"value":4,"event_type":"steps"}
    ]
    var caloryData = [
      {"timestamp":1455454720,"value":4.142012,"event_type":"calories"},
      {"timestamp":1455454760,"value":2.075894,"event_type":"calories"}
    ]
    beforeEach(function (done) {

      nock(config.baseUrl)
      .get('/events')
      .query({
        access_token: 'token',
        date: '20160214',
        type: 'br'
      })
      .reply(200, JSON.stringify(breathData))

      nock(config.baseUrl)
      .get('/events')
      .query({
        access_token: 'token',
        date: '20160214',
        type: 'steps'
      })
      .reply(200, JSON.stringify(stepData))

      nock(config.baseUrl)
      .get('/events')
      .query({
        access_token: 'token',
        date: '20160214',
        type: 'calories'
      })
      .reply(200, JSON.stringify(caloryData))

      done()
    })

    it('should get breaths', function (done) {

      client.events('20160214', 'br').then(function (response) {
        should.exist.response
        response.should.have.lengthOf(2)
        response[1].value.should.equal(18.18)
        done()
      })
    })

    it('should get steps', function (done) {

      client.events('20160214', 'steps').then(function (response) {
        should.exist.response
        response.should.have.lengthOf(2)
        response[1].value.should.equal(4)
        done()
      })
    })

    it('should get calories', function (done) {

      client.events('20160214', 'calories').then(function (response) {
        should.exist.response
        response.should.have.lengthOf(2)
        response[1].value.should.equal(2.075894)
        done()
      })
    })

  }
)
