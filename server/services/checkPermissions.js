import RBAC, { roles } from '../config/roles';

const checkPermission = {};
checkPermission.isOwner = function (req, res, next) {
    const { id, permission } = req.user;
    const { owner } = req.query.owner ? req.query:req.body.owner ? req.body: req.params;
    const validate = new RBAC(roles);
    validate.can(permission,'edit', {id, owner})
        .then(() => {
            next()
        }).catch(() => {
        res.status(403).send({
            success: false,
            error: 'You don\'t have a permission.'
        })
    });
};

export { checkPermission };