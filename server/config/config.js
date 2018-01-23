
const localDB = "mongodb://localhost:27017/blogger";

export default {
    // "dbUri": "mongodb://fadib:fadib123@5.196.13.70:27017/forum?authSource=admin",
    "dbUri": process.env.NODE_ENV === 'production' ? process.env.DB_HOST : localDB,
    "jwtSecret": "fadiquader"
};
