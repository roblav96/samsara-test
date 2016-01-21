//

var _ = require( 'lodash' )

var Surface = require( 'samsarajs' ).DOM.Surface
var Context = require( 'samsarajs' ).DOM.Context




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

	context.add( surface )
	context.mount( document.querySelector( '#samsara' ) )
}













































module.exports = _$samsara



//
