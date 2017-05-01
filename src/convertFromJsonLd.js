import { first, intersection, last } from 'lodash'
import { Design,  ClassNode, PropertyNode } from '../../schesign-js-graph-utils/src/design'
import * as rangeTypes from '../../schesign-js-graph-utils/src/rangeTypes'
import { printDesign } from '../../schesign-js-graph-utils/src/utils'

const labelKeys = [
  'http://www.w3.org/2000/01/rdf-schema#label',
]

const descriptionKeys = [
  "http://www.w3.org/2000/01/rdf-schema#comment"
]

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

const domainKey = 'http://www.w3.org/2000/01/rdf-schema#domain'
const rangeKey = 'http://www.w3.org/2000/01/rdf-schema#range'

const rangeMapping = {
  'http://www.w3.org/2001/XMLSchema#boolean': rangeTypes.boolean(),
  'http://www.w3.org/2000/01/rdf-schema#Literal': rangeTypes.text(),
  'http://www.w3.org/2001/XMLSchema#string': rangeTypes.text(),
  'http://www.w3.org/2001/XMLSchema#float': rangeTypes.float32(),
  'http://www.w3.org/2001/XMLSchema#int': rangeTypes.int(),
  'http://www.w3.org/2001/XMLSchema#dateTime': rangeTypes.dateTime(),
  'http://www.w3.org/2001/XMLSchema#time': rangeTypes.time()
}

const labelProperty = 'http://www.w3.org/2000/01/rdf-schema#label'
const rangeProperty = 'http://www.w3.org/2000/01/rdf-schema#range'
const domainProperty = 'http://www.w3.org/2000/01/rdf-schema#domain'

const goodConsole = message => console.log(`Good: ${message}`)
const warnConsole = message => console.log(`Warn: ${message}`)
const errorConsole = message => console.log(`Error: ${message}`)

export function cleanLabel(id) {
  // let nextLabel = label.replace(/ /g, '');
  let nextLabel = last(id.split('/'))
  if (nextLabel.indexOf('#'> -1)) {
    nextLabel = last(nextLabel.split('#'))
  }
  nextLabel = nextLabel.replace(/-/g, '_')
  return nextLabel
}

export function getFirstValue (node, key) {
  if (!node[key]) {
    warnConsole(`Could not find key ${key} in node ${node['@id']}`)
    return null
  }
  if (node[key].length !== 1) {
    throw new Error(`Expecting length 1 for key ${key} in node ${node['@id']}`)
  }
  return node[key][0]['@value']
}

function _getFirstMatch(node, keys) {
  const warning = () => warnConsole(`Could not find key ${keys} in ${node['@id']}`)
  for (const key of keys) {
    if (node[key]) {
      const item = first(node[key])
      const value = item && item['@value']
      if (!value) {
        warning()
      }
      return value
    }
  }
  warning()
}

export function _getFirstMatch(node, keys) {
  const warning = () => warnConsole(`Could not find key ${keys} in ${node['@id']}`)
  for (const key of keys) {
    if (node[key]) {
      const item = first(node[key])
      const value = item && item['@value']
      if (!value) {
        warning()
      }
      return value
    }
  }
  warning()
}



function getCommonConfig (context, node) {
  return {
    label: _cleanLabel(node['@id']),
    // label: last(node['@id'].split('/')),
    description:  _getFirstMatch(node, descriptionKeys),
  }
}

// function _getRangeMap(rangeMapping) {
//   const rangeMap = {}
//   Object.keys(rangeMapping).forEach(key => {
//     const node = rangeMapping[key]
//     node.forEach(id => {
//       rangeMap[id] = key
//     })
//   })
//   return rangeMap
// }

function _getRange (context, node) {
  // const rangeMap = _getRangeMap(rangeMapping)
  const range = node[rangeKey]
  if (range) {
    const id = first(range)['@id']
    if (context.result.classes[id]) {
      return rangeTypes.linkedClass(context.result.classes[id])
    } else if (rangeMapping[id]) {
      return rangeMapping[id]
    } else {
      warnConsole(`Could not find range mapping for id ${id}`)
    }
  }
  warnConsole(`Could not find range for node ${node['@id']}`)
  return rangeTypes.text()

  // const range = _getFirstMatch(node, rangeKey)
}

function _createProperties (context) {
  Object.keys(context.initial.properties).forEach(key => {
    const node = context.initial.properties[key]
    const config = _getCommonConfig(context, node)
    config.range = _getRange(context, node)
    // config.range = { type: 'Text' }
    const newProperty = new PropertyNode(config)
    const domain = node[domainKey]
    if (domain) {
      domain.forEach(el => {
        const id = el['@id']
        if (id) {
          const classNode = context.result.classes[id]
          if (classNode) {
            classNode.addProperty(newProperty)
          }
        }
      })
    } else {
      context.design.addProperty(newProperty)
      // warnConsole(`Node ${node['@id']} does not have domainKey: ${domainKey}`)
    }

    // if (context.result.properties[config.label]) {
    //   warnConsole(`Property label used multiple times: ${config.label}`)
    // } else {
    //   context.result.properties[config.label] = 
    // }
  })
}

function _createClasses (context) {
  Object.keys(context.initial.classes).forEach(key => {
    const node = context.initial.classes[key]
    const config = _getCommonConfig(context, node)
    context.result.classes[node['@id']] = new ClassNode(config)
    context.design.addClass(context.result.classes[node['@id']])
  })
}

export default function (graph, opts) {
  const design = new Design()
  const context = {
    opts,
    design,
    initial: {
      classes: {},
      properties: {},
    },
    result: {
      classes: {},
      properties: {},
    },
  }

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
      context.initial.classes[id] = node
    } else if (intersection(type, propertyTypes).length) {
      context.initial.properties[id] = node
    } else {
      return warnConsole(`Not class or property with type: ${type} in node: ${id}`)
    }
  })

  _createClasses(context)
  _createProperties(context)

  return design

}