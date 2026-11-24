"use client";

import { useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import SupplierStats from "@/components/suppliers/SupplierStats";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";
import SupplierDetails from "@/components/suppliers/SupplierDetails";
import DeleteSupplierDialog from "@/components/suppliers/DeleteSupplierDialog";

import { initialSuppliers } from "@/data/suppliers";
import type { Supplier } from "@/types/supplier";

type ModalType = "CREATE" | "EDIT" | "VIEW" | "DELETE" | null;

export default function SuppliersPage() {
  const [suppliers, setSuppliers] =
    useState<Supplier[]>(initialSuppliers);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [modal, setModal] = useState<ModalType>(null);
  const [selectedSupplier, setSelectedSupplier] =
    useState<Supplier | null>(null);

  const filteredSuppliers = useMemo(() => {
    const query = search.toLowerCase();

    return suppliers.filter((supplier) => {
      const matchesSearch =
        supplier.name.toLowerCase().includes(query) ||
        supplier.contactPerson.toLowerCase().includes(query) ||
        supplier.email.toLowerCase().includes(query);

      const matchesStatus =
        status === "ALL" || supplier.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [suppliers, search, status]);

  function openCreate() {
    setSelectedSupplier(null);
    setModal("CREATE");
  }

  function openEdit(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setModal("EDIT");
  }

  function openView(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setModal("VIEW");
  }

  function openDelete(supplier: Supplier) {
    setSelectedSupplier(supplier);
    setModal("DELETE");
  }

  function closeModal() {
    setModal(null);
    setSelectedSupplier(null);
  }

  function handleSave(supplier: Supplier) {
    const duplicate = suppliers.some(
      (item) =>
        (
          item.name.toLowerCase() === supplier.name.toLowerCase() ||
          item.email.toLowerCase() === supplier.email.toLowerCase()
        ) &&
        item.id !== supplier.id
    );

    if (duplicate) {
      alert("Supplier name or email already exists.");
      return;
    }

    if (modal === "EDIT") {
      setSuppliers((previous) =>
        previous.map((item) =>
          item.id === supplier.id ? supplier : item
        )
      );
    } else {
      setSuppliers((previous) => [...previous, supplier]);
    }

    closeModal();
  }

  function handleDelete() {
    if (!selectedSupplier) return;

    setSuppliers((previous) =>
      previous.filter((item) => item.id !== selectedSupplier.id)
    );

    closeModal();
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Supplier Management
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage supplier information and business contacts.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Supplier
          </button>
        </div>

        <SupplierStats suppliers={suppliers} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="search"
            placeholder="Search suppliers..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="ALL">All Suppliers</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <SupplierTable
          suppliers={filteredSuppliers}
          onView={openView}
          onEdit={openEdit}
          onDelete={openDelete}
        />

        {modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
            <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {modal === "CREATE" && "Add Supplier"}
                  {modal === "EDIT" && "Edit Supplier"}
                  {modal === "VIEW" && "Supplier Details"}
                  {modal === "DELETE" && "Delete Supplier"}
                </h2>

                <button
                  onClick={closeModal}
                  aria-label="Close dialog"
                  className="text-xl text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  ×
                </button>
              </div>

              {modal === "CREATE" || modal === "EDIT" ? (
                <SupplierForm
                  supplier={selectedSupplier}
                  onSave={handleSave}
                  onCancel={closeModal}
                />
              ) : null}

              {modal === "VIEW" && selectedSupplier && (
                <SupplierDetails
                  supplier={selectedSupplier}
                  onClose={closeModal}
                />
              )}

              {modal === "DELETE" && selectedSupplier && (
                <DeleteSupplierDialog
                  supplierName={selectedSupplier.name}
                  onConfirm={handleDelete}
                  onCancel={closeModal}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}