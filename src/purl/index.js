import data from './purl.ld.json'
import { printDesign } from '../../../schesign-js-graph-utils/src/utils'

import convertFromJsonLd from '../convertFromJsonLd'

export default function() {

  const design = convertFromJsonLd(data)

  printDesign(design.toJSON())

}