const requestIp = require("request-ip")
const express = require("express")

const router = express.Router()

router.use(requestIp.mw())
router.use(express.json())
router.use(express.urlencoded({ extended: true}))

const ipAddress = async (req) => {
      const ip =  `84.67.119.214` //req.clientIp
      const url = `https://geo.ipify.org/api/v1?apiKey=${process.env.GEOIPIFY_API_KEY}&ipAddress=${ip}`
      const results = await fetch(url)
      const data = await results.json()
      return [data.location.lat, data.location.lng]
}

router.get("/crimes", async (req, res) => {
      const [lat, lng] = await ipAddress(req)
      const results = await fetch(`https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}`)
      const data = await results.json()

      const totalCrimes = await data.length
      const outcomes = await data.filter(x => x.outcome_status)

      const pending = await outcomes.filter(x => 
            x.outcome_status.category === "Awaiting court outcome" || 
            x.outcome_status.category === "Court result unavailable" ||
            x.outcome_status.category === "Suspect charged as part of another case" ||
            x.outcome_status.category === "Defendant sent to Crown Court" ||
            x.outcome_status.category === "Suspect charged as part of another case" ||
            x.outcome_status.category === "Under investigation" || 
            x.outcome_status.category === "Action to be taken by another organisation").length

      const sentenced = await outcomes.filter(x => 
            x.outcome_status.category === "Offender fined" ||
            x.outcome_status.category === "Offender deprived of property" ||
            x.outcome_status.category === "Offender given a caution" ||
            x.outcome_status.category === "Offender given a drugs possession warning" ||
            x.outcome_status.category === "Offender given a penalty notice" ||
            x.outcome_status.category === "Offender given community sentence" ||
            x.outcome_status.category === "Offender given suspended prison sentence" ||
            x.outcome_status.category === "Offender sent to prison" ||
            x.outcome_status.category === "Offender otherwise dealt with" ||
            x.outcome_status.category === "Offender ordered to pay compensation" ||
            x.outcome_status.category === "Offender sent to prison").length

      const notGuilty = await outcomes.filter(x => 
            x.outcome_status.category === "Investigation complete; no suspect identified" ||
            x.outcome_status.category === "Offender given absolute discharge" ||
            x.outcome_status.category === "Offender given conditional discharge" ||
            x.outcome_status.category === "Defendant found not guilty" ||
            x.outcome_status.category === "Unable to prosecute suspect" ||
            x.outcome_status.category === "Further investigation is not in the public interest" ||
            x.outcome_status.category === "Formal action is not in the public interest").length

      res.json({ message: "Crimes Dashboard", totalCrimes: totalCrimes, pending: pending, sentenced: sentenced, notGuilty: notGuilty, item: data[2050] })
})

router.get("/neighbourhood", async (req, res) => {
      const [lat, lng] = await ipAddress(req)
      const results = await fetch(`https://data.police.uk/api/locate-neighbourhood?q=${lat},${lng}`)
      const {force, neighbourhood} = await results.json()
      const nbhdResults = await fetch(`https://data.police.uk/api/${force}/${neighbourhood}`)
      const nbhdData = await nbhdResults.json()
      const { twitter, facebook, telephone } = await nbhdData.contact_details
      
      res.json({ message: "Neighbourhood Dashboard", force: force, twitter: twitter, facebook: facebook, phone: telephone })
})

router.get("/stopsearch", async (req, res) => {
      const [lat, lng] = await ipAddress(req)
      const results = await fetch(`https://data.police.uk/api/stops-street?lat=${lat}&lng=${lng}`)
      const data = await results.json()

      const total = data.length
      const male = `${Math.round(data.filter(x => x.gender == "Male").length/total * 100)}%`
      const youth = data.filter(x => x.age_range == "18-24" || x.age_rage == "10-17").length
      const vehicles = data.filter(x => x.type == "Vehicle search" || x.type === "Person and Vehicle search").length

      res.json({ message: "Stop and Search Dashboard", total: total, male: male, youth: youth, vehicles: vehicles})
})

module.exports = router