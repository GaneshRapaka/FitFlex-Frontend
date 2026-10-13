import api from './client';

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "IronCore Heavy Pump Cover Oversized Tee",
    category: { slug: "oversized-tees", name: "Oversized Tees" },
    gender: "Men",
    price: 999,
    originalPrice: 1599,
    discountPercent: 38,
    // Flat garment / standalone dress or tee
    apparelImageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    // Muscular athlete wearing it on hover
    modelImageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "100% Combed Heavy French Terry (240 GSM)",
    fitType: "Extreme Oversized Drop Shoulder",
    badge: "BESTSELLER",
    rating: 4.9,
    reviewCount: 84,
    description: "Engineered specifically for heavy push sessions. Heavyweight 240 GSM French terry cotton hangs perfectly off wide delts and broad lats without sticking. Designed and printed in Banjara Hills, Hyderabad.",
    highlights: [
      "Ultra-dense 240 GSM pre-shrunk cotton",
      "Seamless drop shoulder cut for maximum shoulder breadth",
      "Reinforced rib-knit crewneck that never sags after washing",
      "Pre-washed to eliminate post-laundry shrinkage"
    ],
    sizeGuide: {
      S: { chest: "42 in", length: "29 in", shoulder: "21 in" },
      M: { chest: "45 in", length: "30 in", shoulder: "22.5 in" },
      L: { chest: "48 in", length: "31 in", shoulder: "24 in" },
      XL: { chest: "51 in", length: "32 in", shoulder: "25.5 in" },
      XXL: { chest: "54 in", length: "33 in", shoulder: "27 in" }
    },
    reviews: [
      {
        id: "r1",
        author: "Karthik Reddy",
        gym: "Cult.fit Banjara Hills",
        rating: 5,
        date: "2 days ago",
        verified: true,
        comment: "Insane pump cover. The fabric weight (240 GSM) is legit heavy duty. Ordered in morning, got it delivered to Madhapur by evening COD."
      },
      {
        id: "r2",
        author: "Varun Verma",
        gym: "Gold's Gym Jubilee Hills",
        rating: 5,
        date: "1 week ago",
        verified: true,
        comment: "Drop shoulder drape looks identical to the on-athlete hover picture. Fits wide through the chest without feeling like a tent."
      }
    ],
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad - 500034",
      phone: "+91 99887 76655"
    },
    variants: [
      { id: 101, size: "S", stockQuantity: 15 },
      { id: 102, size: "M", stockQuantity: 25 },
      { id: 103, size: "L", stockQuantity: 4 },
      { id: 104, size: "XL", stockQuantity: 12 },
      { id: 105, size: "XXL", stockQuantity: 8 },
    ]
  },
  {
    id: 2,
    name: "AuraFlex Sculpt Tennis & Gym Active Dress",
    category: { slug: "active-dresses-sets", name: "Active Dresses & Sets" },
    gender: "Women",
    price: 1499,
    originalPrice: 2499,
    discountPercent: 40,
    apparelImageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
    modelImageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "78% Nylon, 22% Spandex ButterSoft Fabric",
    fitType: "Athletic Sculpted Fit",
    badge: "TRENDING DROP",
    rating: 4.95,
    reviewCount: 112,
    description: "Built-in compression bodysuit with ball pockets and dual phone holsters. Crafted with four-way stretch ButterSoft fabric tailored for Hyderabadi fitness enthusiasts.",
    highlights: [
      "Built-in shelf bra with removable cups",
      "Integrated inner shorts with dual side pockets",
      "Zero-chafing flatlock seam construction",
      "Four-way squat-proof stretch"
    ],
    sizeGuide: {
      XS: { chest: "32 in", waist: "25 in", length: "30 in" },
      S: { chest: "34 in", waist: "27 in", length: "31 in" },
      M: { chest: "36 in", waist: "29 in", length: "32 in" },
      L: { chest: "38 in", waist: "31 in", length: "33 in" }
    },
    reviews: [
      {
        id: "r3",
        author: "Pooja Hegde",
        gym: "AuraFlex Jubilee Hills",
        rating: 5,
        date: "3 days ago",
        verified: true,
        comment: "The built-in shorts stay put and don't ride up at all during sprints. Fabric feels like a ₹4,000 international brand."
      }
    ],
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad - 500033",
      phone: "+91 91234 56789"
    },
    variants: [
      { id: 201, size: "XS", stockQuantity: 10 },
      { id: 202, size: "S", stockQuantity: 18 },
      { id: 203, size: "M", stockQuantity: 2 },
      { id: 204, size: "L", stockQuantity: 14 },
    ]
  },
  {
    id: 3,
    name: "IronCore Raw-Cut Gym Stringer",
    category: { slug: "stringers-tanks", name: "Stringers & Tanks" },
    gender: "Men",
    price: 699,
    originalPrice: 1199,
    discountPercent: 42,
    apparelImageUrl: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
    modelImageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "95% Combed Cotton, 5% Lycra Breathable",
    fitType: "Deep Cut Stringer",
    badge: "FLAT 42% OFF",
    rating: 4.8,
    reviewCount: 46,
    description: "Deep armhole and narrow Y-back design cut to showcase trap, lat, and chest activation with zero fabric restriction.",
    highlights: [
      "Deep side vents for unrestricted lat pulldowns",
      "Y-back strap contour",
      "Breathable sweat-wicking lightweight cotton blend"
    ],
    sizeGuide: {
      S: { chest: "38 in", length: "28 in", shoulder: "11 in" },
      M: { chest: "41 in", length: "29 in", shoulder: "11.5 in" },
      L: { chest: "44 in", length: "30 in", shoulder: "12 in" },
      XL: { chest: "47 in", length: "31 in", shoulder: "12.5 in" }
    },
    reviews: [
      {
        id: "r4",
        author: "Sai Charan",
        gym: "Steel Gym Madhapur",
        rating: 5,
        date: "5 days ago",
        verified: true,
        comment: "Great cut for back days. Y-back doesn't slip down your shoulders during deadlifts."
      }
    ],
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad - 500034",
      phone: "+91 99887 76655"
    },
    variants: [
      { id: 301, size: "S", stockQuantity: 8 },
      { id: 302, size: "M", stockQuantity: 30 },
      { id: 303, size: "L", stockQuantity: 25 },
      { id: 304, size: "XL", stockQuantity: 15 },
    ]
  },
  {
    id: 4,
    name: "AuraFlex Seamless Ribbed Crop & Legging Set",
    category: { slug: "active-dresses-sets", name: "Active Dresses & Sets" },
    gender: "Women",
    price: 1799,
    originalPrice: 2999,
    discountPercent: 40,
    apparelImageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
    modelImageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "Seamless Micro-Ribbed High-Compression Fabric",
    fitType: "Second-Skin Compression",
    badge: "LIMITED EDITION",
    rating: 4.9,
    reviewCount: 67,
    description: "Two-piece ribbed athletic workout set. High compressive waistband holds you in with zero roll-down during deep squats.",
    highlights: [
      "High waist 4.5\" ribbed compressive band",
      "Sweat-concealing moisture transfer technology",
      "Includes both long-sleeve crop top & full-length leggings"
    ],
    sizeGuide: {
      S: { chest: "32-34 in", waist: "25-27 in", hip: "34-36 in" },
      M: { chest: "35-37 in", waist: "28-30 in", hip: "37-39 in" },
      L: { chest: "38-40 in", waist: "31-33 in", hip: "40-42 in" }
    },
    reviews: [
      {
        id: "r5",
        author: "Meera Nair",
        gym: "Anytime Fitness Kondapur",
        rating: 5,
        date: "2 weeks ago",
        verified: true,
        comment: "Completely squat-proof! Passed the flash test and the ribbed compression is very flattering."
      }
    ],
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad - 500033",
      phone: "+91 91234 56789"
    },
    variants: [
      { id: 401, size: "S", stockQuantity: 14 },
      { id: 402, size: "M", stockQuantity: 20 },
      { id: 403, size: "L", stockQuantity: 16 },
    ]
  },
  {
    id: 5,
    name: "IronCore Tapered Zip-Pocket Gym Joggers",
    category: { slug: "joggers-shorts", name: "Joggers & Shorts" },
    gender: "Men",
    price: 1199,
    originalPrice: 1899,
    discountPercent: 36,
    apparelImageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000&auto=format&fit=crop",
    modelImageUrl: "https://images.unsplash.com/photo-1483721074574-e8b919d8544e?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483721074574-e8b919d8544e?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "Poly-Spandex Brushed French Terry with 4-Way Flex",
    fitType: "Ankle Cuffed Tapered",
    badge: "NEW DROP",
    rating: 4.7,
    reviewCount: 39,
    description: "Fitted around the calves with ample thigh room for squats. Heavy-duty YKK zipper pockets ensure phones don't slip out on the bench.",
    highlights: [
      "Dual deep concealed YKK zipper pockets",
      "Cuffed rib ankles that don't catch on barbell knurling",
      "Thick elastic drawstring waistband"
    ],
    sizeGuide: {
      M: { waist: "30-32 in", length: "39 in", thigh: "24 in" },
      L: { waist: "32-34 in", length: "40 in", thigh: "25.5 in" },
      XL: { waist: "35-37 in", length: "41 in", thigh: "27 in" }
    },
    reviews: [
      {
        id: "r6",
        author: "Arjun Rao",
        gym: "Golds Gym Gachibowli",
        rating: 5,
        date: "4 days ago",
        verified: true,
        comment: "Phone stays secure during leg press. Fits snug around calves, spacious on quads."
      }
    ],
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad - 500034",
      phone: "+91 99887 76655"
    },
    variants: [
      { id: 501, size: "M", stockQuantity: 18 },
      { id: 502, size: "L", stockQuantity: 22 },
      { id: 503, size: "XL", stockQuantity: 10 },
    ]
  },
  {
    id: 6,
    name: "AuraFlex High-Impact Cross-Back Sports Bra",
    category: { slug: "compression-wear", name: "Compression Wear" },
    gender: "Women",
    price: 799,
    originalPrice: 1299,
    discountPercent: 38,
    apparelImageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    modelImageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "Breathable High-Bounce Lycra with Removable Cups",
    fitType: "High Impact Support",
    badge: "BESTSELLER",
    rating: 4.85,
    reviewCount: 52,
    description: "Designed for high intensity interval training, boxing, and heavy running. Wide cross-back straps distribute shoulder pressure evenly.",
    highlights: [
      "Maximum anti-bounce support for high-impact cardio",
      "Removable ergonomic cups",
      "Laser-perforated back ventilation panel"
    ],
    sizeGuide: {
      S: { bust: "32B, 32C, 34A", underbust: "27-29 in" },
      M: { bust: "34B, 34C, 36A", underbust: "30-32 in" },
      L: { bust: "36B, 36C, 38B", underbust: "33-35 in" }
    },
    reviews: [
      {
        id: "r7",
        author: "Divya Teja",
        gym: "F45 Training Jubilee Hills",
        rating: 5,
        date: "6 days ago",
        verified: true,
        comment: "Zero bounce during box jumps and sprints. Highly recommended."
      }
    ],
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad - 500033",
      phone: "+91 91234 56789"
    },
    variants: [
      { id: 601, size: "S", stockQuantity: 12 },
      { id: 602, size: "M", stockQuantity: 20 },
      { id: 603, size: "L", stockQuantity: 15 },
    ]
  },
  {
    id: 7,
    name: "IronCore Vintage Acid Heavyweight Boxy Tee",
    category: { slug: "oversized-tees", name: "Oversized Tees" },
    gender: "Unisex",
    price: 1099,
    originalPrice: 1699,
    discountPercent: 35,
    apparelImageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
    modelImageUrl: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "100% Bio-Washed Vintage Cotton (250 GSM)",
    fitType: "Relaxed Boxy Fit",
    badge: "HYD EXCLUSIVE",
    rating: 4.88,
    reviewCount: 91,
    description: "Mineral acid washed for a worn-in vintage athletic texture. Boxy torso silhouette drape creates an imposing physique profile.",
    highlights: [
      "250 GSM mineral washed heavy cotton",
      "Boxy streetwear silhouette",
      "Screen printed with non-cracking plastisol inks in Banjara Hills"
    ],
    sizeGuide: {
      S: { chest: "43 in", length: "28.5 in" },
      M: { chest: "46 in", length: "29.5 in" },
      L: { chest: "49 in", length: "30.5 in" },
      XL: { chest: "52 in", length: "31.5 in" }
    },
    reviews: [
      {
        id: "r8",
        author: "Nikhil Chary",
        gym: "Fitness One Madhapur",
        rating: 5,
        date: "3 days ago",
        verified: true,
        comment: "Material quality beats fast fashion brands hands down. Feels substantial and breathable."
      }
    ],
    store: {
      id: 1,
      storeName: "IronCore Activewear Hub",
      locality: "Banjara Hills",
      address: "Road No 10, Banjara Hills, Hyderabad - 500034",
      phone: "+91 99887 76655"
    },
    variants: [
      { id: 701, size: "S", stockQuantity: 10 },
      { id: 702, size: "M", stockQuantity: 15 },
      { id: 703, size: "L", stockQuantity: 18 },
      { id: 704, size: "XL", stockQuantity: 8 },
    ]
  },
  {
    id: 8,
    name: "AuraFlex 6\" Sculpting High-Waist Biker Shorts",
    category: { slug: "joggers-shorts", name: "Joggers & Shorts" },
    gender: "Women",
    price: 849,
    originalPrice: 1399,
    discountPercent: 39,
    apparelImageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
    modelImageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop"
    ],
    fabricDetails: "ButterSoft Non-Sheer Spandex",
    fitType: "High Waist 6-inch Inseam",
    badge: "POPULAR",
    rating: 4.91,
    reviewCount: 73,
    description: "6-inch inseam athletic biker shorts designed to prevent inner thigh rub and chafing during heavy leg presses, treadmill sprints, and outdoor running.",
    highlights: [
      "No front center seam for zero camel toe",
      "Two deep smartphone side pockets",
      "100% squat-proof compression coverage"
    ],
    sizeGuide: {
      XS: { waist: "23-25 in", hip: "33-35 in", inseam: "6 in" },
      S: { waist: "26-28 in", hip: "36-38 in", inseam: "6 in" },
      M: { waist: "29-31 in", hip: "39-41 in", inseam: "6 in" },
      L: { waist: "32-34 in", hip: "42-44 in", inseam: "6 in" }
    },
    reviews: [
      {
        id: "r9",
        author: "Shreya Sen",
        gym: "Cult Madhapur",
        rating: 5,
        date: "Yesterday",
        verified: true,
        comment: "The pockets easily hold an iPhone 15 Pro Max without sagging! Super soft fabric."
      }
    ],
    store: {
      id: 2,
      storeName: "AuraFlex Athletic Studios",
      locality: "Jubilee Hills",
      address: "Road No 36, Jubilee Hills, Hyderabad - 500033",
      phone: "+91 91234 56789"
    },
    variants: [
      { id: 801, size: "XS", stockQuantity: 8 },
      { id: 802, size: "S", stockQuantity: 16 },
      { id: 803, size: "M", stockQuantity: 24 },
      { id: 804, size: "L", stockQuantity: 12 },
    ]
  }
];

export const fetchProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'all') params.append('category', filters.category);
    if (filters.gender && filters.gender !== 'all') params.append('gender', filters.gender);
    if (filters.locality && filters.locality !== 'all') params.append('locality', filters.locality);
    if (filters.query) params.append('query', filters.query);

    const response = await api.get(`/products?${params.toString()}`);
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return INITIAL_PRODUCTS;
  } catch (error) {
    // High-performance fallback with full filtering support
    let filtered = [...INITIAL_PRODUCTS];
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(p => p.category?.slug === filters.category);
    }
    if (filters.gender && filters.gender !== 'all') {
      filtered = filtered.filter(p => p.gender?.toLowerCase() === filters.gender?.toLowerCase() || p.gender === 'Unisex');
    }
    if (filters.locality && filters.locality !== 'all') {
      filtered = filtered.filter(p => p.store?.locality?.toLowerCase().includes(filters.locality.toLowerCase()));
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description?.toLowerCase().includes(q) ||
        p.fabricDetails?.toLowerCase().includes(q) ||
        p.store?.storeName.toLowerCase().includes(q)
      );
    }
    if (filters.sortBy) {
      if (filters.sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
    }
    return filtered;
  }
};
