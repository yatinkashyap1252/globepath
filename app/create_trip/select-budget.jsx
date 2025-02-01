import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { createTripContext } from "../../context/createTripContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { BudgetOptionsList } from "../../constants/options";

const SelectedBudget = () => {
  const router = useRouter();
  const { tripData, setTripData } = useContext(createTripContext);
  const [selectedBudget, setSelectedBudget] = useState(
    tripData?.budget || null
  );

  const handleSelect = (item) => {
    setSelectedBudget(item); // Highlight the selected budget
    setTripData({ ...tripData, budget: item }); // Save the selected budget to context
  };

  // useEffect(() => {
  //   console.log(tripData);
  // }, [tripData]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selectedBudget) {
              router.push('/create_trip/review-trip');
            } else {
              alert("Please select a budget before proceeding.");
            }
          }}
          style={[
            styles.iconButton,
            { backgroundColor: selectedBudget ? "#000" : "#ccc" },
          ]}
          disabled={!selectedBudget}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Title and Subheading */}
      <Text style={styles.title}>Select Your Budget</Text>
      <Text style={styles.subtitle}>
        Choose the budget category that fits your needs.
      </Text>

      {/* Budget Options */}
      <FlatList
        data={BudgetOptionsList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.budgetCard,
              selectedBudget?.id === item.id && styles.selectedCard,
            ]}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.budgetIcon}>{item.icon}</Text>
            <View>
              <Text style={styles.budgetName}>{item.name}</Text>
              <Text style={styles.budgetDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default SelectedBudget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
    borderRadius: 25,
  },
  title: {
    padding: 15,
    fontWeight: "800",
    fontSize: 30,
    color: "#222",
  },
  subtitle: {
    paddingHorizontal: 15,
    fontWeight: "500",
    fontSize: 15,
    color: "#939393",
  },
  budgetCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: "#d1e7ff",
    borderColor: "#1c64f2",
    borderWidth: 1,
  },
  budgetIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  budgetName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#333",
  },
  budgetDesc: {
    maxWidth: "95%",
    fontSize: 15,
    fontWeight: 300,
    color: "#939393",
    marginTop: 4,
  },
});
