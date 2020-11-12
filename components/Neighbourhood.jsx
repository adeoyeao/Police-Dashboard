import styles from "../styles/layouts/dashboard.module.scss"
import Chart from "./Chart"
import Map from "./Map"
import Stat from "./Stat"

const Neighbourhood = () => {
      return (
            <section className={styles.dashboard}>
                  <Stat />
                  <Stat />
                  <Stat />
                  <Stat />
                  <Map />
                  <Chart />
            </section>
      )
}

export default Neighbourhood