import { apiFetch } from "./core";

export const adminApi = {
  async adminListInvites() {
    const res = await apiFetch("/api/v1/admin/invites");
    return res.json();
  },

  async adminApproveInvite(email: string) {
    const res = await apiFetch("/api/v1/admin/invites/approve", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  async adminRejectInvite(email: string) {
    const res = await apiFetch("/api/v1/admin/invites/reject", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  async adminRefreshUserVehicles(userId: string) {
    const res = await apiFetch(`/api/v1/admin/users/${userId}/refresh-vehicles`, { method: "POST" });
    return res.json();
  },

  async adminListUsers() {
    const res = await apiFetch("/api/v1/admin/users");
    return res.json();
  },

  async adminPromoteUser(email: string) {
    const res = await apiFetch("/api/v1/admin/users/promote", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  async adminDemoteUser(email: string) {
    const res = await apiFetch("/api/v1/admin/users/demote", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  async adminDeleteUser(id: string) {
    await apiFetch(`/api/v1/admin/users/${id}`, { method: "DELETE" });
  },

  async adminDeleteInvite(id: string) {
    await apiFetch(`/api/v1/admin/invites/${id}`, { method: "DELETE" });
  },

  async adminResendInvite(email: string) {
    const res = await apiFetch("/api/v1/admin/invites/resend", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  async adminCreateAnnouncement(data: {
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "critical";
    expires_at?: string | null;
  }) {
    const res = await apiFetch("/api/v1/admin/announcements", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async adminListAnnouncements() {
    const res = await apiFetch("/api/v1/admin/announcements");
    return res.json();
  },

  async adminGetStatistics() {
    const res = await apiFetch("/api/v1/admin/statistics");
    return res.json();
  },

  async adminDeleteAnnouncement(id: string) {
    await apiFetch(`/api/v1/admin/announcements/${id}`, { method: "DELETE" });
  },
};
