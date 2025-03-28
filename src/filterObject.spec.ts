import { filterObject } from './filterObject'

describe('filterObject utility function', () => {
  it('should include only specified properties when remove is false', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const properties = ['a', 'c']
    const result = filterObject(obj, properties, false)

    expect(result).toEqual({ a: 1, c: 3 })
  })
})
