import { Design,  ClassNode, PropertyNode } from '../../../schesign-js-graph-utils/src/design'
import * as rangeTypes from '../../../schesign-js-graph-utils/src/rangeTypes'
import { printDesign } from '../../../schesign-js-graph-utils/src/utils'

export default function () {
  const design = new Design()


  const classes = {
    property: new ClassNode({
      label: 'Property',
      description: 'The class resource, everything.'
    }),
    // class : new ClassNode({
    //   label: 'Class',
    //   description: 'The class of classes',
    // })
  }

  classes.property.inheritsFrom(classes.resource)


  const properties = {
    isDefinedBy: new PropertyNode({
      label: 'isDefinedBy',
      range: rangeTypes.linkedClass(classes.resource)
    }),
    label: new PropertyNode({
      label: 'label',
      range: rangeTypes.text()
    }),
    comment: new PropertyNode({
      label: 'comment',
      range: rangeTypes.text()
    }),
    subClassOf: new PropertyNode({
      label: 'subClassOf',
      description: 'The subject is a class of a class',
      range: rangeTypes.linkedClass(classes.class)
    }),
    domain: new PropertyNode({
      label: 'domain',
      range: rangeTypes.linkedClass(classes.class)
    })
  }


  classes.resource.addProperty(
    properties.isDefinedBy,
    properties.label,
    properties.comment
  )

  classes.class.addProperty(
    properties.isDefinedBy,
    properties.label,
    properties.comment
  )

    // design.push(
    //   new ClassNode({
    //     label: node['rdfs:label'],
    //     description: node['rdfs:comment']
    //   })

    // )

}