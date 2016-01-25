//

var _$db = require( '../../../app/db.js' )
var _$http = require( '../../../app/http.js' )
var _$utils = require( '../../../app/utils.js' )
var _$samsara = require( '../../../app/samsara.js' )



module.exports = {
	template: require( './about-template.html' ),

	ready: function () {

		console.info( 'about > _$db >', _$db )

		// _$db.save('yayy')

		// console.log( '_$db.temp >', JSON.stringify( _$db.temp, true, 4 ) )

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
			// _$utils.events.emit( 'samsara.mMenu.open' )

			_$db.putitlogin( [ {
				"active": true,
				"boundaries": [],
				"convoying": false,
				"disabled": false,
				"dname": "Laurie Laverty",
				"fav": false,
				"groups": [],
				"id": "14579004-68a5-4f12-913f-e5d04a61b75a",
				"uname": "ljlaverty",
				"xid": "rob"
			}, {
				"active": true,
				"boundaries": [],
				"convoying": false,
				"disabled": false,
				"dname": "Marina",
				"fav": false,
				"groups": [],
				"id": "de473bb0-a5da-46bf-87ad-e122e725328e",
				"uname": "marina",
				"xid": "rob"
			} ] )

			return

			var d = {
				uname: 'rob',
				pass: 'abc123'
			}

			_$http.post( '/public/login', d, function ( err, response ) {
				if ( err ) {
					console.error( err )
					return
				}

				_$db.putitlogin( response )

			} )








		},
		dev2: function () {
			// _$utils.events.emit( 'samsara.mMenu.close' )

			var d = {
				stamp: 1
			}

			_$http.post( '/socket/update', d, function ( err, response ) {
				if ( err ) {
					console.error( err )
					return
				}

				_$db.putitsocket( response )

			} )



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

