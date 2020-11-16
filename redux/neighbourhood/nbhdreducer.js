import { FETCH_NBHD_LOADING, FETCH_NBHD_SUCCESS, FETCH_NBHD_FAILURE } from "./nbhdtypes"

const initialState = {
      loading: false,
      data: false,
      error: ""
}

const nbhdReducer = (state = initialState, action) => {
      switch(action.type) {
            case FETCH_NBHD_LOADING: return {
                  ...state,
                  loading: true
            }
            case FETCH_NBHD_SUCCESS: return {
                  ...state,
                  loading: false,
                  data: {
                        lat: action.lat,
                        lng: action.lng,
                        force: action.force,
                        twitter: action.twitter,
                        facebook: action.facebook,
                        phone: action.phone,
                        markers: action.markers,
                        chartData: action.chartData
                  }
            }
            case FETCH_NBHD_FAILURE: return {
                  ...state,
                  loading: false,
                  data: false,
                  error: action.error
            }
            default: return state
      }
}

export default nbhdReducer