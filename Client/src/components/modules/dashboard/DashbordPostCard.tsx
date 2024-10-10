"use client";

import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";
import Swal from "sweetalert2";
import { BadgeCheck, Eye, MoreVertical, Trash } from "lucide-react";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import { useDeletePost } from "@/src/hooks/post.hook";

interface ITravelPostCardProps {
  post: any;
  refetch?: any;
}

const DashboardPostCard = ({ post }: ITravelPostCardProps) => {
  const { _id, title, image, author, createdAt } = post;

  const { mutate: deletePost } = useDeletePost();

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
      }
    });
  };

  return (
    <div>
      <Card className="py-4 relative flex flex-col h-full">
        <CardHeader className="pb-0 pt-2 px-4">
          <div className="flex">
            <div className="flex gap-2 items-start">
              <Avatar
                className="object-cover"
                size="sm"
                src={author?.profilePhoto}
              />
              <div>
                <div className="flex items-center">
                  <p className="text-tiny uppercase font-bold">
                    {author?.name}
                  </p>
                  <span>
                    {author?.isVerified && (
                      <BadgeCheck className="w-6 h-6 text-primary" />
                    )}
                  </span>
                </div>

                <small className="text-default-500">
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </small>
              </div>
            </div>
            <div className="mb-5 cursor-pointer w-20">
              <Dropdown closeOnSelect={true}>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="view">
                    <Link href={`/posts/${_id}`}>
                      <span className="flex gap-2 items-center text-primary">
                        <span>
                          <Eye className="w-5 h-5" />
                        </span>
                        <span>View Post</span>
                      </span>
                    </Link>
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
            </div>
          </div>
        </CardHeader>

        <div>
          <h4 className="font-bold text-large flex-grow flex-shrink-0 flex-basis-0 px-4">
            {title}
          </h4>
          <CardBody className="overflow-visible py-2 w-full">
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full"
              height={165}
              src={image}
              width={320}
            />
          </CardBody>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPostCard;
