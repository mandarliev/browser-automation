"use client"

import { useState } from "react"

import { PlusIcon, Workflow } from "lucide-react"

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

const workflows = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

export function WorkflowNav() {
  const [activeWorkflow, setActiveWorkflow] = useState(workflows[0])
  const { state } = useSidebar()

  if (state === "collapsed") {
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Workflows">
                  <Workflow />
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" className="w-56 p-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                >
                  <PlusIcon />
                  New workflow
                </Button>
                <Separator />
                <div className="flex flex-col gap-0.5">
                  {workflows.map((workflow) => (
                    <Button
                      key={workflow}
                      variant="ghost"
                      className="w-full justify-start"
                      aria-current={workflow === activeWorkflow}
                      onClick={() => setActiveWorkflow(workflow)}
                    >
                      {workflow}
                    </Button>
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
      <SidebarGroupAction title="New workflow">
        <PlusIcon />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarMenu className="gap-y-0.5">
        {workflows.map((workflow) => (
          <SidebarMenuItem key={workflow}>
            <SidebarMenuButton
              isActive={workflow === activeWorkflow}
              onClick={() => setActiveWorkflow(workflow)}
            >
              <span>{workflow}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
