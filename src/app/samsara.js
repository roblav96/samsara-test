//

var _ = require( 'lodash' )

var Samsara = require( 'samsarajs' )
var Context = Samsara.DOM.Context

var sBar = require( './sbar.js' )




var _$samsara = {}
_$samsara.sBar = {}




_$samsara.init = function () {

	var context = new Context()
	context.setPerspective( 1000 )

	_$samsara.sBar = new sBar( context )



	context.mount()

}













































module.exports = _$samsara



//

