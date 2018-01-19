import React, { Component } from 'react';
import { connect } from 'react-redux';

import BrowsableTaps from './BrowsableTaps';
import UserHeader from './UserHeader';
import { renderRoutes } from '../../routes/routes'
import { fetchProfile } from '../../actions/actionTypes'
import './index.scss';

class Profile extends Component {

    componentDidMount(){
        const { params } = this.props.match;
        this.props.fetchProfile(params.id);
        window.scroll(0,0)
    }

    // When the profile url change
    componentWillReceiveProps(nextProps) {
        const { params } = nextProps.match;
        if(this.props.match.params.id !== params.id){
            this.props.fetchProfile(params.id);
        }
    }

    render(){
        const { match: { params }, location } = this.props;
        const selectedTap = location.pathname.split('/')[3] || 'stories';
        return (
            <div className="user-profile base-sec">
                <UserHeader id={params.id}/>
                <div className="profile-content">
                    <BrowsableTaps user={params.id} selectedTap={selectedTap}/>
                </div>
                {renderRoutes(this.props.routes)}
            </div>
        )
    }
}
export default connect(null, { fetchProfile })(Profile);