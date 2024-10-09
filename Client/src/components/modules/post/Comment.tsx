"use client";

import React, { useState } from "react";
import { MessageCircle, Pencil, Trash2, Send } from "lucide-react";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/tooltip";
import Swal from "sweetalert2";

import { IComment, IUser } from "@/src/types";
import {
  useDeleteComment,
  useGetPostAllComments,
  usePostAComment,
  useUpdateComment,
} from "@/src/hooks/post.hook";

interface CommentSectionProps {
  postId: string;
  user: IUser | null;
  // refetch: any;
}

interface EditedComments {
  [key: string]: string;
}

export default function CommentSection({ postId, user }: CommentSectionProps) {
  const [comment, setComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editedComments, setEditedComments] = useState<EditedComments>({});

  const { mutate: postComment } = usePostAComment();
  const { mutate: updateComment } = useUpdateComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { data } = useGetPostAllComments(postId);

  const comments = data?.data?.result

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handlePostAComment = () => {
    const commentData = {
      user: user?._id,
      post: postId,
      comment: comment.trim(),
    };

    try {
      postComment(commentData as IComment);
    } catch (error: any) {

    }
    setComment("");
  };

  const handleEdit = (commentId: string, text: string) => {
    setIsEditing(commentId);
    setEditedComments({ ...editedComments, [commentId]: text });
  };

  const handleEditCommentChange = (
    commentId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedComments({ ...editedComments, [commentId]: e.target.value });
  };

  const handleUpdateComment = (commentId: string) => {
    const updatedComment = editedComments[commentId]?.trim();

    const payload = {
      comment: updatedComment,
    };

    updateComment({ id: commentId, updatedComment: payload });
    setIsEditing(null);
    setEditedComments({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditedComments({});
  };

  const handleDeleteComment = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteComment({ id: id });
      }
    });
  };

  return (
    <div className="mt-8">
      <div className="flex items-center mb-4">
        <MessageCircle className="text-primary mr-2" />
        <span className="text-lg font-bold">
          {comments?.length || 0} Comments
        </span>
      </div>

      <div className="relative mb-6">
        <Input
          endContent={
            <Send
              className="text-primary cursor-pointer"
              onClick={handlePostAComment}
            />
          }
          placeholder="Write a comment"
          size="lg"
          type="text"
          value={comment}
          variant="bordered"
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-6 my-4">
        {comments?.map((comment: IComment) => (
          <div key={comment._id} className="flex gap-4 p-3 bg-[#f7f7f7f0] shadow-lg rounded-xl ">
            <Avatar
              alt={comment.user?.name}
              className="w-10 h-10"
              src={comment.user?.profilePhoto}
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{comment?.user?.name}</h4>
                  <span className="text-sm text-default-400">
                    {new Date(comment.createdAt as string).toLocaleString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}
                  </span>
                </div>

                {comment.user?._id === user?._id && !isEditing && (
                  <div className="flex gap-2">
                    <Tooltip content="Edit Comment">
                      <button
                        className="p-1 rounded-full bg-primary/10 hover:bg-primary/20"
                        title="Edit Comment"
                        onClick={() =>
                          handleEdit(comment._id as string, comment.comment)
                        }
                      >
                        <Pencil className="w-4 h-4 text-primary" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Delete Comment">
                      <button
                        className="p-1 rounded-full bg-danger/10 hover:bg-danger/20"
                        title="Delete Comment"
                        onClick={() => {
                          handleDeleteComment(comment?._id as string);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-danger" />
                      </button>
                    </Tooltip>
                  </div>
                )}
              </div>

              {isEditing === comment._id ? (
                <div className="mt-2 flex gap-2">
                  <Input
                    endContent={
                      <Send
                        className="text-primary cursor-pointer"
                        onClick={() =>
                          handleUpdateComment(comment?._id as string)
                        }
                      />
                    }
                    type="text"
                    value={editedComments[comment._id] || ""}
                    onChange={(e) =>
                      handleEditCommentChange(comment?._id as string, e)
                    }
                  />
                  <button
                    className="px-3 py-1 rounded-md text-danger border border-danger"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="mt-1">{comment?.comment}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
