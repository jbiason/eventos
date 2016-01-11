import { expect } from 'chai'
import util from '../../src/js/util/util'

describe('arraySimplify', () => {
  it('should return array with length 2', () => {
    const a1 = util.arraySimplify([1, 2])
    expect(a1).to.have.length(2)

    const a2 = util.arraySimplify([1, 2, 3, 4])
    expect(a2).to.have.length(2)

    const a3 = util.arraySimplify([1, 2, 3, 4, 5, 6, 7])
    expect(a3).to.have.length(2)
  })

  it('should return array with first and last items', () => {
    const a1 = util.arraySimplify([1, 2])
    expect(a1[0]).to.equal(1)
    expect(a1[1]).to.equal(2)

    const a2 = util.arraySimplify([1, 2, 3, 4])
    expect(a2[0]).to.equal(1)
    expect(a2[1]).to.equal(4)

    const a3 = util.arraySimplify([1, 2, 3, 4, 5, 6, 7])
    expect(a3[0]).to.equal(1)
    expect(a3[1]).to.equal(7)
  })
})

describe('arrayUniq', () => {
  it('should return array without dupes', () => {
    const a = util.arrayUniq([1, 2, 3, 1, 2, 3, 1, 4, 1, 2, 4, 1, 'a', 'a', 'b', 'a', 'b', 'c'])

    const expectOnce = (val) => {
      expect(a.filter((i) => i === val)).to.have.length(1)
    }

    expectOnce(1)
    expectOnce(2)
    expectOnce(3)
    expectOnce(4)
    expectOnce('a')
    expectOnce('b')
    expectOnce('c')
  })
})

describe('strSplit', () => {
  it('should split with comma, by default', () => {
    expect(util.strSplit('a').length).to.equal(1)
    expect(util.strSplit('a,').length).to.equal(2)
    expect(util.strSplit('a, b, c').length).to.equal(3)
    expect(util.strSplit('a, b, c,').length).to.equal(4)
  })

  it('should split with any char specified', () => {
    expect(util.strSplit('a', '|').length).to.equal(1)
    expect(util.strSplit('a|', '|').length).to.equal(2)
    expect(util.strSplit('a| b| c', '|').length).to.equal(3)
    expect(util.strSplit('a| b| c|', '|').length).to.equal(4)
  })
})

describe('currencyFormat', () => {
  it('should format correctly', () => {
    expect(util.currencyFormat(1)).to.equal('R$1')
    expect(util.currencyFormat(12)).to.equal('R$12')
    expect(util.currencyFormat(123)).to.equal('R$123')
    expect(util.currencyFormat(1234)).to.equal('R$1.234')
  })
})

describe('currencyParse', () => {
  it('should parse correctly', () => {
    expect(util.currencyParse('1')).to.equal(1)
    expect(util.currencyParse('12')).to.equal(12)
    expect(util.currencyParse('123')).to.equal(123)
    expect(util.currencyParse('1.234')).to.equal(1234)
  })
})

describe('dateFromStr', () => {
  it('should parse correctly', () => {
    const expectDate = (dateStr, d, m, y) => {
      const date = util.dateFromStr(dateStr)
      expect(date.getDate()).to.equal(d)
      expect(date.getMonth()).to.equal(m)
      expect(date.getFullYear()).to.equal(y)
    }

    expectDate('01/01/2016', 1, 0, 2016)
    expectDate('06/06/2016', 6, 5, 2016)
    expectDate('31/12/2016', 31, 11, 2016)
  })
})

describe('dateToStr', () => {
  it('should format correctly', () => {
    const expectDateStr = (y, m, d, expected) => {
      const date = new Date(y, m, d)
      const dateStr = util.dateToStr(date)
      expect(dateStr).to.equal(expected)
    }

    expectDateStr(2016, 0, 1, '01/01')
    expectDateStr(2016, 5, 6, '06/06')
    expectDateStr(2016, 11, 31, '31/12')
    expectDateStr(2017, 0, 1, '01/01')
  })
})

describe('isPast', () => {
  it('should return true for past dates', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)

    const lastYear = new Date()
    lastYear.setFullYear(lastYear.getFullYear() - 1)

    expect(util.isPast(yesterday)).to.be.true
    expect(util.isPast(lastMonth)).to.be.true
    expect(util.isPast(lastYear)).to.be.true
  })

  it('should return false for today', () => {
    const today = new Date()
    expect(util.isPast(today)).to.be.false
  })

  it('should return true for future dates', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const nextMonth = new Date()
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const nextYear = new Date()
    nextYear.setFullYear(nextYear.getFullYear() + 1)

    expect(util.isPast(tomorrow)).to.be.false
    expect(util.isPast(nextMonth)).to.be.false
    expect(util.isPast(nextYear)).to.be.false
  })
})
