import { useState } from "react";

const useSignInUser = () => {
  const [error, setError] = useState<string | null>(null);

  const signInUser = async (formData: FormData) => {
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred");
      }

      // Handle successful sign-in (e.g., update state, redirect)
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    }
  };

  return { signInUser, error };
};

const useSignOutUser = () => {
  const [error, setError] = useState<string | null>(null);

  const signOutUser = async () => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign out");
      }

      // Handle successful sign-out (e.g., update state, redirect)
      window.location.href = "/sign-in";
    } catch (err) {
      // @ts-ignore
      setError(err.message);
    }
  };

  return { signOutUser, error };
};

// Ensure this function is defined and exported
export const signInUser = async (formData: FormData) => {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An unknown error occurred");
    }

    // Handle successful sign-in (e.g., update state, redirect)
  } catch (err) {
    // @ts-ignore
    throw new Error(err.message);
  }
};
