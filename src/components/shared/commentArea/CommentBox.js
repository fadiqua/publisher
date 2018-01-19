import React, { Component } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import classNames  from 'classnames';
import { Modal } from 'antd';

import StoryWriter from '../story-widget/StoryWriter';
import ReadMoreButton from './ReadMoreButton';
import CtrlDropdown from '../../shared/CtrlDropdown';
import EditButtons from '../../shared/EditButtons';
import { importHTMLToDraft } from '../../../utils/functions';
import { updateResponse } from '../../../routes';
import LikeButton from '../LikeButton';

class CommentBox extends Component{
    constructor(props){
        super(props);
        this.onShowMoreClick = this.onShowMoreClick.bind(this);
        this.editorStateChanged = this.editorStateChanged.bind(this);
        this.state = {
            showMore: false,
            toggeled: false,
            editorState:  EditorState.createEmpty(),
            html: null,
            loadingSave: false
        };

    }

    onShowMoreClick(){
        this.setState({toggeled: !this.state.toggeled})
    }

    editorStateChanged (newEditorState){
        const contentState = newEditorState.getCurrentContent();
        const rawJson = convertToRaw(contentState);
        this.setState({
            editorState: newEditorState,
            html: draftToHtml(rawJson)
        });
    }
    componentWillMount(){
        const { comment } = this.props;
        this.setState({
            editorState: importHTMLToDraft(comment.text)
        })
    }
    componentDidMount(){
        if(this.commentContent){
            const hight = this.commentContent.clientHeight;
            this.setState({
                showMore: hight > 55
            });
        }
    }
    renderCommentEditor = () => {
        const { edit } = this.props;
        const { editorState } = this.state;
        return (
            <Editor readOnly={!edit} ref={(node) => { this.commentContent = node; }}
                    editorState={editorState}
                    onChange={this.editorStateChanged}
                    spellCheck={!edit} />
        )
    };
    renderReadMoreButton = () =>{
        const { showMore, toggeled } = this.state;
        const { edit } = this.props;
        if(showMore && !edit){
            return (
                <ReadMoreButton show={showMore}
                                readMore={toggeled} onClick={this.onShowMoreClick}/>
            )
        }
    };

    onCancelEdit = (e) =>{
        const { comment } = this.props;
        this.setState({
            editorState: importHTMLToDraft(comment.text)
        });
        this.props.onEdit('cancel')
    };

    onSaveEdit = (e) =>{
        const { comment } = this.props;
        const { editorState } = this.state;
        const editorHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        if(comment.text !== editorHTML || editorHTML.length < 10){
            this.setState({loadingSave: true});
            updateResponse(comment._id, editorHTML, comment._creator._id)
                .then(response => {
                    this.setState({loadingSave: false});
                    this.props.onEdit('updated')
                }).catch(error => {
                this.setState({loadingSave: false});
                Modal.error({
                    title: 'Oops! Error happened.',
                });
            })
        } else {
            this.onCancelEdit();
        }

    };

    renderEditCtrlButtons = () => {
        const { edit } = this.props;
        const { loadingSave } = this.state;
        if(edit){
            return (
                <EditButtons loading={loadingSave}
                             onCancel={this.onCancelEdit} onSave={this.onSaveEdit} />
            )
        }
    };

    render(){
        const { comment, owner, story, edit, showLike, className } = this.props;
        const { toggeled } = this.state;
        const isLiked = comment._likes.indexOf(owner) !== -1;
        const isOwner = comment._creator._id === owner;
        return (
            <div className={`comment-box ${className}`} id={comment._id}>
                {isOwner && <CtrlDropdown id={comment._id}
                              onItemClick={(e, id) => this.props.onDropDownClick(
                                  e,id, story._id, comment._creator.id)} /> }

                <StoryWriter width="35px" height="35px"
                            createdAt={comment.createdAt}
                            user={comment._creator}/>
                {this.props.children}
                <div className={classNames('comment-content',{
                    'expanded': toggeled || edit,
                    'edit-mode': edit})}
                     id={comment._id || ''}>
                    {/*<Link to={`/topics/${story._topic.name}/story/${story.slug}/responses?responseid=${comment._id}`}>*/}

                    {/*</Link>*/}
                    <div ref={(node) => { this.commentContent = node; }}>
                        {this.renderCommentEditor()}
                    </div>
                </div>
                {this.renderReadMoreButton()}
                {this.renderEditCtrlButtons()}
                { showLike && <LikeButton type="Comment"
                            id={comment._id}
                            count={comment.likesCount}
                            isLiked={isLiked}/>}
            </div>
        )
    }
}
CommentBox.defaultProps = {
    showLike: true,
    className: ''
}
export default CommentBox;