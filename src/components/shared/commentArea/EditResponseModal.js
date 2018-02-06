// npm packages

import React, { PureComponent } from 'react';
import { Editor, EditorState } from 'draft-js';
import { Modal } from 'antd';
// project files
import EditButtons from '../../shared/EditButtons';
import { importHTML } from '../../../utils/functions';

class EditResponseModal extends PureComponent {
  constructor() {
    super();

    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    const { content } = this.props;
    if (content) {
      this.onChange(importHTML(content));
    }
  }

  _onChange(editorState) {
    this.setState({ editorState });
  }

  onCancelEdit() {

  }

  onSaveEdit() {

  }

  render() {
    const { editorState } = this.state;
    return (
            <Modal visible footer={null}>
                <div>
                    <Editor ref={(node) => { this.responseEditor = node; }}
                            editorState={editorState}
                            onChange={this.onChange}
                            spellCheck />
                    <EditButtons loading
                                 onCancel={this.onCancelEdit}
                                 onSave={this.onSaveEdit}
                    />
                </div>
            </Modal>
    );
  }
}

export default EditResponseModal;
