// npm packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
// project files
import SVGIcon from '../SVGIcon';
import { likeStory, likeComment } from '../../../actions/actionTypes';
import { like } from '../../../routes';
import './index.scss';

class LikeButton extends Component {

    doLike = async () => {
        const { type, id, parent} = this.props;
        if(type === 'Story') {
            this.props.likeStory({ id,type, parent: type !== 'Story' ? parent: null });
            return;
        }
        try {
            // this.setState({ loading: true });
            // let res = await like({ id,type, parent: type !== 'Story' ? parent: null });
            // let { user, isLiked } = res.data;
            // if(type !== 'Story'){
            //     this.props.likeComment({user, isLiked, id});
            //     return;
            // }
            // this.props.likeStory({user, isLiked});
            // this.setState({ loading: false });
            // return;

        }
        catch (e) {
        }
    };
    _renderIcon() {
        const { isLiked } = this.props;
        return <SVGIcon name={isLiked ? 'heart-outline' : 'heart-fill'}
                        fill={isLiked ? "#FF5722": ''}
                        width={24} height={24}
                        className={`${isLiked? 'active':''}`} />;
    };

    render() {
        const { count } = this.props;
        return (
        <div className="like-btn with-no">
            <button onClick={this.doLike} className="icon-btn">{this._renderIcon()}</button>
            <span className="c-number">{count}</span>
        </div>
        )
    }
}

export default connect(null, {likeStory, likeComment})(LikeButton);