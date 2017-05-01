import { first, intersection, last, values } from 'lodash'
import colors from 'colors'
import { cleanLabel } from '../convertFromJsonLd'

const labelKey = 'http://www.w3.org/2000/01/rdf-schema#label'
const descriptionKey = 'http://www.w3.org/2000/01/rdf-schema#comment'
const domainKey = 'http://www.w3.org/2000/01/rdf-schema#domain'
const rangeKey = 'http://www.w3.org/2000/01/rdf-schema#range'

const classTypes = [
  'http://www.w3.org/2000/01/rdf-schema#Class',
  'http://www.w3.org/2002/07/owl#Class'
]

const propertyTypes = [
  'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property',
  'http://www.w3.org/2002/07/owl#:DatatypeProperty',
  'http://www.w3.org/2002/07/owl#DatatypeProperty',
  'http://www.w3.org/2002/07/owl#:InverseFunctionalProperty',
  'http://www.w3.org/2002/07/owl#ObjectProperty',
  'http://www.w3.org/2002/07/owl#AnnotationProperty',
]

const goodConsole = message => console.log(`Good: ${message}`)
const warnConsole = message => console.log(colors.blue(`Warn: ${message}`))
const errorConsole = message => console.log(`Error: ${message}`)

export default function (graph) {
  const classes = {}
  const properties = []

  graph.forEach((node, index) => {
    const id = node['@id']
    if (!id) {
      return errorConsole(`Node at index ${index} has no id`)
    } else if (id[0] === '_') {
      return warnConsole(`Node with id ${id} is a blank node`)
    }
    const type = node['@type']
    if (!type) {
      return errorConsole(`Node ${id} has no @type`)
    }
    if (intersection(type, classTypes).length) {
      classes[id] = {
        label: cleanLabel(id),
        properties: []
      }
    } else if (intersection(type, propertyTypes).length) {
      properties.push({
        label: cleanLabel(id),
        ranges: node[rangeKey] && node[rangeKey].map(r => r['@id']),
        domains: node[domainKey] ? node[domainKey].map(r => r['@id']) : []
      })
    } else {
      return warnConsole(`Not a Class or Property with type: ${type} in node: ${id}`)
    }
  })

  properties.forEach(property => {
    property.domains.forEach(domain => {
      if (classes[domain]) {
        classes[domain].properties.push(property)
      }
    })
  })

  function printProperty (property) {
    let propertyLabel = '  ' + property.label + ' ';
    propertyLabel += colors.cyan(property.ranges.map(r => cleanLabel(r)).join(','))
    // property.ranges.forEach(range => {
    //   propertyLabel += range + ' '
    // })
    console.log(propertyLabel)
  }

  console.log('\n' + colors.bold('------ Classes ------'));
  values(classes).forEach(classNode => {
    let classLabel = colors.bold(classNode.label);
    if (classNode.subClassOf) {
      classLabel += ' inhertis from ' + colors.magenta(classNode.subClassOf);
    }
    console.log(classLabel);
    classNode.properties.forEach(p => printProperty(p))
  })
}