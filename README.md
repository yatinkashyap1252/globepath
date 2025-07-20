# AI Travel Planner

AI Travel Planner is a React Native mobile application built with Expo that helps users create personalized travel itineraries. The app leverages AI to generate customized travel plans based on user inputs such as destination, traveler count, budget, and travel dates. It provides flight options, hotel recommendations, curated activities, and comprehensive travel information to ensure a seamless travel planning experience.

## Features

- **Personalized Travel Plans**  
  Generate customized itineraries tailored to your preferences including destination, budget, and dates.

- **Flight Recommendations**  
  Get a list of flights that fit your schedule and budget with ticket fares, timings, airline options, and travel time estimates.

- **Hotel Suggestions**  
  Receive hotel recommendations with key details such as price, amenities, images, and locations.

- **Curated Activities**  
  Discover activities tailored to your destination with descriptions, pricing, ticket info, and best times to visit.

- **Comprehensive Travel Information**  
  Access rich details including images, descriptions, and travel tips for each suggestion.

- **Dynamic and Customizable**  
  Easily adjust your preferences and get updated itineraries to keep your travel plans flexible.

- **User Authentication**  
  Secure login and user-specific trip management using Firebase Authentication.

- **Trip Management**  
  View, expand, and manage your trips with detailed daily plans, hotels, and flight details.

- **Easy-to-Use Interface**  
  Intuitive UI with tab navigation for "My Trip" and "Document" sections.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ai_travel_app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npx expo start
   ```

4. Use the Expo Go app or an emulator to run the app on your device.

## Project Structure

- `app/` - Main application code including screens and routing.
- `components/` - Reusable React Native components.
- `configs/` - Configuration files including Firebase setup.
- `constants/` - Constant values and options used across the app.
- `context/` - React context for managing global state (e.g., trip data).
- `services/` - External service integrations (e.g., Google Images).
- `assets/` - Fonts, images, and other static assets.

## Usage

- On launch, users are prompted to log in.
- Authenticated users are redirected to the "My Trip" tab where they can view and manage their trips.
- The "Document" tab provides detailed documentation about the app's features and development challenges.
- Users can create new trips, view daily plans, hotel suggestions, and flight details.

## Challenges and Learnings

- Efficiently handling large lists with React Native's `FlatList` and pagination.
- Structuring components for modularity and scalability.
- Responsive design for different screen sizes and devices.
- Managing API calls and dynamic image paths with error handling and fallbacks.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for any improvements or bug fixes.

## License

This project is private and not publicly licensed.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
