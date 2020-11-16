import styles from "../styles/layouts/dashboard.module.scss"
import Chart from "./Chart"
import Map from "./Map"
import Stat from "./Stat"
import Loader from "./Loader"

import { searchLoading, searchSuccess, searchFailure } from "../redux/actions"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"


const StopSearch = () => {
      const dispatch = useDispatch()
      const { loading, data, error } = useSelector( state => state.search )
      const [ labels, setLabels ] = useState()
      const [ dataset, setDataset ] = useState()

      useEffect(() => {
            if(!data) {
                  dispatch(searchLoading())
                  fetch("/stopsearch")
                  .then(res => res.json())
                  .then(results => {
                        const { lat, lng, total, male, youth, vehicles, markers, chartData } = results
                        dispatch(searchSuccess(lat, lng, total, male, youth, vehicles, markers, chartData))
                        setLabels(chartData.map(x => x[0]))
                        setDataset(chartData.map(x => x[1]))
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
                  <h4>Data is released one month in arrears. Note: Outcomes data is incomplete.</h4>
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
                  <Map type="stopsearch"/>
                  <Chart 
                  type="radar"
                  name="Stop and Search by Ethnicity"
                  dataset={dataset}
                  labels={labels} />
            </section>
      )
}

export default StopSearch