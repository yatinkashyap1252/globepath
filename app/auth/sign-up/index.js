import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../../configs/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const signUpHandler = () => {
    Keyboard.dismiss();

    if (!email || !password || !fullName) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.BOTTOM);
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Invalid email format", ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // console.log("User created:", user);
        
        ToastAndroid.show("User Created Successfully", ToastAndroid.BOTTOM);
        setEmail("");
        setPassword("");
        setFullName("");
        router.replace("/mytrip");
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = "Something went wrong";
        if (errorCode === "auth/email-already-in-use") {
          errorMessage = "Email already in use";
        } else if (errorCode === "auth/weak-password") {
          errorMessage = "Password should be at least 6 characters";
        } else if (errorCode === "auth/invalid-email") {
          errorMessage = "Invalid email format";
        }
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
        console.error(error.message);
      });
  };

  // Reusable styles
  const styles = {
    container: {
      padding: 24,
      paddingTop: 50,
      display: "flex",
      flexDirection: "column",
      height: "100%",
      backgroundColor: "#fff",
    },
    headerText: {
      fontSize: 25,
      fontWeight: "400",
      color: "#939393",
    },
    title: {
      fontSize: 35,
      fontWeight: "800",
      marginBottom: 10,
    },
    inputLabel: {
      marginTop: 25,
      marginLeft: 5,
      fontSize: 15,
      fontWeight: "500",
    },
    input: {
      width: "100%",
      backgroundColor: "#F8F8F8",
      padding: 15,
      borderRadius: 15,
      color: "#000",
      borderWidth: 2,
      borderColor: "#A0A0A0",
      fontSize: 15,
    },
    button: {
      width: "100%",
      padding: 15,
      marginTop: 50,
      borderRadius: 30,
      backgroundColor: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 20,
      letterSpacing: 2,
      fontWeight: "400",
    },
    footerText: {
      color: "#939393",
      fontWeight: "300",
    },
    footerLink: {
      fontWeight: "700",
      textDecorationLine: "underline",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create Your</Text>
      <Text style={styles.title}>Travel Account ✈️</Text>
      <Text style={styles.footerText}>
        Join GlobePath and unlock a world of personalized travel planning!
      </Text>
      <Text style={styles.inputLabel}>Full Name</Text>
      <TextInput
        onChangeText={setFullName}
        value={fullName}
        style={styles.input}
        placeholder="Enter your Full Name"
        placeholderTextColor="#A0A0A0"
      />
      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#A0A0A0"
        keyboardType="email-address"
      />
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        placeholder="Enter your Password"
        placeholderTextColor="#A0A0A0"
        secureTextEntry
      />
      <TouchableOpacity onPress={signUpHandler} style={styles.button}>
        <Text style={styles.buttonText}>Sign-Up</Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("auth/sign-in")}>
          <Text style={styles.footerLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
