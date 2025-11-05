export const validatePriceRange = (
  priceParam: string | undefined,
  sliderMin = 0,
  sliderMax = 1000,
): number[] | undefined => {
  if (!priceParam) {
    return undefined
  }

  const parts = priceParam.split(',')

  if (parts.length !== 2) {
    return undefined
  }

  const [minStr, maxStr] = parts
  const min = Number(minStr)
  const max = Number(maxStr)

  if (isNaN(min) || isNaN(max)) {
    return undefined
  }

  if (min > max) {
    return undefined
  }

  if (min < sliderMin || max > sliderMax) {
    return undefined
  }

  return [min, max]
}
