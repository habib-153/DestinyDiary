import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentService } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const result = await CommentService.createCommentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Posted successfully',
    data: result,
  });
});

const getPostAllComments = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const result = await CommentService.getAllCommentOfAPost(req.query, postId);

  if (result === null) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post comments retrieved successfully',
    data: result,
  });
});

const updatePostComment = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CommentService.updateCommentIntoDB(req.body, id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment updated successfully',
    data: result,
  });
});

const deletePostComment = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await CommentService.deleteCommentFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment Deleted Successfully',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getPostAllComments,
  updatePostComment,
  deletePostComment,
};
