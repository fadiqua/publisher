import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

import CommentBox from '../shared/commentArea/CommentBox';
import  PaginateLoading from '../shared/paginate-loading'
import StoryResponse from './StoryResponse';
import PluralWord from '../shared/PluralWord';
import { deleteResponse } from '../../routes/api';
import {
    fetchResponses,
    deleteResponse as deleteResponseAction
} from '../../actions/actionTypes'
import { getUrlQuery } from '../../utils/functions';

const confirm = Modal.confirm;

class StoryResponses extends Component{
    state = {
        id: null
    };
    loadResponses = () => {
        const { story, responses } = this.props;
        if(responses.page != responses.pages && responses.responseStatus !== 'fetch') {
            this.props.fetchResponses({id: story.currentStory._id, page: parseInt(responses.page)+1})
        }

    };
    componentDidMount(){
        const { story } = this.props;
        // this.loadResponses(1);
        this.props.fetchResponses({id: story.currentStory._id, page:1 })

    }

    onDropDownClick = (type, id, storyId, owner) => {
        if(type === 'delete'){
            confirm({
                title: 'Do you want to delete this Response?',
                onOk: () => {
                    return deleteResponse(id, storyId, owner)
                        .then(() => { this.props.deleteResponseAction(id); })
                        .catch(() => {
                            Modal.error({
                                title: 'Oops! Error happened.',
                            });
                        });
                },
                onCancel() {},
            });
        }
        else if(type === 'edit'){
            this.setState({ id })
        }
    };

    onEditResponse = (type) => {
        this.setState({
            id: null
        })
    };

    renderComments = () => {
        const { id } = this.state;
        const { responses, currentUser, story } = this.props;
        let commentsJSX = [];
        responses.docs.forEach((comment, key) => {
            // console.log(comment);
            const currentComment = <CommentBox key={key}
                                               owner={currentUser._id}
                                               story={story.currentStory}
                                               comment={comment}
                                               edit={comment._id === id}
                                               onEdit={this.onEditResponse}
                                               onDropDownClick={this.onDropDownClick}>
                <Link className="reply"
                      to={`/topics/${story.currentStory._topic.name}/story/${story.currentStory.slug}/responses?responseid=${comment._id}`}>
                    <PluralWord word="Reply" count={comment.repliesCount}/>
                </Link>
            </CommentBox>;
            commentsJSX.push(currentComment)
        });
        return commentsJSX;

    };
    renderResponseById = () => {
        const { location, story } = this.props;
        const query = getUrlQuery(location.search);
        if(query.responseid) {
            return <StoryResponse
                responseId={query.responseid}
                story={story.currentStory}/>
        }
        return <span></span>
    }
    render(){
        // responses.page != responses.pages
        const { responses } = this.props;

        return (
            <InfiniteScroll
                style={{ overflowY: 'auto',overflowX: 'hidden', paddingTop:'10px'}}
                next={this.loadResponses}
                className="story-responses"
                hasMore={responses.page != responses.pages}
                loader={<PaginateLoading loading={true} canPaginate={true} />}>
                { this.renderComments() }
                { this.renderResponseById() }
            </InfiniteScroll>
        )
    }
}

const mapStateToProps = ({auth:{currentUser},story, responses}) => ({
    currentUser,  story, responses
});

export default connect(mapStateToProps, { fetchResponses, deleteResponseAction })(StoryResponses);