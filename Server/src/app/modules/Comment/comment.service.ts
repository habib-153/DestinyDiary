import { QueryBuilder } from '../../builder/QueryBuilder';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createCommentIntoDB = async (comment: Partial<TComment>) => {
  const result = (await Comment.create(comment)).populate('user post');

  return result;
};

const getAllCommentOfAPost = async (
  query: Record<string, unknown>,
  postId: string
) => {
  const comments = new QueryBuilder(Comment.find({ post: postId }), query)
    .paginate()
    .sort()
    .filter();
  //await Comment.find({post: postId}).populate('user post');

  const result = await comments.modelQuery;
  const meta = comments.countTotal();

  return { result, meta };
};

const updateCommentIntoDB = async (payload: Partial<TComment>, id: string) => {
  const result = await Comment.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteCommentFromDB = async (id: string) => {
  const result = await Comment.findByIdAndDelete(id);
  return result;
};

export const CommentService = {
  createCommentIntoDB,
  getAllCommentOfAPost,
  updateCommentIntoDB,
  deleteCommentFromDB,
};
