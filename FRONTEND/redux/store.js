import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import commentReducer from "./reducer/addCommentReducer";
import retailerReducer from "./reducer/RetailerReducer";
import WholesalerCommentReducer from "./reducer/wholesalerReducer";
import authReducer from "./reducer/authReducers";
import adminReducer from "./reducer/adminReducer";

const rootReducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  retailer: retailerReducer,
  WholesalerComment: WholesalerCommentReducer,
  // auth: authReducer,
});
//   WE CREATE "MIDDLEWARE" FOR HANDLING ASYNCHRONUS OPERATIONS
const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);
