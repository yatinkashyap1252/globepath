import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";

const documents = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Main Heading */}
      <Text style={styles.mainHeading}>AI Travel Planner - Documentation</Text>

      {/* Intro Text */}
      <Text style={styles.introText}>
        Welcome to the official documentation of the AI Travel Planner app!
        Here, you can explore all the features, understand how the app works,
        and see how you can customize your travel plans based on your inputs.
        This guide will walk you through the app’s functionality, and what
        challenges were faced and overcome during development.
      </Text>

      {/* Features Overview */}
      <Text style={styles.subHeading}>Features Overview</Text>

      <Text style={styles.featureDescription}>
        The app generates personalized travel itineraries based on inputs like
        destination, traveler count, budget, and dates. It provides flight
        options, hotel recommendations, curated activities, and comprehensive
        travel information.
      </Text>
      <View style={styles.featureContainer}>
        <Ionicons name="airplane" size={30} color="#4CAF50" />
        <View style={styles.textContainer}>
          <Text style={styles.featureTitle}>Personalized Travel Plans</Text>
          <Text style={styles.featureDescription}>
            The AI uses your input (destination, traveler count, budget, and
            dates) to generate a customized travel itinerary, providing tailored
            suggestions for flights, hotels, and activities.
          </Text>
        </View>
      </View>

      {/* Flight Recommendations */}
      <View style={styles.featureContainer}>
        <Ionicons name="airplane-outline" size={30} color="#FF9800" />
        <View style={styles.textContainer}>
          <Text style={styles.featureTitle}>Flight Recommendations</Text>
          <Text style={styles.featureDescription}>
            Get a list of flights that best fit your schedule and budget. The AI
            provides ticket fares, timings, airline options, and travel time
            estimates to help you choose the best flight for your trip.
          </Text>
        </View>
      </View>

      {/* Hotel Suggestions */}
      <View style={styles.featureContainer}>
        <Entypo name="home" size={30} color="#2196F3" />
        <View style={styles.textContainer}>
          <Text style={styles.featureTitle}>Hotel Suggestions</Text>
          <Text style={styles.featureDescription}>
            Based on your travel destination and budget, the AI suggests hotels
            with key information such as price, amenities, images, and locations
            to help you find the perfect place to stay.
          </Text>
        </View>
      </View>

      {/* Activity Suggestions */}
      <View style={styles.featureContainer}>
        <Ionicons name="location-sharp" size={30} color="#9C27B0" />
        <View style={styles.textContainer}>
          <Text style={styles.featureTitle}>Curated Activities</Text>
          <Text style={styles.featureDescription}>
            The AI suggests activities tailored to your destination, complete
            with descriptions, pricing, ticket information, and the best time to
            visit, ensuring you get the most out of your trip.
          </Text>
        </View>
      </View>

      {/* Travel Information */}
      <View style={styles.featureContainer}>
        <Entypo name="info" size={30} color="#FF5722" />
        <View style={styles.textContainer}>
          <Text style={styles.featureTitle}>
            Comprehensive Travel Information
          </Text>
          <Text style={styles.featureDescription}>
            Each travel suggestion comes with rich details, including images,
            descriptions, best times to visit, and additional travel tips to
            ensure you're fully prepared for your journey.
          </Text>
        </View>
      </View>

      {/* Dynamic & Customizable */}
      <View style={styles.featureContainer}>
        <Ionicons name="reload" size={30} color="#8BC34A" />
        <View style={styles.textContainer}>
          <Text style={styles.featureTitle}>Dynamic and Customizable</Text>
          <Text style={styles.featureDescription}>
            You can easily adjust your preferences—such as dates, budget, and
            destination—and get a fresh itinerary based on your updated input,
            making sure your travel plan is always flexible and relevant.
          </Text>
        </View>
      </View>

      {/* Easy-to-Use Interface */}
      <View style={styles.featureContainer}>
        {/* <Ionicons name="ios-clipboard" size={30} color="#3F51B5" /> */}
        <View style={styles.textContainer}>
          <Text style={styles.featureTitle}>Easy-to-Use Interface</Text>
          <Text style={styles.featureDescription}>
            With an intuitive and user-friendly interface, the app is easy to
            navigate, allowing both novice and experienced travelers to quickly
            generate their travel plans without hassle.
          </Text>
        </View>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/flow.png")}
            style={{ height: 400, resizeMode: "contain" }}
          />
        </View>
      </ScrollView>

      {/* Challenges and Outcomes */}
      <Text style={styles.subHeading}>Challenges & Outcomes</Text>

      <Text style={styles.challengeText}>
        Throughout the development of this app, I encountered several challenges
        that led to valuable learning experiences. Here are some of the key
        challenges:
      </Text>

      <Text style={styles.challengeTitle}>
        1. Handling Large Lists (FlatList)
      </Text>
      <Text style={styles.challengeContent}>
        One of the challenges I faced was handling large lists, such as the list
        of flights, hotels, and activities in a smooth and responsive manner.
        Using a `FlatList` in React Native helped in efficiently rendering the
        list of items. However, the main challenge was ensuring that performance
        didn’t degrade when there were a large number of items. To handle this:
        - I implemented pagination where appropriate. - I used `getItemLayout`
        to improve scrolling performance for large lists. - Ensured images and
        content were lazily loaded.
      </Text>

      <Text style={styles.challengeTitle}>2. Component Structure</Text>
      <Text style={styles.challengeContent}>
        In React Native, it's important to structure components in a way that is
        both modular and scalable. Initially, I tried to combine too many
        functionalities into a single component, which made the code harder to
        maintain and debug. After refactoring: - I broke down the app into
        smaller, reusable components like `FlightCard`, `HotelCard`, and
        `ActivityCard`. - This made the app more manageable and easier to update
        with new features.
      </Text>

      <Text style={styles.challengeTitle}>3. Styling</Text>
      <Text style={styles.challengeContent}>
        Styling in React Native can be tricky due to different screen sizes,
        device types, and aspect ratios. The initial challenge was making sure
        the UI looked good on both small and large screens. To solve this: - I
        used responsive design techniques, such as `flexbox` and
        percentage-based widths. - I also relied on `Dimensions` to dynamically
        set the size of images and other components based on the screen width.
      </Text>

      <Text style={styles.challengeTitle}>
        4. Handling API Calls & Image Paths
      </Text>
      <Text style={styles.challengeContent}>
        Another challenge was fetching data from external APIs and ensuring the
        correct images were displayed. When dealing with dynamic content from
        APIs (e.g., hotel images, flight options), the URL structure for images
        wasn’t always consistent. To resolve this: - I implemented error
        handling for missing or broken image links. - I used a fallback image in
        case an image URL was not available or broken. - For local images, I
        ensured paths were correctly set up using `require` and dynamically
        fetching images based on the data.
      </Text>

      <Text style={styles.challengeText}>
        These challenges provided key learnings and helped me improve the app's
        performance, scalability, and maintainability.
      </Text>

      {/* Conclusion */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.subHeading}>Conclusion</Text>
        <Text style={styles.featureDescription}>
          Building the AI Travel Planner was an exciting and educational
          journey. By facing and overcoming these challenges, I was able to
          deliver a robust and feature-rich travel planning tool that provides
          users with a seamless experience. Going forward, I plan to continue
          improving the app by adding more features and enhancing its usability.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  featureContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
    paddingTop: 20,
  },
  introText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    marginTop: 20,
  },
  featureDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 15,
  },
  challengeText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  challengeContent: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 10,
  },
});

export default documents;
