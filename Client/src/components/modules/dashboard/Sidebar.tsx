import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import React from "react";

interface ISidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  specificLinks: ISidebarLink[];
  commonLinks: ISidebarLink[];
  title: string;
}

const Sidebar = ({ specificLinks, commonLinks, title }: SidebarProps) => {
  return (
    <>
      <aside className="hidden w-64 border-r border-gray-200 bg-white p-4 lg:block">
        <div className="mb-6">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-500">ADMIN</h3>
            <nav className="space-y-1">
              {specificLinks.map((link) => (
                <Link
                  key={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
                  href={link.href}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          <Divider />
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-500">
              GENERAL
            </h3>
            <nav className="space-y-1">
              {commonLinks.map((link) => (
                <Link
                  key={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
                  href={link.href}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
