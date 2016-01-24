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



function sBar( context ) {
	this.wWidth = window.innerWidth
	this.halfwWidth = this.wWidth * 0.5
	this.wHeight = window.innerHeight
	this.halfwHeight = this.wHeight * 0.5

	this.index = 451
	this.xDelta = this.wWidth * 0.25
	this.yDelta = 49
	this.swipeYThreshold = 40
	this.clickThreshold = 10

	this.clamp = function ( x, a, b ) {
		return Math.min( Math.max( x, a ), b )
	}

	this.sBarTemp = [ {
		_text: "Back",
		_icon: "ion-arrow-left-c",
		_color: 'assertive',
		_href: true
	}, {
		_text: "Boundaries",
		_icon: "ion-log-out",
		_href: true
	}, {
		_text: "Goto Map",
		_icon: "ion-android-expand",
		_href: true
	}, {
		_text: "Activities",
		_icon: "ion-ios-pulse-strong",
		_href: true
	}, {
		_text: "Submit",
		_icon: "ion-checkmark done"
	}, {
		_text: "More Actions",
		_icon: "ion-android-more-vertical",
		_color: 'balanced'
	} ]

	this.surfs = []
	this.nodes = []

	this.layout = new SequentialLayout( {
		direction: 0
	} )

	this.touch = new TouchInput()

	var i, len = this.sBarTemp.length
	for ( i = 0; i < len; i++ ) {

		var icon = ''
		if ( this.sBarTemp[ i ]._icon ) {
			icon = ' ' + this.sBarTemp[ i ]._icon
		}

		var text = ''
		if ( this.sBarTemp[ i ]._text ) {
			text = this.sBarTemp[ i ]._text
		}

		this.surfs[ i ] = new Surface( {
			content: '<div class="tabs tabs-icon-top"><a class="tab-item"><i class="icon' + icon + '"></i>' + text + '</a></div>',
			size: [ this.xDelta, this.yDelta ]
		} )

		this.surfs[ i ].click = null
		this.surfs[ i ].clickHold = null
		this.surfs[ i ].href = null

		if ( this.sBarTemp[ i ]._href ) {
			this.surfs[ i ].href = true
		}

		if ( this.sBarTemp[ i ]._click ) {
			this.surfs[ i ].click = this.sBarTemp[ i ]._click
		}

		if ( this.sBarTemp[ i ]._clickHold ) {
			this.surfs[ i ].clickHold = this.sBarTemp[ i ]._clickHold
		}

		this.touch.subscribe( this.surfs[ i ] )

	}

	this.layout.addItems( this.surfs )

	console.log( 'this.layout >', this.layout )



	this.x = new Transitionable( 0 )
	this.transform = this.x.map( function ( value ) {
		// console.log( 'value >', value )
		return Transform.translateX( value )
	} )

	this.touch.on( 'start', function ( pay ) {
		this.x.reset( 0 )
	}.bind( this ) )

	this.touch.on( 'update', function ( pay ) {
		// console.log( 'pay.value[ 0 ] >', pay.value[ 0 ] )
		this.x.set( pay.value[ 0 ] )
	}.bind( this ) )

	this.touch.on( 'end', function ( pay ) {
		this.x.reset( pay.value[ 0 ] )
		this.x.set( 0, {
			duration: 250,
			curve: Curves.outBack
		}, function () {
			this.x.reset( 0 )
		}.bind( this ) )
	}.bind( this ) )





	context.add( {
		transform: Transform.translate( [ -this.xDelta, this.wHeight - this.yDelta ] )
	} ).add( {
		transform: this.transform
	} ).add( this.layout )

}
































module.exports = sBar

//

