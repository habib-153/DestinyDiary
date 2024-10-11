import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import ContactForm from "@/src/components/UI/Contact/ContactForm";

export default function ContactUs() {

  return (
    <div className="container mx-auto mb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Contact Form */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-[#1A5F7A] mb-4">
            Get in Touch
          </h1>

          <Card className="">
            <CardBody className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#001524] mb-2">
                Send Us a Message
              </h2>
              <ContactForm />
            </CardBody>
          </Card>
        </div>

        {/* Right Column - Contact Information */}
        <div className="space-y-6">
          <Card className="bg-[#1A5F7A] text-white">
            <CardBody>
              <h2 className="text-2xl font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Email Us</h3>
                    <p className="opacity-90">support@destinydiary.com</p>
                    <p className="text-sm opacity-70">
                      We&rsquo;ll respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Call Us</h3>
                    <p className="opacity-90">+1 (555) 123-4567</p>
                    <p className="text-sm opacity-70">
                      Monday to Friday, 9am - 6pm
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Visit Us</h3>
                    <p className="opacity-90">123 Adventure Street</p>
                    <p className="opacity-90">Explore City, EC 12345</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="opacity-90">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="opacity-90">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="opacity-90">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-[#F1DEC9]">
            <CardBody>
              <h2 className="text-2xl font-semibold mb-4 text-[#001524]">
                FAQ
              </h2>
              <Divider className="my-4" />
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#1A5F7A]">
                    How quickly can I expect a response?
                  </h3>
                  <p className="text-[#4F6F52]">
                    We strive to respond to all inquiries within 24 hours during
                    business days.
                  </p>
                </div>
                <Divider className="my-4" />
                <div>
                  <h3 className="font-semibold text-[#1A5F7A]">
                    Can I visit your office?
                  </h3>
                  <p className="text-[#4F6F52]">
                    Yes! We welcome visitors during our business hours. Feel
                    free to stop by.
                  </p>
                </div>
                <Divider className="my-4" />
                <div>
                  <h3 className="font-semibold text-[#1A5F7A]">
                    Do you offer emergency support?
                  </h3>
                  <p className="text-[#4F6F52]">
                    For urgent matters, premium members can access our 24/7
                    emergency support line.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}