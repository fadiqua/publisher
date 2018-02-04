import { Types } from 'mongoose';

import db from '../models/index';

const genericController = {};

const fields = {
    User: {
        "username": 1,
        "firstName": 1,
        "lastName": 1,
        "displayName": { $concat: ["$firstName", " ", "$lastName"]},
        "thumbnail": 1,
        "bio": 1,
        "createdAt": 1
    },
    Story: {
        "title": 1,
        "slug": 1,
        "description": 1,
        "content": 1,
        "cover": 1,
        "createdAt": 1,
        "_topic": 1,
        "_creator": 1,
    }
};

genericController.search = async (req, res) => {
    const { value } = req.query;
    try {
        const result = await Promise.all([
            db.Story.find({isDeleted: false, isDraft: false, $text: {$search: value}}).limit(6),
            db.User.find({$text: {$search: value}}).limit(4),
        ]);
        res.status(200).json({
            success: true,
            stories: result[0],
            users: result[1]
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
};
genericController.advancedSearch = async (req, res) => {
  try {
      const { q, page } = req.query;
      const Model = Object.keys(req.query).indexOf('users') !== -1? 'User':'Story';
      const params = {};
      const populatedFields = Model !== 'User' ? ['_topic', '_creator'] : [];
      const aggregate = db[Model].aggregate();
      const beingFollowedUsers = req.user ?
          (await db.Follow.find({ _user: Types.ObjectId(req.user.id) }))
              .map(user => user._followed) : [];
      if(Model === 'User') {
          params["isOwner"] =  { $eq: ["$_id",  req.user ? Types.ObjectId(req.user.id) : '' ]};
          params["beingFollowed"] = {$in: ["$_id", beingFollowedUsers]}
      }
      const data = await db[Model].paginateRecords(aggregate,{
              match: {
                  $text: {$search: q}
              },
              project: {
                  ...fields[Model],
                  ...params
              },
              sort: {
                  createdAt: '1'
              },
              page,
              pageSize: 10,
          },
          populatedFields
      );
      res.status(200).json({
          ...data
      })  }
      catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
      }
};
export default genericController;