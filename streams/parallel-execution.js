import fs from 'fs'

const readStream1 = fs.createReadStream('example-text-for-parallel.txt', {
  highWaterMark: 36,
})

const readStream2 = fs.createReadStream('example-text-for-parallel.txt', {
  highWaterMark: 36,
})

readStream1.on('data', (chunk) => {
  console.log(chunk.toString())
})
readStream2.on('data', (chunk) => {
  console.log(chunk.toString())
})