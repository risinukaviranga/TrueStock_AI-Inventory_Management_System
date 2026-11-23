"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Category } from "@/types/category";

interface CategoryFormProps {
  category: Category | null;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

export default function CategoryForm({
  category,
  onSave,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");

  useEffect(() => {
    setName(category?.name ?? "");
    setDescription(category?.description ?? "");
    setStatus(category?.status ?? "ACTIVE");
  }, [category]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const savedCategory: Category = {
      id: category?.id ?? `CAT-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      status,
      createdAt: category?.createdAt ?? new Date().toISOString().slice(0, 10),
    };

    onSave(savedCategory);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">
          Category Name
        </label>

        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter category name"
          required
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Describe this category"
          rows={3}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "ACTIVE" | "INACTIVE")
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
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
          {category ? "Update Category" : "Create Category"}
        </button>
      </div>
    </form>
  );
}