// npm packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
// project files
import ResponseBox from '../shared/commentArea/ResponseBox';
import PaginateLoading from '../shared/paginate-loading';
import StoryResponse from './StoryResponse';
import PluralWord from '../shared/PluralWord';
import EditResponseModal from '../shared/commentArea/EditResponseModal';

import { deleteResponse } from '../../routes';
import {
  fetchResponses,
  deleteResponse as deleteResponseAction,
} from '../../actions/actionTypes';
import { getUrlQuery } from '../../utils/functions';

const confirm = Modal.confirm;

class StoryResponses extends Component {
    state = {
      id: null,
    };

    loadResponses = () => {
      const { story, responses } = this.props;
      if (responses.page != responses.pages && responses.responseStatus !== 'fetch') {
        this.props.fetchResponses({ id: story.currentStory._id, page: parseInt(responses.page) + 1 });
      }
    };

    componentDidMount() {
      const { story } = this.props;
      // this.loadResponses(1);
      this.props.fetchResponses({ id: story.currentStory._id, page: 1 });
    }

    onDropDownClick = (type, id, storyId, owner) => {
      if (type === 'delete') {
        confirm({
          title: 'Do you want to delete this Response?',
          onOk: () => deleteResponse(id, storyId, owner)
            .then(() => { this.props.deleteResponseAction(id); })
            .catch(() => {
              Modal.error({
                title: 'Oops! Error happened.',
              });
            }),
          onCancel() {},
        });
      } else if (type === 'edit') {
        this.setState({ id });
      }
    };

    onEditResponse = (type) => {
      this.setState({
        id: null,
      });
    };

    renderResponses() {
      const { id } = this.state;
      const { responses, currentUser, story } = this.props;
      const responsesJSX = [];
      responses.docs.forEach((response, key) => {
        const currentResponse = <ResponseBox key={key}
                                               owner={currentUser._id}
                                               story={story.currentStory}
                                               response={response}
                                               edit={response._id === id}
                                               onEdit={this.onEditResponse}
                                               onDropDownClick={this.onDropDownClick}>
                <Link className="reply"
                      to={`/topics/${story.currentStory._topic.name}/story/${story.currentStory.slug}/responses?responseid=${response._id}`}>
                    <PluralWord word="Reply" count={response.repliesCount}/>
                </Link>
            </ResponseBox>;
        responsesJSX.push(currentResponse);
      });

      return responsesJSX;
    }

    _renderResponseById() {
      const { location, story } = this.props;
      const query = getUrlQuery(location.search);
      if (query.responseid) {
        return <StoryResponse
                responseId={query.responseid}
                story={story.currentStory}/>;
      }
      return <span />;
    }

    render() {
      // responses.page != responses.pages
      const { responses } = this.props;
      const { id } = this.state;
      let editResponse = null;
      if (id) editResponse = responses.docs.get(id);
      return (
            <InfiniteScroll
                style={{ overflowY: 'auto', overflowX: 'hidden', paddingTop: '10px' }}
                next={this.loadResponses}
                className="story-responses"
                hasMore={responses.page != responses.pages}
                loader={<PaginateLoading loading canPaginate />}>
                {editResponse && <EditResponseModal content={editResponse} />}
                { this.renderResponses() }
                { this._renderResponseById() }
            </InfiniteScroll>
      );
    }
}

const mapStateToProps = ({ auth: { currentUser }, story, responses }) => ({
  currentUser, story, responses,
});

export default connect(mapStateToProps, { fetchResponses, deleteResponseAction })(StoryResponses);
