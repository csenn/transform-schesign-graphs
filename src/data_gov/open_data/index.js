import { values, isArray, compact, first, last } from 'lodash'

import data from './combined.schema.json'
// import { Design,  ClassNode, PropertyNode } from '../../../schesign-js-graph-utils/src/design'
// import * as rangeTypes from '../../../schesign-js-graph-utils/src/rangeTypes'
import { printDesign } from '../../../../schesign-js-graph-utils/src/utils'

import convertFromJsonSchema from '../../convertFromJsonSchema'

export default function() {

  const design = convertFromJsonSchema(data)

  printDesign(design.toJSON())


  // const design = new Design()

  // const classes = {
  //   a: new ClassNode({
  //     label: 'Catalog'
  //   }),
  //   b: new ClassNode({
  //     label: 'Dataset'
  //   }),
  //   c: new ClassNode({
  //     label: 'Distribution'
  //   })
  // }

  // const properties  = {
  //   accessLevel: {},
  //   accessURL: {},
  //   accrualPeriodicity: {},
  //   bureauCode: {},
  //   conformsTo: {},
  //   contactPoint: {},
  //   dataset: {},
  //   downloadUrl: {},
  //   dataset: {},
  //   dataQuality: {},
  //   describedBy: {},
  //   describedByType: {},
  //   description: {},
  //   distribution: {},
  //   fn: {},
  //   hasEmail: {},
  //   identifier: {},
  //   format: {},
  //   isPartOf: {},
  //   issued: {},
  //   keyword: {},
  //   landingPage: {},
  //   language: {},
  //   liscense: {},
  //   mediaType: {},
  //   modified: {},
  //   name: {},
  //   primaryITInvestmentUII: {},
  //   programCode: {},
  //   publisher: {},
  //   rights: {},
  //   spatial: {},
  //   subOrganizationOf: {},
  //   systemOfRecords: {},
  //   temportal: {},
  //   theme: {},
  //   title: {}
  // }

  // const properties = {
  //   a: new PropertyNode({
  //     label: 'accessLevel'
  //   }),
  //   b: new PropertyNode({
  //     label: 'accessURL'
  //   }),
  //   c: new PropertyNode({
  //     label: 'accrualPeriodicity'
  //   }),
  //   d: new PropertyNode({
  //     label: 'bureauCode'
  //   }),
  //   e: new PropertyNode({
  //     label: 'bureauCode'
  //   }),
  //   f: new PropertyNode({
  //     label: 'conformsTo'
  //   })
  //   g: new PropertyNode({
  //     label: 'describedBy'
  //   }),
  //   h: new PropertyNode({
  //     label: 'dataset'
  //   }),
  //   i: new PropertyNode({
  //     label: 'contactPoint'
  //   })
  // }
}