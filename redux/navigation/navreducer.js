import { VIEW_CRIMES, VIEW_NEIGHBOURHOOD, VIEW_STOPSEARCH } from "./navtypes"
import { viewCrimes, viewNeighbourhood, viewStopSearch } from "./navactions"

const initialState = {
      view: "crimes"
}

const navReducer = (state = initialState, action) => {
      switch(action.type) {
            case VIEW_CRIMES: return {
                  view: "crimes"
            }
            case VIEW_NEIGHBOURHOOD: return {
                  view: "neighbourhood"
            }
            case VIEW_STOPSEARCH: return {
                  view: "stopsearch"
            }
            default: return state
      }
}

export default navReducer