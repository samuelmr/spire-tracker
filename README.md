# Spire API client

[![Build Status](https://travis-ci.org/samuelmr/spire-tracker.svg?branch=master)](https://travis-ci.org/samuelmr/spire-tracker)

Unofficial [Spire](https://spire.io/) API client for node.js

## Usage

Get your access token via the method explained in the [API documentation](http://developer.spire.io/docs/api-token)

### Install

```
npm install spire-tracker
```

### Quick example

```js

const Spire = require('spire-tracker')

var token = 'MY_ACCESS_TOKEN'
var client = new Spire(token)

client.streaks().then(function(data) {
  console.log(JSON.stringify(data, null, 1))
}).catch(function(error){
  console.error(error)
})

```

## Features

### streaks
[Documentation](http://developer.spire.io/docs/streaks)

```js

client.streaks().then(function(data) {
  console.log(JSON.stringify(data, null, 1))
})

```

### br (beaths per minute)
Returns br events, see [documentation](http://developer.spire.io/docs/events)
Note: `date` is optional.
```js

client.br(date).then(function(data) {
  console.log(JSON.stringify(data, null, 1))
})

```

Example result:

```json

[
  {"timestamp":1455454720,"value":16.94,"event_type":"br"},
  {"timestamp":1455454760,"value":18.18,"event_type":"br"}
]

```

### calories
Returns calories events, see [documentation](http://developer.spire.io/docs/events)

Note: `date` is optional.

```js

client.calories(date).then(function(data) {
  console.log(JSON.stringify(data, null, 1))
})

```
Example result:

```json

[
  {"timestamp":1455454720,"value":4.142012,"event_type":"calories"},
  {"timestamp":1455454760,"value":2.075894,"event_type":"calories"}
]
```


### steps
Returns steps events, see [documentation](http://developer.spire.io/docs/events)

Note: `date` is optional.
```js

client.steps(date).then(function(data) {
  console.log(JSON.stringify(data, null, 1))
})

```
Example result:

```json

[
  {"timestamp":1455454720,"value":8,"event_type":"steps"},
  {"timestamp":1455454760,"value":4,"event_type":"steps"}
]

```

### events
Returns combined br, calories and steps events.
Note: `date` is optional.

```js

client.events(date).then(function(data) {
  console.log(JSON.stringify(data, null, 1))
})

```
Example result:

```json
[
  {"timestamp":1455454720,"br":16.94,"calories":4.142012,"steps":8},
  {"timestamp":1455454720,"br":18.18,"calories":2.075894,"steps":4},
]

```
