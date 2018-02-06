import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal, Button, Form, Icon, Input } from 'antd';
import { toggleSignin, toggleSignup, autoLogin } from '../../actions/actionTypes';
import { localSignup } from '../../routes';

const FormItem = Form.Item;

class SignupModal extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      error: '',
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          try {
            this.setState({ loading: true, error: null });
            const { data } = await localSignup(values);
            this.setState({ loading: false, error: null });
            this.props.autoLogin({ ...data.me, token: data.token });
            console.log('result ', data);
          } catch (error) {
            const { data: { message } } = error.response;
            this.setState({ loading: false, error: message });
          }
        }
      });
    };

    handleOk() {

    }
    handleCancel() {

    }

    checkPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
    render() {
      const {
        sign, toggleSignupModal, toggleSigninModal,
        form: { getFieldDecorator },
      } = this.props;
      const { loading, error } = this.state;
      return (
            <div>
                <Modal
                    visible={sign.signupVisible}
                    title="Sign Up"
                    onOk={this.handleOk}
                    width={400}
                    onCancel={toggleSignupModal}
                    footer={[
                        <div className="text-center" key="signin">
                            Already have an account? <a onClick={toggleSigninModal}>Sign In</a>
                        </div>,
                    ]} >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your first name!' }],
                            })(<Input disabled={loading} placeholder="First Name" />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your last name!' }],
                            })(<Input disabled={loading} placeholder="Last Name" />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                            })(<Input disabled={loading} prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email Address" />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: 'Please input your Password!' },
                                    { min: 8, message: 'Password must be at least 8 characters' },
                                    ],
                            })(<Input disabled={loading} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />)}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('confirmPassword', {
                                rules: [
                                    { required: true, message: 'Please input your Password!' },
                                    {
                                        validator: this.checkPassword,
                                    },
                                    ],
                            })(<Input disabled={loading} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm Password" />)}
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
                                    className="login-form-button btn-block"
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
      );
    }
    // componentWillUnmount(){
    //     this.props.closeSignupModal()
    // }
}

const SignupModalWithForm = Form.create()(SignupModal);

const mapStateToProps = ({ sign }) => ({ sign });

const mapDispatch = dispatch => bindActionCreators({
  toggleSigninModal: toggleSignin,
  toggleSignupModal: toggleSignup,
  autoLogin,
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(SignupModalWithForm);
