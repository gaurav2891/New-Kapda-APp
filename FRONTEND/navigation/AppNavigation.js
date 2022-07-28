import AsyncStorage from "@react-native-async-storage/async-storage";
import { Restart } from "fiction-expo-restart";

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";

import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

import * as retailerAction from "../redux/action/RetailerAction";
import * as authAction from "../redux/action/authActions";
import * as wholesalerAction from "../redux/action/wholesalerAction";
import SplashScreen from "./../screen/splashScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// RETAILER LIST
import AddRetailer from "../screen/retailerList/AddRetailer";
import Retailer from "./../screen/retailerList/Retailer";
import RetailerDetail from "./../screen/retailerList/RetailerDetail";
import AddComment from "./../screen/retailerList/addComment";
import ShowDetails from "./../screen/retailerList/showDetails";
import UpdateComment from "./../screen/retailerList/updateComment";
import Notification from "../screen/notificationBell";

// COMMENT
import Comment from "./../screen/comments/Comment";
// ME
import LogoutScreen from "../screen/USER/logoutScreen";
import UpdateMe from "../screen/USER/updateMe";
import UpdatePassword from "./../screen/USER/updatePassword";

// RETAILER LISTS
const RetailersList = (props) => {
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState(0);

  const dispatch = useDispatch();
  const currentUser = async () => {
    const check = await AsyncStorage.getItem("currentUser");
    const res = JSON.parse(check);

    if (res && res.name) {
      setUser(res);
    }
    res;
  };

  useEffect(() => {
    dispatch(wholesalerAction.getNewNotifications()).then((res) => {
      console.log("😀😙😙😙", res.comments);
      setNotification(res.comments);
      return;
    });
    currentUser();
  }, []);

  useCallback(() => {
    if (notification) {
      const newComment = useSelector(
        (state) => state.WholesalerComment.notificationComment.newComment
      );
      setNotification(newComment);
    }
  }, [notification]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={
          user
            ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
            : "Wholesaler"
        }
        component={Retailer}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("Notifications");
                }}
              >
                <View>
                  <Text
                    style={{
                      position: "absolute",
                      right: -9,
                      top: -9,
                      // textAlignVertical: "top",
                      fontWeight: "500",
                      color: "black",
                      fontSize: 19,
                    }}
                  >
                    {notification}
                  </Text>
                  <MaterialCommunityIcons
                    name="bell-circle"
                    size={38}
                    color="#906E6E"
                  />
                </View>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="RetailerDetail" component={RetailerDetail} />
      <Stack.Screen name="AddRetailer" component={AddRetailer} />
      <Stack.Screen name="ShowDetails" component={ShowDetails} />
      <Stack.Screen name="AddComment" component={AddComment} />
      <Stack.Screen name="UpdateComment" component={UpdateComment} />
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
};

// PROFILE
const WholesalerList = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="My profile" component={LogoutScreen} />
      <Stack.Screen name="UpdateMe" component={UpdateMe} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          let iconName;
          if (route.name === "MyComments") {
            iconName = "comment-multiple";
          } else if (route.name === "RetailersList") {
            return <Fontisto name="shopping-store" size={24} color="black" />;
          } else if (route.name === "Profile") {
            iconName = "face-profile";
          } else if (route.name === "ADMIN AREA") {
            iconName = "server-security";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={24} color="black" />
          );
        },
      })}
    >
      <Tab.Screen
        name="RetailersList"
        component={RetailersList}
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}
        options={{
          headerShown: false,
          keyboardHidesTabBar: true,
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="MyComments"
        component={Comment}
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}
        options={<MaterialIcons name="favorite" size={24} color="black" />}
      />
      <Tab.Screen
        name="Profile"
        component={WholesalerList}
        screenOptions={{
          tabBarHideOnKeyboard: true,
        }}
        options={{
          // title: "My Profile",
          // headerStyle: {
          //   backgroundColor: "lightcyan",
          // },
          // headerTintColor: "#813",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  try {
    useEffect(() => {
      setIsLoading(true);

      dispatch(authAction.getCurrentUser());
      dispatch(wholesalerAction.fetchWholesalerComment());
      dispatch(wholesalerAction.getNewNotifications());
      dispatch(retailerAction.fetchRetailer())
        .then((res) => {
          if (res.status === "SUCCESS") {
            console.log("DISPATCHED ALL ✅");
            setIsLoading(false);
          } else if (res.status === "FAILED") {
            Alert.alert("Failed", `Settings has changed\n\n REOPEN THE APP `, [
              {
                text: "ok",
                onPress: async () => {
                  console.log("HTA DE BRO");
                  await AsyncStorage.removeItem("token");
                  await AsyncStorage.removeItem("currentUser");
                  Restart();
                },
              },
            ]);
          }
        })
        .catch((err) => {
          Alert.alert(
            "Failed",
            `  ${err.message} \n\n \n "REOPEN THE APP LATER"`,
            [
              {
                text: "ok",
                onPress: async () => {
                  // console.log("HTA DE BRO");
                  // await AsyncStorage.removeItem("token");
                  // await AsyncStorage.removeItem("currentUser");
                  Restart();
                },
              },
            ]
          );
        });
    }, [dispatch]);
  } catch (error) {
    Alert.alert("Failed", "Unable to fetching details");
  }

  if (isLoading) {
    return (
      <View style={styles.centerd}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
