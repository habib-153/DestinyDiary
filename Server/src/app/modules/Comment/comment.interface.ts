import { Types } from "mongoose"

export type TComment ={
    user: Types.ObjectId;
    post: Types.ObjectId;
    comment: string;
}