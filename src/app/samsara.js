//

var _$utils = require( './utils.js' )
var Samsara = require( 'samsarajs' )
var Context = Samsara.DOM.Context

var tuts = require( './tuts.js' )
var prog = require( './prog.js' )
var mMenu = require( './mmenu.js' )
var sMenu = require( './smenu.js' )
var sBar = require( './sbar.js' )



var _$samsara = {}
_$samsara.tuts = {}
_$samsara.prog = {}
_$samsara.mMenu = {}
_$samsara.sMenu = {}
_$samsara.sBar = {}



_$samsara.init = function () {

	var context = new Context()
	context.setPerspective( 1000 )

	// _$samsara.tuts = new tuts( context )
	// _$samsara.prog = new prog( context )

	var _mMenu = new mMenu()
	context.add( _mMenu )
	
	

	// _$samsara.sMenu = new sMenu( context )
	// _$samsara.sBar = new sBar( context )

	context.mount( document.body )

	/*=====  MAIN MENU  ======*/
	// _$utils.events.on( 'samsara.mMenu.open', _$samsara.mMenu.open )
	// _$utils.events.on( 'samsara.mMenu.close', _$samsara.mMenu.close )
	// _$utils.events.on( 'sos-bar-header', _$samsara.mMenu.sosBarHeader )
	// _$utils.events.on( 'samsara.activities', _$samsara.mMenu.activities )

	/*=====  SIDE MENU  ======*/
	// _$utils.events.on( 'samsara.sMenu.open', _$samsara.sMenu.open )
	// _$utils.events.on( 'samsara.sMenu.close', _$samsara.sMenu.close )

	/*=====  SWIPE BAR  ======*/
	// _$utils.events.on( 'samsara.sBar.centerIt', _$samsara.sBar.centerIt )

	/*=====  OTHER  ======*/
	// _$utils.events.on( 'samsara.fixMenus', _$samsara.fixMenus )

}

// document.addEventListener( "DOMContentLoaded", _$samsara.init )

_$samsara.setGpuSettings = function ( bool, platform ) {
	console.warn( '_$samsara.setGpuSettings' )
}


_$samsara.fixMenus = function ( now ) {
	// _$samsara.mMenu.close( now )
	// _$samsara.sMenu.close( now )
	// _$samsara.tuts.close( now )
	// 	// _$samsara.quickie.close( now )
	// _$samsara.sBar.centerIt( now )
}







































module.exports = _$samsara



//

