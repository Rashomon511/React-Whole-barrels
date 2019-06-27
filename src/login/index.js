import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button} from 'antd';
import './index.less';
@connect(state => ({login: state.login}))
@Form.create()
class Login extends Component {
	constructor(props) {
		super(props);
	}
	handleSubmit = e => {
		e.preventDefault();
		const {dispatch} = this.props;
		this.props.form.validateFields((err, values) => {
			if (!err) {
				dispatch({
					type: 'login/goHome',
					payload: values
				})
			}
		});
	};
	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div className="login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Form.Item>
						{getFieldDecorator('username', {
							rules: [{required: true, message: 'Please input your username!'}]
						})(
							<Input
								style={{width: 200}}
								prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
								placeholder="admin"
							/>,
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{required: true, message: 'Please input your Password!'}]
						})(
							<Input
								style={{width: 200}}
								prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
								type="password"
								placeholder="123"
							/>,
						)}
					</Form.Item>
					<Button style={{width: 200}} type="primary" htmlType="submit" className="login-form-button">
						Log in
					</Button>
				</Form>
			</div>
		);
	}
}

export default Login;
