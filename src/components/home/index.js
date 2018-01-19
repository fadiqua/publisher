// npm packages
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
// project files
import TopicLoading from '../topic/TopicLoading';
import TopicSection from './TopicSection';
import { fetchHomePageData } from '../../routes';
import './index.scss';

export class Home extends Component {
    state = {
        loading: true,
        stories: [[]],
    };

    componentDidMount(){
        fetchHomePageData()
            .then(result => {
                this.setState({
                    loading: false,
                    stories: result.data.stories,
                })
        })
    }
    renderContent = () => {
        const { loading , stories} = this.state;
        if(loading){
            return <TopicLoading/>
        }
        return stories.map((topic,i) => <TopicSection title={topic[0]._topic.name} items={topic} key={`topic_${i}`}/>);
    }

    render(){
        return (
            <DocumentTitle title={'Publisher'}>
                <div className="home-page">
                    {this.renderContent()}
                </div>
            </DocumentTitle>
        )
    }
}

export default Home;