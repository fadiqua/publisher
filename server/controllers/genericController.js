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
      const aggregate = db[Model].aggregate();
      const beingFollowedUsers = (await db.Follow.find({ _user: Types.ObjectId(req.user.id) })).map(user => user._followed);
      console.log('beingFollowedUsers ', beingFollowedUsers)
      params["beingFollowed"] = { $exists: true, $in: beingFollowedUsers }
      if(Model === 'User') {

      }
      const d = await db[Model].paginateRecords(aggregate,{
              match: {
                  $text: {$search: q}
              },
              project: {
                  ...fields[Model],
                  isOwner: { $eq: ["$_id",  req.user ? Types.ObjectId(req.user.id) : '' ] },
                  beingFollowed: {$in: ["$_id", beingFollowedUsers]}
                  // "likesCount": { "$size": "$_likes" }
              },
              sort: {
                  createdAt: '1'
              },
              page,
              pageSize: 10,
          },
          []
      );
      // const data = await db[Model]
      //     .paginate({$text: {$search: q}},
      //         {
      //             select: '-tags',
      //             sort: {
      //                 createdAt: 1
      //             },
      //             page: page,
      //             limit: 6
      //         });
      res.status(200).json({
          // ...data
          ...d
      })  }
      catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
      }
};
export default genericController;