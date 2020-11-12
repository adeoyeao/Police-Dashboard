import { combineReducers } from "redux"
import navReducer from "./navigation/navreducer"

const rootReducer = combineReducers({
      navigation: navReducer
})

export default rootReducer