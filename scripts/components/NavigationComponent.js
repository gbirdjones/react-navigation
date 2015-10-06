var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function(){
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
	render: function() {
		var links = [];

		if (!Parse.User.current()) {
			links.push(this.createNavLink('login', 'login'));
			links.push(this.createNavLink('register', 'register'));
		} else {
			links.push(this.createNavLink('dashboard', 'dashboard'));
			links.push(<li><a href="#" onClick={this.logOut}>Logout</a></li>);
		}

		
		return (
			<div className="nav-wrapper">
				<a href="#" className="brand-logo left">Login Example</a>
				<ul id="nav-mobile" className="right">
					<li key="home"><a href="#">Home</a></li>
					{links}
				</ul>
			</div>
		);
	},
	logOut: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('login', {trigger: true});
		console.log('logged out');

	},
	createNavLink: function(url, label) {
		var currentUrl = Backbone.history.getFragment();
		if(currentUrl === url) {
			return (<li className="active"><a href={'#'+url}>{label}</a></li>);
		}
		else {
			return (<li><a href={'#'+url}>{label}</a></li>);
		}
	}

})