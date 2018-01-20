import mongoose, { Schema } from 'mongoose';

const topicSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'Username must be 3 characters or more.'],
    },
    icon: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        // required: true
    },

});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;