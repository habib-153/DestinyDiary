import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const POST_STATUS = {
  BASIC: "BASIC",
  PREMIUM: "PREMIUM",
} as const;

export type TPostCategory =
  | "Adventure"
  | "Exploration"
  | "Business Travel"
  | "Family Vacation"
  | "Relaxation"
  | "Luxury Travel";
export interface IPost {
  _id?: string;
  title: string;
  description: string;
  image: string;
  category: TPostCategory;
  author?: IUser;
  status: keyof typeof POST_STATUS;
  upVotes?: number;
  upvoteCount?: number;
  downvoteCount?: number;
  downVotes?: number;
}

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}