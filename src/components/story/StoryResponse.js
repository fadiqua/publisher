import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Spin, Button, message } from 'antd';

import ResponseBox from '../shared/commentArea/ResponseBox';
import CommentEditer from '../shared/commentArea/CommentEditer';
import ErrorWidget from '../shared/error';
import {
  addResponse,
  fetchReplies,
  createReply,
  deleteReply,
  resetReplies,
  deleteResponse as deleteResponseAction,
} from '../../actions/actionTypes';
import { stripTags, importHTMLToDraft } from '../../utils/functions';

import { getResponseById, deleteResponse } from '../../routes';

const confirm = Modal.confirm;

class StoryResponse extends Component {
    state = {
      loading: true,
      selectedReply: null,
    };

    static contextTypes = {
      router: PropTypes.object,
    };

    componentDidMount() {
      this.props.fetchReplies({ id: this.props.responseId, type: 'initial' });
    }

    componentWillUnmount() {
      this.props.resetReplies();
    }

    closeModal = () => {
      this.context.router.history.push(window.location.pathname);
      // window.history.back();
    };

    loadMoreResponses = () => {
      const { selectedResponse, responseId } = this.props;
      if (selectedResponse.pages != selectedResponse.page) {
        this.props.fetchReplies({
          id: responseId,
          type: 'paginate',
          page: parseInt(selectedResponse.page) + 1,
        });
      }
    };

    onEditReply = () => {
      this.setState({ selectedReply: null });
    };

    onDropDownClick = (type, id, storyId, owner, isReply = true) => {
      let responseId = null;
      if (isReply) {
        responseId = this.props.responseId;
      }
      if (type === 'delete') {
        confirm({
          title: 'Do you want to delete this Response?',
          onOk: () => deleteResponse(id, storyId, owner, responseId)
            .then(() => {
              if (isReply) {
                this.props.deleteReply(id);
              } else {
                this.closeModal();
                this.props.deleteResponse(id);
              }
            })
            .catch(() => {
              Modal.error({
                title: 'Oops! Error happened.',
              });
            }),
          onCancel() {},
        });
      } else if (type === 'edit') this.setState({ selectedReply: id });
    };

    onSubmitReply = (text) => {
      if (text && stripTags(text).length > 9) {
        this.props.createReply({
          text,
          storyId: this.props.story._id,
          userId: this.props.currentUser._id,
          parentId: this.props.responseId,
        });
      } else {
        message.error('Reply at least must contain 10 characters.');
      }
    };

    renderReplies = () => {
      const { selectedReply } = this.state;
      const { currentUser, selectedResponse, story } = this.props;
      const repliesJSX = [];
      selectedResponse.docs.forEach((response, key) => {
        const currentComment = <ResponseBox key={key}
                                               className="reply"
                                               owner={currentUser._id}
                                               story={story}
                                               response={response}
                                               edit={response._id === selectedReply}
                                               showLike={false}
                                               onEdit={this.onEditReply}
                                               onDropDownClick={this.onDropDownClick} />;
        repliesJSX.push(currentComment);
      });
      return repliesJSX;
    };

    renderLoadMoreButton = () => {
      const { loading, selectedResponse } = this.props;
      if (loading === 'initial' || loading === 'error' || selectedResponse.pages == selectedResponse.page) return;
      return <Button loading={loading === 'paginate'} onClick={this.loadMoreResponses}
                       className="load-more" size="large">load more</Button>;
    };

    renderError = () => {
      const { loading } = this.props;
      if (loading === 'error') {
        return <ErrorWidget message="Error! maybe this response is deleted."/>;
      }
    };

    render() {
      const { selectedReply } = this.state;
      const {
        currentUser, story, responseId, responsesList, loading,
      } = this.props;
      const mainResponse = responsesList.get(responseId);
      // const isOwner = mainResponse ? mainResponse._id === currentUser._id: false;
      console.log('loading ', loading);

      return (
            <Modal visible
                   footer={null}
                   width={600}
                   style={{ top: '20px', minHeight: '100px' }}
                   onCancel={this.closeModal}>
                <div className="story-response">
                    { responsesList.get(responseId) && <ResponseBox owner={currentUser._id}
                                story={story}
                                response={mainResponse}
                                edit={responseId === selectedReply}
                                onEdit={this.onEditReply}
                                onDropDownClick={(type, id, storyId, owner) =>
                                    this.onDropDownClick(type, id, storyId, owner, false)}/>}
                </div>
                <div className="replies">
                    { this.renderReplies() }
                    {loading !== 'initial' && loading !== 'error' && <CommentEditer user={currentUser}
                                                           onSubmit={this.onSubmitReply}
                                                           loading={loading === 'creating'}
                                                           canExpand={false}
                                                           clearEditor={loading === 'created'}
                                                           className="reply-editor"/>}
                    { this.renderLoadMoreButton() }

                </div>
                {loading === 'initial' && <div className="text-center"> <Spin /> </div>}
                { this.renderError() }

            </Modal>
      );
    }
}
const mapStateToProps = ({
  auth: { currentUser },
  responses: { docs, loadingReplies, selectedResponse },
}, ownProps) => ({
  currentUser,
  responsesList: docs,
  loading: loadingReplies,
  selectedResponse,
});

export default connect(mapStateToProps, {
  addResponse,
  fetchReplies,
  createReply,
  deleteReply,
  resetReplies,
  deleteResponse: deleteResponseAction,
})(StoryResponse);
