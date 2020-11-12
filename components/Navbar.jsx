import { useDispatch, useSelector } from "react-redux"
import { viewCrimes, viewNeighbourhood, viewStopSearch } from "../redux/actions"
import styles from "../styles/components/navbar.module.scss"
import { useState, useEffect } from "react"

const Navbar = () => {
      const dispatch = useDispatch()
      const view = useSelector(state => state.navigation.view)
      const defaultStyle = {
            crimes: {},
            neighbourhood: {},
            stopsearch: {}
      }
      const [ buttonStyle, setButtonStyle ] = useState({...defaultStyle})

      const changeStyle = () => 
      window.innerWidth > 1200 ? 
      setButtonStyle({
            ...defaultStyle,
            [view]: {
                  color: "#E43FBF",
                  background: "#DFBBB1"
            }}) : setButtonStyle({
                  ...defaultStyle,
                  [view]: {
                        color: "#E43FBF"
                  }
            })

      const crimes = () =>  dispatch(viewCrimes())
      const neighbourhood = () => dispatch(viewNeighbourhood())
      const stopsearch = () => dispatch(viewStopSearch())

      useEffect(() => {
            changeStyle()
            window.addEventListener("resize", changeStyle)
            return (() => window.removeEventListener("resize", changeStyle))
      }, [view])

      return (
            <nav className={styles.navbar}>
                  <button onClick={crimes} style={buttonStyle.crimes}>Crimes</button>
                  <button onClick={neighbourhood} style={buttonStyle.neighbourhood}>Neighbourhood</button>
                  <button onClick={stopsearch} style={buttonStyle.stopsearch}>Stop and Search</button>
            </nav>
      )
}

export default Navbar