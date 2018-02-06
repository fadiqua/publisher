// npm pacakges
import React, { Component } from 'react';
import { Modal } from 'antd';
// project files
import ResponseBox from './ResponseBox';
import { deleteResponse } from '../../../routes';

import './index.scss';

const confirm = Modal.confirm;

class CommentArea extends Component {
    state = {
      id: null,
    };
    onDropDownClick = (type, id, storyId, owner) => {
      if (type === 'delete') {
        confirm({
          title: 'Do you want to delete this Response?',
          onOk: () => deleteResponse(id, storyId, owner)
            .then(() => { this.props.onDeleteResponse(id); })
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
    }
    onEditResponse = (type) => {
      this.setState({
        id: null,
      });
    }
    _renderResponses = (responses, owner, id) => {
      const responsesJSX = [];
      responses.forEach((response, key) => {
        const currentResponse = <ResponseBox key={key}
                                               owner={owner}
                                               parent={this.props.parent || null}
                                               response={response}
                                               edit={response._id === id}
                                               onEdit={this.onEditResponse}
                                               onDropDownClick={this.onDropDownClick}/>;
        responsesJSX.push(currentResponse);
      });
      return responsesJSX;
    };

    render() {
      const { comments, currentUser } = this.props;
      const { id } = this.state;
      return (
            <div>
                {this._renderResponses(comments.docs || [], currentUser._id, id)}
            </div>
      );
    }
}

export default CommentArea;
