"use client"

import { Clock, LayoutDashboard, Users } from "lucide-react"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { cn } from "@/lib/utils"

export type Task = {
  time: string
  title: string
  description: string
  status: "upcoming" | "current" | "completed"
}

export type TeamSchedule = {
  name: string
  color: string
  tasks: Task[]
}

type RundownDashboardProps = {
  teams?: TeamSchedule[]
  title?: string
  subtitle?: string
}

export function RundownDashboard({
  teams = [],
  title = "志工 Rundown",
  subtitle = "請接入資料以開始顯示內容",
}: RundownDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-TW", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div className="text-right">
              <div className="font-mono text-2xl font-bold tabular-nums">{formatTime(currentTime)}</div>
              <div className="text-sm text-muted-foreground">當前時間</div>
            </div>
          </div>
        </div>
      </div>

      {teams.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LayoutDashboard className="size-6" />
            </EmptyMedia>
            <EmptyTitle>尚未有任何資料</EmptyTitle>
            <EmptyDescription>
              這裡將顯示各組的任務狀態。請在未來透過 props 傳入 teams 資料以渲染內容。
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="text-muted-foreground text-xs">
              提示：<code className="font-mono">teams: TeamSchedule[]</code>，包含各組名稱、顏色與任務清單。
            </div>
          </EmptyContent>
        </Empty>
      ) : (
        <>
          {/* Teams Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => (
              <div key={team.name} className="flex flex-col gap-4">
                {/* Team Header */}
                <div className="flex items-center gap-3">
                  <div className={cn("h-3 w-3 rounded-full", team.color)} />
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">{team.name}</h2>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex flex-col gap-3">
                  {team.tasks.map((task, index) => (
                    <Card
                      key={index}
                      className={cn(
                        "p-4 transition-all duration-300",
                        task.status === "current" && "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20",
                        task.status === "completed" && "opacity-50",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="font-mono text-sm font-semibold tabular-nums">{task.time}</span>
                            {task.status === "current" && (
                              <Badge variant="default" className="animate-pulse bg-primary">
                                進行中
                              </Badge>
                            )}
                            {task.status === "completed" && <Badge variant="secondary">已完成</Badge>}
                          </div>
                          <h3 className="mb-1 font-semibold leading-tight">{task.title}</h3>
                          <p className="text-pretty text-sm text-muted-foreground leading-relaxed">{task.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-sm text-muted-foreground">進行中任務</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted" />
              <span className="text-sm text-muted-foreground">即將開始</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-muted opacity-50" />
              <span className="text-sm text-muted-foreground">已完成</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
