import { apiFetch } from "./core";

export const geoApi = {
  async reverseGeocode(latitude: number, longitude: number): Promise<{ display_name: string }> {
    try {
      const res = await apiFetch("/api/v1/geo/reverse", {
        method: "POST",
        body: JSON.stringify({ latitude, longitude }),
      });
      return res.json();
    } catch {
      return { display_name: "Location" };
    }
  },
};
