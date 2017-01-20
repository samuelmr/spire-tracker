const Spire = require('spire-tracker')

var token = 'a03248f73b496a698d7bb507c791494caf7e144e1b88c41a733447f63c70bc13'
var client = new Spire(token)

client.events('20170120', 'calories').then(function(data) {
  console.log(JSON.stringify(data, null, 1))
}).catch(function(error){
  console.error(error)
})
