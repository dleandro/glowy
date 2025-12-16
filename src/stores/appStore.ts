import { createSignal, createMemo } from "solid-js";
import type { Product, User, Review, InfluencerReview } from "../types";
import {
  mockProducts,
  mockReviews,
  mockInfluencerReviews,
} from "../utils/mockData";
import {
  additionalProducts,
  additionalProducts2,
  additionalProducts3,
  additionalReviews,
} from "../utils/additionalProducts";

// Combine all products and reviews
const allProducts = [
  ...mockProducts,
  ...additionalProducts,
  ...additionalProducts2,
  ...additionalProducts3,
];

// Load reviews from localStorage or use default reviews
const loadReviews = () => {
  const storedReviews = localStorage.getItem("glowy_reviews");
  if (storedReviews) {
    try {
      const parsed = JSON.parse(storedReviews);
      // Convert date strings back to Date objects
      return parsed.map((review: Review) => ({
        ...review,
        createdAt: new Date(review.createdAt),
      }));
    } catch (e) {
      console.error("Error loading reviews from localStorage:", e);
    }
  }
  return [...mockReviews, ...additionalReviews];
};

const allReviews = loadReviews();

// Assign reviews to products
allProducts.forEach((product) => {
  product.reviews = allReviews.filter(
    (review: Review) => review.productId === product.id
  );
});

// Global state signals
const [products, setProducts] = createSignal<Product[]>(allProducts);
const [currentUser, setCurrentUser] = createSignal<User | null>(null);
const [reviews, setReviews] = createSignal<Review[]>(allReviews);
const [influencerReviews, _setInfluencerReviews] = createSignal<
  InfluencerReview[]
>(mockInfluencerReviews);
const [searchQuery, setSearchQuery] = createSignal<string>("");
const [selectedCategory, setSelectedCategory] = createSignal<string>("all");
const [selectedGender, setSelectedGender] = createSignal<string>("all");
const [currentPage, setCurrentPage] = createSignal<number>(1);
const [itemsPerPage] = createSignal<number>(25);
const [sortBy, setSortBy] = createSignal<string>("featured");

// Computed values
const filteredProducts = createMemo(() => {
  const query = searchQuery().toLowerCase();
  const category = selectedCategory();
  const gender = selectedGender();
  const sort = sortBy();

  let prods = products();

  // Filter by category
  if (category !== "all") {
    prods = prods.filter((product) => product.category === category);
  }

  // Filter by gender
  if (gender !== "all") {
    prods = prods.filter(
      (product) =>
        product.targetGender === gender || product.targetGender === "unisex"
    );
  }

  // Filter by search query
  if (query) {
    prods = prods.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  // Sort products
  switch (sort) {
    case "price-asc":
      prods = [...prods].sort(
        (a, b) => a.priceComparison[0].price - b.priceComparison[0].price
      );
      break;
    case "price-desc":
      prods = [...prods].sort(
        (a, b) => b.priceComparison[0].price - a.priceComparison[0].price
      );
      break;
    case "rating":
      prods = [...prods].sort((a, b) => b.rating - a.rating);
      break;
    case "reviews":
      prods = [...prods].sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "name":
      prods = [...prods].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      // Keep original order for featured
      break;
  }

  return prods;
});

const paginatedProducts = createMemo(() => {
  const filtered = filteredProducts();
  const page = currentPage();
  const perPage = itemsPerPage();
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return filtered.slice(start, end);
});

const totalPages = createMemo(() => {
  return Math.ceil(filteredProducts().length / itemsPerPage());
});

const recommendedProducts = createMemo(() => {
  const user = currentUser();
  if (!user) return [];

  const allProds = products();
  const userSkinType = user.profile.skinType;
  const userConcerns = user.profile.skinConcerns;
  const userBrands = user.profile.preferredBrands || [];

  // Score each product based on user profile match
  const scoredProducts = allProds.map((product) => {
    let score = 0;

    // Match skin type (high priority)
    if (product.suitableFor.skinTypes.includes(userSkinType)) {
      score += 10;
    }

    // Match skin concerns (high priority)
    const concernMatches = product.suitableFor.concerns.filter((concern) =>
      userConcerns.includes(concern)
    ).length;
    score += concernMatches * 5;

    // Match preferred brands (medium priority)
    if (userBrands.includes(product.brand)) {
      score += 8;
    }

    // Boost highly rated products (low priority)
    if (product.rating >= 4.5) {
      score += 3;
    } else if (product.rating >= 4.0) {
      score += 2;
    }

    // Boost products with more reviews (credibility)
    if (product.reviewCount >= 10) {
      score += 2;
    }

    return { product, score };
  });

  // Sort by score and return top 4 recommendations (1 row)
  return scoredProducts
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.product);
});

// Actions
const loginUser = (user: User) => {
  setCurrentUser(user);
  localStorage.setItem("currentUser", JSON.stringify(user));
};

const logoutUser = () => {
  setCurrentUser(null);
  localStorage.removeItem("currentUser");
};

const addReview = (
  productId: string,
  review: Omit<Review, "id" | "user" | "createdAt" | "helpfulVotes">
) => {
  const user = currentUser();
  if (!user) return;

  const newReview: Review = {
    ...review,
    id: `review-${Date.now()}`,
    createdAt: new Date(),
    helpfulVotes: 0,
    user: user,
  };
  const updatedReviews = [...reviews(), newReview];
  setReviews(updatedReviews);

  // Save to localStorage
  localStorage.setItem("glowy_reviews", JSON.stringify(updatedReviews));

  // Update product's reviews
  const product = products().find((p) => p.id === productId);
  if (product) {
    product.reviews.push(newReview);
    // Update product rating and review count
    const allProductReviews = updatedReviews.filter(
      (r) => r.productId === productId
    );
    product.reviewCount = allProductReviews.length;
    product.rating =
      allProductReviews.reduce((sum, r) => sum + r.rating, 0) /
      allProductReviews.length;
    setProducts([...products()]);
  }
};

const updateReview = (reviewId: string, updatedReview: Partial<Review>) => {
  const updatedReviews = reviews().map((r) =>
    r.id === reviewId ? { ...r, ...updatedReview } : r
  );
  setReviews(updatedReviews);

  // Save to localStorage
  localStorage.setItem("glowy_reviews", JSON.stringify(updatedReviews));
};

const deleteReview = (reviewId: string) => {
  const updatedReviews = reviews().filter((r) => r.id !== reviewId);
  setReviews(updatedReviews);

  // Save to localStorage
  localStorage.setItem("glowy_reviews", JSON.stringify(updatedReviews));
};

const checkInitialAuth = () => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    setCurrentUser(JSON.parse(storedUser));
  }
};

const handleCategoryChange = (category: string) => {
  setSelectedCategory(category);
  setCurrentPage(1);
};

const handleGenderChange = (gender: string) => {
  setSelectedGender(gender);
  setCurrentPage(1);
};

export {
  products,
  currentUser,
  reviews,
  influencerReviews,
  searchQuery,
  selectedCategory,
  selectedGender,
  sortBy,
  filteredProducts,
  paginatedProducts,
  recommendedProducts,
  currentPage,
  itemsPerPage,
  totalPages,
  loginUser,
  logoutUser,
  addReview,
  updateReview,
  deleteReview,
  setSearchQuery,
  setSelectedCategory,
  setSelectedGender,
  setSortBy,
  setCurrentPage,
  checkInitialAuth,
  handleCategoryChange,
  handleGenderChange,
};
