import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import ProductCard from "../components/ProductCard";
import {
  selectedCategory,
  selectedGender,
  sortBy,
  filteredProducts,
  paginatedProducts,
  recommendedProducts,
  currentUser,
  totalPages,
  currentPage,
  handleCategoryChange,
  handleGenderChange,
  setSortBy,
  setCurrentPage,
} from "../stores/appStore";
import type { Product } from "../types";

interface HomePageProps {
  onProductSelect: (product: Product) => void;
}

const HomePage: Component<HomePageProps> = (props) => {
  const categories = [
    { value: "all", label: "All Products" },
    { value: "skincare", label: "Skincare" },
    { value: "makeup", label: "Makeup" },
    { value: "haircare", label: "Haircare" },
    { value: "fragrance", label: "Fragrance" },
    { value: "body_care", label: "Body Care" },
    { value: "tools_accessories", label: "Tools & Accessories" },
  ];

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Recommended Products */}
      <Show when={currentUser() && recommendedProducts().length > 0}>
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Recommended For You
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <For each={recommendedProducts()}>
              {(product) => (
                <ProductCard
                  product={product}
                  onClick={props.onProductSelect}
                  compact={true}
                />
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* Gender Filter */}
      <div class="flex justify-center gap-2 mb-4">
        <button
          onClick={() => handleGenderChange("all")}
          class={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedGender() === "all"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleGenderChange("women")}
          class={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedGender() === "women"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Women
        </button>
        <button
          onClick={() => handleGenderChange("men")}
          class={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selectedGender() === "men"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Men
        </button>
      </div>

      {/* Category Filter */}
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <For each={categories}>
          {(category) => (
            <button
              onClick={() => handleCategoryChange(category.value)}
              class={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory() === category.value
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          )}
        </For>
      </div>

      {/* All Products */}
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {selectedCategory() === "all"
              ? "All Products"
              : categories.find((c) => c.value === selectedCategory())?.label}
          </h2>
          <div class="flex items-center gap-4">
            <span class="text-gray-600">
              {filteredProducts().length} products
            </span>
            <div class="flex items-center gap-2">
              <label
                for="sort"
                class="text-sm font-medium text-gray-700 whitespace-nowrap"
              >
                Sort by:
              </label>
              <select
                id="sort"
                class="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 text-sm cursor-pointer"
                value={sortBy()}
                onChange={(e) => setSortBy(e.currentTarget.value)}
              >
                <option value="featured">Featured</option>
                <option value="name">Name (A-Z)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>

        <Show
          when={paginatedProducts().length > 0}
          fallback={
            <div class="text-center py-12">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 class="mt-2 text-lg font-medium text-gray-900">
                No products found
              </h3>
              <p class="mt-1 text-gray-500">
                Try adjusting your search or filters.
              </p>
            </div>
          }
        >
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <For each={paginatedProducts()}>
              {(product) => (
                <ProductCard
                  product={product}
                  onClick={props.onProductSelect}
                />
              )}
            </For>
          </div>

          {/* Pagination */}
          <Show when={totalPages() > 1}>
            <div class="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage() - 1))}
                disabled={currentPage() === 1}
                class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div class="flex gap-1">
                <For
                  each={Array.from({ length: totalPages() }, (_, i) => i + 1)}
                >
                  {(page) => (
                    <Show
                      when={
                        page === 1 ||
                        page === totalPages() ||
                        (page >= currentPage() - 2 && page <= currentPage() + 2)
                      }
                    >
                      <Show
                        when={
                          (page === currentPage() - 3 && page > 1) ||
                          (page === currentPage() + 3 && page < totalPages())
                        }
                        fallback={
                          <button
                            onClick={() => setCurrentPage(page)}
                            class={`w-10 h-10 rounded-lg ${
                              currentPage() === page
                                ? "bg-pink-600 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        }
                      >
                        <span class="w-10 h-10 flex items-center justify-center text-gray-500">
                          ...
                        </span>
                      </Show>
                    </Show>
                  )}
                </For>
              </div>

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages(), currentPage() + 1))
                }
                disabled={currentPage() === totalPages()}
                class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </Show>
        </Show>
      </div>

      {/* Features Section */}
      <div class="mt-16 py-12 bg-gradient-to-r from-pink-50 to-purple-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">
            Why Choose Glowy?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="bg-pink-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  class="h-8 w-8 text-pink-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                Expert Reviews
              </h3>
              <p class="text-gray-600">
                Get insights from verified influencers and beauty experts
              </p>
            </div>

            <div class="text-center">
              <div class="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  class="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                Price Comparison
              </h3>
              <p class="text-gray-600">
                Compare prices across multiple retailers to find the best deals
              </p>
            </div>

            <div class="text-center">
              <div class="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  class="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                Personalized
              </h3>
              <p class="text-gray-600">
                Get recommendations tailored to your skin type and concerns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
