import React, { Component } from 'react';

class ReadMoreButton extends Component{

    render(){
        const moreOrLess = !this.props.readMore ? 'More': 'Less';
        return (
            <div className="read-more-btn">
                <button className="icon-btn" onClick={() => this.props.onClick()}>Read {moreOrLess}...</button>
            </div>
        )
    }
}

export default ReadMoreButton;