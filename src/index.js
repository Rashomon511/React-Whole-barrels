import React, { Component } from 'react';
import ReactDom from 'react-dom';
// import './index.less';

class App extends Component {
  componentDidMount() {
    this.getInfo();
  }
	getInfo = () => '魑魅魍魉'
	render() {
	  return (
			<div className="content">
                ddd
			</div>
	  );
	}
}

ReactDom.render(<App />, document.getElementById('root'));
