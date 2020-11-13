import styles from "../styles/layouts/dashboard.module.scss"
import Chart from "./Chart"
import Map from "./Map"
import Stat from "./Stat"
import Loader from "./Loader"

import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { nbhdLoading, nbhdSuccess, nbhdFailure } from "../redux/actions"

const Neighbourhood = () => {
      const dispatch = useDispatch()
      const { loading, data, error } = useSelector(state => state.neighbourhood)

      useEffect(() => {
            if(!data) {
                  dispatch(nbhdLoading())
                  fetch("/neighbourhood")
                  .then(res => res.json())
                  .then(results => {
                        const { force, twitter, facebook, phone } = results
                        dispatch(nbhdSuccess(force, twitter, facebook, phone))
                  })
                  .catch(err => {
                        console.error(err)
                        dispatch(nbhdFailure("No data has been found"))
                  })
            }
      }, [])
      
      return (
            <section className={styles.dashboard}>
                  <h1>Information on Your Local Police Force</h1>
                  <h4>Update to date as of </h4>
                  <Stat 
                  stat={data.force}
                  head="Local Force"/>
                  <Stat 
                  stat={data.twitter ? data.twitter : "No Twitter Account"}
                  head="Twitter Handle"/>
                  <Stat 
                  stat={data.facebook ? data.facebook : "No Facebook Account"}
                  head="Facebook Account"/>
                  <Stat 
                  stat={data.phone ? data.phone : "No Phone Number"}
                  head="Phone Number"/>
                  <Map />
                  <Chart />
                  { loading && <Loader />}
            </section>
      )
}

export default Neighbourhood