'use strict';
var React = require('react');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

var NavigationComponent = require('./components/NavigationComponent');
var HomeComponent = require('./components/HomeComponent');
var DashboardComponent = require('./components/DashboardComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');

var app = document.getElementById('app');

Parse.initialize('RxMepQLpuFxLifcJN3HKqsWsq6TCJrak7vqlXyci', 'XMlIcffIfaFBuSOb56L2DdXxLjmlTenVUtHkMFEq');


var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register'
	},
	home: function() {
		React.render(<HomeComponent />, app);
	},
	dashboard: function() {
		if(!Parse.User.current()) {
			this.navigate('login', {trigger: true});
		} else {
			React.render(<DashboardComponent />, app);
		}
	},
	register: function() {
		if(Parse.User.current()) {
			this.navigate('dashboard', {trigger: true});
		} else {
			React.render(<RegisterComponent router={r}/>, app);
		}
	},
	
	login: function() {
		if(Parse.User.current()) {
			this.navigate('dashboard', {trigger: true});
		} else {
			React.render(<LoginComponent router={r}/>, app);
		}
	},
	
});

var r = new Router();
Backbone.history.start();

React.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);