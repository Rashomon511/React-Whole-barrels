import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
	render() {
		return (
			<div className="login">
				<Link to='/home'>to Home</Link>
			</div>
		);
	}
}

export default Login;
