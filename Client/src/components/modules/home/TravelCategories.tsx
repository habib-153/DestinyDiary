"use client";
import { Card, CardBody } from "@nextui-org/card";
import {
  Plane,
  Globe,
  Map,
  Hotel,
  Mountain,
  BriefcaseBusiness,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const TravelCategories = () => {
  const router = useRouter();

  const categories = [
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Adventure",
      description: "Discover thrilling adventures worldwide",
    },
    {
      icon: <Mountain className="w-8 h-8" />,
      title: "Mountain Hiking",
      description: "Explore majestic peaks",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Exploration",
      description: "Explore the world",
    },
    {
      icon: <BriefcaseBusiness className="w-8 h-8" />,
      title: "Business Travel",
      description: "Travel for work with ease",
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Family Vacation",
      description: "Create lasting memories with your loved ones",
    },
    {
      icon: <Hotel className="w-8 h-8" />,
      title: "Luxury Travel",
      description: "Indulge in premium comfort",
    },
    {
      icon: <Hotel className="w-8 h-8" />,
      title: "Relaxation",
      description: "Unwind and rejuvenate",
    },
  ];

  const handleCategoryClick = (category: string) => {
    router.push(`/posts?category=${category}`);
  };

  return (
    <div className="my-8">
      <h2 className="text-3xl font-bold text-center mb-4">Travel Categories</h2>
      <p className="text-default-500 text-center mb-12 max-w-2xl mx-auto">
        Explore different ways to experience the world
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card
            key={index}
            isHoverable
            isPressable
            className="border-none"
            onClick={() => handleCategoryClick(category.title)}
          >
            <CardBody className="flex flex-col items-center p-6">
              <div className="text-primary mb-4 ">{category.icon}</div>
              <h3 className="font-semibold text-center mb-2">
                {category.title}
              </h3>
              <p className="text-default-500 text-center text-sm mb-4">
                {category.description}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};
