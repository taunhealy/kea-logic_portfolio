import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  try {
    console.log("Attempting to delete post with slug:", slug);
    const deletedPost = await prisma.post.delete({
      where: { slug },
    });

    if (deletedPost) {
      return NextResponse.json(deletedPost, { status: 200 });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 },
    );
  }
}
