import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

const PostsPage = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div>
      <h1>Posts</h1>
      <Link href="/posts/create">
        <button className="mb-4 rounded bg-blue-500 px-4 py-2 text-white">
          Create Post
        </button>
      </Link>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Subheading</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border px-4 py-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="border px-4 py-2">{post.subheading}</td>
              <td className="flex items-center border px-4 py-2">
                <Link
                  href={`/posts/${post.slug}/edit`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link>
                <DeleteButton slug={post.slug.toString()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsPage;
