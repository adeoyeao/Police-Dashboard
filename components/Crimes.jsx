import styles from "../styles/layouts/dashboard.module.scss"
import Chart from "./Chart"
import Map from "./Map"
import Stat from "./Stat"

const Crimes = () => {
      return (
            <section className={styles.dashboard}>
                  <Stat 
                  head="Statistic"/>
                  <Stat 
                  head="Statistic"/>
                  <Stat 
                  head="Statistic"/>
                  <Stat 
                  head="Statistic"/>
                  <Map />
                  <Chart />
            </section>
      )
}

export default Crimes