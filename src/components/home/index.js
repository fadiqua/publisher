import React, {Component} from 'react';

import TopicLoading from '../topic/TopicLoading';
import TopicSection from './TopicSection';
import { fetchHomePageData } from '../../routes/api';
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
            <div className="home-page">
                {this.renderContent()}
            </div>
        )
    }
}

export default Home;