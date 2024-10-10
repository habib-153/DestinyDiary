import type { Metadata } from "next";

import {
  Home,
  User,
  MessageSquareQuote,
  Contact,
  ContactRound,
  BookOpenText,
  BadgeDollarSign,
} from "lucide-react";

import Sidebar from "@/src/components/modules/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Discover, share, and explore travel stories, tips, and guides from a community of travel enthusiasts. Plan your next adventure with expert advice and unique insights into destinations around the world.",
};

export default function AdminDashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const adminLinks = [
      {
        label: "Dashboard",
        href: "/admin-dashboard",
        icon: <Home size={18} />,
      },
      {
        label: "Users",
        href: "/admin-dashboard/users",
        icon: <User size={18} />,
      },
      {
        label: "Content",
        href: "/admin-dashboard/posts",
        icon: <BookOpenText size={18} />,
      },
      {
        label: "Payments",
        href: "/admin-dashboard/payments",
        icon: <BadgeDollarSign size={18} />,
      },
    ];
  
    const commonLinks = [
      {
        label: "NewsFeed",
        href: "/",
        icon: <MessageSquareQuote size={18} />,
      },
      {
        label: "About",
        href: "/about",
        icon: <ContactRound size={18} />,
      },
      {
        label: "Contact",
        href: "/contact",
        icon: <Contact size={18} />,
      },
    ];
  
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar commonLinks={commonLinks} specificLinks={adminLinks} title="Admin Panel" />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    );
  }