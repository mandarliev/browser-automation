import { Room } from "@/features/workflows/components/room"
import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { auth } from "@clerk/nextjs/server"
import { LiveblocksError } from "@liveblocks/node"
import { notFound } from "next/navigation"
import { ReactFlowProvider } from "@xyflow/react"
import { getWorkflow } from "@/features/workflows/data"
import { liveblocks } from "@/lib/liveblocks"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()
  if (!orgId) {
    notFound()
  }

  const workflow = await getWorkflow(orgId, id)
  if (!workflow) {
    notFound()
  }

  try {
    await liveblocks.getOrCreateRoom(id, {
      organizationId: orgId,
      defaultAccesses: [],
      groupsAccesses: {
        [orgId]: ["room:write"],
      },
      metadata: {
        title: workflow.name,
      },
    })
  } catch (error) {
    if (error instanceof LiveblocksError) {
      console.error(
        `Error getting or creating room: ${error.status} - ${error.message}`
      )
    } else {
      console.error(`Unexpected error: ${error}`)
    }
    notFound()
  }

  return (
    <Room roomId={id} className="size-full">
      <ReactFlowProvider>
        <WorkflowShell workflowId={id} />
      </ReactFlowProvider>
    </Room>
  )
}
