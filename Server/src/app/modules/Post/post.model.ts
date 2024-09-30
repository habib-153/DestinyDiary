import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";
import { POST_STATUS, PostCategory } from "./post.constant";

const postSchema = new Schema<TPost>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    category: { type: String, required: true , enum: {values: PostCategory, message: '{VALUE} is not supported'}},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    status: {type: String, enum: Object.keys(POST_STATUS), default: POST_STATUS.BASIC},
    upVotes: {type: Number, default: 0},
    downVotes: {type: Number, default: 0},
    isDeleted: {type: Boolean, default: false},
},
{
    timestamps: true,
    versionKey: false,
})

export const Post = model<TPost>('Post', postSchema);