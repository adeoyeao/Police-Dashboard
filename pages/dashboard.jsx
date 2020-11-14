import Header from "../components/Header"
import Crimes from "../components/Crimes"
import Neighbourhood from "../components/Neighbourhood"
import StopSearch from "../components/StopSearch"
import Navbar from "../components/Navbar"
import Head from "next/head"

import { useSelector } from "react-redux"

const Dashboard = () => {
      const view = useSelector(state => state.navigation.view)

      return (
            <main>
                  <Head>
                        <link
                        rel="stylesheet"
                        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                        crossOrigin=""
                        />
                  </Head>
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