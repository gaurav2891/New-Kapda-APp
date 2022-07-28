import { FETCH_WHOLESALER } from "../action/adminAction";

let initialState = {
  allWholesaler: [],
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WHOLESALER:
      return { ...state, allWholesaler: action.payload };
  }
  return state;
};

export default admin;
