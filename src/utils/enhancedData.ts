import type { Review, PriceComparison } from "../types";
import { mockUsers } from "./mockData";

// Additional stores for price comparison
const stores = [
  "Sephora",
  "Ulta",
  "Douglas",
  "Notino",
  "LookFantastic",
  "Cult Beauty",
  "Space NK",
  "Boots",
];

// Generate price comparisons for products (3-5 stores per product)
export const generatePriceComparisons = (
  basePrice: number,
  productId: string
): PriceComparison[] => {
  const numStores = Math.floor(Math.random() * 3) + 3; // 3-5 stores
  const selectedStores = [...stores]
    .sort(() => Math.random() - 0.5)
    .slice(0, numStores);

  return selectedStores.map((store, index) => {
    // Add some price variation (-15% to +10%)
    const variation = (Math.random() * 0.25 - 0.15) * basePrice;
    const price = Math.max(basePrice + variation, 1);

    // Random availability (90% in stock)
    const availabilities: ("in_stock" | "out_of_stock" | "limited")[] = [
      "in_stock",
      "in_stock",
      "in_stock",
      "in_stock",
      "in_stock",
      "in_stock",
      "in_stock",
      "in_stock",
      "in_stock",
      "limited",
    ];

    return {
      store,
      price: Math.round(price * 100) / 100,
      currency: "EUR",
      url: `https://${store
        .toLowerCase()
        .replace(" ", "")}.com/product/${productId}`,
      availability:
        availabilities[Math.floor(Math.random() * availabilities.length)],
      shipping: index === 0 ? 0 : Math.random() > 0.5 ? 0 : 4.99,
      lastUpdated: new Date(),
    };
  });
};

// Additional reviews for all products without reviews
export const enhancedReviews: Review[] = [
  // Product 5 reviews
  {
    id: "review-101",
    productId: "product-5",
    userId: "user-1",
    rating: 5,
    title: "Love this mascara!",
    content:
      "Makes my lashes look amazing. No clumping, great volume and length.",
    createdAt: new Date("2024-12-01"),
    helpfulVotes: 34,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[0],
  },
  {
    id: "review-102",
    productId: "product-5",
    userId: "user-2",
    rating: 4,
    title: "Good mascara",
    content: "Works well but can smudge a bit by end of day.",
    createdAt: new Date("2024-11-28"),
    helpfulVotes: 12,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[1],
  },
  // Product 17 reviews
  {
    id: "review-103",
    productId: "product-17",
    userId: "user-3",
    rating: 5,
    title: "Best hair oil ever!",
    content:
      "My hair has never looked so healthy. Adds amazing shine without being greasy.",
    createdAt: new Date("2024-11-25"),
    helpfulVotes: 56,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[2],
  },
  {
    id: "review-104",
    productId: "product-17",
    userId: "user-1",
    rating: 5,
    title: "Holy grail product",
    content:
      "Perfect for taming frizz and adding shine. A little goes a long way!",
    createdAt: new Date("2024-11-20"),
    helpfulVotes: 43,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[0],
  },
  // Product 18 reviews
  {
    id: "review-105",
    productId: "product-18",
    userId: "user-2",
    rating: 4,
    title: "Great fragrance",
    content: "Beautiful scent that lasts all day. Gets lots of compliments!",
    createdAt: new Date("2024-11-18"),
    helpfulVotes: 28,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[1],
  },
  // Product 19 reviews
  {
    id: "review-106",
    productId: "product-19",
    userId: "user-3",
    rating: 5,
    title: "Luxurious body lotion",
    content:
      "So hydrating and smells amazing. My skin feels soft all day long.",
    createdAt: new Date("2024-11-15"),
    helpfulVotes: 39,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[2],
  },
  // Product 20 reviews
  {
    id: "review-107",
    productId: "product-20",
    userId: "user-1",
    rating: 5,
    title: "Perfect exfoliator",
    content:
      "Leaves my skin so smooth without being too harsh. Use it weekly and love the results!",
    createdAt: new Date("2024-11-12"),
    helpfulVotes: 47,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[0],
  },
  // Product 22 reviews
  {
    id: "review-108",
    productId: "product-22",
    userId: "user-2",
    rating: 4,
    title: "Nice curling iron",
    content: "Creates beautiful curls that last. Heats up quickly.",
    createdAt: new Date("2024-11-10"),
    helpfulVotes: 22,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[1],
  },
  // Product 23 reviews
  {
    id: "review-109",
    productId: "product-23",
    userId: "user-3",
    rating: 5,
    title: "Essential makeup tool",
    content: "Blends foundation perfectly. Easy to clean and very durable.",
    createdAt: new Date("2024-11-08"),
    helpfulVotes: 61,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[2],
  },
  // Product 25 reviews
  {
    id: "review-110",
    productId: "product-25",
    userId: "user-1",
    rating: 5,
    title: "Amazing cleanser",
    content:
      "Removes all makeup and leaves skin feeling fresh. Gentle enough for daily use.",
    createdAt: new Date("2024-11-05"),
    helpfulVotes: 54,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[0],
  },
  // Product 26 reviews
  {
    id: "review-111",
    productId: "product-26",
    userId: "user-2",
    rating: 4,
    title: "Great toner",
    content:
      "Helps balance my skin. Noticed improvement in texture after 2 weeks.",
    createdAt: new Date("2024-11-03"),
    helpfulVotes: 31,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[1],
  },
  // Product 28 reviews
  {
    id: "review-112",
    productId: "product-28",
    userId: "user-3",
    rating: 5,
    title: "Love this shampoo",
    content: "Makes my hair so soft and manageable. Great for colored hair!",
    createdAt: new Date("2024-11-01"),
    helpfulVotes: 38,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[2],
  },
  // Product 29 reviews
  {
    id: "review-113",
    productId: "product-29",
    userId: "user-1",
    rating: 4,
    title: "Nice perfume",
    content: "Elegant scent perfect for evening wear. Lasts about 6 hours.",
    createdAt: new Date("2024-10-30"),
    helpfulVotes: 26,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[0],
  },
  // Additional reviews for products with existing reviews to add variety
  {
    id: "review-114",
    productId: "product-1",
    userId: "user-2",
    rating: 5,
    title: "Best serum ever",
    content:
      "My skin has never looked better. So hydrated and plump! Worth every penny.",
    createdAt: new Date("2024-12-10"),
    helpfulVotes: 78,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[1],
  },
  {
    id: "review-115",
    productId: "product-2",
    userId: "user-3",
    rating: 5,
    title: "Cleared my acne!",
    content:
      "After struggling for years, this finally worked. My skin is clear and smooth now.",
    createdAt: new Date("2024-12-08"),
    helpfulVotes: 92,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[2],
  },
  {
    id: "review-116",
    productId: "product-3",
    userId: "user-1",
    rating: 4,
    title: "Great foundation",
    content: "Love the coverage and how natural it looks. Lasts all day!",
    createdAt: new Date("2024-12-05"),
    helpfulVotes: 45,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[0],
  },
  {
    id: "review-117",
    productId: "product-4",
    userId: "user-2",
    rating: 5,
    title: "My favorite lipstick",
    content: "Perfect color, comfortable to wear, and doesn't dry out my lips.",
    createdAt: new Date("2024-12-03"),
    helpfulVotes: 67,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[1],
  },
  {
    id: "review-118",
    productId: "product-6",
    userId: "user-3",
    rating: 5,
    title: "Must-have sunscreen",
    content:
      "Doesn't leave white cast and feels so lightweight. Perfect under makeup!",
    createdAt: new Date("2024-12-01"),
    helpfulVotes: 83,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: mockUsers[2],
  },
];
