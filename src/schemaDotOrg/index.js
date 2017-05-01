import { values, isArray, compact, first, last } from 'lodash'
import data from './schemaDotOrg.json'
import { Design,  ClassNode, PropertyNode } from '../../../schesign-js-graph-utils/src/design'
import * as rangeTypes from '../../../schesign-js-graph-utils/src/rangeTypes'
import { printDesign } from '../../../schesign-js-graph-utils/src/utils'

const arrayify = element => {
  if (!element) return []
  const arr = isArray(element) ? element : [element]
  return compact(arr)
}

const printRanges = {}

const ignoreClassNodes = [
  // 'http://schema.org/Thing',
  'http://schema.org/DataType',
  'http://schema.org/Float',
  'http://schema.org/Integer',
  'http://schema.org/URL',
  'http://schema.org/Text',
  'http://schema.org/text'
]

export default function () {
  const design = new Design()
  const classes = {}
  const properties = {}

  const graph = data['@graph'].filter(node => {
    return !ignoreClassNodes.includes(node['@id'])
  })

  /* Add initial classes */
  graph.forEach(node => {
    if (node['@type'] === 'rdfs:Class') {
      const classNode = new ClassNode({
        label: node['rdfs:label'],
        description: node['rdfs:comment']
      })
      classes[node['@id']] = classNode
      design.addClass(classNode)
    }
  })

  /* Add subclass of */
  graph.forEach(node => {
    if (node['@type'] === 'rdfs:Class') {
      let subclassOf = arrayify(node['rdfs:subClassOf'])
      // subclassOf = subclassOf.filter(node => node['@id'] !== 'http://schema.org/Thing')
      if (subclassOf.length > 1) {
        console.log(`${node['@id']} is missing ${subclassOf.length - 1} subclasses`)
      }
      const subClassId = first(subclassOf) && first(subclassOf)['@id']
      if (subClassId) {
        classes[node['@id']].inheritsFrom(classes[subClassId])
      }
    }
  })

  const makeRange = rangeId => {
    printRanges[rangeId] = true

    switch (rangeId) {
      case 'http://schema.org/Boolean':
        return rangeTypes.boolean()
      case 'http://schema.org/Float':
        return rangeTypes.float32()
      case 'http://schema.org/Number':
        return rangeTypes.number()
      case 'http://schema.org/Integer':
        return rangeTypes.int()
      case 'http://schema.org/URL':
        return rangeTypes.url()
      case 'http://schema.org/DateTime':
        return rangeTypes.dateTime()
      case 'http://schema.org/Date':
        return rangeTypes.shortDate()
    }

    if (classes[rangeId]) {
      return rangeTypes.linkedClass(classes[rangeId])
    }

    return rangeTypes.text()

  }

  /* Make properties */
  graph.forEach(node => {
    if (node['@type'] === 'rdf:Property') {
      let ranges = arrayify(node['http://schema.org/rangeIncludes']).map(range => range['@id'])
      if (ranges.length > 1) {
        ranges = ranges.filter(range => !ignoreClassNodes.includes(range))
      }

      let nextNode
      if (ranges.length > 1) {
        nextNode = new PropertyNode({
          label: node['rdfs:label'],
          description: node['rdfs:comment'],
          range: rangeTypes.nestedObject()
        })

        ranges.forEach(rangeId => {
          const splitLabel = last(rangeId.split('/'))
          let generatedLabel = splitLabel.charAt(0).toLowerCase() + splitLabel.slice(1)

          const existing = graph.find(n => n['@id'] === `http://schema.org/${generatedLabel}`)
          /* brand property is a nestedObject, when usually it is a linkedCLass */
          if (existing) {
            generatedLabel = `_${generatedLabel}`
          }

          let generatedProperty
          const found = properties[generatedLabel] || properties[`http://schema.org/${generatedLabel}`]
          if (found && found.range.type) {
            generatedProperty = found
          }  else {
            generatedProperty = new PropertyNode({
              label: generatedLabel,
              range:  makeRange(rangeId)
            })
            properties[generatedLabel] = generatedProperty
          }
          nextNode.addProperty(generatedProperty)
        })
      } else {
        nextNode = new PropertyNode({
          label: node['rdfs:label'],
          description: node['rdfs:comment'],
          range: makeRange(ranges[0])
        })
      }

      properties[node['@id']] = nextNode

      // const propertyNode = new PropertyNode({
      //   label: node['rdfs:label'],
      //   description: node['rdfs:comment'],
      //   range: rangeTypes.text()
      // })
      // properties[node['@id']] = propertyNode

      const domain = arrayify(node['http://schema.org/domainIncludes'])
      domain.forEach(item => {
        const id = item['@id']
        if (classes[id]) {
          classes[id].addProperty(nextNode)
        } else {
          console.log(`Could not find domain of class: ${id}`)
        }
      })
    }
  })

  const result = design.toJSON()
  // console.log(JSON.stringify(design, null, 2))
  printDesign(result)
  // console.log(printRanges)
  return result
}
