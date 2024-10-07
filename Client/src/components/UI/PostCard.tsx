import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import {
  ThumbsDown,
  ThumbsUp,
  Crown,
  MoreVertical,
  Edit,
  Trash,
  Lock,
} from "lucide-react";
import parse from "html-react-parser";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Link from "next/link";

import { IPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { useAddDownVotePost, useAddUpVotePost, useRemoveDownVoteFromPost, useRemoveUpVoteFromPost } from "@/src/hooks/post.hook";

const PostCard = ({ post }: { post: IPost }) => {
  const { user } = useUser();
  const {mutate: upVotePost} = useAddUpVotePost()
  const {mutate: downVotePost} = useAddDownVotePost()
  const {mutate: removeUpVoteFormPost} = useRemoveUpVoteFromPost()
  const {mutate: removeDownVoteFormPost} = useRemoveDownVoteFromPost()

  const {
    _id,
    title,
    category,
    description,
    image,
    author,
    status,
    upvoteCount,
    downvoteCount,
    downVotes,
    upVotes,
  } = post || {};

  const truncateDescription = (text: string, charLimit: number) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }

    return text;
  };

  const isAuthorOrAdmin =
    user && (user._id === author?._id || user.role === "ADMIN");
  const isUpVoted = (userId: string) => {
    return upVotes?.some((user) => user._id === userId);
  };
  const isDownVoted = (userId: string) => {
    return downVotes?.some((user) => user._id === userId);
  };

  const handleUpVote = (postId: string, cond: boolean) => {
    if (cond) {
      removeUpVoteFormPost({id: postId})
    } else {
      upVotePost({id: postId})
    }
  };

  const handleDownVote = (postId: string, cond: boolean) => {
    if (cond) {
      removeDownVoteFormPost({id: postId})
    } else {
      downVotePost({id: postId})
    }
  };

  const handleEdit = (postId: string) => {
    // Implement edit logic, e.g., open edit modal
  };

  const handleDelete = (postId: string) => {
    // Implement delete logic, e.g., open confirmation modal
  };

  const isPremiumUser = user?.status === "PREMIUM";
  console.log("isPremiumUser", isPremiumUser);

  return (
    <NextUiCard className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar size="sm" src={author?.profilePhoto} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none">
              {author?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {category}
            </h5>
          </div>
        </div>
        <div className="flex gap-2">
          {status === "PREMIUM" && (
            <Chip
              color="warning"
              startContent={<Crown className="w-4 h-4 text-yellow-500" />}
              variant="flat"
            >
              Premium
            </Chip>
          )}
          {isAuthorOrAdmin && (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Post actions">
                <DropdownItem
                  key="edit"
                  startContent={<Edit className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(_id as string);
                  }}
                >
                  Edit post
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  startContent={<Trash className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(_id as string);
                  }}
                >
                  Delete post
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
      </CardHeader>
      {status === "PREMIUM" && !isPremiumUser ? (
        <CardBody className="px-3 py-0">
          <div className="flex flex-col items-center justify-center h-full">
            <Lock className="w-10 h-10 text-gray-400" />
            <p className="text-gray-400">This post is only accessible to premium and verified users.</p>
          </div>
        </CardBody>
      ) : (
        <div>
          <Link href={`/posts/${_id}`}>
          <CardBody className="px-3 py-0">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <Image
              alt={title}
              className="w-full sm:h-[370px] rounded-xl mb-3"
              src={image}
            />
            <div className="text-small text-default-400">
              {parse(truncateDescription(description, 150))}
            </div>
          </CardBody>
        </Link>
        <CardFooter className="gap-3">
        {isUpVoted(user?._id as string) ? (
          <Button
            color="primary"
            startContent={<ThumbsUp className="w-4 h-4" />}
            variant="solid"
            onClick={() => {
              handleUpVote(_id as string, true);
            }}
          >
            {upvoteCount}
          </Button>
        ) : (
          <Button
            color="primary"
            startContent={<ThumbsUp className="w-4 h-4" />}
            variant="light"
            onClick={() => {
              handleUpVote(_id as string, false);
            }}
          >
            {upvoteCount}
          </Button>
        )}
        <Button
          color="danger"
          startContent={<ThumbsDown className="w-4 h-4" />}
          variant={isDownVoted(user?._id as string) ? "solid" : "light"}
          onClick={(e) => {
            e.stopPropagation();
            isDownVoted(user?._id as string)
              ? handleDownVote(_id as string, true)
              : handleDownVote(_id as string, false);
          }}
        >
          {downvoteCount}
        </Button>
      </CardFooter>
        </div>
      )}
      
    </NextUiCard>
  );
};

export default PostCard;