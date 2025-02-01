const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate travel plan for location : India for 4 days and 3 night for Family with a Standard budget with a flight details,flight price with booking url, hotels option list with hotelname,hotel address,price,hotel image url,geo coordinates,rating,description and places to visit nearby with placename,place details,place image url,geo coordinates,ticket pricing,time travel each of the location for 4 days and 3 night with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: 'Okay, let\'s craft a 4-day, 3-night India travel plan for a family with a standard budget. Given the vastness of India, I\'ll focus on a popular and accessible region: **Delhi, Agra, and Jaipur (the Golden Triangle)**. This offers a good mix of history, culture, and iconic landmarks.\n\n**Important Considerations:**\n\n*   **Standard Budget:** This assumes a mid-range budget, focusing on comfortable but not luxury accommodations and experiences. I\'ll provide estimated costs; actual prices can vary.\n*   **Time of Year:** October to March is generally the best time to visit this region due to pleasant weather. I\'ll assume this timeframe for optimal experience.\n*   **Family Composition:** I\'m assuming a family with children. The plan includes a balance of activity and relaxation.\n*   **Travel Style:** This plan is relatively structured, but you can customize it to your preferences.\n\n**JSON Format Travel Plan:**\n\n```json\n{\n  "tripName": "Golden Triangle Family Adventure",\n  "duration": "4 Days, 3 Nights",\n  "location": "Delhi, Agra, Jaipur",\n    "bestTimeToVisit": "October to March",\n  "flights": {\n    "example": "Please fill in your actual flight details based on your origin and desired travel dates."\n  },\n     "flightDetails": {\n      "departureAirport": "Your Departure Airport Code",\n      "arrivalAirport": "Indira Gandhi International Airport (DEL)",\n      "departureDate": "YYYY-MM-DD",\n      "returnDate": "YYYY-MM-DD",\n      "approxFlightPrice": "USD 300 - 600 Per Person (Round trip)",\n      "bookingURL": "www.skyscanner.com (or preferred flight booking platform)"\n    },\n  "hotels": [\n       {\n        "hotelName": "The Metropolitan Hotel & Spa, New Delhi",\n        "hotelAddress": "Bangla Sahib Road, Connaught Place, New Delhi, Delhi 110001",\n        "pricePerNight": "USD 100-150",\n         "hotelImageURL": "https://example.com/metropolitanhotel.jpg",\n        "geoCoordinates": {\n          "latitude": 28.6312,\n          "longitude": 77.2195\n        },\n        "rating": 4.5,\n        "description": "A modern, well-appointed hotel in the heart of Delhi, with great amenities and service. Near shopping and major attractions.",\n          "additionalNotes": "Good choice for families and couples"\n      },\n      {\n          "hotelName": "Radisson Blu Agra Taj East Gate",\n        "hotelAddress": "Taj East Gate Road, Agra, Uttar Pradesh, 282001, India",\n        "pricePerNight": "USD 90-130",\n           "hotelImageURL": "https://example.com/radissonagra.jpg",\n          "geoCoordinates": {\n          "latitude": 27.1653,\n           "longitude": 78.0665\n        },\n        "rating": 4.2,\n        "description": "A comfortable hotel near the Taj Mahal with good dining options.",\n        "additionalNotes": "Offers family-friendly rooms"\n      },\n       {\n          "hotelName": "Hotel Diggi Palace, Jaipur",\n          "hotelAddress": "Diggi House, Shivaji Marg, C-Scheme, Jaipur, Rajasthan 302001",\n          "pricePerNight": "USD 70-110",\n         "hotelImageURL": "https://example.com/diggipalace.jpg",\n           "geoCoordinates": {\n          "latitude": 26.9181,\n          "longitude": 75.8035\n          },\n        "rating": 4.3,\n          "description": "A heritage hotel in a peaceful setting with Rajasthani decor.",\n           "additionalNotes": "Enjoy beautiful gardens and cultural ambiance"\n      }\n  ],\n    "dailyPlan": [\n      {\n            "day": 1,\n        "city": "Delhi",\n        "theme": "Exploring Delhi\'s historical charm and markets.",\n        "activities": [\n           {\n                "placeName": "Qutub Minar",\n            "placeDetails": "A towering minaret showcasing Indo-Islamic architecture. UNESCO World Heritage site.",\n            "placeImageURL": "https://example.com/qutubminar.jpg",\n           "geoCoordinates": {\n                "latitude": 28.5245,\n                "longitude": 77.1855\n            },\n             "ticketPricing": "INR 60 for foreign nationals, INR 40 for Indian citizens",\n            "timeTravel": "30-45 minutes from Connaught Place",\n              "bestTimeToVisit": "Morning or late afternoon"\n          },\n          {\n               "placeName": "Humayun\'s Tomb",\n            "placeDetails": "A magnificent Mughal tomb, precursor to the Taj Mahal. UNESCO World Heritage Site.",\n            "placeImageURL": "https://example.com/humayunstomb.jpg",\n            "geoCoordinates": {\n              "latitude": 28.5933,\n                "longitude": 77.2507\n             },\n             "ticketPricing": "INR 60 for foreign nationals, INR 40 for Indian citizens",\n            "timeTravel": "20-30 minutes from Qutub Minar",\n             "bestTimeToVisit": "Morning or evening"\n           },\n            {\n              "placeName": "Chandni Chowk",\n                "placeDetails": "A bustling market offering a glimpse into Old Delhi\'s vibrant culture, street food, and shopping.",\n                 "placeImageURL": "https://example.com/chandnichowk.jpg",\n              "geoCoordinates": {\n                  "latitude": 28.6500,\n                   "longitude": 77.2318\n              },\n            "ticketPricing": "Free (Shopping and food costs vary)",\n              "timeTravel": "30-40 minutes from Humayun\'s Tomb",\n            "bestTimeToVisit": "Late afternoon to evening"\n           }\n        ],\n        "notes": "Start early to avoid crowds. Take a rickshaw ride in Chandni Chowk. Enjoy street food with caution."\n    },\n      {\n        "day": 2,\n        "city": "Agra",\n           "theme": "Witnessing the iconic Taj Mahal and Agra Fort.",\n            "activities": [\n              {\n                  "placeName": "Taj Mahal",\n                   "placeDetails": "An iconic ivory-white marble mausoleum, a symbol of eternal love. UNESCO World Heritage site.",\n                    "placeImageURL": "https://example.com/tajmahal.jpg",\n                    "geoCoordinates": {\n                     "latitude": 27.1750,\n                      "longitude": 78.0422\n                },\n                   "ticketPricing": "INR 1300 for foreign nationals, INR 250 for Indian citizens",\n                   "timeTravel": "3-4 hour drive from Delhi",\n                "bestTimeToVisit": "Sunrise or sunset"\n               },\n              {\n                    "placeName": "Agra Fort",\n                   "placeDetails": "A massive fort made of red sandstone, with beautiful palaces, mosques, and gardens. UNESCO World Heritage Site.",\n                   "placeImageURL": "https://example.com/agrafort.jpg",\n                 "geoCoordinates": {\n                      "latitude": 27.1792,\n                      "longitude": 78.0212\n                    },\n                  "ticketPricing": "INR 650 for foreign nationals, INR 70 for Indian citizens",\n                   "timeTravel": "15-20 minutes from Taj Mahal",\n                   "bestTimeToVisit": "Late afternoon"\n            },\n             {\n              "placeName": "Mehtab Bagh",\n                 "placeDetails": "A garden complex across the Yamuna River offering a great view of the Taj Mahal at sunset.",\n               "placeImageURL": "https://example.com/mehtabbagh.jpg",\n                 "geoCoordinates": {\n                      "latitude": 27.1782,\n                      "longitude": 78.0128\n                    },\n                   "ticketPricing": "INR 300 for foreign nationals, INR 20 for Indian citizens",\n                  "timeTravel": "20-30 minutes from Agra Fort",\n                    "bestTimeToVisit": "Sunset"\n           }\n            ],\n            "notes": "Hire a guide for Taj Mahal and Agra Fort. Be prepared for crowds. Consider a pre-booked car for the day."\n      },\n        {\n        "day": 3,\n        "city": "Jaipur",\n        "theme": "Exploring the pink city and its royal heritage.",\n        "activities": [\n           {\n               "placeName": "Amer Fort",\n              "placeDetails": "A majestic fort with beautiful palaces, temples, and gardens. Known for its stunning architecture and elephant ride.",\n              "placeImageURL": "https://example.com/amerfort.jpg",\n             "geoCoordinates": {\n                   "latitude": 26.9854,\n                   "longitude": 75.8513\n               },\n               "ticketPricing": "INR 550 for foreign nationals, INR 100 for Indian citizens",\n              "timeTravel": "4-5 hours drive from Agra",\n                "bestTimeToVisit": "Morning to avoid the heat"\n           },\n           {\n              "placeName": "City Palace",\n                "placeDetails": "A palace complex with a blend of Rajasthani and Mughal architecture, museums, and courtyards.",\n                 "placeImageURL": "https://example.com/citypalacejaipur.jpg",\n                 "geoCoordinates": {\n                    "latitude": 26.9257,\n                     "longitude": 75.8236\n                 },\n                "ticketPricing": "INR 700 for foreign nationals, INR 200 for Indian citizens",\n               "timeTravel": "30-40 minutes from Amer Fort",\n              "bestTimeToVisit": "Afternoon"\n           },\n           {\n                "placeName": "Hawa Mahal",\n                "placeDetails": "The Palace of Winds, an iconic five-story structure known for its intricate facade.",\n                 "placeImageURL": "https://example.com/hawamahal.jpg",\n                 "geoCoordinates": {\n                    "latitude": 26.9239,\n                     "longitude": 75.8267\n                    },\n              "ticketPricing": "INR 200 for foreign nationals, INR 50 for Indian citizens",\n              "timeTravel": "15-20 minutes from City Palace",\n                "bestTimeToVisit": "Late afternoon to evening"\n            }\n        ],\n        "notes": "Try to arrange the Elephant ride early at Amer Fort. Do some shopping in Jaipur\'s local markets. Consider trying Rajasthani cuisine."\n      },\n       {\n        "day": 4,\n        "city": "Departure",\n        "theme": "Departure from Jaipur or Delhi",\n         "activities":[\n            {\n              "placeName": "Jantar Mantar",\n                "placeDetails":"An astronomical observatory with fascinating instruments. UNESCO World Heritage site.",\n                  "placeImageURL": "https://example.com/jantarmantarjaipur.jpg",\n                  "geoCoordinates": {\n                      "latitude": 26.9250,\n                       "longitude": 75.8224\n                      },\n                   "ticketPricing": "INR 200 for foreign nationals, INR 50 for Indian citizens",\n                     "timeTravel": "10-15 minutes from City Palace",\n                       "bestTimeToVisit": "Morning or late afternoon"\n              },\n              {\n              "placeName": "Departure from Jaipur/Delhi",\n                 "placeDetails": "Travel to Jaipur Airport (JAI) or back to Delhi Airport (DEL) depending on flight",\n                    "placeImageURL": "https://example.com/airport.jpg",\n                    "geoCoordinates": {\n                      "latitude": 26.8230,\n                       "longitude": 75.8118\n                      },\n                   "ticketPricing": "Airport transfer costs will vary",\n                     "timeTravel": "Travel time to Airport depend on location",\n                       "bestTimeToVisit": "Based on Flight timing"\n\n              }\n\n          ],\n         "notes": "Enjoy a relaxed morning. Visit local market for last minute souvenir shopping. Make sure you are at the airport at least 3 hours before your flight departure."\n        }\n    ]\n}\n```\n\n**Important Notes and Customization:**\n\n*   **Transportation:**  Consider hiring a car with a driver for ease and comfort, especially with family. Trains are also an option, but may require more planning.\n*   **Food:**  Sample local cuisine. Be cautious with street food, ensure it\'s freshly prepared.\n*   **Shopping:**  Bargaining is common in markets.\n*   **Flexibility:**  Adjust the itinerary based on your family\'s interests and preferences. You can spend more time in a place you like.\n*   **Booking:**  Book flights and hotels in advance, especially during peak season.\n*  **Cost:** Budget costs can vary depending on your travel dates and specific choices. This plan is built for a standard budget, so actual costs may be higher or lower.\n\n**How to Use this Plan:**\n\n1.  **Replace Placeholders:**  Fill in the actual flight details, hotel preferences, and add any additional family needs.\n2.  **Bookings:** Use the hotel information to book your accommodations online. Skyscanner, MakeMyTrip and Goibibo are good for flights.\n3.  **Adjust:** Make changes based on your family\'s likes.\n4.  **Enjoy:** Have a wonderful and unforgettable trip to India!\n\nRemember that the provided image URLs are examples. You would need to replace those with actual image links.\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
