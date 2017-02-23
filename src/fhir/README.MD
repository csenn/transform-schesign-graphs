### Issues
  * Multiple types per property. Use record parts and references
  * Different nestedObjects with the same name have different propertyRefs. Solution: combine all propertyRefs into single nestedObject


### TODO
  * Did not do cardinality yet, should be easy though

#### Node types and counts
```
{
  Element: 38,
  id: 368,
  Extension: 648,
  dateTime: 93,
  uri: 160,
  string: 320,
  code: 300,
  boolean: 82,
  Quantity: 65,
  decimal: 37,
  base64Binary: 7,
  unsignedInt: 12,
  Reference: 356,
  positiveInt: 29,
  Coding: 108, /* Looks like a vocab, where binding.valueSetReference.reference */
  CodeableConcept: 256,
  Period: 38,
  instant: 19,
  markdown: 4,
  integer: 14,
  xhtml: 1,
  Resource: 98,
  Meta: 96,
  BackboneElement: 217,
  Narrative: 93,
  DomainResource: 91,
  Identifier: 100,
  date: 17,
  Annotation: 12,
  Timing: 12,
  ContactPoint: 23,
  Address: 8,
  HumanName: 6,
  Range: 3,
  Ratio: 9,
  Attachment: 15,
  time: 2,
  Signature: 2,
  oid: 9,
  ElementDefinition: 3
}

```