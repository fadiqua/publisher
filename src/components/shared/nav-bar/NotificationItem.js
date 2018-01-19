import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserAvatar from '../UserAvatar';
import timeSince from '../../../utils/timeSince';
import './NotificationItem.scss';

const icons = {
    'comment': <svg width={16} height={16} viewBox="0 0 24 24">
        <path fill="#52575a"  d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
    </svg>,
    'like': <svg width={16} height={16} viewBox="0 0 24 24">
        <path fill="#52575a" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
    </svg>,
    'follow': <svg width={16} height={16} viewBox="0 0 24 24">
        <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
};

class NotificationItem extends Component {

    renderNotificationContent = () => {
        const { item } = this.props;
        if(item.type === 'comment'){
            return <p><strong className="text-capitalize">{item._from.displayName}</strong> commented on <strong className="story-title">{item._parentTarget.title}</strong></p>
        } else if(item.type === 'like') {
            return <p><strong className="text-capitalize">{item._from.displayName}</strong> likes your story <strong className="story-title">{item._parentTarget.title}</strong></p>

        } else if(item.type === "follow") {
            return <p><strong className="text-capitalize">{item._from.displayName}</strong> started following you.</p>
        }
    };

    renderIcons = () => {
        const { item } = this.props;
        return icons[item.type]
    }
    render(){
        const { item } = this.props;
        return (
            <li className={`notification-item clearfix ${ !item.isClicked ? 'unread':''}`} >
                <Link to={`/notifications/${item._id}`}
                      onClick={() => this.props.onNotificationClick(item._id)} >
                    <UserAvatar type="circle"
                                width="35px"
                                height="35px"
                                className="pull-left"
                                prefix="/media/thumbs/"
                                imgSrc={item._from.thumbnail} />
                    <div className="pull-left -content">
                        {this.renderNotificationContent()}
                        <div className="with-no">
                            { this.renderIcons() }
                            <span>{timeSince(new Date(item.createdAt))}</span>
                        </div>
                    </div>

                </Link>
            </li>
        )
    }
}

export default NotificationItem;