//

var _$utils = require( '../../utils.js' )
var Curves = require( '../Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var ContainerSurface = Samsara.DOM.ContainerSurface
var Transform = Samsara.Core.Transform
var LayoutNode = Samsara.Core.LayoutNode
var View = Samsara.Core.View
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator
var Timer = Samsara.Core.Timer



module.exports = View.extend( {

	defaults: {},

	initialize: function ( opts ) {

		this.setSize( [ opts.width, opts.height ] )

		this.surf = new Surface( {
			content: '',
			size: [ opts.width, opts.height ],
			origin: [ 0.5, 1 ]
		} )
		this.surf.index = opts.index

		this.surf.scales = new Transitionable( 1 )
		this.scalesTrans = this.surf.scales.map( function ( v ) {
			var value = v
			return Transform.scale( [ value, value ] )
		} )

		// this.surf.click = null
		// this.surf.on( 'touchstart', this.touched )

		this.add( {
			transform: this.scalesTrans
		} ).add( this.surf )

	},

	update: function ( temp ) {
		this.surf.setContent( temp.content )
		
		// this.surf.click = null
		// if ( temp._click ) {
		// 	this.surf.click = temp._click
		// }

	},

	touched: function () {

		this.scales.reset( 1.2 )
		this.click()

		this.scales.set( 1, {
			duration: 100
		}, function () {
			_$utils.events.emit( 'samsara.sMenu.close' )
		}.bind( this ) )
	}






} )






























































//

