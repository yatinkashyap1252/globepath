export const TravelerOptionsList = [
  {
    id: 1,
    name: "Just me",
    desc: "Traveling solo",
    icon: "🧍",
    people: "1",
  },
  {
    id: 2,
    name: "Couple",
    desc: "Traveling as a couple",
    icon: "❤️",
    people: "2",
  },
  {
    id: 3,
    name: "Family",
    desc: "Traveling with family",
    icon: "👨‍👩‍👧‍👦",
    people: "3-5",
  },
  {
    id: 4,
    name: "Group of friends",
    desc: "Traveling with friends",
    icon: "👫",
    people: "6-10",
  },
  {
    id: 5,
    name: "Large group",
    desc: "Traveling with a large group",
    icon: "👨‍👩‍👧‍👦👫",
    people: "11+",
  },
];

export const BudgetOptionsList = [
  {
    id: 1,
    name: "Economy",
    desc: "Affordable options for budget-friendly travel.",
    icon: "💰",
  },
  {
    id: 2,
    name: "Standard",
    desc: "Balanced comfort and cost for regular travelers.",
    icon: "🛋️",
  },
  {
    id: 3,
    name: "Premium",
    desc: "Enhanced amenities and convenience for an upgraded experience.",
    icon: "✨",
  },
  {
    id: 4,
    name: "Luxury",
    desc: "Top-tier accommodations and services for premium travelers.",
    icon: "🏨",
  },
  {
    id: 5,
    name: "Backpacker",
    desc: "Ideal for solo travelers or adventure enthusiasts on a budget.",
    icon: "🎒",
  },
  {
    id: 6,
    name: "Group Travel",
    desc: "Cost-effective plans for traveling in groups.",
    icon: "👥",
  },
  {
    id: 7,
    name: "Business",
    desc: "Exclusive plans with corporate amenities for business trips.",
    icon: "💼",
  },
];

export const AI_PROMPTS =
  "generate travel plan for location : {location} for {totalDays} days and {totalNight} night for {traveler} with a {budget} budget with a flight details,flight price with booking url, hotels option list with hotelname,hotel address,price,hotel image url,geo coordinates,rating,description and places to visit nearby with placename,place details,place image url,geo coordinates,ticket pricing,time travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format";
