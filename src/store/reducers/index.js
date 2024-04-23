import { combineReducers } from "redux";
import userSlice from "./user.slice";
import checkoutSlice from "./checkout.slice";
import offerSlice from "./offer.slice";
const rootReducer = combineReducers({
  user: userSlice,
  checkout: checkoutSlice,
  offer:offerSlice,
});
export default rootReducer;
