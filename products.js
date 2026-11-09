// All product data lives here. The key (e.g. "urban-runner") is the product's id in the URL:
// product.html?id=urban-runner
// To add a product: copy one entry, give it a new key, and edit the fields.

const SHOE_SIZES = ["38", "39", "40", "41", "42", "43", "44"];
const SANDAL_SIZES = ["36", "37", "38", "39", "40", "41", "42"];

const PRODUCTS = {
  "urban-runner": {
    name: "Urban Runner", category: "Sneakers", price: 2999, rating: 4, reviews: 24,
    image: "pexels-nathanjhilton-4277508.jpg", badge: "New", sizes: SHOE_SIZES,
    desc: "A lightweight everyday sneaker with a cushioned sole. Comfortable from the morning commute to the evening walk.",
    details: ["Breathable mesh upper", "Cushioned rubber sole", "Lace-up fit", "Machine washable"]
  },
  "street-classic": {
    name: "Street Classic", category: "Sneakers", price: 3599, old: 4499, rating: 5, reviews: 58,
    image: "pexels-mnzoutfits-1598505.jpg", badge: "-20%", sale: true, sizes: SHOE_SIZES,
    desc: "A timeless court-style sneaker that goes with everything. Clean lines, durable build, all-day comfort.",
    details: ["Leather-look upper", "Padded collar", "Non-slip outsole", "Available in sizes 38-44"]
  },
  "trail-boot": {
    name: "Trail Boot", category: "Boots", price: 1500, rating: 4, reviews: 12,
    image: "pexels-craytive-1456706.jpg", sizes: SHOE_SIZES,
    desc: "A rugged boot built for muddy paths and rainy days, with strong ankle support and a grippy sole.",
    details: ["Water-resistant upper", "Deep-lug traction sole", "Reinforced toe cap", "Ankle support"]
  },
  "canvas-low": {
    name: "Canvas Low", category: "Sneakers", price: 999, rating: 4, reviews: 31,
    image: "pexels-eduardo199o9-178988127-33187093.jpg", sizes: SHOE_SIZES,
    desc: "A simple low-top canvas sneaker that gets better with wear. Light, flexible and easy to style.",
    details: ["Cotton canvas upper", "Flexible rubber sole", "Metal eyelets", "Easy to clean"]
  },
  "leather-chelsea": {
    name: "Leather Chelsea", category: "Boots", price: 2850, rating: 5, reviews: 19,
    image: "pexels-hurrahsuhail-11324548.jpg", badge: "New", sizes: SHOE_SIZES,
    desc: "A sleek slip-on boot in smooth leather. Smart enough for the office, relaxed enough for the weekend.",
    details: ["Full-grain leather", "Elastic side panels", "Pull tab at the back", "Stacked heel"]
  },
  "beach-slide": {
    name: "Beach Slide", category: "Sandals", price: 1899, rating: 4, reviews: 42,
    image: "pexels-indigentesce-8979069.jpg", sizes: SANDAL_SIZES,
    desc: "A soft, quick-drying slide for the beach, the pool or just around the house.",
    details: ["Waterproof material", "Contoured footbed", "Quick-drying", "Lightweight"]
  },
  "summer-strap": {
    name: "Summer Strap", category: "Sandals", price: 3200, old: 3765, rating: 4, reviews: 16,
    image: "pexels-introspectivedsgn-6016948.jpg", badge: "-15%", sale: true, sizes: SANDAL_SIZES,
    desc: "An adjustable strappy sandal with a cushioned sole, made for long summer days.",
    details: ["Adjustable buckle straps", "Cushioned footbed", "Non-slip sole", "Breathable design"]
  },
  "shoe-care-kit": {
    name: "Shoe Care Kit", category: "Accessories", price: 1599, rating: 5, reviews: 63,
    image: "pexels-lee-hanson-2161337044-37465528.jpg", sizes: [],
    desc: "Everything you need to keep your shoes looking new: cleaner, brush and cloth in one compact kit.",
    details: ["Gentle shoe cleaner", "Soft-bristle brush", "Microfiber cloth", "Works on most materials"]
  },
  "sport-socks-3-pack": {
    name: "Sport Socks (3-pack)", category: "Accessories", price: 1299, rating: 4, reviews: 87,
    image: "pexels-lesandu-alokabandara-670648380-19893264.jpg", sizes: ["S", "M", "L"],
    desc: "Three pairs of cushioned, moisture-wicking socks for training, running or everyday wear.",
    details: ["Cotton-blend fabric", "Arch support band", "Cushioned heel and toe", "Pack of 3 pairs"]
  }
};