// npm packages
import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { message } from 'antd';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import DocumentTitle from 'react-document-title';
// project files
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
import './index.scss';
import { renderRoutes } from '../../routes';

import { stripTags, importHTMLToDraft } from '../../utils/functions';

const StoryTitle = ({title}) => (
    <div className="article-title">
        <br/>
        {title && <h1 dir="auto">{title}</h1>}
    </div>
);

class Article extends Component {

    componentDidMount(){
        const slug = this.props.match.params.story;
        this.props.initResponses();
        this.props.fetchStory({slug});
        this.onSubmitComment = this.onSubmitComment.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const slug = nextProps.match.params.story;
        if(nextProps.location.pathname !== this.props.location.pathname){
            nextProps.initResponses();
            nextProps.fetchStory({slug});
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

    onCommentClick = (e) =>{
        console.log('comment')
    };

    scrollToSubmittedResponse = () => {
        // let element = document.getElementById("59abd14f4fa0101bbc3d900d");
        // if(element){
            // element.scrollIntoView(true);
            // element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
        // }

    };

    render(){
        const { currentUser, story: { currentStory }, responses, location } = this.props;
        const isOwner = currentUser._id === currentStory._creator._id;
        const editor = currentStory.content?importHTMLToDraft(currentStory.content):EditorState.createEmpty();
        const isLiked = currentStory._likes.indexOf(currentUser._id) !== -1;
        const showResponsesBtn = location.pathname.indexOf('/responses') === -1;
        return (
            <DocumentTitle title={currentStory.title}>
                <div className="article base-sec">
                    <ScrollToTopOnMount />
                    {/*<ShareButtons/>*/}
                    <StoryWriter user={currentStory._creator}
                                 readTime={currentStory.readTime}
                                 createdAt={currentStory.createdAt}
                                 withFollow width="50px" height="50px"/>
                    <StoryCover link="/topic/popular/article-slug" imgSrc={`/media/${currentStory.cover}`}/>
                    <StoryTitle title={currentStory.title}/>

                    <div className="article-content">
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
                        {/*<CommentArea comments={responses}*/}
                        {/*parent={story.currentStory._id}*/}
                        {/*onDeleteResponse={this.props.deleteResponse}*/}
                        {/*currentUser={currentUser} />*/}
                    </div>
                    {this.scrollToSubmittedResponse()}
                </div>
            </DocumentTitle>
        )
    }

}


const mapStateToProps = ({auth:{currentUser},story, responses}) => ({
    currentUser,
    story,
    responses
});

export default connect(mapStateToProps, { fetchStory, createResponse,
    fetchResponses, deleteResponse, initResponses })(Article);