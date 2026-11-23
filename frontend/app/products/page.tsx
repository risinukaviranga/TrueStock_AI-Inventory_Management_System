
"use client";

import { useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import ProductStats from "@/components/products/ProductStats";
import ProductFilters from "@/components/products/ProductFilters";
import ProductTable from "@/components/products/ProductTable";
import ProductForm from "@/components/products/ProductForm";
import ProductDetails from "@/components/products/ProductDetails";
import DeleteProductDialog from "@/components/products/DeleteProductDialog";

import { initialProducts } from "@/data/products";
import { Product } from "@/types/product";

type ModalType = "add" | "edit" | "view" | "delete" | null;

type ProductInput = Omit<Product, "id" | "createdAt">;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [modal, setModal] = useState<ModalType>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "ALL" || product.category === category;

      const matchesStatus =
        status === "ALL" || product.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  const openModal = (type: ModalType, product?: Product) => {
    setSelectedProduct(product ?? null);
    setModal(type);
  };

  const closeModal = () => {
    setModal(null);
    setSelectedProduct(null);
  };

  const handleAddProduct = (data: ProductInput) => {
    const duplicateSku = products.some(
      (product) => product.sku.toLowerCase() === data.sku.trim().toLowerCase()
    );

    if (duplicateSku) {
      alert("A product with this SKU already exists.");
      return;
    }

    const newProduct: Product = {
      ...data,
      id: `PRD-${Date.now()}`,
      sku: data.sku.trim(),
      name: data.name.trim(),
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setProducts((previous) => [newProduct, ...previous]);
    closeModal();
  };

  const handleEditProduct = (data: ProductInput) => {
    if (!selectedProduct) return;

    const duplicateSku = products.some(
      (product) =>
        product.id !== selectedProduct.id &&
        product.sku.toLowerCase() === data.sku.trim().toLowerCase()
    );

    if (duplicateSku) {
      alert("Another product already uses this SKU.");
      return;
    }

    setProducts((previous) =>
      previous.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              ...data,
              name: data.name.trim(),
              sku: data.sku.trim(),
            }
          : product
      )
    );

    closeModal();
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    setProducts((previous) =>
      previous.filter((product) => product.id !== selectedProduct.id)
    );

    closeModal();
  };

  const modalTitle = {
    add: "Add New Product",
    edit: "Edit Product",
    view: "Product Details",
    delete: "Delete Product",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Products Management
            </h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Manage your product catalog, prices, categories and stock details.
            </p>
          </div>

          <button
            onClick={() => openModal("add")}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            + Add New Product
          </button>
        </div>

        {/* Statistics */}
        <ProductStats products={products} />

        {/* Search and Filters */}
        <ProductFilters
          search={search}
          category={category}
          status={status}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
        />

        {/* Products Table */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Product Catalog
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setCategory("ALL");
                setStatus("ALL");
              }}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>
          </div>

          <ProductTable
            products={filteredProducts}
            onView={(product) => openModal("view", product)}
            onEdit={(product) => openModal("edit", product)}
            onDelete={(product) => openModal("delete", product)}
          />
        </section>

        {/* Modal */}
        {modal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {modalTitle[modal]}
                </h2>

                <button
                  onClick={closeModal}
                  aria-label="Close dialog"
                  className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  ×
                </button>
              </div>

              {modal === "add" && (
                <ProductForm
                  onSubmit={handleAddProduct}
                  onCancel={closeModal}
                />
              )}

              {modal === "edit" && selectedProduct && (
                <ProductForm
                  initialProduct={selectedProduct}
                  onSubmit={handleEditProduct}
                  onCancel={closeModal}
                />
              )}

              {modal === "view" && selectedProduct && (
                <ProductDetails
                  product={selectedProduct}
                  onClose={closeModal}
                />
              )}

              {modal === "delete" && selectedProduct && (
                <DeleteProductDialog
                  product={selectedProduct}
                  onConfirm={handleDeleteProduct}
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
