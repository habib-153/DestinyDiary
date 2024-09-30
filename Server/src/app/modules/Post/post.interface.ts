import { Types } from "mongoose";
import { POST_STATUS, TPostCategory } from "./post.constant";

export type TPost = {
    title: string;
    description: string;
    image: string;
    category: TPostCategory
    author: Types.ObjectId
    status: keyof typeof POST_STATUS
    upVotes: number
    downVotes: number
    isDeleted: boolean
}