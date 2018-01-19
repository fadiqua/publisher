import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Row, Col } from 'antd';
import Story from "../shared/story-widget";
import PaginateLoading from '../shared/paginate-loading';
import TopicLoading from '../topic/TopicLoading';

import { getPopularStories } from '../../routes';

class Popular extends Component {

    state = {
        loading: true,
        data: {
            docs: [],
            page: 1,
            pages: 0
        }
    };

    /**
     * @param page: page for infinite scroll pagination
     */
    fetchStories = async (page) => {
        this.setState({
            loading: true
        });
        const result = await getPopularStories(page);
        this.setState({
            loading: false,
            data: {
                ...result.data.stories,
                docs: [...this.state.data.docs, ...result.data.stories.docs]
            }
        })
    };

    /**
     * render fetched popular stories
     * @returns {Array}: Array of JSX contains stories
     */
    renderStories = () => {
        const { data: { pages, docs }, loading,  } = this.state;
        if(loading && pages == 0) return <TopicLoading />;
        return docs.map(story => <Col  key={story._id}
                                            lg={8} md={8}
                                            sm={12} xs={24}>
            <Story item={story} main={false}/></Col>)
    };

    /**
     * paginate and fetch more stories
     */
    loadMoreStories = () => {
        const { data: { page, pages }, loading } = this.state;
        if(loading) return;
        if(page != pages && !loading) {
            this.fetchStories(parseInt(page) + 1)
        }

    };

    componentDidMount(){
        window.scrollTo(0, 0);
        this.fetchStories(1);
    }

    render(){
        const { page, pages, loading } = this.state.data;

        return (
            <div  className="stories base-sec">
                <InfiniteScroll
                    style={{ overflowY: 'auto',overflowX: 'hidden', paddingTop:'10px'}}
                    next={this.loadMoreStories}
                    hasMore={page != pages}
                    loader={<PaginateLoading loading={loading && page > 1} canPaginate={true} />}>
                    <Row type='flex' gutter={20}>
                        { this.renderStories() }
                    </Row>
                </InfiniteScroll>
            </div>

        )
    }
}

export default Popular;