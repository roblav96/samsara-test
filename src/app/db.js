//

var DB = require( './db-object.js' )
var dexie = require( './db-dexie.js' )
var _$utils = require( './utils.js' )



_$utils.events.once( 'db.opened', function () {
	console.info( 'db.opened' )

	var tables = dexie._tables
	var i, len = tables.length
	for ( i = 0; i < len; i++ ) {
		this[ tables[ i ].name ] = new DB( tables[ i ] ).loki

		_$utils.events.emit( 'db.ready' )
	}

}.bind( this ) )




this.putitlogin = function ( response ) { // DEV for login
	console.log( 'putitlogin > response >', response )
	
	
	
}

this.putitsocket = function ( response ) {
	console.log( 'putitsocket > response >', response )

	// var geos = response.geos
	// var i, len = geos.length
	// for ( i = 0; i < len; i++ ) {
	// 	var doc = JSON.parse( geos[ i ].doc )
	// 	doc.xid = geos[ i ].xid
	// 	doc.stamp = geos[ i ].stamp
	// 	doc.uuid = doc.xid + doc.stamp
	// 	console.log( 'doc >', JSON.stringify( doc, true, 4 ) )
	// 	dexie.geo.add( doc )
	// }
	
	// var actives = response.actives
	// var i, len = actives.length
	// for ( i = 0; i < len; i++ ) {
	// 	var doc = JSON.parse( actives[ i ] )
	// 	doc.uuid = doc.xid + doc.stamp
	// 	console.log( 'doc >', JSON.stringify( doc, true, 4 ) )
	// 	dexie.activities.add( doc )
	// }

}



































if ( ENV_DEVELOPMENT == true ) {
	window.db = this
}
module.exports = this








//

