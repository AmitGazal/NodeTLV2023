import fs from 'fs'

const readStream = fs.createReadStream('exapmle-text.js', {
  highWaterMark: 32,
})

// const readStream = fs.createReadStream('not-exist.txt', {
//   highWaterMark: 32,
// })

// readStream.on('data', (chunk) => {
//   console.log(`Received ${chunk.length} bytes of data.`)
//   console.log(chunk.toString())
// })

// readStream.on('error', (error) => {
//   console.error(`Encountered error: ${error}`)
// })

try {
  for await (const chunk of readStream) {
    console.log(`Received ${chunk.length} bytes of data.`)
    console.log(chunk.toString())
  }
} catch (error) {
  console.error(`Encountered error: ${error}`)
}