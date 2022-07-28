import React, { useState, useCallback } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Keyboard,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import * as retailerAction from "./../../redux/action/RetailerAction";
import Card from "../../component/card";
// import SeachFunc from "./../../utils/searchFilter";
import SplashScreen from "../splashScreen";

const App = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const data = useSelector((state) => state.retailer.retailer);

  const [search, setSearch] = useState("");
  const [filteredDataSource, setfilteredDataSource] = useState([]);
  const [masterDataSource, setmasterDataSource] = useState(data);

  if (!data) {
    return (
      <View style={styles.centerd}>
        <SplashScreen />
      </View>
    );
  }

  const searchFilteredfunction = (text) => {
    setmasterDataSource(data);
    try {
      if (text.trim()) {
        const newData = masterDataSource.filter(function (item) {
          const itemData = item.firmName ? item.firmName.toUpperCase() : "";
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setfilteredDataSource(newData);
        setSearch(text);
        setIsLoading(false);
      } else if (text == null) {
        setfilteredDataSource([]);
        setSearch(text);
        setIsLoading(false);
      } else {
        setfilteredDataSource([]);
        setSearch(text);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error aa gyaa IN FILTERD FUNCTION");
      setfilteredDataSource(data);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(retailerAction.fetchRetailer()).then(() => {
      setRefreshing(false);
    });
  }, []);

  const image = require("./../../assets/homeScreen2.jpg");
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  console.log(screenHeight, screenHeight);

  return (
    <View style={styles.body}>
      <ImageBackground
        source={image}
        style={{
          // resizeMode: "cover",
          // width: "100%",
          // height: "100%",
          flex: 1,
          height: screenHeight,
          width: screenWidth,
          // justifyContent: "center",
          // // allignContent: "center",
          // aliignItems: "center"
          // width: 100,
          // height: "100%",
          // borderRadius: 100,
          // backgroundColor: "#00BCD4",
          // justifyContent: "center",
          // alignItems: "center",
        }}
        resizeMode="contain"
        // backfaceVisibility
      >
        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <TextInput
              style={styles.input}
              placeholder="🍳  Retailer-Firm-Name"
              value={search}
              onChangeText={(text) => searchFilteredfunction(text)}
            />
          </TouchableWithoutFeedback>
        </View>

        <FlatList
          data={filteredDataSource}
          keyExtractor={(item) => item._id}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <Card
              style={styles.card}
              navigation={props.navigation}
              name={item.name}
              firmName={item.firmName}
              clothCategory={item.clothCategory}
              id={item._id}
              location={item.location}
              district={item.district}
            />
          )}
        />
        <Button
          style={styles.button}
          title="Add Retailer"
          color="dimgray"
          onPress={() => {
            return props.navigation.navigate("AddRetailer");
          }}
        />
        {/* </View> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#8b2c44",
  },
  card: {
    marginTop: 80,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  centerd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "flex-end",
    // display: "flex",
    alignSelf: "flex-end",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "95%",
    padding: 6,
    backgroundColor: "gainsboro",
    marginTop: 10,
    marginBottom: 4,
  },
});

export default App;
