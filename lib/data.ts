// Swiggy analytics dataset derived from the project's KPI SQL queries
// (fact_swiggy_orders star schema: dim_date, dim_location, dim_restaurant,
//  dim_category, dim_dish). Values are representative aggregates.

export const kpis = {
  totalOrders: 75920,
  totalRevenue: 37640000, // ~3.76 Cr
  avgOrderValue: 495.78,
  avgRating: 4.3,
  ordersDelta: 12.4,
  revenueDelta: 9.8,
  aovDelta: -2.1,
  ratingDelta: 1.6,
}

// Orders & revenue by month (dim_date join)
export const monthly = [
  { month: "Jan", orders: 5240, revenue: 2598000 },
  { month: "Feb", orders: 4980, revenue: 2469000 },
  { month: "Mar", orders: 6120, revenue: 3034000 },
  { month: "Apr", orders: 5890, revenue: 2921000 },
  { month: "May", orders: 6610, revenue: 3278000 },
  { month: "Jun", orders: 6840, revenue: 3392000 },
  { month: "Jul", orders: 7120, revenue: 3531000 },
  { month: "Aug", orders: 6950, revenue: 3447000 },
  { month: "Sep", orders: 6480, revenue: 3213000 },
  { month: "Oct", orders: 7240, revenue: 3590000 },
  { month: "Nov", orders: 7010, revenue: 3476000 },
  { month: "Dec", orders: 5440, revenue: 2691000 },
]

export const quarterly = [
  { quarter: "Q1", orders: 16340 },
  { quarter: "Q2", orders: 19340 },
  { quarter: "Q3", orders: 20550 },
  { quarter: "Q4", orders: 19690 },
]

// Orders by price range (CASE buckets)
export const priceRanges = [
  { range: "Under 100", orders: 4820 },
  { range: "100-199", orders: 12680 },
  { range: "200-299", orders: 18940 },
  { range: "300-499", orders: 24310 },
  { range: "500+", orders: 15170 },
]

// Orders by day of week (EXTRACT DOW)
export const ordersByDay = [
  { day: "Sun", orders: 13420 },
  { day: "Mon", orders: 8910 },
  { day: "Tue", orders: 8240 },
  { day: "Wed", orders: 8680 },
  { day: "Thu", orders: 9120 },
  { day: "Fri", orders: 11890 },
  { day: "Sat", orders: 15660 },
]

// Top 10 cities by order volume (dim_location)
export const topCities = [
  { city: "Bengaluru", orders: 11240 },
  { city: "Mumbai", orders: 9870 },
  { city: "Delhi", orders: 9210 },
  { city: "Hyderabad", orders: 7650 },
  { city: "Pune", orders: 6420 },
  { city: "Chennai", orders: 5980 },
  { city: "Kolkata", orders: 5210 },
  { city: "Ahmedabad", orders: 4360 },
  { city: "Jaipur", orders: 3540 },
  { city: "Gurugram", orders: 3120 },
]

// Revenue by state
export const revenueByState = [
  { state: "Karnataka", revenue: 6940000 },
  { state: "Maharashtra", revenue: 6510000 },
  { state: "Delhi NCR", revenue: 5880000 },
  { state: "Telangana", revenue: 4120000 },
  { state: "Tamil Nadu", revenue: 3460000 },
  { state: "West Bengal", revenue: 2740000 },
  { state: "Gujarat", revenue: 2380000 },
  { state: "Rajasthan", revenue: 1910000 },
]

// Top 10 restaurants by revenue
export const topRestaurants = [
  { name: "Meghana Foods", revenue: 1284000, orders: 2410, rating: 4.5 },
  { name: "Truffles", revenue: 1142000, orders: 2180, rating: 4.4 },
  { name: "Empire Restaurant", revenue: 1068000, orders: 2360, rating: 4.2 },
  { name: "Paradise Biryani", revenue: 982000, orders: 1890, rating: 4.3 },
  { name: "Behrouz Biryani", revenue: 914000, orders: 1620, rating: 4.4 },
  { name: "Faasos", revenue: 868000, orders: 2040, rating: 4.1 },
  { name: "A2B - Adyar Ananda Bhavan", revenue: 792000, orders: 1780, rating: 4.3 },
  { name: "Pizza Hut", revenue: 740000, orders: 1410, rating: 4.0 },
  { name: "Wow! Momo", revenue: 688000, orders: 1920, rating: 4.2 },
  { name: "Burger King", revenue: 642000, orders: 1340, rating: 4.1 },
]

// Top categories by volume + avg rating (cuisine performance)
export const categories = [
  { category: "Biryani", orders: 14320, rating: 4.4 },
  { category: "North Indian", orders: 12180, rating: 4.2 },
  { category: "South Indian", orders: 9840, rating: 4.5 },
  { category: "Chinese", orders: 8720, rating: 4.1 },
  { category: "Pizza", orders: 6540, rating: 4.0 },
  { category: "Desserts", orders: 5910, rating: 4.6 },
  { category: "Burgers", orders: 4830, rating: 4.1 },
  { category: "Rolls & Wraps", orders: 4210, rating: 4.2 },
]

// Most ordered dishes
export const topDishes = [
  { dish: "Chicken Biryani", orders: 6840 },
  { dish: "Masala Dosa", orders: 5210 },
  { dish: "Paneer Butter Masala", orders: 4680 },
  { dish: "Veg Fried Rice", orders: 4120 },
  { dish: "Chicken 65", orders: 3890 },
  { dish: "Gulab Jamun", orders: 3540 },
  { dish: "Margherita Pizza", orders: 3210 },
  { dish: "Chicken Momos", orders: 2980 },
]

export const navItems = [
  { id: "overview", label: "Overview", icon: "LayoutDashboard" },
  { id: "revenue", label: "Revenue", icon: "TrendingUp" },
  { id: "restaurants", label: "Restaurants", icon: "Store" },
  { id: "menu", label: "Menu & Dishes", icon: "UtensilsCrossed" },
  { id: "geography", label: "Geography", icon: "MapPin" },
] as const
