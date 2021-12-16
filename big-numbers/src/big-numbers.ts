import { CustomOperation } from './custom-number.types'

export type BigNumber = string

const fromString = (s: string): BigNumber => {
  if (isNaN(parseInt(s))) {
    throw new Error('Not a number')
  }
  return s
}

const add = (n1: BigNumber, n2: BigNumber): BigNumber => {
  let longestString: string = n1.toString()
  let shortestString: string = n2.toString()

  if (shortestString.length > longestString.length) {
    longestString = n2.toString()
    shortestString = n1.toString()
  }

  let carry: number = 0

  // Added 0 to the beginning of the string to make it the smae lenght as longestString
  shortestString = shortestString.padStart(longestString.length, '0')

  const arrayResult: number[] = []
  let result: string = ''

  for (let index: number = longestString.length - 1; index >= 0; index--) {
    arrayResult[index] = parseInt(longestString[index]) + parseInt(shortestString[index]) + carry
    if (arrayResult[index] > 9 && index !== 0) {
      arrayResult[index] = arrayResult[index] - 10
      carry = 1
    } else {
      carry = 0
    }
  }

  result = arrayResult.join('')

  return result
}

const multiply = (n1: BigNumber, n2: BigNumber): BigNumber => {
  const num1String: string = n1.toString()
  const num2String: string = n2.toString()

  // String to number array
  const num1Array: number[] = Array.from(num1String, (num: string) => Number(num)).reverse()
  const num2Array: number[] = Array.from(num2String, (num: string) => Number(num)).reverse()

  const resultArray: number[] = []
  let result: string = ''

  for (let indexNum1 = 0; indexNum1 < num1Array.length; indexNum1++) {
    for (let indexNum2 = 0; indexNum2 < num2Array.length; indexNum2++) {
      resultArray[indexNum1 + indexNum2] = num1Array[indexNum1] * num2Array[indexNum2] + (resultArray[indexNum1 + indexNum2] || 0)
      if (resultArray[indexNum1 + indexNum2] >= 10) {
        resultArray[indexNum1 + indexNum2 + 1] = (resultArray[indexNum1 + indexNum2 + 1] || 0) + Math.floor(resultArray[indexNum1 + indexNum2] / 10)
        resultArray[indexNum1 + indexNum2] = resultArray[indexNum1 + indexNum2] % 10
      }
    }
  }

  result = resultArray.reverse().join('')

  return result
}

const toString = (n: BigNumber): string => n

export const BigNumberOperation: CustomOperation<BigNumber> = {
  fromString,
  add,
  multiply,
  toString
}
