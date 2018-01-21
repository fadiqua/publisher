// npm packages
import React from 'react';
import { Link } from 'react-router-dom';
// project files
import UserContentPopover from './UserContentPopover';
import UserAvatar from '../UserAvatar';
import FollowButton from '../FollowButton';
import timeSince from '../../../utils/timeSince';
import './StoryWriter.scss';

const StoryWriter = ({ width,height, user, readTime, createdAt, withFollow }) => (
    <div className="post-writer clearfix">
        <UserContentPopover user={user}>
            <Link to={`/profile/${user.username}`}>
                <UserAvatar prefix="/media/thumbs/" type="circle"
                            width={width}
                            height={height}
                            imgSrc={user.thumbnail}/>
            </Link>
        </UserContentPopover>
        <div className="writer-name">
            <div className="inline-block" style={{marginRight: "15px"}}>
                { user && <UserContentPopover user={user}>
                    <Link to={`/profile/${user.username}`}>
                        <strong className="text-capitalize">{ user.displayName }</strong>
                    </Link>
                </UserContentPopover>}
                { withFollow && <FollowButton user={user}/> }
                <div className="post-date">
                    {/*<span>{moment(createdAt, 'YYYY-MM-DD').fromNow()|| null} </span>*/}
                    <span>{timeSince(new Date(createdAt), false)} </span>
                    <ReadTime readTime={readTime} />
                </div>
            </div>

        </div>

    </div>
);

export function ReadTime  ({readTime}) {
    if(readTime <=1){
        return <span><strong className="dot">.</strong>1 min read</span>
    } else {
        return <span><strong className="dot">.</strong>{readTime} mins read</span>
    }
}

export default StoryWriter;