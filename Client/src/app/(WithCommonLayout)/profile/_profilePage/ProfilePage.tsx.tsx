"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Tab, Tabs } from "@nextui-org/tabs";
import { BadgeCheck, BookOpen, Edit, Users } from "lucide-react";
import { useState } from "react";

import { IPost, IUser } from "@/src/types";
import { useGetAllPosts } from "@/src/hooks/post.hook";
import envConfig from "@/src/config/envConfig";
import PostCard from "@/src/components/UI/PostCard";

const ProfilePage = ({ user }: { user: IUser }) => {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openVerifyProfileModal, setOpenVerifyProfileModal] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const {
    name,
    email,
    profilePhoto,
    status,
    isVerified,
    followers,
    following,
    totalUpVotes,
  } = user as IUser;

  const apiUrl = `${envConfig.baseApi}/posts?${new URLSearchParams({
    ...{ searchTerm: email },
  }).toString()}`;

  const { data: postData } = useGetAllPosts(apiUrl);
  const posts = postData?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="md:w-1/4">
            <div className="relative">
              <Avatar
                className="w-24 my-auto h-auto aspect-square"
                imgProps={{
                  className: "object-cover",
                }}
                src={profilePhoto}
              />
              {status === "BASIC" && (
                <Chip
                  className="absolute top-4 right-4"
                  color="warning"
                  variant="shadow"
                >
                  PREMIUM
                </Chip>
              )}
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="md:w-2/3 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{name}</h1>
                  {isVerified && (
                    <BadgeCheck className="w-6 h-6 text-primary" />
                  )}
                </div>
                <p className="text-gray-500">{email}</p>
              </div>
              <Button
                color="primary"
                startContent={<Edit className="w-4 h-4" />}
                variant="bordered"
                onPress={() => setOpenEditProfileModal(true)}
              >
                Edit Profile
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-xl font-semibold">
                    {posts ? posts.length : 0}
                  </p>
                  <p className="text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold">
                    {followers?.length || 0}
                  </p>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold">
                    {following?.length || 0}
                  </p>
                  <p className="text-gray-500">Following</p>
                </div>
              </div>
              <div>
                {!isVerified && totalUpVotes > 1 && (
                  <Button
                    color="primary"
                    startContent={<BadgeCheck className="w-4 h-4" />}
                    variant="flat"
                    onPress={() => setOpenVerifyProfileModal(true)}
                  >
                    Get Verified
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-8 text-center">
        <Tabs
          selectedKey={activeTab}
          onSelectionChange={(key) => setActiveTab(key as string)}
        >
          <Tab
            key="posts"
            title={
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Posts</span>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {posts?.map((post: IPost, index: number) => (
                <PostCard key={index} post={post} />
              ))}
            </div>
          </Tab>
          <Tab
            key="followers"
            title={
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Followers</span>
              </div>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {/* Render followers here */}
              {followers?.map((follower, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="lg" src={follower.profilePhoto} />
                    <div>
                      <p className="font-semibold">{follower.name}</p>
                      <Button color="primary" size="sm" variant="flat">
                        Follow Back
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tab>
          <Tab
            key="following"
            title={
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Following</span>
              </div>
            }
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              {/* Render following users here */}
              {following?.map((followedUser, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="lg" src={followedUser.profilePhoto} />
                    <div className="space-y-1">
                      <p className="font-semibold flex gap-2 items-center">
                        {followedUser.name}
                        {isVerified && (
                          <BadgeCheck className="w-6 h-6 text-primary" />
                        )}
                      </p>
                      <Button color="danger" size="sm">
                        Unfollow
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* {openEditProfileModal && (
          <ProfileEditModal
            openModal={openEditProfileModal}
            setOpenModal={setOpenEditProfileModal}
            user={user}
          />
        )}
  
        {openVerifyProfileModal && (
          <VerifyModal
            openModal={openVerifyProfileModal}
            setOpenModal={setOpenVerifyProfileModal}
          />
        )} */}
    </div>
  );
};

export default ProfilePage;
