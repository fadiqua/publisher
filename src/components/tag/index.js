import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col } from 'antd';

import Story from '../shared/story-widget';
import PaginateLoading from '../shared/paginate-loading';
import TopicLoading from '../topic/TopicLoading';
import { getStoriesByTag } from '../../routes';

class Tag extends Component {

    state = {
        loading: false,
        data: {
            docs: [],
            page: 1,
            pages: 0
        }
    };

    componentDidMount(){
        window.scrollTo(0,0);
        this.fetchStories()
    }

    renderStories = () => {
        const { data, loading } = this.state;
        if(loading && data.pages == 0) return <TopicLoading/>;
        return data.docs.map(story => <Col  key={story._id}
                                            lg={8} md={8}
                                            sm={12} xs={24}>
            <Story item={story} main={false}/>
        </Col>)
    };

    fetchStories = async (page) => {
        const { match } = this.props;
        const tag = match.params.tag.split('-').join(' ');
        this.setState({
            loading: true
        });
        const result = await getStoriesByTag(tag, page);
        this.setState({
            loading: false,
            data: {
                ...result.data.stories,
                docs: [...this.state.data.docs, ...result.data.stories.docs]
            }
        })
    };

    loadMoreStories = () => {
        const { loading, data: { page, pages } } = this.state
        if(loading) return;
        if(page != pages && !loading) {
            this.fetchStories(parseInt(page) + 1)
        }

    };

    render() {
        const { page, pages } = this.state.data;
        const { match } = this.props;
        const tag = match.params.tag.split('-').join(' ');
        return (
            <div  className="stories base-sec">
                <h1 className="text-capitalize topic-title">Tag# {tag}</h1>
                <InfiniteScroll
                    style={{ overflowY: 'auto',overflowX: 'hidden', paddingTop:'10px'}}
                    next={this.loadMoreStories}
                    hasMore={page != pages}
                    loader={<PaginateLoading loading={this.state.loading && page > 1} canPaginate={true} />}>
                    <Row type='flex' gutter={20}>
                        { this.renderStories() }
                    </Row>
                </InfiniteScroll>
            </div>

        )
    }
}

export default Tag;