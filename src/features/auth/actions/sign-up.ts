"use server";

import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";
import { lucia } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";

const signUp = async (formData: FormData) => {
  const formDataRaw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  if (formDataRaw.password !== formDataRaw.confirmPassword) {
    throw new Error("Passwords do not match");
  }

  try {
    console.log("Hashing password...");
    const argon2 = new Argon2id();
    const hashedPassword = await argon2.hash(formDataRaw.password); // Hash password (salt is generated internally)
    const userId = generateId(15);

    console.log("Creating user in database...");
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        firstName: formDataRaw.firstName,
        lastName: formDataRaw.lastName,
        email: formDataRaw.email,
        hashedPassword,  
      },
    });

    console.log("User created:", newUser);

    console.log("Creating session...");
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    console.log("Setting session cookie...");
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.error("Error during sign-up:", error);
    // TODO: add error feedback yourself
    // https://www.robinwieruch.de/next-forms/
  }

  console.log("Redirecting to /dashboard");
  redirect("/dashboard");
};

export { signUp };
