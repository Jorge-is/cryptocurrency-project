export const parseFloatNumber = (number, afterPoint = 2) => {
  const result = parseFloat(number).toFixed(afterPoint)
  return result === 'NaN' ? "-" : result
}

export const formatCurrency = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}
