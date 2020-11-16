import { FETCH_SEARCH_LOADING, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE } from "./stopsearchtypes"

const initialState = {
      loading: false,
      data: false,
      error: ""
}

const searchReducer = (state = initialState , action ) => {
      switch(action.type) {
            case FETCH_SEARCH_LOADING: return {
                  ...state,
                  loading: true
            }
            case FETCH_SEARCH_SUCCESS: return {
                  ...state,
                  loading: false,
                  data: {
                        lat: action.lat,
                        lng: action.lng,
                        total: action.total,
                        male: action.male,
                        youth: action.youth,
                        vehicles: action.vehicles,
                        markers: action.markers,
                        chartData: action.chartData
                  }
            }
            case FETCH_SEARCH_FAILURE: return {
                  ...state,
                  loading: false,
                  data: false,
                  error: "No data found"
            }
            default: return state
      }
}

export default searchReducer