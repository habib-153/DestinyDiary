import { Card as NextUiCard, CardHeader, CardFooter, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { ThumbsDown, ThumbsUp, Crown } from "lucide-react";
import parse from "html-react-parser";

import { IPost } from "@/src/types";

const PostCard = ({ post }: { post: IPost }) => {
  const { 
    title, 
    category, 
    description, 
    image, 
    author, 
    status, 
    upvoteCount, 
    downvoteCount
  } = post || {};

  const truncateDescription = (text: string, charLimit: number) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + '...';
    }

    return text;
  };

  return (
    <NextUiCard className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-2 relative">
        <Image
          alt={title}
          className="w-full "
          src={image}
        />
        {status === 'PREMIUM' && (
          <Chip 
            className="absolute top-4 right-4 z-10"
            color="warning"
            startContent={<Crown className="w-4 h-4" />}
            variant="shadow"
          >
            {status}
          </Chip>
        )}
      </CardHeader>
      <CardBody>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <Chip color="primary" variant="flat">{category}</Chip>
        </div>
        <p className="text-gray-500">{parse(truncateDescription(description, 150))}</p>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar size="sm" src={author?.profilePhoto} />
          <span className="text-sm">{author?.name}</span>
        </div>
        <div className="flex gap-4">
          <Button
            startContent={<ThumbsUp size={18} />}
            variant="light"
          >
            {upvoteCount}
          </Button>
          <Button
            startContent={<ThumbsDown size={18} />}
            variant="light"
          >
            {downvoteCount}
          </Button>
        </div>
      </CardFooter>
    </NextUiCard>
  );
};

export default PostCard;