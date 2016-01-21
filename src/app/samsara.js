//

var _ = require( 'lodash' )

var Surface = require( 'samsarajs' ).DOM.Surface
var Context = require( 'samsarajs' ).DOM.Context
var Transform = require( 'samsarajs' ).Core.Transform




var _$samsara = {}





_$samsara.init = function () {
	var surface = new Surface( {
		content: 'hello', // innerHTML
		size: [ 100, 100 ], // [width, height]
		properties: { // style properties
			background: 'red'
		}
	} )

	var context = new Context()

	context.add( {
		transform: Transform.translate( [ 100, 100, 99 ] )
	} ).add( surface )

	// context.mount( document.querySelector( '#samsara_div' ) )
	context.mount()

}













































module.exports = _$samsara



//

