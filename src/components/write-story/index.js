// npm packages
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Button, message, Checkbox  } from 'antd';
import DocumentTitle from 'react-document-title';
// project files
import WysiwygEditor from './WysiwygEditor';
import TagBox from './TagBox';
import SelectCategory from './SelectCategory';
import UploadCover from './UploadCover';
import { sanitize } from '../../utils/functions';
import { createStory, editStory, updateProfile } from '../../routes';
import { updateProfile as updateProfileAction } from '../../actions/actionTypes';
import './index.scss';

class WriteStory extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: null,
            description: null,
            editorContent: null,
            selectedTopic: null,
            tags: [],
            uploadedCover: null,
            membersOnly: false,
            loading: true,
        };
        this.didMount = false;
        this.charactersCount = 0;
        this.onSelectChange = this._onSelectChange.bind(this);
        this.onTagsChange = this._onTagsChange.bind(this);
        this.onValueChange = this._onValueChange.bind(this);
        this.submitStory = this._submitStory.bind(this);
        this.saveDraft = this._saveDraft.bind(this);
        this.onUploadCoverChange = this.onUploadCoverChange.bind(this);
        this.onRemoveUploadCover = this.onRemoveUploadCover.bind(this);
    }

    componentWillMount() {
        // location.search
        const { draft, location: { state } } = this.props;
        if(state && state.story) {
            this.fulFilledStateForEdit(state.story)
        }
        else if(!!draft) {
            try {
                const draftData = JSON.parse(draft);
                this.charactersCount = draftData.charactersCount;
                this.fulFilledStateFromDraft(draftData);
            } catch (err) {
                this.toggleLoading();
            }

        } else {
            this.toggleLoading();
        }
    }

    fulFilledStateFromDraft(draft) {
        delete draft.charactersCount;
        this.setState(draft)
    };
    fulFilledStateForEdit(story) {
        this.charactersCount = story.count;
        this.setState({
            title: story.title,
            description: story.description,
            uploadedCover: story.cover,
            membersOnly: story.membersOnly,
            editorContent: story.content,
            selectedTopic: story._topic._id,
            tags: story.tags,
            loading: false
        })
    }
    _onSelectChange (selectedTopic) {
        this.setState({ selectedTopic })
    };

    _onTagsChange (tags) {
        this.setState({ tags });
    };

    _onValueChange (e) {
        const { name, value, checked } = e.target;
        this.setState({ [name]: checked || value });
    };

    onEditorChange = (editorContent, count) => {
        this.setState({ editorContent });
        this.charactersCount = count;
    };

    onUploadCoverChange(uploadedCover){
        this.setState({uploadedCover})
    }

    onRemoveUploadCover(file){
        // if(file.response.file.filename  === this.state.uploadedCover){
            this.setState({uploadedCover: null})
        // }
    }

    async _submitStory () {
        const {
            title, description,
            tags, uploadedCover,
            selectedTopic,
            editorContent,
            membersOnly
        } = this.state;
        const { state } = this.props.location;

        if(!title || !editorContent
            || tags.length === 0 ||
            !uploadedCover || !selectedTopic){
            message.error('All fields are required.');
            return;
        }
        const story = {
            title: sanitize(title),
            description: sanitize(description),
            content: sanitize(editorContent),
            tags, cover: uploadedCover,
            topicId: selectedTopic,
            count: this.charactersCount,
            membersOnly
        };
        try {
            this.toggleLoading();
            const fromEdit = state && state.story;
            const endPoint = fromEdit ? editStory : createStory;
            const params = { story };
            if(fromEdit) params['id'] = state.story._id;
            const { data } = await endPoint(params);
            this.toggleLoading();
            this.props.updateProfileAction({ draft: null });
            this.props.history.push(`/topics/${data.story._topic.slug}/story/${data.story.slug}`)
        } catch (err) {
            err.response && message.error(err.response.data.message);
            this.toggleLoading();
        }
    }

    async _saveDraft(){
        try {
            const draftStory = {
                ...this.state,
                loading: false,
                charactersCount: this.charactersCount,
            };
            this.toggleLoading();
            const { data } = await updateProfile({ draft: JSON.stringify(draftStory, null, -1)})
            this.toggleLoading();
            this.props.updateProfileAction(data.user)
            message.success("Successfully saved draft!")
        } catch (err) {
            console.log('error ', err)
            this.toggleLoading();
            message.error("Error happened when trying to save draft!")
        }
    }

    toggleLoading() {
        this.setState(prev => ({ loading: !prev.loading }))
    }

    render(){
        const {
            loading,
            membersOnly,
            title,
            description,
            selectedTopic,
            editorContent,
            tags
        } = this.state;
        const { location } = this.props;
        if(loading) return null;
        const editMode = location.state && location.state.story;
        return (
            <DocumentTitle title="Write Story">
                <div>
                    <div className="write-title">
                        <Input
                            value={title}
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
                            value={description}
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
                        editorValue={editorContent}
                        readOnly={loading}
                    />
                    <br/>
                    <br/>
                    <TagBox
                        tags={tags}
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
                    <div className="write-article-footer">
                        <div>
                            <SelectCategory
                                selectedTopic={selectedTopic}
                                onChange={this.onSelectChange }
                            />
                            <Checkbox
                                disabled={loading}
                                checked={membersOnly}
                                size="large"
                                onChange={this.onValueChange}
                                name="membersOnly"
                                className="members-only"
                            >
                                Members only
                            </Checkbox>

                        </div>
                        <div className="pull-right ctrl-btns">
                            {!editMode && <Button
                                disabled={loading}
                                size={`large`}
                                type={`default`} onClick={this.saveDraft} >
                                Draft
                            </Button>}
                            <Button
                                disabled={loading}
                                size={`large`} type={`primary`}
                                onClick={this.submitStory} >
                                { !editMode ? 'Publish' : 'Update' }
                            </Button>
                        </div>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
}

const mapState = ({ auth: { currentUser: { draft }}}) => ({ draft });

const mapDispatch = dispatch => bindActionCreators({
    updateProfileAction
}, dispatch);

export default connect(mapState, mapDispatch)(WriteStory);