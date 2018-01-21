import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: [5, 'Username must be 5 characters or more.'],
    },
    firstName: String,
    lastName: String,
    thumbnail: String,
    picture: String,
    bio: String,
    permission: {
        type: String,
        default: 'writer'
    },
    draft: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    _following: [{ type: Schema.ObjectId, ref:'User' }],
    _followers: [{ type: Schema.ObjectId, ref:'User' }]
},{ toJSON: { virtuals: true } });

userSchema.index({ username: 'text', firstName: 'text', lastName: 'text', email: 'text'});

userSchema.plugin(mongoosePaginate);

userSchema.virtual('displayName').get(function () {
    return this.firstName + ' ' + this.lastName;
})
;
userSchema.statics.generateUniqueUserName = async function ({ firstName, lastName }) {
    const User = this;
    let username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    return new Promise( async (resolve, reject) => {
       const generate = async username => {
           const exists = await User.findOne({ username });
           if(exists !== null) {
               generate(`${username}.${Math.floor(Math.random()*10 + 1)}`)
           } else {
               resolve(username)
           }
       };
       try {
           generate(username)
       } catch (err) {
           reject(err)
       }
    })
};

const User = mongoose.model('User', userSchema);

export default User;
