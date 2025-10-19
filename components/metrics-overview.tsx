import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Target, Zap } from "lucide-react"

const metrics = [
  {
    label: "TAM Projection",
    value: "$2.4B",
    change: "+15%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    label: "Projected Adoption",
    value: "30%",
    change: "+30%",
    icon: Users,
    trend: "up",
  },
  {
    label: "Features Prioritized",
    value: "12",
    change: "RICE Scored",
    icon: Target,
    trend: "neutral",
  },
  {
    label: "Differentiators",
    value: "3",
    change: "Key Advantages",
    icon: Zap,
    trend: "neutral",
  },
]

export function MetricsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.label} className="p-6 bg-card border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                <p className={`text-sm mt-1 ${metric.trend === "up" ? "text-accent" : "text-muted-foreground"}`}>
                  {metric.change}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
