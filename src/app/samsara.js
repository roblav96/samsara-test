//

var _ = require( 'lodash' )

var Samsara = require( 'samsarajs' )
var Context = Samsara.DOM.Context

var prog = require( './prog.js' )
var mMenu = require( './mmenu.js' )
var sBar = require( './sbar.js' )




var _$samsara = {}
_$samsara.prog = {}
_$samsara.mMenu = {}
_$samsara.sBar = {}




_$samsara.init = function () {

	var context = new Context()
	context.setPerspective( 1000 )

	_$samsara.prog = new prog( context )
	_$samsara.mMenu = new mMenu( context )
	_$samsara.sBar = new sBar( context )



	context.mount( document.body )

}













































module.exports = _$samsara



//

