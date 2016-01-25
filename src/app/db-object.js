//

var _$utils = require( './utils.js' )
var Loki = require( 'lokijs' )


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

	this.loki = new Loki.Collection( opts.name, {
		indices: opts.indices,
		unique: opts.indices[ 0 ]
	} )


}

DB.prototype.save = function () {
	console.warn( 'save' )
}





















































//

