import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import { useRouter } from "expo-router";

const NewTripCard = () => {
  const router=useRouter()
  // console.log("lottiefile is",lottieFile)
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop:20
      }}
    >
      <LottieView
        style={{ width: 300, height: 300 }}
        source={require("../assets/images/newTrip.json")}
        autoPlay
        loop
      />
      <Text style={{fontWeight:600,color:"#403E3E",fontSize:27}} >Your Adventure Awaits!</Text>
      <Text style={{fontSize:16,marginTop:10,marginBottom:10,letterSpacing:1,color:"#565656"}} >No Trips Yet? Let’s Start Your Journey!</Text>
      <Text style={{textAlign:"center",color:"#939393",fontSize:16,letterSpacing:2,fontWeight:300}} >
        Discover breathtaking destinations, plan your perfect trip, and create
        unforgettable memories. Start your adventure today!
      </Text>
      <TouchableOpacity
      onPress={()=>router.push('/create_trip/searchTrip')}
        style={{
          width: "100%",
          padding: 15,
          marginTop: 30,
          borderRadius: 30,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            letterSpacing: 2,
            fontWeight: "400",
          }}
        >
          Plan Your First Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTripCard;
