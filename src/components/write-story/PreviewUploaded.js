import React, { Component } from 'react';
import {  Modal } from 'antd';

class PreviewUploaded extends Component {
    state = {
        previewVisible: false
    };
    onPreview = () => {
        this.setState({previewVisible: true})
    };
    handleCancel = () => this.setState({ previewVisible: false });

    render(){
        const { image } = this.props;
        const { previewVisible } = this.state;
        return (
            <div>
                {image && <div className="preview-upload">
                    <div className="uploaded-cover">
                        <div className="prev-overlay" onClick={() => this.onPreview()}>
                            <i className="material-icons">remove_red_eye</i>
                        </div>
                        <img className="img-responsive" src={`/media/${image}`} alt="preview" />
                    </div>

                </div>}
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                    wrapClassName="preview-modal"
                >
                    <img alt="example"
                         style={{ width: '100%' }}
                         src={`/media/${image}`} />
                </Modal>
            </div>
        )
    }
}

export default PreviewUploaded;