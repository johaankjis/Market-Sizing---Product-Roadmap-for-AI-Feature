import { BarChart3, Target, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ProductPlan</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-foreground">
              <Target className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              Team
            </Button>
          </div>

          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Export Report
          </Button>
        </div>
      </div>
    </nav>
  )
}
