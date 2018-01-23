'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var paginate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(aggregate) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var populate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var cb = arguments[3];

        var Model, q, countQuery, page, pageSize, count, results, pages, limit, _page, total, populatedRes;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        options = Object.assign({}, options);
                        Model = this;
                        q = this.aggregate(aggregate._pipeline);
                        countQuery = this.aggregate(q._pipeline);
                        page = options.page || 1;
                        pageSize = options.pageSize || 10;

                        if (options.match) {
                            q.match(options.match);
                        }
                        if (options.project) {
                            q.project(options.project);
                        }
                        if (options.sort) {
                            q.sort(options.sort);
                        }
                        q.skip((page - 1) * pageSize).limit(pageSize);
                        // countQuery.group({ _id: null, count: { $sum: 1 } });
                        count = Model.count(options.match);
                        _context.next = 13;
                        return Promise.all([q, count]);

                    case 13:
                        results = _context.sent;

                        if (!results) {
                            _context.next = 33;
                            break;
                        }

                        pages = Math.ceil(parseInt(results[1]) / parseInt(options.pageSize));
                        limit = options.pageSize;
                        _page = parseInt(options.page);
                        total = results[1];

                        if (!(populate || populate.length === 0)) {
                            _context.next = 30;
                            break;
                        }

                        _context.next = 22;
                        return Model.populate(results[0], { path: populate.join(' ') });

                    case 22:
                        populatedRes = _context.sent;

                        if (!populatedRes) {
                            _context.next = 27;
                            break;
                        }

                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            resolve({ pages: pages, page: _page, limit: limit, total: total, docs: populatedRes });
                        }));

                    case 27:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            reject(null);
                        }));

                    case 28:
                        _context.next = 31;
                        break;

                    case 30:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            resolve({ pages: pages, page: _page, limit: limit, total: total, docs: results[0] });
                        }));

                    case 31:
                        _context.next = 34;
                        break;

                    case 33:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            reject(null);
                        }));

                    case 34:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function paginate(_x3) {
        return _ref.apply(this, arguments);
    };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = function (schema) {
    schema.statics.paginateRecords = paginate;
};
module.exports.paginateRecords = paginate;
//# sourceMappingURL=paginateRecords.js.map