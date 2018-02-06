// npm packages
import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
// project files
import { followUser } from '../../actions/actionTypes';

class FollowButton extends Component {
  renderButtonContent() {
    const { currentUser, user } = this.props;
    const isFollowing = currentUser._following ? currentUser._following.indexOf(user._id) !== -1 : null;
    if (!isFollowing) {
      return (
                <span>Follow</span>
      );
    }
    return (
            <span>Unfollow</span>
    );
  }
  onFollowClick() {
    const { user, currentUser } = this.props;
    this.props.followUser(user._id);
    try {
      if (currentUser._id) this.props.followCallback(user._id);
    } catch (e) { }
  }
  render() {
    const { currentUser, user, className } = this.props;
    const isFollowing = currentUser._following ? currentUser._following.indexOf(user._id) !== -1 : null;
    if (currentUser._id === user._id) {
      return null;
    }
    return (
            <Button type={`${!isFollowing ? 'default' : 'danger dashed'}`}
                    onClick={this.onFollowClick}
                    className={`follow-btn ${className} ${isFollowing ? 'following' : ''}`}>{this.renderButtonContent()}</Button>
    );
  }
}

export default connect(({ auth: { currentUser } }) => ({ currentUser }), { followUser })(FollowButton);
