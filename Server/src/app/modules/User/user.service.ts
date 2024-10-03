import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';
import mongoose from 'mongoose';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);

  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

const addFollowingInDB = async (userData: Record<string, unknown>, followingId: string) => {
  const { email, _id } = userData;

  const user = await User.isUserExistsByEmail(email as string);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");

  const isAlreadyFollowing = await User.findOne({ _id, following: followingId });
  if (isAlreadyFollowing) throw new AppError(httpStatus.BAD_REQUEST, 'Already following this profile!');

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await User.findByIdAndUpdate(
      _id,
      { $addToSet: { following: followingId } },
      { new: true, runValidators: true, session }
    ).populate('following');
    await User.findByIdAndUpdate(
      followingId,
      { $addToSet: { followers: _id } },
      { new: true, runValidators: true, session }
    ).populate('followers');
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const removeFollowingFromDB = async (userData: Record<string, unknown>, followingId: string) => {
  const { email, _id } = userData;

  const user = await User.isUserExistsByEmail(email as string);
  if (!user) throw new AppError(httpStatus.NOT_FOUND, "User doesn't exist!");

  const isAlreadyFollowing = await User.findOne({ _id, following: followingId });
  if (!isAlreadyFollowing) throw new AppError(httpStatus.BAD_REQUEST, 'You are not following this profile!');

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await User.findByIdAndUpdate(
      _id,
      { $pull: { following: followingId } },
      { new: true, runValidators: true, session }
    ).populate('following');
    await User.findByIdAndUpdate(
      followingId,
      { $pull: { followers: _id } },
      { new: true, runValidators: true, session }
    ).populate('followers');
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  addFollowingInDB,
  removeFollowingFromDB,
};
