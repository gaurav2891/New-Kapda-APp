import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

import * as authAction from "../redux/action/authActions";
import { AuthContext } from "../navigation/context";
// import { useEffect } from "react/cjs/react.production.min";

const formSchema = yup.object({
  name: yup.string().required(),
  firmName: yup.string().required(),
  address: yup.string().required(),
  landMark: yup.string().required(),
  mobileNumber: yup.number().required(),
  whatsappNumber: yup.number().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

// firmName: "", address:"", landMark:"", mobileNumber:"", whatsappNumber:"", confirmPassword:""

const RegisterScreen = (navData) => {
  const [selectCloth, setSelectCloth] = useState("");
  const [selectNewCloth, setSelectNewCloth] = useState("");
  const dispatch = useDispatch();

  const { signUp } = useContext(AuthContext);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: "",
            firmName: "",
            address: "",
            landMark: "",
            mobileNumber: "",
            whatsappNumber: "",
            confirmPassword: "",
            password: "",
            clothCategory: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            dispatch(authAction.registerUser(values))
              .then(async (result) => {
                try {
                  if (result.status === "SUCCESS") {
                    // navData.navigation.navigate("HomeScreen");
                    signUp(values);
                    await AsyncStorage.setItem("token", result.token);
                    Alert.alert(
                      "succesfully created",
                      `${
                        result.data?.firmName
                          ? result.data?.firmName
                          : "new firm "
                      } has created`
                    );
                  } else {
                    Alert.alert(result.message);
                  }
                  // console.log(result);
                } catch (err) {
                  console.log(err);
                  Alert.alert(
                    "Something went wrong",
                    "something went wrong Please check your details  try again  Later"
                  );
                }
              })
              .catch((err) => {
                Alert.alert(
                  "Unable to create account",
                  " please try again later"
                );
              });
          }}
        >
          {(props) => (
            <View>
              <View style={styles.box}>
                <Text style={styles.textField}>Name: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your name"
                  onChangeText={props.handleChange("name")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
                <Text style={styles.errors}>
                  {props.touched.name && props.errors.name}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.textField}>FirmName: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your firmName"
                  onChangeText={props.handleChange("firmName")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.firmName}
                  onBlur={props.handleBlur("firmName")}
                />
                <Text style={styles.errors}>
                  {props.touched.firmName && props.errors.firmName}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.textField}>Address: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your address"
                  onChangeText={props.handleChange("address")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.address}
                  onBlur={props.handleBlur("address")}
                />
                <Text style={styles.errors}>
                  {props.touched.address && props.errors.address}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.textField}>LandMark: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your landMark"
                  onChangeText={props.handleChange("landMark")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.landMark}
                  onBlur={props.handleBlur("landMark")}
                />
                <Text style={styles.errors}>
                  {props.touched.landMark && props.errors.landMark}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.textField}>MobileNumber: </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter your mobileNumber"
                  onChangeText={props.handleChange("mobileNumber")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.mobileNumber}
                  onBlur={props.handleBlur("mobileNumber")}
                />
                <Text style={styles.errors}>
                  {props.touched.mobileNumber && props.errors.mobileNumber}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.textField}>WhatsappNumber: </Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter your whatsappNumber"
                  onChangeText={props.handleChange("whatsappNumber")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.whatsappNumber}
                  onBlur={props.handleBlur("whatsappNumber")}
                />
                <Text style={styles.errors}>
                  {props.touched.whatsappNumber && props.errors.whatsappNumber}
                </Text>
              </View>

              <View style={styles.box}>
                {/* <Text style={styles.textField}>Cloth Category: </Text> */}
                <Text style={styles.textField}>Cloth Category: </Text>

                <Picker
                  onValueChange={(category) => {
                    setSelectCloth(category);
                  }}
                  selectedValue={selectCloth}
                  style={{ fontSize: 19 }}
                >
                  <Picker.Item label="Ready_made" value="Ready_made" />
                  <Picker.Item label="Kaccha_kapda" value="Kaccha_kapda" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>

                <View>
                  {selectCloth.toUpperCase() === "OTHER" ? (
                    <View>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter cloth Cateogry"
                        onChangeText={setSelectNewCloth}
                        placeholderTextColor={"#ffff"}
                        value={selectNewCloth}
                        onBlur={props.handleBlur("clothCategory")}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>

                <Text style={styles.errors}>
                  {props.touched.clothCategory && props.errors.clothCategory}
                </Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.textField}>Password: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Password"
                  onChangeText={props.handleChange("password")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.password}
                  onBlur={props.handleBlur("password")}
                />
                <Text style={styles.errors}>
                  {props.touched.password && props.errors.password}
                </Text>
              </View>

              <View style={styles.box}>
                <Text style={styles.textField}>Confirm Password: </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your confirmPassword"
                  onChangeText={props.handleChange("confirmPassword")}
                  placeholderTextColor={"#ffff"}
                  value={props.values.confirmPassword}
                  onBlur={props.handleBlur("confirmPassword")}
                />
                <Text style={styles.errors}>
                  {props.touched.confirmPassword &&
                    props.errors.confirmPassword}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  props.values.clothCategory = selectCloth;

                  return props.handleSubmit();
                }}
              >
                <Text style={styles.buttonText} blurOnSubmit={true}>
                  Register
                </Text>
              </TouchableOpacity>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>
                  Go back to Login Screen{"   "}
                </Text>
                <TouchableOpacity
                  onPress={() => navData.navigation.navigate("LoginScreen")}
                >
                  <Text style={styles.registerButton}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ffffff",
    borderRadius: 10,
    margin: 60,
    // marginTop: 80,
  },

  errors: {
    color: "red",
    fontSize: 18,
  },
  box: {
    // margin: 5,
    // marginTop: 25,
    marginBottom: 10,
  },
  textField: {
    fontSize: 23,
    fontWeight: "bold",
  },
  input: {
    width: 300,
    color: "#ffffff",
    backgroundColor: "#B6BFC4",
    borderRadius: 25,
    padding: 10,
    fontSize: 20,
    marginTop: 15,
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: "#738289",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    // margin: 10,
    marginTop: 20,

    padding: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center",
  },
  registerContainer: {
    alignItems: "flex-end",
    color: "#525b60",
    justifyContent: "center",
    paddingVertical: 16,
    flexDirection: "row",
  },
  registerText: {
    color: "#738289",
    fontSize: 18,
  },
  registerButton: {
    color: "#738289",
    fontSize: 21,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
  options: {
    fontSize: 17,
    paddingStart: 70,
    marginBottom: 8,
  },
  select: {
    fontSize: 19,
    paddingStart: 0,
    color: "dimgray",
    fontWeight: "700",
  },
  UserSelect: {
    fontSize: 20,
    paddingStart: 0,
    color: "dimgray",
    fontWeight: "bold",
    marginTop: 10,
  },
});
export default RegisterScreen;
