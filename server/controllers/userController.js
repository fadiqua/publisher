import jwt from 'jsonwebtoken';
import config from '../config/config';
import db from '../models/index';
// import request from 'request';
// import io from '../index';

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.sign({ sub:user.id, permission: user.permission ,iat: timestamp }, config.jwtSecret)
}

const userController = {};

userController.localSignup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    // validation - username / password

    try {
        if(!firstName) throw new Error('Frist Name is Required');
        else if(!lastName) throw new Error('Last Name is Required');
        else if(!email) throw new Error('Email is Required');
        else if(!password || password.length < 8) throw new Error('Invalid Password, must be at least 8 characters');
        const emailExists = await db.LocalAuth.findOne({ email });
        if(emailExists !== null) throw Error("Email already exists");
        const user = await db.LocalAuth.createLocalUser({
            firstName,
            lastName,
            email,
            password
        });
        let token = tokenForUser(user);
        res.status(200).json({
            success: true,
            me: user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

userController.login = async  (req, res) => {
    const { email, password } = req.body;
    const errorResponse = msg =>  {
        res.status(500).json({
            success: false,
            message: msg || 'Invalid credentials'
        });
    };
    try {
        const user = await db.LocalAuth.findOne({ email });
        if(user === null) {
            errorResponse('This Email is not registered in the system')
            return;
        }
        user.comparePassword(password, async (err, isMatch) => {
            if(err || !isMatch){
                errorResponse();
                return;
            }
            const me = await db.User.findById(user.user);
            let token = tokenForUser(me);
            res.status(200).json({
                success: true,
                me,
                token
            });

        });
    } catch (err) {
        return errorResponse(err.message)
        // errResponse(err.message);
    }
};

userController.socialLogin = async (req, res) => {
    const { network, socialToken, data } = req.body;
    try {
        const user = await db.SocialAuth.findOrCreate(network, data);
        console.log('userr ', user)
        const token = tokenForUser(user);
        res.status(200).send({
            success: true,
            currentUser: user,
            token
        });
    } catch (e) {
        return res.status(500).send({
            success: false,
            error: e.message
        })
    }
};


userController.getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await db.User.findOne({ username });
        const topStories = await db.Story.find({_creator: user._id})
            // .sort({ '_likes.length': -1, '_comments.length': -1 })
            .limit(3);
        res.status(200).json({
            success: true,
            user,
            topStories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
};


userController.followUser = (req, res) => {
    const user = req.user.id;
    const followedUser = req.body.id;
    console.log('user ', user);
    console.log('followedUser ', followedUser);
    const followObj = new db.Follow({
        _user: user,
        _followed: followedUser
    });

    db.Follow.findOne({
        _user: user,
        _followed: followedUser
    }).then(async result => {
        if(result){
            // result.isDeleted = true;
            await Promise.all([
                result.remove(),
                db.Notifications.findOneAndRemove({
                    _from: user,
                    _to: followedUser,
                    type: 'follow',
                })
            ]);
        } else {
            await followObj.save();
            const targetUser = await db.Follow.populate(followObj,{
                path: '_user',
                select: ' username firstName lastName displayName thumbnail _id'
            });
            await new db.Notifications({
                _from: user,
                _to: followedUser,
                type: 'follow',
            }).save()
        }
        res.status(200).json({
            success: true,
        })
    }).catch(error => {
        res.status(500).json({
            success: true,
            error
        })
    })
};

userController.getMe = async (req, res) => {
    const { user } = req;
    try {
        if(!req.user) throw new Error('');
        const me = await db.User.findById(user.id);
        if(!me) throw new Error('Invalid signature');
        res.status(200).json({
            success: true,
            me
        })
    } catch(error) {
        res.status(403).json({
            success: false,
            message: error.message
        });
    }
};

userController.updateProfile = async (req, res) => {
    const { data } = req.body;
    try {
        // new: true => return the updated object
        const user = await db.User.findByIdAndUpdate(req.user.id, { ...data }, {new: true});
        res.status(200).json({
            success: true,
            user
        });
    } catch (e) {
        res.status(500).send({
            error: e.message
        });
    }
};

userController.getUserStories = async (req, res)  => {
    const { username } = req.params;
    const { page } = req.query;
    try {
        const user = await db.User.findOne({ username });
        const stories = await db.Story
            .paginate({
                    _creator: user._id,
                    isDeleted: false,
                    membersOnly: false
                },
                {
                    select: '-tags',
                    sort: {
                        createdAt: -1
                    },
                    page,
                    limit: 6
                });
        res.status(200).json({
            success: true,
            ...stories
        })
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

userController.getUserResponses = async (req, res) => {
    const { username } = req.params;
    const { page } = req.query;
    try {
        const user = await db.User.findOne({ username });
        const responses = await db.Response
            .paginate(
                {
                    _creator: user._id,
                    isDeleted: false,
                },
                {
                    sort: {
                        createdAt: -1
                    },
                    populate: '_story',
                    page: page || 1,
                    limit: 6
                });
        res.status(200).json({
            success: true,
            ...responses
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }

};

userController.getFollowers = async (req, res) => {
    const { id } = req.params;
    const { page } = req.query;
    try {
        const users = await db.Follow.paginate(
            { _followed: id },
            { sort: {createdAt: 1}, page: page || 1, limit: 6 }
        );
        res.status(200).json({
            ...users
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
};

userController.getFollowings = async (req, res) => {
    const { id } = req.params;
    const { page } = req.query;
    try {
        const users = await db.Follow.paginate(
            { _user: id },
            { sort: {createdAt: 1}, page: page || 1, limit: 20 }
        );
        res.status(200).json({
            ...users
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
};

export default userController;