// npm packages
import hello from 'hellojs';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Icon, Input  } from 'antd';
// project files
import SocialButton from './SocialButton';
import Or from '../shared/Or';
import {
    toggleSignin, toggleSignup,
    signinRequest, fetchUser, autoLogin
} from '../../actions/actionTypes';
import { localLogin } from '../../routes';

const FormItem = Form.Item;

class SigninModal extends Component {

    constructor(){
        super();
        this.state = {
            loading: false,
            error: ''
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                try {
                    this.setState({ loading: true, error: null });
                    const { data } = await localLogin(values);
                    this.setState({ loading: false, error: null });
                    this.props.autoLogin({ ...data.me, token: data.token });
                    console.log('result ', data)

                } catch (error) {
                    const { data: { message } } = error.response;
                    this.setState({ loading: false, error: message });
                }
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
        const { loading, error } = this.state;
        const {
            sign, auth,
            toggleSigninModal,
            toggleSignupModal,
            form: { getFieldDecorator }
        } = this.props;
        let validate  = {};
        if(!!error) validate['validateStatus'] = 'error';
        return (
            <Modal
                width={400}
                visible={sign.siginVisible}
                title="Sign In to Publisher"
                onOk={this.handleOk}
                onCancel={toggleSigninModal}
                footer={[
                    <div className="text-center" key="signup">
                        Don't have an account? <a onClick={toggleSignupModal}>Sign up</a>
                    </div>
                ]}>
                <SocialButton
                    type="facebook"
                    disabled={loading}
                    onClick={() => this.socialLogin('facebook')}
                />
                <SocialButton
                    type="google"
                    disabled={loading}
                    onClick={() => this.socialLogin('google')}
                />
                <Or/>
                <Form onSubmit={this.handleSubmit} className="sign-form">
                    <FormItem { ...validate }>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input
                                disabled={loading}
                                size="large"
                                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                                placeholder="Email Address" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                disabled={loading}
                                size="large"
                                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                                type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    {!!error && <FormItem validateStatus="error">
                         <div className="ant-form-explain">
                            <Icon type="exclamation-circle" /> { error }
                        </div>
                    </FormItem>}
                    <FormItem>
                        <div className="text-center">
                            <Button
                                loading={loading }
                                size="large" type="primary"
                                htmlType="submit"
                                className="login-form-button btn-block">
                                Log in
                            </Button>
                            Or <a className="login-form-forgot" >Forgot password</a>
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
    login: fetchUser,
    autoLogin
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(SiginModalWithForm);