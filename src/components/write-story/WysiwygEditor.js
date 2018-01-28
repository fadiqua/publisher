// npm packages
import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw,  EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// project files
import uploadImageCallBack from '../../utils/uploadImageCallBack';
import { importHTML, charCounter } from '../../utils/functions';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './WysiwygEditor.scss';

class WysiwygEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorContent: EditorState.createEmpty(),
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    componentDidMount(){
        const { editorValue } = this.props;
        if(editorValue){
            this.setState({
                editorContent: importHTML(editorValue),
            });
        }
    }

    getEditorHTML(cont){
        return draftToHtml(convertToRaw(cont.getCurrentContent()))
    }

    onEditorStateChange (editorContent) {
        this.setState({
            editorContent,
        });
        this.props.onChange(this.getEditorHTML(editorContent), charCounter(editorContent))
    };




    render(){
        const { editorContent } = this.state;
        return (
            <div>
                <div className="demo-editorSection">
                    <Editor
                        hashtag={{
                            separator: ' ',
                            trigger: '#',
                            className: 'hashtag-className',
                        }}
                        editorState={editorContent}
                        toolbarClassName="wy-toolbar"
                        wrapperClassName="editor-wrapper"
                        editorClassName="wy-editor"
                        onEditorStateChange={this.onEditorStateChange.bind(this)}
                        toolbar={{
                            image: { uploadCallback: uploadImageCallBack },
                            blockType: {
                                className: 'bordered-option-classname',
                            },
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default WysiwygEditor;