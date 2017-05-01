import { values } from 'lodash'
import { Design,  ClassNode, PropertyNode } from '../../../../schesign-js-graph-utils/src/design'
import { printDesign } from '../../../../schesign-js-graph-utils/src/utils'
import * as rangeTypes from '../../../../schesign-js-graph-utils/src/rangeTypes'
import data from './goodrelations.ld.json'
import basicPrint from '../../printing/basicPrint'

import convertFromJsonLd, {cleanLabel, getFirstValue} from '../../convertFromJsonLd'

const getBasicConfig = (id, label) => {
  const node = data.find(node => node['@id'] === id)
  if (!node) {
    throw new Error(`Could not find node with id: ${id}`)
  }
  return {
    label: label || cleanLabel(id),
    description: getFirstValue(node, 'http://www.w3.org/2000/01/rdf-schema#comment')
  }
}

export default function() {

  // basicPrint(data)

  const design = new Design()
  // const design = convertFromJsonLd(data)

  const prefix = 'http://purl.org/goodrelations/v1#'

  const classes = {
    Brand: new ClassNode(getBasicConfig(`${prefix}Brand`)),
    BusinessEntity:  new ClassNode(getBasicConfig(`${prefix}BusinessEntity`)),
    BusinessEntityType:  new ClassNode(getBasicConfig(`${prefix}BusinessEntityType`)),
    BusinessFunction:  new ClassNode(getBasicConfig(`${prefix}BusinessFunction`)),
    DeliveryChargeSpecification: new ClassNode(getBasicConfig(`${prefix}DeliveryChargeSpecification`)),
    DeliveryMethod:  new ClassNode(getBasicConfig(`${prefix}DeliveryMethod`)),
    Individual: new ClassNode(getBasicConfig(`${prefix}Individual`)),
    License:  new ClassNode(getBasicConfig(`${prefix}License`)),
    Location:  new ClassNode(getBasicConfig(`${prefix}Location`)),
    Offering:  new ClassNode(getBasicConfig(`${prefix}Offering`)),
    OpeningHoursSpecification:  new ClassNode(getBasicConfig(`${prefix}OpeningHoursSpecification`)),
    PaymentChargeSpecification: new ClassNode(getBasicConfig(`${prefix}PaymentChargeSpecification`)),
    PaymentMethod: new ClassNode(getBasicConfig(`${prefix}PaymentMethod`)),
    PriceSpecification:  new ClassNode(getBasicConfig(`${prefix}PriceSpecification`)),
    ProductOrService: new ClassNode(getBasicConfig(`${prefix}ProductOrService`)),
    ProductOrServiceModel: new ClassNode(getBasicConfig(`${prefix}ProductOrServiceModel`)),
    QualitativeValue: new ClassNode(getBasicConfig(`${prefix}QualitativeValue`)),
    QuantitativeValue: new ClassNode(getBasicConfig(`${prefix}QuantitativeValue`)),
    QuantitativeValueFloat: new ClassNode(getBasicConfig(`${prefix}QuantitativeValueFloat`)),
    QuantitativeValueInteger: new ClassNode(getBasicConfig(`${prefix}QuantitativeValueInteger`)),
    TypeAndQuantityNode: new ClassNode(getBasicConfig(`${prefix}TypeAndQuantityNode`)),
    UnitPriceSpecification: new ClassNode(getBasicConfig(`${prefix}UnitPriceSpecification`)),
    WarrantyPromise: new ClassNode(getBasicConfig(`${prefix}WarrantyPromise`)),
    WarrantyScope: new ClassNode(getBasicConfig(`${prefix}WarrantyScope`)),
  }

  const properties = {
    acceptedPaymentMethods: new PropertyNode(Object.assign(getBasicConfig(`${prefix}acceptedPaymentMethods`), {
      range: rangeTypes.linkedClass(classes.PaymentMethod)
    })),
    addOn: new PropertyNode(Object.assign(getBasicConfig(`${prefix}addOn`), {
      range: rangeTypes.linkedClass(classes.Offering)
    })),
    advanceBookingRequirement: new PropertyNode(Object.assign(getBasicConfig(`${prefix}advanceBookingRequirement`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValueInteger)
    })),
    amountOfThisGood: new PropertyNode(Object.assign(getBasicConfig(`${prefix}amountOfThisGood`), {
      range: rangeTypes.number()
    })),
    appliesToDeliveryMethod: new PropertyNode(Object.assign(getBasicConfig(`${prefix}appliesToDeliveryMethod`), {
      range: rangeTypes.linkedClass(classes.DeliveryMethod)
    })),
    appliesToPaymentMethod: new PropertyNode(Object.assign(getBasicConfig(`${prefix}appliesToPaymentMethod`), {
      range: rangeTypes.linkedClass(classes.PaymentMethod)
    })),
    availableAtOrFrom: new PropertyNode(Object.assign(getBasicConfig(`${prefix}availableAtOrFrom`), {
      range: rangeTypes.linkedClass(classes.Location)
    })),
    availableDeliveryMethods: new PropertyNode(Object.assign(getBasicConfig(`${prefix}availableDeliveryMethods`), {
      range: rangeTypes.linkedClass(classes.DeliveryMethod)
    })),
    availabilityEnds: new PropertyNode(Object.assign(getBasicConfig(`${prefix}availabilityEnds`), {
      range: rangeTypes.dateTime()
    })),
    availabilityStarts: new PropertyNode(Object.assign(getBasicConfig(`${prefix}availabilityStarts`), {
      range: rangeTypes.dateTime()
    })),
    billingIncrement: new PropertyNode(Object.assign(getBasicConfig(`${prefix}billingIncrement`), {
      range: rangeTypes.number()
    })),
    category: new PropertyNode(Object.assign(getBasicConfig(`${prefix}category`), {
      range: rangeTypes.text()
    })),
    closes: new PropertyNode(Object.assign(getBasicConfig(`${prefix}closes`), {
      range: rangeTypes.time()
    })),
    color: new PropertyNode(Object.assign(getBasicConfig(`${prefix}color`), {
      range: rangeTypes.text()
    })),
    condition: new PropertyNode(Object.assign(getBasicConfig(`${prefix}condition`), {
      range: rangeTypes.text()
    })),
    // dayOfWeek: new PropertyNode(Object.assign(getBasicConfig(`${prefix}dayOfWeek`), {
    //   range: rangeTypes.enu(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    // })),
    datatypeProductOrServiceProperty: new PropertyNode(Object.assign(getBasicConfig(`${prefix}datatypeProductOrServiceProperty`), {
      range: rangeTypes.text()
    })),
    deliveryLeadTime:  new PropertyNode(Object.assign(getBasicConfig(`${prefix}deliveryLeadTime`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValueInteger)
    })),
    depth: new PropertyNode(Object.assign(getBasicConfig(`${prefix}depth`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
    description: new PropertyNode(Object.assign(getBasicConfig(`${prefix}description`), {
      range: rangeTypes.text()
    })),
    durationOfWarrantyInMonths: new PropertyNode(Object.assign(getBasicConfig(`${prefix}durationOfWarrantyInMonths`), {
      range: rangeTypes.int()
    })),
    eligibleCustomerTypes: new PropertyNode(Object.assign(getBasicConfig(`${prefix}eligibleCustomerTypes`), {
      range: rangeTypes.linkedClass(classes.BusinessEntityType)
    })),
    eligibleDuration:  new PropertyNode(Object.assign(getBasicConfig(`${prefix}eligibleDuration`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
    eligibleRegions:   new PropertyNode(Object.assign(getBasicConfig(`${prefix}eligibleRegions`), {
      range: rangeTypes.text()
    })),
    eligibleTransactionVolume: new PropertyNode(Object.assign(getBasicConfig(`${prefix}eligibleTransactionVolume`), {
      range: rangeTypes.linkedClass(classes.PriceSpecification)
    })),
    equal: new PropertyNode(Object.assign(getBasicConfig(`${prefix}equal`), {
      range: rangeTypes.linkedClass(classes.QualitativeValue)
    })),
    greater: new PropertyNode(Object.assign(getBasicConfig(`${prefix}greater`), {
      range: rangeTypes.linkedClass(classes.QualitativeValue)
    })),
    greaterOrEqual:  new PropertyNode(Object.assign(getBasicConfig(`${prefix}greaterOrEqual`), {
      range: rangeTypes.linkedClass(classes.QualitativeValue)
    })),
    hasBrand: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasBrand`), {
      range: rangeTypes.linkedClass(classes.Brand)
    })),
    hasBusinessFunction: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasBusinessFunction`), {
      range: rangeTypes.linkedClass(classes.BusinessFunction)
    })),
    hasCurrency: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasCurrency`), {
      range: rangeTypes.text()
    })),
    hasCurrencyValue: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasCurrencyValue`), {
      range: rangeTypes.number()
    })),
    hasDUNS: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasDUNS`), {
      range: rangeTypes.text()
    })),
    hasEligibleQuantity: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasEligibleQuantity`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
    hasEAN_UCC_13: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasEAN_UCC-13`), {
      range: rangeTypes.text()
    })),
    hasGTIN_14: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasGTIN-14`), {
      range: rangeTypes.text()
    })),
    hasGTIN_8: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasGTIN-8`), {
      range: rangeTypes.text()
    })),
    hasGlobalLocationNumber: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasGlobalLocationNumber`), {
      range: rangeTypes.text()
    })),
    hasInventoryLevel: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasInventoryLevel`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValueFloat)
    })),
    hasISICv4: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasISICv4`), {
      range: rangeTypes.int()
    })),
    hasMakeAndModel: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMakeAndModel`), {
      range: rangeTypes.linkedClass(classes.ProductOrServiceModel)
    })),
    hasMaxCurrencyValue: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMaxCurrencyValue`), {
      range: rangeTypes.number()
    })),
    hasMaxValue:new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMaxValue`), {
      range: rangeTypes.number()
    })),
    hasMaxValueFloat:new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMaxValueFloat`), {
      range: rangeTypes.number()
    })),
    hasMaxValueInteger:new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMaxValueInteger`), {
      range: rangeTypes.int()
    })),
    hasMinValue:new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMinValue`), {
      range: rangeTypes.number()
    })),
    hasMinValueFloat:new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMinValueFloat`), {
      range: rangeTypes.number()
    })),
    hasMinValueInteger:new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMinValueInteger`), {
      range: rangeTypes.int()
    })),
    hasMinCurrencyValue: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMinCurrencyValue`), {
      range: rangeTypes.text()
    })),
    hasMPN: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasMPN`), {
      range: rangeTypes.text()
    })),
    hasOpeningHoursSpecification: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasOpeningHoursSpecification`), {
      range: rangeTypes.linkedClass(classes.OpeningHoursSpecification)
    })),
    hasStockKeepingUnit: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasStockKeepingUnit`), {
      range: rangeTypes.text()
    })),
    hasManufacturer: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasManufacturer`), {
      range: rangeTypes.linkedClass(classes.BusinessEntity)
    })),
    hasNAICS: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasNAICS`), {
      range: rangeTypes.int()
    })),
    hasPOS: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasPOS`), {
      range: rangeTypes.linkedClass(classes.Location)
    })),
    hasPriceSpecification: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasPriceSpecification`), {
      range: rangeTypes.linkedClass(classes.PriceSpecification)
    })),
    hasUnitOfMeasurement: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasUnitOfMeasurement`), {
      range: rangeTypes.text()
    })),
    hasValue: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasValue`), {
      range: rangeTypes.number()
    })),
    hasValueFloat: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasValueFloat`), {
      range: rangeTypes.number()
    })),
    hasValueInteger: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasValueInteger`), {
      range: rangeTypes.int()
    })),
    hasWarrantyPromise: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasWarrantyPromise`), {
      range: rangeTypes.linkedClass(classes.WarrantyPromise)
    })),
    hasWarrantyScope: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasWarrantyScope`), {
      range: rangeTypes.linkedClass(classes.WarrantyScope)
    })),
    hasOpeningHoursDayOfWeek: new PropertyNode(Object.assign(getBasicConfig(`${prefix}hasOpeningHoursDayOfWeek`), {
      // range: rangeTypes.linkedClass()
      range: rangeTypes.text()
    })),
    height: new PropertyNode(Object.assign(getBasicConfig(`${prefix}height`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
    isAccessoryOrSparePartFor: new PropertyNode(Object.assign(getBasicConfig(`${prefix}isAccessoryOrSparePartFor`), {
      range: rangeTypes.linkedClass(classes.ProductOrService)
    })),
    isConsumableFor: new PropertyNode(Object.assign(getBasicConfig(`${prefix}isConsumableFor`), {
      range: rangeTypes.linkedClass(classes.ProductOrService)
    })),
    includes: new PropertyNode(Object.assign(getBasicConfig(`${prefix}includes`), {
      range: rangeTypes.linkedClass(classes.ProductOrService)
    })),
    includesObject: new PropertyNode(Object.assign(getBasicConfig(`${prefix}includesObject`), {
      range: rangeTypes.linkedClass(classes.TypeAndQuantityNode)
    })),
    isSimilarTo: new PropertyNode(Object.assign(getBasicConfig(`${prefix}isSimilarTo`), {
      range: rangeTypes.linkedClass(classes.ProductOrService)
    })),
    isVariantOf: new PropertyNode(Object.assign(getBasicConfig(`${prefix}isVariantOf`), {
      range: rangeTypes.linkedClass(classes.ProductOrServiceModel)
    })),
    legalName: new PropertyNode(Object.assign(getBasicConfig(`${prefix}legalName`), {
      range: rangeTypes.text()
    })),
    lesser: new PropertyNode(Object.assign(getBasicConfig(`${prefix}lesser`), {
      range: rangeTypes.linkedClass(classes.QualitativeValue)
    })),
    lesserOrEqual: new PropertyNode(Object.assign(getBasicConfig(`${prefix}lesserOrEqual`), {
      range: rangeTypes.linkedClass(classes.QualitativeValue)
    })),
    name: new PropertyNode(Object.assign(getBasicConfig(`${prefix}name`), {
      range: rangeTypes.text()
    })),
    nonEqual: new PropertyNode(Object.assign(getBasicConfig(`${prefix}nonEqual`), {
      range: rangeTypes.linkedClass(classes.QualitativeValue)
    })),
    offers: new PropertyNode(Object.assign(getBasicConfig(`${prefix}offers`), {
      range: rangeTypes.linkedClass(classes.Offering)
    })),
    opens: new PropertyNode(Object.assign(getBasicConfig(`${prefix}opens`), {
      range: rangeTypes.time()
    })),
    owns: new PropertyNode(Object.assign(getBasicConfig(`${prefix}owns`), {
      range: rangeTypes.linkedClass(classes.Individual)
    })),
    // paymentMethod: new PropertyNode(Object.assign(getBasicConfig(`${prefix}PaymentMethod`, 'paymentMethod'), {
    //   range: rangeTypes.enu(['ByBankTransferInAdvance', 'ByInvoice', 'Cash', 'CheckInAdvance', 'COD', 'DirectDebit', 'GoogleCheckout', 'PayPal', 'Swarm'])
    // })),
    // paymentMethodCreditCard: new PropertyNode(Object.assign(getBasicConfig(`${prefix}PaymentMethodCreditCard`, 'paymentMethodCreditCard'), {
    //   range: rangeTypes.enu(['AmericanExpress', 'DinersClub', 'Discover', 'JCB', 'MasterCard', 'VISA'])
    // })),
    priceType: new PropertyNode(Object.assign(getBasicConfig(`${prefix}priceType`), {
      range: rangeTypes.text()
    })),
    predecessorOf: new PropertyNode(Object.assign(getBasicConfig(`${prefix}predecessorOf`), {
      range: rangeTypes.linkedClass(classes.ProductOrServiceModel)
    })),
    qualitativeProductOrServiceProperty: new PropertyNode(Object.assign(getBasicConfig(`${prefix}qualitativeProductOrServiceProperty`), {
      range: rangeTypes.linkedClass(classes.QualitativeValue)
    })),
    quantitativeProductOrServiceProperty: new PropertyNode(Object.assign(getBasicConfig(`${prefix}quantitativeProductOrServiceProperty`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
    seeks: new PropertyNode(Object.assign(getBasicConfig(`${prefix}seeks`), {
      range: rangeTypes.linkedClass(classes.Offering)
    })),
    successorOf: new PropertyNode(Object.assign(getBasicConfig(`${prefix}successorOf`), {
      range: rangeTypes.linkedClass(classes.ProductOrServiceModel)
    })),
    serialNumber: new PropertyNode(Object.assign(getBasicConfig(`${prefix}taxID`), {
      range: rangeTypes.text()
    })),
    taxID: new PropertyNode(Object.assign(getBasicConfig(`${prefix}taxID`), {
      range: rangeTypes.text()
    })),
    typeOfGood:new PropertyNode(Object.assign(getBasicConfig(`${prefix}typeOfGood`), {
      range: rangeTypes.linkedClass(classes.Individual)
    })),
    vatID: new PropertyNode(Object.assign(getBasicConfig(`${prefix}vatID`), {
      range: rangeTypes.text()
    })),
    validFrom: new PropertyNode(Object.assign(getBasicConfig(`${prefix}validFrom`), {
      range: rangeTypes.dateTime()
    })),
    validThrough: new PropertyNode(Object.assign(getBasicConfig(`${prefix}validThrough`), {
      range: rangeTypes.dateTime()
    })),
    valueAddedTaxIncluded: new PropertyNode(Object.assign(getBasicConfig(`${prefix}valueAddedTaxIncluded`), {
      range: rangeTypes.boolean()
    })),
    valueReference : new PropertyNode(Object.assign(getBasicConfig(`${prefix}valueReference`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
    weight: new PropertyNode(Object.assign(getBasicConfig(`${prefix}weight`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
    width: new PropertyNode(Object.assign(getBasicConfig(`${prefix}width`), {
      range: rangeTypes.linkedClass(classes.QuantitativeValue)
    })),
  }

  /* Add Properties to classes */
  classes.Brand.addProperty(properties.description)
  classes.Brand.addProperty(properties.name)

  classes.BusinessEntity.addProperty(properties.name)
  classes.BusinessEntity.addProperty(properties.category)
  classes.BusinessEntity.addProperty(properties.description)
  classes.BusinessEntity.addProperty(properties.hasBrand)
  classes.BusinessEntity.addProperty(properties.hasDUNS)
  classes.BusinessEntity.addProperty(properties.hasGlobalLocationNumber)
  classes.BusinessEntity.addProperty(properties.hasISICv4)
  classes.BusinessEntity.addProperty(properties.hasNAICS)
  classes.BusinessEntity.addProperty(properties.hasPOS)
  classes.BusinessEntity.addProperty(properties.legalName)
  classes.BusinessEntity.addProperty(properties.offers)
  classes.BusinessEntity.addProperty(properties.owns)
  classes.BusinessEntity.addProperty(properties.seeks)
  classes.BusinessEntity.addProperty(properties.taxID)
  classes.BusinessEntity.addProperty(properties.vatID)

  classes.BusinessEntityType.addProperty(properties.name)
  classes.BusinessEntityType.addProperty(properties.description)

  classes.BusinessFunction.addProperty(properties.name)
  classes.BusinessFunction.addProperty(properties.description)

  classes.DeliveryChargeSpecification.addProperty(properties.appliesToDeliveryMethod)

  classes.DeliveryMethod.addProperty(properties.name)
  classes.DeliveryMethod.addProperty(properties.description)

  classes.Individual.addProperty(properties.hasMakeAndModel)
  classes.Individual.addProperty(properties.serialNumber)

  classes.License.addProperty(properties.name)
  classes.License.addProperty(properties.description)
  classes.License.addProperty(properties.eligibleDuration)
  classes.License.addProperty(properties.eligibleRegions)
  classes.License.addProperty(properties.validFrom)
  classes.License.addProperty(properties.validThrough)

  classes.Location.addProperty(properties.name)
  classes.Location.addProperty(properties.category)
  classes.Location.addProperty(properties.description)
  classes.Location.addProperty(properties.hasGlobalLocationNumber)
  classes.Location.addProperty(properties.hasISICv4)
  classes.Location.addProperty(properties.hasOpeningHoursSpecification)

  classes.Offering.addProperty(properties.acceptedPaymentMethods)
  classes.Offering.addProperty(properties.addOn)
  classes.Offering.addProperty(properties.advanceBookingRequirement)
  classes.Offering.addProperty(properties.availabilityEnds)
  classes.Offering.addProperty(properties.availabilityStarts)
  classes.Offering.addProperty(properties.availableAtOrFrom)
  classes.Offering.addProperty(properties.availableDeliveryMethods)
  classes.Offering.addProperty(properties.category)
  classes.Offering.addProperty(properties.condition)
  classes.Offering.addProperty(properties.deliveryLeadTime)
  classes.Offering.addProperty(properties.description)
  classes.Offering.addProperty(properties.eligibleCustomerTypes)
  classes.Offering.addProperty(properties.eligibleDuration)
  classes.Offering.addProperty(properties.eligibleRegions)
  classes.Offering.addProperty(properties.eligibleTransactionVolume)
  classes.Offering.addProperty(properties.hasBusinessFunction)
  classes.Offering.addProperty(properties.hasEAN_UCC_13)
  classes.Offering.addProperty(properties.hasGTIN_14)
  classes.Offering.addProperty(properties.hasGTIN_8)
  classes.Offering.addProperty(properties.hasInventoryLevel)
  classes.Offering.addProperty(properties.hasMPN)
  classes.Offering.addProperty(properties.hasPriceSpecification)
  classes.Offering.addProperty(properties.hasStockKeepingUnit)
  classes.Offering.addProperty(properties.hasWarrantyPromise)
  classes.Offering.addProperty(properties.includes)
  classes.Offering.addProperty(properties.includesObject)
  classes.Offering.addProperty(properties.name)
  classes.Offering.addProperty(properties.serialNumber)
  classes.Offering.addProperty(properties.validFrom)
  classes.Offering.addProperty(properties.validThrough)

  classes.OpeningHoursSpecification.addProperty(properties.name)
  classes.OpeningHoursSpecification.addProperty(properties.description)
  classes.OpeningHoursSpecification.addProperty(properties.opens)
  classes.OpeningHoursSpecification.addProperty(properties.closes)
  classes.OpeningHoursSpecification.addProperty(properties.hasOpeningHoursDayOfWeek)
  classes.OpeningHoursSpecification.addProperty(properties.validFrom)
  classes.OpeningHoursSpecification.addProperty(properties.validThrough)

  classes.PaymentChargeSpecification.addProperty(properties.appliesToPaymentMethod)

  classes.PaymentMethod.addProperty(properties.name)
  classes.PaymentMethod.addProperty(properties.description)

  classes.ProductOrService.addProperty(properties.category)
  classes.ProductOrService.addProperty(properties.color)
  classes.ProductOrService.addProperty(properties.condition)
  classes.ProductOrService.addProperty(properties.datatypeProductOrServiceProperty)
  classes.ProductOrService.addProperty(properties.depth)
  classes.ProductOrService.addProperty(properties.description)
  classes.ProductOrService.addProperty(properties.hasBrand)
  classes.ProductOrService.addProperty(properties.hasEAN_UCC_13)
  classes.ProductOrService.addProperty(properties.hasGTIN_14)
  classes.ProductOrService.addProperty(properties.hasGTIN_8)
  classes.ProductOrService.addProperty(properties.hasMPN)
  classes.ProductOrService.addProperty(properties.hasManufacturer)
  classes.ProductOrService.addProperty(properties.hasStockKeepingUnit)
  classes.ProductOrService.addProperty(properties.height)
  classes.ProductOrService.addProperty(properties.isAccessoryOrSparePartFor)
  classes.ProductOrService.addProperty(properties.isConsumableFor)
  classes.ProductOrService.addProperty(properties.isSimilarTo)
  classes.ProductOrService.addProperty(properties.name)
  classes.ProductOrService.addProperty(properties.qualitativeProductOrServiceProperty)
  classes.ProductOrService.addProperty(properties.quantitativeProductOrServiceProperty)
  classes.ProductOrService.addProperty(properties.weight)
  classes.ProductOrService.addProperty(properties.width)

  classes.ProductOrServiceModel.addProperty(properties.hasMakeAndModel)
  classes.ProductOrServiceModel.addProperty(properties.isVariantOf)
  classes.ProductOrServiceModel.addProperty(properties.predecessorOf)
  classes.ProductOrServiceModel.addProperty(properties.serialNumber)
  classes.ProductOrServiceModel.addProperty(properties.successorOf)

  classes.PriceSpecification.addProperty(properties.name)
  classes.PriceSpecification.addProperty(properties.description)
  classes.PriceSpecification.addProperty(properties.eligibleTransactionVolume)
  classes.PriceSpecification.addProperty(properties.hasCurrency)
  classes.PriceSpecification.addProperty(properties.hasCurrencyValue)
  classes.PriceSpecification.addProperty(properties.hasEligibleQuantity)
  classes.PriceSpecification.addProperty(properties.hasMaxCurrencyValue)
  classes.PriceSpecification.addProperty(properties.hasMinCurrencyValue)
  classes.PriceSpecification.addProperty(properties.validFrom)
  classes.PriceSpecification.addProperty(properties.validThrough)
  classes.PriceSpecification.addProperty(properties.valueAddedTaxIncluded)

  classes.QualitativeValue.addProperty(properties.name)
  classes.QualitativeValue.addProperty(properties.description)
  classes.QualitativeValue.addProperty(properties.equal)
  classes.QualitativeValue.addProperty(properties.greater)
  classes.QualitativeValue.addProperty(properties.greaterOrEqual)
  classes.QualitativeValue.addProperty(properties.lesser)
  classes.QualitativeValue.addProperty(properties.lesserOrEqual)
  classes.QualitativeValue.addProperty(properties.nonEqual)
  classes.QualitativeValue.addProperty(properties.valueReference)

  classes.QuantitativeValue.addProperty(properties.name)
  classes.QuantitativeValue.addProperty(properties.description)
  classes.QuantitativeValue.addProperty(properties.hasMaxValue)
  classes.QuantitativeValue.addProperty(properties.hasMinValue)
  classes.QuantitativeValue.addProperty(properties.hasUnitOfMeasurement)
  classes.QuantitativeValue.addProperty(properties.hasValue)
  classes.QuantitativeValue.addProperty(properties.valueReference)

  classes.QuantitativeValueFloat.addProperty(properties.hasMaxValueFloat)
  classes.QuantitativeValueFloat.addProperty(properties.hasMinValueFloat)
  classes.QuantitativeValueFloat.addProperty(properties.hasValueFloat)

  classes.QuantitativeValueInteger.addProperty(properties.hasMaxValueInteger)
  classes.QuantitativeValueInteger.addProperty(properties.hasMinValueInteger)
  classes.QuantitativeValueInteger.addProperty(properties.hasValueInteger)

  classes.TypeAndQuantityNode.addProperty(properties.name)
  classes.TypeAndQuantityNode.addProperty(properties.description)
  classes.TypeAndQuantityNode.addProperty(properties.amountOfThisGood)
  classes.TypeAndQuantityNode.addProperty(properties.hasBusinessFunction)
  classes.TypeAndQuantityNode.addProperty(properties.hasUnitOfMeasurement)
  classes.TypeAndQuantityNode.addProperty(properties.typeOfGood)

  classes.UnitPriceSpecification.addProperty(properties.billingIncrement)
  classes.UnitPriceSpecification.addProperty(properties.priceType)

  classes.WarrantyPromise.addProperty(properties.description)
  classes.WarrantyPromise.addProperty(properties.durationOfWarrantyInMonths)
  classes.WarrantyPromise.addProperty(properties.hasWarrantyScope)
  classes.WarrantyPromise.addProperty(properties.name)

  classes.WarrantyScope.addProperty(properties.name)
  classes.WarrantyScope.addProperty(properties.description)

  /* Inheritance */
  classes.DeliveryChargeSpecification.inheritsFrom(classes.PriceSpecification)
  classes.PaymentChargeSpecification.inheritsFrom(classes.PriceSpecification)
  classes.UnitPriceSpecification.inheritsFrom(classes.PriceSpecification)

  classes.Individual.inheritsFrom(classes.ProductOrService)
  classes.ProductOrServiceModel.inheritsFrom(classes.ProductOrService)

  classes.QuantitativeValueFloat.inheritsFrom(classes.QuantitativeValue)
  classes.QuantitativeValueInteger.inheritsFrom(classes.QuantitativeValue)

  classes.License.inheritsFrom(classes.BusinessFunction)

  /* Add to Design */
  values(classes).forEach(c => design.addClass(c))
  values(properties).forEach(p => design.addProperty(p))

  printDesign(design.toJSON())

}