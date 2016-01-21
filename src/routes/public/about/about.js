//

var _$samsara = require( '../../../app/samsara.js' )



module.exports = {
	template: require( './about-template.html' ),

	ready: function () {


		// this.showTuts()



		this.$nextTick( function () {
			if ( !window.plugins ) {
				return
			}
			window.plugins.nativepagetransitions.executePendingTransition()
		} )

	},

	methods: {
		dev1: function ( bool ) {
			if ( bool ) {
				_$famous.sMenu.show( this.temp1 )
			} else {
				_$famous.sMenu.hide()
			}
		},
		dev2: function ( bool ) {
			if ( bool ) {
				_$famous.sMenu.show( this.temp2 )
			} else {
				_$famous.sMenu.hide()
			}
		}
	}

}

