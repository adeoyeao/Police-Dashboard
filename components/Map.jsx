import styles from "../styles/components/map.module.scss"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Leaflet = dynamic(() => import("./Leaflet"), {ssr: false})

const Map = (props) => {
      const [ map, setMap ] = useState()

      return (
            <div className={styles.map}>
                  <Leaflet type={props.type}/>
            </div>
      )
}

export default Map