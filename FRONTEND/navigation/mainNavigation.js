import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useMemo, useReducer } from "react";
import { View, Alert } from "react-native";
import jwtDecode from "jwt-decode";

import { AuthContext } from "./context";
import AppNavigation from "./AppNavigation";
import AuthNavigation from "./authNavigation";

import SplashScreen from "./../screen/splashScreen";

const MainNavigation = () => {
  const initialLoginState = {
    isLoading: true,
    username: null,
    userToken: null,
  };

  const authContext = useMemo(() => ({
    signin: (values) => {
      let userToken;
      userToken = null;
      if (values.status === "SUCCESS") {
        userToken = values.token;
      }
      const decodeToken = jwtDecode(userToken);
      // console.log("decode, SIGN IN😀😀😀😀😀", decodeToken);
      dispatch({ type: "LOGIN", id: "username", token: userToken });
    },
    signout: async () => {
      try {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("currentUser");
      } catch (error) {
        console.log("MAIN NAVIGATION=>", error);
        Alert.alert("Failed", "Internal server issue  404");
      }

      dispatch({ type: "LOGOUT" });
    },
    signUp: (values) => {
      let userToken;
      userToken = null;
      if (values.status === "SUCCESS") {
        userToken = values.token;
      }
      dispatch({ type: "REGISTER", id: "username", token: userToken });
    },
  }));

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          username: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          username: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    setTimeout(async () => {
      const userToken = await AsyncStorage.getItem("token");
      if (userToken == null) {
        console.log("Storage didn't have userToken");
        dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
      }

      dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
    }, 200);
  }, [dispatch]);

  if (loginState.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          color: "blue",
        }}
      >
        <SplashScreen />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      {loginState.userToken !== null ? <AppNavigation /> : <AuthNavigation />}
    </AuthContext.Provider>
  );
};

export default MainNavigation;
