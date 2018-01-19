import React, { Component } from 'react';
import { Modal } from 'antd';

import CommentBox from './CommentBox';
import { deleteResponse } from '../../../routes';
import './index.scss';

const confirm = Modal.confirm;

class CommentArea extends Component{
    state = {
        id: null
    };
    onDropDownClick = (type, id, storyId, owner) => {
        if(type === 'delete'){
            confirm({
                title: 'Do you want to delete this Response?',
                onOk: () => {
                    return deleteResponse(id, storyId, owner)
                        .then(() => { this.props.onDeleteResponse(id); })
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
    }
    onEditResponse = (type) => {
        this.setState({
            id: null
        })
    }
    renderComments = (comments, owner, id) => {
        let commentsJSX = [];
        comments.forEach((comment, key) => {
            const currentComment = <CommentBox key={key}
                                               owner={owner}
                                               parent={this.props.parent || null}
                                               comment={comment}
                                               edit={comment._id === id}
                                               onEdit={this.onEditResponse}
                                               onDropDownClick={this.onDropDownClick}/>;
            commentsJSX.push(currentComment)

        });
       return commentsJSX;

    };

    render(){
        const { comments, currentUser } = this.props;
        const { id } = this.state;
        return (
            <div>
                {this.renderComments(comments.docs || [], currentUser._id, id)}
            </div>
        )
    }
}

export default CommentArea;