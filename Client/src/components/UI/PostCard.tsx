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
  Printer,
} from "lucide-react";
import parse from "html-react-parser";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { Tooltip } from "@nextui-org/tooltip";

import UpdatePostModal from "./modal/PostModals/UpdatePostModal";
import AuthModal from "./modal/AuthModal/AuthModal";

import { IPost } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import {
  useAddDownVotePost,
  useAddUpVotePost,
  useDeletePost,
  useRemoveDownVoteFromPost,
  useRemoveUpVoteFromPost,
} from "@/src/hooks/post.hook";
import { useFollowUser, useUnfollowUser } from "@/src/hooks/user.hook";

const PostCard = ({ post, full }: { post: IPost; full: boolean }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: upVotePost } = useAddUpVotePost();
  const { mutate: downVotePost } = useAddDownVotePost();
  const { mutate: removeUpVoteFormPost } = useRemoveUpVoteFromPost();
  const { mutate: removeDownVoteFormPost } = useRemoveDownVoteFromPost();
  const { mutate: followUser } = useFollowUser();
  const { mutate: unFollowUser } = useUnfollowUser();
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [openAuthModal, setOpenAuthModal] = useState(false);

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

  const handleUpVote = async (postId: string, cond: boolean) => {
    if (cond) {
      removeUpVoteFormPost({ id: postId });
    } else {
      upVotePost({ id: postId });
    }
  };

  const handleDownVote = (postId: string, cond: boolean) => {
    if (cond) {
      removeDownVoteFormPost({ id: postId });
    } else {
      downVotePost({ id: postId });
    }
  };

  const handleDelete = (postId: string) => {
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
        deletePost({ id: postId });

        router.push("/posts");
      }
    });
  };

  const isFollowing = (userId: string) => {
    return author?.followers?.some(
      (followedUser) => followedUser?._id === userId
    );
  };

  const handleFollow = (id: string, name: string) => {
    followUser({ id, name });
  };

  const handleUnFollow = (id: string, name: string) => {
    unFollowUser({ id, name });
  };

  const isPremiumUser = user?.status === "PREMIUM";

  return (
    <NextUiCard
      ref={contentRef}
      className="cursor-pointer hover:shadow-lg transition-shadow"
    >
      <CardHeader className="justify-between">
        <div className="flex gap-3 items-center">
          <Tooltip content={<span>View Profile</span>}>
          <Link href={`profile/${author?._id}`}>
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
          </Link>
            
          </Tooltip>
          <div>
            {
             !isAuthorOrAdmin ? <div> {user && isFollowing(user?._id as string) ? (
              <Button
                color="danger"
                size="sm"
                variant="flat"
                onClick={() =>
                  handleUnFollow(author?._id as string, author?.name as string)
                }
              >
                Unfollow
              </Button>
            ) : (
              <Button
                color="primary"
                size="sm"
                variant="flat"
                onClick={() =>
                  handleFollow(author?._id as string, author?.name as string)
                }
              >
                Follow
              </Button>
            )}</div> : <div />
            }
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
          {/* {isAuthorOrAdmin ? ( */}
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
            {isAuthorOrAdmin ? (
              <DropdownMenu aria-label="Post actions">
                <DropdownItem
                  key="edit"
                  startContent={<Edit className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEditModal(true);
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
                <DropdownItem
                  key="print"
                  startContent={<Edit className="w-4 h-4" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEditModal(true);
                  }}
                >
                  Print Post
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu aria-label="Post actions">
                <DropdownItem
                  key="print"
                  startContent={<Printer className="w-4 h-4" />}
                  onClick={() => reactToPrintFn()}
                >
                  Print Post
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </div>
      </CardHeader>
      {status === "PREMIUM" && !isPremiumUser ? (
        <CardBody className="px-3 py-0">
          <div className="flex flex-col items-center justify-center h-full">
            <Lock className="w-10 h-10 text-gray-400" />
            <p className="text-gray-400">
              This post is only accessible to premium and verified users.
            </p>
          </div>
        </CardBody>
      ) : (
        <div>
          <Link href={`/posts/${_id}`}>
            <CardBody className="px-3 py-0">
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <div className="w-full flex justify-center">
                <Image
                  alt={title}
                  className={`${!full ? "h-[370px]" : "w-full"} rounded-xl mb-3`}
                  src={image}
                  width={full ? "80%" : "100%"}
                />
              </div>
              <div className="text-small text-default-600">
                {full
                  ? parse(description)
                  : parse(truncateDescription(description, 150))}
              </div>
            </CardBody>
          </Link>
          <CardFooter className="gap-3">
            {isUpVoted(user?._id as string) ? (
              <Button
                color="primary"
                startContent={<ThumbsUp className="w-4 h-4" />}
                variant="solid"
                onClick={() => { user ?
                  handleUpVote(_id as string, true) : setOpenAuthModal(true);
                }}
              >
                {upvoteCount}
              </Button>
            ) : (
              <Button
                color="primary"
                startContent={<ThumbsUp className="w-4 h-4" />}
                variant="light"
                onClick={() => { user ?
                  handleUpVote(_id as string, false) : setOpenAuthModal(true);
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
                if (user) {
                  isDownVoted(user._id as string)
                    ? handleDownVote(_id as string, true)
                    : handleDownVote(_id as string, false);
                } else {
                  setOpenAuthModal(true);
                }
              }}
            >
              {downvoteCount}
            </Button>
          </CardFooter>
        </div>
      )}
      {
        <UpdatePostModal
          isOpen={openEditModal}
          post={post}
          setIsOpen={setOpenEditModal}
        />
      }
      {openAuthModal && (
        <AuthModal
          openAuthModal={openAuthModal}
          setOpenAuthModal={setOpenAuthModal}
        />
      )}
    </NextUiCard>
  );
};

export default PostCard;
