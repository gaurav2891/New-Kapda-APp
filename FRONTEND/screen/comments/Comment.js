import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as wholesalerAction from "./../../redux/action/wholesalerAction";
import CommentCard from "./../../component/commentCard";
import SplashScreen from "./../splashScreen";

const App = (props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(wholesalerAction.fetchWholesalerComment()).then((re) => {
      setRefreshing(false);
    });
  }, []);

  const wholesalerComment = useSelector(
    (state) => state.WholesalerComment.comment
  );

  if (
    wholesalerComment.status === "FAILED" ||
    wholesalerComment.status === "error" ||
    !wholesalerComment.data
  ) {
    return (
      <View>
        <SplashScreen message="Unable to find Comment" />
      </View>
    );
  }

  const { allComment } = wholesalerComment.data;

  let i = 1;
  return (
    <View style={styles.body}>
      <SafeAreaView>
        {allComment.length !== 0 ? (
          <FlatList
            data={allComment}
            keyExtractor={(item) => item._id}
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <CommentCard
                style={styles.card}
                number={i++}
                navigation={props.navigation}
                comment={item.comment}
                firmName={item.retailer.firmName}
                date={item.date}
              />
            )}
          />
        ) : (
          <ScrollView
            // contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <CommentCard
              style={styles.card}
              number={i++}
              navigation={props.navigation}
              comment={"..."}
              firmName={"..."}
              date={"00-00-0000"}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#e6e7e8",
  },
  card: {
    marginTop: 80,
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
  },
  firm: {
    color: "blue",
    padding: 10,
  },
  button: {
    color: "red",
    marginTop: 90,
    marginBottom: 30,
  },
});
export default App;
