import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';

class ResponseButton extends Component {

    render() {
        const { count } = this.props;
        return (
            <div className="response-btn with-no">
                <button className="icon-btn">
                    <svg width={24} height={24} viewBox="0 0 24 24">
                        <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9M10,16V19.08L13.08,16H20V4H4V16H10M6,7H18V9H6V7M6,11H15V13H6V11Z" />
                    </svg>
                </button>
                <span className="c-number">{count}</span>
            </div>
        )
    }
}

export default ResponseButton;