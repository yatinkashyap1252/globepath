import { Stack } from "expo-router";
import { createTripContext } from "../context/createTripContext";
import { useState } from "react";

export default function RootLayout() {
  const [tripData,setTripData]=useState([])
  return (
    <createTripContext.Provider value={{tripData,setTripData}} >
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="index"  /> */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </createTripContext.Provider>
  );
}
