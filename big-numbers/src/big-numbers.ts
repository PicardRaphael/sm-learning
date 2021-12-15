import { CustomOperation } from './custom-number.types'

export type BigNumber = any

const fromString = (s: string): BigNumber => {
  const n = parseInt(s)

  if (isNaN(n)) {
    throw new Error('Not a number')
  }

  return n
}

const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  let longestString = n1.toString()
  let shortestString = n2.toString()

  if (shortestString.length > longestString.length) {
    longestString = n2.toString()
    shortestString = n1.toString()
  }

  let carry = 0

  // Added 0 to the beginning of the string to make it the smae lenght as longestString
  shortestString = shortestString.padStart(longestString.length, '0')

  const result = []

  for (let index = longestString.length - 1; index >= 0; index--) {
    result[index] = parseInt(longestString[index]) + parseInt(shortestString[index]) + carry
    if (result[index] > 9 && index !== 0) {
      result[index] = result[index] - 10
      carry = 1
    } else {
      carry = 0
    }
  }

  return result.join('')
}

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {

}

const toString = (n: BigNumber) => n.toString()

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
