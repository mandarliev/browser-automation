"use client"

import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { PlayIcon } from "lucide-react"
import { useState, useTransition } from "react"

import { Button } from "@/components/ui/button"
import { runWorkflowAction } from "@/features/workflows/actions"

import type { helloWorldTask } from "@/trigger/example"

interface RunHandle {
  id: string
  publicAccessToken: string
}

export function RightSidebar() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [handle, setHandle] = useState<RunHandle | null>(null)

  function handleRun() {
    setError(null)
    startTransition(async () => {
      try {
        const result = await runWorkflowAction()
        setHandle({ id: result.id, publicAccessToken: result.publicAccessToken })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to run workflow")
      }
    })
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-2">
      <Button onClick={handleRun} disabled={isPending}>
        <PlayIcon />
        {isPending ? "Running..." : "Run"}
      </Button>
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
      {handle ? <RunStatus handle={handle} /> : null}
    </div>
  )
}

function RunStatus({ handle }: { handle: RunHandle }) {
  const { run, error } = useRealtimeRun<typeof helloWorldTask>(handle.id, {
    accessToken: handle.publicAccessToken,
  })

  if (error) {
    return <p className="text-destructive text-sm">{error.message}</p>
  }

  if (!run) {
    return <p className="text-muted-foreground text-sm">Connecting...</p>
  }

  return (
    <p className="text-muted-foreground text-sm">
      {run.status}
      {run.status === "COMPLETED" && run.output ? `: ${run.output.message}` : null}
    </p>
  )
}
