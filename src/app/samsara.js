//

var _ = require( 'lodash' )

var Surface = require( 'samsarajs' ).DOM.Surface
var Context = require( 'samsarajs' ).DOM.Context
var Transform = require( 'samsarajs' ).Core.Transform




var _$samsara = {}





_$samsara.init = function () {
	var surface = new Surface( {
		content: 'hello {{idk}}', // innerHTML
		size: [ 100, 100 ], // [width, height]
		properties: { // style properties
			background: 'red'
		}
	} )

	var context = new Context()
	context.setPerspective( 1000, {
		duration: 5000
	} )

	context.add( {
		transform: Transform.translate( [ 100, 100, 0 ] )
	} ).add( surface )

	context.mount( document.querySelector( '#app' ) )
		// context.mount()

}













































module.exports = _$samsara



//

