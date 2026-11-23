export type StockStatus =
  | "HEALTHY"
  | "LOW_STOCK"
  | "OUT_OF_STOCK";

export type StockMovementType = "IN" | "OUT";

export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  quantity: number;
  reorderLevel: number;
  unit: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  type: StockMovementType;
  quantity: number;
  reason: string;
  date: string;
}