import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Login = () => {
    const router=useRouter()
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          padding: 10,
          marginTop: -45,
          height: "100%",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: 800 }}>GlobePath</Text>
        <Text
          style={{
            fontSize: 15,
            color: "#929292",
            textAlign: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          Unlock the world—personalized trips are just a login away
        </Text>
        <TouchableOpacity
        onPress={()=>router.push('auth/sign-in')}
          style={{
            width: "80%",
            alignItems: "center",
            borderRadius: 25,
            padding: 10,
            backgroundColor: "#000",
            marginTop: "3%",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 23, fontWeight: 600 }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
