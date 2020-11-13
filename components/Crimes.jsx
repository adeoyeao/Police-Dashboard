import styles from "../styles/layouts/dashboard.module.scss"
import Chart from "./Chart"
import Map from "./Map"
import Stat from "./Stat"
import Loader from "./Loader"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { crimeLoading, crimeSuccess, crimeFailure } from "../redux/actions"

const Crimes = () => {
      const dispatch = useDispatch()
      const {loading , data, err } = useSelector(state => state.crime)

      useEffect(() => {
            if(!data) {
                  dispatch(crimeLoading())
                  fetch("/crimes")
                  .then(res => res.json())
                  .then(data => {
                        dispatch(crimeSuccess(data.totalCrimes, data.pending, data.sentenced, data.notGuilty))
                  })
                  .catch(err => {
                        console.error(err)
                        dispatch(crimeFailure())
                  })
            }
      }, [])

      return (
            <section className={styles.dashboard}>
                  <h1>Crime Stats in Your Local Area</h1>
                  <h4>Update to date as of . Note: Outcomes data is incomplete</h4>
                  <Stat 
                  stat={data.total}
                  head="Total Crimes" />
                  <Stat 
                  stat={data.pending}
                  head="Pending Outcome"/>
                  <Stat 
                  stat={data.sentenced}
                  head="Defendants Found Guilty"/>
                  <Stat 
                  stat={data.notGuilty}
                  head="No Conviction"/>
                  <Map />
                  <Chart />
                  {loading && <Loader />}
            </section>
      )
}

export default Crimes