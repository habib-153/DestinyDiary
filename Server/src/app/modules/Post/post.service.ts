/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TPost } from './post.interface';
import AppError from '../../errors/AppError';
import { Post } from './post.model';
import { TImageFile } from '../../interfaces/image.interface';
import { User } from '../User/user.model';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

const createPostIntoDB = async (payload: Partial<TPost>, image: TImageFile) => {
  if (image) {
    payload.image = image.path;
  }

  const result = (await Post.create(payload)).populate('author');
  return result;
};

// const getAllPostsFromDB = async (query: Record<string, unknown>) => {
//   const postQuery = new QueryBuilder(Post.find(), query)
//     .search(postSearchableFields)
//     .filter()
//     .sort()
//     .paginate()
//     .fields();

//   const meta = await postQuery.countTotal();
//   const result = await postQuery.modelQuery;

//   if (result.length === 0) {
//     return null;
//   }

//   return { meta, result };
// };
const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const { sort, searchTerm, ...searchQuery } = query;

  // Base aggregation pipeline
  const aggregationPipeline: any[] = [
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {
      $unwind: {
        path: '$author',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        upvoteCount: { $size: '$upVotes' },
        downvoteCount: { $size: '$downVotes' },
      },
    },
  ];

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm as string, 'i');
    aggregationPipeline.push({
      $match: {
        $or: [
          { title: searchRegex },
          { category: searchRegex },
          { 'author.name': searchRegex },
        ],
      },
    } as any);
  }

  if (sort === 'upvote' || sort === 'downvote') {
    aggregationPipeline.push({
      $sort: sort === 'upvote' ? { upvoteCount: -1 } : { downvoteCount: 1 },
    } as any);
  }

  const result = await Post.aggregate(aggregationPipeline);

  if (!result || result.length === 0) {
    return null;
  }

  return result 
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

const addPostUpvoteIntoDB = async (postId: string, userData: Record<string, unknown>) => {
  const { email, _id } = userData;

  const user = await User.isUserExistsByEmail(email as string);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");

  const post = await Post.findById(postId);
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post doesn't exist!");

  const userId = new Types.ObjectId(_id as string);

  if (post.upVotes.some((upvoteId) => upvoteId.equals(userId))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You already upvote this post!');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (post.downVotes.some((downvoteId) => downvoteId.equals(userId))) {
      await Post.findByIdAndUpdate(postId, { $pull: { downVotes: _id } }, { new: true, runValidators: true, session });
    }

    const result = await Post.findByIdAndUpdate(postId, { $addToSet: { upVotes: _id } }, { new: true, runValidators: true, session }).populate('upVotes');
    await User.findByIdAndUpdate(post.author, { $inc: { totalUpVotes: 1 } }, { new: true, session });

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const removePostUpvoteFromDB = async (postId: string, userData: Record<string, unknown>) => {
  const { email, _id } = userData;

  const user = await User.isUserExistsByEmail(email as string);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");

  const post = await Post.findById(postId);
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post doesn't exist!");

  const userId = new Types.ObjectId(_id as string);

  if (!post.upVotes.some((upvoteId) => upvoteId.equals(userId))) {
    throw new AppError(httpStatus.BAD_REQUEST, "You haven't upvote this post!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Post.findByIdAndUpdate(postId, { $pull: { upVotes: _id } }, { new: true, runValidators: true, session }).populate('upVotes');
    await User.findByIdAndUpdate(post.author, { $inc: { totalUpVotes: -1 } }, { new: true, session });

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const addPostDownvoteIntoDB = async (postId: string, userData: Record<string, unknown>) => {
  const { email, _id } = userData;

  const user = await User.isUserExistsByEmail(email as string);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");

  const post = await Post.findById(postId);
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post doesn't exist!");

  const userId = new Types.ObjectId(_id as string);

  if (post.downVotes.some((downvoteId) => downvoteId.equals(userId))) {
    throw new AppError(httpStatus.BAD_REQUEST, 'You already downvote this post!');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (post.upVotes.some((upvoteId) => upvoteId.equals(userId))) {
      await Post.findByIdAndUpdate(postId, { $pull: { upVotes: _id } }, { new: true, runValidators: true, session });
    }

    const result = await Post.findByIdAndUpdate(postId, { $addToSet: { downVotes: _id } }, { new: true, runValidators: true, session }).populate('downVotes');

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const removePostDownvoteFromDB = async (postId: string, userData: Record<string, unknown>) => {
  const { email, _id } = userData;

  const user = await User.isUserExistsByEmail(email as string);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");

  const post = await Post.findById(postId);
  if (!post) throw new AppError(httpStatus.NOT_FOUND, "Post doesn't exist!");

  const userId = new Types.ObjectId(_id as string);

  if (!post.downVotes.some((downvoteId) => downvoteId.equals(userId))) {
    throw new AppError(httpStatus.BAD_REQUEST, "You have't downvote this post!");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Post.findByIdAndUpdate(postId, { $pull: { downVotes: _id } }, { new: true, runValidators: true, session }).populate('downVotes');

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  deletePostFromDB,
  addPostUpvoteIntoDB,
  removePostUpvoteFromDB,
  addPostDownvoteIntoDB,
  removePostDownvoteFromDB,
};
