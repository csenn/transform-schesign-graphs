import { last, isArray } from 'lodash'
import data from './dataelement.json'
import { Design, ClassNode, PropertyNode, rangeTypes } from '../../../schesign-js-graph-utils/src'

const unknown = {}
const hasMultipleTypes = {}

const definition = {
  properties: {},
  classes: {}
}

const result = {
  properties: {},
  classes: {}
}

function getCode (type) {
  return type && type.code
}

function structureIdentifier (url) {
  if (!url) return
  return url.replace('http://hl7.org/fhir/StructureDefinition/', '')
}

function getRange (type) {
  const code = getCode(type)
  switch (code) {
    case 'BackboneElement':
      return rangeTypes.nestedObject()
    case 'string':
    case 'id':
    case 'Identifier':
    case 'CodeableConcept':
    case 'Coding':
    case 'code':
      return rangeTypes.text()
    case 'uri':
      return rangeTypes.url()
    case 'date':
      return rangeTypes.shortDate()
    case 'integer':
    case 'Quantity':
      return rangeTypes.int()
    case 'unsignedInt':
    case 'positiveInt':
      return rangeTypes.int64()
    case 'time':
      return rangeTypes.time()
    case 'dateTime':
      return rangeTypes.dateTime()
    case 'boolean':
      return rangeTypes.boolean()
    case 'decimal':
    case 'Ratio':
      return rangeTypes.float32()
    case 'Reference':
      const id = structureIdentifier(type.profile[0])
      return rangeTypes.linkedClass(id)
    default:
      if (!unknown[code]) {
        unknown[code] = 1
      } else {
        unknown[code] += 1
      }
      return rangeTypes.text()
  }
}

function getIdentifier (item) {
  return item.fullUrl.replace('http://hl7.org/fhir/DataElement/', '')
}

function getTypes (item) {
  const types = item.resource.element
    && item.resource.element[0]
    && item.resource.element[0].type
  return isArray(types)
    ? types
    : [{ code: 'string' }]
}

export default function generate() {

  const design = new Design()

  /* Find and create properties with multiple types */
  data.entry.forEach(item => {
    const identifier = getIdentifier(item)
    const identifierSplit = identifier.split('.')
    const types = getTypes(item)

    if (types.length > 1) {
      hasMultipleTypes[last(identifierSplit)] = true
    }
  })

  /* Find classes */
  data.entry.forEach(item => {
    const identifier = getIdentifier(item)
    const identifierSplit = identifier.split('.')
    const types = getTypes(item)

    /* Classes point to Resource so we will include that as well */
    if (getCode(types[0]) === 'DomainResource' || identifier === 'Resource') {
      definition.classes[identifier] = {
        _item: item,
        propertyRefs: []
      }
    }
  })

  function addProperties (node) {
    const nodeIdentifier = getIdentifier(node._item)
    const nodeIdentifierSplit = nodeIdentifier.split('.')

    data.entry.forEach(item => {
      const identifier = getIdentifier(item)
      const identifierSplit = identifier.split('.')
      const types = getTypes(item)

      if (nodeIdentifierSplit.length !== identifierSplit.length - 1) {
        return
      }

      for (let i=0; i<nodeIdentifierSplit.length; i++) {
        if (nodeIdentifierSplit[i] !== identifierSplit[i]) {
          return
        }
      }

      let label = last(identifierSplit)
      if (label === 'subtype') {
        label = 'subType'
      }

      if (definition.classes[label]) {

      }
      else if (hasMultipleTypes[label]) {
        if (!definition.properties[label]) {
          definition.properties[label] = {
            _item: item,
            hasMultipleTypes: true,
            propertyRefs: []
          }
        }

        types.forEach(type => {
          const name =  structureIdentifier(type.profile && type.profile[0])
          if (type.code === 'Reference' && name && !result.properties[name]) {
            const lower = name[0].toLowerCase() + name.substring(1)
            const exists = definition.properties[label].propertyRefs
              .find(ref => ref.ref === lower)

            if (!exists) {
              definition.properties[label].propertyRefs.push({ ref: lower })
            }

            /* Created fake linked class properties here */
            if (!result.properties[lower]) {
              result.properties[lower] = new PropertyNode({
                label: lower,
                range: rangeTypes.linkedClass(name)
              })
            }
          }
        })
      } else if (getCode(types[0]) === 'BackboneElement') {
        if (!definition.properties[label]) {
          definition.properties[label] = {
            _item: item,
            propertyRefs: []
          }
        }
        addProperties(definition.properties[label])
      } else if (!definition.properties[label]) {
        definition.properties[label] = {
          _item: item
        }
      }

      const exists = node.propertyRefs.find(ref => ref.ref === label)
      if (!exists) {
        node.propertyRefs.push({ ref: label  })
      }

    })
  }

  Object.keys(definition.classes)
    .forEach(key => addProperties(definition.classes[key]))

  /* Convert all properties */
  Object.keys(definition.properties).forEach(key => {

    const property = definition.properties[key]
    const oldTypes = getTypes(property._item)

    let range
    const upper = key[0].toUpperCase() + key.substring(1)

    if (definition.classes[upper]) {
      range = rangeTypes.linkedClass(upper)
    } else if (property.hasMultipleTypes) {
      range = rangeTypes.nestedObject()
    } else {
      range = getRange(oldTypes[0])
    }

    result.properties[key] = new PropertyNode({
      label: key,
      range:range
    })
  })

  /* Fill in nested object property refs */
  Object.keys(result.properties).forEach(key => {
    const newProperty = result.properties[key]
    if (newProperty.range.type === 'NestedObject') {
      const oldProperty = definition.properties[newProperty.label]
      oldProperty.propertyRefs.forEach(propertyRef => {
        const refProperty = result.properties[propertyRef.ref]
        newProperty.addProperty(refProperty)
      })
    }
  })

  /* Create and fill in class property refs */
  Object.keys(definition.classes).forEach(key => {
    const oldClass = definition.classes[key]
    const newClass = new ClassNode({label: key})
    oldClass.propertyRefs.forEach(oldRef => {
      const newProperty = result.properties[oldRef.ref]
      newClass.addProperty(newProperty)
    })
    design.addClass(newClass)
  })

  // console.log(unknown)
  return design.toJSON()
}