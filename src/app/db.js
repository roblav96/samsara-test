//

var DB = require( './db-object.js' )
var dexie = require( './db-dexie.js' )

var _$db = {}
window.db = _$db



var tables = dexie._tables
var i, len = tables.length
for ( i = 0; i < len; i++ ) {
	_$db[ tables[ i ].name ] = new DB( tables[ i ] ).loki
	
	
}

console.log( '_$db.contacts >', _$db.contacts )










































module.exports = _$db








//

