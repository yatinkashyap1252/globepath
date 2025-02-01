import { StatusBar, View } from "react-native";
import Login from "../components/login";
import { auth } from "../configs/FireBaseConfig";
import { Redirect } from "expo-router";

export default function Index() {
  const user = auth.currentUser;
  // console.log(user)
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      {user ? <Redirect href={'./mytrip'}/> : <Login />}
    </View>
  );
}
