import React, { PureComponent } from 'react';

class StoryShortDetails extends PureComponent {

    render() {
        const { description, title } = this.props;
        return (
            <div>
                <div className={'title'}>
                    <h1 dir="auto">{title}</h1>
                </div>
                <div dir="auto" className="s-description">{description}</div>
            </div>
        )
    }
}

export default StoryShortDetails;