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
                  <Stat 
                  head={data.total}/>
                  <Stat 
                  head={data.pending}/>
                  <Stat 
                  head={data.sentenced}/>
                  <Stat 
                  head={data.notGuilty}/>
                  <Map />
                  <Chart />
                  {loading && <Loader />}
            </section>
      )
}

export default Crimes