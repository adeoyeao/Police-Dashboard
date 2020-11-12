import { VIEW_CRIMES, VIEW_NEIGHBOURHOOD, VIEW_STOPSEARCH } from "./navtypes"

const viewCrimes = () => ({ type: VIEW_CRIMES })
const viewNeighbourhood = () => ({ type: VIEW_NEIGHBOURHOOD })
const viewStopSearch = () => ({ type: VIEW_STOPSEARCH })

export { viewCrimes, viewNeighbourhood, viewStopSearch }

