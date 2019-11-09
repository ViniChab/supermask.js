window.onload = () => {
  let maskFields = getMaskFields()
  let masks = getMasks(maskFields)

}

function getMaskFields() {
  return Array.from(document.getElementsByClassName('maskField'))
}

function getMasks(maskFields) {
  console.log(maskFields)
}