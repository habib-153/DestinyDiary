'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");

      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Thank you for subscribing! 🎉", {
        description: "You'll receive our latest updates in your inbox.",
        duration: 3000
      });
      setEmail('');
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b light:from-white light:to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text ">
              Stay Connected with Our Newsletter
            </h2>
            <p className="text-default-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Join our community of travel enthusiasts! Get exclusive access to travel tips, 
              destination guides, and special offers delivered straight to your inbox.
            </p>
          </div>

          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                className="flex-1"
                classNames={{
                  input: "text-sm",
                  inputWrapper: "shadow-sm"
                }}
                name="email"
                placeholder="Enter your email address"
                size="lg"
                startContent={
                  <Mail className="w-4 h-4 text-default-400" />
                }
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="w-full sm:w-auto px-8 bg-[#FE6244] text-white"
                isLoading={isLoading}
                size="lg"
                type="submit"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-xs ">
            By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;