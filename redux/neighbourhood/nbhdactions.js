import {  FETCH_NBHD_LOADING, FETCH_NBHD_SUCCESS, FETCH_NBHD_FAILURE } from "./nbhdtypes"

const nbhdLoading = () => ({ type: FETCH_NBHD_LOADING })
const nbhdSuccess = (lat, lng, force, twitter, facebook, phone, markers, chartData) => ({
      type: FETCH_NBHD_SUCCESS,
      lat: lat,
      lng: lng,
      force: force,
      twitter: twitter,
      facebook: facebook,
      phone: phone,
      markers: markers,
      chartData: chartData
})
const nbhdFailure = (error) => ({ type: FETCH_NBHD_FAILURE, error: error })

export { nbhdLoading, nbhdSuccess, nbhdFailure }