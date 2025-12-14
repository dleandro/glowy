import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import ProductCard from "../components/ProductCard";
import { appStore } from "../stores/appStore";
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
      {/* Hero Section */}
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Perfect <span class="text-pink-600">Glow</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Find reliable reviews, compare prices, and get personalized cosmetic
          recommendations from experts and real users.
        </p>
      </div>

      {/* Recommended Products */}
      <Show
        when={
          appStore.currentUser() && appStore.recommendedProducts().length > 0
        }
      >
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Recommended For You
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <For each={appStore.recommendedProducts()}>
              {(product) => (
                <ProductCard
                  product={product}
                  onClick={props.onProductSelect}
                />
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* Category Filter */}
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <For each={categories}>
          {(category) => (
            <button
              onClick={() => appStore.setSelectedCategory(category.value)}
              class={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                appStore.selectedCategory() === category.value
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
            {appStore.selectedCategory() === "all"
              ? "All Products"
              : categories.find((c) => c.value === appStore.selectedCategory())
                  ?.label}
          </h2>
          <span class="text-gray-600">
            {appStore.filteredProducts().length} products
          </span>
        </div>

        <Show
          when={appStore.filteredProducts().length > 0}
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
            <For each={appStore.filteredProducts()}>
              {(product) => (
                <ProductCard
                  product={product}
                  onClick={props.onProductSelect}
                />
              )}
            </For>
          </div>
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
