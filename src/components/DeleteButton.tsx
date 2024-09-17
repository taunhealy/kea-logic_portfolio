"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deletePostBySlug } from "@/features/posts/actions/deletePostBySlug";

const DeleteButton = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deletePostBySlug(slug);
      router.refresh(); // Trigger a refresh of the current route
      router.push("/posts"); // Redirect to posts list
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return <button onClick={handleDelete}>Delete Post</button>;
};

export default DeleteButton;
