import styles from "../styles/layouts/dashboard.module.scss"
import Chart from "./Chart"
import Map from "./Map"
import Stat from "./Stat"
import Loader from "./Loader"

import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { nbhdLoading, nbhdSuccess, nbhdFailure } from "../redux/actions"

const Neighbourhood = () => {
      const dispatch = useDispatch()
      const { loading, data, error } = useSelector(state => state.neighbourhood)
      const [ labels, setLabels ] = useState()
      const [ dataset, setDataset ] = useState()

      useEffect(() => {
            if(!data) {
                  dispatch(nbhdLoading())
                  fetch("/neighbourhood")
                  .then(res => res.json())
                  .then(results => {
                        const { lat, lng, force, twitter, facebook, phone, markers, chartData } = results
                        dispatch(nbhdSuccess(lat, lng, force, twitter, facebook, phone, markers, chartData))
                        setLabels(chartData.map(x => x[0]))
                        setDataset(chartData.map(x => x[1]))
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
                  <h4>Data is released one month in arrears.</h4>
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
                  <Map type="neighbourhood"/>
                  <Chart 
                  type="doughnut"
                  name="Breakdown of Senior Officers"
                  dataset={dataset}
                  labels={labels}/>
                  { loading && <Loader />}
            </section>
      )
}

export default Neighbourhood