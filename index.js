import { printDesign } from 'schesign-js-graph-utils'
import fhir from './src/fhir'


const fhirDesign = fhir()


printDesign(fhirDesign)
console.log(JSON.stringify(fhirDesign, null, 2))
