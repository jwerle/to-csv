
/**
 * Module dependencies
 */

var isArray = Array.isArray
  , keys = Object.keys


CSV.CHAR_RETURN = 0xd;
CSV.CHAR_NEWLINE = 0xa;
CSV.DELIMITER = 0x2c;


function head (a) {
	return a[0];
}

function tail (a) {
	return a[a.length -1];
}

function char (c) {
	return 'number' === typeof c
	         ? String.fromCharCode.apply(null, arguments)
	         : c;
}

/**
 * Parses an array of objects to a CSV output
 */

module.exports = CSV;
function CSV (objects, opts) {
	if ('object' !== typeof objects) throw new TypeError("expecting an array");

	opts = 'object' === typeof opts 
	        ? opts
	        : {};
	
	objects = isArray(objects)
	           ? objects
	           : [objects];

	if (!objects.length) throw new Error("expecting at least one object");

	var headers = keys(head(objects))
	  , buf = []

	while (objects.length) {
		var lbuf = []
		  , object = objects.shift()

		for (var i = 0 ;i < headers.length; ++i) {
			var header = headers[i]
			if (lbuf.length) lbuf.push(char(CSV.DELIMITER));
			lbuf.push(object[header]);
		}

		buf.push(lbuf.join(''));
		buf.push(char(CSV.CHAR_RETURN, CSV.CHAR_NEWLINE));
	}

	return false !== opts.headers
	        ? [].concat(headers.join(','), char(CSV.CHAR_NEWLINE)).concat(buf).join('')
	        : buf.join('');
}