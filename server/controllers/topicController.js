import db from '../models/index';

const topicController = {};

topicController.post = async (req, res) => {
  const { name, icon, slug } = req.body;
  const topicObj = new db.Topic({
    name,
    icon,
    slug,
  });
  try {
    await topicObj.save();
    res.status(201).json({
      success: true,
      data: topicObj,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

topicController.get = async (req, res) => {
  try {
    const topics = await db.Topic.find({});
    res.status(200).json({
      success: true,
      topics,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default topicController;
