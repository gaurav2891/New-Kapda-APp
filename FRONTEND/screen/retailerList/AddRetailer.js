import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as yup from "yup";

import * as retailerAction from "../../redux/action/RetailerAction";
import catchDispatch from "./../../utils/catchDispatch";
import SearchablePicker from "./../../utils/searchablePicker";

const retailerSchema = yup.object({
  firmName: yup.string().required().min(5).max(30),
  location: yup.string().required().min(5).max(20),
  retailerName: yup.string().required().min(3).max(20),
  district: yup.string().required().min(3).max(20),
  state: yup.string().required().min(3).max(20),
  clothCategory: yup.string().required(),
});

const districts = [
  "Alwar",
  "Behror",
  "Bhiwadi",
  "Karoda",
  "Kasba Dehra",
  "Kathumar",
  "Khairtal",
  "Kherli",
  "Khushkhera",
  "Kishangarh Bas",
  "Kotkasim",
  "Mundawar",
  "Neemrana",
  "Rajgarh",
  "Reni",
  "Tijara",
];

const App = (props) => {
  const dispatch = useDispatch();

  // ////   HOOKS
  const [userName, setUser] = useState("");

  const [selected, setSelected] = useState("");
  let [searchFirm, setSearhFirm] = useState("");
  const [searchDistrict, setSearchDistrict] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectCloth, setSelectCloth] = useState("");
  const [selectNewCloth, setSelectNewCloth] = useState("");
  const [selectRetailerName, setSelectRetailerName] = useState("");

  const retailerDataList = useSelector((state) => state.retailer.retailer);
  const retailerList = retailerDataList.map((el) => el.firmName.toUpperCase());
  // console.log(retailerList);

  // /////   FUNCTIONS

  const currentUser = async () => {
    const check = await AsyncStorage.getItem("currentUser");
    const res = JSON.parse(check);
    if (res.name) {
      setUser(res);
    }
    res;
  };

  useEffect(() => {
    currentUser();
  }, [selected]);

  const getFirm = (value) => {
    setSearhFirm(value);
  };
  const getDistrict = (value) => {
    setSearchDistrict(value);
  };

  let i = 0;
  return (
    <ScrollView style={{ flex: 1 }}>
      <Formik
        initialValues={{
          retailerName: "",
          firmName: "",
          location: "",
          district: "",
          state: "",
          clothCategory: "",
        }}
        validationSchema={retailerSchema}
        onSubmit={(values) => {
          catchDispatch(
            dispatch(retailerAction.addRetailer(values)),
            "Retailer Added",
            props.navigation.navigate(userName)
          );
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={styles.name}>
              <Text style={styles.firmName}>FirmName:</Text>
              <SearchablePicker
                getValue={getFirm}
                data={retailerList}
                placeholder="Enter firmName.."
                containerStyles={{ marginHorizontal: 10, fontSize: 18 }}
                inputStyles={{ fontSize: 18, paddingStart: 10 }}
              />
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>RetailerName:</Text>
              <TextInput
                style={styles.firmInput}
                placeholder={"Enter retailer name..."}
                onChangeText={setSelectRetailerName}
                values={selectRetailerName}
                onBlur={props.handleBlur("retailerName")}
              />
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>State:</Text>
              <View
                style={{
                  borderBottomRadius: 12,
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                }}
              >
                <Picker
                  onValueChange={(state) => {
                    setSelectState(state);
                  }}
                  selectedValue={setSelectState}
                >
                  <Picker.Item label="Rajasthan" value="Rajasthan" />
                  <Picker.Item label="Rajasthan" value="Rajasthan" />
                </Picker>
              </View>
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>District:</Text>
              <SearchablePicker
                getValue={getDistrict}
                data={districts}
                placeholder="Enter district.."
                containerStyles={{ marginHorizontal: 10, fontSize: 18 }}
                inputStyles={{ fontSize: 18, paddingStart: 10 }}
              />
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>Location:</Text>
              <TextInput
                style={styles.firmInput}
                placeholder={"Enter retailer location..."}
                onChangeText={props.handleChange("location")}
                values={props.values.location}
                onBlur={props.handleBlur("location")}
              />
              <Text style={styles.error}>
                {props.touched.location && props.errors.location}
              </Text>
            </View>

            <View style={styles.name}>
              <Text style={styles.firmName}>Cloth Category::</Text>
              <View
                style={{
                  borderBottomRadius: 12,
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 1,
                }}
              >
                <Picker
                  onValueChange={(clothCategory) => {
                    setSelectCloth(clothCategory);
                  }}
                  selectedValue={selectCloth}
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
                        placeholder="Enter your cloth Cateogry"
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
              </View>
              <Text style={styles.error}>
                {props.touched.clothCategory && props.errors.clothCategory}
              </Text>
            </View>

            <Button
              style={styles.button}
              title="SAVE RETAILER"
              onPress={() => {
                {
                  const updateFirm =
                    searchFirm.charAt(0).toUpperCase() + searchFirm.slice(1);
                  props.values.firmName = updateFirm;
                  props.values.district = searchDistrict;
                  props.values.retailerName = selectRetailerName
                    ? selectRetailerName
                    : "N/A";
                  props.values.state = selectState || "Rajasthan";

                  const finalClothCategory =
                    selectCloth === "Other"
                      ? "r" + selectNewCloth
                      : selectCloth || "Ready_Made";
                  props.values.clothCategory = finalClothCategory;
                }

                return props.handleSubmit();
              }}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flatList: {
    position: "absolute",
  },
  name: {
    width: "100%",
    margin: 14,
  },
  retailerName: {
    marginTop: 20,
    fontSize: 19,
    paddingStart: 10,
    marginVertical: 10,
  },
  firmName: {
    // marginTop: 10,
    fontSize: 19,
    paddingStart: 10,
    marginVertical: 10,
  },
  firmInput: {
    fontSize: 19,
    paddingStart: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  container: {
    shadowColor: "lightgreen",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 800,
    margin: 10,
  },
  button: {
    color: "blue",
    justifyContent: "flex-end",
    display: "flex",
    alignSelf: "flex-end",
  },
  error: {
    color: "red",
    paddingStart: 10,
  },
  options: {
    fontSize: 17,
    paddingStart: 70,
    marginBottom: 8,
  },
  select: {
    fontSize: 16,
    paddingStart: 0,
    color: "dimgray",
    fontWeight: "700",
  },
  input: {
    fontSize: 16,
    paddingStart: 0,
    color: "dimgray",
    fontWeight: "700",
    paddingStart: 12,
  },
});
export default App;
