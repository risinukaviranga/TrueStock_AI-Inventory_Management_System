"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type {
  InventoryItem,
  StockMovementType,
} from "@/types/inventory";

interface StockMovementFormProps {
  item: InventoryItem;
  onSubmit: (
    type: StockMovementType,
    quantity: number,
    reason: string
  ) => void;
  onCancel: () => void;
}

export default function StockMovementForm({
  item,
  onSubmit,
  onCancel,
}: StockMovementFormProps) {
  const [type, setType] = useState<StockMovementType>("IN");
  const [quantity, setQuantity] = useState("1");
  const [reason, setReason] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      alert("Enter a valid positive whole number.");
      return;
    }

    if (!reason.trim()) {
      alert("Please provide a reason for this movement.");
      return;
    }

    if (type === "OUT" && parsedQuantity > item.quantity) {
      alert("Stock-out quantity cannot exceed available stock.");
      return;
    }

    onSubmit(type, parsedQuantity, reason.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selected product
        </p>

        <p className="mt-1 font-semibold text-gray-900 dark:text-white">
          {item.productName}
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          SKU: {item.sku}
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Current stock: {item.quantity} {item.unit}
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Movement Type
        </label>

        <select
          value={type}
          onChange={(event) =>
            setType(event.target.value as StockMovementType)
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        >
          <option value="IN">Stock In</option>
          <option value="OUT">Stock Out</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Quantity ({item.unit})
        </label>

        <input
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Reason
        </label>

        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          placeholder="Example: Supplier delivery or customer order"
          rows={3}
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Record Movement
        </button>
      </div>
    </form>
  );
}