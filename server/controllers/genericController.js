import db from '../models/index';

const genericController = {};

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
      console.log(Model);
      const data = await db[Model]
          .paginate({$text: {$search: q}},
              {
                  select: '-tags',
                  sort: {
                      createdAt: 1
                  },
                  page: page,
                  limit: 6
              });
      res.status(200).json({
          ...data
      })  }
      catch (e) {
        res.send(500).json({
            success: false,
            error: e.message
        })
      }
};
export default genericController;