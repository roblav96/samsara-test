//

var Loki = require( 'lokijs' )
var dexie = require( './db-dexie.js' )
var _$utils = require( './utils.js' )



/*===========================
=            _$DB           =
===========================*/

module.exports = Temp

function Temp() {

	this.opts = {
		name: 'temp',
		indices: [ 'uuid', 'id', 'xid', 'stamp' ]
	}

	this.loki = new Loki.Collection( this.opts.name, {
		indices: this.opts.indices,
		unique: this.opts.indices[ 0 ]
	} )

	this.loki.on( 'update', _.throttle( function () {
		_$utils.events.emit( 'db.temp.update' )
	}, 1000, {
		trailing: true
	} ) )

	var xid = Lockr.get( 'user.xid' )
	if ( _.isUndefined( xid ) ) {
		// return
	}



	var that = {
		opts: this.opts,
		loki: this.loki,
		// xid: xid
		xid: 'rob'
	}

	this.loaded = Promise.resolve().bind( that ).then( function () {
		return dexie.contacts.toArray()
	} ).then( function ( contacts ) {

		this.contacts = contacts
		this.contacts.push( {
			uname: this.xid
		} )

		console.log( 'this.contacts >', JSON.stringify( this.contacts, true, 4 ) )

		this.proms = []
		var i, len = this.contacts.length
		for ( i = 0; i < len; i++ ) {
			this.proms.push( dexie.geos.where( 'xid' ).equals( this.contacts[ i ].uname ).toArray() ) //.orderBy( 'stamp' ).reverse().limit( 1 ).toArray() )
		}

		return Promise.all( this.proms )

	} ).then( function ( geos ) {

		console.log( 'geos >', JSON.stringify( geos, true, 4 ) )

		var temps = {}
		var i, len = geos.length
		for ( i = 0; i < len; i++ ) {
			if ( !_.isEmpty( geos[ i ][ 0 ] ) ) {
				var geo = geos[ i ][ 0 ]
				temps[ geo.xid ] = geo
			}
		}

		var i, len = this.contacts.length
		for ( i = 0; i < len; i++ ) {
			var insert = {
				acc: null,
				battery: 'N/A',
				charging: 'N/A',
				id: this.contacts[ i ].id,
				pos: null,
				quickie: false,
				stamp: NaN,
				uuid: this.contacts[ i ].uname + NaN,
				xid: this.contacts[ i ].uname
			}

			if ( temps[ this.contacts[ i ].uname ] ) {
				insert = temps[ this.contacts[ i ].uname ]
				insert.id = this.contacts[ i ].id
				insert.quickie = false
			}

			// console.log( 'insert >', JSON.stringify( insert, true, 4 ) )

			this.loki.insert( insert )
		}

		return Promise.resolve()

	} ).catch( function ( err ) {
		console.error( err )
		console.error( err.stack )
	} )










}




















































//

