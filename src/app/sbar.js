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
	this.height = 49
	this.swipeYThreshold = 40
	this.clickThreshold = 10

	this.clamp = function ( x, a, b ) {
		return Math.min( Math.max( x, a ), b )
	}

	this.temp = [ {}, {}, {}, {}, {}, {}, {}, {} ]
	this.surfs = []
	this.nodes = []

	this.layout = new SequentialLayout( {
		direction: 0
	} )

	this.input = new MouseInput()

	this.x = new Transitionable( 0 )
	this.transform = this.x.map( function ( v ) {
		// console.log( 'v >', v )
		return Transform.translateX( v )
	} )

	var i, len = this.temp.length
	for ( i = 0; i < len; i++ ) {

		this.surfs[ i ] = new Surface( {
			content: '',
			size: [ this.xDelta, this.height ]
		} )

		this.temp[ i ].click = null
		this.temp[ i ].clickHold = null
		this.temp[ i ].href = null
		this.temp[ i ].hidden = false

		this.input.subscribe( this.surfs[ i ] )

	}

	this.layout.addItems( this.surfs )



	this.input.on( 'start', function ( pay ) {
		this.x.reset()
	}.bind( this ) )

	this.input.on( 'update', function ( pay ) {
		// console.log( 'pay.value[ 0 ] >', pay.value[ 0 ] )
		this.x.set( pay.value[ 0 ] )
	}.bind( this ) )

	this.input.on( 'end', function ( pay ) {
		this.centerIt()
	}.bind( this ) )


	this.update = function ( temp ) {

		// if ( _$router.histArr[ 1 ] ) {
		// 	var backable = _.parseBool( _$router.histArr[ 0 ].query.backable )
		// 	if ( backable == true ) {
		// 		temp[ 0 ] = {
		// 			_text: "Go Back",
		// 			_icon: "ion-arrow-left-c",
		// 			_color: 'assertive',
		// 			_href: true,
		// 			_click: function () {
		// 				_$router.goBack()
		// 			}.bind( this )
		// 		}
		// 		_$router.histArr[ 0 ].query = _.omit( _$router.histArr[ 0 ].query, 'backable' )
		// 	}
		// }

		var i, len = temp.length
		for ( i = 0; i < len; i++ ) {

			this.temp[ i ].href = null
			if ( temp[ i ]._href ) {
				this.temp[ i ].href = true
			}

			var classes = ''
			if ( i == 1 ) {
				classes = ' sBar-left-' + temp[ 0 ]._color
			}
			if ( i == 4 && temp[ 5 ]._color ) {
				classes = ' sBar-right-' + temp[ 5 ]._color
			}

			var icon = ''
			if ( temp[ i ]._icon ) {
				icon = ' ' + temp[ i ]._icon
			}

			var text = ''
			if ( temp[ i ]._text ) {
				text = temp[ i ]._text
			}

			this.surfs[ i ].setContent( '<div class="tabs tabs-icon-top' + classes + '"><a class="tab-item"><i class="icon' + icon + '"></i>' + text + '</a></div>' )

			this.temp[ i ].click = null
			if ( temp[ i ]._click ) {
				this.temp[ i ].click = temp[ i ]._click
			}

			this.temp[ i ].clickHold = null
			if ( temp[ i ]._clickHold ) {
				this.temp[ i ].clickHold = temp[ i ]._clickHold
			}

			if ( i >= 1 && i <= 4 && this.temp[ i ]._hidden == true ) {
				this.show( i )
			}

		}

		this.surfs[ 0 ].addClass( [ 'sBar-' + temp[ 0 ]._color ] )
		if ( temp[ 5 ]._color ) {
			this.surfs[ 5 ].addClass( [ 'sBar-' + temp[ 5 ]._color ] )
		}

	}



	this.centerIt = function ( now ) {
		if ( now == true ) {
			this.x.reset()
			return
		}

		this.x.set( 0, {
			duration: 250,
			curve: Curves.outBack
		} )
	}

	this.show = function ( i ) {
		this.surfs[ i ].removeClass( 'sbar-hide' )
		this.temp[ i ]._hidden = false
	}

	this.hide = function ( i ) {
		this.surfs[ i ].addClass( 'sbar-hide' )
		this.temp[ i ]._hidden = true
	}



	context.add( {
		align: [ 0, 1 ],
		transform: Transform.translate( [ -this.xDelta, -this.height ] )
	} ).add( {
		transform: this.transform
	} ).add( this.layout )

}
































module.exports = sBar

//

