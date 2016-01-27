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

		this.index = opts.index
		this.setSize( [ opts.width, opts.height ] )

		this.surf = new Surface( {
			content: '',
			size: [ opts.width, opts.height ],
			origin: [ 0.5, 1 ]
		} )

		this.scales = new Transitionable( 1 )

		this.clickHold = null
		this.click = null
		this.href = false
		this.hidden = false

		this.add( {
			transform: this.scales.map( function ( v ) {
				var value = v
				return Transform.scale( [ value, value ] )
			} )
		} ).add( this.surf )

	},

	update: function ( temp ) {
		this.surf.setContent( temp.content )
		this.href = temp.href
		this.click = temp.click
		this.clickHold = temp.clickHold
	},

	doClickFn: function () {
		if ( this.href == true ) {
			this.scales.set( 1.25 )

			Timer.after( function () {
				this.click()
				Timer.after( function () {
					this.scales.set( 1 )
				}.bind( this ), 5 )
			}.bind( this ), 5 )
			return
		}

		this.click()
		this.scales.set( 1.25, {
			duration: 100,
			curve: Curves.easeOutBounce
		}, function () {
			this.scales.set( 1, {
				duration: 100,
				curve: Curves.easeIn
			} )
		}.bind( this ) )

		return
	},

	touched: function () {

		this.scales.reset( 1.2 )
		this.click()

		this.scales.set( 1, {
			duration: 100
		}, function () {
			_$utils.events.emit( 'samsara.sMenu.close' )
		}.bind( this ) )
	},

	resetClasses: function ( color ) {
		this.surf.setClasses( [ 'samsara-surface' ] )
		if ( color ) {
			this.surf.addClass( [ 'sBar-' + color ] )
		}
	},

	show: function () {
		this.surf.removeClass( 'sbar-hide' )
		this.hidden = false
	},

	hide: function () {
		this.surf.addClass( 'sbar-hide' )
		this.hidden = true
	}






} )






























































//

