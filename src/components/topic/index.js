import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';

import TopicLoading from './TopicLoading';
import TopicTitle from '../shared/topic-title';
import ErrorWidget from '../shared/error';
import SortBy from './SortBy';
import Story from '../shared/story-widget';
import Empty from '../shared/empty';
import { fetchCurrentTopic } from '../../actions/actionTypes';
import { getUrlQuery } from '../../utils/functions';
import './index.scss';

class Topic extends Component {

    updateLink = (topic, page, sort='date') => {
        return `/topics/${topic}/?page=${page}&sortby=${sort}`;
    };

    // on click pagination event
    onPaginationChange = (page) => {
        const {  match:{params}, location } = this.props;
        // this.props.fetchStories({topic: params.topic, query: location.search, page: page - 1 });
        let query = getUrlQuery(location.search);
        this.props.history.push(this.updateLink( params.topic, page, query.sortby));
        window.scrollTo(0, 0)
    };

    // on change sort event
    handleSortChange = (value) => {
        const {  match:{params}, location } = this.props;
        const query = getUrlQuery(location.search);
        this.props.fetchStories({topic: params.topic, query: `?page=${query.page}&sortby=${value}`});
        this.props.history.push(this.updateLink(params.topic,query.page || 1,value ));
    };

    // render the topic title such as society
    renderTitle = () => {
        const { match:{params} } = this.props;
        return (
            <TopicTitle link={`/topics/${params.topic}/?page=1&sortby=date`} title={params.topic}/>
        )
    };
    renderSortBy = () => {
        const { location } = this.props;
        // if the component rendered in home page, hide sort by component
        const query = getUrlQuery(location.search);
        return (
            <SortBy handleSortChange={this.handleSortChange}
                    selectedValue={`${query.sortby|| 'date'}`}/>
        )
    };
    renderStoriesForTopic = () => {
        const { currentTopic } = this.props;
        // if the component rendered in home page, render 4 items
        return currentTopic.docs.map(item =>
            <Col key={item._id} lg={8} md={12} sm={24} xs={24}>
                <Story item={item} first={false}/>
            </Col>)
    };

    renderPagination = () => {
        const { currentTopic, location } = this.props;
        // if the component rendered in home page, hide Pagination component
        if( currentTopic.pages > 1){
            const query = getUrlQuery(location.search);
            return (
                <div className="topic-pagination">
                    <Pagination showQuickJumper pageSize={9}
                                current={parseInt(query.page) || 1}
                                total={currentTopic.total}
                                onChange={this.onPaginationChange } />
                </div>
            )
        }
    };

    componentDidMount(){
        window.scrollTo(0, 0);
        const { match:{params}, location } = this.props;
        this.props.fetchStories({topic:params.topic, query: location.search});
    }

    componentWillReceiveProps(nextProps) {
        // when the user click on other topic inside the sider
        const { topic } = nextProps.match.params;
        if(topic !== this.props.match.params.topic){
            this.props.fetchStories({topic,query:nextProps.location.search });
            window.scrollTo(0, 0);
            return;
        }
        if(this.props.location.search !== nextProps.location.search){
            this.props.fetchStories({topic,query:nextProps.location.search });
        }
    }

    render() {
        const { currentTopic } = this.props;
        if(currentTopic.loading){
            return <TopicLoading/>
        }
        else if(currentTopic.error) {
            return <ErrorWidget message="Sorry! can't preview this content."/>
        } else if(!currentTopic.loading && currentTopic.docs.length === 0){
            return <Empty message="No Stories to preview!"/>
        }
        return (
            <div className="topic base-sec">
                {/*<ScrollToTopOnMount />*/}
                <div className="clearfix">
                    {this.renderTitle()}
                    {this.renderSortBy()}
                </div>
                <div className="topic-second-row">
                    <Row type='flex' gutter={20}>
                        {this.renderStoriesForTopic()}
                    </Row>
                </div>
                {this.renderPagination()}
            </div>
        )
    }
}

const mapStateToProps = ({ currentTopic }) => ({ currentTopic });

export default connect(mapStateToProps, { fetchStories: fetchCurrentTopic })(Topic);