import db from '../models/index';
import mongoose from 'mongoose';

// import fs from 'fs';

const  storyController = {};

const storyFields = {
    "title": 1,
    "slug": 1,
    "content": 1,
    "_creator": 1,
    "_topic": 1,
    "isDeleted": 1,
    "_comments": 1,
    "isDraft": 1,
    "createdAt": 1,
    "cover": 1,
    "_likes": 1,
}
storyController.post =  (req, res) => {
    const { title, content, link, tags, cover, topicId, userId } = req.body;

    const story = new db.Story({
        title, content, link,tags, cover,
        _topic: topicId, _creator: userId
    });

    story.save().then(newStory => {
        db.Story.populate(newStory, {
            path: '_topic',
            select: '-_id -icon'
        }).then(ns => {
            res.status(200).json({
                success: true,
                story: ns
            })
        })

    }).catch(err => {
        res.status(500).json({
            success: false,
            error: err
        })
    })
};
storyController.get = async (req, res) => {
    const { user } = req;
    try {
        const { slug } = req.params;
        const story = (await db.Story.findOne({ slug })).toObject({virtuals: true});
        story.isUserLiked = false;
        if(user) {
            story.isUserLiked = !!story._likes.find(id => id.toString() === user.id)
        }
        res.status(200).json({
            success: true,
            story
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

}
storyController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await db.Story.findById(id);
        res.status(200).json({
            success: true,
            story
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }

}
storyController.getAll = async (req, res) => {
    try {
        const stories = await db.Story.find({}).populate({
            path: '_creator',
            select: 'username -_id'

        });
        res.status(200).json({
            success: true,
            data: stories
        })
    } catch (error) {
        res.status(500).json({
            success: false
        })
    }
};
storyController.getHomePageData = async (req, res) => {
    const topics = await db.Topic.find({});
    const params = {};
    if(!req.user){
        params["membersOnly"] = false;
    }
    const data = (await Promise.all(topics.map(topic =>
        db.Story.find({_topic: topic._id, ...params }).sort({createdAt: 1}).limit(4))))
        .filter(t => t.length > 0);
    res.status(200).send({
        stories: data
    });
};
storyController.getStoriesByTopic = async (req, res) => {
    const { topic, page=1, sortby } = req.query;
    let stories;
    let pageSize = 9;
    let params = {};
    params['isDeleted'] = false;
    params['isDraft'] = false;
    if(!req.user) {
        params['membersOnly'] = false
    }
    const topicObj = await db.Topic.findOne({name: topic });
    let sortBy = sortby || 'date';
    let sort = {};
    if(sortBy === 'date'){
        sort['createdAt'] = 1
    } else {
        sort["commentsCount"] = -1;
        sort["likesCount"] = -1;
        sort['createdAt'] = 1
    }
    const aggregate = db.Story.aggregate();
    if(topicObj !== null){
        params['_topic'] = topicObj._id;
        const stories = await db.Story.paginateRecords(aggregate,{
                match: params,
                project: {
                    ...storyFields,
                    "commentsCount": { "$size": "$_comments" },
                    "likesCount": { "$size": "$_likes" }
                },
                sort,
                page,
                pageSize
            },
            ['_creator', '_topic']
        );
        res.status(200).json({
            success: true,
            stories
        })
    }
    else if (topic === 'members-only'){
        if(!req.user) {
            res.status(401).json({
                success: false,
                error: 'Authentication is not provided'
            });
        } else {
            stories = await db.Story.paginateRecords(aggregate,{
                    match: params,
                    project: {
                        ...storyFields,
                        "commentsCount": { "$size": "$_comments" },
                        "likesCount": { "$size": "$_likes" }
                    },
                    sort,
                    page,
                    pageSize
                },
                ['_creator', '_topic']
            );
            res.status(200).json({
                success: true,
                stories
            })
        }

    }
    else {
        res.status(500).json({
            success: false,
            error: 'Not valid topic'
        })
    }

};

storyController.getPopularStories = async (req, res) => {
    const { page } = req.query;
    const pageSize = 9;
    const aggregate = db.Story.aggregate();
    const data = await db.Story.paginateRecords(aggregate,{
            match: { "isDeleted": false, "isDraft":false},
            project: {
                ...storyFields,
                "commentsCount": { "$size": "$_comments" },
                "likesCount": { "$size": "$_likes" }
            },
            sort: { "commentsCount": -1 , "likesCount": -1, "createdAt": 1 },
            page,
            pageSize
        },
        ['_creator', '_topic']
    );
    res.status(200).json({
        success: true,
        stories: data

    })
};

storyController.getStoriesByTag =  async (req, res) => {
    const  { tag='' } = req.params;
    const { page=1 } = req.query;
    // const regex = new RegExp(`/(^|\W)${tag}($|\W)/i`);
    const regex = new RegExp(`^${tag}\\s?`);
    // db.tags.aggregate(
    //     {$unwind:"$tags"},
    //     {$group: { _id:"$tags", score:{"$sum":1} } },
    //     {$out:"tagStats"}
    // )
    const params = {};
    params['isDeleted'] = false;
    if(!req.user.id) params['membersOnly'] = true;
    const stories = await db.Story.paginate({
        ...params,
        tags: {
            $in: [regex]
        }
    },{
        sort: {
            createdAt: -1
        },
        page,
        limit: 10
    });

    res.status(200).json({
        stories
    })
};

export default storyController;