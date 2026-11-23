import type { Category } from "@/types/category";

interface CategoryTableProps {
  categories: Category[];
  getProductCount: (categoryName: string) => number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  getProductCount,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
        <p className="font-medium">No categories found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try another search or create a new category.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Description</th>
            <th className="px-5 py-4">Products</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-t border-gray-100 dark:border-gray-800"
            >
              <td className="px-5 py-4 font-medium">
                {category.name}
              </td>

              <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                {category.description || "—"}
              </td>

              <td className="px-5 py-4">
                {getProductCount(category.name)}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    category.status === "ACTIVE"
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {category.status}
                </span>
              </td>

              <td className="px-5 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onEdit(category)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(category)}
                    className="font-medium text-red-600 hover:underline"
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