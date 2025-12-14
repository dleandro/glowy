import type { Component } from "solid-js";
import { Show, For, createSignal } from "solid-js";
import type { Product, Review } from "../types";
import ReviewSection from "../components/ReviewSection";
import ReviewForm from "../components/ReviewForm";
import { appStore } from "../stores/appStore";

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onLoginRequired?: () => void;
}

const ProductDetail: Component<ProductDetailProps> = (props) => {
  const [selectedImage, setSelectedImage] = createSignal(0);
  const [showReviewForm, setShowReviewForm] = createSignal(false);
  const [editingReview, setEditingReview] = createSignal<Review | undefined>(
    undefined
  );

  const reviews = () => appStore.getProductReviews(props.product.id);
  const influencerReviews = () =>
    appStore.getProductInfluencerReviews(props.product.id);

  const userReview = () => {
    const user = appStore.currentUser();
    if (!user) return undefined;
    return appStore.getUserReview(props.product.id, user.id);
  };

  const handleWriteReview = () => {
    if (!appStore.currentUser()) {
      props.onLoginRequired?.();
      return;
    }

    const existing = userReview();
    if (existing) {
      setEditingReview(existing);
    }
    setShowReviewForm(true);
  };

  const handleSubmitReview = (
    reviewData: Omit<Review, "id" | "createdAt" | "helpfulVotes" | "user">
  ) => {
    const user = appStore.currentUser();
    if (!user) return;

    if (editingReview()) {
      appStore.updateReview(editingReview()!.id, reviewData);
    } else {
      appStore.addReview({
        ...reviewData,
        user: user,
      });
    }

    setShowReviewForm(false);
    setEditingReview(undefined);
  };

  const handleDeleteReview = (reviewId: string) => {
    if (confirm("Are you sure you want to delete your review?")) {
      appStore.deleteReview(reviewId);
    }
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setEditingReview(undefined);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        class={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={props.onBack}
        class="flex items-center text-pink-600 hover:text-pink-700 mb-6"
      >
        <svg
          class="h-5 w-5 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Products
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg mb-4">
            <img
              src={props.product.images[selectedImage()] || props.product.image}
              alt={props.product.name}
              class="h-96 w-full object-cover object-center"
            />
          </div>

          <Show when={props.product.images.length > 1}>
            <div class="grid grid-cols-4 gap-2">
              <For each={props.product.images}>
                {(image, index) => (
                  <button
                    onClick={() => setSelectedImage(index())}
                    class={`aspect-w-1 aspect-h-1 overflow-hidden rounded-lg border-2 ${
                      selectedImage() === index()
                        ? "border-pink-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${props.product.name} ${index() + 1}`}
                      class="h-20 w-full object-cover object-center"
                    />
                  </button>
                )}
              </For>
            </div>
          </Show>
        </div>

        {/* Product Information */}
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-lg text-gray-500 uppercase tracking-wide">
              {props.product.brand}
            </span>
            <span class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
              {props.product.category}
            </span>
          </div>

          <h1 class="text-3xl font-bold text-gray-900 mb-4">
            {props.product.name}
          </h1>

          <div class="flex items-center mb-4">
            <div class="flex items-center">
              <For each={renderStars(Math.round(props.product.rating))}>
                {(star) => star}
              </For>
            </div>
            <span class="ml-2 text-lg text-gray-600">
              {props.product.rating.toFixed(1)} ({props.product.reviewCount}{" "}
              reviews)
            </span>
          </div>

          <p class="text-gray-700 mb-6 text-lg leading-relaxed">
            {props.product.description}
          </p>

          {/* Suitable For */}
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              Suitable For:
            </h3>
            <div class="space-y-2">
              <div>
                <span class="font-medium text-gray-700">Skin Types: </span>
                <For each={props.product.suitableFor.skinTypes}>
                  {(skinType, index) => (
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-1">
                      {skinType}
                      {index() < props.product.suitableFor.skinTypes.length - 1
                        ? ", "
                        : ""}
                    </span>
                  )}
                </For>
              </div>
              <Show when={props.product.suitableFor.concerns.length > 0}>
                <div>
                  <span class="font-medium text-gray-700">Addresses: </span>
                  <For each={props.product.suitableFor.concerns}>
                    {(concern, index) => (
                      <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-sm mr-1">
                        {concern.replace("_", " ")}
                        {index() < props.product.suitableFor.concerns.length - 1
                          ? ", "
                          : ""}
                      </span>
                    )}
                  </For>
                </div>
              </Show>
            </div>
          </div>

          {/* Ingredients */}
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              Key Ingredients:
            </h3>
            <div class="flex flex-wrap gap-2">
              <For each={props.product.ingredients}>
                {(ingredient) => (
                  <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {ingredient}
                  </span>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Price Comparison</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <For each={props.product.priceComparison}>
            {(price) => (
              <div class="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-semibold text-gray-900">{price.store}</h3>
                  <span
                    class={`px-2 py-1 rounded text-xs ${
                      price.availability === "in_stock"
                        ? "bg-green-100 text-green-800"
                        : price.availability === "limited"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {price.availability.replace("_", " ")}
                  </span>
                </div>
                <div class="text-2xl font-bold text-gray-900 mb-2">
                  €{price.price.toFixed(2)}
                  {price.shipping && price.shipping > 0 && (
                    <span class="text-sm text-gray-500 ml-1">
                      + €{price.shipping} shipping
                    </span>
                  )}
                </div>
                <a
                  href={price.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full bg-pink-600 text-white text-center py-2 rounded hover:bg-pink-700 transition-colors"
                >
                  Shop Now
                </a>
                <p class="text-xs text-gray-500 mt-2">
                  Updated: {new Date(price.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Reviews */}
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Reviews</h2>
          <Show when={!showReviewForm()} fallback={null}>
            <button
              onClick={handleWriteReview}
              class="flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>
                {userReview() ? "Edit Your Review" : "Write a Review"}
              </span>
            </button>
          </Show>
        </div>

        <Show when={showReviewForm()}>
          <div class="mb-8">
            <ReviewForm
              productId={props.product.id}
              userId={appStore.currentUser()!.id}
              existingReview={editingReview()}
              onSubmit={handleSubmitReview}
              onCancel={handleCancelReview}
            />
          </div>
        </Show>

        <ReviewSection
          reviews={reviews()}
          influencerReviews={influencerReviews()}
          currentUserId={appStore.currentUser()?.id}
          onEditReview={(review) => {
            setEditingReview(review);
            setShowReviewForm(true);
          }}
          onDeleteReview={handleDeleteReview}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
