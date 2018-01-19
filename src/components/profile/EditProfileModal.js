import React, { Component } from 'react';
import { Modal, Input, Slider, Col, Row, Upload, message, Form, Button } from 'antd';
// import AvatarEditor from 'react-avatar-editor'
import { getBase64 } from '../../utils/functions';
import { uploadBase64, updateProfile } from '../../routes';
import blurred from './blurred.jpg';

const FormItem = Form.Item;

class EditProfileModal extends Component{
    constructor(props){
        super(props);
        this.handleOk = this.handleOk.bind(this);
        this.state =  {
            submit: false,         visible: false,
            scale: 1.2,            uploadedFile: blurred,
            croppedImage: null,    uploadingStatus: null,
            uploadingDirty: false, progress: 0,
        };
    }

    componentWillMount(){
        this.setState({uploadedFile: this.props.user.picture})
    }

    componentWillReceiveProps(nextProps){
        this.setState({submitting: nextProps.submitting})
    }
    /**
     * For tooltip zoom slider
     * @param value - value of zoom slider
     */
    formatter = (value) => `${parseInt((value-1)*100)}%`;

    /**
     * Cropper image referance.
     */
    setEditorRef = editor => this.editor = editor

    /**
     * Handel change zoom slider
     * @param scale - value of slider
     */
    zoomSlider = scale => this.setState({ scale });

    /**
     *  Handle crop image, and upload cropped image
     */
    handleCropper = () => {
        try {
            // get base64 cropped image
            const img = this.editor.getImageScaledToCanvas().toDataURL();
            return uploadBase64({image: img});
        }
        catch (err) { message.error(err.message) }
    };

    /**
     * Handle form submit { image, displayName, bio }
     * @param e: event
     */
    handleOk = (e) => {
        const { uploadingDirty } = this.state;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            this.setState({ submit: true});
            if (!err) {
                const data = {};
                const resultImg = uploadingDirty ? (await this.handleCropper()).data: null;
                if(resultImg){
                    data['picture'] = resultImg.file.originalname;
                    data['thumbnail'] = resultImg.thumb;
                }
                Object.keys(values).map(key => data[key] = values[key]);
                const updatedUser = (await updateProfile(data)).data;
                this.props.onUpdate(updatedUser.user);
                this.setState({ submit: false});
                return;
            }
            this.setState({ submit: false });
            return;
        });

    };

    // @param file: file from upload file
    beforeUpload = (file) => {
        getBase64(file, imgUrl => {
            this.setState({
                uploadedFile: imgUrl,
                uploadingDirty: true
            })
        });
        // return false to prevent default ant upload action.
        return false;
    };

    render(){
        const { user, visible, form:{getFieldDecorator} } = this.props;
        const { submit, scale, uploadedFile, uploadingStatus, progress, uploadingDirty } = this.state;
        return (
            <Modal
                width={600} visible={visible}
                maskClosable={false}
                title="Edit Profile"
                onOk={this.handleOk} onCancel={this.props.closeModal}
                footer={[
                <Button key="back" size="large" disabled={submit} onClick={this.props.closeModal}>Return</Button>,
                <Button key="submit" type="primary" size="large"
                        disabled={ uploadingStatus === 'active' }
                        loading={submit} onClick={this.handleOk}>
                    Submit
                </Button>,]}>
                <Row type="flex" gutter={8}>
                    {/*left side*/}
                    <Col lg={{span: 10}} sm={{span:24}}>
                        <div className="image-cropped">
                            { uploadingDirty &&
                            <div>
                                {/*<AvatarEditor ref={this.setEditorRef}*/}
                                               {/*image={uploadedFile}*/}
                                               {/*width={200} height={200}*/}
                                               {/*border={0} borderRadius={200} scale={scale}*/}
                                               {/*crossOrigin="anonymous"/>*/}
                                <Slider defaultValue={1.2} min={1} max={2} step={0.01}
                                        tipFormatter={this.formatter} onChange={this.zoomSlider} />
                            </div>}

                            { !uploadingDirty && <div className="user-avatar img-circle" style={{width:'200px', height: '200px'}}>
                                <img className="img-responsive" src={`/media/${uploadedFile}`} alt="profile cover"/>
                            </div> }
                            <br/>
                            <Upload  className="upload-input text-center" name="file"
                                     action=""
                                     showUploadList={false}
                                     beforeUpload={this.beforeUpload}
                                     accept='image/jpeg,image/png,image/jpg'>
                                <Button type="primary" ghost>
                                    Change your picture
                                </Button>
                            </Upload>
                        </div>
                    </Col>
                    {/*right side*/}
                    <Col lg={{span: 14}} sm={{span:24}}>
                        <Form className="user-info-inputs" onSubmit={this.handleOk}>
                            <FormItem hasFeedback>
                                {getFieldDecorator('firstName', {
                                    initialValue: user.firstName,
                                    rules: [{ required: true, message: 'First name name can\'t be empty!', whitespace: true }],
                                })(
                                    <Input type="text" size="large"  placeholder="First Name"/>
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('lastName', {
                                    initialValue: user.lastName,
                                    rules: [{ required: true, message: 'Last name name can\'t be empty!', whitespace: true }],
                                })(
                                    <Input type="text" size="large"  placeholder="Last Name"/>
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('bio', {
                                    initialValue: user.bio,
                                    rules: [{ required: true, message: 'Bio can\'t be empty!', whitespace: true }],
                                })(
                                    <Input type="textarea" size="large" rows={4}  placeholder="Bio"/>
                                )}
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default Form.create()(EditProfileModal);