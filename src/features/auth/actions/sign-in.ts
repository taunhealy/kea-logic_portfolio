"use server";

import { cookies } from "next/headers";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";

const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await new Argon2id().verify(user.hashedPassword, password))) {
      return { success: false, error: "Incorrect email or password" };
    }

    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true, user };
  } catch (error) {
    console.error("Error during sign-in:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export default signIn;
