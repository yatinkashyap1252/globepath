import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { createTripContext } from "../../context/createTripContext";
import { AI_PROMPTS } from "../../constants/options";
import { chatSession } from "../../configs/AIModel";
import { auth, db } from "../../configs/FireBaseConfig";
import { useRouter } from "expo-router";
import { writeBatch, doc } from "firebase/firestore";

const GenerateTrip = () => {
  const { tripData, setTripData } = useContext(createTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateTrip = async () => {
    try {
      const user = auth.currentUser;
      console.log("Starting trip generation process...");
      setLoading(true); // Start loading

      // Generate the AI prompt
      const FinalPrompt = AI_PROMPTS.replace(
        "{location}",
        tripData?.locationInfo?.name
      )
        .replaceAll("{totalDays}", tripData?.totalNoOfDays)
        .replaceAll("{totalNight}", tripData?.totalNoOfNight)
        .replace("{traveler}", tripData?.travelerCount?.name)
        .replace("{budget}", tripData?.budget?.name);

      console.log("Generated Prompt:", FinalPrompt);

      // Measure API response time
      const apiStart = Date.now();
      const result = await chatSession.sendMessage(FinalPrompt);
      const apiResponseTime = Date.now() - apiStart;
      console.log("API Response Time:", apiResponseTime, "ms");

      // Parse AI response
      const responseText = await result.response.text();
      const parseStart = Date.now();
      const tripResp = JSON.parse(responseText); // Ensure JSON response is optimized
      const parseTime = Date.now() - parseStart;
      console.log("JSON Parsing Time:", parseTime, "ms");

      // Prepare data for Firestore batch write
      const batch = writeBatch(db);
      const docId = Date.now().toString();

      // Split metadata and trip details for separate documents
      const userTripData = {
        userEmail: user.email,
        metaData: {
          location: tripData?.locationInfo?.name,
          totalDays: tripData?.totalNoOfDays,
          totalNights: tripData?.totalNoOfNight,
          traveler: tripData?.travelerCount?.name,
          budget: tripData?.budget?.name,
          photoRef: tripData?.locationInfo?.photoRef,
          prompt: FinalPrompt
        },
      };

      const tripDetails = { tripDetails: tripResp };

      const batchStart = Date.now();
      batch.set(doc(db, "UserTrips", docId), userTripData);
      batch.set(doc(db, "UserTripsDetails", docId), tripDetails);
      await batch.commit();
      const batchTime = Date.now() - batchStart;
      console.log("Batch Write Time:", batchTime, "ms");

      setLoading(false); // Stop loading
      console.log("Trip generation completed successfully.");
      router.replace("/(tabs)/mytrip");
    } catch (error) {
      console.error("Error during trip generation:", error);
      setLoading(false); // Ensure loading stops on error
    }
  };

  useEffect(() => {
    if (tripData) {
      console.log("Trip data available, starting generation...");
      generateTrip();
    }
  }, [tripData]);

  useEffect(() => {
    console.log("Loading status changed:", loading);
  }, [loading]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          textAlign: "center",
          padding: 15,
          fontWeight: "800",
        }}
      >
        Hold Tight, Adventure is Loading!
      </Text>
      <Text
        style={{
          paddingHorizontal: 25,
          textAlign: "center",
          fontSize: 15,
          fontWeight: "700",
          color: "#888",
        }}
      >
        We're crafting something amazing for you. This won’t take long, promise!
      </Text>
      <LottieView
        source={require("../../assets/images/generate.json")}
        style={{ width: 400, height: 400 }}
        autoPlay
        loop
      />
      <Text style={{ color: "#939393", fontWeight: "300" }}>
        Do not close the app or go back!
      </Text>
    </SafeAreaView>
  );
};

export default GenerateTrip;
