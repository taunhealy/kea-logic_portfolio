"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subheading: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  quote: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function createPost(formData: FormData) {
  const { user } = await getAuth();

  if (!user) {
    return { success: false, error: "User not authenticated" };
  }

  const postData = {
    title: formData.get("title") as string,
    subheading: formData.get("subheading") as string,
    content: formData.get("content") as string,
    quote: formData.get("quote") as string,
    tags: formData.getAll("tags") as string[],
  };

  try {
    // Validate post data
    postSchema.parse(postData);

    // Generate a slug
    let slug = postData.title.toLowerCase().replace(/\s+/g, "-");

    // Check for existing slug and modify if necessary
    let existingPost = await prisma.post.findUnique({ where: { slug } });
    let counter = 1;

    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await prisma.post.findUnique({ where: { slug } });
      counter++;
    }

    // Create post in the database
    await prisma.post.create({
      data: {
        ...postData,
        user: { connect: { id: user.id as string } },
        slug,
      },
    });

    // Revalidate the posts page
    revalidatePath("/posts");

    return { success: true, slug };
  } catch (error) {
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}
