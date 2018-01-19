import React, { Component } from 'react';

import '../../assets/scss/ShareButtons.scss';
import fb from '../../assets/svg/fb.svg';
import tw from '../../assets/svg/tw.svg';


class ShareButtons extends Component{

    render(){
        return (
            <div className="share-btns">
                <p className="share-no">
                    25
                </p>
                <div className="heart-btn">
                    <button className="icon-btn">
                        <i className="material-icons">favorite_border</i>
                    </button>
                </div>
                <div className="fb-btn">
                    <button className="icon-btn">
                        <img src={fb} alt="fb"/>
                    </button>
                </div>
                <div className="tw-btn">
                    <button className="icon-btn">
                        <img src={tw} alt="twitter share"/>
                    </button>
                </div>

            </div>
        )
    }
}

export default ShareButtons;