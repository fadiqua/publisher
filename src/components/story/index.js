// npm packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { Editor, EditorState, convertToRaw } from 'draft-js';
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
// title.match(/[\u0600-\u06FF]+/g)?`rtl`:''
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
        const { currentUser, story, responses } = this.props;
        const isOwner = currentUser._id === story.currentStory._creator._id;
        const editor = story.currentStory.content?importHTMLToDraft(story.currentStory.content):EditorState.createEmpty();
        const isLiked = story.currentStory._likes.indexOf(currentUser._id) !== -1;
        const showResponsesBtn = this.props.location.pathname.indexOf('/responses') === -1;
        return (
            <div className="article base-sec">
                <ScrollToTopOnMount />
                {/*<ShareButtons/>*/}
                <StoryWriter user={story.currentStory._creator}
                            readTime={story.currentStory.readTime}
                            createdAt={story.currentStory.createdAt}
                            withFollow width="50px" height="50px"/>
                <StoryCover link="/topic/popular/article-slug" imgSrc={`/media/${story.currentStory.cover}`}/>
                <StoryTitle title={story.currentStory.title}/>

                <div className="article-content">
                    <Editor readOnly={true} ref={(node) => { this.storyContent = node; }}
                            editorState={editor}
                            onChange={() => {}}
                            spellCheck={false} />
                </div>

                <TagList tags={story.currentStory.tags}/>
                <LikeButton id={story.currentStory._id}
                            isLiked={isLiked} type="Story"
                            count={story.currentStory.likesCount}/>
                <ResponseButton count={story.currentStory.commentsCount}/>
                <div className="comments">
                    <CommentEditer user={currentUser}
                                   onSubmit={this.onSubmitComment}
                                   loading={ responses.responseStatus === 'create' }
                                   clearEditor={responses.responseStatus=== 'created'} />
                    { showResponsesBtn &&
                    <ShowComments loading= {responses.responseStatus === 'fetch'}
                                  onClick={this.onShowResponses}/> }
                    {story.currentStory._id && renderRoutes(this.props.routes)}
                    {/*<CommentArea comments={responses}*/}
                                 {/*parent={story.currentStory._id}*/}
                                 {/*onDeleteResponse={this.props.deleteResponse}*/}
                                 {/*currentUser={currentUser} />*/}
                </div>
                {this.scrollToSubmittedResponse()}
            </div>
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