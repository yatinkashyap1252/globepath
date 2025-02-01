import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../configs/FireBaseConfig";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import NewTripCard from "../../components/newTripCard";
import moment from "moment";
import { PhotoRef } from "../../services/googleImage";

export default function MyTrip() {
  const user = auth.currentUser;
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelImages, setHotelImages] = useState([]); // Array to store images for each hotel
  const [expandedTripIndex, setExpandedTripIndex] = useState(null);
  const [activityImages, setActivityImages] = useState([]);

  const getItemLayout = (data, index) => ({
    length: 200, // Height of each item (make sure this is correct for your layout)
    offset: 200 * index, // Offset for each item
    index,
  });

  const getMyTrips = async () => {
    try {
      const tripsQuery = query(
        collection(db, "UserTrips"),
        where("userEmail", "==", user?.email)
      );
      const userTripsSnapshot = await getDocs(tripsQuery);
      const trips = [];
      for (const tripDoc of userTripsSnapshot.docs) {
        const tripData = tripDoc.data();
        const tripDetailsDoc = await getDoc(
          doc(db, "UserTripsDetails", tripDoc.id)
        );
        const tripDetails = tripDetailsDoc.exists()
          ? tripDetailsDoc.data()
          : null;
        trips.push({
          id: tripDoc.id,
          ...tripData,
          tripDetails,
        });
      }

      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userTrips.length > 0) {
      const fetchActivityImages = async () => {
        const activityImageArrays = await Promise.all(
          userTrips.map(async (trip) => {
            const activityImagesForTrip = await Promise.all(
              trip.tripDetails?.tripDetails?.dailyPlan.map(async (day) => {
                // Map each day to an array of images for the activities in that day
                const imagesForDay = await Promise.all(
                  day.activities.map(async (activity) => {
                    const result = await PhotoRef(activity.placeName); // Assume this fetches the image for the activity
                    return result.results[0]?.photos[0]?.photo_reference;
                  })
                );
                return imagesForDay; // Return an array of images for each day
              })
            );
            return activityImagesForTrip; // Return array for all days in a trip
          })
        );
        setActivityImages(activityImageArrays); // Store the activity images
        // console.log(activityImageArrays); // Check if it's being populated correctly
      };

      fetchActivityImages();
    }
  }, [userTrips]);

  // Fetch hotel images when trips are loaded
  useEffect(() => {
    if (userTrips.length > 0) {
      const fetchHotelImages = async () => {
        const images = await Promise.all(
          userTrips.map(async (trip) => {
            const hotelImagesForTrip = await Promise.all(
              trip.tripDetails?.tripDetails?.hotels.map(async (hotel) => {
                const result = await PhotoRef(hotel.hotelName);
                return result.results[0]?.photos[0]?.photo_reference;
              })
            );
            return hotelImagesForTrip; // Return an array of images for each trip
          })
        );
        setHotelImages(images); // Store the hotel images
      };

      fetchHotelImages();
    }
  }, [userTrips]);

  useEffect(() => {
    if (user) {
      getMyTrips();
    }
  }, [user]);

  const toggleTripExpand = (index) => {
    setExpandedTripIndex(expandedTripIndex === index ? null : index);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading trips...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" style="dark" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Trips</Text>
        {userTrips.length > 0 && (
          <TouchableOpacity
            onPress={() => router.push("/create_trip/searchTrip")}
          >
            <AntDesign name="pluscircle" size={45} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.tripsContainer}>
        {userTrips.length === 0 ? (
          <NewTripCard />
        ) : (
          <FlatList
            data={userTrips}
            getItemLayout={getItemLayout}
            initialNumToRender={5} // Render only 10 items initially
            maxToRenderPerBatch={5} // Render at most 15 items per batch
            renderItem={({ item, index }) => {
              const { dailyPlan, hotels, flightDetails } =
                item?.tripDetails?.tripDetails || {};
              const formatDate = (dateStr) => moment(dateStr).format("MMM DD");

              const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.metaData.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;

              return (
                <TouchableOpacity
                  style={[
                    styles.tripCard,
                    expandedTripIndex === index && styles.expandedTripCard,
                  ]}
                  onPress={() => toggleTripExpand(index)}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={{
                      width: "100%",
                      height: 200,
                      marginBottom: 20,
                      borderRadius: 10,
                    }}
                  />
                  <Text style={styles.tripTitle}>
                    {item?.tripDetails?.tripDetails?.tripName}
                  </Text>
                  <Text style={styles.tripSubtitle}>
                    📌 {item?.tripDetails?.tripDetails?.location}
                  </Text>
                  <Text>
                    ⌚ {item?.tripDetails?.tripDetails?.bestTimeToVisit}
                  </Text>

                  {expandedTripIndex === index && (
                    <View style={styles.expandedDetails}>
                      {/* Flight Details Section */}
                      <Text style={styles.flightTitle}>Flight Details</Text>
                      {flightDetails ? (
                        <View style={styles.flightCard}>
                          <View style={styles.flightInfoRow}>
                            <View style={styles.flightInfoBox}>
                              <Text style={styles.flightInfoLabel}>
                                Arrival
                              </Text>
                              <Text style={styles.flightInfoText}>
                                {flightDetails.arrivalAirport}
                              </Text>
                            </View>
                          </View>
                          <Text style={styles.flightInfoText}>
                            Price: {flightDetails.approxFlightPrice}
                          </Text>
                          <TouchableOpacity
                            style={styles.bookingButton}
                            onPress={() =>
                              Linking.openURL(flightDetails.bookingURL)
                            }
                          >
                            <Text style={styles.bookingButtonText}>
                              Book Now
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <Text>No flight details available for this trip.</Text>
                      )}

                      {/* Daily Plans Section */}
                      <Text
                        style={{
                          color: "#00796b",
                          fontWeight: 700,
                          fontSize: 20,
                          paddingVertical: 20,
                        }}
                      >
                        Daily Plans
                      </Text>
                      {dailyPlan?.length > 0 ? (
                        <ScrollView
                          contentContainerStyle={styles.scrollContainer}
                        >
                          {dailyPlan.map((plan, planIndex) => {
                            // console.log(plan);

                            return (
                              <View key={planIndex} style={styles.planCard}>
                                <Text style={styles.planTitle}>
                                  {plan.theme}
                                </Text>
                                <Text
                                  style={{ paddingVertical: 10, color: "#555" }}
                                >
                                  {plan.notes}
                                </Text>
                                {plan.activities?.map(
                                  (activity, activityIndex) => {
                                    const activityImage =
                                      activityImages[index]?.[planIndex]?.[
                                        activityIndex
                                      ]; // Get the image for each activity
                                    return (
                                      <View
                                        key={activityIndex}
                                        style={styles.activityCard}
                                      >
                                        <Text style={styles.activityTitle}>
                                          {activity.placeName}
                                        </Text>
                                        {activityImage ? (
                                          <Image
                                            source={{
                                              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${activityImage}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                                            }}
                                            style={styles.activityImage}
                                          />
                                        ) : (
                                          <Text>No image available</Text>
                                        )}
                                        <View
                                          style={{
                                            height: 1,
                                            backgroundColor: "#ccc",
                                            marginVertical: 10,
                                          }}
                                        />
                                        <Text
                                          style={{
                                            width: "100%",
                                            textAlign: "left",
                                            fontSize: 15,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {activity.placeDetails}
                                        </Text>
                                        <Text
                                          style={{
                                            fontSize: 15,
                                            textAlign: "left",
                                            width: "100%",
                                            paddingVertical: 5,
                                          }}
                                        >
                                          🕛 {activity.bestTimeToVisit}
                                        </Text>
                                        <Text style={{ width: "100%" }}>
                                          💲 {activity.ticketPricing}
                                        </Text>
                                        <Text style={{ width: "100%" }}>
                                          🚋 {activity.timeTravel}
                                        </Text>
                                      </View>
                                    );
                                  }
                                )}
                              </View>
                            );
                          })}
                        </ScrollView>
                      ) : (
                        <Text>No daily plans available for this trip.</Text>
                      )}

                      {/* Hotels Section */}
                      <Text
                        style={{
                          color: "#ff5722",
                          fontWeight: "600",
                          marginTop: 20,
                        }}
                      >
                        Hotels:
                      </Text>
                      {hotels?.length > 0 ? (
                        <ScrollView
                          contentContainerStyle={styles.scrollContainer}
                        >
                          {hotels.map((hotel, hotelIndex) => {
                            const hotelImage = hotelImages[index]?.[hotelIndex]; // Get the corresponding image for each hotel
                            // console.log(hotelImage);
                            const hotelURL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${hotelImage}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;
                            // console.log(hotelURL);

                            return (
                              <View key={hotelIndex} style={styles.hotelCard}>
                                {hotelImage ? (
                                  <Image
                                    source={{
                                      uri: hotelURL,
                                    }}
                                    style={{
                                      width: "100%",
                                      height: 200,
                                      borderRadius: 10,
                                    }}
                                  />
                                ) : (
                                  <Text>No image available</Text>
                                )}
                                <Text style={styles.hotelName}>
                                  {hotel.hotelName}
                                </Text>
                                <Text style={styles.hotelAddress}>
                                  {hotel.hotelAddress}
                                </Text>
                                <Text
                                  style={{
                                    color: "#939393",
                                    marginVertical: 5,
                                  }}
                                >
                                  {hotel.description}
                                </Text>
                              </View>
                            );
                          })}
                        </ScrollView>
                      ) : (
                        <Text>No hotels available for this trip.</Text>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flightTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#C62828",
  },
  flightCard: {
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 20,
  },
  flightInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  flightInfoBox: {
    flex: 1,
    marginRight: 10,
  },
  flightInfoLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  flightInfoText: {
    color: "#555",
  },
  bookingButton: {
    backgroundColor: "#C62828",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  bookingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f8f8",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#333",
  },
  tripsContainer: {
    flex: 1,
  },
  tripCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  expandedTripCard: {
    borderColor: "#b0c4de",
    backgroundColor: "#f0f8ff",
  },
  tripTitle: {
    fontSize: 25,
    fontWeight: 800,
    color: "#333",
  },
  tripSubtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#939393",
    marginVertical: 10,
  },
  expandedDetails: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#555",
    marginBottom: 10,
  },
  planCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#b2ebf2",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796b",
  },
  activityCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  activityTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#00796b",
    paddingBottom: 10,
  },
  activityImage: {
    marginTop: 10,
    width: 240,
    height: 120,
    borderRadius: 10,
  },
  hotelCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff3e0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffcc80",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  hotelName: {
    fontSize: 20,
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#ff5722",
  },
  noTripsContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  // Your existing styles...
  hotelCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#fff3e0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffcc80",
  },
  hotelName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff5722",
  },
  hotelAddress: {
    fontSize: 16,
    color: "#555",
  },
});
