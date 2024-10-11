/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Heart, Users, Globe, Compass } from "lucide-react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Image from "next/image";

import img1 from "@/src/assets/about1.webp";
import img2 from "@/src/assets/about2.jpg";

export default function AboutUs() {
  return (
    <div className="container mx-auto mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Mission and Vision */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-[#1A5F7A] mb-4">
            About DestinyDiary
          </h1>

          <Card className="bg-[#F1DEC9]">
            <CardHeader className="text-2xl font-semibold text-[#001524]">
              Our Mission
            </CardHeader>
            <CardBody>
              <p className="text-[#4F6F52]">
                Empowering travelers to explore the world through shared
                experiences and authentic connections. We believe every journey
                becomes richer when wisdom is shared and stories are told.
              </p>
            </CardBody>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white">
              <CardBody className="text-center">
                <Users className="mx-auto mb-2 text-[#FE6244]" size={32} />
                <h3 className="font-semibold mb-1">Community First</h3>
                <p className="text-sm text-[#4F6F52]">
                  Built by travelers, for travelers
                </p>
              </CardBody>
            </Card>

            <Card className="bg-white">
              <CardBody className="text-center">
                <Globe className="mx-auto mb-2 text-[#FE6244]" size={32} />
                <h3 className="font-semibold mb-1">Global Reach</h3>
                <p className="text-sm text-[#4F6F52]">
                  Connecting explorers worldwide
                </p>
              </CardBody>
            </Card>
          </div>

          <Button
            className="w-full bg-[#FE6244] text-white"
            endContent={<Heart className="ml-2" />}
          >
            Join Our Community
          </Button>
          <Image
            alt="Travel community sharing experiences"
            className="object-cover rounded-lg"
            height={400}
            src={img2}
            width={800}
          />
        </div>

        {/* Right Column - Features and Image */}
        <div className="space-y-6">
          <Card className="bg-[#1A5F7A] text-white">
            <CardBody>
              <h2 className="text-2xl font-semibold mb-4">
                What Sets Us Apart
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Compass className="mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Personal Travel Stories</h3>
                    <p className="text-sm opacity-90">
                      Real experiences from real travelers
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Users className="mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Engaged Community</h3>
                    <p className="text-sm opacity-90">
                      Connect with fellow adventurers
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Globe className="mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Premium Content</h3>
                    <p className="text-sm opacity-90">
                      Exclusive guides and insider tips
                    </p>
                  </div>
                </li>
              </ul>
            </CardBody>
          </Card>
          <div>
            <h2 className="text-2xl font-semibold text-[#001524]">Our Team</h2>
            <Image
              alt="Travel community sharing experiences"
              className="object-cover rounded-lg"
              height={400}
              src={img1}
              width={800}
            />
          </div>

          <Card className="bg-white">
            <CardBody>
              <h2 className="text-2xl font-semibold mb-2 text-[#1A5F7A]">
                Our Impact
              </h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-[#FE6244]">10K+</p>
                  <p className="text-sm text-[#4F6F52]">Active Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FE6244]">50K+</p>
                  <p className="text-sm text-[#4F6F52]">Travel Stories</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FE6244]">100+</p>
                  <p className="text-sm text-[#4F6F52]">Countries Covered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#FE6244]">1M+</p>
                  <p className="text-sm text-[#4F6F52]">Monthly Views</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
