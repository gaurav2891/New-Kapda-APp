import { GET_CURRENT_USER } from "./../action/authActions";

const initialState = {
  currentUser: {},
};

// ////  jo apn reducer k ande daal rhe h user: action.payoad , ye sirf tb kaam aayega jb, store mn se kuch call hoga tb mtlb jb json token chahiye hoga

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
  }
  return state;
};

export default authReducer;
