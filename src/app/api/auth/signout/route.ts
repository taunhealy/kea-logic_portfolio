import { NextResponse } from "next/server";
import { lucia } from "@/lib/lucia";
import { getAuth } from "@/features/auth/queries/get-auth";

export async function POST() {
  const { session } = await getAuth();

  if (session) {
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();

    const response = NextResponse.json({ success: true });
    response.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return response;
  }

  return NextResponse.json(
    { success: false, message: "No active session" },
    { status: 400 },
  );
}
