import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CalendarPicker from "react-native-calendar-picker";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import moment from "moment";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import { createTripContext } from "../../context/createTripContext";

const SelectDates = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { tripData, setTripData } = useContext(createTripContext);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
      setEndDate(null); // Reset end date if a new start date is selected
    } else {
      setEndDate(moment(date));
    }
  };

  // console.log(endDate,startDate);

  const onDataSelectionContinue = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show(
        "Please select both start and end dates!",
        ToastAndroid.BOTTOM
      );
      return;
    }
    const difference = endDate.diff(startDate, "days");
    setTripData({
      ...tripData,
      start_date: startDate.format("YYYY-MM-DD"),
      end_date: endDate.format("YYYY-MM-DD"),
      totalNoOfDays: difference + 1,
      totalNoOfNight: difference,
    });
    router.push("/create_trip/select-budget");
  };

  const resetSelections = () => {
    setStartDate(null);
    setEndDate(null);
    setTripData({});
    ToastAndroid.show("Selections have been reset!", ToastAndroid.BOTTOM);
  };

  const isNextButtonDisabled = !startDate || !endDate;

  // useEffect(() => {
  //   console.log(tripData);
  // }, [tripData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.iconButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDataSelectionContinue}
          disabled={isNextButtonDisabled}
          style={[
            styles.iconButton,
            {
              backgroundColor: isNextButtonDisabled ? "#ccc" : "#000",
              opacity: isNextButtonDisabled ? 0.6 : 1,
            },
          ]}
        >
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Travel Dates</Text>

      {/* Calendar */}
      <View style={{ marginTop: 25 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          selectedDayTextStyle={{ color: "white" }}
          selectedRangeStyle={{ backgroundColor: "black" }}
        />
      </View>

      {/* Partition Line */}
      <View style={styles.partitionLine}>
        <Text style={styles.partitionText}>Your Selection</Text>
      </View>

      {/* Summary Section */}
      <View style={styles.cardsContainer}>
        {/* Start Date Card */}
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="calendar-today"
            size={28}
            color="black"
          />
          <Text style={styles.cardLabel}>Start Date</Text>
          <Text style={styles.cardValue}>
            {startDate ? startDate.format("MMMM DD, YYYY") : "N/A"}
          </Text>
        </View>

        {/* End Date Card */}
        <View style={styles.card}>
          <MaterialIcons name="event" size={28} color="#000" />
          <Text style={styles.cardLabel}>End Date</Text>
          <Text style={styles.cardValue}>
            {endDate ? endDate.format("MMMM DD, YYYY") : "N/A"}
          </Text>
        </View>

        {/* Total Days Card */}
        <View style={styles.card}>
          <Fontisto name="day-sunny" size={24} color="black" />
          <Text style={styles.cardLabel}>No of Days</Text>
          <Text style={styles.cardValue}>
            {startDate && endDate ? endDate.diff(startDate, "days") + 1 : "N/A"}
          </Text>
        </View>

        {/* Total Nights Card */}
        <View style={styles.card}>
          <Feather name="moon" size={24} color="black" />
          <Text style={styles.cardLabel}>No of Nights</Text>
          <Text style={styles.cardValue}>
            {startDate && endDate ? endDate.diff(startDate, "days") : "N/A"}
          </Text>
        </View>
      </View>

      {/* Reset Button */}
      <View style={styles.resetContainer}>
        <TouchableOpacity onPress={resetSelections} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    width: "100%",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    padding: 10,
    borderRadius: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#222",
    marginHorizontal: 15,
  },
  partitionLine: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    marginHorizontal: 15,
    paddingVertical: 5,
  },
  partitionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    position: "absolute",
    top: -10,
  },
  cardsContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginTop: 5,
  },
  resetContainer: {
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SelectDates;
