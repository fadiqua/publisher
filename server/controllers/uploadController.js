import Loki from 'lokijs';
import upload from '../config/multer.config';
import saveThumbnail from '../utils/saveThumbnail';
import { base64Decode } from '../utils/functions';
import fs from 'fs';
import path from 'path';

const dbLoki = new Loki('files/images', { persistenceMethod: 'fs' });
const uploadController = {};

uploadController.uploadImage = (req, res) => {
  const file = req.file; // file passed from client
  const meta = req.body; // all other values passed from the client, like name, etc..
  res.status(200).send({
    success: true,
    file,
  });
};

// uploadController.uploadProfilePicture = async (req, res) => {
//     const file = req.file; // file passed from client
//     // console.log('file ', file)
//     // const col = await loadCollection('files/images', dbLoki);
//     // const data = col.insert(req.file);
//     // dbLoki.saveDatabase();
//     try {
//         const thumb = await saveThumbnail(file);
//         res.status(200).send({
//             success: true,
//             file,
//             thumb
//         })
//     } catch(e) {
//         res.status(500).send({
//             success: false
//         })
//     }
//
// }
uploadController.temp = async (req, res) => {
  const file = req.file; // file passed from client;
  res.status(200).send({
    success: true,
    file,
  });
  setTimeout(() => {
    fs.unlink(path.resolve(__dirname, '..', '..', file.path), (err) => {
      if (err) return;
      console.log('success');
    });
  }, 1000 * 60 * 60);
};

uploadController.uploadProfilePicture = async (req, res) => {
  const base64Data = req.body.image;
  try {
    // path.resolve(__dirname, '..', '..', `files/${'base64-image.png'}`)
    const originalname = `${(new Date()).valueOf()}-${Math.random() * 99999}.png`;
    const file = {
      originalname,
      path: `./files/${originalname}`,
    };
    base64Decode(base64Data, file.path);
    const thumb = await saveThumbnail(file);
    res.status(200).json({
      success: true,
      file,
      thumb,
    });
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
  // const buffer = new Buffer(base64Data, 'base64').toString()
  // fs.writeFile(path.resolve(__dirname, '..', '..', `files/${'base64-image.png'}`), base64Data, 'base64', function(err) {
  //     if (err) console.log(err);
  // fs.readFile(path.resolve(__dirname, '..', '..', `files/${'base64-image.png'}`), function(err, data) {
  //     if (err) throw err;
  //     console.log('reading file...', data.toString('base64'));
  //     res.status(200).send(data);
  // });
  // });
};
export default uploadController;
