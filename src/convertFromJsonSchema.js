import { first } from 'lodash'
import { Design,  ClassNode, PropertyNode } from '../../schesign-js-graph-utils/src/design'
import * as rangeTypes from '../../schesign-js-graph-utils/src/rangeTypes'
import { printDesign } from '../../schesign-js-graph-utils/src/utils'

function addStringRange (schema) {
  return rangeTypes.text()
}

// function addEnumRange (schema) {
//   return rangeTypes.emum(schema.values)
// }

function getRange (schema) {
  if (schema.enum) {
    return rangeTypes.enu(schema.enum)
  }
  switch(schema.type) {
    case 'string': return addStringRange(schema)
    case 'array': return getRange(schema.items)
  }
}

function addNode (context, parent, schema) {
  Object.keys(schema.properties).map(label => {
    if (label[0] === '@') {
      return
    }
    let childSchema = schema.properties[label]
    let propertyNode = context.properties[label]
    if (!propertyNode) {
      if (childSchema.anyOf) {
        const anyOf = childSchema.anyOf.filter(of => of.type !== "null" && of.type !== null)
        childSchema = Object.assign({}, childSchema, first(anyOf))
      }

      const range = getRange(childSchema)

      if (range) {
        propertyNode = new PropertyNode({
          label,
          range,
          description: childSchema.description
        })
      }
    }
    if (propertyNode) {
      const cardinality = childSchema.type === 'array'
        ? {minItems: 0, maxItems: null}
        : {minItems: 0, maxItems: 1}

      parent.addProperty(propertyNode, {cardinality})
    }
  })
}

function addClass (context, label, schema) {
  const classNode = new ClassNode({
    label,
    description: schema.description
  })
  addNode(context, classNode, schema)
  context.design.addClass(classNode)
}

export default function (schema) {
  const design = new Design()
  const context = {
    design,
    classes: {},
    properties: {}
  }


  // function recurseObject (node) {
  //   Object.keys(node.properties).forEach(key => {

  //   })
  // }

  Object.keys(schema.definitions)
    .map(key => addClass(context, key, schema.definitions[key]))


  // const result = design.toJSON()
  // printDesign(result)

  return design
}