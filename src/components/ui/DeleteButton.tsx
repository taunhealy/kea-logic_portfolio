"use client";

import React from "react";
import { useDeletePost } from "@/features/posts/actions/deletePost"; // Using Tanstack Query
import { useQueryClient } from "@tanstack/react-query";

const DeleteButton = ({ slug }: { slug: string }) => {
  const queryClient = useQueryClient();
  const deletePost = useDeletePost();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost.mutateAsync(slug);
        queryClient.invalidateQueries({ queryKey: ["posts"] }); // This will refetch the posts list
        alert("Post deleted successfully");
      } catch (error) {
        alert("Failed to delete post");
      }
    }
  };

  return (
    <button onClick={handleDelete} disabled={deletePost.isPending}>
      {deletePost.isPending ? "Deleting..." : "Delete Post"}
    </button>
  );
};

export default DeleteButton;
