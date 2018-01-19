import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form, Icon, Input } from 'antd';
import { toggleSignin, toggleSignup } from '../../actions/actionTypes';

const FormItem = Form.Item;

class SignupModal extends Component {

    constructor(){
        super();
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

    }
    handleCancel(){

    }

    render(){
        const {
            sign, toggleSignupModal, toggleSigninModal,
            form: { getFieldDecorator }
        } = this.props;
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
                        </div>
                    ]} >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('firstName', {
                                rules: [{ required: true, message: 'Please input your first name!' }],
                            })(
                                <Input placeholder="First Name" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('lastName', {
                                rules: [{ required: true, message: 'Please input your last name!' }],
                            })(
                                <Input placeholder="Last Name" />
                            )}
                        </FormItem>
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
                            {getFieldDecorator('confirmPassword', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <div className="text-center">
                                <Button
                                    loading={this.props.loading }
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
        )
    }
    // componentWillUnmount(){
    //     this.props.closeSignupModal()
    // }
}

const SignupModalWithForm = Form.create()(SignupModal);

const mapStateToProps = ({ sign }) => ({ sign });

const mapDispatch = dispatch => bindActionCreators({
    toggleSigninModal: toggleSignin,
    toggleSignupModal: toggleSignup
}, dispatch);

export default connect(mapStateToProps, mapDispatch)(SignupModalWithForm);