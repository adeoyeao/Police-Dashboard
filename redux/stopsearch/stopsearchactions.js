import { FETCH_SEARCH_LOADING, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_FAILURE } from "./stopsearchtypes"

const searchLoading = () => ({ type: FETCH_SEARCH_LOADING })
const searchSuccess = (lat, lng, total, male, youth, vehicles, markers) => ({
      type: FETCH_SEARCH_SUCCESS,
      lat: lat,
      lng: lng,
      total: total,
      male: male,
      youth: youth,
      vehicles: vehicles,
      markers: markers
})
const searchFailure = (error) => ({
      type: FETCH_SEARCH_FAILURE,
      error: error
})

export { searchLoading, searchSuccess, searchFailure }