import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const WholesalerCard = (props) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        name={props.name}
        onPress={() =>
          props.navigation.navigate("WholesalerBody", {
            name: props.name,
            firmName: props.firmName,
            clothCategory: props.clothCategory,
            mobileNumber: props.mobileNumber,
            address: props.address,
            active: props.active,
            id: props.id,
          })
        }
      >
        <Text style={styles.text}>{props?.name ? props.name : ""}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 45,
    margin: 10,
  },
  name: {
    padding: 10,
  },
  text: {
    paddingStart: 10,
    paddingTop: 8,
    fontWeight: "900",
    fontSize: 20,
  },
});
export default WholesalerCard;
