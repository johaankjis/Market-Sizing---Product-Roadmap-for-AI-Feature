"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, Plus, ChevronRight } from "lucide-react"
import { useState } from "react"

interface Feature {
  id: string
  name: string
  status: "completed" | "in-progress" | "planned"
  team: string
  progress?: number
}

interface Quarter {
  name: string
  status: "completed" | "in-progress" | "planned"
  features: Feature[]
}

const initialQuarters: Quarter[] = [
  {
    name: "Q1 2025",
    status: "in-progress",
    features: [
      { id: "1", name: "Real-time Diagnostics", status: "completed", team: "Engineering", progress: 100 },
      { id: "2", name: "Patient Dashboard", status: "in-progress", team: "Product", progress: 65 },
      { id: "3", name: "Integration API", status: "planned", team: "Engineering", progress: 0 },
    ],
  },
  {
    name: "Q2 2025",
    status: "planned",
    features: [
      { id: "4", name: "Predictive Analytics", status: "planned", team: "Data Science", progress: 0 },
      { id: "5", name: "AI Report Generation", status: "planned", team: "AI/ML", progress: 0 },
      { id: "6", name: "Mobile App Beta", status: "planned", team: "Mobile", progress: 0 },
    ],
  },
  {
    name: "Q3 2025",
    status: "planned",
    features: [
      { id: "7", name: "Advanced Analytics Dashboard", status: "planned", team: "Product", progress: 0 },
      { id: "8", name: "Multi-language Support", status: "planned", team: "Engineering", progress: 0 },
    ],
  },
  {
    name: "Q4 2025",
    status: "planned",
    features: [
      { id: "9", name: "Enterprise SSO", status: "planned", team: "Security", progress: 0 },
      { id: "10", name: "Custom Reporting", status: "planned", team: "Analytics", progress: 0 },
    ],
  },
]

export function RoadmapTimeline() {
  const [quarters] = useState<Quarter[]>(initialQuarters)
  const [expandedQuarters, setExpandedQuarters] = useState<Set<string>>(new Set(["Q1 2025", "Q2 2025"]))

  const toggleQuarter = (quarterName: string) => {
    const newExpanded = new Set(expandedQuarters)
    if (newExpanded.has(quarterName)) {
      newExpanded.delete(quarterName)
    } else {
      newExpanded.add(quarterName)
    }
    setExpandedQuarters(newExpanded)
  }

  const allFeatures = quarters.flatMap((q) => q.features)
  const completedCount = allFeatures.filter((f) => f.status === "completed").length
  const inProgressCount = allFeatures.filter((f) => f.status === "in-progress").length
  const plannedCount = allFeatures.filter((f) => f.status === "planned").length
  const completionPercentage = Math.round((completedCount / allFeatures.length) * 100)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-accent" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-primary" />
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="border-accent/20 text-accent">
            Done
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="border-primary/20 text-primary">
            Active
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-border text-muted-foreground">
            Planned
          </Badge>
        )
    }
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Product Roadmap</h2>
          <p className="text-sm text-muted-foreground">2025 feature timeline and delivery schedule</p>
        </div>
        <Button variant="outline" size="sm" className="text-foreground border-border bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Add Feature
        </Button>
      </div>

      <div className="mb-6 p-4 bg-secondary rounded-lg border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-foreground">Overall Progress</p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} completed • {inProgressCount} in progress • {plannedCount} planned
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-accent">{completionPercentage}%</p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {quarters.map((quarter, qIndex) => {
          const isExpanded = expandedQuarters.has(quarter.name)
          const quarterProgress =
            quarter.features.reduce((acc, f) => acc + (f.progress || 0), 0) / quarter.features.length

          return (
            <div key={quarter.name} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleQuarter(quarter.name)}
                className="w-full p-4 bg-secondary hover:bg-secondary/80 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">Q{qIndex + 1}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground">{quarter.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{quarter.features.length} features</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right mr-2">
                    <p className="text-sm font-semibold text-foreground">{Math.round(quarterProgress)}%</p>
                    <p className="text-xs text-muted-foreground">Progress</p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 space-y-3 bg-card">
                  {quarter.features.map((feature) => (
                    <div
                      key={feature.id}
                      className="p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          {getStatusIcon(feature.status)}
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground">{feature.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">Team: {feature.team}</p>
                          </div>
                        </div>
                        {getStatusBadge(feature.status)}
                      </div>
                      {feature.status !== "planned" && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${feature.status === "completed" ? "bg-accent" : "bg-primary"}`}
                              style={{ width: `${feature.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-10 text-right">{feature.progress}%</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
