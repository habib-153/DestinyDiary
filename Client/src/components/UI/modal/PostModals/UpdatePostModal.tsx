"use client";
import React, { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Image, PenLine, ImagePlus } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@nextui-org/checkbox";

import { useUpdatePost } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

interface IPostModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  post: IPost;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const travelCategories = [
  { key: "Adventure", label: "Adventure", icon: "🏔️" },
  { key: "Business Travel", label: "Business Travel", icon: "💼" },
  { key: "Exploration", label: "Exploration", icon: "🧭" },
  { key: "Family Vacation", label: "Family Vacation", icon: "👨‍👩‍👧‍👦" },
  { key: "Luxury Travel", label: "Luxury Travel", icon: "✨" },
  { key: "Relaxation", label: "Relaxation", icon: "💰" },
];

export default function UpdatePostModal({
  isOpen,
  setIsOpen,
  post,
}: IPostModalProps) {
  const [selectedTab, setSelectedTab] = useState("write");
  const [content, setContent] = useState(post.description);
  const [imagePreview, setImagePreview] = useState(
    post?.image as string | null
  );
  const { control, handleSubmit, setValue, formState } = useForm();
  const { errors } = formState;
  const [isSelected, setIsSelected] = useState(
    post?.status === "PREMIUM" ? true : false
  );

  const { mutate: updatePost } = useUpdatePost();

  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      ["clean"],
    ],
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setValue("image", file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();

    const postData = {
      title: data?.title || post?.title,
      category: data?.category || post?.category,
      description: data?.description || post?.description,
      status: isSelected ? "PREMIUM" : post?.status,
    };

    formData.append("data", JSON.stringify(postData));
    if(data?.image){
        formData.append("image", data.image);
    }
    // formData.append("image", data.image);

    updatePost({ postData: formData, id: post?._id as string });
    setIsOpen(false);
    // reset();
    // setImagePreview(null);
    // setContent("");
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        scrollBehavior="outside"
        size="3xl"
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">Share Your Travel Story</h2>
                <p className="text-sm text-gray-500">
                  Inspire others with your journey
                </p>
              </ModalHeader>
              <ModalBody>
                <Tabs
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                >
                  <Tab
                    key="write"
                    title={
                      <div className="flex items-center space-x-2">
                        <PenLine size={18} />
                        <span>Write</span>
                      </div>
                    }
                  >
                    <div className="space-y-4 py-2">
                      <Controller
                        control={control}
                        name="title"
                        render={({ field }) => (
                          <Input
                            required
                            {...field}
                            defaultValue={post.title}
                            label="Title"
                            labelPlacement="outside"
                            placeholder="Give your story a captivating title"
                          />
                        )}
                        rules={{ required: "Please provide a title" }}
                      />

                      <div>
                        <Controller
                          control={control}
                          name="description"
                          render={({ field }) => (
                            <div className="w-full space-y-3">
                              <label
                                className="font-semibold"
                                htmlFor="description"
                              >
                                Post Description
                              </label>
                              <ReactQuill
                                {...field}
                                className="h-[110px]"
                                modules={quillModules}
                                value={content}
                                onChange={(value) => {
                                  setContent(value);
                                  field.onChange(value);
                                }}
                              />
                            </div>
                          )}
                        />
                        {errors.description && (
                          <p className="text-red-500 mt-12">
                            {errors.description.message as ReactNode}
                          </p>
                        )}
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    key="enhance"
                    title={
                      <div className="flex items-center space-x-2">
                        <ImagePlus size={18} />
                        <span>Enhance</span>
                      </div>
                    }
                  >
                    <div className="space-y-4 py-2">
                      <div>
                        {/* <label className="text-sm font-medium mb-2 block">Category</label> */}
                        <Controller
                          control={control}
                          defaultValue={post?.category}
                          name="category"
                          render={({ field }) => (
                            <div className="flex flex-wrap gap-2">
                              {travelCategories.map((category) => (
                                <Chip
                                  key={category.key}
                                  className="cursor-pointer"
                                  color={
                                    field.value === category.key
                                      ? "primary"
                                      : "default"
                                  }
                                  variant={
                                    field.value === category.key
                                      ? "solid"
                                      : "bordered"
                                  }
                                  onClick={() => field.onChange(category.key)}
                                >
                                  {category.icon} {category.label}
                                </Chip>
                              ))}
                            </div>
                          )}
                          rules={{ required: "Please select a category" }}
                        />
                      </div>

                      <Card>
                        <CardBody>
                          <Checkbox
                            isSelected={isSelected}
                            onValueChange={setIsSelected}
                          >
                            Mark as Premium
                          </Checkbox>
                        </CardBody>
                      </Card>

                      <div>
                        {/* <label className="text-sm font-medium mb-2 block">Cover Image</label> */}
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          {imagePreview ? (
                            <div className="relative">
                              <img
                                alt="Preview"
                                className="mx-auto max-h-48 rounded"
                                src={imagePreview}
                              />
                              <Button
                                className="absolute top-2 right-2"
                                color="danger"
                                size="sm"
                                variant="flat"
                                onPress={() => {
                                  setImagePreview(null);
                                  setValue("image", null);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div>
                              <Image className="mx-auto h-12 w-12 text-gray-400" />
                              <div className="mt-4 flex text-sm text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600">
                                  <span>Upload a file</span>
                                  <input
                                    required
                                    accept="image/*"
                                    className="sr-only"
                                    defaultValue={post?.image}
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter className="my-8">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  Save Post
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
