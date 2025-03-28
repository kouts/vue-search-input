export const filterObject = (obj: { [key: string]: unknown }, properties: (string | number)[], remove = true) => {
  const res: { [key: string]: unknown } = {}

  Object.keys(obj).forEach((objAttr) => {
    const condition = remove ? properties.indexOf(objAttr) === -1 : properties.indexOf(objAttr) >= 0

    if (condition) {
      res[objAttr] = obj[objAttr]
    }
  })

  return res
}
