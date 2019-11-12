"use strinct"

window.onload = () => {
  let maskFields = _getMaskFields()
  let masks = _getMasks(maskFields)
  _setupMaskEvents(maskFields, masks)
}

function _getMaskFields() {
  return Array.from(document.getElementsByClassName('maskField'))
}

function _getMasks(maskFields) {
  return maskFields.map(input => input.getAttribute("mask"))
}

function _setupMaskEvents(maskFields, masks) {
  maskFields.forEach((field, index) => {
    field.addEventListener('keypress', (event) => validateMask(field, masks[index], event))
  })
}

function validateMask(field, mask, event) {
  let lastDigitPosition = field.value.length
  let splitMask = mask.split('')

  try {
    if (!_validateDigit(splitMask[lastDigitPosition], event.key, field))
      event.preventDefault()
  } catch (e) {
    event.preventDefault()
  }
}

function _validateDigit(digitMask, key, field) {
  if (+digitMask)
    return _numericValidation(digitMask, key)
  else if (digitMask.match(/[_\W]/)){
    field.value = field.value.concat(digitMask)
    return true
  }
}

function _numericValidation(digitMask, key) {
  if (+key <= digitMask) {
    return true
  } else return false
}