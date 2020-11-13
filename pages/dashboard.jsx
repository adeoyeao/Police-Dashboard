import Header from "../components/Header"
import Crimes from "../components/Crimes"
import Neighbourhood from "../components/Neighbourhood"
import StopSearch from "../components/StopSearch"
import Navbar from "../components/Navbar"

import { useSelector } from "react-redux"

const Dashboard = () => {
      const view = useSelector(state => state.navigation.view)

      return (
            <main>
                  <Header />
                  <Navbar />
                  { view === "crimes" ? 
                  <Crimes /> :
                  view === "neighbourhood" ? 
                  <Neighbourhood /> :
                  <StopSearch /> }
            </main>
      )
}

export default Dashboard