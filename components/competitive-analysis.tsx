"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Minus, TrendingUp, Shield, Zap } from "lucide-react"
import { useState } from "react"

interface Competitor {
  name: string
  realTime: boolean | "partial"
  aiPowered: boolean | "partial"
  integration: boolean | "partial"
  mobile: boolean | "partial"
  pricing: string
  marketShare?: number
  isUs?: boolean
}

const initialCompetitors: Competitor[] = [
  {
    name: "Our Product",
    realTime: true,
    aiPowered: true,
    integration: true,
    mobile: true,
    pricing: "$$",
    marketShare: 15,
    isUs: true,
  },
  {
    name: "Competitor A",
    realTime: true,
    aiPowered: false,
    integration: true,
    mobile: false,
    pricing: "$$$",
    marketShare: 35,
  },
  {
    name: "Competitor B",
    realTime: false,
    aiPowered: true,
    integration: "partial",
    mobile: true,
    pricing: "$$",
    marketShare: 25,
  },
  {
    name: "Competitor C",
    realTime: true,
    aiPowered: true,
    integration: true,
    mobile: "partial",
    pricing: "$$$$",
    marketShare: 20,
  },
]

const features = [
  { key: "realTime", label: "Real-time Diagnostics" },
  { key: "aiPowered", label: "AI-Powered Analysis" },
  { key: "integration", label: "EHR Integration" },
  { key: "mobile", label: "Mobile Support" },
]

export function CompetitiveAnalysis() {
  const [competitors] = useState<Competitor[]>(initialCompetitors)
  const [showMarketShare, setShowMarketShare] = useState(false)

  const renderFeatureIcon = (value: boolean | "partial") => {
    if (value === true) {
      return <CheckCircle2 className="w-5 h-5 text-accent mx-auto" />
    } else if (value === "partial") {
      return <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
    } else {
      return <XCircle className="w-5 h-5 text-muted-foreground/50 mx-auto" />
    }
  }

  const ourProduct = competitors.find((c) => c.isUs)
  const ourAdvantages = features.filter((f) => {
    const ourValue = ourProduct?.[f.key as keyof Competitor]
    return ourValue === true && competitors.some((c) => !c.isUs && c[f.key as keyof Competitor] !== true)
  }).length

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Competitive Analysis</h2>
          <p className="text-sm text-muted-foreground">Feature comparison and market positioning</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-foreground border-border bg-transparent"
          onClick={() => setShowMarketShare(!showMarketShare)}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          {showMarketShare ? "Hide" : "Show"} Market Share
        </Button>
      </div>

      {showMarketShare && (
        <div className="mb-6 p-4 bg-secondary rounded-lg border border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Market Share Distribution</h3>
          <div className="space-y-3">
            {competitors.map((comp) => (
              <div key={comp.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm ${comp.isUs ? "text-primary font-medium" : "text-foreground"}`}>
                    {comp.name}
                  </span>
                  <span className="text-sm text-muted-foreground">{comp.marketShare}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${comp.isUs ? "bg-primary" : "bg-muted-foreground/30"}`}
                    style={{ width: `${comp.marketShare}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Feature</th>
              {competitors.map((comp) => (
                <th key={comp.name} className="text-center py-3 px-4">
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-sm font-medium ${comp.isUs ? "text-primary" : "text-foreground"}`}>
                      {comp.name}
                    </span>
                    {comp.isUs && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                        Us
                      </Badge>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.key} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="py-4 px-4 text-sm text-foreground">{feature.label}</td>
                {competitors.map((comp) => (
                  <td key={`${comp.name}-${feature.key}`} className="py-4 px-4 text-center">
                    {renderFeatureIcon(comp[feature.key as keyof Competitor] as boolean | "partial")}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
              <td className="py-4 px-4 text-sm text-foreground">Pricing</td>
              {competitors.map((comp) => (
                <td key={`${comp.name}-pricing`} className="py-4 px-4 text-center">
                  <span className="text-sm font-medium text-foreground">{comp.pricing}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Competitive Advantage Summary</p>
            <p className="text-xs text-muted-foreground mt-1">
              We have {ourAdvantages} unique feature advantages over competitors, with the best combination of real-time
              AI diagnostics and mobile support at competitive pricing.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="p-4 bg-secondary rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-foreground">Key Differentiator #1</h3>
          </div>
          <p className="text-xs text-muted-foreground">Real-time AI diagnostics with full mobile support</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-foreground">Key Differentiator #2</h3>
          </div>
          <p className="text-xs text-muted-foreground">Comprehensive EHR integration at competitive pricing</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-accent" />
            <h3 className="text-sm font-medium text-foreground">Key Differentiator #3</h3>
          </div>
          <p className="text-xs text-muted-foreground">Advanced predictive analytics with proven accuracy</p>
        </div>
      </div>
    </Card>
  )
}
