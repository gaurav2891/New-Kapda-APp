import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
// import { NativeModules } from 'react-native';

import { useSelector, useDispatch } from "react-redux";

import { Icon } from "react-native-elements";
import Card from "./../component/card";

import * as wholesalerAction from "./../redux/action/wholesalerAction";

const Notification = (props) => {
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  let { currentUser } = useSelector((state) => state.auth);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(wholesalerAction.getNewNotifications()).then((res) => {
      setRefreshing(false);
    });
  }, []);

  const newComment = useSelector(
    (state) => state.WholesalerComment.notificationComment.newComment
  );

  // const newArray = newComment.map((comment) => comment.retailer).filter((firmName) => firmName.)

  let newArray = Array.from(new Set(newComment.map((item) => item.retailer)));

  let newArr = [];
  (() => {
    let i = 0;
    let j = 0;
    newArray.forEach((el) => {
      // console.log("\n\n", j++, i, newArr);
      let id = newArr.map((el) => {
        if (el && el.id) {
          return el.id;
        }
      });

      if (id.includes(el.id)) {
        // console.log(newArr[id.indexOf(el.id)])  //  method to get Element in NewConverted Array
        newArr[id.indexOf(el.id)].numbers += 1;
      } else if (!id.includes(el.id)) {
        el.numbers = 1;
        newArr.push(el);
      }
    });
  })();

  // console.log(currentUser);

  return (
    <View>
      <FlatList
        data={newArr}
        keyExtractor={(item) => item._id}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Card
            // style={styles.card}
            navigation={props.navigation}
            name={item.name}
            firmName={item.firmName}
            clothCategory={currentUser.clothCategory}
            numbers={item.numbers}
            id={item._id}
            parentstyle={{ backgroundColor: "#D1C6C8" }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  },
});

export default Notification;
