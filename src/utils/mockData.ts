import type {
  Product,
  User,
  Review,
  InfluencerReview,
  Influencer,
} from "../types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
    profile: {
      skinType: "combination",
      skinTone: "medium",
      skinConcerns: ["oiliness", "large_pores"],
      ageRange: "26-35",
      preferredBrands: ["CeraVe", "The Ordinary"],
      allergies: [],
    },
  },
];

export const mockInfluencers: Influencer[] = [
  {
    id: "influencer-1",
    name: "Beauty Guru Emma",
    username: "beautyguruemma",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "Professional makeup artist and skincare enthusiast",
    followerCount: 250000,
    verificationStatus: "verified",
    platforms: [
      {
        platform: "instagram",
        username: "beautyguruemma",
        url: "https://instagram.com/beautyguruemma",
        followerCount: 150000,
      },
    ],
    specialties: ["makeup", "skincare"],
  },
];

export const mockProducts: Product[] = [
  {
    id: "product-1",
    name: "Hydrating Hyaluronic Acid Serum",
    brand: "GlowCo",
    description:
      "A powerful hydrating serum with multiple types of hyaluronic acid for all-day moisture.",
    category: "skincare",
    subcategory: "serums",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=300&h=300&fit=crop",
    ],
    ingredients: ["Hyaluronic Acid", "Vitamin B5", "Glycerin", "Aqua"],
    suitableFor: {
      skinTypes: ["dry", "normal", "combination"],
      skinTones: ["fair", "light", "medium", "tan", "deep", "dark"],
      concerns: ["dryness", "aging"],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 42,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
      {
        store: "Ulta",
        price: 39.99,
        currency: "EUR",
        url: "https://ulta.com/product",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "product-2",
    name: "Matte Liquid Lipstick - Ruby Red",
    brand: "ColorPop",
    description:
      "Long-lasting matte liquid lipstick that provides full coverage and comfortable wear.",
    category: "makeup",
    subcategory: "lips",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    ],
    ingredients: ["Dimethicone", "Cyclopentasiloxane", "Kaolin", "Iron Oxides"],
    suitableFor: {
      skinTypes: ["normal", "oily", "combination", "dry"],
      skinTones: ["light", "medium", "tan", "deep"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "ColorPop",
        price: 8,
        currency: "EUR",
        url: "https://colourpop.com/product",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.2,
    reviewCount: 89,
  },
];

export const mockReviews: Review[] = [
  {
    id: "review-1",
    userId: "user-1",
    user: mockUsers[0],
    productId: "product-1",
    rating: 5,
    title: "Amazing hydration!",
    content:
      "This serum has completely transformed my skin. My face feels so much more hydrated and plump.",
    pros: ["Very hydrating", "Absorbs quickly", "No sticky residue"],
    cons: ["A bit pricey"],
    wouldRecommend: true,
    verifiedPurchase: true,
    createdAt: new Date("2024-01-15"),
    helpfulVotes: 12,
    images: [],
  },
];

export const mockInfluencerReviews: InfluencerReview[] = [
  {
    id: "inf-review-1",
    influencerId: "influencer-1",
    influencer: mockInfluencers[0],
    productId: "product-1",
    rating: 4,
    title: "Great for dry skin types",
    description:
      "I tested this serum for 2 weeks and noticed significant improvement in hydration levels.",
    videoUrl: "https://youtube.com/watch?v=example",
    socialMediaUrls: ["https://instagram.com/p/example"],
    createdAt: new Date("2024-01-10"),
    engagement: {
      views: 15000,
      likes: 890,
      shares: 45,
    },
  },
];
