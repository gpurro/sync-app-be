
// see: https://stackoverflow.com/questions/34699529/convert-javascript-class-instance-to-plain-object-preserving-methods

// const keys = (x:any) => Object.getOwnPropertyNames(x).concat(Object.getOwnPropertyNames(x?.__proto__))
const keys = (x:any) => Object.getOwnPropertyNames(x);
const isObject = (v:any) => Object.prototype.toString.call(v) === '[object Object]'

export const classToObject = (clss:any) => {
 
  let k = keys(clss ?? {});
  
  return k.reduce((object: any, key) => {
    const [val, arr, obj] = [clss[key], Array.isArray(clss[key]), isObject(clss[key])]
    object[key] = arr ? val.map(classToObject) : obj ? classToObject(val) : val
    return object
  }, {})
}