// npm packages
import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Row, Col} from 'antd';
import DocumentTitle from 'react-document-title';
// project files
import Story from '../shared/story-widget';
import PaginateLoading from '../shared/paginate-loading';
import TopicLoading from '../topic/TopicLoading';
import {getPopularStories} from '../../routes';
import './index.scss';

class Popular extends Component {
  state = {
    loading: true,
    data: {
      docs: [],
      page: 1,
      pages: 0,
    },
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchStories(1);
  }

  /**
   * paginate and fetch more stories
   */
  loadMoreStories = () => {
    const {data: {page, pages}, loading} = this.state;
    if (loading) return;
    const p = parseInt(page, 10);
    if (p !== parseInt(pages, 10) && !loading) {
      this.fetchStories(p + 1);
    }
  };

  /**
   * @param page: page for infinite scroll pagination
   */
  fetchStories = async (page) => {
    this.setState({
      loading: true,
    });
    const result = await getPopularStories(page);
    this.setState({
      loading: false,
      data: {
        ...result.data.stories,
        docs: [...this.state.data.docs, ...result.data.stories.docs],
      },
    });
  };

  /**
   * render fetched popular stories
   * @returns {Array}: Array of JSX contains stories
   */
  renderStories = () => {
    const {data: {pages, docs}, loading} = this.state;
    if (loading && parseInt(pages, 10) === 0) return <TopicLoading />;
    return docs.map(story => <Col key={story._id}
                                  lg={8} md={8}
                                  sm={12} xs={24}>
      <Story item={story} main={false}/></Col>);
  };

  render() {
    const {page, pages, loading} = this.state.data;

    return (
      <DocumentTitle title="Publisher - Popular">
        <div className="base-sec">
          <InfiniteScroll
            style={{overflowY: 'auto', overflowX: 'hidden', paddingTop: '10px'}}
            next={this.loadMoreStories}
            hasMore={parseInt(page, 10) !== parseInt(pages, 10)}
            loader={<PaginateLoading loading={loading && page > 1} canPaginate/>}>
            <Row type="flex" className="stories" gutter={20}>
              { this.renderStories() }
            </Row>
          </InfiniteScroll>
        </div>
      </DocumentTitle>
    );
  }
}

export default Popular;
