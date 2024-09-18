import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string, unknown>({
    mutationFn: async (slug: string): Promise<void> => {
      const response = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting post");
      }
      return response.json(); // Optionally return the response if needed
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Delete post error:", error);
    },
  });
};
