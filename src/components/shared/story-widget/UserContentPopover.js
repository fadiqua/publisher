import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import UserAvatar from '../../shared/UserAvatar';
import FollowButton from '../FollowButton';
import { getUserById } from '../../../routes';
import timeSince from '../../../utils/timeSince';
import { formatNumber } from '../../../utils/functions';

class UserContentPopover extends Component {

    state = {
        visible: false,
        fetching: true,
        following: true,
        userProfile: {},
        topStories: [],
        isFollowing: null
    };

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };

    fetchUserData = () => {
        if(this.state.fetching ) {
            const { user} = this.props;
            getUserById(user._id)
                .then(result => {
                    this.setState({
                        fetching: false, visible: true,
                        userProfile: result.data.user,
                        topStories: result.data.topStories,
                    });
                }).catch(error => {
                this.setState({fetching: false, error})
            })
        }
    };

    renderTopStories = () => {
        const { topStories } = this.state;
        if(topStories.length > 0){
            return (
                <div className="user-top-stories">
                    <small className="text-upper text-bold">top stories:</small>
                    <ol className="topic-stories">
                        {topStories.map(story => <li key={story._id}>
                            <Link to={`/topics/${story._topic.name}/story/${story.slug}`}>{story.title}</Link></li>)}
                    </ol>
                </div>
            )
        }
    };

    render(){
        const { user } = this.props;
        const { visible, userProfile, topStories } = this.state;
        const followingCount = userProfile._followers ? userProfile._followers.length:0;
        const userDesc = userProfile.bio?
            <span>{userProfile.bio}</span>:<span>Member since { timeSince(new Date(userProfile.createdAt))}</span>

        const contentPopover = (
            <div className="-content">
                <div className="clearfix">
                    <Link to={`/profile/${userProfile._id}`} className="pull-right">
                        <UserAvatar type="circle"
                                    width="80px"
                                    height="80px"
                                    prefix="/media/"
                                    imgSrc={userProfile.picture}/>
                    </Link>
                    <div className="pull-left user-data" style={{marginRight: "15px"}}>
                        <h2 className="text-capitalize"><Link to={'/'}>{userProfile.displayName}</Link></h2>
                        {userDesc}
                    </div>
                </div>
                {this.renderTopStories()}
                <div className="clearfix footer">
                    <span className="pull-left">Followed by <strong>{formatNumber(followingCount)}</strong> people</span>
                    <FollowButton className="pull-right" user={user}/>
                </div>
            </div>
        );
        return (
            <Popover visible={visible}
                     overlayClassName="user-content-popover"
                     onVisibleChange={this.handleVisibleChange}
                     content={contentPopover} trigger="hover">
                <span onMouseEnter={this.fetchUserData}>
                    {this.props.children}
                </span>
            </Popover>
        )
    }
}

export default UserContentPopover;