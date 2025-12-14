import type { Component } from "solid-js";
import { For, Show } from "solid-js";
import type { Review, InfluencerReview } from "../types";

interface ReviewSectionProps {
  reviews: Review[];
  influencerReviews: InfluencerReview[];
  currentUserId?: string;
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => void;
}

const ReviewSection: Component<ReviewSectionProps> = (props) => {
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
    <div class="space-y-8">
      {/* Influencer Reviews */}
      {props.influencerReviews.length > 0 && (
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">
            Influencer Reviews
          </h3>
          <div class="space-y-4">
            <For each={props.influencerReviews}>
              {(review) => (
                <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-100">
                  <div class="flex items-start space-x-4">
                    <img
                      src={review.influencer.avatar}
                      alt={review.influencer.name}
                      class="w-12 h-12 rounded-full object-cover"
                    />
                    <div class="flex-1">
                      <div class="flex items-center space-x-2 mb-2">
                        <h4 class="font-semibold text-gray-900">
                          {review.influencer.name}
                        </h4>
                        {review.influencer.verificationStatus ===
                          "verified" && (
                          <svg
                            class="h-5 w-5 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        )}
                        <span class="text-sm text-gray-500">
                          {review.influencer.followerCount.toLocaleString()}{" "}
                          followers
                        </span>
                      </div>

                      <div class="flex items-center mb-2">
                        <For each={renderStars(review.rating)}>
                          {(star) => star}
                        </For>
                        <span class="ml-2 text-sm text-gray-600">
                          {review.rating}/5
                        </span>
                      </div>

                      <h5 class="font-medium text-gray-900 mb-2">
                        {review.title}
                      </h5>
                      <p class="text-gray-700 mb-3">{review.description}</p>

                      {review.videoUrl && (
                        <div class="mb-3">
                          <a
                            href={review.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center text-pink-600 hover:text-pink-700"
                          >
                            <svg
                              class="h-4 w-4 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h1a1 1 0 010 2H6a1 1 0 01-1-1zm6 1a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
                            </svg>
                            Watch Video Review
                          </a>
                        </div>
                      )}

                      <div class="flex items-center justify-between text-sm text-gray-500">
                        <span>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                        <div class="flex items-center space-x-4">
                          <span>
                            {review.engagement.views?.toLocaleString()} views
                          </span>
                          <span>
                            {review.engagement.likes?.toLocaleString()} likes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      )}

      {/* User Reviews */}
      {props.reviews.length > 0 && (
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">User Reviews</h3>
          <div class="space-y-4">
            <For each={props.reviews}>
              {(review) => (
                <div class="bg-white p-6 rounded-lg border border-gray-200">
                  <div class="flex items-start space-x-4">
                    <img
                      src={
                        review.user.avatar || "https://via.placeholder.com/48"
                      }
                      alt={review.user.name}
                      class="w-10 h-10 rounded-full object-cover"
                    />
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-2">
                        <div>
                          <h4 class="font-medium text-gray-900">
                            {review.user.name}
                          </h4>
                          <div class="flex items-center">
                            <For each={renderStars(review.rating)}>
                              {(star) => star}
                            </For>
                            <span class="ml-2 text-sm text-gray-600">
                              {review.rating}/5
                            </span>
                            {review.verifiedPurchase && (
                              <span class="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                        </div>
                        <div class="flex items-center space-x-2">
                          <span class="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                          <Show when={props.currentUserId === review.userId}>
                            <div class="flex space-x-1">
                              <button
                                onClick={() => props.onEditReview?.(review)}
                                class="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit review"
                              >
                                <svg
                                  class="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() =>
                                  props.onDeleteReview?.(review.id)
                                }
                                class="p-1 text-red-600 hover:bg-red-50 rounded"
                                title="Delete review"
                              >
                                <svg
                                  class="h-4 w-4"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </Show>
                        </div>
                      </div>

                      <h5 class="font-medium text-gray-900 mb-2">
                        {review.title}
                      </h5>
                      <p class="text-gray-700 mb-3">{review.content}</p>

                      {(review.pros || review.cons) && (
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          {review.pros && review.pros.length > 0 && (
                            <div>
                              <h6 class="font-medium text-green-800 mb-1">
                                Pros:
                              </h6>
                              <ul class="list-disc list-inside text-sm text-green-700">
                                <For each={review.pros}>
                                  {(pro) => <li>{pro}</li>}
                                </For>
                              </ul>
                            </div>
                          )}
                          {review.cons && review.cons.length > 0 && (
                            <div>
                              <h6 class="font-medium text-red-800 mb-1">
                                Cons:
                              </h6>
                              <ul class="list-disc list-inside text-sm text-red-700">
                                <For each={review.cons}>
                                  {(con) => <li>{con}</li>}
                                </For>
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      <div class="flex items-center justify-between text-sm text-gray-500">
                        <div>
                          {review.wouldRecommend ? (
                            <span class="text-green-600">
                              👍 Would recommend
                            </span>
                          ) : (
                            <span class="text-red-600">
                              👎 Would not recommend
                            </span>
                          )}
                        </div>
                        <span>{review.helpfulVotes} found this helpful</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      )}

      {props.reviews.length === 0 && props.influencerReviews.length === 0 && (
        <div class="text-center py-8 text-gray-500">
          No reviews yet. Be the first to review this product!
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
