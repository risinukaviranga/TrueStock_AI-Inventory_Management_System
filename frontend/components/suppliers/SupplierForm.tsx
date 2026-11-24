"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Supplier } from "@/types/supplier";

interface SupplierFormProps {
  supplier: Supplier | null;
  onSave: (supplier: Supplier) => void;
  onCancel: () => void;
}

export default function SupplierForm({
  supplier,
  onSave,
  onCancel,
}: SupplierFormProps) {
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Sri Lanka",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    notes: "",
  });

  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name,
        contactPerson: supplier.contactPerson,
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        city: supplier.city,
        country: supplier.country,
        status: supplier.status,
        notes: supplier.notes,
      });
    } else {
      setForm({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "Sri Lanka",
        status: "ACTIVE",
        notes: "",
      });
    }
  }, [supplier]);

  function updateField(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      ...form,
      id: supplier?.id ?? `SUP-${Date.now()}`,
      createdAt:
        supplier?.createdAt ??
        new Date().toISOString().slice(0, 10),
    });
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Supplier Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Contact Person
          </label>
          <input
            required
            value={form.contactPerson}
            onChange={(e) =>
              updateField("contactPerson", e.target.value)
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone
          </label>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            City
          </label>
          <input
            required
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Country
          </label>
          <input
            required
            value={form.country}
            onChange={(e) =>
              updateField("country", e.target.value)
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Address
        </label>
        <input
          required
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) =>
            updateField("status", e.target.value)
          }
          className={inputClass}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Notes
        </label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          {supplier ? "Update Supplier" : "Create Supplier"}
        </button>
      </div>
    </form>
  );
}