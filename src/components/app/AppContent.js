import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { siderCollapsed, isDesktop, isMobile } from '../../actions/actionTypes';


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

    componentDidMount() {
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
        const { children,  screenSize:{collapsed, desktop, mobile}} = this.props;

        return (
            <div className={ classNames(
                'page-content',
                { 'm-l-70': collapsed && desktop},
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
            this.props.isMobile();
        } else {
            this.props.isDesktop();
        }
    }
}

const mapStateToProps = ({ auth:{ currentUser},screenSize }) => ({ currentUser,screenSize });
export default connect(mapStateToProps, {
    siderCollapsed ,
    isDesktop,
    isMobile,
})(AppContent)