
export type ProductStatus = "ACTIVE" | "INACTIVE";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  description: string;
  purchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  reorderLevel: number;
  unit: string;
  status: ProductStatus;
  createdAt: string;
}
