import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw,  EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import uploadImageCallBack from '../../utils/uploadImageCallBack';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './WysiwygEditor.scss';


export function importHTML(html){
    let blocksFromHTML = htmlToDraft(html);
    const contentBlocks = blocksFromHTML.contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    return EditorState.createWithContent(contentState);
}
class WysiwygEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorContent: EditorState.createEmpty(),
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }
    componentDidMount(){
        if(this.props.editorValue){
            this.setState({
                editorContent: importHTML(this.props.editorValue),
            });
        }
    }

    getEditorHTML(cont){
        return draftToHtml(convertToRaw(cont.getCurrentContent()))
    }
    onEditorStateChange = ( editorContent) => {
        this.setState({
            editorContent,
        });
        this.props.onChange(this.getEditorHTML(editorContent))
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
                            // options: ['inline', 'blockType'],
                            // inline: {
                            //     options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                            //     bold: { className: 'bordered-option-classname' },
                            //     italic: { className: 'bordered-option-classname' },
                            //     underline: { className: 'bordered-option-classname' },
                            //     strikethrough: { className: 'bordered-option-classname' },
                            //     code: { className: 'bordered-option-classname' },
                            // },
                            blockType: {
                                className: 'bordered-option-classname',
                            },
                        }}
                        toolbarOnFocus
                    />
                </div>
            </div>
        )
    }
}

export default WysiwygEditor;