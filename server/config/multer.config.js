import multer from 'multer';
import path from 'path';

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files')
    },
    filename(req, file, cb) {
        cb(null, `${(new Date).valueOf()}-${Math.random()*99999}${path.extname(file.originalname)}`);
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});
const upload = multer({ storage });

export default upload;