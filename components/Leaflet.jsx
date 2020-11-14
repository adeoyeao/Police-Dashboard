import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const Leaflet = (props) => {
      const [ map, setMap ] = useState(false)

      const { lat, lng, markers } = 
      props.type === "crimes" ? useSelector(state => state.crime.data) :
      props.type === "neighbourhood" ? useSelector(state => state.neighbourhood.data) : 
      props.type === "stopsearch" ? useSelector(state => state.search.data) : false

      const loading = 
      props.type === "crimes" ? useSelector(state => state.crime.loading) :
      props.type === "neighbourhood" ? useSelector(state => state.neighbourhood.loading) :
      props.type === "stopsearch" ? useSelector(state => state.search.loading) : false

      const mapStyle = {
            height: "100%"
      }

      const popOutStyle = {
            textTransform: "capitalize"
      }

      useEffect(() => {
            console.log("refresh map")
      }, [loading])
      
      return (
      !loading && markers ? 
      <MapContainer center={[lat, lng ]} zoom={13} scrollWheelZoom={false} style={mapStyle}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' key={1}/>
            {markers.map((marker, idx) => (
                  <Marker position={[marker.lat ? marker.lat : 0, marker.lng ? marker.lng : 0]} key={idx}>
                  <Popup style={popOutStyle}>
                        {marker.category.replace(/\-/ig," ")}
                  </Popup>
            </Marker>
            ))}
      </MapContainer> :
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} style={mapStyle} key={2}>
                  <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
      </MapContainer> 
      )
}

export default Leaflet