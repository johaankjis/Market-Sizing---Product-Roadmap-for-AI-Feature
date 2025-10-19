"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, Plus, X } from "lucide-react"
import { useState } from "react"

interface Feature {
  id: string
  name: string
  reach: number
  impact: number
  confidence: number
  effort: number
  score: number
}

const initialFeatures: Feature[] = [
  { id: "1", name: "Real-time Diagnostics", reach: 5000, impact: 3, confidence: 90, effort: 5, score: 2700 },
  { id: "2", name: "Predictive Analytics", reach: 4000, impact: 3, confidence: 80, effort: 8, score: 1200 },
  { id: "3", name: "Patient Dashboard", reach: 3500, impact: 2, confidence: 95, effort: 3, score: 2217 },
  { id: "4", name: "AI Report Generation", reach: 4500, impact: 3, confidence: 85, effort: 6, score: 1913 },
  { id: "5", name: "Integration API", reach: 2000, impact: 2, confidence: 100, effort: 4, score: 1000 },
]

export function FeaturePrioritization() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newFeature, setNewFeature] = useState({
    name: "",
    reach: 1000,
    impact: 1,
    confidence: 80,
    effort: 1,
  })

  const calculateRICE = (reach: number, impact: number, confidence: number, effort: number) => {
    return Math.round((reach * impact * (confidence / 100)) / effort)
  }

  const handleAddFeature = () => {
    if (!newFeature.name.trim()) return

    const score = calculateRICE(newFeature.reach, newFeature.impact, newFeature.confidence, newFeature.effort)
    const feature: Feature = {
      id: Date.now().toString(),
      ...newFeature,
      score,
    }

    setFeatures([...features, feature])
    setNewFeature({ name: "", reach: 1000, impact: 1, confidence: 80, effort: 1 })
    setShowAddForm(false)
  }

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter((f) => f.id !== id))
  }

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">Feature Prioritization</h2>
          <p className="text-sm text-muted-foreground">RICE Scoring Framework</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-foreground border-border bg-transparent"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showAddForm ? "Cancel" : "Add Feature"}
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-secondary rounded-lg border border-border space-y-4">
          <div>
            <Label htmlFor="feature-name" className="text-sm text-foreground">
              Feature Name
            </Label>
            <Input
              id="feature-name"
              value={newFeature.name}
              onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
              placeholder="e.g., Mobile App Launch"
              className="mt-1 bg-background border-border text-foreground"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reach" className="text-sm text-foreground">
                Reach (users/quarter)
              </Label>
              <Input
                id="reach"
                type="number"
                value={newFeature.reach}
                onChange={(e) => setNewFeature({ ...newFeature, reach: Number(e.target.value) })}
                className="mt-1 bg-background border-border text-foreground"
              />
            </div>

            <div>
              <Label htmlFor="impact" className="text-sm text-foreground">
                Impact (0.25-3)
              </Label>
              <Input
                id="impact"
                type="number"
                step="0.25"
                value={newFeature.impact}
                onChange={(e) => setNewFeature({ ...newFeature, impact: Number(e.target.value) })}
                className="mt-1 bg-background border-border text-foreground"
                min="0.25"
                max="3"
              />
            </div>

            <div>
              <Label htmlFor="confidence" className="text-sm text-foreground">
                Confidence (%)
              </Label>
              <Input
                id="confidence"
                type="number"
                value={newFeature.confidence}
                onChange={(e) => setNewFeature({ ...newFeature, confidence: Number(e.target.value) })}
                className="mt-1 bg-background border-border text-foreground"
                min="0"
                max="100"
              />
            </div>

            <div>
              <Label htmlFor="effort" className="text-sm text-foreground">
                Effort (person-weeks)
              </Label>
              <Input
                id="effort"
                type="number"
                value={newFeature.effort}
                onChange={(e) => setNewFeature({ ...newFeature, effort: Number(e.target.value) })}
                className="mt-1 bg-background border-border text-foreground"
                min="1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">
              RICE Score:{" "}
              <span className="font-bold text-accent">
                {calculateRICE(newFeature.reach, newFeature.impact, newFeature.confidence, newFeature.effort)}
              </span>
            </p>
            <Button onClick={handleAddFeature} size="sm" className="bg-primary text-primary-foreground">
              Add Feature
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {features
          .sort((a, b) => b.score - a.score)
          .map((feature, index) => (
            <div
              key={feature.id}
              className="p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{feature.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Reach: {feature.reach} • Impact: {feature.impact} • Confidence: {feature.confidence}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    {feature.score}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                    onClick={() => handleRemoveFeature(feature.id)}
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${Math.min((feature.score / 3000) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{feature.effort}w</span>
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 p-4 bg-secondary rounded-lg border border-border">
        <div className="flex items-start gap-3">
          <ArrowUpRight className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Prioritization Insights</p>
            <p className="text-xs text-muted-foreground mt-1">
              {features.length} features analyzed • Top priority: {features.sort((a, b) => b.score - a.score)[0]?.name}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
