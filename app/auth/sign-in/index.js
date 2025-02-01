import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../../configs/FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = async () => {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      ToastAndroid.show("User Logged In Successfully", ToastAndroid.SHORT);
      // Navigate to a specific page after successful login
      router.replace("/mytrip"); // Adjust to your actual route
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        ToastAndroid.show("User not found", ToastAndroid.SHORT);
      } else if (errorCode === "auth/wrong-password") {
        ToastAndroid.show("Wrong Password", ToastAndroid.SHORT);
      } else if (errorCode === "auth/invalid-email") {
        ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(
          "Authentication failed. Try again.",
          ToastAndroid.SHORT
        );
      }
    } finally {
      // Clear email and password fields after handling login
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Text style={{ fontSize: 25, fontWeight: "400", color: "#939393" }}>
        Welcome to
      </Text>
      <Text style={{ fontSize: 55, fontWeight: "800", marginTop: -10 }}>
        GlobePath
      </Text>
      <Text
        style={{
          marginTop: 40,
          fontSize: 25,
          color: "#403E3E",
          fontWeight: "600",
        }}
      >
        Adventure Awaits!
      </Text>
      <Text style={{ color: "#939393", fontWeight: "300", marginBottom: 20 }}>
        Sign in to explore curated travel experiences, smart itineraries, and
        personalized trips tailored just for you.
      </Text>

      {/* Email Input */}
      <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}>
        Email
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{
          width: "100%",
          backgroundColor: "#F8F8F8",
          padding: 15,
          borderRadius: 15,
          color: "#000",
          borderWidth: 2,
          borderColor: "#A0A0A0",
          fontSize: 15,
          marginBottom: 20,
        }}
        placeholder="Enter your Email"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <Text style={{ marginBottom: 5, fontSize: 15, fontWeight: "500" }}>
        Password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={{
          width: "100%",
          backgroundColor: "#F8F8F8",
          padding: 15,
          borderRadius: 15,
          color: "#000",
          borderWidth: 2,
          borderColor: "#A0A0A0",
          fontSize: 15,
        }}
        placeholder="Enter your Password"
        secureTextEntry
      />

      {/* Sign-In Button */}
      <TouchableOpacity
        onPress={signInHandler}
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
          Sign-In
        </Text>
      </TouchableOpacity>

      {/* Register Link */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "#939393", fontWeight: "300" }}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => router.replace("auth/sign-up")}>
          <Text
            style={{
              fontWeight: "700",
              textDecorationLine: "underline",
              color: "#000",
            }}
          >
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
