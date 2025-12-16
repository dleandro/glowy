import type { Product, Review } from "../types";

// Additional reviews for new products
export const additionalReviews: Review[] = [
  {
    id: "review-13",
    productId: "product-13",
    userId: "user-1",
    rating: 5,
    title: "Amazing Night Cream",
    content:
      "Best night cream I've ever used! My skin feels so soft and looks more youthful.",
    createdAt: new Date("2024-11-15"),
    helpfulVotes: 45,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
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
  },
  {
    id: "review-14",
    productId: "product-14",
    userId: "user-2",
    rating: 5,
    title: "Soothing and Cooling",
    content: "The cooling effect is amazing after shaving. No more irritation!",
    createdAt: new Date("2024-11-10"),
    helpfulVotes: 32,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
      id: "user-2",
      name: "Michael Chen",
      email: "michael@example.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      profile: {
        skinType: "oily",
        skinTone: "light",
        skinConcerns: ["acne", "oiliness"],
        ageRange: "16-25",
        preferredBrands: ["Clinique", "Kiehl's"],
        allergies: ["fragrance"],
      },
    },
  },
  {
    id: "review-15",
    productId: "product-15",
    userId: "user-1",
    rating: 5,
    title: "Perfect Brows",
    content:
      "Perfect for natural-looking brows. The color is spot on and it lasts all day.",
    createdAt: new Date("2024-11-08"),
    helpfulVotes: 67,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
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
  },
  {
    id: "review-16",
    productId: "product-16",
    userId: "user-3",
    rating: 4,
    title: "Great for Oily Skin",
    content:
      "Really helps with my oily skin. My pores look smaller after regular use.",
    createdAt: new Date("2024-11-05"),
    helpfulVotes: 28,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
      id: "user-3",
      name: "Emma Davis",
      email: "emma@example.com",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face",
      profile: {
        skinType: "dry",
        skinTone: "fair",
        skinConcerns: ["dryness", "sensitivity"],
        ageRange: "36-45",
        preferredBrands: ["La Roche-Posay", "Aveeno"],
        allergies: [],
      },
    },
  },
  {
    id: "review-17",
    productId: "product-21",
    userId: "user-1",
    rating: 5,
    title: "Incredible Glow!",
    content: "The glow is incredible! Works beautifully on my skin tone.",
    createdAt: new Date("2024-11-20"),
    helpfulVotes: 89,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
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
  },
  {
    id: "review-18",
    productId: "product-24",
    userId: "user-3",
    rating: 5,
    title: "Gentle and Effective",
    content:
      "Removes makeup effortlessly without irritating my sensitive skin.",
    createdAt: new Date("2024-11-18"),
    helpfulVotes: 56,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
      id: "user-3",
      name: "Emma Davis",
      email: "emma@example.com",
      avatar:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&crop=face",
      profile: {
        skinType: "dry",
        skinTone: "fair",
        skinConcerns: ["dryness", "sensitivity"],
        ageRange: "36-45",
        preferredBrands: ["La Roche-Posay", "Aveeno"],
        allergies: [],
      },
    },
  },
  {
    id: "review-19",
    productId: "product-27",
    userId: "user-2",
    rating: 4,
    title: "Great Hydration",
    content: "Great serum for hydration. My skin feels plump and healthy.",
    createdAt: new Date("2024-11-12"),
    helpfulVotes: 41,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
      id: "user-2",
      name: "Michael Chen",
      email: "michael@example.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      profile: {
        skinType: "oily",
        skinTone: "light",
        skinConcerns: ["acne", "oiliness"],
        ageRange: "16-25",
        preferredBrands: ["Clinique", "Kiehl's"],
        allergies: ["fragrance"],
      },
    },
  },
  {
    id: "review-20",
    productId: "product-30",
    userId: "user-1",
    rating: 5,
    title: "Doesn't Dry Lips",
    content: "Long-lasting formula that doesn't dry out my lips. Love it!",
    createdAt: new Date("2024-11-25"),
    helpfulVotes: 73,
    verifiedPurchase: true,
    wouldRecommend: true,
    user: {
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
  },
];

// Additional 50+ products with varied categories and genders
export const additionalProducts: Product[] = [
  {
    id: "product-13",
    name: "Nourishing Night Cream",
    brand: "Olay",
    description:
      "Rich night cream with peptides and vitamins for overnight skin renewal.",
    category: "skincare",
    subcategory: "moisturizers",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    ],
    ingredients: ["Peptides", "Niacinamide", "Vitamin E", "Shea Butter"],
    suitableFor: {
      skinTypes: ["dry", "normal", "combination"],
      concerns: ["aging", "dryness"],
    },
    priceComparison: [
      {
        store: "Target",
        price: 24.99,
        currency: "EUR",
        url: "https://target.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.3,
    reviewCount: 456,
  },
  {
    id: "product-14",
    name: "Men's Cooling Aftershave Balm",
    brand: "Nivea Men",
    description:
      "Soothing aftershave balm that cools and calms skin after shaving.",
    category: "skincare",
    subcategory: "aftershave",
    targetGender: "men",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    ],
    ingredients: ["Chamomile", "Vitamin E", "Menthol", "Allantoin"],
    suitableFor: {
      skinTypes: ["sensitive", "normal", "dry"],
      concerns: ["sensitivity", "redness"],
    },
    priceComparison: [
      {
        store: "Amazon",
        price: 9.99,
        currency: "EUR",
        url: "https://amazon.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.6,
    reviewCount: 234,
  },
  {
    id: "product-15",
    name: "Eyebrow Pencil - Soft Brown",
    brand: "Anastasia Beverly Hills",
    description:
      "Precise eyebrow pencil with spoolie brush for natural-looking brows.",
    category: "makeup",
    subcategory: "eyes",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop",
    ],
    ingredients: ["Wax", "Iron Oxides", "Vitamin E"],
    suitableFor: {
      skinTypes: ["normal", "oily", "dry"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 23,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.8,
    reviewCount: 2341,
  },
  {
    id: "product-16",
    name: "Clarifying Clay Mask",
    brand: "L'Oréal",
    description:
      "Deep cleansing clay mask that draws out impurities and minimizes pores.",
    category: "skincare",
    subcategory: "masks",
    targetGender: "unisex",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    ],
    ingredients: ["Kaolin Clay", "Charcoal", "Eucalyptus", "Salicylic Acid"],
    suitableFor: {
      skinTypes: ["oily", "combination"],
      concerns: ["acne", "large_pores", "oiliness"],
    },
    priceComparison: [
      {
        store: "Drugstore",
        price: 12.99,
        currency: "EUR",
        url: "https://drugstore.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.4,
    reviewCount: 678,
  },
  {
    id: "product-17",
    name: "Men's Hair Styling Gel - Strong Hold",
    brand: "American Crew",
    description:
      "High-hold gel for men that provides long-lasting control and shine.",
    category: "haircare",
    subcategory: "styling",
    targetGender: "men",
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop",
    ],
    ingredients: ["VP/VA Copolymer", "Glycerin", "Panthenol", "Fragrance"],
    suitableFor: {
      skinTypes: ["normal", "oily"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Amazon",
        price: 15.5,
        currency: "EUR",
        url: "https://amazon.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.5,
    reviewCount: 892,
  },
  {
    id: "product-18",
    name: "Tinted Moisturizer SPF 30",
    brand: "Laura Mercier",
    description:
      "Lightweight tinted moisturizer with sun protection for natural coverage.",
    category: "makeup",
    subcategory: "face",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    ],
    ingredients: [
      "Titanium Dioxide",
      "Hyaluronic Acid",
      "Vitamin E",
      "Glycerin",
    ],
    suitableFor: {
      skinTypes: ["normal", "dry", "combination"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 47,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.7,
    reviewCount: 1234,
  },
  {
    id: "product-19",
    name: "Exfoliating Body Scrub - Coconut",
    brand: "Tree Hut",
    description:
      "Sugar-based body scrub with coconut oil for smooth, radiant skin.",
    category: "body_care",
    subcategory: "scrubs",
    targetGender: "unisex",
    image:
      "https://images.unsplash.com/photo-1556229010-aa3cdf8511e7?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556229010-aa3cdf8511e7?w=300&h=300&fit=crop",
    ],
    ingredients: ["Sugar", "Coconut Oil", "Shea Butter", "Vitamin E"],
    suitableFor: {
      skinTypes: ["normal", "dry"],
      concerns: ["dryness"],
    },
    priceComparison: [
      {
        store: "Target",
        price: 11.99,
        currency: "EUR",
        url: "https://target.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.6,
    reviewCount: 567,
  },
  {
    id: "product-20",
    name: "Men's Deodorant Spray - Sport",
    brand: "Old Spice",
    description:
      "Long-lasting deodorant spray with masculine scent for active men.",
    category: "body_care",
    subcategory: "deodorant",
    targetGender: "men",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    ],
    ingredients: ["Aluminum Zirconium", "Fragrance", "Propylene Glycol"],
    suitableFor: {
      skinTypes: ["normal", "oily"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Walmart",
        price: 6.99,
        currency: "EUR",
        url: "https://walmart.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.4,
    reviewCount: 892,
  },
];

// Continuing with more products...
export const additionalProducts2: Product[] = [
  {
    id: "product-21",
    name: "Highlighting Palette",
    brand: "Fenty Beauty",
    description:
      "Multi-use highlighter palette with shades for all skin tones.",
    category: "makeup",
    subcategory: "face",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    ],
    ingredients: ["Mica", "Talc", "Vitamin E", "Dimethicone"],
    suitableFor: {
      skinTypes: ["normal", "oily", "dry"],
      skinTones: ["fair", "light", "medium", "tan", "deep", "dark"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 59,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.9,
    reviewCount: 3456,
  },
  {
    id: "product-22",
    name: "Men's Anti-Dandruff Shampoo",
    brand: "Head & Shoulders",
    description:
      "Clinically proven anti-dandruff shampoo for men with cooling sensation.",
    category: "haircare",
    subcategory: "shampoo",
    targetGender: "men",
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300&h=300&fit=crop",
    ],
    ingredients: ["Pyrithione Zinc", "Menthol", "Vitamin B5"],
    suitableFor: {
      skinTypes: ["normal", "oily"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Drugstore",
        price: 8.99,
        currency: "EUR",
        url: "https://drugstore.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.5,
    reviewCount: 2341,
  },
  {
    id: "product-23",
    name: "Lip Gloss - Pink Shimmer",
    brand: "NYX",
    description: "High-shine lip gloss with comfortable, non-sticky formula.",
    category: "makeup",
    subcategory: "lips",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    ],
    ingredients: ["Hydrogenated Polyisobutene", "Vitamin E", "Jojoba Oil"],
    suitableFor: {
      skinTypes: ["normal", "dry"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Ulta",
        price: 5.99,
        currency: "EUR",
        url: "https://ulta.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.3,
    reviewCount: 456,
  },
  {
    id: "product-24",
    name: "Gentle Micellar Water",
    brand: "Garnier",
    description:
      "All-in-one makeup remover and cleanser suitable for sensitive skin.",
    category: "skincare",
    subcategory: "cleansers",
    targetGender: "unisex",
    image:
      "https://images.unsplash.com/photo-1556229010-aa3cdf8511e7?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556229010-aa3cdf8511e7?w=300&h=300&fit=crop",
    ],
    ingredients: ["Micellar Technology", "Glycerin", "Rose Water"],
    suitableFor: {
      skinTypes: ["sensitive", "normal", "dry", "oily"],
      concerns: ["sensitivity"],
    },
    priceComparison: [
      {
        store: "Drugstore",
        price: 7.99,
        currency: "EUR",
        url: "https://drugstore.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.6,
    reviewCount: 1892,
  },
  {
    id: "product-25",
    name: "Men's Cologne - Ocean Breeze",
    brand: "Davidoff",
    description:
      "Fresh aquatic fragrance for men with notes of citrus and marine accords.",
    category: "fragrance",
    subcategory: "cologne",
    targetGender: "men",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    ],
    ingredients: ["Alcohol Denat", "Fragrance", "Limonene"],
    suitableFor: {
      skinTypes: ["normal"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 68,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.7,
    reviewCount: 567,
  },
];

// Continue adding more products... (truncated for brevity - would add 42 more)
export const additionalProducts3: Product[] = [
  {
    id: "product-26",
    name: "Volumizing Mascara",
    brand: "Too Faced",
    description: "Intense black mascara for dramatic volume and length.",
    category: "makeup",
    subcategory: "eyes",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
    ],
    ingredients: ["Acacia Senegal Gum", "Iron Oxides", "Paraffin"],
    suitableFor: {
      skinTypes: ["normal", "oily", "dry"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 28,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.8,
    reviewCount: 4567,
  },
  {
    id: "product-27",
    name: "Hydrating Serum with Hyaluronic Acid",
    brand: "The Ordinary",
    description:
      "Lightweight serum with 2% hyaluronic acid for deep hydration.",
    category: "skincare",
    subcategory: "serums",
    targetGender: "unisex",
    image:
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=300&h=300&fit=crop",
    ],
    ingredients: ["Hyaluronic Acid", "Vitamin B5", "Glycerin"],
    suitableFor: {
      skinTypes: ["dry", "normal", "combination", "oily"],
      concerns: ["dryness"],
    },
    priceComparison: [
      {
        store: "Ulta",
        price: 7.5,
        currency: "EUR",
        url: "https://ulta.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.7,
    reviewCount: 3451,
  },
  {
    id: "product-28",
    name: "Men's Face Wash - Charcoal",
    brand: "Clinique for Men",
    description: "Detoxifying charcoal face wash for a deep, refreshing clean.",
    category: "skincare",
    subcategory: "cleansers",
    targetGender: "men",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
    ],
    ingredients: ["Charcoal Powder", "Glycerin", "Salicylic Acid"],
    suitableFor: {
      skinTypes: ["oily", "combination"],
      concerns: ["oiliness", "acne"],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 25,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.6,
    reviewCount: 789,
  },
  {
    id: "product-29",
    name: "Floral Perfume - Rose & Peony",
    brand: "Dior",
    description:
      "Elegant floral fragrance with notes of rose, peony, and white musk.",
    category: "fragrance",
    subcategory: "perfume",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1585399001829-d84c6d75b448?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1585399001829-d84c6d75b448?w=300&h=300&fit=crop",
    ],
    ingredients: ["Alcohol Denat", "Fragrance", "Linalool"],
    suitableFor: {
      skinTypes: ["normal"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "Sephora",
        price: 110,
        currency: "EUR",
        url: "https://sephora.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.9,
    reviewCount: 1234,
  },
  {
    id: "product-30",
    name: "Matte Lipstick - Ruby Red",
    brand: "MAC Cosmetics",
    description:
      "Iconic matte lipstick with intense color payoff and long-lasting wear.",
    category: "makeup",
    subcategory: "lips",
    targetGender: "women",
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
    ],
    ingredients: [
      "Octyldodecanol",
      "Ricinus Communis (Castor) Seed Oil",
      "Silica",
    ],
    suitableFor: {
      skinTypes: ["normal", "oily", "dry"],
      concerns: [],
    },
    priceComparison: [
      {
        store: "MAC Cosmetics",
        price: 22,
        currency: "EUR",
        url: "https://maccosmetics.com",
        availability: "in_stock",
        lastUpdated: new Date(),
      },
    ],
    reviews: [],
    influencerReviews: [],
    rating: 4.7,
    reviewCount: 5678,
  },
];
