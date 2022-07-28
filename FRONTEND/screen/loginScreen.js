import React, { useEffect, useContext } from "react";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authAction from "./../redux/action/authActions";
import { AuthContext } from "../navigation/context";
// import { ActivityIndicator } from "react-native-paper";

const formSchema = yup.object({
  firmName: yup.string().required().trim(),
  password: yup.string().required().trim(),
});

const LoginScreen = (navData) => {
  const dispatch = useDispatch();

  const { signin } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="height">
      <Formik
        initialValues={{ firmName: "", password: "" }}
        validateSchema={formSchema}
        onSubmit={(values) => {
          <ActivityIndicator />;
          dispatch(authAction.loginUser(values))
            .then(async (result) => {
              if (result.status === "SUCCESS") {
                try {
                  await AsyncStorage.setItem("token", result.token);
                  Alert.alert("Welcome ", result.message);
                  signin(result);
                } catch (err) {
                  // console.log(err);
                  Alert.alert(
                    "Something went wrong",
                    "something went wrong ,Please tey Later"
                  );
                }
              } else {
                Alert.alert("Fail", result.message);
              }
            })
            .catch((err) => {
              console.log(err);
              Alert.alert("ERROR ", err.message);
            });
        }}
      >
        {(props) => (
          <View style={styles.screen}>
            <View style={styles.box}>
              <Text style={styles.textField}>FirmName: </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your firmName"
                onChangeText={props.handleChange("firmName")}
                placeholderTextColor={"#ffff"}
                value={props.values.firmName}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.textField}>Password: </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Password"
                onChangeText={props.handleChange("password")}
                placeholderTextColor={"#ffff"}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={props.handleSubmit}
              underlayColor={"#898888"}
            >
              <Text
                style={styles.buttonText}
                // blurOnSubmit={true}
              >
                Login
              </Text>
            </TouchableOpacity>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}> Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navData.navigation.navigate("RegisterScreen")}
              >
                <Text style={styles.registerButton}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "blue",
    margin: 60,
    marginTop: 110,
  },
  screen: {
    // flex: 1,
  },

  box: {
    marginTop: 10,
    marginBottom: 10,
  },
  textField: {
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    backgroundColor: "#B6BFC4",
    borderRadius: 25,
    padding: 10,
    fontSize: 18,
    marginTop: 15,
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: "#738289",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    margin: 10,
  },
  buttonText: {
    fontSize: 21,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  registerContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  registerText: {
    color: "#738289",
    fontSize: 16,
  },
  registerButton: {
    color: "#738289",
    fontSize: 19,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});

export default LoginScreen;
