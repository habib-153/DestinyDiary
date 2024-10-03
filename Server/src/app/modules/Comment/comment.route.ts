import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post('/', auth(USER_ROLE.USER, USER_ROLE.ADMIN), CommentControllers.createComment)
router.get('/:id', CommentControllers.getPostAllComments)
router.patch('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), CommentControllers.updatePostComment)
router.delete('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), CommentControllers.deletePostComment)

export const CommentRoutes = router;