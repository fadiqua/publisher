import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotFound from '../NotFound';
import UserHeaderLoading from './UserHeaderLoading';
import UserInfo from './UserInfo';
import UserAvatar from '../shared/UserAvatar';
import FollowButton from '../shared/FollowButton';
import UsersModal from '../shared/users-modal';
import EditProfileModal from './EditProfileModal';
import PluralWord from '../shared/PluralWord';
import { updateProfile, followProfile } from '../../actions/actionTypes';
import { getFollowers, getFollowings } from '../../routes';
import blurred from './blurred.jpg';
import { formatNumber } from '../../utils/functions';

class UserHeader extends Component {
    constructor(props){
        super(props);
        this.openUpdateModal = this.openUpdateModal.bind(this);
        this.state = { editMode: false,  isProfileOwner: false }
    }

    openUpdateModal = (e) => {
        e.preventDefault();
        this.setState({editMode: true})
    };

    closeUpdateModal = () => {
        this.setState({editMode: false})
    };

    // submit changes
    onProfileUpdate = (data) => {
        this.props.updateProfile(data);
        this.closeUpdateModal()
    };

    // after following user from users modal
    onFollowCallback = (id, type) => {
        const { currentUser} = this.props;
        let isOwner = currentUser._id === this.props.id;
        if(!isOwner && type==='_following'){
            return;
        }
        this.props.followProfile({id, type});
    };

    renderContent = () => {
        const { profile } = this.props;
        if(profile.loading === 'fetchProfile'){
            return <UserHeaderLoading/>
        }
        return (
            <div className="text-center">
                <UserAvatar width="100px"
                            height="100px" type="circle"
                            prefix="/media/"
                            imgSrc={profile.user.picture}/>
                <UserInfo user={profile.user} />
                <div className="follow-info">
                    <UsersModal title="Following users"
                                followCallback={(id) => this.onFollowCallback(id,'_following')}
                                data={{id: profile.user._id}} api={getFollowings}>
                        <button className="icon-btn">
                            <strong title={profile.user._following.length}>
                                {formatNumber(profile.user._following.length)}
                            </strong>
                            <PluralWord showCount={false} count={profile.user._following.length} word="Following"/>
                        </button>
                    </UsersModal>
                    <UsersModal title="Follower users"
                                followCallback={(id) => this.onFollowCallback(id,'_following')}
                                data={{id: profile.user._id}} api={getFollowers}>
                        <button className="icon-btn">
                            <strong title={profile.user._followers.length}>
                                {formatNumber(profile.user._followers.length)}
                            </strong>
                            <PluralWord showCount={false} count={profile.user._followers.length} word="Follower"/>
                        </button>
                    </UsersModal>
                </div>
                <div>
                    <FollowButton user={profile.user}
                                  followCallback={id => this.props.followProfile({id, type:'_followers'})}/>
                </div>
            </div>
        )
    };
    render(){
        const { currentUser, profile, id } = this.props;
        const { editMode } = this.state;
        let isOwner = currentUser._id === id;
        if(profile.error){ return <NotFound/> }
        return (
            <div className="user-header"
                 style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 100%,rgba(0,0,0,0.6) 100%), url(${blurred})`}}>
                {isOwner && <div className="icon-btn edit-profile" >
                    <a onClick={this.openUpdateModal}>Edit</a>
                </div>}
                { this.renderContent() }
                {isOwner && editMode &&
                <EditProfileModal visible={this.state.editMode}
                                  user={currentUser}
                                  onUpdate={this.onProfileUpdate}
                                  closeModal={this.closeUpdateModal} />
                }
            </div>
        )
    }
}
const mapStateToProps = ({auth: { currentUser }, profile }) => ({ currentUser, profile });

export default connect(mapStateToProps, { updateProfile, followProfile })(UserHeader);