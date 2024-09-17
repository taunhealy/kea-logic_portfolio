"use server"

import { getSession } from "@/lib/auth" // Adjust based on your auth setup
import { client } from "@/lib/prisma"

export const getAuthenticatedUser = async () => {
  try {
    const session = await getSession()
    if (!session) return { status: 401 }

    const user = await client.user.findUnique({
      where: { id: session.userId },
      select: { id: true, name: true, email: true },
    })

    if (user) {
      return { status: 200, user }
    }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}