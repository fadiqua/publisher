import multer from 'multer';
import upload from '../config/multer.config';
import uploadController from '../controllers/uploadController';
import { asyncMiddleware } from '../services';

const uploadMemory = multer({ storage: multer.memoryStorage({}) });

export default function uploads(routes) {
  routes.post('/files', upload.single('file'), uploadController.uploadImage);
  // routes.post('/files/profile',  upload.single('file'), asyncMiddleware(uploadController.uploadProfilePicture))
  routes.post('/files/temp', upload.single('file'), asyncMiddleware(uploadController.temp));
  routes.post('/files/profile', asyncMiddleware(uploadController.uploadProfilePicture));
}
