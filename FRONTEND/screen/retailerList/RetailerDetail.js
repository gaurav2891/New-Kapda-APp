import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import * as retailerAction from "../../redux/action/RetailerAction";
import * as addCommentAction from "../../redux/action/addCommentAction";
import catchDispatch from "./../../utils/catchDispatch";

import SplashScreen from "../splashScreen";

//

//
//
//
//
//
//
//

//
//

const App = (props) => {
  let wrComment;
  const isFocused = useIsFocused();
  const [selectComment, setSelectComment] = useState({});
  const dispatch = useDispatch();

  let commentData = {};
  const { name, firmName, clothCategory, id, location, district } =
    props.route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(retailerAction.fetchRetailerComment(id)).then(() =>
      setIsLoading(false)
    );
    // dispatch(retailerAction.fetchWRComment(id)).then(() => setIsLoading(false));
  }, [dispatch]);

  // TODO:   FUNCTION OF screens  TODO:
  const deleteComment = (id) => {
    const deleteComment = {
      data: 0,
    };
    catchDispatch(
      dispatch(addCommentAction.deleteComment(id)),
      "Comment Deleted",
      props.navigation.navigate("RetailerDetail", {
        name,
        firmName,
        clothCategory,
        id,
        updatedCommentData: deleteComment,
      })
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(retailerAction.fetchWRComment(id)).then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={{ backgroundColor: "pink" }}>
        <SplashScreen message="fetching comment" />
      </View>
    );
  }

  // TODO:   FUNCTION OF screens  TODO:

  const ShowCommentHere = ({ showedComment }) => {
    // console.log("======================", showedComment);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("UpdateComment", {
              name,
              firmName,
              showedComment,
              id,
              clothCategory,
            });
          }}
        >
          <ScrollView>
            <View style={{ flex: 1 }}>
              <Text style={styles.date}>
                {showedComment.data?.date?.split("T")[0]}
              </Text>
              <Text style={styles.text}>{`${showedComment.data.comment}`}</Text>
            </View>
          </ScrollView>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("UpdateComment", {
              showedComment,
              name,
              firmName,
              clothCategory,
              id,
            })
          }
        >
          <Text
            style={{
              color: "blue",
              alignSelf: "flex-end",
              fontSize: 20,
              paddingEnd: 14,
            }}
          >
            {"\n"}
            Update comment
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const AddCommentHere = () => {
    return (
      <View>
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
      </View>
    );
  };

  const Comment = () => {
    // console.log("💩🚼🚼🚼🚼🚼🚼🚼🚼🚼🚼🚼🚼🚼🚼🚼🚼", selectComment);
    getValue();

    let wrComment = useSelector((state) => state.retailer.wrComment);

    // console.log("👺👹✅✅✅👹👹", wrComment);

    function getValue() {
      if (!props.route.params.updatedCommentData) {
        setSelectComment(wrComment);
      } else if (props.route.params.updatedCommentData) {
        let commentData = props.route.params.updatedCommentData;
        setSelectComment(commentData);
      } else {
        // console.log(
        //   "❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌❌"
        // );
        setSelectComment(wrComment);
      }
    }

    !selectComment || selectComment.data == undefined ? getValue() : getValue();
    return (
      <View>
        {selectComment && selectComment.data ? (
          <ShowCommentHere showedComment={selectComment} />
        ) : null}
        {!selectComment || selectComment.data == 0 ? <AddCommentHere /> : null}
      </View>
    );
  };

  //

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#e6e7e8" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Text style={styles.name}>{firmName}</Text>
        <Text style={styles.status}>Retailer : {name} </Text>
        <Text style={styles.status}>Cloth Category : {clothCategory}</Text>
        <Text style={styles.status}>
          Address : {location}- ( {district} )
        </Text>
        {/* <Text style={styles.status}>My comment : </Text> */}
      </View>

      <View style={styles.commentContainer}>
        {/* {console.log("😈😈😈😈😈😈😈", selectComment)} */}
        {selectComment ? <Comment /> : null}
      </View>

      {/*  */}
      {/*  */}
      {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                  //     THIS SHOULD HAPPEN IN EVERY RENDERING OF PAGE
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {/* VIEW DETAIL FUNCTIONS      */}
      <View>
        <TouchableOpacity
          style={styles.showDetails}
          onPress={() =>
            props.navigation.navigate("ShowDetails", {
              // selectComment,
              id,
              name,
              firmName,
              clothCategory,
            })
          }
        >
          <Text
            style={{
              fontSize: 25,
              color: "dimgrey",
            }}
          >
            View Retailer detail
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            Alert.alert("Delete", "Do you want to delete your comment", [
              {
                text: "Delete",
                onPress: () => deleteComment(id),
              },
              {
                text: "Cancel",
              },
            ])
          }
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            {" "}
            Delete My comment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  status: {
    marginTop: 10,
    paddingStart: 10,
    fontSize: 20,
  },
  name: {
    padding: 10,
    fontSize: 30,
  },
  commentContainer: {
    color: "grey",
    shadowRadius: 8,
    borderRadius: 15,
    paddingTop: 18,
    padding: 12,
    marginBottom: 10,
    margin: 15,
    fontSize: 25,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 12,
    // height: "38%",
  },
  comment: {
    fontSize: 24,
    paddingStart: 10,
    marginBottom: 10,
  },

  showDetails: {
    color: "gray",
    // alignSelf: "flex-start",
    alignSelf: "center",
    // backgroundColor: "#94918e",
    fontSize: 44,
    padding: 10,
    margin: 18,

    shadowColor: "#94918e",
    shadowOpacity: 0.25,
    shadowOffset: { width: 4, height: 2 },
    shadowRadius: 8,
    borderRadius: 80,
    elevation: 5,
    borderWidth: 1,
    textDecorationColor: "black",
    backgroundColor: "gainsboro",
  },
  deleteButton: {
    color: "black",
    alignSelf: "center",
    fontSize: 24,
    padding: 10,
    marginBottom: 10,
    // shadowColor: "lightcyan",
    // shadowOpacity: 0.25,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    borderRadius: 80,
    elevation: 5,
    // borderBottomWidth: 1,

    backgroundColor: "orangered",
  },
  date: {
    justifyContent: "flex-end",
    color: "black",
    alignContent: "center",
    backgroundColor: "white",
    textAlign: "right",
    paddingEnd: 30,
    fontSize: 20,
  },
  text: {
    paddingStart: 2,
    paddingTop: 10,
    fontWeight: "900",
    fontSize: 19,
    color: "black",
    // backgroundColor: "aliceblue",
    paddingEnd: 5,
    paddingHorizontal: 10,
    paddingStart: 7,
    fontFamily: "Roboto",
    fontVariant: ["lining-nums"],
    fontSize: 20,
  },
  // waitData: {
  //   marginBottom: 22,
  //   marginTop: 15,
  // },
  // centered: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // or: {
  //   justifyContent: "space-between",
  //   fontSize: 25,
  //   textAlign: "center",
  // },
  // description: {
  //   shadowColor: "lightgreen",
  //   shadowOpacity: 0.25,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 8,
  //   borderRadius: 10,
  //   backgroundColor: "#ffffff",
  //   elevation: 5,
  //   height: 200,
  //   margin: 10,
  // },
  // click: {
  //   fontSize: 16,
  //   marginBottom: 22,
  //   marginTop: 15,
  // },
});

export default App;

// if (!props.route.params.updatedCommentData) {
//   try {
//     console.log("xx");
//     // wrComment = useSelector((state) => state.retailer.wrComment);
//     // console.log("👺👹👹👹", wrComment);
//   } catch (error) {
//     console.log("xx error =>>>", error);
//   }
// } else {
//   console.log("🧯㊗🧯🧯🧯", props.route.params.updatedCommentData);
//   commentData = props.route.params.updatedCommentData;
//   console.log(
//     "Add COmment se 😎🤜⤴⤴⤴🤜🤜🤜🤜🤜 comment aaya h ",
//     commentData
//   );
//   setSelectComment(commentData);
// }

{
  /* console.log(
    "\n\n🐢🐢🐢🐢💀💀💀, ",
    wrComment,
    "✅✅✅✅",
    // selectComment,
    "\n\n"
  ); */
}
{
  /*  */
}
{
  /*  */
}
{
  /*  */
}
{
  /* UPDATE COMMENT TAGS */
}

{
  /* <View>
        {!selectComment.data.date ? (
          <View>
            <Text></Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("UpdateComment", {
                wrComment: selectComment,
                name,
                firmName,
                clothCategory,
                id,
              })
            }
          >
            <Text
              style={{
                color: "blue",
                alignSelf: "flex-end",
                fontSize: 20,
                paddingEnd: 14,
              }}
            >
              Update comment
            </Text>
          </TouchableOpacity>
        )}
      </View> */
}
