import type { Component } from "solid-js";
import { For } from "solid-js";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const ProductCard: Component<ProductCardProps> = (props) => {
  const lowestPrice = () => {
    const prices = props.product.priceComparison.map((p) => p.price);
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        class={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <button
      class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-left w-full"
      onClick={() => props.onClick?.(props.product)}
      type="button"
    >
      <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
        <img
          src={props.product.image}
          alt={props.product.name}
          class="h-48 w-full object-cover object-center group-hover:opacity-75"
        />
      </div>

      <div class="p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500 uppercase tracking-wide">
            {props.product.brand}
          </span>
          <span class="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
            {props.product.category}
          </span>
        </div>

        <h3 class="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
          {props.product.name}
        </h3>

        <div class="flex items-center mb-2">
          <div class="flex items-center">
            <For each={renderStars(Math.round(props.product.rating))}>
              {(star) => star}
            </For>
          </div>
          <span class="ml-2 text-sm text-gray-600">
            {props.product.rating.toFixed(1)} ({props.product.reviewCount})
          </span>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-lg font-bold text-gray-900">
            €{lowestPrice().toFixed(2)}
            {props.product.priceComparison.length > 1 && (
              <span class="text-sm text-gray-500 ml-1">
                from {props.product.priceComparison.length} stores
              </span>
            )}
          </div>
        </div>

        <div class="mt-3 flex flex-wrap gap-1">
          <For each={props.product.suitableFor.skinTypes.slice(0, 2)}>
            {(skinType) => (
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {skinType}
              </span>
            )}
          </For>
          {props.product.suitableFor.skinTypes.length > 2 && (
            <span class="text-xs text-gray-500">
              +{props.product.suitableFor.skinTypes.length - 2} more
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ProductCard;
