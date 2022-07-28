import React, { useState, useCallback } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import * as retailerAction from "./../redux/action/RetailerAction";

const Card = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const dispatchWrComment = (id) => {
    dispatch(retailerAction.fetchWRComment(id)).then(() => setIsLoading(false));
  };

  let parentStyle;
  if (props.parentstyle) parentStyle = props.parentstyle;
  return (
    <View
      style={{
        shadowColor: "black",
        shadowOpacity: 0.35,
        shadowOffset: { width: 2, height: 2 },
        borderRadius: 12,
        backgroundColor: "#ffffff",
        elevation: 9,
        height: 45,
        margin: 10,
        ...parentStyle,
      }}
    >
      <TouchableOpacity
        // style={{ color: "#AECADF" }}
        firmName={props.firmName}
        onPress={() => {
          dispatchWrComment(props.id);
          props.navigation.navigate("RetailerDetail", {
            firmName: props.firmName,
            name: props.name,
            clothCategory: props.clothCategory,
            id: props.id,
            location: props.location,
            district: props.district,
          });
        }}
      >
        <Text style={styles.text}>{props?.firmName ? props.firmName : ""}</Text>

        {props.numbers ? (
          <View
            style={{
              position: "absolute",
              right: 20,
              width: 35,
              height: 30,
              borderRadius: 200 / 2,
              backgroundColor: "grey",
              top: -5,
              // overflow: "hidden",
            }}
          >
            <Text
              style={{
                position: "absolute",
                // right: 20,
                left: 11,
                top: -1,

                fontSize: 21,
              }}
            >
              {props.numbers}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // shadowRadius: 18,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 12,
    backgroundColor: "#ffffff",
    elevation: 9,
    height: 45,
    margin: 10,
    // marginTop: 15,
  },
  name: {
    padding: 10,
  },
  text: {
    paddingStart: 10,
    paddingTop: 8,
    fontWeight: "900",
    fontSize: 20,
    color: "#000000",
  },
  // numbers: {
  //   position: "absolute",
  //   right: 30,
  //   top: -4,
  //   textAlignVertical: "top",
  //   fontWeight: "500",
  //   color: "black",
  //   fontSize: 19,
  //   borderRadius:
  //     Math.round(
  //       Dimensions.get("window").width + Dimensions.get("window").height
  //     ) / 2,
  //   // width: 44,
  //   // height: 44,
  //   // borderRadius: 44 / 2,
  // },
});
export default Card;
