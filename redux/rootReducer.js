import { combineReducers } from "redux"
import navReducer from "./navigation/navreducer"
import crimeReducer from "./crime/crimereducer"
import nbhdReducer from "./neighbourhood/nbhdreducer"
import searchReducer from "./stopsearch/stopsearchreducer"

const rootReducer = combineReducers({
      navigation: navReducer,
      crime: crimeReducer,
      neighbourhood: nbhdReducer,
      search: searchReducer
})

export default rootReducer
