import type { Component } from "solid-js";
import { Show, For } from "solid-js";
import { appStore } from "../stores/appStore";
import type { Product } from "../types";

interface HeaderProps {
  onLogoClick?: () => void;
  onProfileClick?: () => void;
  onProductSelect?: (product: Product) => void;
}

const Header: Component<HeaderProps> = (props) => {
  const handleSearchInput = (value: string) => {
    appStore.setSearchQuery(value);
  };

  const handleProductClick = (product: Product) => {
    appStore.setSearchQuery("");
    props.onProductSelect?.(product);
  };
  return (
    <header class="bg-[#f3f2ed] shadow-sm border-b border-gray-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <button
            onClick={props.onLogoClick}
            class="flex items-left gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/images/glowy-logo.png"
              alt="Glowy Logo"
              class="h-12 w-auto cursor-pointer"
            />
          </button>

          <div class="flex-1 items-center max-w-lg mx-4">
            <div class="relative">
              <input
                type="text"
                placeholder="Search products, brands..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                value={appStore.searchQuery()}
                onInput={(e) => handleSearchInput(e.currentTarget.value)}
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
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
              </div>

              {/* Search Results Dropdown */}
              <Show when={appStore.searchQuery().trim().length > 0}>
                <div class="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                  <For each={appStore.filteredProducts().slice(0, 5)}>
                    {(product) => (
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleProductClick(product);
                        }}
                        class="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          class="w-12 h-12 object-cover rounded"
                        />
                        <div class="flex-1 min-w-0">
                          <div class="text-sm font-medium text-gray-900 truncate">
                            {product.name}
                          </div>
                          <div class="text-xs text-gray-500 truncate">
                            {product.brand}
                          </div>
                          <div class="flex items-center gap-1 mt-1">
                            <span class="text-xs text-yellow-500">★</span>
                            <span class="text-xs text-gray-600">
                              {product.rating.toFixed(1)} ({product.reviewCount}
                              )
                            </span>
                          </div>
                        </div>
                        <div class="text-sm font-semibold text-pink-600">
                          €{product.priceComparison[0].price.toFixed(2)}
                        </div>
                      </button>
                    )}
                  </For>
                  <Show when={appStore.filteredProducts().length === 0}>
                    <div class="p-4">
                      <p class="text-sm text-gray-500 text-center">
                        No products found matching "{appStore.searchQuery()}"
                      </p>
                    </div>
                  </Show>
                </div>
              </Show>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <Show
              when={appStore.currentUser()}
              fallback={
                <button
                  onClick={props.onProfileClick}
                  class="flex items-center space-x-2 px-3 py-1.5 rounded-md text-pink-600 hover:bg-pink-50 transition-colors"
                >
                  <svg
                    class="h-6 w-6"
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
                  <span class="text-sm font-medium hidden sm:inline">
                    Sign In
                  </span>
                </button>
              }
            >
              <button
                onClick={props.onProfileClick}
                class="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src={appStore.currentUser()?.avatar}
                  alt={appStore.currentUser()?.name}
                  class="h-8 w-8 rounded-full border-2 border-pink-600"
                />
                <span class="text-sm font-medium text-gray-700 hidden sm:inline">
                  {appStore.currentUser()?.name}
                </span>
              </button>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
