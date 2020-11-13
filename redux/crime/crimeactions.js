import { FETCH_CRIME_LOADING, FETCH_CRIME_SUCCESS, FETCH_CRIME_FAILURE } from "./crimetypes"

const crimeLoading = () => ({ type: FETCH_CRIME_LOADING })
const crimeSuccess = (total, pending, sentenced, notGuilty) => ({
      type: FETCH_CRIME_SUCCESS,
      total: total,
      pending: pending,
      sentenced: sentenced,
      notGuilty: notGuilty
})
const crimeFailure = () => ({ type: FETCH_CRIME_FAILURE})

export { crimeLoading, crimeSuccess, crimeFailure }