import React, { PureComponent } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import { Modal } from 'antd';

import EditButtons from '../../shared/EditButtons';
import { importHTML, charCounter } from '../../../utils/functions';

class EditResponseModal extends PureComponent {

    constructor() {
        super();

        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = this._onChange.bind(this)

    }

    componentDidMount() {
        const { content } = this.props;
        if(content) {
            this.onChange(importHTML(content))
        }
    }

    _onChange(editorState) {
        this.setState({ editorState })
    }

    onCancelEdit() {

    }

    onSaveEdit() {

    }

    render() {
        const { editorState } = this.state;
        return (
            <Modal visible={true} footer={null}>
                <div>
                    <Editor ref={(node) => { this.responseEditor = node; }}
                            editorState={editorState}
                            onChange={this.onChange}
                            spellCheck={true} />
                    <EditButtons loading={true}
                                 onCancel={this.onCancelEdit}
                                 onSave={this.onSaveEdit}
                    />
                </div>
            </Modal>
        )
    }
}

export default EditResponseModal;