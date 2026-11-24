import type { Supplier } from "@/types/supplier";

interface SupplierTableProps {
  suppliers: Supplier[];
  onView: (supplier: Supplier) => void;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export default function SupplierTable({
  suppliers,
  onView,
  onEdit,
  onDelete,
}: SupplierTableProps) {
  if (suppliers.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
        No suppliers found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full min-w-[850px] text-left text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-5 py-4">Supplier</th>
            <th className="px-5 py-4">Contact Person</th>
            <th className="px-5 py-4">Email</th>
            <th className="px-5 py-4">Phone</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {suppliers.map((supplier) => (
            <tr
              key={supplier.id}
              className="border-t border-gray-100 dark:border-gray-800"
            >
              <td className="px-5 py-4 font-medium">
                {supplier.name}
              </td>

              <td className="px-5 py-4">
                {supplier.contactPerson}
              </td>

              <td className="px-5 py-4">
                {supplier.email}
              </td>

              <td className="px-5 py-4">
                {supplier.phone}
              </td>

              <td className="px-5 py-4">
                <span className={`rounded-full px-3 py-1 text-xs ${
                  supplier.status === "ACTIVE"
                    ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                }`}>
                  {supplier.status}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onView(supplier)}
                    className="text-gray-600 hover:underline dark:text-gray-300"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(supplier)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(supplier)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}