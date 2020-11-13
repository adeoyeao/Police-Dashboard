import { combineReducers } from "redux"
import navReducer from "./navigation/navreducer"
import crimeReducer from "./crime/crimereducer"

const rootReducer = combineReducers({
      navigation: navReducer,
      crime: crimeReducer
})

export default rootReducer
