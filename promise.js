const DIVIDER_FOR_DATE = 100_000

function regularPromise(indicator) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`regular promise ${indicator ?? ''}: ${Date.now() % DIVIDER_FOR_DATE}`)
    }, 1000)
  })
}

function rejectedPromise(indicator) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`rejected promise ${indicator ?? ''}: ${Date.now() % DIVIDER_FOR_DATE}`)
    }, 1000)
  })
}

async function callRegularPromise() {
  const result = await regularPromise()
  console.log(result)
}

async function callRegularPromiseTwice() {
  const result = await regularPromise(1)
  console.log(result)
  const result2 = await regularPromise(2)
  console.log(result2)
}

async function callRegularPromiseTwiceInParallel() {
  const [result1, result2] = await Promise.all([regularPromise(1), regularPromise(2)])
  console.log(result1)
  console.log(result2)
}

async function callRejectedPromise() {
  try {
    const result = await rejectedPromise()
    console.log(result)
  } catch (error) {
    console.log('Error:', error)
  }
}

async function callBothPromises() {
  try {
    const [result1, result2] = await Promise.all([regularPromise(), rejectedPromise()])
    console.log(result1)
    console.log(result2)
  } catch (error) {
    console.log('Error:', error)
  }
}

async function callRejectedPromiseTwiceInParallel() {
  try {
    const [result1, result2] = await Promise.all([rejectedPromise(1), rejectedPromise(2)])
    console.log(result1)
    console.log(result2)
  } catch (error) {
    console.log('Error:', error)
  }
}

async function callBothPromisesWithAllSettled() {
  const [result1, result2] = await Promise.allSettled([regularPromise(), rejectedPromise()])
  console.log(result1)
  console.log(result2)
}

async function callRegularPromiseTwiceWithBackgroundExecution() {
  const promise1 = regularPromise(1)
  await regularPromise(100)
  const result2 = await regularPromise(2)
  await regularPromise(100)
  const result1 = await promise1
  console.log(result2)
  console.log(result1)
}

async function callBothPromisesWithBackgroundExecution() {
  const promise1 = rejectedPromise(1)
  await regularPromise(100)
  const result2 = await regularPromise(2)
  await regularPromise(100)
  const result1 = await promise1
  console.log(result1)
  console.log(result2)
}

async function callBothPromisesWithBackgroundExecutionAndErrorHandling() {
  try {
    const promise1 = rejectedPromise(1)
    await regularPromise(100)
    const result2 = await regularPromise(2)
    await regularPromise(100)
    const result1 = await promise1
    console.log(result1)
    console.log(result2)
  } catch {
    console.log('error')
  }
}

async function callBothPromisesWithBackgroundExecutionAndProperErrorHandling() {
  async function presult(promise) {
    try {
      const value = await promise
      return [undefined, value]
    } catch (error) {
      return [error, undefined]
    }
  }
  try {
    const promise1 = presult(rejectedPromise(1))
    await regularPromise(100)
    const result2 = await regularPromise(2)
    await regularPromise(100)
    const [error1, result1] = await promise1
    console.log(result1 ?? error1)
    console.log(result2)
  } catch {
    console.log('error')
  }
}

async function callPromiseFourTimesInALoop() {
  for (let i = 0; i < 4; i++) {
    const result = await regularPromise(i)
    console.log(result)
  }
}

async function callPromiseFourTimesWithMap() {
  const [result1, result2, result3, result4] = await Promise.all([0, 1, 2, 3].map((i) => regularPromise(i)))
  console.log(result1)
  console.log(result2)
  console.log(result3)
  console.log(result4)
}

async function callPromiseFourTimesInTheBackgroundWithMap() {
   const promise12 = Promise.all([1, 2].map((i) => regularPromise(i)))
   await regularPromise()
   const [result3, result4] = await Promise.all([3, 4].map((i) => regularPromise(i)))
   const [result1, result2] = await promise12
  console.log(result1)
  console.log(result2)
  console.log(result3)
  console.log(result4)
}

await callPromiseFourTimesInTheBackgroundWithMap()