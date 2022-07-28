import React from "react";
import {
  WHOLESALER_COMMENT,
  COMMENT_NOTIFICATION,
} from "../action/wholesalerAction";

const initialState = {
  comment: [],
};

const WholesalerCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case WHOLESALER_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case COMMENT_NOTIFICATION:
      return {
        ...state,
        notificationComment: action.payload,
      };
  }

  return state;
};

export default WholesalerCommentReducer;
