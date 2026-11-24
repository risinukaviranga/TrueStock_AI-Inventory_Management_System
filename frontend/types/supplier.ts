export type SupplierStatus = "ACTIVE" | "INACTIVE";

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: SupplierStatus;
  notes: string;
  createdAt: string;
}