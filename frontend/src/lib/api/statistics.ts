import { apiFetch } from "./core";

export const statisticsApi = {
  async getBatteryHistory(id: string, limit = 10000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/battery?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getRangeHistory(id: string, limit = 10000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/range?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getLevelsStep(id: string, limit = 10000, fromDate?: string, toDate?: string): Promise<Array<{ timestamp: string; level: number }>> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/levels-step?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getRangesStep(id: string, limit = 10000, fromDate?: string, toDate?: string): Promise<Array<{ timestamp: string; range_km: number }>> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/ranges-step?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getBatteryTemperature(id: string, limit = 10000, fromDate?: string, toDate?: string): Promise<Array<{ time: string; battery_temperature: number }>> {
    let url = `/api/v1/vehicles/${id}/overview/battery-temperature?limit=${limit}`;
    if (fromDate) url += `&from_date=${encodeURIComponent(fromDate)}`;
    if (toDate) url += `&to_date=${encodeURIComponent(toDate)}`;
    try {
      const res = await apiFetch(url);
      return res.json();
    } catch { return []; }
  },

  async getChargingPower(id: string, limit = 10000, fromDate?: string, toDate?: string): Promise<Array<{ time: string; power: number }>> {
    let url = `/api/v1/vehicles/${id}/overview/charging-power?limit=${limit}`;
    if (fromDate) url += `&from_date=${encodeURIComponent(fromDate)}`;
    if (toDate) url += `&to_date=${encodeURIComponent(toDate)}`;
    try {
      const res = await apiFetch(url);
      return res.json();
    } catch { return []; }
  },

  async getElectricConsumption(id: string, limit = 10000, fromDate?: string, toDate?: string): Promise<Array<{ time: string; consumption: number }>> {
    let url = `/api/v1/vehicles/${id}/overview/electric-consumption?limit=${limit}`;
    if (fromDate) url += `&from_date=${encodeURIComponent(fromDate)}`;
    if (toDate) url += `&to_date=${encodeURIComponent(toDate)}`;
    try {
      const res = await apiFetch(url);
      return res.json();
    } catch { return []; }
  },

  async getOutsideTemperature(id: string, limit = 10000, fromDate?: string, toDate?: string): Promise<Array<{ time: string; outside_temp_celsius: number }>> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/outside-temperature?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getChargingHistory(id: string, limit = 10000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/charging?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getChargingSessions(id: string, limit = 10000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/charging/sessions?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getTrips(id: string, limit = 10000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/trips?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getTripsAnalytics(id: string, limit = 1000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/trips-analytics?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getPositions(id: string, limit = 10000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/positions?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getAirConditioning(id: string, limit = 50) {
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/air-conditioning?limit=${limit}`);
      return res.json();
    } catch { return []; }
  },

  async getMaintenance(id: string, limit = 50, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/maintenance?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getOdometer(id: string, limit = 10000, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/odometer?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getConnectionStates(id: string, limit = 50) {
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/connection-states?limit=${limit}`);
      return res.json();
    } catch { return []; }
  },

  async getStatistics(id: string, period = "day", limit = 30, fromDate?: string, toDate?: string) {
    const params = new URLSearchParams({ period, limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/statistics?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getOverviewStateBands(id: string, opts?: { fromDate?: string; toDate?: string; limit?: number }) {
    const params = new URLSearchParams();
    if (opts?.fromDate) params.set("from_date", opts.fromDate);
    if (opts?.toDate) params.set("to_date", opts.toDate);
    if (opts?.limit != null) params.set("limit", String(opts.limit));
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/state-bands?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getOverviewRangeAt100(id: string, opts?: { fromDate?: string; toDate?: string; limit?: number }): Promise<Array<{ time: string; range_estimated_full: number }>> {
    const params = new URLSearchParams();
    if (opts?.fromDate) params.set("from_date", opts.fromDate);
    if (opts?.toDate) params.set("to_date", opts.toDate);
    if (opts?.limit != null) params.set("limit", String(opts.limit));
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/range-at-100?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getOverviewWltp(id: string): Promise<{ wltp_range_km: number | null }> {
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/wltp`);
      return res.json();
    } catch { return { wltp_range_km: null }; }
  },

  async getOverviewEfficiency(id: string, opts?: { fromDate?: string; toDate?: string; limit?: number }): Promise<Array<{ time: string; efficiency_pct: number }>> {
    const params = new URLSearchParams();
    if (opts?.fromDate) params.set("from_date", opts.fromDate);
    if (opts?.toDate) params.set("to_date", opts.toDate);
    if (opts?.limit != null) params.set("limit", String(opts.limit));
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/efficiency?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getAnalyticsPulse(id: string) {
    const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/pulse`);
    return res.json();
  },

  async getAnalyticsEfficiency(id: string) {
    const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/efficiency`);
    return res.json();
  },

  async getAnalyticsChargingCosts(id: string) {
    const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/charging-costs`);
    return res.json();
  },

  async getAnalyticsChargingSessions(id: string, limit: number = 10) {
    const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/charging-sessions?limit=${limit}`);
    return res.json();
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateChargingSession(id: string, sessionId: string | number, data: any) {
    const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/charging-sessions/${sessionId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getTimeBudget(id: string): Promise<{ parked_seconds: number; driving_seconds: number; charging_seconds: number; ignition_seconds: number; offline_seconds: number }> {
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/time-budget`);
      return res.json();
    } catch { return { parked_seconds: 0, driving_seconds: 0, charging_seconds: 0, ignition_seconds: 0, offline_seconds: 0 }; }
  },

  async getMovementStats(id: string, fromDate: string, toDate: string): Promise<{ parked_seconds: number; driving_seconds: number; charging_seconds: number; offline_seconds: number; ignition_seconds: number; total_seconds: number }> {
    const params = new URLSearchParams({ from_date: fromDate, to_date: toDate });
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/movement-stats?${params.toString()}`);
      return res.json();
    } catch { return { parked_seconds: 0, driving_seconds: 0, charging_seconds: 0, offline_seconds: 0, ignition_seconds: 0, total_seconds: 0 }; }
  },

  async getVisitedLocations(id: string, limit = 2000, fromDate?: string, toDate?: string): Promise<Array<{ latitude: number; longitude: number; timestamp: string; source: string }>> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (fromDate) params.set("from_date", fromDate);
    if (toDate) params.set("to_date", toDate);
    try {
      const res = await apiFetch(`/api/v1/vehicles/${id}/overview/visited?${params.toString()}`);
      return res.json();
    } catch { return []; }
  },

  async getAdvancedAnalyticsOverview(id: string) {
    const res = await apiFetch(`/api/v1/vehicles/${id}/analytics/advanced-overview`);
    return res.json();
  }
};
