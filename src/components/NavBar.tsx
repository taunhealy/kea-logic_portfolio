"use client";

import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { signOutUser } from "@/features/auth/actions/authActions";
interface NavBarProps {
  user: any;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const dispatch = useDispatch();

  const handleSignOut = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    dispatch(signOutUser()); // Dispatch the sign-out action
  };

  return (
    <div
      className="flex h-20 w-screen items-center justify-between px-[20px] md:px-[70px]"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <nav className="flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/posts">Posts</Link>
      </nav>
      <ul className="flex items-center gap-x-4">
        {user ? (
          <li>
            <form onSubmit={handleSignOut}>
              <button type="submit">Sign Out</button>
            </form>
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
    </div>
  );
};

export default NavBar;
