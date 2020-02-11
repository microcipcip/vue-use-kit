/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('../../package.json')

/**
 * Removes extra forward slashes so that we always get a valid url
 */
const cleanUrl = (str: string) => str.replace(/([^:]\/)\/+/g, '$1')

export const url = pkg.repository.url
export const storiesFolder = 'stories'
export const absUrl = `${url}/blob/master/`
export const getDemoUrl = (functionPath: string, filePath: string) => {
  const absoluteUrl = cleanUrl(
    `${absUrl}/${functionPath}/${storiesFolder}/${filePath}`
  )
  return absoluteUrl
}
export const getSourceUrl = (functionPath: string, filePath: string) => {
  const absoluteUrl = cleanUrl(`${absUrl}/${functionPath}/${filePath}.ts`)
  return absoluteUrl
}
