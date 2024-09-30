import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { PostControllers } from './post.controller';
import { parseBody } from '../../middlewares/bodyParser';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.USER),
  multerUpload.single('image'),
  //validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  //validateRequest(ItemValidation.createItemValidationSchema),
  PostControllers.createPost
);

router.get('/', PostControllers.getAllPost);

router.get('/:id', PostControllers.getSinglePost);

router.put(
  '/:id',
  auth(USER_ROLE.USER),
  //validateRequest(ItemValidation.updateItemValidationSchema),
  PostControllers.updatePost
);

router.delete('/:id', auth(USER_ROLE.USER), PostControllers.deletePost);

export const PostRoutes = router;