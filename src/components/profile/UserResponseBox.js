import React from 'react';
import {Link} from 'react-router-dom';
import ResponseBox from '../shared/commentArea/ResponseBox';

const UserResponseBox = ({ item, owner }) => (
    <ResponseBox response={item} owner={owner}
                parent={item._story._id}>
        <Link className="-story" title={item._story.title}
              to={`/topics/${item._story._topic.name}/story/${item._story.slug}`}>
            <h3>{item._story.title}</h3>
            <p>{item._story._creator.displayName}</p>
            <div className="story-labels">
                        <span className="with-no">
                                <i className="material-icons">favorite</i>
                                <span className="c-number">{item._story.likesCount}</span>
                            </span>
                <span className="with-no">
                                <i className="material-icons">comment</i>
                                <span className="c-number">{item._story.commentsCount}</span>
                            </span>

            </div>
        </Link>
    </ResponseBox>
);

export default UserResponseBox;