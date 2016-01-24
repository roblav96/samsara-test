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
		dev1: function () {
			_$samsara.mMenu.open()
		},
		dev2: function () {
			_$samsara.mMenu.close()
		},
		dev3: function () {
			console.warn( 'dev3' )
		}
	}

}

