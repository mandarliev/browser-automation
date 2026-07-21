"use server"

import { auth } from "@clerk/nextjs/server"
import { tasks } from "@trigger.dev/sdk"

import type { helloWorldTask } from "@/trigger/example"

export async function triggerHelloWorldAction(message: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", { message })

  return handle
}
