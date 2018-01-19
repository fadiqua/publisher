import React, { Component} from 'react';
import { defaultUserImg } from '../../utils/constants'


class UserAvatar extends Component{
    render(){
        const { type, width, height, imgSrc, prefix, className } = this.props;
        const src = imgSrc ? `${prefix}${imgSrc}`: defaultUserImg;
        return (
            <div className={`user-avatar img-${type} ${className || ''}`} style={{ width, height }}>
                <img className={`img-responsive`} src={src} alt="thumbnail" />
            </div>
        )
    }
}
export default UserAvatar;