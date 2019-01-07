export const objectToString = object => {
  var stringOutput = ''

  Object.keys(object).forEach(function(key) {
    if (!stringOutput) {
      stringOutput = object[key].id
    } else {
      stringOutput += ',' + object[key].id
    }
  })

  return stringOutput
}
