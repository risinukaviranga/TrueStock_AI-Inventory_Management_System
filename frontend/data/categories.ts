import type { Category } from "@/types/category";

export const initialCategories: Category[] = [
  {
    id: "CAT-001",
    name: "Electronics",
    description: "Electronic devices and accessories",
    status: "ACTIVE",
    createdAt: "2026-11-01",
  },
  {
    id: "CAT-002",
    name: "Furniture",
    description: "Office and home furniture",
    status: "ACTIVE",
    createdAt: "2026-11-02",
  },
  {
    id: "CAT-003",
    name: "Accessories",
    description: "Computer and mobile accessories",
    status: "ACTIVE",
    createdAt: "2026-11-03",
  },
  {
    id: "CAT-004",
    name: "Stationery",
    description: "Office and school stationery",
    status: "ACTIVE",
    createdAt: "2026-11-04",
  },
  {
    id: "CAT-005",
    name: "Clothing",
    description: "Clothing and fashion products",
    status: "INACTIVE",
    createdAt: "2026-11-05",
  },
];