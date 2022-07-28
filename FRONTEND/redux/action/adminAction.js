import AsyncStorage from "@react-native-async-storage/async-storage";

export const UPDATE_WHOLESALER_BYADMIN = "UPDATE_WHOLESALER_BYADMIN";
export const FETCH_WHOLESALER = "FETCH_WHOLESALER";
export const UPDATE_WHOLESALER_PASS_BYADMIN = "UPDATE_WHOLESALER_PASS_BYADMIN";

import envs from "./../../config/env";
const BASE_URL = envs;

const getTokenId = async () => {
  let token = await AsyncStorage.getItem("token");
  return token;
};

export const updateWholesalerByAdmin = ({
  id,
  stateName,
  stateFirmName,
  stateclothCateogry,
  stateMobileNumber,
  stateAddress,
  stateActive,
}) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const updateWholesalerData = await fetch(
      `${BASE_URL}/api/v1/wholesaler/admin`,
      {
        method: "PATCH",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          id: id,
          name: stateName,
          firmName: stateFirmName,
          clothCategory: stateclothCateogry,
          mobileNumber: stateMobileNumber,
          address: stateAddress,
          active: stateActive,
        }),
      }
    );

    const updateWholesalerJson = await updateWholesalerData.json();
    dispatch({
      type: UPDATE_WHOLESALER_BYADMIN,
      payload: updateWholesalerJson,
    });

    return updateWholesalerJson;
  };
};

export const fetchWholesaler = () => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const allWholesaler = await fetch(`${BASE_URL}/api/v1/wholesaler/admin`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${tokenId}`,
      }),
    });

    const allWholesalerJson = await allWholesaler.json();

    dispatch({
      type: FETCH_WHOLESALER,
      payload: allWholesalerJson,
    });

    return allWholesalerJson;
  };
};

export const updatePassByAdmin = (id, password, passwordConfirm) => {
  return async (dispatch) => {
    const tokenId = await getTokenId();

    const updatePass = await fetch(
      `${BASE_URL}/api/v1/wholesaler/${id}/updatePassByAdmin`,
      {
        method: "PATCH",
        headers: new Headers({
          Authorization: `Bearer ${tokenId}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          newPassword: password,
          newPasswordConfirm: passwordConfirm,
        }),
      }
    );

    const updatePassJson = await updatePass.json();

    dispatch({
      type: UPDATE_WHOLESALER_PASS_BYADMIN,
      payload: 1,
    });

    return updatePassJson;
  };
};
