"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Loader2, TrendingDown, Euro } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

interface MissedSavingsSession {
  session_id: number;
  session_start: string;
  energy_kwh: number;
  hourly_price_eur_kwh: number;
  actual_cost_eur: number;
  optimal_cost_eur: number;
  missed_savings_eur: number;
}

interface MissedSavingsResponse {
  sessions: MissedSavingsSession[];
  total_actual_cost_eur: number;
  total_optimal_cost_eur: number;
  total_missed_savings_eur: number;
}

export function MissedSavingsDashboard({ vehicleId }: { vehicleId: string }) {
  const [data, setData] = useState<MissedSavingsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.getMissedSavings(vehicleId);
        setData(res);
      } catch (err) {
        console.error("Failed to fetch missed savings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [vehicleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 glass rounded-2xl border border-iv-border p-6 mt-6">
        <Loader2 className="h-8 w-8 animate-spin text-iv-muted" />
      </div>
    );
  }

  if (!data || data.sessions.length === 0) {
    return (
      <div className="glass rounded-2xl border border-iv-border p-6 mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Euro className="h-5 w-5 text-iv-muted" />
          <h3 className="text-lg font-bold text-iv-text">Optimal Charging Windows</h3>
        </div>
        <p className="text-sm text-iv-text-muted">No charging sessions with price data.</p>
      </div>
    );
  }

  const chartData = data.sessions.map((s) => ({
    date: new Date(s.session_start).toLocaleDateString(),
    actual: s.actual_cost_eur,
    optimal: s.optimal_cost_eur,
    missed: s.missed_savings_eur,
  }));

  return (
    <div className="space-y-6 mt-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl border border-iv-border p-4 text-center">
          <p className="text-xs text-iv-text-muted uppercase tracking-wider">Actual Cost</p>
          <p className="text-2xl font-bold text-iv-text mt-1">{data.total_actual_cost_eur} €</p>
        </div>
        <div className="glass rounded-xl border border-iv-border p-4 text-center">
          <p className="text-xs text-iv-text-muted uppercase tracking-wider">Optimal Cost</p>
          <p className="text-2xl font-bold text-iv-green mt-1">{data.total_optimal_cost_eur} €</p>
        </div>
        <div className="glass rounded-xl border border-iv-red/30 bg-red-500/5 p-4 text-center">
          <p className="text-xs text-iv-red uppercase tracking-wider">Missed Savings</p>
          <p className="text-2xl font-bold text-iv-red mt-1">{data.total_missed_savings_eur} €</p>
        </div>
      </div>

      {/* Bar chart: actual vs optimal per session */}
      <div className="glass rounded-2xl border border-iv-border p-6">
        <h3 className="text-lg font-bold text-iv-text mb-4">Actual vs Optimal Charging Cost</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-iv-border" />
              <XAxis dataKey="date" className="text-iv-muted text-xs" />
              <YAxis className="text-iv-muted text-xs" label={{ value: 'EUR', angle: -90, position: 'insideLeft', style: { fill: 'var(--iv-muted)' } }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--iv-bg)", border: "1px solid var(--iv-border)", borderRadius: "8px" }}
                itemStyle={{ color: "var(--iv-text)" }}
                formatter={(value: number, name: string) => [`${value.toFixed(2)} €`, name]}
              />
              <Legend wrapperStyle={{ paddingTop: "16px" }} />
              <Bar dataKey="actual" fill="var(--iv-red)" name="Actual Cost" radius={[4, 4, 0, 0]} />
              <Bar dataKey="optimal" fill="var(--iv-green)" name="Optimal Cost" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Missed savings trend */}
      <div className="glass rounded-2xl border border-iv-border p-6">
        <h3 className="text-lg font-bold text-iv-text mb-4">Missed Savings per Session</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-iv-border" />
              <XAxis dataKey="date" className="text-iv-muted text-xs" />
              <YAxis className="text-iv-muted text-xs" />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--iv-bg)", border: "1px solid var(--iv-border)", borderRadius: "8px" }}
                itemStyle={{ color: "var(--iv-text)" }}
                formatter={(value: number) => [`${value.toFixed(2)} €`, "Missed"]}
              />
              <Line type="monotone" dataKey="missed" stroke="var(--iv-yellow)" strokeWidth={2} dot={{ r: 4 }} name="Missed (€)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {data.total_missed_savings_eur > 5 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <p className="text-sm text-iv-text">
            <span className="font-bold text-iv-yellow">You missed {data.total_missed_savings_eur} € in savings</span> by
            charging at peak-price hours. Move charging to overnight (22:00-06:00) to maximize savings.
          </p>
        </div>
      )}
    </div>
  );
}