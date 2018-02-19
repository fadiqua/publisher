import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import StoryCover from './StoryCover';
import PostShortDetails from './StoryShortDetails';
import StoryWriter from './StoryWriter';
import StoryCounts from './StoryCounts';
import './index.scss';
// import { API_URL } from '../../../utils/constants';

const Story = (props) => {
  const { item, first } = props;
  item._topic = item._topic ? item._topic : {};
  return (
    <div className={`post post-${first ? 'first' : ''}`}>
      <Row type="flex" gutter={20}>
        <Col lg={{ span: first ? 15 : 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
          <Link to={`/topics/${item._topic.slug}/story/${item.slug}`}>
            <StoryCover link="/topic/popular/article-slug"
                        imgSrc={`/media/${item.cover}`}/>
            <StoryCounts likesCount={item.likesCount} commentsCount={item.commentsCount}/>
          </Link>
        </Col>
        <Col lg={{span: first ? 9 : 24}} md={{span: 24}} className="-details">
          <Link to={`/topics/${item._topic.slug}/story/${item.slug}`}
                className="post-short-details">
            <PostShortDetails
              link={`/topics/${item._topic.slug}/story/${item.slug}`}
              title={item.title}
              description={item.description}
            />
          </Link>
          <StoryWriter
            user={item._creator}
            readTime={item.readTime}
            createdAt={item.createdAt}
            width="50px"
            height="50px"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Story;
