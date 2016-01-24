//

var Curves = require( './Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var Transform = Samsara.Core.Transform
var Timer = Samsara.Core.Timer
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

	this.input = new TouchInput()

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

	this.clickHoldFn = function ( i ) {
		if ( this.absAccu > this.clickThreshold || this.didClick == true ) {
			return
		}

		console.warn( 'this.clickHoldFn' )
		return

		if ( _.isFunction( this.temp[ i ].clickHold ) ) {

			this.didClick = true
			this.stopDragging = true

			navigator.vibrate( 50 )

			this.temp[ i ].clickHold()
			this.didClick = true

			// this.temp[ i ].scaleComp.set( 1.5, 1.5, 1 )
			// this.temp[ i ].scaleComp.set( 1, 1, 1, {
			// 	duration: 1000,
			// 	curve: 'outBounce'
			// } )

			// this.temp[ i ].posComp.setY( -73.5 )
			// this.temp[ i ].posComp.setY( 0, {
			// 	duration: 1000,
			// 	curve: 'outBounce'
			// }, function () {
			// 	this.centerIt()
			// }.bind( this ) )

		}

	}

	this.input.on( 'start', function ( pay ) {
		console.warn( 'START > pay >', JSON.stringify( pay, true, 4 ) )

		this.x.reset()

		this.down = 0
		this.absAccu = 0
		this.accu = 0
		this.didClick = false
		this.stopDragging = false

		this.timeout = Timer.after( this.clickHoldFn, 25 )

	}.bind( this ) )

	this.input.on( 'update', function ( pay ) {
		// console.log( 'UPDATE > pay >', JSON.stringify( pay, true, 4 ) )

		if ( this.stopDragging == true ) {
			return
		}

		var delta = pay.delta
		var velocity = pay.velocity
		var value = pay.value

		if ( this.down < this.swipeYThreshold ) {
			this.down = this.down + ( ( delta[ 1 ] * velocity[ 1 ] ) - ( delta[ 0 ] * velocity[ 0 ] ) )
				// console.log( 'this.down >', this.down )
		} else {
			if ( value[ 1 ] > 0 ) {
				// _$famous.mMenu.show()
				console.warn( '_$famous.mMenu.show' )
			} else {
				// self.tuts.emit()
				console.warn( 'self.tuts.emit' )
			}
			this.stopDragging = true
			this.didClick = true
			this.centerIt()
			return
		}

		if ( this.absAccu < this.clickThreshold ) { // for getting a threshold on click events
			this.absAccu = this.absAccu + Math.abs( delta[ 0 ] ) + Math.abs( delta[ 1 ] )
		}

		var boost = this.clamp( Math.abs( velocity[ 0 ] * 1.25 ), 1, 3 )
		var accu = this.accu + ( delta[ 0 ] * boost )
		this.accu = this.clamp( accu, -this.xDelta, this.xDelta )
		this.x.set( this.accu )



		if ( Math.abs( this.accu ) >= this.xDelta ) {

			if ( this.accu > 0 ) { // test if its left or right

				if ( _.isFunction( this.temp[ 0 ].click ) ) {
					var classes = this.surfs[ 0 ].getClassList()
					if ( classes.indexOf( 'sBar-active' ) == -1 ) {
						this.surfs[ 0 ].addClass( 'sBar-active' )
					}

					this.didClick = true
					this.stopDragging = true

					if ( this.temp[ 0 ].href != true ) {
						this.temp[ 0 ].click()
						Timer.after( function () {
							this.centerIt()
						}.bind( this ), 5 )
						return
					}

					Timer.after( function () {
						this.temp[ 0 ].click()
					}.bind( this ), 5 )
				}

			} else {

				if ( _.isFunction( this.temp[ 5 ].click ) ) {
					var classes = this.surfs[ 5 ].getClassList()
					if ( classes.indexOf( 'sBar-active' ) == -1 ) {
						this.surfs[ 5 ].addClass( 'sBar-active' )
					}

					this.didClick = true
					this.stopDragging = true

					if ( this.temp[ 5 ].href != true ) {
						this.temp[ 5 ].click()
						Timer.after( function () {
							this.centerIt()
						}.bind( this ), 5 )
						return
					}

					Timer.after( function () {
						this.temp[ 5 ].click()
					}.bind( this ), 5 )

				}
			}

			return
		}

		if ( this.accu > 0 ) { // test if its left or right
			var classes = this.surfs[ 0 ].getClassList()
			if ( classes.indexOf( 'sBar-active' ) != -1 ) {
				this.surfs[ 0 ].removeClass( 'sBar-active' )
			}
		} else {
			var classes = this.surfs[ 5 ].getClassList()
			if ( classes.indexOf( 'sBar-active' ) != -1 ) {
				this.surfs[ 5 ].removeClass( 'sBar-active' )
			}
		}

	}.bind( this ) )

	this.input.on( 'end', function ( pay ) {
		console.warn( 'END > pay >', JSON.stringify( pay, true, 4 ) )

		if ( this.timeout ) {
			Timer.clear( this.timeout )
			this.timeout = null
		}

		if ( this.didClick == true ) {
			return
		}

		if ( this.absAccu < this.clickThreshold ) {

			var i = this.getSurfByPos( pay.clientX )

			if ( _.isFunction( this.temp[ i ].click ) ) {

				this.didClick = true

				if ( this.temp[ i ].href == true ) {
					this.temp[ i ].scaleComp.set( 1.5, 1.5, 1 )
					_.delay( function () {
						this.temp[ i ].click()
						_.delay( function () {
							this.temp[ i ].scaleComp.set( 1, 1, 1 )
							this.centerIt()
						}.bind( this ), 50 )
					}.bind( this ), 50 )
					return
				}

				this.temp[ i ].click()
				this.temp[ i ].scaleComp.set( 1.5, 1.5, 1, {
					duration: 100,
					curve: 'easeOutBounce'
				}, function () {
					this.temp[ i ].scaleComp.set( 1, 1, 1, {
						duration: 100,
						curve: 'easeIn'
					}, function () {
						this.centerIt()
					}.bind( this ) )
				}.bind( this ) )

				return
			}
		}

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

	this.getSurfByPos = function ( posX ) {
		if ( _.inRange( posX, 0, this.xDelta ) ) {
			return 1
		} else if ( _.inRange( posX, this.xDelta, this.xDelta * 2 ) ) {
			return 2
		} else if ( _.inRange( posX, this.xDelta * 2, this.xDelta * 3 ) ) {
			return 3
		} else if ( _.inRange( posX, this.xDelta * 3, this.xDelta * 4 ) ) {
			return 4
		} else {
			console.error( 'this.getSurfByPos >' )
			console.error( 'WTF NOT IN RANGE???' )
		}
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

