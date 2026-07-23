import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { userIds } = (await request.json()) as { userIds: string[] }

  const client = await clerkClient()
  const { data: users } = await client.users.getUserList({
    userId: userIds,
    organizationId: [orgId],
    limit: userIds.length,
  })

  const usersById = new Map(users.map((user) => [user.id, user]))

  const results = userIds.map((id) => {
    const user = usersById.get(id)

    if (!user) {
      return null
    }

    return {
      name:
        user.fullName ??
        user.username ??
        user.primaryEmailAddress?.emailAddress ??
        "Anonymous",
      avatar: user.imageUrl,
    }
  })

  return NextResponse.json(results)
}
