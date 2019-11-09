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
    field.addEventListener('keypress', () => validateMask(field, masks[index]))
  })
}

function validateMask(maskField, mask) {
  console.log(maskField)
  console.log(mask)
}