import { FETCH_CRIME_LOADING, FETCH_CRIME_SUCCESS, FETCH_CRIME_FAILURE } from "./crimetypes"

const crimeLoading = () => ({ type: FETCH_CRIME_LOADING })
const crimeSuccess = (lat, lng, total, pending, sentenced, notGuilty, markers) => ({
      type: FETCH_CRIME_SUCCESS,
      lat: lat,
      lng: lng,
      total: total,
      pending: pending,
      sentenced: sentenced,
      notGuilty: notGuilty,
      markers: markers
})
const crimeFailure = () => ({ type: FETCH_CRIME_FAILURE})

export { crimeLoading, crimeSuccess, crimeFailure }