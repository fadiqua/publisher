// npm packages
import React, { Component } from 'react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import classNames  from 'classnames';
import { Modal } from 'antd';
// project files
import StoryWriter from '../story-widget/StoryWriter';
import ReadMoreButton from './ReadMoreButton';
import CtrlDropdown from '../../shared/CtrlDropdown';
import EditButtons from '../../shared/EditButtons';
import { importHTMLToDraft } from '../../../utils/functions';
import { updateResponse } from '../../../routes';
import LikeButton from '../LikeButton';
import './ResponseBox.scss';

class ResponseBox extends Component{
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
        const { response } = this.props;
        this.setState({
            editorState: importHTMLToDraft(response.text)
        })
    }
    componentDidMount(){
        if(this.responseContent){
            const hight = this.responseContent.clientHeight;
            this.setState({
                showMore: hight > 55
            });
        }
    }
    renderresponseEditor = () => {
        const { edit } = this.props;
        const { editorState } = this.state;
        return (
            <Editor readOnly={!edit} ref={(node) => { this.responseContent = node; }}
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
        const { response } = this.props;
        this.setState({
            editorState: importHTMLToDraft(response.text)
        });
        this.props.onEdit('cancel')
    };

    onSaveEdit = (e) =>{
        const { response } = this.props;
        const { editorState } = this.state;
        const editorHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        if(response.text !== editorHTML || editorHTML.length < 10){
            this.setState({loadingSave: true});
            updateResponse(response._id, editorHTML, response._creator._id)
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
        const { response, story, edit, showLike, className } = this.props;
        const { toggeled } = this.state;
        return (
            <div className={`response-box ${className}`} id={response._id}>
                {response.isOwner && <CtrlDropdown id={response._id}
                              onItemClick={(e, id) => this.props.onDropDownClick(
                                  e,id, story._id, response._creator.id)} /> }

                <StoryWriter width="35px" height="35px"
                            createdAt={response.createdAt}
                            user={response._creator}/>
                {this.props.children}
                <div className={classNames('response-content',{
                    'expanded': toggeled || edit,
                    'edit-mode': edit})}
                     id={response._id || ''}>
                    {/*<Link to={`/topics/${story._topic.name}/story/${story.slug}/responses?responseid=${response._id}`}>*/}

                    {/*</Link>*/}
                    <div ref={(node) => { this.responseContent = node; }}>
                        {this.renderresponseEditor()}
                    </div>
                </div>
                {this.renderReadMoreButton()}
                {this.renderEditCtrlButtons()}
                { showLike && <LikeButton type="Response"
                            id={response._id}
                            count={response.likesCount}
                            isLiked={response.isLiked}/>}
            </div>
        )
    }
}
ResponseBox.defaultProps = {
    showLike: true,
    className: ''
}
export default ResponseBox;