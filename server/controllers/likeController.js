import db from '../models/index';

const likeController = {};
likeController.post = async (req, res) => {
  const { id, type, parent } = req.body;
  const obj = await db.Like.findOne({
    _creator: req.user.id,
    _object: id,
    type,
  });
  if (!obj) {
    const like = new db.Like({
      _creator: req.user.id,
      _object: id,
      type,
      parent: parent || null,
    });
    await like.save();
    const story = await db[type].findByIdAndUpdate(
      id,
      { $push: { _likes: req.user.id } },
    );

    if (req.user.id !== story._creator) {
      await new db.Notifications({
        _from: req.user.id,
        _to: story._creator,
        type: 'like',
        _parentTarget: story._id,
        _target: null,
      }).save();
    }

    res.status(200).json({
      isLiked: true,
      user: req.user.id,
    });
  } else {
    await obj.remove();
    const storyObj = await db[type].findByIdAndUpdate(
      id,
      { $pull: { _likes: req.user.id } },
    );

    await db.Notifications.findOneAndRemove({
      _from: req.user.id,
      _to: storyObj._creator,
      type: 'like',
      _parentTarget: id,
    });

    res.status(200).json({
      isLiked: false,
      user: req.user.id,
    });
  }
};

export default likeController;
