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



function Tuts( context ) {
	this.wWidth = window.innerWidth
	this.halfwWidth = this.wWidth * 0.5
	this.wHeight = window.innerHeight
	this.halfwHeight = this.wHeight * 0.5

	this.index = 601
	this.top = 0
	this.shown = false
	this.showing = false



	this.y = new Transitionable( 0 )
	this.opa = new Transitionable( 1 )
	this.scale = new Transitionable( 0.5 )
	this.yTrans = this.y.map( function ( v ) {
		return Transform.translateY( v )
	} )
	this.scaleTrans = this.scale.map( function ( v ) {
		return Transform.scale( [ v, v ] )
	} )

	this.click = function () {
		this.close()
	}.bind( this )

	this.surf = new Surface( {
		size: [ this.wWidth, this.wHeight - 44 - 49 - this.top ],
		origin: [ 0.5, 0 ],
		opacity: this.opa,
		content: '',
		classes: [ 'help-surf' ],
		properties: {
			color: 'white',
			background: "rgba(0, 0, 0, 0.8)"
		}
	} )

	this.open = function ( temp ) {
		if ( this.shown == true ) {
			return
		}

		this.showing = true
		navigator.vibrate( 50 )

		this.surf.setContent( temp )



	}

	this.close = function ( now ) {
		if ( this.shown == false ) {
			return
		}

		this.showing = true



	}





	console.log( 'this.yTrans >', this.yTrans )
	console.log( 'this.scaleTrans >', this.scaleTrans )
	
	// var idk = Transform.compose( [
	// 	this.yTrans,
	// 	this.scaleTrans
	// ] )
	// console.log( 'idk >', idk )

	context.add( {
		transform: this.yTrans

		// } ).add( {
		// transform: Transform.compose( [
		// 	this.yTrans,
		// 	this.scaleTrans
		// ] )
	} ).add( this.surf )

}

















































module.exports = Tuts

//

