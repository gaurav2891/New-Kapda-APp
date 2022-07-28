import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Restart } from "fiction-expo-restart";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import * as wholesalerAction from "./../../redux/action/wholesalerAction";

const UpdatePassword = (props) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const submitResponse = () => {
    dispatch(
      wholesalerAction.updatePassword(oldPassword, password, passwordConfirm)
    )
      .then((res) => {
        if (res.status === "FAILED" || res.status === "error") {
          Alert.alert("Fail", res.message);
        } else if (res.status === "SUCCESS") {
          Alert.alert("Success", ` password reset  `, [
            {
              text: "Ok",
              onPress: async () => {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("currentUser");
                Restart();
              },
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert("Failed", ` ${err.message} \n\n  try again later`);
      });
  };

  return (
    <ScrollView style={styles.screen}>
      <View>
        <Text style={styles.textField}>Old Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter here"
          onChangeText={setOldPassword}
          value={oldPassword}
        />
      </View>

      <View>
        <Text style={styles.textField}>Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter here"
          onChangeText={setPassword}
          value={password}
        />
      </View>

      <View>
        <Text style={styles.textField}>Confirm Password: </Text>
        <TextInput
          style={styles.input}
          placeholder="enter here"
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
        />
      </View>

      <View style={styles.buttonArea}>
        <Button
          style={styles.button}
          onPress={() => {
            submitResponse();
          }}
          title="UPDATE   PASSWORD"
          color="red"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    // margin: 5,
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    paddingStart: 20,
  },
  screen: {
    paddingStart: 10,
  },
  textField: {
    fontSize: 20,
    fontWeight: "bold",
    paddingStart: 20,
    marginTop: 10,
  },
  input: {
    width: 300,
    backgroundColor: "#B6BFC4",
    borderRadius: 25,
    padding: 10,
    fontSize: 19,
    marginTop: 10,
    marginVertical: 10,
  },
  buttonArea: {
    padding: 30,
  },
});
export default UpdatePassword;
