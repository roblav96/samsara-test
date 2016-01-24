//

var Curves = require( './Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var Transform = Samsara.Core.Transform
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator



function mMenu( context ) {
	this.wWidth = window.innerWidth
	this.halfwWidth = this.wWidth * 0.5
	this.wHeight = window.innerHeight
	this.halfwHeight = this.wHeight * 0.5

	this.index = 401
	this.width = 100
	this.height = 80
	this.shown = false
	this.showing = false
	this.activeClass = ''

	this.temp = [ {
		text: "S.O.S",
		icon: "ion-help-buoy",
	}, {
		text: "Map",
		icon: "ion-map",
		state: "map.index",
		activeState: 'map',
	}, {
		text: "My Convoy",
		icon: "ion-person-stalker",
		state: "contacts.index",
		activeState: 'contacts',
	}, {
		text: "Activities",
		icon: "ion-ios-pulse-strong",
		state: "activity.index",
		activeState: 'activity',
	}, {
		text: "Settings",
		icon: "ion-settings",
		state: "settings.index",
		activeState: 'settings',
	} ]

	this.surfs = []
	this.layout = new SequentialLayout( {
		direction: 1
	} )

	this.input = new MouseInput()
	this.x = new Transitionable( 0 )
	this.opa = new Transitionable( 0 )

	this.xTrans = this.x.map( function ( v ) {
		// return Transform.translateX( v )
		return v
	} )

	var i, len = this.temp.length
	for ( i = 0; i < len; i++ ) {

		var content = '<div class="list tabs side-tab tabs-icon-top"><li class="item tab-item"><i class="icon ' + this.temp[ i ].icon + '"></i>' + this.temp[ i ].text + '</li></div>'
		if ( i == 0 ) {
			content = '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ' + this.temp[ i ].icon + '"></i>' + this.temp[ i ].text + '</li></div>'
		}

		this.surfs[ i ] = new Surface( {
			content: content,
			size: [ this.width, this.height ]
		} )

	}

	this.layout.addItems( this.surfs )












console.log( 'this.xTrans >', this.xTrans )
console.log( 'this.x >', this.x )

	context.add( {
		transform: Transform.translate( [ this.x.value, 0 ] )
	} ).add( this.layout )

}





module.exports = mMenu

//

