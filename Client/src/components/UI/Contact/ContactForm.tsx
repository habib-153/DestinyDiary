'use client';

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Mail, Send } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      "Your message has been sent successfully! We'll get back to you shortly."
    );
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <>
      <form className="text-black" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input required className="my-2"
            label="First Name"
            labelPlacement="outside"
            placeholder="John"
            type="text"
          />
          <Input required
          className="my-2"
            label="Last Name"
            labelPlacement="outside"
            placeholder="Doe"
            type="text"
          />
        </div>
        <Input required
          className="my-2"
          label="Email"
          labelPlacement="outside"
          placeholder="johndoe@example.com"
          startContent={<Mail className="text-[#749BC2]" size={16} />} type="email"
        />
        <Input required
          className="my-2"
          label="Subject"
          labelPlacement="outside"
          placeholder="How can we help?" type="text"
        />
        <Textarea className="my-2"
          label="Message"
          labelPlacement="outside"
          minRows={4}
          placeholder="Tell us more about your inquiry..."
        />
        <Button
          className="w-full bg-[#FE6244] text-white"
          endContent={<Send className="ml-2" size={16} />}
          type="submit"
        >
          Send Message
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
