import React, { Component } from 'react';
import './index.less';
import react from '../images/react.jpeg';

class Home extends Component {
	render() {
		return (
			<div className="home">
				<img src={react}></img>
			</div>
		);
	}
}

export default Home;
