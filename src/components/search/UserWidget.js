import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../shared/UserAvatar';
import UserContentPopover from '../shared/story-widget/UserContentPopover';
import FollowButton from '../shared/FollowButton';
import timeSince from '../../utils/timeSince';
import './UserWidget.scss';

const UserWidget = ({ item, followCallback }) => (
    <div className="user-widget">
        <UserContentPopover user={item}>
            <Link to={`/profile/${item._id}`}>
                <UserAvatar prefix="/media/thumbs/" type="circle"
                            width="35px" height="35px"
                            imgSrc={item.thumbnail}/>
            </Link>
        </UserContentPopover>
        <div className="user-info">
            <h3 className="clearfix">
                <UserContentPopover user={item}>
                    <Link to={`/profile/${item._id}`}>
                        <span>{item.displayName}</span>
                    </Link>
                </UserContentPopover>
                <FollowButton user={item} className="pull-right" followCallback={ followCallback }/>
            </h3>
            <span className="-bio">{item.bio || `Member since ${timeSince(new Date(item.createdAt), false)}`}</span>
        </div>
    </div>
);

export default UserWidget;