//

var DB = require( './db-object.js' )
var dexie = require( './db-dexie.js' )

var _$db = {}
window.db = _$db



var tables = dexie._tables
var i, len = tables.length
for ( i = 0; i < len; i++ ) {
	_$db[ tables[ i ].name ] = new DB( tables[ i ] )
}

var t = _.now()
var i, len = 100
for ( i = 0; i < len; i++ ) {
	dexie.contacts.add( {
		id: _.random( 1, 99999 ),
		age: _.random( 1, 99999 ),
		uname: _.random( 1, 99999 )
	} )
}

var i, len = 100
for ( i = 0; i < len; i++ ) {
	dexie.boundaries.add( {
		id: _.random( 1, 99999 ),
		age: _.random( 1, 99999 ),
		uname: _.random( 1, 99999 )
	} )
}

console.log( '_.now() - t >', _.now() - t )










































module.exports = _$db








//

