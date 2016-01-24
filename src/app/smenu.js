//

var _$utils = require( './utils.js' )
var Curves = require( './Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var ContainerSurface = Samsara.DOM.ContainerSurface
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

	this.index = 301
	this.width = 100
	this.height = 80
	this.shown = false
	this.showing = false
	this.temp = [ {}, {}, {}, {}, {}, {}, {}, {} ]



	this.surfs = []
	this.nodes = []
	this.scales = []
	this.scalesTrans = []
	this.layout = new SequentialLayout( {
		direction: 1
	} )

	this.y = new Transitionable( 0 )

	this.yTrans = this.y.map( function ( v ) {
		return Transform.translate( [ 0, v ] )
	} )

	this.touched = function ( key, index ) {
		if ( key == 'help' ) {
			// _$router.app.openSOS()
			console.warn( '_$router.app.openSOS()' )
			return
		}
		this.hrefPrep( key, index )
	}.bind( this )

	_.forEach( this.temp, function ( v, k ) {
		var i = v.index

		this.nodes[ i ] = new ContainerSurface( {
			size: [ this.width, this.height ],
			origin: [ 0, 0.5 ]
		} )

		var content = '<div class="list tabs side-tab tabs-icon-top"><li class="item tab-item"><i class="icon ' + v.icon + '"></i>' + v.text + '</li></div>'
		if ( k == "help" ) {
			content = '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ' + v.icon + '"></i>' + v.text + '</li></div>'
		}

		this.surfs[ i ] = new Surface( {
			content: content,
			size: [ this.width, this.height ]
		} )

		this.surfs[ i ].on( 'mousedown', function () {
			this.touched( k, i )
		}.bind( this ) )

		this.scales[ i ] = new Transitionable( 1 )
		this.scalesTrans[ i ] = this.scales[ i ].map( function ( value ) {
			return Transform.scale( [ value, 1 ] )
		} )

		this.nodes[ i ].add( {
			transform: this.scalesTrans[ i ]
		} ).add( this.surfs[ i ] )

	}.bind( this ) )

	this.layout.addItems( this.nodes )





	this.toggle = function () {
		if ( this.showing == true ) {
			return
		}

		if ( this.shown == true ) {
			this.close()
		} else {
			this.open()
		}
	}

	this.open = function () {
		if ( this.shown == true ) {
			return
		}

		// _$utils.events.emit( 'famous.sMenu.close' )
		this.showing = true

		this.opa.set( 1, {
			duration: 250
		} )
		this.x.set( 0, {
			duration: 250,
			curve: Curves.outBack
		}, function () {
			this.shown = true
			this.showing = false
		}.bind( this ) )
	}.bind( this )

	this.close = function ( now ) {
		if ( this.shown == false ) {
			return
		}

		this.showing = true

		if ( now == true ) {
			this.opa.set( 0 )
			this.x.set( -100 )
			this.showing = false
			this.shown = false
			return
		}

		this.opa.set( 0, {
			duration: 250,
			curve: Curves.easeIn
		} )
		this.x.set( -100, {
			duration: 250,
			curve: Curves.easeIn
		}, function () {
			this.shown = false
			this.showing = false
		}.bind( this ) )
	}.bind( this )



	this.hrefPrep = function ( key, index ) {
		if ( _$router._currentRoute.name == this.temp[ key ].state ) {
			_$utils.events.emit( 'famous.fixMenus' )
			return
		}

		var curName = _$router._currentRoute.name.split( '.' )[ 0 ]
		if ( curName == 'public' ) {
			_$utils.events.emit( 'famous.fixMenus' )
			return
		}

		var iFrom = this.temp[ curName ].index
		var direct = 'left'
		if ( iFrom > index ) {
			direct = 'down'
		} else if ( iFrom < index ) {
			direct = 'up'
		}

		this.scales[ index ].set( 1.25 )

		console.log( 'direct >', direct )
		console.log( 'this.temp[ key ].state >', this.temp[ key ].state )
		return

		_$router.go( {
			name: this.temp[ key ].state,
			query: {
				direction: direct
			}
		} )
		
		_.delay( function () {
			this.scales[ index ].set( 1 )
		}.bind( this ), 10 )

	}



	this.setActiveClass = function ( toState ) {
		var ts = toState.split( '.' )[ 0 ]

		if ( ts != this.activeClass ) {
			this.activeClass = ts

			if ( this.activeClass == 'public' ) {
				return
			}

			_.forEach( this.surfs, function ( v, i ) {
				this.surfs[ i ].surf.removeClass( 'mMenu-active' )
			}.bind( this ) )

			this.surfs[ this.activeClass ].surf.addClass( 'mMenu-active' )
		}
	}



	this.sosBarHeader = function ( drill ) {
		if ( C_EMERGENCY == true ) {
			this.surfs[ 0 ].addClass( 'mMenu-emergency' )
			var str = "ACTIVE"
			if ( drill == true ) {
				str = str + "<br>DRILL"
			}
			this.surfs[ 0 ].setContent( '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ion-help-buoy"></i>' + str + '</li></div>' )
			return
		}
		this.surfs[ 0 ].removeClass( 'mMenu-emergency' )
		this.surfs[ 0 ].setContent( '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ion-help-buoy"></i>S.O.S</li></div>' )
	}.bind( this )

	this.activities = function ( bool ) {
		if ( bool == true ) {
			this.surfs[ 3 ].addClass( 'mMenu-balanced' )
		} else {
			this.surfs[ 3 ].removeClass( 'mMenu-balanced' )
		}
	}.bind( this )



	context.add( {
		align: [ 0, 1 ],
		transform: this.xTrans,
		opacity: this.opa
	} ).add( this.layout )

}





module.exports = mMenu

//

