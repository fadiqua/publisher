// npm packages
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { Layout, Menu } from 'antd';
// import pathToRegexp from 'path-to-regexp';
// project files
import { siderItems, siderItemsIcons } from '../../../utils/constants';
import { slugify } from '../../../utils/functions';
import { logout, fetchTopics, siderSelected } from '../../../actions/actionTypes';
import { clearToken } from '../../../config/axios.config';
import Logo from '../Logo';
import SiderLoading from './SiderLoading';
import './index.scss';

const { Sider } = Layout;

class SiderMenu extends Component {
    constructor() {
        super();
        this.handelSiderClicked = this.handelSiderClicked.bind(this)
    }

    /**
     * render items inside ItemGroup
     * @param items: array
     */
    handelSiderClicked(e){
        this.props.selectedItem(e.key);
        const {  screenSize:{collapsed, mobile } } = this.props;
        if(collapsed && mobile) {

        }

    }

    /**
     * render items inside ItemGroup
     * @param items: array
     */
    itemsView(items) {
        return items.map(item => (
            <Menu.Item key={item.slug}>
            <Link to={item.url || `/topics/${item.slug}/?page=1&sortby=date`}>
                <div>
                    <span>{siderItemsIcons[item.icon]}</span>
                    <span className="nav-text text-capitalize">{item.name}</span>
                </div>
            </Link>
        </Menu.Item>))
    }

    /**
     * render ItemGroup
     * @param label: string
     * @param key: string
     * @param items: array
     * @returns {XML} - ItemGroup
     */
    groupView(label, items) {
        return (<Menu.ItemGroup className="text-capitalize" key={label} title={label}>
            {this.itemsView(items)}
        </Menu.ItemGroup>)

    }

    renderMenuItems() {
        const { topics } = this.props;
        if(topics.items.length > 0) {
            siderItems[1].items = topics.items;
            return siderItems.map(obj => this.groupView(obj.label, obj.items))
        }
    }

    componentWillMount(){
        // pathToRegexp(item.router).exec(location.pathname)
        // this.props.selectedItem(this.props.router.location.pathname)
        this.props.fetchTopics();
    }
    onLogout = () => {
        clearToken();
        this.props.logout();
        setTimeout(() => window.location = `/`, 150)
    };
    render() {
        const { auth, screenSize:{collapsed, desktop, mobile, siderSelected },topics } = this.props;
        return (
        <Sider className={classNames('sider-menu',
            {'desktop-collapsed': desktop&&collapsed},
            {'open-sider-mobile': collapsed && mobile},
            {'close-sider-mobile': !collapsed && mobile})}
               width={ collapsed&&desktop ? 70:250 }>
            <Scrollbars style={{ height: "100vh"}} autoHide autoHideDuration={200} >
                <Logo />
                {!topics.loading ?
                    <Menu
                        theme="dark"  mode="inline"
                        onClick={this.handelSiderClicked}
                        selectedKeys={[siderSelected]} >
                        {this.renderMenuItems()}
                        { auth.isAuthenticated &&
                        <Menu.Item key="logout">
                            <div onClick={ this.onLogout }>
                                <i className="material-icons anticon side-icon">power_settings_new</i>
                            <span className="nav-text">Logout</span>
                            </div>
                        </Menu.Item>
                    }
                </Menu>: <SiderLoading />}
            </Scrollbars>
        </Sider>
        )
    }

}

const mapState = ({auth, screenSize, topics, router}) => ({
    auth, screenSize, topics, router
});

const mapDispatch = dispatch => bindActionCreators({
    selectedItem: siderSelected,
    logout,
    fetchTopics
}, dispatch);

export default connect(mapState, mapDispatch)(SiderMenu);