import { FETCH_SEARCH_LOADING, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE } from "./stopsearchtypes"

const searchLoading = () => ({ type: FETCH_SEARCH_LOADING })
const searchSuccess = (total, male, youth, vehicles) => ({
      type: FETCH_SEARCH_SUCCESS,
      total: total,
      male: male,
      youth: youth,
      vehicles: vehicles
})
const searchFailure = (error) => ({
      type: FETCH_SEARCH_FAILURE,
      error: error
})

export { searchLoading, searchSuccess, searchFailure }