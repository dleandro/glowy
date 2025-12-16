export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Only stored locally, not for production use
  avatar?: string;
  profile: UserProfile;
}

export interface UserProfile {
  skinType: SkinType;
  skinTone: SkinTone;
  skinConcerns: SkinConcern[];
  ageRange: AgeRange;
  hairType?: HairType;
  preferredBrands?: string[];
  allergies?: string[];
}

export type SkinType = "oily" | "dry" | "combination" | "sensitive" | "normal";
export type SkinTone = "fair" | "light" | "medium" | "tan" | "deep" | "dark";
export type SkinConcern =
  | "acne"
  | "aging"
  | "dryness"
  | "oiliness"
  | "sensitivity"
  | "dark_spots"
  | "redness"
  | "large_pores";
export type AgeRange = "16-25" | "26-35" | "36-45" | "46-55" | "55+";
export type HairType = "straight" | "wavy" | "curly" | "coily";

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: ProductCategory;
  subcategory: string;
  image: string;
  images: string[];
  ingredients: string[];
  targetGender?: "men" | "women" | "unisex";
  suitableFor: {
    skinTypes: SkinType[];
    skinTones?: SkinTone[];
    concerns: SkinConcern[];
  };
  priceComparison: PriceComparison[];
  reviews: Review[];
  influencerReviews: InfluencerReview[];
  rating: number;
  reviewCount: number;
}

export type ProductCategory =
  | "skincare"
  | "makeup"
  | "haircare"
  | "fragrance"
  | "body_care"
  | "tools_accessories";

export interface PriceComparison {
  store: string;
  price: number;
  currency: string;
  url: string;
  availability: "in_stock" | "out_of_stock" | "limited";
  shipping?: number;
  lastUpdated: Date;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  productId: string;
  rating: number;
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
  wouldRecommend: boolean;
  verifiedPurchase: boolean;
  createdAt: Date;
  helpfulVotes: number;
  images?: string[];
}

export interface InfluencerReview {
  id: string;
  influencerId: string;
  influencer: Influencer;
  productId: string;
  rating: number;
  title: string;
  description: string;
  videoUrl?: string;
  socialMediaUrls: string[];
  createdAt: Date;
  engagement: {
    views?: number;
    likes?: number;
    shares?: number;
  };
}

export interface Influencer {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followerCount: number;
  verificationStatus: "verified" | "unverified";
  platforms: SocialPlatform[];
  specialties: ProductCategory[];
}

export interface SocialPlatform {
  platform: "instagram" | "tiktok" | "youtube" | "twitter";
  username: string;
  url: string;
  followerCount: number;
}

export interface Recommendation {
  product: Product;
  score: number;
  reasons: string[];
  matchType: "skin_type" | "concerns" | "preferences" | "similar_users";
}
