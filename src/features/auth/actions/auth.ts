"use server"

import { getAuth } from "@/features/auth/queries/get-auth"
import { prisma } from "@/lib/prisma"

export const getAuthenticatedUser = async () => {
  try {
    const { user, session } = await getAuth()
    if (!session) return { status: 401 }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, firstName: true, lastName: true, email: true },
    })

    if (dbUser) {
      return { status: 200, user: dbUser }
    }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}