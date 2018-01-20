// npm packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Button, message } from 'antd';
// project files
import WysiwygEditor from './WysiwygEditor';
import TagBox from './TagBox';
import SelectCategory from './SelectCategory';
import UploadCover from './UploadCover';
// import { createStory } from '../../actions/actionTypes';
import { sanitize, slugify } from '../../utils/functions';
import { createStory } from '../../routes';
import './index.scss';

class WriteStory extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: null,
            description: null,
            // editorState: null,
            // editorContent: null,
            selectedTopic: null,
            tags: [],
            uploadedCover: null,
            loading: false
        };
        this.editorContent = null;
        this.charactersCount = 0;
        this.onSelectChange = this._onSelectChange.bind(this);
        this.onTagsChange = this._onTagsChange.bind(this);
        this.onValueChange = this._onValueChange.bind(this);
        this.onUploadCoverChange = this.onUploadCoverChange.bind(this);
        this.onRemoveUploadCover = this.onRemoveUploadCover.bind(this);
    }

    _onSelectChange (selectedTopic) {
        this.setState({ selectedTopic })
    };

    _onTagsChange (tags) {
        this.setState({ tags });
    };

    _onValueChange (e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })

    };

    onEditorChange = (editorState, count) => {
        this.editorContent = editorState;
        this.charactersCount = count;
        // this.setState({editorState})
        // this.setState({editorContent: editorState})
        // console.log('onEditorChange')
    };

    onUploadCoverChange(uploadedCover){
        this.setState({uploadedCover})
    }

    onRemoveUploadCover(file){
        // if(file.response.file.filename  === this.state.uploadedCover){
            this.setState({uploadedCover: null})
        // }
    }

    async submitStory () {
        const errors = {};
        const {
            title, description,
            tags, uploadedCover, selectedTopic
        } = this.state;

        if(!title || !this.editorContent || tags.length === 0 || !uploadedCover || !selectedTopic){
            message.error('All fields are required.')
        } else {
            const story = {
                title: sanitize(title),
                description: sanitize(description),
                content: sanitize(this.editorContent),
                tags, cover: uploadedCover,
                topicId: selectedTopic,
                userId: this.props.currentUser._id,
                count: this.charactersCount
            };
            try {
                this.toggleLoading()
                const { data } = await createStory(story);
                this.toggleLoading();
                this.props.history.push(`/topics/${slugify(data.story._topic.name)}/story/${data.story.slug}`)
            } catch (err) {
                message.error(err.response.data.message);
                this.toggleLoading();
            }
        }

    }
    toggleLoading() {
        this.setState(prev => ({ loading: !prev.loading }))
    }
    render(){
        const { loading } = this.state;
        return (
            <div>
                <div className="write-title">
                    <Input
                        dir="auto"
                        placeholder="Story title"
                        type="text"
                        size={`large`}
                        name="title"
                        onChange={this.onValueChange}
                        disabled={loading}
                    />
                </div>
                <br/>
                <div className="write-title">
                    <Input.TextArea
                        dir="auto"
                        placeholder="Story short description"
                        onChange={ this.onValueChange }
                        name="description"
                        autosize={{ minRows: 2, maxRows: 6}}
                        disabled={loading}
                    />
                </div>
                <br/>
                <WysiwygEditor
                    onChange={ this.onEditorChange }
                    editorValue={this.state.editorContent}
                    readOnly={loading}
                />
                <br/>
                <br/>
                <TagBox
                    tags={this.state.tags}
                    onChange={ this.onTagsChange }
                    limit={3}
                />
                <br/>
                <UploadCover
                    uploadChange={this.onUploadCoverChange}
                    uploadedCover={this.state.uploadedCover}
                    removeUpload={this.onRemoveUploadCover}
                />
                <br/>
                <div className="clearfix write-article-footer">
                    <SelectCategory
                        className="pull-left"
                        onChange={this.onSelectChange }
                    />
                    <div className="pull-right ctrl-btns">
                        <Button
                            disable={loading}
                            size={`large`}
                            type={`default`} >
                            Draft
                        </Button>
                        <Button
                            disable={loading}
                            loading={this.props.story.loading}
                            size={`large`} type={`primary`}
                            onClick={() => this.submitStory()} >
                            Publish
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = ({auth:{currentUser}, topics:{items}, story}) => ({
    currentUser,
    items,
    story
});

// const mapDispatch = diapatch => bindActionCreators({
//     createStory
// }, diapatch);

export default connect(mapState, undefined)(WriteStory);