"use strict"

String.prototype.isSymbol = function () {
  return !!this.match(/(?![#])[_\W]/)
}

window.onload = () => {
  let maskFields = _getMaskFields()
  let masks = _getMasks(maskFields)
  _setupMaskEvents(maskFields, masks)
}

function removeAllSymbols(field) {
  let splitValue = field.value.split('')
  return splitValue.map( digit => {
    if (digit.isSymbol()) return ''
    return digit
  }).join('')
}

function validateMask(field, mask, event) {
  let lastDigitPosition = field.value.length
  let splitMask = mask.split('')

  try {
    if (!_validateDigit(splitMask, lastDigitPosition, event.key, field))
      event.preventDefault()
  } catch (e) {
    event.preventDefault()
  }
}

function fullyValidateChange(field, mask, event) {
  _addSymbols(field, mask)
  fullyValidateMask(field, mask, event)
}

function fullyValidateMask(field, mask, event) {
  let validatedMask = ''
  try {

    field.value.split('').forEach((digit, index) => {

      if (_validateDigit(mask.split(''), index, digit, field, true))
        return validatedMask = validatedMask.concat(digit)

      if (_shouldThisInvalidDigitBeHere(digit, mask[index]))
        return validatedMask = validatedMask.concat(digit)

      throw 'invalid input'

    })

  } catch (e) {
    return field.value = validatedMask
  }
}

function _getMaskFields() {
  return Array.from(document.getElementsByClassName('maskField'))
}

function _getMasks(maskFields) {
  return maskFields.map(input => input.getAttribute("mask"))
}

function _addSymbols(field, mask) {
  let splitMask = mask.split('')
  let splitValue = field.value.split('')
  try {
    splitMask.forEach((digit, index) => {
      if (index > splitValue.length) throw "mask is bigger than input value"
      if (digit.isSymbol() && splitValue[index] != digit)
        splitValue = _insertSymbol(splitValue.join(''), index, digit).split('')
    })
  } catch (e) { }
  field.value = splitValue.join('')
}

function _insertSymbol(fieldValue, index, symbol) {
  let splitValue = fieldValue.split('')
  let firstHalf = fieldValue.substr(0, index)
  let secondHalf = splitValue.splice(index).join('')
  return firstHalf + symbol + secondHalf
}

function _setupMaskEvents(maskFields, masks) {
  maskFields.forEach((field, index) => {
    field.addEventListener('input', (event) => {
      //if (event.inputType == "deleteContentBackward")
        //fullyValidateChange(field, masks[index], event)
    })
    field.addEventListener('keypress', (event) => {
      validateMask(field, masks[index], event)
    })
    field.addEventListener('change', (event) => fullyValidateChange(field, masks[index], event))
    field.addEventListener('paste', (event) => {
      if (!field.hasAttribute("blockpasting")){
        field.value = (event.clipboardData || window.clipboardData).getData('text')
        fullyValidateChange(field, masks[index], event)
      }
      event.preventDefault()
    })
  })
}

function _shouldThisInvalidDigitBeHere(digit, mask) {
  return digit == mask
}

function _validateDigit(splitMask, lastDigitPosition, key, field, isFullValidation = false) {
  let digitMask = splitMask[lastDigitPosition]

  if (key == ' ')
    return false

  if (digitMask.isSymbol()) {
    if (!isFullValidation)
      field.value = _concatSymbols(field, splitMask, lastDigitPosition)
    return _validateDigit(splitMask, (lastDigitPosition + 1), key, field)
  }

  if (+digitMask)
    return _numericValidation(digitMask, key, field)

  if (digitMask == "#")
    return true
}

function _concatSymbols(field, splitMask, lastDigitPosition) {
  let symbols = ''
  for (let i = lastDigitPosition; i < splitMask.length; i++)
    if (splitMask[i].isSymbol()) symbols = symbols.concat(splitMask[i])
    else break

  return field.value.concat(symbols)
}

function _numericValidation(digitMask, key, field) {
  if (field.hasAttribute("inverted-numbers"))
    if (+key >= digitMask)
      return true
    else return false

  else if (+key <= digitMask)
    return true

  else return false
}

// TODO usuário criar funções para eventos específicos
// TODO maiśculas e minúsculas
// TODO range de letras