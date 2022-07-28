import React from "react";
import {
  FETCH_RETAILER,
  ADD_RETAILER,
  RETAILER_COMMENT,
  WR_COMMENT,
} from "./../action/RetailerAction";

let initialState = {
  retailer: [],
  retailerComment: [],
  wrComment: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_RETAILER:
      return {
        ...state,
        retailer: action.payload.data.doc,
      };

    case ADD_RETAILER:
      return {
        ...state,
      };
    case RETAILER_COMMENT:
      return { ...state, retailerComment: action.payload };

    case WR_COMMENT:
      return { ...state, wrComment: action.payload };
  }
  return state;
}
