const checkType = (typeToCheck: any) =>
  Object.prototype.toString.call(typeToCheck)

export const isObj = (objToCheck: any) =>
  checkType(objToCheck) === '[object Object]'
