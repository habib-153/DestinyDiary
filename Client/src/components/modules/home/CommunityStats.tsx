'use client';
import React from 'react';
import CountUp from 'react-countup';
import { BookOpen, Globe, Star, Users } from "lucide-react";
import { Card, CardBody } from '@nextui-org/card';

export const CommunityStats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: 1000,
      label: "Active Travelers",
      progress: 85,
      color: "text-blue-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: 1000,
      label: "Destinations",
      progress: 75,
      color: "text-green-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      number: 5000,
      label: "Travel Stories",
      progress: 90,
      color: "text-purple-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      number: 500,
      label: "User Reviews",
      progress: 95,
      color: "text-yellow-500"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Growing Community
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-shadow duration-300 border-none light:bg-white/80 backdrop-blur-lg"
            >
              <CardBody className="flex flex-col items-center p-8">
                <div className={`mb-6 ${stat.color}`}>
                  {stat.icon}
                </div>

                <div className="text-4xl font-bold mb-3">
                  <CountUp
                    duration={2.5}
                    end={stat.number}
                    separator=","
                    suffix="+"
                  />
                </div>

                <div className="text-gray-600 font-medium mb-6">{stat.label}</div>

                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary/80" style={{ width: `${stat.progress}%` }} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunityStats;