import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import PreviewUploaded from './PreviewUploaded';

const Dragger = Upload.Dragger;

const uploadProps = {
  name: 'file',
  multiple: false,
  showUploadList: true,
  action: '/api/files',
  accept: 'image/gif,image/jpeg,image/png,image/jpg',
};

class UploadCover extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(info.file.response.file.filename);
      this.props.uploadChange(info.file.response.file.filename);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
    onRemove = (file) => {
      this.props.removeUpload(file);
      return true;
    }
    render() {
      const { uploadedCover } = this.props;
      return (
            <div >
                <Dragger
                    {...uploadProps}
                    onChange={this.onChange}
                    onRemove={this.onRemove}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag Image to this area to upload <strong>Story cover</strong></p>
                    <p className="ant-upload-hint">Support for a single file, (jpg, png, jpeg), Max. size 5MB</p>
                </Dragger>
                <PreviewUploaded image={uploadedCover} />
            </div>
      );
    }
}

export default UploadCover;
