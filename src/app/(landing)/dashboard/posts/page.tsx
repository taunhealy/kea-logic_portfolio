import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PostsPage = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div>
      <h1>Posts</h1>
      <Link href="/posts/create">
        <button>Create Post</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Subheading</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </td>
              <td>{post.subheading}</td>
              <td>
                <Link href={`/posts/${post.slug}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsPage;
