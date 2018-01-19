import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, message } from 'antd';
import WysiwygEditor from './WysiwygEditor';
import TagBox from './TagBox';
import SelectCategory from './SelectCategory';
import UploadCover from './UploadCover';
import { createStory } from '../../actions/actionTypes';
import { sanitize, slugify } from '../../utils/functions';
import './index.scss';

class WriteStory extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: null,
            editorState: null,
            editorContent: null,
            selectedTopic: null,
            tags: [],
            uploadedCover: null
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onUploadCoverChange = this.onUploadCoverChange.bind(this);
        this.onRemoveUploadCover = this.onRemoveUploadCover.bind(this);
    }
    componentWillReceiveProps(nexProps){
        const { story } = nexProps;
        if(story.createdStory !== undefined){
            this.props.history.push(`/topics/${slugify(story.createdStory._topic.name)}/story/${story.createdStory.slug}`)
        }
    }
    onSelectChange = (selectedTopic) => {
        this.setState({ selectedTopic })
    };

    onTagsChange = (tags) => {
        this.setState({ tags });
    };

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState({ title })

    };
    onEditorChange = (editorState) => {
        // this.setState({editorState})
        this.setState({editorContent: editorState})
        // console.log('onEditorChange')
    };
    onUploadCoverChange(uploadedCover){
        this.setState({uploadedCover})
    }
    onRemoveUploadCover(file){
        if(file.response.file.filename  === this.state.uploadedCover){
            this.setState({uploadedCover: null})
        }
    }

    submitStory(){
        const errors = {};
        const { title, editorContent, tags, uploadedCover, selectedTopic } = this.state;
        if(!title || !editorContent || tags.length === 0 || !uploadedCover || !selectedTopic){
            message.error('All fields are required.')
            console.log( title, editorContent, tags, uploadedCover, selectedTopic)
        } else {
            console.log(sanitize(editorContent))
            this.props.createStory({
                title: sanitize(title), content:sanitize(editorContent), tags, cover: uploadedCover,
                topicId: selectedTopic, userId: this.props.currentUser._id
            })
        }

    }
    render(){
        let isRtl='';
        if(this.state.title){
            isRtl = this.state.title.match(/[\u0600-\u06FF]+/g) ? 'rtl':'';
        }

        return (
            <div>
                <div>
                    <Input style={{fontSize: '1.3em'}}
                           dir="auto"
                           placeholder="Story title"
                           type="text" size={`large`} onChange={ this.onTitleChange } />
                </div>
                <br/>
                <div>
                    <WysiwygEditor onChange={ this.onEditorChange } editorValue={this.state.editorContent}/>
                </div>
                <br/>
                <br/>
                <TagBox tags={this.state.tags} onChange={ this.onTagsChange } limit={3}/>
                <br/>
                <UploadCover uploadChange={this.onUploadCoverChange}
                             uploadedCover={this.state.uploadedCover} removeUpload={this.onRemoveUploadCover}/>
                <br/>
                <div className="clearfix write-article-footer">
                    <SelectCategory className="pull-left"
                                    onChange={this.onSelectChange } />
                    <div className="pull-right ctrl-btns">
                        <Button size={`large`} type={`default`}>
                            Draft
                        </Button>
                        <Button loading={this.props.story.loading} size={`large`} type={`primary`} onClick={() => this.submitStory() }>
                            Publish
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({auth:{currentUser}, topics:{items}, story}) => ({
    currentUser,
    items,
    story
});

export default connect(mapStateToProps, { createStory })(WriteStory);