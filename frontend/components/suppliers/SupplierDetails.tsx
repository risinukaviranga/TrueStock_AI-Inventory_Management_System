import type { Supplier } from "@/types/supplier";

interface SupplierDetailsProps {
  supplier: Supplier;
  onClose: () => void;
}

export default function SupplierDetails({
  supplier,
  onClose,
}: SupplierDetailsProps) {
  const details = [
    ["Supplier ID", supplier.id],
    ["Supplier Name", supplier.name],
    ["Contact Person", supplier.contactPerson],
    ["Email", supplier.email],
    ["Phone", supplier.phone],
    ["Address", supplier.address],
    ["City", supplier.city],
    ["Country", supplier.country],
    ["Status", supplier.status],
    ["Created At", supplier.createdAt],
    ["Notes", supplier.notes || "No notes"],
  ];

  return (
    <div className="space-y-4">
      {details.map(([label, value]) => (
        <div
          key={label}
          className="flex flex-col gap-1 border-b border-gray-100 pb-3 dark:border-gray-800 sm:flex-row sm:justify-between"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {label}
          </span>

          <span className="text-sm font-medium text-gray-900 dark:text-white sm:text-right">
            {value}
          </span>
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
}