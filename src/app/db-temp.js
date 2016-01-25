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
		loki: this.loki,
		// xid: xid
		xid: 'cel'
	}

	Promise.resolve().bind( that ).then( function () {
		return dexie[ this.opts.name ].toArray()
	} ).then( function ( docs ) {
		if ( _.isEmpty( docs ) ) { // dont load any geo positions into memory
			throw new RangeError()
		}

		if ( this.opts.name != 'geo' ) {
			var i, len = docs.length
			for ( i = 0; i < len; i++ ) {
				this.loki.insert( docs[ i ] )
			}

			throw new RangeError()
		}

		/*===========================
		=            GEO            =
		===========================*/

		return dexie.geo.where( 'xid' ).notEqual( this.xid ).count()

	} ).then( function ( count ) {
		if ( count == 0 ) {
			throw new RangeError()
		}

		console.log( 'count >', count )





	} ).catch( RangeError, function () {






	} ).catch( function ( err ) {
		console.error( err )
		console.error( err.stack )
	} )










}

DB.prototype.insert = function ( doc ) {
	console.log( 'INSERT > doc >', doc )
}





















































//

