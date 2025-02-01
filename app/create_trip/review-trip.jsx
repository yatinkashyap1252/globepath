import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import { createTripContext } from "../../context/createTripContext";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useRouter } from "expo-router";

const ReviewTrip = () => {
  const router = useRouter();
  const { tripData } = useContext(createTripContext);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 10,
            borderRadius: 25,
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/create_trip/generate-trip')}
          style={{
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 25,
          }}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Trip Name */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent:"space-between",
          backgroundColor: "#f5f5f5",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontWeight: 500,
            fontSize: 17,
            color: "#555",
            marginBottom: 5,
          }}
        >
          Trip to{" "}
        </Text>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "#000",
          }}
        >
          {tripData?.locationInfo?.name || "Trip Name"}
        </Text>
      </View>

      {/* Date & Duration Cards */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {tripData?.start_date
              ? moment(tripData.start_date).format("MMM DD,YY")
              : "N/A"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#666",
              marginTop: 5,
            }}
          >
            Start Date
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {tripData?.end_date
              ? moment(tripData.end_date).format("MMM DD,YY")
              : "N/A"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#666",
              marginTop: 5,
            }}
          >
            End Date
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {tripData?.totalNoOfDays || "N/A"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#666",
              marginTop: 5,
            }}
          >
            🌞 Days
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {tripData?.totalNoOfNight || "N/A"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#666",
              marginTop: 5,
            }}
          >
            🌜 Nights
          </Text>
        </View>
      </View>

      {/* Budget Card */}
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {tripData?.budget?.name || "Budget"}
          </Text>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {tripData?.budget?.icon || "💰"}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginTop: 5,
          }}
        >
          {tripData?.budget?.desc || "N/A"}
        </Text>
      </View>

      {/* Family Card */}
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {tripData?.travelerCount?.name || "Travelers"}
          </Text>
          <Text
            style={{
              fontSize: 20,
            }}
          >
            {tripData?.travelerCount?.icon || "👨‍👩‍👧‍👦"}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginTop: 5,
          }}
        >
          {tripData?.travelerCount?.desc || "N/A"}
        </Text>
      </View>

      {/* Number of People Card */}
      <View
        style={{
          backgroundColor: "#f5f5f5",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {tripData?.travelerCount?.people || "N/A"}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#666",
            marginTop: 5,
          }}
        >
          Number of People
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ReviewTrip;
