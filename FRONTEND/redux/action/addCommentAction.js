export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

import url from "./../../config/env";
const BASE_URL = url;

import AsyncStorage from "@react-native-async-storage/async-storage";

const getTokenId = async () => {
  let token = await AsyncStorage.getItem("token");
  return token;
};

export const addComment = (comment, id) => {
  return async (dispatch) => {
    let tokenId = await getTokenId();

    const newComment = await fetch(
      `${BASE_URL}/api/v1/retailer/${id}/comment/wholesaler`,
      {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
          "Content-type": "application/json",
        }),
        body: JSON.stringify({
          comment,
        }),
      }
    );
    const newCommentJson = await newComment.json();

    dispatch({
      type: ADD_COMMENT,
      payload: newCommentJson,
    });

    return newCommentJson;
  };
};

export const updateComment = (comment, retailerId) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const updatedComment = await fetch(
      `${BASE_URL}/api/v1/retailer/${retailerId}/comment/wholesaler`,
      {
        method: "PATCH",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
          "Content-type": "application/json",
        }),
        body: JSON.stringify({
          comment: comment,
        }),
      }
    );
    const updateWRCommentJson = await updatedComment.json();
    dispatch({
      type: UPDATE_COMMENT,
      payload: updateWRCommentJson,
    });
    return updateWRCommentJson;
  };
};

export const deleteComment = (retailerId) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const deleteComment = await fetch(
      `${BASE_URL}/api/v1/retailer/${retailerId}/comment/wholesaler`,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
        }),
      }
    );
    const deleteWRCommentJson = await deleteComment.json();
    dispatch({
      type: DELETE_COMMENT,
      payload: deleteWRCommentJson,
    });
    return deleteWRCommentJson;
  };
};
