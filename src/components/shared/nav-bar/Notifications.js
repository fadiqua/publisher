import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Popover, Badge, Spin  } from 'antd';
import NotificationItem from './NotificationItem';
import PaginateLoading from '../paginate-loading';
import './Notifications.scss';
import { clearUnreadBadgeCountAPI } from '../../../routes/api';

import { clearUnreadBadgeNotifications, markNotificationAsRead, fetchNotifications } from '../../../actions/actionTypes';

class Notifications extends Component {
    state = {
        visible: false,
        initialNotificationsIsLoaded: false,
    };

    onVisibleChange = (visible) => {
        this.setState({
            visible
        });
    };
    hidePopover = () => {
        this.setState({
            visible: false
        })
    };

    onNotificationClick = (id) => {
        const { notifications } = this.props;
        if(!notifications.items.get(id).isClicked){
            this.props.markNotificationAsRead(id)
        }
        this.hidePopover()
    };

    markAllAsReadClick = () => {
        this.props.markNotificationAsRead(null)
    };
    spinnerBottomLodaingNotifications = () => {
        const { notifications: { fetching, page, pages } } = this.props;
        return (
            <li key="noti-item-loading">
                <PaginateLoading loading={fetching === 'paginate'}
                                 canPaginate={page != pages}/>
            </li>
        )
    };
    renderNotificationsItems = () => {
        const { notifications: { fetching, items} } = this.props;
        const loadingItem = this.spinnerBottomLodaingNotifications();
        let notificationsJSX = [];
        items.forEach((notification, key) => {
            const currentNotification = <NotificationItem onNotificationClick={this.onNotificationClick} key={key} item={notification}/>
            notificationsJSX.push(currentNotification)
        });
        if(fetching === 'initial') {
            return (
                <li className="text-center loading-notifications" >
                    <svg width="35" viewBox="0 0 24 24">
                        <path fill="#595959" d="M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z" />
                    </svg>
                </li>
            )
        }
        if(fetching === null && items.size === 0) {
            return (
                <li className="text-center " >
                    <br/>
                    <svg width="24" viewBox="0 0 24 24">
                        <path fill="#595959" d="M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z" />
                    </svg>
                    <p>You don't have notifications.</p>
                </li>
            )
        }
        notificationsJSX.push(loadingItem);
        return notificationsJSX;

    };
    onNotificationIconClick= () => {
        const { notifications: { unreadCount } } = this.props;
        const { initialNotificationsIsLoaded } = this.state;
        if(!initialNotificationsIsLoaded){
            this.props.fetchNotifications({type: 'initial', page: 1});
            this.setState({initialNotificationsIsLoaded: true})
        }
        if(unreadCount > 0) {
            clearUnreadBadgeCountAPI()
                .then((result) => {
                    this.props.clearUnreadBadgeNotifications();
                })
        }
    };

    onScrollFrame = (values) => {
        const { notifications: { page, pages, fetching } } = this.props;
        if(values.top === 1 && fetching !== 'paginate' && page != pages) {
            this.props.fetchNotifications({ type: 'paginate', page: parseInt(page) + 1 });
        }
    };
    render(){
        const { notifications } = this.props;
        const notificationTitle = (
            <div className="-title clearfix">
                <h3 className="pull-left">Notifications</h3>
                <p className="pull-right">
                    <button onClick={this.markAllAsReadClick} className="icon-btn text-capitalize">mark all as read</button>
                </p>
            </div>
        );
        const notificationsMenu = (
            <div className="notifications">
                {notificationTitle}
                <Scrollbars style={{ width: '350px'}} autoHeight
                            autoHeightMin={100}
                            autoHeightMax={400}
                            autoHide autoHideTimeout={500}
                            autoHideDuration={200}
                            onScrollFrame={(values) => setTimeout(()=>{this.onScrollFrame(values)}, 300)}
                            ref={ node => this.scrollbars = node }>
                    <ul className="notifications-list"  >
                        { this.renderNotificationsItems()}
                    </ul>
                </Scrollbars>
                <div className="text-center -footer">
                    <Link to="/notifications" onClick={this.hidePopover}><strong className="text-capitalize">see all</strong></Link>
                </div>
            </div>
        )
        return (
            <Popover visible={this.state.visible }
                     overlayClassName="notifications-popover"
                     placement="bottomLeft"
                     onVisibleChange={this.onVisibleChange}
                     content={notificationsMenu}
                     trigger="click">
                <Badge count={notifications.unreadCount} overflowCount={999}>
                    <span className="notifications-icon" onClick={this.onNotificationIconClick } title="Notifications">
                        <svg width="24" viewBox="0 0 24 24">
                            <path d="M16,17H7V10.5C7,8 9,6 11.5,6C14,6 16,8 16,10.5M18,16V10.5C18,7.43 15.86,4.86 13,4.18V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V4.18C7.13,4.86 5,7.43 5,10.5V16L3,18V19H20V18M11.5,22A2,2 0 0,0 13.5,20H9.5A2,2 0 0,0 11.5,22Z" />
                        </svg>
                    </span>
                </Badge>
            </Popover>
        )
    }
}

function mapStateToProps({ notifications}) {
    return {
        notifications
    }
}

export default connect(mapStateToProps, { clearUnreadBadgeNotifications,
    markNotificationAsRead,
    fetchNotifications,})(Notifications);