import React, { useCallback, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../navigation/context";
import SplashScreen from "./../../screen/splashScreen";
import * as usersAction from "./../../redux/action/authActions";

const LogOut = (props) => {
  // const { signout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { signout } = useContext(AuthContext);
  let { currentUser } = useSelector((state) => state.auth);

  if (
    currentUser == undefined ||
    currentUser.status === "error" ||
    currentUser.status === "FAILED" ||
    JSON.stringify(currentUser).length == null
  ) {
    return <SplashScreen message={currentUser?.message} />;
  }

  if (currentUser.status === "SUCCESS") {
    currentUser = currentUser.currentUser;
  }

  const {
    _id,
    name,
    firmName,
    address,
    landMark,
    mobileNumber,
    whatsappNumber,
    clothCategory,
    slug,
  } = currentUser;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(usersAction.getCurrentUser()).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <ScrollView
      style={styles.screen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.textField}>FirmName: </Text>
          <Text style={styles.resultField}>{firmName} </Text>

          <Text style={styles.textField}>Name: </Text>
          <Text style={styles.resultField}>{name} </Text>

          <Text style={styles.textField}>Address: </Text>
          <Text style={styles.resultField}>{address} </Text>

          <Text style={styles.textField}>Cloth-Category: </Text>
          <Text style={styles.resultField}>{clothCategory} </Text>

          <Text style={styles.textField}>MobileNumber: </Text>
          <Text style={styles.resultField}>{mobileNumber} </Text>

          {/* <Text
            styles={{
              fontSize: 25,
              // fontWeight: "bold",
              allignContent: "flex-end",
              // paddingStart: 15,
              fontWeight: "600",
              color: "grey",
              paddingEnd: 5,
            }}
          >
            {" "}
            contact @ 9782039818
          </Text> */}
          <Text
            style={{
              fontSize: 20,
              // fontWeight: "bold",
              // paddingStart: 15,
              // paddingEnd: 14,
              fontWeight: "200",
              color: "black",
              // paddingStart: 10,
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingTop: 25,
              paddingBottom: 0,
              padding: 3,
            }}
          >
            contact @ 9782039818
          </Text>
        </View>
      </View>

      <View style={styles.buttonArea}>
        <Button
          style={styles.button}
          color="red"
          title="UPDATE  ME"
          onPress={() =>
            props.navigation.navigate("UpdateMe", {
              id: _id,
              name,
              mobileNumber,
              landMark,
              whatsappNumber,
              address,
            })
          }
        />
        <Text> {`     `}</Text>

        <Button
          style={styles.button}
          title={"Log Out"}
          onPress={() => {
            // dispatch()
            Alert.alert(
              "LoggedOut",
              `Do you really want to Log Out ?\n\nAfter This you can not access Kapda Bazar app`,
              [
                { text: "cancel", onPress: () => console.log("cancel") },
                {
                  text: "LogOut",
                  onPress: () => {
                    signout();
                  },
                },
              ]
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    // flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  box: {
    // margin: 5,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingStart: 10,
    // height: "80%",
  },
  textField: {
    fontSize: 25,
    fontWeight: "bold",
    paddingStart: 10,

    justifyContent: "flex-start",
    alignItems: "flex-start",
    // margin: 10,
    marginTop: 20,
    color: "black",
  },
  resultField: {
    fontSize: 25,
    // fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingStart: 15,
    fontWeight: "200",
    color: "grey",
    // paddingStart: 10,
    padding: 3,
  },
  button: {
    // marginTop: 150,
    // justifyContent: "flex-end",
    // // width: "100%",
    // backgroundColor: "grey",
    // borderRadius: 25,
    // padding: 10,
    // fontSize: 16,
    margin: 80,
    borderRadius: 4,
    elevation: 3,
    // marginVertical: 10,
  },
  buttonArea: {
    paddingTop: 15,
    padding: 30,
  },
});

export default LogOut;
