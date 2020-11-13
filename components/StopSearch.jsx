import styles from "../styles/layouts/dashboard.module.scss"
import Chart from "./Chart"
import Map from "./Map"
import Stat from "./Stat"
import Loader from "./Loader"

import { searchLoading, searchSuccess, searchFailure } from "../redux/actions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"


const StopSearch = () => {
      const dispatch = useDispatch()
      const { loading, data, error } = useSelector( state => state.search )

      useEffect(() => {
            if(!data) {
                  dispatch(searchLoading())
                  fetch("/stopsearch")
                  .then(res => res.json())
                  .then(results => {
                        const { total, male, youth, vehicles } = results
                        dispatch(searchSuccess(total, male, youth, vehicles))
                  })
                  .catch(err => {
                        console.log(err)
                        dispatch(searchFailure("No data found"))
                  })
            }
      })

      return (
            <section className={styles.dashboard}>
                  <h1>Stop and Search Stats in Your Local Area</h1>
                  <h4>Update to date as of . Note: Outcomes data is incomplete</h4>
                  <Stat 
                  stat={data.total}
                  head="Total Stop and Searches"/>
                  <Stat 
                  stat={data.male}
                  head="% Male"/>
                  <Stat 
                  stat={data.youth}
                  head="Under 24s Searched"/>
                  <Stat 
                  stat={data.vehicles}
                  head="Total Vehicle Searches"/>
                  <Map />
                  <Chart />
            </section>
      )
}

export default StopSearch