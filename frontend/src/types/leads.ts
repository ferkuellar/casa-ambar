export type LeadType = "PRODUCT_INTEREST" | "CUSTOM_DESIGN" | "GENERAL_CONTACT";

export type PreferredContactMethod = "WHATSAPP" | "EMAIL" | "PHONE";

export type LeadPayload = {
  lead_type: LeadType;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  product?: number;
  occasion?: string;
  budget_range?: string;
  preferred_contact_method?: PreferredContactMethod;
  source?: string;
};

export type LeadResponse = {
  id: number;
  status: string;
  message: string;
};
