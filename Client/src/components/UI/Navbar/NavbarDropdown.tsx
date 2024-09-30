"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import { IUser } from "@/src/types";
import { protectedRoutes } from "@/src/constant";

interface IProps {
  user: IUser;
}

export default function NavbarDropdown({ user }: IProps) {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }

    toast.success("Logged out successfully");
  };

  return (
    <div className="flex items-center gap-4">
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          size="md"
          src={user?.profilePhoto}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue={`Signed in as ${user.email}`}>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="my-profile" textValue="My Profile">My Profile</DropdownItem>
        <DropdownItem key='dashboard' textValue="Dashboard">Dashboard</DropdownItem>
        <DropdownItem key='create-a-post' textValue="Create a Post">Create a Post</DropdownItem>
        <DropdownItem key="help_and_feedback" textValue="Help & Feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger" textValue="Log Out" onClick={() => handleLogout()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
  );
}