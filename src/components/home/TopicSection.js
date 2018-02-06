import React from 'react';
import { Row, Col } from 'antd';
import Story from '../shared/story-widget';
import TopicTitle from '../shared/topic-title';

const TopicSection = ({ items, title, slug }) => (
	<div className="topic-section base-sec">
		<TopicTitle link={`/topics/${slug}/?page=1&sortby=date`} title={title}/>
		<Row type="flex" gutter={16}>
			{ items.map((item, i) => <Col key={item._id} lg={i === 0 ? 24 : 8} md={12} sm={24} xs={24}>
				<Story item={item} first={ i === 0}/>
			</Col>)}
		</Row>
	</div>
);

export default TopicSection;
