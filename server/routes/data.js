const requestIp = require("request-ip")
const express = require("express")

const router = express.Router()

router.use(requestIp.mw())
router.use(express.json())
router.use(express.urlencoded({ extended: true}))

const ipAddress = async (req) => {
      try {
      const ip =  `84.65.117.7` //req.clientIp
      const url = `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK}`
      const results = await fetch(url)
      const data = await results.json()
      return [data.latitude, data.longitude]
      } catch {
            return [51.505, -0.09]
      }
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

      const markers = data.map(crime => ({category: crime.category, lat: crime.location.latitude, lng: crime.location.longitude }))

      const categories = data.map(crime => crime.category)
      const categoriesSet = new Set(categories)
      const chartData = [...categoriesSet].map(x => [x, data.filter(y => y.category === x).length])

      res.json({ lat: lat, lng: lng, totalCrimes: totalCrimes, pending: pending, sentenced: sentenced, notGuilty: notGuilty, markers: markers, chartData: chartData })
})

router.get("/neighbourhood", async (req, res) => {
      const [lat, lng] = await ipAddress(req)
      const results = await fetch(`https://data.police.uk/api/locate-neighbourhood?q=${lat},${lng}`)
      const {force, neighbourhood} = await results.json()
      const nbhdResults = await fetch(`https://data.police.uk/api/${force}/${neighbourhood}`)
      const nbhdData = await nbhdResults.json()
      const { twitter, facebook, telephone } = await nbhdData.contact_details

      const officerResults = await fetch(`https://data.police.uk/api/forces/${force}/people`)
      const officerData = await officerResults.json()

      const ranks = officerData.map(officer => officer.rank)
      const rankSet = new Set(ranks)
      const chartData = [...rankSet].map(x => [x, officerData.filter(y => y.rank === x).length])

      const markers = [{category: "Police Station HQ", lat: nbhdData.centre.latitude, lng: nbhdData.centre.longitude}]
      
      res.json({ lat: lat, lng: lng, force: force, twitter: twitter, facebook: facebook, phone: telephone, markers: markers, chartData: chartData })
})

router.get("/stopsearch", async (req, res) => {
      const [lat, lng] = await ipAddress(req)
      const results = await fetch(`https://data.police.uk/api/stops-street?lat=${lat}&lng=${lng}`)
      const data = await results.json()

      const total = data.length
      const male = `${Math.round(data.filter(x => x.gender == "Male").length/total * 100)}%`
      const youth = data.filter(x => x.age_range == "18-24" || x.age_rage == "10-17").length
      const vehicles = data.filter(x => x.type == "Vehicle search" || x.type === "Person and Vehicle search").length

      const markers = data.map(crime => ({category: `Object of Search: ${crime.object_of_search}`, lat: crime.location.latitude, lng: crime.location.longitude}))

      const ethnicity = data.map(search => search.self_defined_ethnicity)
      const ethnicSet = new Set(ethnicity)
      const chartData = [...ethnicSet].map(x => [x, data.filter(y => y.self_defined_ethnicity === x).length])

      res.json({ lat: lat, lng: lng, total: total, male: male, youth: youth, vehicles: vehicles, markers: markers, chartData: chartData})
})

module.exports = router