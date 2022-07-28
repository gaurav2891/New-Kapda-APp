import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";

import CommentCard from "../../component/commentCard";
import * as retailerAction from "../../redux/action/RetailerAction";

import SplashScreen from "../splashScreen";
import { useSelector, useDispatch } from "react-redux";

const App = (props) => {
  const { selectComment, id } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(retailerAction.fetchRetailerComment(id)).then(() =>
      dispatch(retailerAction.fetchWRComment(id)).then(() =>
        setIsLoading(false)
      )
    );
    // dispatch(retailerAction.fetchWRComment(id)).then(() => setIsLoading(false));
  }, [dispatch]);

  let comments = useSelector((state) => state.retailer.retailerComment);
  let wrComment = useSelector((state) => state.retailer.wrComment);

  if (isLoading) {
    return (
      <View>
        <SplashScreen />
      </View>
    );
  }

  if (
    comments.data == null ||
    comments.status === "FAILED" ||
    comments.data === 0
  ) {
    comments.data = {
      date: "00-00-0000",
      _id: "0000000000",
      comment: "No Comment....",
    };
  }

  if (!wrComment || wrComment.data == null) {
    wrComment.data = {
      date: "00-00-0000",
      comment: "No Comment",
    };
  }

  let i = 1;
  return (
    // <View>
    <SafeAreaView style={styles.commentContainer}>
      <Text style={styles.commentText}>MY COMMENT:</Text>
      <ScrollView style={{ height: "33%" }}>
        <CommentCard
          style={styles.card}
          date={wrComment.data.date}
          comment={wrComment.data.comment}
        />
      </ScrollView>

      <View style={{ height: "65%" }}>
        <Text style={styles.commentText}>
          All COMMENTS: ( {comments.data.doc.length} )
        </Text>

        <FlatList
          style={styles.allComment}
          data={comments.data.doc}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <CommentCard
              style={styles.card}
              date={item.date}
              comment={item.comment}
              number={i++}
            />
          )}
        />
      </View>
    </SafeAreaView>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // allComment: {
  //   height: "60%",
  // },
  commentText: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 20,
    paddingStart: 30,
    fontWeight: "bold",
  },
  card: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    // height: 200,
    height: "14%",
  },
  commentContainer: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#e6e7e8",
    elevation: 5,
    height: "97%",
    margin: 10,
    fontSize: 25,
    marginBottom: 30,
  },
  date: {
    color: "blue",
    marginTop: 9,
    fontSize: 19,
    marginBottom: 9,
  },
  comment: {
    fontSize: 23,
    paddingStart: 10,
  },
});
export default App;
