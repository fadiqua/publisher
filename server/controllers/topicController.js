import db from '../models/index';

const topicController = {};

topicController.post = (req, res) => {
    const { name, icon } = req.body;
    const topicObj = new db.Topic({
        name,
        icon
    });
    topicObj.save()
        .then(() => {
            res.status(201).json({
                success: true,
                data: topicObj
            })
        }).catch(error => {
            res.status(500).json({
                success:false,
                error
            })
        })
};
topicController.get = (req, res) => {
    db.Topic.find({})
        .then(topics => {
            res.status(200).json({
                success: true,
                topics: topics
            })
        }).catch(error => {
            res.status(500).json({
                success:false,
                error
            })
        })
};
export default topicController;