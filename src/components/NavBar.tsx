import Link from "next/link";
import React from "react";
import SignOutButton from "@/features/auth/components/sign-out-button";
import { useAuth } from "@/context/AuthContext"; // Import the useAuth hook

interface NavBarProps {
  user: any; // Adjust the type as needed
}

const NavBar: React.FC = () => {
  const { user, loading } = useAuth(); // Use the useAuth hook to get the user and loading state

  if (loading) {
    return <div>Loading...</div>;
  }

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
