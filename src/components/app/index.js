// npm packages
import { bindActionCreators } from 'redux';
import React, {PureComponent} from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
// project files
import SiderMenu from '../shared/sider-menu';
import Navbar from '../shared/nav-bar';
import { renderRoutes, routes } from '../../routes'

import {
    siderCollapsed,
    isMobile,
} from '../../actions/actionTypes';

class AppContent extends PureComponent {

    constructor(){
        super();
        let matchMedia;
        if (typeof window !== 'undefined') {
            matchMedia = window.matchMedia;
        }
        if (matchMedia ) {
            this.mql = matchMedia(`(max-width: 700px)`);
        }
    }

    componentWillMount() {
        if (this.mql) {
            this.mql.addListener(this.responsiveHandler);
            this.responsiveHandler(this.mql);
        }
    }

    componentWillUnmount() {
        if (this.mql) {
            this.mql.removeListener(this.responsiveHandler);
        }
        this.removeListener();
    }

    render() {
        const { loading, screenSize:{collapsed, mobile}} = this.props;
        if (loading) return <div />;
        return (
            <div className="body-content">
                <SiderMenu/>
                <div>
                    <Navbar />
                    <div className={ classNames(
                        'page-content',
                        { 'm-l-70': collapsed && !mobile},
                        {'m-l-0': mobile})}>
                        <div>
                            <Switch>
                                {renderRoutes(routes)}
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**
     *
     * @param mql: media query object
     */
    responsiveHandler = (mql) => {
        if(mql.matches) {
            this.props.isMobile(true);
            return;
        }
        this.props.isMobile(false);
    }
}

const mapState = ({ auth:{ loading, currentUser},screenSize }) => ({ loading, currentUser,screenSize });

const mapDispatch = dispatch => bindActionCreators({
    siderCollapsed ,
    isMobile,
}, dispatch);

export default withRouter(connect(mapState, mapDispatch)(AppContent))