// npm packages
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// project files
import SVGIcon from '../SVGIcon';
import { likeStory, likeResponse } from '../../../actions/actionTypes';
import { like } from '../../../routes';
import './index.scss';

class LikeButton extends Component {

    doLike = async () => {
        const { type, id, parent} = this.props;
        if(type === 'Story') {
            this.props.likeStory({ id,type, parent: type !== 'Story' ? parent: null });
            return;
        } else {
            this.props.likeResponse({ id,type, parent: type !== 'Story' ? parent: null });
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

const mapDispatch = dispatch => bindActionCreators({
    likeStory,
    likeResponse
}, dispatch);

export default connect(null, mapDispatch)(LikeButton);