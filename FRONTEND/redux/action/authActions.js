import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import envs from "./../../config/env";

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAIL = "REGISTER_USER_FAIL";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const GET_CURRENT_USER = "GET_CURRENT_USER";

const BASE_URL = envs;

export const registerUser = (authData) => {
  try {
    const {
      name,
      firmName,
      address,
      landMark,
      mobileNumber,
      whatsappNumber,
      confirmPassword,
      password,
      clothCategory,
    } = authData;

    return async (dispatch) => {
      const register = await fetch(`${BASE_URL}/api/v1/accounts/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          firmName,
          address,
          landMark,
          mobileNumber,
          whatsappNumber,
          confirmPassword,
          password,
          clothCategory,
        }),
      });
      const registerData = await register.json();

      if (registerData.success) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: registerData,
        });
      } else {
        dispatch({
          type: REGISTER_USER_FAIL,
          payload: registerData,
        });
      }

      return registerData;
    };
  } catch (error) {
    Alert.alert("Fail", "Can't register now try later");
  }
};

export const loginUser = (authData) => {
  try {
    const { firmName, password } = authData;
    return async (dispatch) => {
      const login = await fetch(`${BASE_URL}/api/v1/accounts/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ firmName, password }),
      });

      const loginJson = await login.json();

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: loginJson,
      });

      return loginJson;
    };
  } catch (error) {
    Alert.alert("Failes", "Failed While loging, 404");
  }
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    const tokenId = await AsyncStorage.getItem("token");
    const getUser = await fetch(`${BASE_URL}/api/v1/wholesaler`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
      }),
    });
    const getUserJson = await getUser.json();

    await AsyncStorage.setItem(
      "currentUser",
      JSON.stringify(getUserJson.currentUser)
    );
    dispatch({
      type: GET_CURRENT_USER,
      payload: getUserJson,
    });
  };
};
