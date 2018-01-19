import React, { Component } from 'react';
import { connect } from 'react-redux';

import { likeStory, likeComment } from '../../../actions/actionTypes';
import { like } from '../../../routes';
import './index.scss';

class LikeButton extends Component {
    state = {
        loading: false
    };
    doLike = async () => {
        const { type, id, parent} = this.props;
        try {
            this.setState({ loading: true });
            let res = await like({ id,type, parent: type !== 'Story' ? parent: null });
            let { user, isLiked } = res.data;
            if(type !== 'Story'){
                this.props.likeComment({user, isLiked, id});
                return;
            }
            this.props.likeStory({user, isLiked});
            this.setState({ loading: false });
            return;

        }
        catch (e) {
            this.setState({ loading: true });
        }
    };
    renderIcon = () => {
        const { isLiked } = this.props;
        const { loading } = this.state;
        if(loading){

            if(!isLiked) {
                return <svg width={24} height={24} viewBox="0 0 24 24">
                    <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                </svg>;
            }
            return <svg  width={24} height={24} viewBox="0 0 24 24" className={`${isLiked? 'active':''}`}>
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
        } else {
            if(!isLiked) {
                return <svg width={24} height={24} viewBox="0 0 24 24">
                    <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
                </svg>;
            }
            return <svg  width={24} height={24} viewBox="0 0 24 24" className={`${isLiked? 'active':''}`}>
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
        }


    }
    render() {
        const { count } = this.props;
        return (
        <div className="like-btn with-no">
            <button onClick={this.doLike} className="icon-btn">{this.renderIcon()}</button>
            <span className="c-number">{count}</span>
        </div>
        )
    }
}

export default connect(null, {likeStory, likeComment})(LikeButton);