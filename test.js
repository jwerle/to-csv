
/**
 * Module dependencies
 */

var csv = require('./')
  , assert = require('assert')

/**
 * Bench mark operations
 *
 * @param {Number} ops
 */

function bench (ops) {
	var data = [];
  var title = ops + ' ops';

	for (var i = 0; i < ops; ++i) {
		data.push({
      id: Math.random().toString(16).slice(2), value: data.length % 2 });
	}

  condition(title, function () {
    csv(data);
  });
}

/**
 * Test condition
 *
 * @param {String} title
 * @param {Function} block
 */

function condition (title, block) {
  console.time(title);
  block();
  console.timeEnd(title);
}

condition("benchmark", function () {
  var n = 10;
  while (n <= 10e3) {
    bench(n *= 10);
  }
});

condition("empty cell", function () {
  var data = [
    {time: "2014-07-10",
      temperature: 18.91578947368421,
      humidity: 89.28157894736843,
      date: "2014-07-10T23:59:18.553Z"},
    {time: "2014-07-11",
      sensor_id: "DHT22",
      status: "OK",
      beep: 'boop',
      temperature: 17.358620689655176}
  ];

  var exp = 'time,temperature,humidity,date\n'+
  '2014-07-10,18.91578947368421,89.28157894736843,2014-07-10T23:59:18.553Z\r\n'+
  '2014-07-11,17.358620689655176,,\r\n'

  assert(exp == csv(data));
});
