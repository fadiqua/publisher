import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Tooltip, Icon, Button, Menu, Input } from 'antd';

import SigninModal from '../../signin/SigninModal';
import SignupModal from '../../signin/SignupModal';
import UserAvatar from '../UserAvatar';
import Notifications from './Notifications';
import SearchInput from './SearchInput';
import { toggleSignin, siderCollapsed } from '../../../actions/actionTypes';
import { login } from '../../../actions/actionTypes';
import './index.scss';

const { Header } = Layout;

class Navbar extends Component {
    constructor(){
        super();
        this.state = {
            expanedSearch: false
        };
        this.openSiginModal = this.openSiginModal.bind(this);
    }

    openSiginModal(){
       this.props.toggleSiginModal()
    }


    onSearch = (e) => {
        if(e.which === 13){
            console.log(e.target.value)
            e.target.value = ''
        }
    };

    renderSignIn(){
        const { auth } = this.props;
        if(!auth.isAuthenticated && !auth.loading){
            return (
                <Menu.Item key="1">
                    <Button size="large" type="primary"
                            onClick={this.props.toggleSiginModal}>Sign in/Sign up</Button>
                </Menu.Item>

            )
        } else if(auth.isAuthenticated) {
            return (
                <Menu.Item key="2" className="write-article-link">
                    <Tooltip placement="bottomLeft" title="Publish and share your story with others">
                        <NavLink to="/write-story">Write article...</NavLink>
                    </Tooltip>
                </Menu.Item>
            )
        }
    }
    renderSearchInput = () => {
        const { expanedSearch } = this.state;
        return (
        <Menu.Item key="3"  className="pull-right" >
            <SearchInput  size="large" refix={<Icon type="search" />}
                          placeholder="Search here..."/>
        </Menu.Item>)
    };
    renderNotifications = () => {
        const { auth, notifications } = this.props;
        if(auth.isAuthenticated){
            return (
                <Menu.Item key="4" className="pull-right notification-btn">
                    <Notifications />
                </Menu.Item>
            )
        }
    };
    renderUserThumbnail(){
        const { auth } = this.props;
        if(auth.isAuthenticated){
            return (
            <Menu.Item key="5" className="pull-right">
                <NavLink to={`/profile/${auth.currentUser._id}`} title="profile">
                    <UserAvatar prefix="/media/thumbs/" imgSrc={auth.currentUser.thumbnail} type="circle" width="35px" height="35px"/>
                </NavLink>
            </Menu.Item>
            )
        }
    }

    render() {
        const {
            auth,
            screenSize:{collapsed, desktop, mobile},
            toggleSiderMenu
        }  = this.props;
        return (
            <div className="header-box">
                <Header>
                    <div className={classNames(
                        "clearfix header-items",
                        {'m-l-70': collapsed && desktop},
                        {'m-l-250': !collapsed && desktop},
                        {'open-sider-mobile': collapsed && mobile},
                        {'close-sider-mobile': !collapsed && mobile}
                        )} >
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="0">
                                <span className="toggle-btn" onClick={ () => toggleSiderMenu() }>
                                    <svg width="24" viewBox="0 0 24 24">
                                        <path fill="#000000" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                                    </svg>
                                </span>
                            </Menu.Item>
                            {this.renderSignIn()}
                            {this.renderUserThumbnail()}
                            {this.renderNotifications()}
                            {this.renderSearchInput()}
                        </Menu>
                    </div>
                </Header>
                { !auth.isAuthenticated && <div> <SigninModal /> <SignupModal /> </div>}
            </div>
        )
    }

}

const mapStateToProps = ({ screenSize, auth, sign, notifications }) => ({ screenSize, auth, sign, notifications });

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleSiderMenu:siderCollapsed,
        toggleSiginModal: toggleSignin,
        login
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
