import { Workflow, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Workflow />
          </EmptyMedia>
          <EmptyTitle>No workflow selected</EmptyTitle>
          <EmptyDescription>
            Select a workflow from the sidebar or create a new one to get
            started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="secondary">
            <Plus />
            New workflow
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
