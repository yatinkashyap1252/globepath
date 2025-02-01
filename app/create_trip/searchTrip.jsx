import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { createTripContext } from "../../context/createTripContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import LottieView from "lottie-react-native";
import "react-native-get-random-values";

const SearchTrip = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(createTripContext);
  const [isEmpty, setIsEmpty] = useState(true); // Tracks if the search bar is empty

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, []);

  // useEffect(() => {
  //   console.log("Trip Data:", tripData, "Is Empty:", isEmpty);
  // }, [tripData, isEmpty]);

  return (
    <SafeAreaView
      style={{
        padding: 15,
        paddingTop: 95,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {/* Google Places Search Bar */}
      <View style={{ width: "100%", flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setTripData({
              locationInfo: {
                name: data.description,
                coordinates: details.geometry.location,
                url: details.url,
                photoRef: details.photos?.[0]?.photo_reference,
              },
            });
            router.push("/create_trip/selectTraveler");
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
            language: "en",
          }}
          textInputProps={{
            onChangeText: (text) => {
              setIsEmpty(text.trim() === ""); // Update isEmpty based on text input
            },
          }}
        />
      </View>

      {/* Lottie Animation */}
      {isEmpty && (
        <LottieView
          source={require("../../assets/images/search.json")}
          style={{ height: 300, width: 300, marginTop: 50 }}
          autoPlay
          loop
        />
      )}
    </SafeAreaView>
  );
};

export default SearchTrip;