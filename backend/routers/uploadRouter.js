//  here we create an API that save our images in the uploads file and give name to them based on the date
import express from 'express';
import multer from 'multer';
import { isAuth } from '../utils.js';

const uploadRouter = express.Router();

// for saving images 
const storage = multer.diskStorage({
    destination(req, file, cb){
    cb(null, 'uploads/')
},
filename(req, file, cb){
    cb(null, `${Date.now()}.jpg`); // for giving them name
},
});


const upload = multer({storage});


uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
});


export default uploadRouter;