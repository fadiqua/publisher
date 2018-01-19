import db from '../models/index';
import server from '../index';

const  commentController = {};

commentController.post = async (req, res) => {
    const { text, storyId, userId, parentId } = req.body;
    const comment = new db.Comment({
        text,
        _story: storyId ,
        _creator: userId,
        _parent: parentId || null
    });
    try {
        let newComment = await comment.save();
        if(parentId == undefined){
            let result = await Promise.all([
                db.Story.findByIdAndUpdate(
                    storyId,
                    { $push: { '_comments': newComment._id }}
                ),
                db.Comment.populate(newComment, {
                    path: "_creator",
                    select: '-password -createdAt -facebook'
                })
            ]);
            {/*<a class="primary-color" href="/profile/${result[1]._creator._id}">*/}
            if(userId !== result[0]._creator.toString()){
                await new db.Notifications({
                    _from: userId,
                    _to: result[0]._creator,
                    type: 'comment',
                    _parentTarget:  result[0]._id,
                    _target:  result[1]._id
                }).save();
            }
        }
        else {
            console.log('parentId ', parentId)
            await db.Comment.findByIdAndUpdate(parentId, { $inc: { repliesCount: 1}})
        }
        let c = await db.Comment.populate(newComment, {
            path: '_creator',
            select: '-_following -_followers -facebook -google'
        });
        res.status(200).json({
            success: true,
            comment: c,
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
};

commentController.get = async (req, res) => {
    const { storyId } = req.params;
    const { page } = req.query;
    // console.log('storyId ', storyId);
    try {
        const comments = await db.Comment
            .paginate({
                _story: storyId,
                isDeleted: false,
                _parent: null
            },{
                sort: {
                    createdAt: -1
                },
                populate: '_story',
                page: page || 1,
                limit: 2
            });
        res.status(200).json({
            ...comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
};

commentController.delete = async (req, res) => {
    const { id, storyId, parentId } = req.query;
    try {
        let promises = [
            db.Comment.findByIdAndUpdate(id, {
                isDeleted: true
            }),
            db.Story.findByIdAndUpdate(storyId, { $pull: { _comments: id}}),
        ];
        if(parentId){
            promises.push(db.Comment.findByIdAndUpdate(parentId, { $inc: { repliesCount: -1}}))
        }
        await Promise.all(promises);
        res.status(200).send({
            success: true
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            error: e.message
        })
    }
};
commentController.update = (req, res) => {
    const { id, text } = req.body;
    if(id && text) {
        db.Comment.findByIdAndUpdate(id,{text})
            .then(comment => {
                res.status(200).json({
                    success: true,
                    comment
                })
            })
            .catch(error => {
                res.status(500).send({
                    success: false,
                    error
                })
            })
    } else {
        res.status(500).send({
            success: false,
            error: 'no comment id and comment creator.'
        })
    }

};

commentController.getUserResponses = async (req, res) => {
    const { userId } = req.params;
    const { page } = req.query;
    try {
        const responses = await db.Comment
            .paginate(
                {
                    _creator: userId,
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
            ...responses
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }

};

commentController.getReponseById = async (req, res) => {
    try {
        const { responseId } = req.params;
        const response = await db.Comment.findById(responseId).populate({
            path: '_creator',
            select: 'thumbnail username firstName lastName _id'
        });
        res.status(200).json({
            response
        })
    } catch (e) {
        res.status(500).send({
            error: e.message
        })
    }
};
commentController.getReplies = async (req, res) => {
    try {
        const { responseId } = req.params;
        const { page } = req.query;
        const response = await db.Comment
            .paginate(
                {
                    _parent: responseId,
                    isDeleted: false
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
            ...response
        })
    } catch (e) {
        res.status(500).send({
            error: e.message
        })
    }
}
export default commentController;