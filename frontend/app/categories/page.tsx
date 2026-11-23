"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryStats from "@/components/categories/CategoryStats";
import CategoryTable from "@/components/categories/CategoryTable";
import CategoryForm from "@/components/categories/CategoryForm";
import { initialCategories } from "@/data/categories";
import { initialProducts } from "@/data/products";
import type { Category } from "@/types/category";

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const activeCount = categories.filter(
    (category) => category.status === "ACTIVE"
  ).length;

  const inactiveCount = categories.length - activeCount;

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const query = search.toLowerCase();

      return (
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
      );
    });
  }, [categories, search]);

  function getProductCount(categoryName: string) {
    return initialProducts.filter(
      (product) =>
        product.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  }

  function openCreateForm() {
    setEditingCategory(null);
    setShowForm(true);
  }

  function openEditForm(category: Category) {
    setEditingCategory(category);
    setShowForm(true);
  }

  function handleSave(category: Category) {
    const duplicate = categories.some(
      (item) =>
        item.name.toLowerCase() === category.name.toLowerCase() &&
        item.id !== category.id
    );

    if (duplicate) {
      alert("A category with this name already exists.");
      return;
    }

    if (editingCategory) {
      setCategories((previous) =>
        previous.map((item) =>
          item.id === category.id ? category : item
        )
      );
    } else {
      setCategories((previous) => [...previous, category]);
    }

    setShowForm(false);
    setEditingCategory(null);
  }

  function handleDelete(category: Category) {
    const productCount = getProductCount(category.name);

    if (productCount > 0) {
      alert(
        `Cannot delete ${category.name}. It is currently assigned to ${productCount} product(s).`
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${category.name}?`
    );

    if (!confirmed) return;

    setCategories((previous) =>
      previous.filter((item) => item.id !== category.id)
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Category Management
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Organize your products into manageable categories.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Category
          </button>
        </div>

        <CategoryStats
          total={categories.length}
          active={activeCount}
          inactive={inactiveCount}
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <CategoryTable
          categories={filteredCategories}
          getProductCount={getProductCount}
          onEdit={openEditForm}
          onDelete={handleDelete}
        />

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enter the category information below.
                </p>
              </div>

              <CategoryForm
                category={editingCategory}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingCategory(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}