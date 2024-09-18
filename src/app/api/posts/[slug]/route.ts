import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/features/auth/queries/get-auth";

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  const { session } = await getAuth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({ where: { slug } });

    if (!post || post.userId !== session.userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.post.delete({ where: { slug } });
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const body = await request.json();

  // Validate input
  if (!body.title || !body.content) {
    return NextResponse.json({ message: "Title and content are required" }, { status: 400 });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title: body.title,
        subheading: body.subheading || "",
        content: body.content,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Error updating post" }, { status: 500 });
  }
}
