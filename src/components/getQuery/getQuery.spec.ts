import { getQuery } from '../../vue-use-kit'

describe('getQuery', () => {
  it('should throw when no min or max value is provided', () => {
    const t = () => getQuery()
    expect(t).toThrow(Error)
  })

  it('should return the expected queries', () => {
    // max width check
    const maxWidthQuery = getQuery(0, 500)
    expect(maxWidthQuery).not.toContain('min-width')
    expect(maxWidthQuery).toContain('max-width')

    // min and max width check
    const minAndMaxWidthQuery = getQuery(500, 1024)
    expect(minAndMaxWidthQuery).toContain('min-width')
    expect(minAndMaxWidthQuery).toContain('max-width')

    // min width check
    const minWidthQuery = getQuery(1024)
    expect(minWidthQuery).toContain('min-width')
    expect(minWidthQuery).not.toContain('max-width')
  })
})
