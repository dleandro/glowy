import { createSignal, createMemo } from "solid-js";
import type { Product, User, Review, InfluencerReview } from "../types";
import {
  mockProducts,
  mockReviews,
  mockInfluencerReviews,
} from "../utils/mockData";

// Global state signals
const [products, setProducts] = createSignal<Product[]>(mockProducts);
const [currentUser, setCurrentUser] = createSignal<User | null>(null);
const [reviews, setReviews] = createSignal<Review[]>(mockReviews);
const [influencerReviews, setInfluencerReviews] = createSignal<
  InfluencerReview[]
>(mockInfluencerReviews);
const [searchQuery, setSearchQuery] = createSignal<string>("");
const [selectedCategory, setSelectedCategory] = createSignal<string>("all");

// Computed values
const filteredProducts = createMemo(() => {
  const query = searchQuery().toLowerCase();
  const category = selectedCategory();

  return products().filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });
});

const recommendedProducts = createMemo(() => {
  if (!currentUser()) return [];

  const user = currentUser()!;
  const userProfile = user.profile;

  return products()
    .filter((product) => {
      // Filter products suitable for user's skin type and concerns
      const suitableForSkinType = product.suitableFor.skinTypes.includes(
        userProfile.skinType
      );
      const addressesConcerns = userProfile.skinConcerns.some((concern) =>
        product.suitableFor.concerns.includes(concern)
      );

      return suitableForSkinType || addressesConcerns;
    })
    .slice(0, 6); // Limit to 6 recommendations
});

export const appStore = {
  // State getters
  products,
  currentUser,
  reviews,
  influencerReviews,
  searchQuery,
  selectedCategory,

  // Computed getters
  filteredProducts,
  recommendedProducts,

  // State setters
  setProducts,
  setCurrentUser,
  setReviews,
  setInfluencerReviews,
  setSearchQuery,
  setSelectedCategory,

  // Actions
  getProductById: (id: string) => products().find((p) => p.id === id),

  getProductReviews: (productId: string) =>
    reviews().filter((r) => r.productId === productId),

  getProductInfluencerReviews: (productId: string) =>
    influencerReviews().filter((r) => r.productId === productId),

  addReview: (review: Omit<Review, "id" | "createdAt" | "helpfulVotes">) => {
    const newReview: Review = {
      ...review,
      id: `review-${Date.now()}`,
      createdAt: new Date(),
      helpfulVotes: 0,
    };

    setReviews((prev) => [...prev, newReview]);

    // Update product rating
    const productReviews = [...reviews(), newReview].filter(
      (r) => r.productId === review.productId
    );
    const avgRating =
      productReviews.reduce((sum, r) => sum + r.rating, 0) /
      productReviews.length;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === review.productId
          ? { ...p, rating: avgRating, reviewCount: productReviews.length }
          : p
      )
    );

    return newReview;
  },

  updateReview: (reviewId: string, updates: Partial<Review>) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, ...updates } : r))
    );

    // Recalculate product rating if rating changed
    const review = reviews().find((r) => r.id === reviewId);
    if (review && updates.rating !== undefined) {
      const productReviews = reviews().filter(
        (r) => r.productId === review.productId
      );
      const avgRating =
        productReviews.reduce((sum, r) => sum + r.rating, 0) /
        productReviews.length;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === review.productId ? { ...p, rating: avgRating } : p
        )
      );
    }
  },

  deleteReview: (reviewId: string) => {
    const review = reviews().find((r) => r.id === reviewId);
    if (!review) return;

    setReviews((prev) => prev.filter((r) => r.id !== reviewId));

    // Recalculate product rating
    const productReviews = reviews().filter(
      (r) => r.productId === review.productId && r.id !== reviewId
    );

    if (productReviews.length > 0) {
      const avgRating =
        productReviews.reduce((sum, r) => sum + r.rating, 0) /
        productReviews.length;

      setProducts((prev) =>
        prev.map((p) =>
          p.id === review.productId
            ? { ...p, rating: avgRating, reviewCount: productReviews.length }
            : p
        )
      );
    } else {
      // No reviews left, reset to 0
      setProducts((prev) =>
        prev.map((p) =>
          p.id === review.productId ? { ...p, rating: 0, reviewCount: 0 } : p
        )
      );
    }
  },

  getUserReview: (productId: string, userId: string) => {
    return reviews().find(
      (r) => r.productId === productId && r.userId === userId
    );
  },

  updateUserProfile: (profile: User["profile"]) => {
    if (currentUser()) {
      setCurrentUser((prev) => (prev ? { ...prev, profile } : null));
    }
  },
};
