
async function paginate(aggregate, options={}, populate=null, cb){
    options = { ...options };
    const Model = this;
    let q = this.aggregate(aggregate._pipeline);
    let countQuery = this.aggregate(q._pipeline);
    let page = options.page || 1;
    let pageSize = options.pageSize || 10;
    if(options.match){
        q.match(options.match)
    }
    if(options.project){
        q.project(options.project)
    }
    if(options.sort){
        q.sort(options.sort)
    }
    q.skip((page-1)*pageSize).limit(pageSize);
    // countQuery.group({ _id: null, count: { $sum: 1 } });
    let count = Model.count(options.match);
    let results = await Promise.all([q, count]);
    if(results){
        let pages = Math.ceil(parseInt(results[1])/parseInt(options.pageSize));
        let limit = options.pageSize;
        let page =  parseInt(options.page);
        let total = results[1];
        if(populate || populate.length === 0){
            const populatedRes = await Model.populate(results[0],  {path: populate.join(' ') });
            // result['docs'] = populatedRes;
            if(populatedRes){
                return new Promise((resolve, reject) => {
                    resolve({pages, page, limit, total,docs: populatedRes})
                });
            } else  {
                return new Promise((resolve, reject) => {
                    reject(null)
                });
            }

        }
        else {
            return new Promise((resolve, reject) => {
                resolve({pages, page, limit, total, docs: results[0]})
            });
        }
    }
    else  {
        return new Promise((resolve, reject) => {
            reject(null)
        });
    }


}

module.exports = function (schema) {
    schema.statics.paginateRecords = paginate;
};
module.exports.paginateRecords = paginate;