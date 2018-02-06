import React from 'react';

const ShowComments = (props) => {
  const { loading, onClick } = props;
  return (
        <div className="show-comments">
            <button
                disabled={loading}
                className="icon-btn"
                onClick={() => onClick()}>
                Show all responses
            </button>
        </div>
  );
};

export default ShowComments;
