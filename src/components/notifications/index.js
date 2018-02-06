// npm packages
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
// project files
import NotificationItem from '../shared/nav-bar/NotificationItem';
import PaginateLoading from '../shared/paginate-loading';
import NotificationsLoading from './NotificationsLoading';

import {
  clearUnreadBadgeNotifications,
  markNotificationAsRead,
  fetchNotifications,
} from '../../actions/actionTypes';

import './index.scss';

class Notifications extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchNotifications({ type: 'initial', page: 1 });
  }

    /**
     *  Mark clicked notification as read
     * @param id: Notification id
     */
    onNotificationClick = (id) => {
      const { notifications } = this.props;
      if (!notifications.items.get(id).isClicked) {
        this.props.markNotificationAsRead(id);
      }
    };

    // Load more notifications
    loadMore = () => {
      const { notifications: { page } } = this.props;
      this.props.fetchNotifications({ type: 'paginate', page: parseInt(page) + 1 });
    };

    // Render notifications list
    _renderNotificationsItems = () => {
      const { notifications: { fetching, items } } = this.props;
      const notificationsJSX = [];
      items.forEach((notification, key) => {
        const currentNotification = <NotificationItem onNotificationClick={this.onNotificationClick}
                                                          key={key} item={notification}/>;
        notificationsJSX.push(currentNotification);
      });
      if (fetching === 'initial') {
        return (
                <li>
                    <NotificationsLoading />
                    <NotificationsLoading />
                    <NotificationsLoading />
                </li>
        );
      }
      if (fetching === null && items.size === 0) {
        return (
                <li className="text-center " >
                    <br/>
                    <i className="material-icons">notifications</i>
                    <p>You do not have notifications.</p>
                </li>
        );
      }
      // notificationsJSX.push(loadingItem);
      return notificationsJSX;
    };

    markAllAsReadClick = () => {
      this.props.markNotificationAsRead(null);
    };

    render() {
      const { notifications: { page, pages } } = this.props;
      const infiniteScrollStyle = {
        overflowY: 'auto', overflowX: 'hidden', paddingTop: '10px',
      };

      return (
            <div id="notifications" className="base-sec">
                <InfiniteScroll style={infiniteScrollStyle}
                                 next={this.loadMore}
                                 hasMore={page != pages}
                                 loader={<PaginateLoading loading canPaginate={page != pages}/>}>
                    <div className="-title clearfix">
                        <h3 className="pull-left">Notifications</h3>
                        <p className="pull-right">
                            <button onClick={this.markAllAsReadClick}
                                    className="icon-btn text-capitalize">
                                mark all as read
                            </button>
                        </p>
                    </div>
                    <ul className="notifications-list" >
                        { this._renderNotificationsItems() }
                    </ul>
                </InfiniteScroll>
            </div>
      );
    }
}

const mapState = ({ notifications }) => ({ notifications });

const mapDispatch = dispatch => bindActionCreators({
  clearUnreadBadgeNotifications,
  markNotificationAsRead,
  fetchNotifications,
}, dispatch);


export default connect(mapState, mapDispatch)(Notifications);
