import { FETCH_CRIME_LOADING, FETCH_CRIME_SUCCESS, FETCH_CRIME_FAILURE } from "./crimetypes"
import { crimeLoading, crimeSuccess, crimeFailure } from "./crimeactions"

const initialState = {
      loading: false,
      data: false,
      err: ""
}

const crimeReducer = (state = initialState, action ) => {
      switch(action.type) {
            case FETCH_CRIME_LOADING: return {
                  ...state,
                  loading: true
            }
            case FETCH_CRIME_SUCCESS: return {
                  ...state,
                  loading: false,
                  data: {
                        total: action.total,
                        pending: action.pending,
                        sentenced: action.sentenced,
                        notGuilty: action.notGuilty
                  }
            }
            case FETCH_CRIME_FAILURE: return {
                  ...state,
                  loading: false,
                  data: false,
                  err: "Unable to find data, please try again"
            }
            default: return state
      }
}

export default crimeReducer