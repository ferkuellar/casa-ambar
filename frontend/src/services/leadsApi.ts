import { request } from "../lib/api";
import type { LeadPayload, LeadResponse } from "../types/leads";

export function createLead(payload: LeadPayload): Promise<LeadResponse> {
  return request<LeadResponse>("/leads/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
