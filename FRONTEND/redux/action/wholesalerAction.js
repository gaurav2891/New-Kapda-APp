import AsyncStorage from "@react-native-async-storage/async-storage";
import envs from "./../../config/env";

export const WHOLESALER_COMMENT = "WHOLESALER_COMMENT";
export const UPDATE_ME = "UPDATE_ME";
export const UPDATE_MY_PASSWORD = "UPDATE_MY_PASSWORD";
export const COMMENT_NOTIFICATION = "COMMENT_NOTIFICATION";
const BASE_URL = envs;

const getTokenId = async () => {
  let token = await AsyncStorage.getItem("token");
  return token;
};

export const updateMe = (
  stateName,
  stateLandMark,
  stateMobileNumber,
  stateWhatsappNumber,
  stateAddress
) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const updateMeData = await fetch(`${BASE_URL}/api/v1/wholesaler`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        name: stateName,
        mobileNumber: stateMobileNumber,
        landMark: stateLandMark,
        whatsappNumber: stateWhatsappNumber,
        address: stateAddress,
      }),
    });

    const updateMeJson = await updateMeData.json();
    dispatch({
      type: UPDATE_ME,
      payload: updateMeJson,
    });

    return updateMeJson;
  };
};

export const updatePassword = (oldPassword, password, passwordConfirm) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const updateMyPass = await fetch(
      `${BASE_URL}/api/v1/wholesaler/updateMyPassword`,
      {
        method: "PATCH",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: password,
          newPasswordConfirm: passwordConfirm,
        }),
      }
    );

    const updatePassJson = await updateMyPass.json();

    dispatch({
      type: UPDATE_MY_PASSWORD,
      payload: 1,
    });

    return updatePassJson;
  };
};

export const fetchWholesalerComment = () => {
  return async (dispatch) => {
    const tokenId = await getTokenId();
    const comment = await fetch(`${BASE_URL}/api/v1/wholesaler/comment`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
      }),
    });

    const commentJson = await comment.json();

    dispatch({
      type: WHOLESALER_COMMENT,
      payload: commentJson,
    });
    return commentJson;
  };
};

export const getNewNotifications = () => {
  return async (dispatch) => {
    const tokenId = await getTokenId();
    const newComment = await fetch(`${BASE_URL}/api/v1/comment/newComments`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
      }),
    });

    const newCommentJson = await newComment.json();

    dispatch({
      type: COMMENT_NOTIFICATION,
      payload: newCommentJson.data,
    });

    return newCommentJson;
  };
};
