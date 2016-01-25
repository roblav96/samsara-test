//

var _$utils = require( '../../../app/utils.js' )
var _$samsara = require( '../../../app/samsara.js' )



module.exports = {
	template: require( './about-template.html' ),

	ready: function () {

		// _$samsara.sBar.update( [ {
		// 	_text: "Back",
		// 	_icon: "ion-arrow-left-c",
		// 	_color: 'assertive',
		// 	_href: true,
		// 	_click: function () {
		// 		console.warn( 'go back' )
		// 	}.bind( this )
		// }, {
		// 	_text: "Boundaries",
		// 	_icon: "ion-log-out",
		// 	_href: true,
		// 	_click: function () {
		// 		console.warn( 'boundaries' )
		// 	}.bind( this )
		// }, {
		// 	_text: "Goto Map",
		// 	_icon: "ion-android-expand",
		// 	_href: true,
		// 	_click: function () {
		// 		console.warn( 'map' )
		// 	}.bind( this ),
		// 	_clickHold: function () {
		// 		console.warn( 'map _clickHold' )
		// 	}.bind( this )
		// }, {
		// 	_text: "Activities",
		// 	_icon: "ion-ios-pulse-strong",
		// 	_href: true,
		// 	_click: function () {
		// 		console.warn( 'Activities' )
		// 	}.bind( this ),
		// 	_clickHold: function () {
		// 		console.warn( 'Activities _clickHold' )
		// 	}.bind( this )
		// }, {
		// 	_text: "Submit",
		// 	_icon: "ion-checkmark done",
		// 	_click: function () {
		// 		console.warn( 'Submit' )
		// 	}.bind( this )
		// }, {
		// 	_text: "More Actions",
		// 	_icon: "ion-android-more-vertical",
		// 	_color: 'balanced',
		// 	_click: function () {
		// 		console.warn( 'smenu' )
		// 	}.bind( this )
		// } ] )


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
			_$utils.events.emit( 'samsara.mMenu.open' )
		},
		dev2: function () {
			_$utils.events.emit( 'samsara.mMenu.close' )
		},
		dev3: function () {
			console.warn( 'dev3' )
		},

		showTuts: function () {
			var html = require( './about-tuts.html' )
				// _$samsara.tuts.open( html )
		}
	}

}

