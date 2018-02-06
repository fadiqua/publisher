// npm packages
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// project files
import UserAvatar from '../UserAvatar';
import SVGIcon from '../../shared/SVGIcon';
import timeSince from '../../../utils/timeSince';
import './NotificationItem.scss';

class NotificationItem extends PureComponent {
  constructor() {
    super();

    this.onNotificationClick = this._onNotificationClick.bind(this);
  }

  _onNotificationClick() {
    const { item, onNotificationClick } = this.props;
    onNotificationClick(item._id);
  }

  _renderNotificationContent() {
    const { item } = this.props;
    if (item.type === 'comment') {
      return <p><strong className="text-capitalize">{item._from.displayName}</strong> commented on <strong className="story-title">{item._parentTarget.title}</strong></p>;
    } else if (item.type === 'like') {
      return <p><strong className="text-capitalize">{item._from.displayName}</strong> likes your story <strong className="story-title">{item._parentTarget.title}</strong></p>;
    } else if (item.type === 'follow') {
      return <p><strong className="text-capitalize">{item._from.displayName}</strong> started following you.</p>;
    }
  }

  _renderIcons() {
    const { item } = this.props;
    return <SVGIcon name={item.type} />;
  }

  render() {
    const { item } = this.props;
    return (
            <li className={`notification-item clearfix ${!item.isClicked ? 'unread' : ''}`} >
                <Link to={`/notifications/${item._id}`}
                      onClick={this.onNotificationClick} >
                    <UserAvatar type="circle"
                                width="35px"
                                height="35px"
                                className="pull-left"
                                prefix="/media/thumbs/"
                                imgSrc={item._from.thumbnail} />
                    <div className="pull-left -content">
                        {this._renderNotificationContent()}
                        <div className="with-no">
                            { this._renderIcons() }
                            <span>{timeSince(new Date(item.createdAt))}</span>
                        </div>
                    </div>
                </Link>
            </li>
    );
  }
}

export default NotificationItem;
