
async function paginate(aggregate, options = {}, populate = null, cb) {
  options = { ...options };
  const Model = this;
  const q = this.aggregate(aggregate._pipeline);
  const countQuery = this.aggregate(q._pipeline);
  const page = options.page || 1;
  const pageSize = options.pageSize || 10;
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
  const count = Model.count(options.match);
  const results = await Promise.all([q, count]);
  if (results) {
    const pages = Math.ceil(parseInt(results[1]) / parseInt(options.pageSize));
    const limit = options.pageSize;
    const page = parseInt(options.page);
    const total = results[1];
    if (populate || populate.length === 0) {
      const populatedRes = await Model.populate(results[0], { path: populate.join(' ') });
      // result['docs'] = populatedRes;
      if (populatedRes) {
        return new Promise((resolve, reject) => {
          resolve({
            pages, page, limit, total, docs: populatedRes,
          });
        });
      }
      return new Promise((resolve, reject) => {
        reject(null);
      });
    }

    return new Promise((resolve, reject) => {
      resolve({
        pages, page, limit, total, docs: results[0],
      });
    });
  }

  return new Promise((resolve, reject) => {
    reject(null);
  });
}

module.exports = function (schema) {
  schema.statics.paginateRecords = paginate;
};
module.exports.paginateRecords = paginate;
