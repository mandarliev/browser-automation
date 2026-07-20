"use client"

import { PlusIcon, Workflow as WorkflowIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { createWorkflowAction as CreateWorkflowAction } from "@/features/workflows/actions"
import { generateSlug } from "@/features/workflows/lib/generate-slug"
import type { Workflow } from "@/lib/db/schema"

export function WorkflowNav({
  workflows,
  createWorkflowAction,
}: {
  workflows: Workflow[]
  createWorkflowAction: typeof CreateWorkflowAction
}) {
  const { state } = useSidebar()
  const pathname = usePathname()

  function handleCreateWorkflow() {
    createWorkflowAction(generateSlug())
  }

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Workflows">
                  <WorkflowIcon />
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-56 p-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={handleCreateWorkflow}
                >
                  <PlusIcon />
                  New workflow
                </Button>
                <Separator />
                <div className="flex flex-col gap-0.5">
                  {workflows.map((workflow) => (
                    <SidebarMenuButton
                      key={workflow.id}
                      asChild
                      isActive={pathname === `/workflows/${workflow.id}`}
                    >
                      <Link href={`/workflows/${workflow.id}`}>
                        {workflow.name}
                      </Link>
                    </SidebarMenuButton>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workflows</SidebarGroupLabel>
      <SidebarGroupAction title="New workflow" onClick={handleCreateWorkflow}>
        <PlusIcon />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarMenu className="gap-y-0.5">
        {workflows.map((workflow) => (
          <SidebarMenuItem key={workflow.id}>
            <SidebarMenuButton
              asChild
              isActive={pathname === `/workflows/${workflow.id}`}
            >
              <Link href={`/workflows/${workflow.id}`}>
                <span>{workflow.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
