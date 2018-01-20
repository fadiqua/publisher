// npm packages
import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
// project files
import { getMe } from '../../routes';
import {
    siderCollapsed,
    isMobile,
    autoLogin,
    loginFailed
} from '../../actions/actionTypes';

class AppContent extends Component {

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

    async componentDidMount() {
        try {
            const result = await getMe();
            this.props.autoLogin({ ...result.data.me, fromToken: true });
        } catch (err) {
            this.props.loginFailed()
        }
    }

    componentWillUnmount() {
        if (this.mql) {
            this.mql.removeListener(this.responsiveHandler);
        }
        this.removeListener();
    }

    render() {
        const { children,  screenSize:{collapsed, mobile}} = this.props;

        return (
            <div className={ classNames(
                'page-content',
                { 'm-l-70': collapsed && !mobile},
                {'m-l-0': mobile})}>
                <div>
                    { children }
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

const mapState = ({ auth:{ currentUser},screenSize }) => ({ currentUser,screenSize });

const mapDispatch = dispatch => bindActionCreators({
    siderCollapsed ,
    isMobile,
    autoLogin,
    loginFailed
}, dispatch);

export default connect(mapState, mapDispatch)(AppContent)