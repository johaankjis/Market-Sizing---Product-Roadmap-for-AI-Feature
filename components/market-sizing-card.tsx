"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Calculator, Info } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { useState } from "react"

export function MarketSizingCard() {
  const [tam, setTam] = useState(2400)
  const [samPercentage, setSamPercentage] = useState(50)
  const [somPercentage, setSomPercentage] = useState(30)
  const [showCalculator, setShowCalculator] = useState(false)

  const sam = Math.round((tam * samPercentage) / 100)
  const som = Math.round((sam * somPercentage) / 100)

  const marketData = [
    { name: "TAM", value: tam, label: "Total Addressable" },
    { name: "SAM", value: sam, label: "Serviceable Addressable" },
    { name: "SOM", value: som, label: "Serviceable Obtainable" },
  ]

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Market Sizing</h2>
          <p className="text-sm text-muted-foreground">TAM, SAM, SOM Analysis</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-foreground border-border bg-transparent"
          onClick={() => setShowCalculator(!showCalculator)}
        >
          <Calculator className="w-4 h-4 mr-2" />
          {showCalculator ? "Hide" : "Calculate"}
        </Button>
      </div>

      {showCalculator && (
        <div className="mb-6 p-4 bg-secondary rounded-lg border border-border space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-accent" />
            <p className="text-sm font-medium text-foreground">Market Size Calculator</p>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="tam" className="text-sm text-foreground">
                Total Addressable Market (TAM) - $M
              </Label>
              <Input
                id="tam"
                type="number"
                value={tam}
                onChange={(e) => setTam(Number(e.target.value))}
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>

            <div>
              <Label htmlFor="sam" className="text-sm text-foreground">
                SAM as % of TAM
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="sam"
                  type="number"
                  value={samPercentage}
                  onChange={(e) => setSamPercentage(Number(e.target.value))}
                  className="bg-background border-border text-foreground"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>

            <div>
              <Label htmlFor="som" className="text-sm text-foreground">
                SOM as % of SAM
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="som"
                  type="number"
                  value={somPercentage}
                  onChange={(e) => setSomPercentage(Number(e.target.value))}
                  className="bg-background border-border text-foreground"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-64 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
            <XAxis dataKey="name" stroke="oklch(0.65 0 0)" tick={{ fill: "oklch(0.65 0 0)" }} />
            <YAxis stroke="oklch(0.65 0 0)" tick={{ fill: "oklch(0.65 0 0)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.16 0 0)",
                border: "1px solid oklch(0.25 0 0)",
                borderRadius: "0.5rem",
                color: "oklch(0.98 0 0)",
              }}
            />
            <Bar dataKey="value" fill="oklch(0.75 0.15 220)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {marketData.map((item) => (
          <div key={item.name} className="text-center">
            <p className="text-2xl font-bold text-foreground">${item.value}M</p>
            <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-secondary rounded-lg border border-border">
        <div className="flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-accent mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Market Opportunity</p>
            <p className="text-xs text-muted-foreground mt-1">
              Targeting {samPercentage}% of TAM with {somPercentage}% market capture potential
            </p>
            <div className="mt-3 flex items-center gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Year 1 Target</p>
                <p className="text-sm font-semibold text-accent">${Math.round(som * 0.3)}M</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Year 3 Target</p>
                <p className="text-sm font-semibold text-accent">${som}M</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
