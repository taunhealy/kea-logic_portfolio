"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signInUser } from "../actions/authActions";

export const SignInForm = () => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await dispatch(signInUser(formData) as any); // Cast to any if necessary
    if (result) {
      // Handle successful sign-in, e.g., navigate to a different page
      router.push("/dashboard"); // Example navigation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 p-4">
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
