
import { FormEvent, useState } from "react";
import { Product } from "@/types/product";

interface ProductFormProps {
  initialProduct?: Product | null;
  onSubmit: (product: Omit<Product, "id" | "createdAt">) => void;
  onCancel: () => void;
}

const emptyForm = {
  name: "",
  sku: "",
  category: "Electronics",
  description: "",
  purchasePrice: 0,
  sellingPrice: 0,
  currentStock: 0,
  reorderLevel: 10,
  unit: "Pieces",
  status: "ACTIVE" as const,
};

export default function ProductForm({
  initialProduct,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState(() =>
    initialProduct
      ? {
          name: initialProduct.name,
          sku: initialProduct.sku,
          category: initialProduct.category,
          description: initialProduct.description,
          purchasePrice: initialProduct.purchasePrice,
          sellingPrice: initialProduct.sellingPrice,
          currentStock: initialProduct.currentStock,
          reorderLevel: initialProduct.reorderLevel,
          unit: initialProduct.unit,
          status: initialProduct.status,
        }
      : emptyForm
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: [
        "purchasePrice",
        "sellingPrice",
        "currentStock",
        "reorderLevel",
      ].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.sku.trim() ||
      !form.category.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (
      form.purchasePrice < 0 ||
      form.sellingPrice < 0 ||
      form.currentStock < 0 ||
      form.reorderLevel < 0
    ) {
      alert("Prices and stock quantities cannot be negative.");
      return;
    }

    if (form.sellingPrice < form.purchasePrice) {
      const confirmed = window.confirm(
        "The selling price is lower than the purchase price. Continue?"
      );

      if (!confirmed) return;
    }

    onSubmit(form);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name *
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            SKU *
          </label>

          <input
            name="sku"
            value={form.sku}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Example: WM-001"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category *
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Electronics</option>
            <option>Furniture</option>
            <option>Accessories</option>
            <option>Clothing</option>
            <option>Food & Beverages</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Unit
          </label>

          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className={inputClass}
          >
            <option>Pieces</option>
            <option>Boxes</option>
            <option>Kg</option>
            <option>Litres</option>
            <option>Packets</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Purchase Price (LKR)
          </label>

          <input
            type="number"
            name="purchasePrice"
            min="0"
            value={form.purchasePrice}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Selling Price (LKR)
          </label>

          <input
            type="number"
            name="sellingPrice"
            min="0"
            value={form.sellingPrice}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Current Stock
          </label>

          <input
            type="number"
            name="currentStock"
            min="0"
            value={form.currentStock}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Reorder Level
          </label>

          <input
            type="number"
            name="reorderLevel"
            min="0"
            value={form.reorderLevel}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className={inputClass}
            placeholder="Describe this product..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium dark:border-slate-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {initialProduct ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  );
}
