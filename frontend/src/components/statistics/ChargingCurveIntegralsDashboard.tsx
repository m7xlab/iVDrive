"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2, Zap } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface BracketData {
  label: string;
  energy_kwh: number;
  minutes: number;
  samples: number;
}

interface CurvePoint {
  soc_pct: number;
  avg_power_kw: number;
  max_power_kw: number;
  samples: number;
}

interface CCIResponse {
  curve: CurvePoint[];
  brackets: BracketData[];
  wasted_minutes_80_100: number;
  total_energy_kwh: number;
  total_minutes: number;
  wasted_pct: number;
}

export function ChargingCurveIntegralsDashboard({ vehicleId, dateRange }: { vehicleId: string; dateRange?: { from: Date; to: Date } }) {
  const [data, setData] = useState<CCIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const opts = dateRange ? { fromDate: dateRange.from.toISOString(), toDate: dateRange.to.toISOString() } : undefined;
        const res = await api.getChargingCurveIntegralsV2(vehicleId, opts);
        setData(res);
      } catch (err) {
        console.error("Failed to fetch charging curve integrals", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [vehicleId, dateRange?.from?.toISOString(), dateRange?.to?.toISOString()]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 glass rounded-2xl border border-iv-border p-6 mt-6">
        <Loader2 className="h-8 w-8 animate-spin text-iv-muted" />
      </div>
    );
  }

  if (!data || data.brackets.length === 0) {
    return (
      <div className="glass rounded-2xl border border-iv-border p-6 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-iv-muted" />
          <h3 className="text-lg font-bold text-iv-text">Charging Curve Integrals</h3>
        </div>
        <p className="text-sm text-iv-text-muted">No charging curve data available.</p>
      </div>
    );
  }

  const chartData = data.brackets.map((b) => ({
    name: b.label,
    "Energy (kWh)": b.energy_kwh,
    "Time (min)": b.minutes,
  }));

  const COLORS = ["#3b82f6", "#22c55e", "#eab308", "#ef4444"];

  return (
    <div className="space-y-6 mt-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Energy", value: `${data.total_energy_kwh} kWh`, color: "text-iv-cyan" },
          { label: "Total Time", value: `${data.total_minutes} min`, color: "text-iv-text" },
          { label: "Wasted (80-100%)", value: `${data.wasted_minutes_80_100} min`, color: "text-iv-red" },
          { label: "Wasted %", value: `${data.wasted_pct}%`, color: "text-iv-yellow" },
        ].map((item) => (
          <div key={item.label} className="glass rounded-xl border border-iv-border p-4 text-center">
            <p className="text-xs text-iv-text-muted uppercase tracking-wider">{item.label}</p>
            <p className={`text-xl font-bold mt-1 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Bar chart: energy and time per bracket */}
      <div className="glass rounded-2xl border border-iv-border p-6">
        <h3 className="text-lg font-bold text-iv-text mb-4">Energy & Time by SoC Bracket</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-iv-border" />
              <XAxis dataKey="name" className="text-iv-muted text-xs" />
              <YAxis yAxisId="left" className="text-iv-muted text-xs" label={{ value: 'kWh', angle: -90, position: 'insideLeft', style: { fill: 'var(--iv-muted)' } }} />
              <YAxis yAxisId="right" orientation="right" className="text-iv-muted text-xs" label={{ value: 'min', angle: 90, position: 'insideRight', style: { fill: 'var(--iv-muted)' } }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--iv-bg)", border: "1px solid var(--iv-border)", borderRadius: "8px" }}
                itemStyle={{ color: "var(--iv-text)" }}
              />
              <Legend wrapperStyle={{ paddingTop: "16px" }} />
              <Bar yAxisId="left" dataKey="Energy (kWh)" fill="var(--iv-cyan)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="Time (min)" fill="var(--iv-purple)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wasted time warning */}
      {data.wasted_minutes_80_100 > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-sm text-iv-text">
            <span className="font-bold text-iv-red">Charging 80-100% wastes {data.wasted_minutes_80_100} minutes</span> per session
            (≈{data.wasted_pct}% of total charging time). Consider stopping at 80% for daily drives.
          </p>
        </div>
      )}
    </div>
  );
}