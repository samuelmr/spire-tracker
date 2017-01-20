require('chai').should()
const nock = require('nock'),
  Spire = require('../index'),
  config = require('../config')

describe('Streaks ', function () {

    var client = new Spire('token')
    var data = [
      {
        "type":"calm",
        "start_at":1455593111,
        "stop_at":1455593292,
        "value":181,
        "sub_value":14,
        "original_type": "focus"
      },
      {
        "type":"activity",
        "start_at":1455583483,
        "stop_at":1455583965,
        "value":149,
        "sub_value":38,
        "original_type": ""
      }
    ]
    beforeEach(function (done) {
      nock(config.baseUrl)
      .get('/streaks')
      .query({
        access_token: 'token'
      })
      .reply(200, JSON.stringify(data))
      done()
    })

    it('should get streaks', function (done) {

      client.streaks().then(function (response) {
        should.exist.response
        response.should.have.lengthOf(2)
        response[1].value.should.equal(149)
        done()
      })
    })

  }
)
