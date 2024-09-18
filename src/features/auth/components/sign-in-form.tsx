"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../actions/authActions";

export const SignInForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    // @ts-ignore
    mutationFn: signInUser,
    onSuccess: () => {
      // Handle successful sign-in, e.g., redirect
      router.push("/dashboard");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    mutate(formDataObj);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 p-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Signing In..." : "Sign In"}
      </button>
      {error && <p className="text-red-500">{(error as Error).message}</p>}
    </form>
  );
};
