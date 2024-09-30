import { ReactNode } from "react";

export default function layout({
  children,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}