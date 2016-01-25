//

var _$utils = require( './utils.js' )



var version = 1
var name = 'convoy.db'
var tables = [ {
	name: 'contacts',
	schema: 'id'
}, {
	name: 'boundaries',
	schema: 'id'
}, {
	name: 'activities',
	schema: 'uuid, type, stamp, xid'
}, {
	name: 'geo',
	schema: 'uuid, stamp, xid'
} ]



var stores = {}
var i, len = tables.length
for ( i = 0; i < len; i++ ) {
	stores[ tables[ i ].name ] = tables[ i ].schema
	tables[ i ].indices = tables[ i ].schema.split( ', ' )
}

var dexie = new Dexie( name )
dexie.version( version ).stores( stores )
dexie.open()

dexie._version = version
dexie._name = name
dexie._tables = tables

// var that = {
// 	dexie: dexie
// }

// Promise.resolve().bind( that ).then( function () {
// 	console.log( 'this >', this )
// 	return this.dexie.open()
// } ).catch( function ( err ) {
// 	navigator.notification.alert( 'DATABASE NOT SUPPORTED ON DEVICE!', null, 'FATAL ERROR!!!', ':(' )
// 	console.error( err )
// 	console.error( err.stack )
// } ).then( function () {

// 	var i, len = this.tables.length
// 	for ( i = 0; i < len; i++ ) {
// 		this.db[ this.tables[ i ].name ] = new DB( {
// 			dexie: this.dexie,
// 			table: this.tables[ i ]
// 		} )
// 	}

// } ).catch( function ( err ) {
// 	console.warn( '_$db.init > second catch >' )
// 	console.error( err )
// 	console.error( err.stack )
// } )


module.exports = dexie
























































//

