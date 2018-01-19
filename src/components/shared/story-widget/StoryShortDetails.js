import React, { Component } from 'react';
// import { Parser } from 'html-to-react'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { isRtl } from '../../../utils/functions';

// const htmlToReact = new Parser();

class StoryShortDetails extends Component {

    render() {
        const { content, title } = this.props;
        return (
            <div>
                <div className={classNames("title",{
                    'rtl': isRtl(title || '')
                })}>
                    <h1>{title}</h1>
                </div>
                <div className={classNames("desc",{
                    'rtl': isRtl(title || '')
                })}>
                    {/*{htmlToReact.parse(content)}*/}
                </div>
            </div>
        )
    }
}

export default StoryShortDetails;