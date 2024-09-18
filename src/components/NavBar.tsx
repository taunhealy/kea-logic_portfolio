import Link from "next/link";
import React from "react";
import SignOutButton from "@/features/auth/components/sign-out-button";

const NavBar: React.FC<{ user: any }> = ({ user }) => {
  // Specify the type for user
  return (
    <nav
      aria-label="Main Navigation"
      className="flex h-20 w-screen items-center justify-between px-[20px] md:px-[70px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <ul className="flex items-center gap-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/admin/posts">Posts</Link>
        </li>
      </ul>
      <ul className="flex items-center gap-x-4">
        {user ? (
          <li>
            <SignOutButton />
          </li>
        ) : (
          <>
            <li>
              <Link href="/sign-up">Sign Up</Link>
            </li>
            <li>
              <Link href="/sign-in">Sign In</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
