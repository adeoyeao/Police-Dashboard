import {  FETCH_NBHD_LOADING, FETCH_NBHD_SUCCESS, FETCH_NBHD_FAILURE } from "./nbhdtypes"

const nbhdLoading = () => ({ type: FETCH_NBHD_LOADING })
const nbhdSuccess = (force, twitter, facebook, phone) => ({
      type: FETCH_NBHD_SUCCESS,
      force: force,
      twitter: twitter,
      facebook: facebook,
      phone: phone
})
const nbhdFailure = (error) => ({ type: FETCH_NBHD_FAILURE, error: error })

export { nbhdLoading, nbhdSuccess, nbhdFailure }