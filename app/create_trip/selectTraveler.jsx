import { View, Text, TouchableOpacity, FlatList, Animated } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { TravelerOptionsList } from "../../constants/options";
import { createTripContext } from "../../context/createTripContext";

const SelectTraveler = () => {
  const router = useRouter();
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const { tripData, setTripData } = useContext(createTripContext);
  const [animations, setAnimations] = useState(
    TravelerOptionsList.map(() => new Animated.Value(1))
  );

  useEffect(() => {
    setTripData({ ...tripData, travelerCount: selectedTraveler });
  }, [selectedTraveler]);

  const handlePressIn = (index) => {
    Animated.spring(animations[index], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(animations[index], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleSelection = (item, index) => {
    setSelectedTraveler(item);
    animations.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue: i === index ? 1.0 : 0.9, // Scale up selected, scale down others
        useNativeDriver: true,
      }).start();
    });
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selectedTraveler === item;

    return (
      <TouchableOpacity
        onPress={() => handleSelection(item, index)}
        activeOpacity={0.8}
        onPressIn={() => handlePressIn(index)}
        onPressOut={() => handlePressOut(index)}
      >
        <Animated.View
          style={{
            padding: 15,
            marginVertical: 8,
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            transform: [{ scale: animations[index] }],
            backgroundColor: isSelected ? "#e6f7ff" : "#f3f4f6", // Bright for selected, dim for others
            borderColor: isSelected ? "#1e90ff" : "transparent", // Border for selected
            borderWidth: isSelected ? 2 : 0,
          }}
        >
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "600",
                color: isSelected ? "#000" : "#333", // High contrast for selected
              }}
            >
              {item.name}
            </Text>
            <Text style={{ fontSize: 30 }}>{item.icon}</Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: isSelected ? "#222" : "#555",
            }}
          >
            {item.people}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: isSelected ? "#444" : "#666",
              marginVertical: 4,
              fontWeight: 300,
            }}
          >
            {item.desc}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Header */}
      <View
        style={{
          padding: 15,
          width: "100%",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ padding: 10, borderRadius: 25 }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        {selectedTraveler && (
          <TouchableOpacity
            onPress={() => router.push("/create_trip/select-dates")}
            style={{
              borderRadius: 25,
              padding: 10,
              backgroundColor: "#000",
            }}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <Text
        style={{ fontSize: 32, fontWeight: "800", color: "#222", margin: 15 }}
      >
        Who's Traveling
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginTop: 8,
          fontWeight: "500",
          color: "#555",
          marginHorizontal: 15,
          marginBottom: 15,
        }}
      >
        Choose your travelers
      </Text>

      {/* List */}
      <FlatList
        data={TravelerOptionsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
      />
    </SafeAreaView>
  );
};

export default SelectTraveler;
