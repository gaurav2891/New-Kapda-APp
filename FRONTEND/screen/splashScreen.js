import React from "react";
import { StyleSheet, View, Text } from "react-native";
const App = (props) => {
  const { message } = props;
  if (message) {
  }
  return (
    <View style={styles.body}>
      <Text style={styles.text}>KAPDA BAZAR</Text>
      <Text style={styles.message}>{message ? `ISSUE : ${message}` : ""}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: "paleturquoise",
    backgroundColor: "#cd5c6d",
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
  },
  message: {
    fontSize: 20,
    color: "black",
    marginTop: 20,
  },
});

export default App;
