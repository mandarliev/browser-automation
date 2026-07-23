"use client"

import { ReactNode } from "react"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"

export function Room({
  roomId,
  className,
  children,
}: {
  roomId: string
  className?: string
  children: ReactNode
}) {
  return (
    <LiveblocksProvider
      throttle={16}
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
    >
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className={className}>{children}</div>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
