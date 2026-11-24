interface DeleteSupplierDialogProps {
  supplierName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteSupplierDialog({
  supplierName,
  onConfirm,
  onCancel,
}: DeleteSupplierDialogProps) {
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Are you sure you want to delete{" "}
        <strong>{supplierName}</strong>?
      </p>

      <p className="text-xs text-red-600">
        In the production system, suppliers linked to purchase orders
        should be deactivated rather than permanently deleted.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete Supplier
        </button>
      </div>
    </div>
  );
}