// src/actions/deletePost.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePostBySlug(slug: string) {
  try {
    await prisma.post.delete({ where: { slug } });
    revalidatePath("/posts"); // Revalidate the posts list
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}
