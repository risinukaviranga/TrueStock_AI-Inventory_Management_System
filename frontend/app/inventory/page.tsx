"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

import InventoryStats from "@/components/inventory/InventoryStats";
import InventoryFilters from "@/components/inventory/InventoryFilters";
import InventoryTable from "@/components/inventory/InventoryTable";
import StockMovementForm from "@/components/inventory/StockMovementForm";
import StockMovementHistory from "@/components/inventory/StockMovementHistory";

import {
  initialInventory,
  initialMovements,
} from "@/data/inventory";

import type {
  InventoryItem,
  StockMovement,
  StockMovementType,
} from "@/types/inventory";

export default function InventoryPage() {
  const [items, setItems] =
    useState<InventoryItem[]>(initialInventory);

  const [movements, setMovements] =
    useState<StockMovement[]>(initialMovements);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [selectedItem, setSelectedItem] =
    useState<InventoryItem | null>(null);

  const categories = useMemo(
    () => [...new Set(items.map((item) => item.category))],
    [items]
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.productName.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query);

      const matchesCategory =
        category === "ALL" || item.category === category;

      let itemStatus = "HEALTHY";

      if (item.quantity === 0) {
        itemStatus = "OUT_OF_STOCK";
      } else if (item.quantity < item.reorderLevel) {
        itemStatus = "LOW_STOCK";
      }

      const matchesStatus =
        status === "ALL" || status === itemStatus;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [items, search, category, status]);

  function handleStockMovement(
    type: StockMovementType,
    quantity: number,
    reason: string
  ) {
    if (!selectedItem) return;

    const currentItem = items.find(
      (item) => item.id === selectedItem.id
    );

    if (!currentItem) {
      alert("The selected inventory item could not be found.");
      return;
    }

    if (type === "OUT" && quantity > currentItem.quantity) {
      alert("Insufficient stock for this operation.");
      return;
    }

    const updatedQuantity =
      type === "IN"
        ? currentItem.quantity + quantity
        : currentItem.quantity - quantity;

    setItems((previous) =>
      previous.map((item) =>
        item.id === currentItem.id
          ? { ...item, quantity: updatedQuantity }
          : item
      )
    );

    const newMovement: StockMovement = {
      id: `MOV-${Date.now()}`,
      productId: currentItem.productId,
      productName: currentItem.productName,
      sku: currentItem.sku,
      type,
      quantity,
      reason,
      date: new Date().toISOString(),
    };

    setMovements((previous) => [
      newMovement,
      ...previous,
    ]);

    setSelectedItem(null);
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Inventory Management
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitor stock levels and manage inventory movements.
            </p>
          </div>
        </div>

        <InventoryStats items={items} />

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Inventory
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Search and filter your inventory records.
            </p>
          </div>

          <InventoryFilters
            search={search}
            category={category}
            status={status}
            categories={categories}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onStatusChange={setStatus}
          />

          <InventoryTable
            items={filteredItems}
            onStockMovement={setSelectedItem}
          />
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Stock Movement History
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review recent stock-in and stock-out activities.
            </p>
          </div>

          <StockMovementHistory movements={movements} />
        </section>

        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Update Stock
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Record an inventory movement.
                </p>
              </div>

              <StockMovementForm
                item={selectedItem}
                onSubmit={handleStockMovement}
                onCancel={() => setSelectedItem(null)}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}