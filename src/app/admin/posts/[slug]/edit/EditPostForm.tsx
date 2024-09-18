"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Post {
  title: string;
  subheading?: string;
  content: string;
  slug: string;
  post: Post;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character.",
  }),
  subheading: z.string().optional(),
  content: z.string().min(1, {
    message: "Content must be at least 1 character.",
  }),
});

// @ts-ignore
const EditPostForm = ({ post }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      subheading: post.subheading || "",
      content: post.content,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch(`/api/posts/${post.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        router.push(`/posts/${post.slug}`);
        router.refresh();
      } else {
        // Handle error
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormDescription>Enter the title of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subheading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subheading</FormLabel>
              <FormControl>
                <Input placeholder="Post subheading" {...field} />
              </FormControl>
              <FormDescription>
                Enter an optional subheading for your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your post content here"
                  className="h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Write the main content of your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Post</Button>
      </form>
    </Form>
  );
};

export default EditPostForm;
