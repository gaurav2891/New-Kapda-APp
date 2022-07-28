import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { Octicons, FontAwesome } from "@expo/vector-icons";

const LikeCard = () => {
  return (
    <View style={styles.likeCard}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingEnd: "40%",
        }}
      >
        <TouchableOpacity>
          <FontAwesome name="thumbs-up" size={24} color="grey" />
        </TouchableOpacity>
        <Text style={{ paddingStart: 12 }}> {24}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          paddingEnd: "40%",
        }}
      >
        <TouchableOpacity>
          <FontAwesome name="thumbs-down" size={24} color="grey" />
        </TouchableOpacity>
        <Text> {42}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  likeCard: {
    marginTop: 10,
    paddingStart: 20,
    flexDirection: "row",
  },
});
export default LikeCard;
