export function getQuery(min = 0, max = 0): string {
  if (!min && !max) {
    throw new Error(`Please specify at least one value, either 'min' or 'max'`)
  } else if (min && !max) {
    return `only screen and (min-width: ${min}px)`
  } else if (!min && max) {
    return `only screen and (max-width: ${max - 1}px)`
  } else {
    return `only screen and (min-width: ${min}px) and (max-width: ${max - 1}px)`
  }
}
