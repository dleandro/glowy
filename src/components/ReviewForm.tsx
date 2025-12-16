import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import type { Review } from "../types";

interface ReviewFormProps {
  productId: string;
  userId: string;
  existingReview?: Review;
  onSubmit: (
    reviewData: Omit<Review, "id" | "createdAt" | "helpfulVotes" | "user">
  ) => void;
  onCancel: () => void;
}

const ReviewForm: Component<ReviewFormProps> = (props) => {
  const [rating, setRating] = createSignal(props.existingReview?.rating || 5);
  const [title, setTitle] = createSignal(props.existingReview?.title || "");
  const [content, setContent] = createSignal(
    props.existingReview?.content || ""
  );
  const [pros, setPros] = createSignal(
    props.existingReview?.pros?.join("\n") || ""
  );
  const [cons, setCons] = createSignal(
    props.existingReview?.cons?.join("\n") || ""
  );
  const [wouldRecommend, setWouldRecommend] = createSignal(
    props.existingReview?.wouldRecommend ?? true
  );
  const [hoveredRating, setHoveredRating] = createSignal(0);

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const prosArray = pros()
      .split("\n")
      .filter((p) => p.trim() !== "");
    const consArray = cons()
      .split("\n")
      .filter((c) => c.trim() !== "");

    props.onSubmit({
      userId: props.userId,
      productId: props.productId,
      rating: rating(),
      title: title(),
      content: content(),
      pros: prosArray.length > 0 ? prosArray : undefined,
      cons: consArray.length > 0 ? consArray : undefined,
      wouldRecommend: wouldRecommend(),
      verifiedPurchase: false,
      images: props.existingReview?.images || [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="bg-white rounded-lg shadow-md p-6 space-y-4"
    >
      <h3 class="text-xl font-semibold text-gray-900">
        {props.existingReview ? "Edit Your Review" : "Write a Review"}
      </h3>

      {/* Rating */}
      <div>
        <label
          class="block text-sm font-medium text-gray-700 mb-2"
          id="rating-label"
        >
          Rating *
        </label>
        <div class="flex items-center space-x-1">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
            <button
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              class="focus:outline-none cursor-pointer"
            >
              <svg
                class={`h-8 w-8 ${
                  star <= (hoveredRating() || rating())
                    ? "text-yellow-400"
                    : "text-gray-300"
                } transition-colors`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
          <span class="ml-2 text-sm text-gray-600">{rating()} / 5</span>
        </div>
      </div>

      {/* Title */}
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Review Title *
          <input
            id="review-title"
            type="text"
            required
            maxLength={100}
            placeholder="Sum up your experience"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            value={title()}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
        </label>
      </div>

      {/* Content */}
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Your Review *
          <textarea
            id="review-content"
            required
            rows={5}
            placeholder="Share your thoughts about this product..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            value={content()}
            onInput={(e) => setContent(e.currentTarget.value)}
          />
        </label>
      </div>

      {/* Pros and Cons */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Pros (optional)
            <textarea
              id="review-pros"
              rows={3}
              placeholder="One pro per line"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 text-sm"
              value={pros()}
              onInput={(e) => setPros(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cons (optional)
            <textarea
              id="review-cons"
              rows={3}
              placeholder="One con per line"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 text-sm"
              value={cons()}
              onInput={(e) => setCons(e.currentTarget.value)}
            />
          </label>
        </div>
      </div>

      {/* Would Recommend */}
      <div class="flex items-center">
        <input
          id="would-recommend"
          type="checkbox"
          checked={wouldRecommend()}
          onChange={(e) => setWouldRecommend(e.currentTarget.checked)}
          class="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
        />
        <label for="would-recommend" class="ml-2 block text-sm text-gray-900">
          I would recommend this product
        </label>
      </div>

      {/* Actions */}
      <div class="flex space-x-3 pt-4">
        <button
          type="submit"
          class="flex-1 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 cursor-pointer"
        >
          {props.existingReview ? "Update Review" : "Submit Review"}
        </button>
        <button
          type="button"
          onClick={props.onCancel}
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
