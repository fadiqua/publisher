// npm packages
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { message, Button, Modal } from 'antd';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import DocumentTitle from 'react-document-title';
// project files
import StoryLoading from './StoryLoading';
import ScrollToTopOnMount from '../shared/ScrollToTopOnMount';
import StoryWriter from '../shared/story-widget/StoryWriter';
import StoryCover from '../shared/story-widget/StoryCover';
import TagList from '../shared/TagList';
import CommentEditer from '../shared/commentArea/CommentEditer';
import ShowComments from '../shared/commentArea/ShowComments';
import LikeButton from '../shared/LikeButton';
import ResponseButton from '../shared/ResponseButton';
import {
    fetchStory,
    createResponse,
    fetchResponses,
    deleteResponse,
    initResponses
} from '../../actions/actionTypes'
import { renderRoutes, deleteStory } from '../../routes';
import './index.scss';

import { stripTags, importHTMLToDraft } from '../../utils/functions';

const confirm = Modal.confirm;
const ButtonGroup = Button.Group;

const StoryTitle = ({title}) => (
    <div className="article-title">
        <br/>
        {title && <h1 dir="auto">{title}</h1>}
    </div>
);

class Story extends Component {

    constructor(props) {
        super(props);

        this.deleteStory = this._deleteStory.bind(this);
        this.onEditResponse = this._onEditResponse.bind(this);
    }

    componentDidMount(){
        const slug = this.props.match.params.story;
        this.props.initResponses();
        this.props.fetchStory({slug});
        this.onSubmitComment = this.onSubmitComment.bind(this);
    }

    componentWillReceiveProps({location, match: { params }, initResponses, fetchStory}) {
        const slug = params.story;
        if(location.pathname !== this.props.location.pathname){
            initResponses();
            fetchStory({slug});
        }
    }

    onSubmitComment(text){
        if(text && stripTags(text).length > 9){
            this.props.createResponse({
                text,
                storyId: this.props.story.currentStory._id,
                userId: this.props.currentUser._id
            })
        } else {
            message.error(`Response at least must contain 10 characters.`);
        }

    }

    onShowResponses = () =>{
        const { location } = this.props;
        // this.props.fetchResponses(story.currentStory._id)
        this.props.history.push(`${location.pathname}/responses`)
    };

    scrollToSubmittedResponse = () => {
        // let element = document.getElementById("59abd14f4fa0101bbc3d900d");
        // if(element){
            // element.scrollIntoView(true);
            // element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        // }

    };

    _deleteStory() {
        const { story: { currentStory }, history } = this.props;
        confirm({
            title: 'Do you really want to delete this story?',
            onOk() {
                return deleteStory(currentStory._id)
                    .then(() => history.replace('/'))
                    .catch(() => Modal.error({
                        title: 'Error Happened!',
                        content: 'Sorry, Error occurred during deletion, try again.',
                    }))
            },
            onCancel() {},
        });
    }

    _onEditResponse() {
     const { history, story: { currentStory } } = this.props;
        history.push({
            pathname: `/write-story`,
            // search: `?edit=${currentUser._id}`,
            state: { story: currentStory }
        })
    }

    render(){
        const {
            currentUser,
            story: { loading, currentStory }, responses,
            location
        } = this.props;
        const editor = currentStory.content ? importHTMLToDraft(currentStory.content):EditorState.createEmpty();
        const isLiked = currentStory._likes.indexOf(currentUser._id) !== -1;
        const showResponsesBtn = location.pathname.indexOf('/responses') === -1;

        if(loading) return <StoryLoading />;

        return (
            <DocumentTitle title={currentStory.title || 'Publisher'}>
                <div className="story base-sec">
                    <ScrollToTopOnMount />
                    {/*<ShareButtons/>*/}
                    <div className="story-header">
                        <StoryWriter user={currentStory._creator}
                                     readTime={currentStory.readTime}
                                     createdAt={currentStory.createdAt}
                                     withFollow width="50px" height="50px"
                        />
                        {currentStory.isOwner &&
                        <ButtonGroup>
                            <Button
                                onClick={this.onEditResponse}
                                type="primary"
                                icon="edit"
                            />
                            <Button
                                onClick={this.deleteStory}
                                type="danger"
                                icon="delete"
                            />
                        </ButtonGroup>}
                    </div>
                    <StoryCover link="/topic/popular/article-slug"
                                imgSrc={`/media/${currentStory.cover}`}/>
                    <StoryTitle title={currentStory.title} />
                    <div className="story-content">
                        <Editor readOnly={true} ref={(node) => { this.storyContent = node; }}
                                editorState={editor}
                                onChange={() => {}}
                                spellCheck={false} />
                    </div>

                    <TagList tags={currentStory.tags}/>
                    <LikeButton id={currentStory._id}
                                isLiked={isLiked} type="Story"
                                count={currentStory.likesCount}/>
                    <ResponseButton count={currentStory.commentsCount}/>
                    <div className="comments">
                        <CommentEditer user={currentUser}
                                       onSubmit={this.onSubmitComment}
                                       loading={ responses.responseStatus === 'create' }
                                       clearEditor={responses.responseStatus=== 'created'} />
                        { showResponsesBtn &&
                        <ShowComments loading= {responses.responseStatus === 'fetch'}
                                      onClick={this.onShowResponses}/> }
                        {currentStory._id &&
                        <Switch>
                            { renderRoutes(this.props.routes) }
                        </Switch>
                        }
                    </div>
                    {this.scrollToSubmittedResponse()}
                </div>
            </DocumentTitle>
        )
    }

}

const mapState = ({auth:{currentUser},story, responses}) => ({
    currentUser,
    story,
    responses
});

const mapDispatch = dispatch => bindActionCreators({
    fetchStory, createResponse,
    fetchResponses, deleteResponse, initResponses
}, dispatch);

export default connect(mapState, mapDispatch)(Story);