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
			this.showTuts()
		},
		dev2: function () {
			_$samsara.tuts.close()
		},
		dev3: function () {
			console.warn( 'dev3' )
		},

		showTuts: function () {
			var html = require( './about-tuts.html' )
			_$samsara.tuts.open( html )
		}
	}

}

