# Spire API client

[![Build Status](https://travis-ci.org/samuelmr/spire-tracker.svg?branch=master)](https://travis-ci.org/samuelmr/spire-tracker)

Unofficial [Spire](https://spire.io/) API client for node.js

## Usage

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

### events
[Documentation](http://developer.spire.io/docs/events)

```js

client.events(date, type).then(function(data) {
  console.log(JSON.stringify(data, null, 1))
})

```
