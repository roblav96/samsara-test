//

var Loki = require( 'lokijs' )
var dexie = require( './db-dexie.js' )
var _$utils = require( './utils.js' )


/*===========================
=            _$DB           =
===========================*/

module.exports = DB

function DB( opts ) {

	// {
	// 	"name": "geo",
	// 	"schema": "uuid, stamp, xid",
	// 	"indices": [
	// 		"uuid",
	// 		"stamp",
	// 		"xid"
	// 	]
	// }

	this.opts = opts

	this.loki = new Loki.Collection( this.opts.name, {
		indices: this.opts.indices,
		unique: this.opts.indices[ 0 ]
	} )

	// var xid = Lockr.get( 'user.xid' )
	// if ( _.isUndefined( xid ) ) {
	// 	return
	// }

	var that = {
		opts: this.opts,
		loki: this.loki
	}

	if ( this.opts.name == 'geo' ) {
		console.log( 'this.loki.data >', this.loki.data )
		
		return
	}

	Promise.resolve().bind( that ).then( function () {

		if ( this.opts.name == 'activities' ) {
			return dexie[ this.opts.name ].orderBy( 'stamp' ).reverse().limit( 50 ).toArray()
		}

		return dexie[ this.opts.name ].toArray()

	} ).then( function ( docs ) {

		if ( _.isEmpty( docs ) ) { // dont load any geo positions into memory
			return null
		}

		var i, len = docs.length
		for ( i = 0; i < len; i++ ) {
			this.loki.insert( docs[ i ] )
		}

		console.log( 'this.loki.data >', this.loki.data )

	} ).catch( function ( err ) {
		console.error( err )
		console.error( err.stack )
	} )


}

DB.prototype.initGeo = function () {
	console.warn( 'INITGEO >' )





}


DB.prototype.insert = function ( doc ) {
	console.log( 'INSERT > doc >', doc )
}





















































//

