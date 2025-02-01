// import Entypo from "@expo/vector-icons/Entypo";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import React from "react";
// import { Tabs } from "expo-router";

// const TabsLayout = () => {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: 5,
//           margin: "auto",
//           borderRadius: "50%",
//         },
//         tabBarLabelStyle: { fontSize: 13 },
//         tabBarActiveTintColor: "black",
//         tabBarInactiveTintColor: "gray",
//       }}
//     >
//       <Tabs.Screen
//         name="mytrip"
//         options={{
//           tabBarLabel: "My Trip",
//           tabBarIcon: ({ color }) => (
//             <Entypo name="location-pin" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="discover"
//         options={{
//           tabBarLabel: "Discover",
//           tabBarIcon: ({ color }) => <Ionicons name="document" />,
//         }}
//       />
//     </Tabs>
//   );
// };

// export default TabsLayout;


import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          margin: "auto",
          borderRadius: 20,
          height:60
        },
        tabBarLabelStyle: { fontSize: 13 },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="mytrip"
        options={{
          tabBarLabel: "My Trip",
          tabBarIcon: ({ color }) => (
            <Entypo name="location-pin" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          tabBarLabel: "Document",
          tabBarIcon: ({ color }) => (
            <Ionicons name="document" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
