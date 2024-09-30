import httpStatus from 'http-status';
import { TPost } from './post.interface';
import AppError from '../../errors/AppError';
import { Post } from './post.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { postSearchableFields } from './post.constant';
import { TImageFile } from '../../interfaces/image.interface';

const createPostIntoDB = async (payload: Partial<TPost>, image: TImageFile) => {
  if (image) {
    payload.image = image.path;
  }

  const result = (await Post.create(payload)).populate('author');
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find(), query)
    .search(postSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await postQuery.countTotal();
  const result = await postQuery.modelQuery;

  if (result.length === 0) {
    return null;
  }

  return { meta, result };
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id).populate('author');
  return result;
};

const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const postData = await Post.findById(id);

  if (!postData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
};
