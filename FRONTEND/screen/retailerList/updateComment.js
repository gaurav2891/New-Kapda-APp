import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as addCommentAction from "../../redux/action/addCommentAction";
import catchDispatch from "./../../utils/catchDispatch";

import { useDispatch } from "react-redux";

const App = (props) => {
  const { showedComment, name, firmName, clothCategory, id } =
    props.route.params;

  // console.log("UPDATE COMMENT😀", name, firmName, clothCategory, id);

  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { isLoading, setIsLoading } = useState(false);

  const updateComment = (comment, id) => {
    let updatedCommentData = {
      data: {
        date: JSON.stringify(new Date()).split("T")[0].slice(1),
        comment,
      },
    };
    catchDispatch(
      dispatch(addCommentAction.updateComment(comment, id)),
      `Updated Comment: ${comment}`,
      props.navigation.navigate("RetailerDetail", {
        name,
        firmName,
        clothCategory,
        id,
        updatedCommentData,
      })
    );
  };

  useEffect(() => {
    showedComment && showedComment.data.comment
      ? setComment(showedComment.data.comment)
      : null;
  }, []);

  // console.log("comment 😀😀😀😁", Commentator);

  return (
    <ScrollView>
      <Text style={styles.header}>Update your Comment here</Text>

      {showedComment && showedComment.data.comment ? (
        <TextInput
          style={styles.commentContainer}
          onChangeText={(text) => setComment(text)}
          multiline
          // autoFocus={true}
        >
          {showedComment.data.comment}
        </TextInput>
      ) : (
        <TextInput
          style={styles.commentContainer}
          placeholder={"Update comment here"}
          value={comment}
          multiline
          // autoFocus={true}
          onChangeText={(text) => setComment(text)}
        />
      )}

      <Button
        style={styles.button}
        title="Update comment"
        onPress={() => updateComment(comment, id)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 19,
    marginTop: 12,
    textAlign: "center",
    justifyContent: "center",
  },
  commentContainer: {
    padding: 12,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 5,
    height: 300,
    margin: 20,
    fontSize: 25,
  },
  button: {
    margin: 20,
    width: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;

{
  /* {!selectComment || selectComment.data == 0 ? (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("AddComment", {
                  id,
                  name,
                  firmName,
                  clothCategory,
                })
              }
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "200",
                  color: "grey",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textDecorationColor: "black",
                }}
                placeholder="Add comment here"
              >
                Add comment here..
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("UpdateComment", {
                  name,
                  firmName,
                  selectComment,
                  id,
                  clothCategory,
                });
              }}
            >
              <ScrollView>
                <Text style={styles.date}>
                  {selectComment && selectComment.data.date}
                </Text>
                <Text style={styles.text}>
                  {selectComment && `Comment: ${selectComment.data.comment}`}
                </Text>
              </ScrollView>
            </TouchableOpacity>
          )} */
}

// useEffect(() => {
//   console.log(
//     "\n\nUSEEFFECT START =>>>>>>>💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀"
//   );
//   setIsLoading(true);
//   // dispatch(retailerAction.fetchWRComment(id)).then(() => setIsLoading(false));

//   if (props.route.params.updatedCommentData) {
//     console.log("❌😎😎❌❌❌");
//     try {
//       console.log("xx");
//       // showedComment = useSelector((state) => state.retailer.wrComment);
//       commentData = props.route.params.updatedCommentData;
//       setSelectComment(commentData);
//       console.log("👺", commentData);
//       console.log("❌😎😎❌❌❌");
//     } catch (error) {
//       console.log("xx error =>>>", error);
//     }
//   } else {
//     setSelectComment(wrComment);
//   }
//   //
//   // console.log("😴🥱🥱 props.route.params🥱🥱", props.route.params);
//   console.log("USEEFFECT END =>>>>>>>💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀💀\n");

//   // return () => {
//   //   setSelectComment({});
//   // };
// }, [props, isFocused]);
