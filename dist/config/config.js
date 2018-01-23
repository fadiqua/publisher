"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var localDB = "mongodb://localhost:27017/blogger";

exports.default = {
    // "dbUri": "mongodb://fadib:fadib123@5.196.13.70:27017/forum?authSource=admin",
    "dbUri": process.env.NODE_ENV === 'production' ? process.env.DB_HOST : localDB,
    "jwtSecret": "fadiquader"
};
//# sourceMappingURL=config.js.map