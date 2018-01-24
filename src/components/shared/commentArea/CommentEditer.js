// npm packages
import React, { Component } from 'react';
import { Button } from 'antd';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// project files
import UserAvatar from '../UserAvatar';
import './CommentEditor.scss';

class CommentEditer extends Component {

    constructor() {
        super();

        this.state = {
            readOnly: false,
            onFocus: false,
            clicked: false,
            editorState: EditorState.createEmpty(),
            plainText: null
        };

        this.editorStateChanged = this.editorStateChanged.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.clearEditor){
            this.clearEditor();
        }
        // console.log('cccc',this.commentContent )
    }

    commentClick () {
        this.setState({ clicked: true }, () => this.commentContent.focus());

    }

    editorStateChanged (newEditorState){
        const contentState = newEditorState.getCurrentContent();
        const rawJson = convertToRaw(contentState);
        this.setState({
            editorState: newEditorState,
            html: draftToHtml(rawJson)
        });
    }

    submitComment(){
        this.props.onSubmit(this.state.html)
    }

    clearEditor = () => {
        this.setState({
            editorState: EditorState.createEmpty()
        })
    };

    _renderCommentEditor = () => {
        const { clicked, editorState } = this.state;
        const {canExpand } = this.props;
        if(!canExpand) {
            return <Editor ref={(node) => { this.commentContent = node; }}
                           editorState={editorState}
                           placeholder="Write a reply..."
                           onChange={this.editorStateChanged}/>
        }
        return (
            <div className="text-center" style={{fontSize: '1.2em', minHeight: '50px'}}>
                {!clicked&&<span>Write a response...</span>}
                <span  className={`${!clicked?'hide':''}`}>
                   <Editor ref={(node) => { this.commentContent = node; }}
                           editorState={editorState}
                           onChange={this.editorStateChanged}/>
                </span>
            </div>
        )
    };
    render(){
        const { clicked } = this.state;
        const { user, loading, clearEditor, className } = this.props;
        if(!user._id){
            return (
                <div className="not-signin">
                    You must sigin before submitting a response
                </div>
            )
        }
        return (
            <div className={`comment-editor-container ${className}`}>
                <div className="-user">
                    <UserAvatar type="circle"
                                width="30px"
                                height="30px"
                                prefix="/media/thumbs/"
                                imgSrc={user.thumbnail}/>
                    <strong style={{
                        top: clicked ? '0': '30px'
                    }}>
                        {user.displayName}
                    </strong>
                </div>
                <div onClick={this.commentClick.bind(this)}
                     className="comment-editor">
                    {this._renderCommentEditor()}
                    { clicked && <div className="text-right"
                    >
                        <Button type="primary"
                                loading={loading}
                                onClick={this.submitComment}>Submit</Button>
                    </div>}
                </div>
            </div>
        )
    }
}
CommentEditer.defaultProps = {
    className: '',
    canExpand: true
}
export default CommentEditer;