import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.less';

class Login extends Component {
	render() {
		return (
			<div className="login">
				<i className="iconfont icon-changjingguanli" />
				<Link to='/home'>to Home</Link>
			</div>
		);
	}
}

export default Login;
