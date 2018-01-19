import hello from 'hellojs';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Icon, Input  } from 'antd';
import SocialButton from './SocialButton';
import Or from '../shared/Or';
import {
    toggleSignin, toggleSignup,
    signinRequest, fetchUser
} from '../../actions/actionTypes';
import { localLogin } from '../../routes/api'
const FormItem = Form.Item;

class SigninModal extends Component {

    constructor(){
        super();
        this.state = {
            loading: false
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // this.props.login({ data: values })
            }
        });
    };

    handleOk(){
        this.props.handleSignin();
    }

    handleCancel(){

    }

    socialLogin(network) {
        hello.login(network);
    }
    render(){
        const {
            sign, auth,
            toggleSigninModal,
            toggleSignupModal,
            form: { getFieldDecorator }
        } = this.props;
        return (
            <Modal
                width={400}
                visible={sign.siginVisible}
                title="Sign In"
                onOk={this.handleOk}
                onCancel={toggleSigninModal}
                footer={[
                    <div className="text-center" key="signup">
                        Don't have an account? <a onClick={toggleSignupModal}>Sign up</a>
                    </div>
                ]}>
                <SocialButton type="facebook" disabled={auth.loading} onClick={() => this.socialLogin('facebook')}/>
                <SocialButton type="google"  disabled={auth.loading}  onClick={() => this.socialLogin('google')}/>
                <Or/>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email Address" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <div className="text-center">
                            <Button loading={this.props.loading } size="large" type="primary" htmlType="submit" className="login-form-button btn-block">
                                Log in
                            </Button>
                            Or <a className="login-form-forgot" href="">Forgot password</a>
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const SiginModalWithForm = Form.create()(SigninModal);

const mapStateToProps = ({ sign, auth }) => ({ sign, auth });

const mapDispatch = dispatch => bindActionCreators({
    toggleSignupModal: toggleSignup,
    toggleSigninModal: toggleSignin,
    handleSignin: signinRequest,
    login: fetchUser
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(SiginModalWithForm);