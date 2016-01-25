//

var Loki = require( 'lokijs' )
var dexie = require( './db-dexie.js' )
var _$utils = require( './utils.js' )


/*===========================
=            _$DB           =
===========================*/

module.exports = DB

function DB( opts ) {

	this.cache = {
		flush: false,
		insert: [],
		update: [],
		remove: []
	}

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

	var xid = Lockr.get( 'user.xid' )
	if ( _.isUndefined( xid ) ) {
		// return
	}

	// 	this.init()

	// }

	// DB.prototype.init = function () {

	this.loaded = Promise.resolve().bind( this ).then( function () {

		if ( this.opts.name == 'geo' ) {
			return null
		}

		if ( this.opts.name == 'activities' ) {
			return dexie[ this.opts.name ].orderBy( 'stamp' ).reverse().limit( 50 ).toArray()
		}

		return dexie[ this.opts.name ].toArray()

	} ).then( function ( docs ) {

		console.warn( this.opts.name )
		console.log( 'docs >', JSON.stringify( docs, true, 4 ) )
		console.log( 'this.loki.data >', JSON.stringify( this.loki.data, true, 4 ) )

		if ( !_.isEmpty( docs ) ) {
			var i, len = docs.length
			for ( i = 0; i < len; i++ ) {
				this.loki.insert( docs[ i ] )
			}
		}

		this.loki.on( 'insert', this.insert.bind( this ) )
		this.loki.on( 'update', this.update.bind( this ) )
		this.loki.on( 'delete', this.remove.bind( this ) )
		
		return Promise.resolve()

	} ).catch( function ( err ) {
		console.error( err )
		console.error( err.stack )
	} )

}



DB.prototype.flush = function () {
	this.cache = {
		flush: true,
		insert: [],
		update: [],
		remove: []
	}
	this.loki.removeDataOnly()
	this.save()
}

DB.prototype.insert = function ( doc ) {
	console.log( 'INSERT > doc >', doc )

	this.cache.insert.push( doc )
	this.save()

	if ( this.opts.name == 'contacts' ) {
		_$utils.events.emit( 'db.temp.insert', doc )
	} else if ( this.opts.name == 'activities' ) {
		_$utils.events.emit( 'socketUpdate.activities', doc )
	}

}

DB.prototype.update = function ( doc ) {
	console.log( 'UPDATE > doc >', doc )

	this.cache.update.push( doc )
	this.save()

	if ( this.opts.name == 'activities' ) {
		_$utils.events.emit( 'socketUpdate.activities' )
	}

}

DB.prototype.remove = function ( doc ) {
	console.log( 'REMOVE > doc >', doc )

	if ( this.cache.flush == true ) {
		return
	}

	this.cache.remove.push( doc )
	this.save()

	if ( this.opts.name == 'contacts' ) {
		_$utils.events.emit( 'db.temp.remove', doc )
	}

}

DB.prototype.save = _.debounce( function () {

	var that = _.clone( this.cache )
	that.opts = this.opts
	that.t = _.now()

	console.warn( this.opts.name + ' > that >', JSON.stringify( that, true, 4 ) )

	this.cache = {
		flush: false,
		insert: [],
		update: [],
		remove: []
	}

	Promise.resolve().bind( that ).then( function () {
		if ( this.flush == true ) {
			return dexie[ this.opts.name ].delete()
		} else {
			return null
		}
	} ).then( function () {

		return dexie.transaction( 'rw', dexie[ this.opts.name ], function ( db ) {

			var i, len = this.insert.length
			for ( i = 0; i < len; i++ ) {
				var doc = _.omit( this.insert[ i ], '$loki', 'meta' )
				db.add( doc )
			}

			var i, len = this.update.length
			for ( i = 0; i < len; i++ ) {
				var doc = _.omit( this.update[ i ], '$loki', 'meta' )
				db.put( doc )
			}

			var i, len = this.remove.length
			for ( i = 0; i < len; i++ ) {
				db.delete( this.remove[ i ][ this.opts.indices[ 0 ] ] )
			}

		}.bind( this ) )

	} ).then( function ( idk ) {
		console.log( 'idk >', idk )

		console.log( '_.now() - this.t >', _.now() - this.t )

	} ).catch( function ( err ) {
		console.error( err )
		console.error( err.stack )
	} )
















	console.log( 'this.cache >', JSON.stringify( this.cache, true, 4 ) )

}, 1000, {
	maxWait: 3000
} )













































//

