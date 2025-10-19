import { DashboardNav } from "@/components/dashboard-nav"
import { MetricsOverview } from "@/components/metrics-overview"
import { MarketSizingCard } from "@/components/market-sizing-card"
import { FeaturePrioritization } from "@/components/feature-prioritization"
import { CompetitiveAnalysis } from "@/components/competitive-analysis"
import { RoadmapTimeline } from "@/components/roadmap-timeline"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">AI Diagnostics Feature Roadmap</h1>
          <p className="text-muted-foreground text-lg">
            Market analysis, feature prioritization, and competitive insights for data-driven decisions
          </p>
        </div>

        <MetricsOverview />

        <div className="grid gap-6 mt-6 lg:grid-cols-2">
          <MarketSizingCard />
          <FeaturePrioritization />
        </div>

        <div className="mt-6">
          <CompetitiveAnalysis />
        </div>

        <div className="mt-6">
          <RoadmapTimeline />
        </div>
      </main>
    </div>
  )
}
