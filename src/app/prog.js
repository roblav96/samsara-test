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



function Prog( context ) {
	this.wWidth = window.innerWidth
	this.halfwWidth = this.wWidth * 0.5
	this.wHeight = window.innerHeight
	this.halfwHeight = this.wHeight * 0.5

	this.index = 501
	this.posX = 0
	this.active = false
	this.err = false
	this.width = this.wWidth * 0.25
	this.height = 5

	this.surf = new Surface( {
		size: [ this.width, this.height ],
		origin: [ 0.5, 0 ],
		properties: {
			background: '#11C1F3'
		}
	} )

	this.x = new Transitionable( this.posX )
	this.xTrans = this.x.map( function ( v ) {
		return Transform.translateX( v )
	} )
	
	this.swap = function () {
		if ( this.active == false || this.err == true ) {
			return
		}

		this.x.halt()
		// this.x.set( this.posX )
		// this.x.reset( this.posX )
		this.posX = ( this.posX ) ? 0 : this.wWidth
		this.x.set( this.posX, {
			duration: 1000,
			curve: 'easeOutBounce'
		}, function () {
			console.warn( 'end swap' )
			this.swap()
		}.bind( this ) )

	}

	this.done = function () {
		this.posX = 0
		this.active = false
		console.warn( 'done' )
		this.x.reset( 0 )
	}

	this.start = function () {
		if ( this.active == true || this.err == true ) {
			return
		}
		console.warn( 'start' )

		this.active = true
		this.swap()
	}

	this.stop = function () {
		if ( this.active == false || this.err == true ) {
			return
		}
		console.warn( 'stop' )

		this.done()
	}

	this.error = function () {
		this.err = true
		// make cool red animation
		this.err = false
	}

	context.add( {
		transform: this.xTrans
	} ).add( this.surf )

}

module.exports = Prog

//

